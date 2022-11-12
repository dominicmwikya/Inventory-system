const express= require('express')
const router= express.Router()
const {Product}= require('../models')
const {validToken}=require('../Middleware/AuthMiddleware')
router.get('/', validToken,async(req, res)=>{
    const products= await Product.findAll();
    if(!products){
        res.json({error:error+ "Data Error"})
    }else{
        res.json(products)
    }
})
router.post('/create',validToken ,(req, res)=>{
    const {product_name, product_category, product_sku,product_price,product_brand,product_min_qty,
        product_qty, product_unit,product_status,product_desc}=req.body
    try {
        Product.findOne({where:{Name:product_name}}).then((response)=>{
            if(response){
                res.json({error:"Product already exist!"})
            }else{
                 Product.create({Name:product_name, price:product_price, sku:product_sku, unit:product_unit,
                    category:product_category, min_qty:product_min_qty, qty:product_qty, desc:product_desc, status:product_status,
                    brand:product_brand, CreatedBy:req.user.username}).then((resp)=>{
                       res.json("Success! Product created successfully")
                    })
            }
        })
    } catch (error) {
        res.json({error:error})
    }
})
router.get("/:byid",validToken, async(req, res)=>{
    const p_id= req.params.byid
    const product=await Product.findAll({where:{id:p_id}})
    if(!product){
        res.json({error: "Data Error"})
    }else{
        res.json(product)
    }
})
router.put('/update', validToken, async(req,res)=>{
    const {Product_Name, id, product_sku, product_price, product_quantity,minimum_quantity}= req.body
    const productId=id
    Product.update({Name:Product_Name,price:product_price,
        sku:product_sku,min_qty:minimum_quantity,qty: product_quantity   },{where:{id:productId}}).then((result)=>{
            if(result==1)
            {res.json(result+" Product detail Updated sucessfully")}  
            else{
                res.json({error: "Error updating data! Contact system administrator!"})
            }
           
        })
})
router.delete('/delete/:id', validToken, async(req,res)=>{
    const product_id=req.params.id
    const Del= await Product.destroy({where:{id:product_id}});
    if(Del===null){
        res.send({error:"No product exist in the system"})
    }else{
        res.send(`product ID ${product_id} deleted successfully`)
    }
})


module.exports= router