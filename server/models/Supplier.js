
module.exports=(sequelize, DataTypes)=>{
    const Suppliers= sequelize.define('Suppliers', {
         name:{
           type:DataTypes.STRING,
           allowNull:false,
           unique: true
         },
         phone:{
           type: DataTypes.INTEGER,
           allowNull:false,
           unique: true
         },
         address:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:false
         }
    });
    Suppliers.associate=(models)=>{
      Suppliers.hasMany(models.Purchases, {
         onDelete:'cascade'
      })
     
     }
    return Suppliers;
}