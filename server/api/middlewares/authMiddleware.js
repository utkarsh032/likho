import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../../config/env.js"

// Middleware to authenticate user
export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

// Middleware to authorize based on role
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient role.' })
    }
    next()
  }
}
