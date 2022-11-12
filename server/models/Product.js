module.exports=(sequelize, DataTypes)=>{
    const Product=sequelize.define('Product', {
        Name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        sku:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        category:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        brand:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        min_qty:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        
        qty:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        status:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        desc:{
            type:DataTypes.TEXT,
            allowNull:true,
        },
        CreatedBy:{
            type:DataTypes.STRING,
            allowNull:false
        }

    });
    Product.associate=(models)=>{
        Product.hasMany(models.Sales, {
           onDelete:'cascade'
        }),
        Product.hasMany(models.Purchases, {
            onDelete:'cascade'
         })
       }
    return Product;
}