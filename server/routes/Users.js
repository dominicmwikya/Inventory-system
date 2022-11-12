const express= require('express')
const router= express.Router()
const {Users}= require('../models')
const bcrypt= require('bcrypt')
const {sign}= require('jsonwebtoken')
const {validToken}=require('../Middleware/AuthMiddleware')
router.get('/',validToken, async(req, res)=>{
    const result= await Users.findAll()
    res.send(result)
})
router.post('/create', async (req, res)=>{
        const {username, password, email, role}= req.body
       try {
        bcrypt.hash(password, 10).then((hash)=>{
             Users.create({
                username:username, 
                password:hash,
                email:email,
                role:role}).then((response)=>{
                    res.json(response)
                })
        })
       } catch (error) {
          res.json({error:error})
       }
      
})
router.post('/login', async(req, res)=>{
    const {email, password}=req.body
    const user= await Users.findOne({where:{email:email}})
    if(!user){
        res.json({error:"User doesnt exist"})
    }else{
        bcrypt.compare(password, user.password).then((hashedPassword)=>{
            if(!hashedPassword){
                res.json({error:"wrong username and password combinatipn"})
            }else{
                const securityToken=sign({username:user.username, id:user.id}, "privacykey",{
                    expiresIn:'4h',
                })
                res.json({securityToken:securityToken, username:user.username,role:user.role, id:user.id})
            }
        })
    }
})
router.get('/auth', validToken,async(req, res)=>{
    res.json(req.user)
} )
module.exports= router