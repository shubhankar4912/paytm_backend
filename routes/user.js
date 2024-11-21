const express=require("express")
const jwt = require('jsonwebtoken');
const{ authMiddleware}=require('../middleware')
const {JWT_SECRET}=require('../config')
const router=express.Router();
const { userModel,AccountModel } = require("../db");
const zod=require("zod");


const signupSchema=zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(), 
})
const signinSchema=zod.object({
  username:zod.string().email(),
  password:zod.string()
})
const updateSchema=zod.object({
  password:zod.string(),
  firstName:zod.string(),
  lastName:zod.string()
})
router.post('/signup',async (req,res)=>{
        const body= req.body;
        const {success}=signupSchema.safeParse(body)
        if(!success){
            
            
           return res.status(400).json({
       
            msg:"incorrect inputs"
           }) 
         
        }
        const exist= await userModel.findOne({
            username:body.username})
        if(exist){
            return res.status(400).json({
                msg:"email already taken"
            })
        }
      const user= await userModel.create(body)
      const userId=user._id;
      await AccountModel.create({
        userId,
        balance:1+Math.random()*10000
      })
      const token=jwt.sign({
        userId:userId

      },JWT_SECRET)

      res.json({
        Messg:"user created successfully",
        token:token
      })
        

})
router.post('/signin',async (req,res)=>{
    const body=req.body
    const {success}=signinSchema.safeParse(body)
    if(!success){
      return res.status(400).json({
        msg:"wrong input"
      })
    }
    const userexist=await userModel.findOne({username:body.username,
    password:body.password
    })
    if(!userexist){
     return res.status(400).json({
        msg:"user donot exist or wrong password"
      })
    }
    else{
      const userId=userexist._id
      const token=jwt.sign({userId:userId},JWT_SECRET)
      return res.json({
        token:token
      })
    }
    
})


router.put('/',authMiddleware,async (req,res)=>{
 
  
    const {success}=updateSchema.safeParse(req.body)
    if(!success){
      res.status(411).json({
        message: "Error while updating information"
    })
    }
    await userModel.updateOne({_id:req.userId},req.body)
    res.json({
      msg:"updated successfully"
    })
})
router.get('/bulk',async (req,res)=>{
    const filter=req.query.filter||"";
    console.log(filter);
    
    const users = await userModel.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });
    console.log(users);
    
    res.json({
      user:users.map(user=>({
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        _id:user._id
      }))
 
    })
})
module.exports=router