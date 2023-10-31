const express=require('express');
const router=require('./router/sendingCsv.router')
const cors=require('cors')
const app=express();
app.use(cors())
app.use("/",router.router1)
app.listen(3000,()=>
{
    console.log("server is running");
})