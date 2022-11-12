const express= require('express')
const router=express.Router()
const {validToken}=require('../Middleware/AuthMiddleware')
const {Suppliers}=require('../models')


router.post('/create',validToken,async(req, res)=>{
    const {name, address, phone}= req.body
    try {
        Suppliers.findOne({where:{phone:phone}}).then((supplier)=>{
            if(supplier){
                res.json({error:"supplier Already exist"})
            }else{
                Suppliers.create({name:name, phone:phone, address:address}).then((response)=>{
                    res.json(" Success! Supplier added")
                })
            }
        })
    } catch (error) {
        res.json({error:error})
    }
})
router.get('/get', validToken,async(req,res)=>{
    Suppliers.findAll().then((result)=>{
        res.json(result)
    })
})

module.exports=router