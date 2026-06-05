import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username :{
        type: String,
        require: true,
    },
    email :{
        type : String,
        require:true ,
        unique : true
    },
    password :{
        type: String,
        require : true,
    },
    isAdmin : {
        type :Boolean ,
        default : false
    }
})


const User = mongoose.model('user',userSchema);

export default User