import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from "../models/userModel.js"
import { JWT_SECRET } from '../../config/env.js'

// Sign-Up
export const UserSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existingEmail = await User.findOne({ "personal_info.email": email })
    if (existingEmail) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔒 Password Hashing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create New User
    const newUser = new User({
      personal_info: {
        username,
        email,
        password: hashedPassword,
        fullname: username
      }
    })

    await newUser.save()

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.personal_info.email,
        username: newUser.personal_info.username
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: error.message });
  }
}


// Sign-In
export const UserSignIn = async (req, res) => {
  try {
    const { email, password } = req.body

    // email validation
    const user = await User.findOne({ "personal_info.email": email })
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    // compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.personal_info.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.personal_info.email, role: user.personal_info.role, },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Send Responses
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.personal_info.username,
        email: user.personal_info.email
      }
    })

  } catch (error) {
    console.error("Signin error:", error)
    res.status(500).json({ message: error.message })
  }
}

