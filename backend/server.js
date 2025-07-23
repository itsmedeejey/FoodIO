import dotenv from 'dotenv'; //env files
dotenv.config(); // calling dotenv at the top to avoid any env not found error 

import express from 'express';
import mongoose from 'mongoose';
import {useRouter} from './routes/users.js';
import {recipeRouter} from './routes/recipes.js';
import cors from 'cors';
import connectDB from './config/db.js'; //mongo db atlab import 
import cookieParser from 'cookie-parser';
// import User from "./models/Users.js"; 
// import bcrypt from 'bcryptjs';


connectDB();  //connecttin mong atlas

const app = express(); // Create an Express application
const PORT = 3001;
console.log(process.env.FRONTEND_URL)
app.use(cors({
  origin: ['http://localhost:3000','http://localhost:3001','http://localhost:3002'],
  credentials: true
})); // Enable CORS for all routes
app.use(cookieParser())
;app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});
app.use(express.json()); // Middleware to parse JSON data
// app.use(cors()); // Enable CORS for all routes

app.use("/auth", useRouter); // Use the userRouter for routes starting with /auth
app.use("/recipes", recipeRouter); // Use the recipeRouter for routes starting with /recipes

// mongoose.connect("mongodb+srv://prashantihebbar344:prashantihebbar344@cluster0.s1nnc.mongodb.net/db2025?retryWrites=true&w=majority&appName=Cluster0");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});