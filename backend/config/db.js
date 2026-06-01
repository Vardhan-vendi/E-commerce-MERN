import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("successfully")
    }catch(err){
        console.log("database connected..👌👌👌👌👌");
        process.exit(1);
    }
}

export default connectDB