const express=require('express')
const router=express.Router();
const { AccountModel } = require("../db");
const { authMiddleware } = require('../middleware');
const { mongoose } = require('mongoose');
router.get('/balance',authMiddleware,async(req,res)=>{
    const userId=req.userId
    const account=await  AccountModel.findOne({
        userId:userId
    });
    res.status(200).json({
        balance:account.balance
    })
})
router.post('/transfer',authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession()
    session.startTransaction();
    const {to,amount}=req.body;
    console.log(amount);
    
    const account=await AccountModel.findOne({userId:req.userId}).session(session)
    if(!account||account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({msg:"insufficient balance"});
    }
   
    await AccountModel.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } },
        { session }
    );
    await AccountModel.updateOne(
        { userId: to },
        { $inc: { balance: amount } },
        { session }
    );
    
   
   
    await session.commitTransaction();
    res.status(200).json({
        msg:"transfer succesful"
    });
})
module.exports=router;