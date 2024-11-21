const mongoose =require('mongoose')
mongoose.connect("mongodb+srv://shubhankaryadav4912:syadav@cluster0.gdenb.mongodb.net/").then(()=>{
    console.log("connected to db")
}).catch(()=>{
    console.log("not connected to db");
    
})
const todoSchema= new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
})
const todomodel=mongoose.model("Todo",todoSchema);
// todomodel.create({
//     title:"Gym",
//     description:"get up in 6 in the morning and go to gym"
// }) 
// todomodel.findById('673cca099f98f6dd494f1277').then((todo)=>{
//     console.log(todo);
    
// }).catch((err) => {
//     console.error("Error fetching data:", err.message);
// });
 todomodel.find({ title: "Gym" }).then((todo)=>{
    console.log(todo);
    
 })
