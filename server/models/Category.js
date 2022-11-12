module.exports=(sequelize, DataTypes)=>{
    const Category=sequelize.define('Category',{
           Name:{
              type:DataTypes.STRING,
              allowedNull:false
           },
           code:{
              type:DataTypes.STRING,
              allowedNull:false
           },
           Description:{
              type:DataTypes.TEXT,
              allowedNull:false
           }
    });
    return Category
  };