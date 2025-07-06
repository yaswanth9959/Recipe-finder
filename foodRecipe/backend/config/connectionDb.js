const mongoose=require("mongoose")

const connectDb=async()=>{
    await mongoose.connect("mongodb+srv://kethanvarmaab:Abkv&369@clusterfoodrecipe.cwprddc.mongodb.net/?retryWrites=true&w=majority&appName=Clusterfoodrecipe")
    .then(()=>console.log("connected..."))
}

module.exports=connectDb