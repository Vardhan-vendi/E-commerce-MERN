import { asyncHandler } from "../middlewares/asyncHandler.js";
import User from "../models/userModels.js";
import bcrypt from "bcryptjs";

const userSignIn = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser){
    return res.status(400).json({
        message : "user Alreaddy exist .please login .."
    })
  }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hash(password,salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    try {
        await newUser.save();
        console.log(`${newUser.username} registered`)
        return res.status(201).json({
            message : "user successfully registered ",
            username : newUser.username,
            email : newUser.email,
            isAdmin : newUser.isAdmin
        })
        
    }catch(err){
        res.status(500);
       throw new Error("Failed to register user. Data was not saved.")
    }
  }  
);


export {userSignIn}