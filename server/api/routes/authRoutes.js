import express from 'express'
import { authenticateUser, authorizeRoles } from '../middlewares/authMiddleware.js'
import { UserSignIn, UserSignUp } from '../controllers/authController.js'

const authRoutes = express.Router()

// Public Routes
authRoutes.post("/signup", UserSignUp)
authRoutes.post("/signin", UserSignIn)

// Authenticated Route
authRoutes.get('/profile', authenticateUser, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}` })
})

// Admin-Only Route
authRoutes.delete('/admin/delete-user', authenticateUser, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'User deleted by admin!' })
})

export default authRoutes;