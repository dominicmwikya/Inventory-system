module.exports=(sequelize, DataTypes)=>{
    const Sales=sequelize.define("Sales",{
        Customer_Name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Sale_Date:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        Quantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        saleprice:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        total:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        amount:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        balance:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        Status:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    },
    {
        timestamps: false
      })
    Sales.associate=(models)=>{
        Sales.belongsTo(models.Product)
       }
    return Sales;
    
}


