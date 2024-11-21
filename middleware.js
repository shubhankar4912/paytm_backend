const jwt = require('jsonwebtoken');
const {JWT_SECRET}=require('./config')
function authMiddleware(req,res,next){
    console.log(JWT_SECRET);
    
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({msg:'Authorization token missing'})

    }
    const token=authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({msg:'Token not provided'})

    }
    try{
        const decoded=jwt.verify(token,JWT_SECRET)
        req.userId=decoded.userId
        next();
    }
    catch(err){
        return res.status(403).json({msg:'Invalid'})
    }

}

module.exports={authMiddleware}