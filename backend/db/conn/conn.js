const mongoose=require("mongoose");
new mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("connect with mongodb");
}).catch((e)=>{
    console.log(e);
})
