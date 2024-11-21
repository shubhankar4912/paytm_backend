const mongoose =require('mongoose');

const {Schema}=mongoose;
mongoose.connect('mongodb+srv://shubhankaryadav4912:syadav@cluster0.gdenb.mongodb.net/').then(()=>{
    console.log('connnected to mongodb');
    
}).catch((err)=>{
    console.log('not connected');
})
;
const userSchema=new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        require:true,
        minLength:6
    },
    firstName:{
        type:String,
        require:true, 
        trim:true, 
        maxLength:50,
    },
    lastName:{
        type:String,
        require:true,
        trim:true,
        maxLength:50
    }

});
const AccountsSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});
const userModel=mongoose.model('User',userSchema);
const AccountModel=mongoose.model('Account',AccountsSchema)
module.exports={userModel,AccountModel}


