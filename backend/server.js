import dotenv from 'dotenv'; //env files
dotenv.config(); // calling dotenv at the top to avoid any env not found error 

import express from 'express';
import mongoose from 'mongoose';
import {useRouter} from './routes/users.js';
import {recipeRouter} from './routes/recipes.js';
import cors from 'cors';
import connectDB from './config/db.js'; //mongo db atlab import 
// import User from "./models/Users.js"; 
// import bcrypt from 'bcryptjs';


connectDB();

const app = express(); // Create an Express application
const PORT = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON data
// app.use(cors()); // Enable CORS for all routes

app.use("/auth", useRouter); // Use the userRouter for routes starting with /auth
app.use("/recipes", recipeRouter); // Use the recipeRouter for routes starting with /recipes

// mongoose.connect("mongodb+srv://prashantihebbar344:prashantihebbar344@cluster0.s1nnc.mongodb.net/db2025?retryWrites=true&w=majority&appName=Cluster0");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});