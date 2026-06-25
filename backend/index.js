import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import { asyncErrorHandler } from './middlewares/asyncErrorHandler.js';
import userRouter from './Routes/userRoutes.js'
import categoryRouter from './Routes/categoryRoutes.js'
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())




connectDB()

app.use('/api/user',userRouter);

app.use('/api/category',categoryRouter)



// globel error handler middle ware
app.use(asyncErrorHandler)
app.listen(process.env.PORT,()=>{
    console.log(`server running on http://localhost:${process.env.PORT}`)
})