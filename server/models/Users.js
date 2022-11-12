module.exports=(sequelize, DataTypes)=>{
     const Users= sequelize.define('Users', {
          username:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true
          },
          email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
          },
          password:{
            type:DataTypes.STRING,
            allowNull:false
          },
          role:{
            type:DataTypes.STRING,
            allowNull:true
          }
     })
     return Users;
}