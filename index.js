const express = require('express');
const mainRouter = require('./routes/index');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/',(req,res)=>{
    res.send("welcome to vercel")
})
app.use("/api/v1", mainRouter);

// Export the app for Vercel
module.exports = app;
