const express=require('express')
const router=express.Router()
const userRouter=require('./user')
const accountRouter=require('./account')
router.use('/',(req,res)=>{
    res.send("welcome to vercel")
})
router.use("/user",userRouter)
router.use("/account",accountRouter)
module.exports=router;
