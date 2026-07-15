import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import { asyncErrorHandler } from './middlewares/asyncErrorHandler.js';
import userRouter from './Routes/userRoutes.js'
import categoryRouter from './Routes/categoryRoutes.js'
import productRouter from './Routes/productRoutes.js'
import uploadRouter from './Routes/uploadRouter.js'
import orderRoutes from './Routes/orderRoutes.js'
import paymentRoutes from './Routes/paymentRoutes.js'

import cookieParser from 'cookie-parser';
import path from 'path'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())




connectDB()

app.use('/api/user',userRouter);

app.use('/api/category',categoryRouter)
app.use('/api/products',productRouter)
app.use('/api/upload',uploadRouter)
app.use('/api/order',orderRoutes)
app.use("/api/payment", paymentRoutes);

const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

// globel error handler middle ware
app.use(asyncErrorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
     console.log(`Server running on port ${PORT}`);
})