import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';


dotenv.config();
const app = express();
app.use(cors);
app.use(express.json())
app.use(urlencoded({extended:true}))

connectDB()

app.get('/',(req,res)=>{
    res.send('mydhili love vardhan')
})


app.listen(process.env.PORT,()=>{
    console.log(`server running on http://localhost:${process.env.PORT}`)
})