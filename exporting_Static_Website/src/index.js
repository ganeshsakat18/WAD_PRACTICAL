const express =require("express");
const path =require('path')
const app=express();

const port =8000;
const staticpath=path.join(__dirname,'../public')

//built in middleware

app.use(express.static(staticpath))


app.get("/",(req,res)=>{res.send("welcome to home page")})
app.get("/about",(req,res)=>{res.send("welcome to about page")})
app.get("/contact",(req,res)=>{res.send("welcome to contact page")})

app.listen(port,()=>{console.log("hello from the port 8000")});