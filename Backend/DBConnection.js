require("dotenv").config()
const mongoose=require("mongoose")
const mongoURI=process.env.Mongouri
const connectDB= async ()=>{
    try{  
        await mongoose.connect("mongodb+srv://Vishnu:vishnu2005@cluster0.z1rrgh7.mongodb.net/Capstone")
        console.log("DataBase have been succesfully Connected")

    }catch(error){
        console.log("error:",error)
        console.log("DataBase have Disconnected ,Please check the errors.")        
    }
}



module.exports=connectDB
