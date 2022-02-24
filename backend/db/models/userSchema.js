const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true
    },
    data:[],
},{
    timestamps:true
}
)

schema.pre("save",async function(next){
    this.pass=await bcrypt.hash(this.pass,10);
    next();
})

const File=new mongoose.model("File",schema);

module.exports=File;