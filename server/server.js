import express from "express";
import cors from "cors";

import { MongoDBConnection } from "./config/db.js";
import { PORT } from './config/env.js'
import authRoutes from "./api/routes/authRoutes.js";
import blogRoutes from "./api/routes/blogRoutes.js";


// Init express app
const app = express()

// Allow CORS from frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware to parse JSON
app.use(express.json())

// Sample route
app.get('/', (req, res) => {
  res.send('Likho.in backend is running ')
})

// authRoutes
app.use("/api/auth", authRoutes)
app.use('/api/blogs', blogRoutes);


// Server listen
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)

  // Connet to DB
  MongoDBConnection()
})