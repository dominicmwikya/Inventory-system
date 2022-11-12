const {verify}= require('jsonwebtoken')
const validToken=(req,res, next)=>{
       const accessToken= req.header("userToken");
       if(!accessToken){
        return res.json({error:" User not logged in"})
       }else{
            try {
                const validToken=verify(accessToken,"privacykey")
                req.user=validToken;
                if(validToken){
                    return next()
                }
            } catch (err) {
                res.json({error:err})
            }
       }
}

module.exports={validToken}