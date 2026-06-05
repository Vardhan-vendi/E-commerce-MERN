import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfully")
    }catch(err){
        console.log("database not connected.");
        process.exit(1);
    }
}

export default connectDB