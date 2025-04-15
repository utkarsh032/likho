import express from "express";

import { MongoDBConnection } from "./config/db.js";
import { PORT } from './config/env.js'
import authRoutes from "./api/routes/authRoutes.js";

// Init express app
const app = express()

// Middleware to parse JSON
app.use(express.json())

// Sample route
app.get('/', (req, res) => {
  res.send('Likho.in backend is running ')
})

// authRoutes
app.use("/api/auth", authRoutes)


// Server listen
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)

  // Connet to DB
  MongoDBConnection()
})