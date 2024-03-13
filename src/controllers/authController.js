// src/controllers/authController.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Adjust the expiration time as needed
    })

    // Send the token in the response
    res.status(200).json({ token })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const register = async (req, res) => {
  const { username, email, password, height, weight } = req.body

  try {
    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' })
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user in the database without specifying userId
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        height,
        weight
      }
    })

    res.status(201).json({ message: 'User successfully registered', user: newUser })
  } catch (error) {
    console.error('Error during registration:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const logout = async (req, res) => {
  // Assuming you are using JWT and the token is included in the Authorization header
  // const token = req.headers.authorization

  // The client is responsible for destroying the token, so no server-side action needed
  res.status(200).json({ message: 'Logout successful' })
}

module.exports = {
  login, register, logout
}
