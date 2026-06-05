import express from 'express'
import { userSignIn } from '../controllers/userControllers.js';
const router = express.Router();

router.post('/signup',userSignIn)



export default router