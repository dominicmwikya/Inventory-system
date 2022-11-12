const Express = require('express')
const router=Express.Router()
const {Purchases}=require('../models')
const {Product}=require('../models')
const{Suppliers}=require('../models')
const {validToken}=require('../Middleware/AuthMiddleware')

router.post("/create",validToken, async(req,res)=>{
    const {purchase_date, product, quantity, supplier,total,sale_price,status,price}=req.body
    try {
          Purchases.create({purchase_date:purchase_date, ProductId:product, quantity:quantity,SupplierId:supplier,status:status,price:price,total:total,sale_price:sale_price}).then((respo)=>{
            Product.findOne({where:{id:product}}).then((result)=>{
                const newqty= parseInt(result.qty)+parseInt(quantity);
               Product.update({qty:newqty},{where:{id:product}}).then((response)=>{
                res.json("Purchase successfull")
               })
            })
          });
    } catch (error) {
        res.json({error:error})
    }
})
router.get('/get',validToken,async(req,res)=>{
      try {
        Purchases.findAll(
            {
                include:[
                    {
                        model:Product,
                        attributes:['Name']
                    },
                    {
                        model:Suppliers,
                        attributes:['name']
                    }
                ]
               
            }
        ).then((result)=>{
            res.json(result)
        })
      } catch (error) {
        res.json({error:error})
      }
})

module.exports=router;