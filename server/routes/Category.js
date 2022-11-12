const Express = require('express')
const router=Express.Router()
const {Category}=require('../models')
const {validToken}=require('../Middleware/AuthMiddleware')
const { response } = require('express')
router.post('/create',validToken,async(req, res)=>{
    const {Category_Name, code, description}= req.body
    try {
        Category.findOne({where:{Name:Category_Name}}).then((Category)=>{
            if(Category){
                res.json({error:"Category Already exist"})
            }else{
                Category.create({Name:Category_Name, code:code, Description:description}).then((response)=>{
                    res.json("Success! Category added")
                })
            }
        })
    } catch (error) {
        res.json({error:error})
    }
})
   
router.get('/', validToken,async(req,res)=>{
    const record= await Category.findAll()
    if(record){
        res.send(record)
    }else{
         res.json({error:"Failed to fetch data!"})
    }
})
module.exports=router