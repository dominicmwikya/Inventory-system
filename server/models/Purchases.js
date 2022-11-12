
module.exports=(sequelize, DataTypes)=>{
    const Purchases= sequelize.define('Purchases', {
         quantity:{
           type: DataTypes.INTEGER,
           allowNull:false,
         },
         purchase_date:{
            type:DataTypes.DATE,
            allowNull:false,
         },
         price:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
         },
         total:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
         },
         sale_price:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
         },
         status:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:'Pending'
         }
    });
    Purchases.associate=(models)=>{
        Purchases.belongsTo(models.Product, {
           onDelete:'cascade'
        })
        Purchases.belongsTo(models.Suppliers, {
            onDelete:'cascade'
         })
       }
    return Purchases;
}