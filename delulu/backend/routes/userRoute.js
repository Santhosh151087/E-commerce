import express from 'express';
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register' , registerUser)
userRouter.post('/login' , loginUser)
userRouter.post('/admin' , adminLogin)

export default userRouter;

// express.Router() → creates separate route handler

// POST → used to send/create data

// '/register' → API endpoint

// registerUser → controller function that runs for this route

// Final API:
// POST /api/user/register
// POST /api/user/login
// POST /api/user/admin