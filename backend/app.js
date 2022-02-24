const express=require("express");
const app=express();
require("dotenv").config();
require("./db/conn/conn");
const File=require("./db/models/userSchema");
const bcrypt=require("bcrypt");
const path =require("path");
const PORT=process.env.PORT ||5000

app.use(express.json());
app.use(express.urlencoded({extended :false}));

app.post("/signup",async(req,res)=>{
    let {name,number,pass,cpass}=req.body;
    console.log(name,number,pass,cpass);
    if(pass===cpass){
        let data=await File.findOne({number});
        if(data){
            res.status(420).send("error");
        }
           const userData= await File({
                name:name,
                number:number,
                pass:pass
            })
            console.log(userData);
            await userData.save();
            res.status(200).send("success")
        }else{
            res.send("Invalid details")
        }
});

app.post("/login",async(req,res)=>{
    let {number,pass}=req.body;
           const userData= await File.findOne({
                number:number
            });
            const check= await bcrypt.compare(pass,userData.pass);
            console.log(check);
            if(check){
                console.log(check);
                console.log(userData);
                res.status(201).json({success:"true"})
            }else{
                res.status(402).send("check your password")
            }
})

app.post("/weather",async(req,res)=>{
    let {data,num}=req.body;
   const userData= await File.findOne({number:num});
   console.log(userData);
    if(userData){
        const user=await File.updateOne({number:userData.number},
            {
                $push:{
                    data:data
                }
            }
            )
            console.log(user);
    }else{
        res.status(404);
    }
})

//server production assests
        if(process.env.NODE_ENV==="production"){
            app.use(express.static(path.join(__dirname,"../frontend/build")));
            app.get("*",(req,res)=>{
                res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
            })
        }

app.listen(PORT,()=>{
    console.log("created server");
})