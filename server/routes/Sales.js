const e = require('express')
var Sequelize = require ('sequelize');
const Express= require('express')
const router=Express.Router()
const {Sales}=require('../models')
const {Product} =require('../models')
const {validToken}=require('../Middleware/AuthMiddleware')
const Op = Sequelize.Op;
router.post('/create',validToken, async(req,res)=>{
    const {Customer_Name,Quantity, saleprice, total, amount, balance,ProductId,
    Status, Sale_Date }= req.body
    Product.findOne({where:{id: ProductId}}).then((product)=>{
            if(Quantity <= product.qty ){
                Sales.create({Customer_Name,Quantity, saleprice, total, amount, balance,ProductId,
                            Status, Sale_Date }).then((result)=>{
                                const qty_balance= product.qty-result.Quantity;
                                if(qty_balance<=product.min_qty){
                                    Product.update({qty: qty_balance, status:"Low Quantity"}, {where:{id: product.id}}).then((respo)=>{
                                    })
                                }else{
                                    Product.update({qty: qty_balance}, {where:{id: product.id}}).then((respo)=>{
                                    })
                                }
                            })

                res.send("Sale updated successfully")
            }else{
                res.send({error: "Error! Order lower Quantity"})
            }
        })
})
router.get("/", validToken, async(req, res)=>{
    const list= await Sales.findAll({include:Product})
    if(!list){
        res.send({error:"error"})
    }else{
        res.json(list)
    }
})
router.get('/:id',validToken, (req, res)=>{
    const updateId= req.params.id
    Sales.findOne({where:{id: updateId}}).then((sales)=>{
        if(sales){
            res.send(sales)
        }else{
            res.send(new Error("Failed to fetch Sale Record"))
        }
    })
})
router.delete('/delete/:id', validToken,async(req,res)=>{
    const deleteId=req.params.id
   const rs= await Sales.destroy({where:{id:deleteId}})
   if(rs===null){
       res.send({error:"Failed "})
   }else{
    res.send("Success! Data deleted successfully")
   }
})
router.post('/report', validToken,async(req, res)=>{
    const {end, start, dat, p_data}= req.body
       if(dat.selected==='stock'){
            Product.findAll({
             attributes:['id', 'Name', 'min_qty', 'Qty', 'status'],
             order:[
                 ['qty', 'ASC']
             ],
            }).then(result=>{
             res.json({Response:result, code:2})
            })
          }
    else if((p_data.length >0)&& (dat.selected==='sales')){
        Sales.findAll({
                    include: {
                        model: Product,
                        attributes:['Name']
                    },
                    where:{Sale_Date:{
                        [Op.gte]: new Date(start),
                        [Op.lte]: new Date(new Date(end))
                    },
                    [Op.and]:[{ProductId:p_data}]
                },
                    attributes: ['id','Quantity','Amount','Sale_Date', 'total', 'productId'], 
                    order:[
                        ['Sale_Date', 'DESC']
                    ],
                }).then((result)=>{
                    res.status(200).json({Result:result, code:1});
                }).catch(err=>{
                    res.send(err)
                })
    }
  else{
    Sales.findAll({
        include: {
            model: Product,
            attributes:['Name']
        },
        where:{Sale_Date:{
            [Op.gte]: new Date(start),
            [Op.lte]: new Date(new Date(end))
        },
    },
        attributes: ['id','Quantity','Amount','Sale_Date', 'total', 'productId'], 
        order:[
            ['Sale_Date', 'DESC']
        ],
    }).then((result)=>{
        res.status(200).json({Result:result, code:1});
    }).catch(err=>{
        res.send(err)
    })
  }
})
module.exports=router