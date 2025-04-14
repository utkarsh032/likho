import mongoose from 'mongoose'
import { MONGODB_URI } from './env.js'

// Database Connection
export const MongoDBConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log(`MongoDB database Successfully!`);
  } catch (error) {
    console.error('Error connecting to database:', error)
  }
}