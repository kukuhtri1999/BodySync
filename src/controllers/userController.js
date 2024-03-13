// src/controllers/userController.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        userId: true,
        email: true,
        username: true
      }
    })
    res.status(200).json(users)
  } catch (error) {
    console.error('Error retrieving user list:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getUserDetails = async (req, res) => {
  const userId = parseInt(req.params.userId, 10)

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error('Error retrieving user details:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.userId, 10)

  try {
    const deletedUser = await prisma.user.delete({
      where: {
        userId
      }
    })

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.status(204).json({ message: 'delete user successful' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateUserProfile = async (req, res) => {
  const userId = parseInt(req.params.userId, 10)
  const { username, email, password, newPassword, height, weight } = req.body

  try {
    // Retrieve the user
    const user = await prisma.user.findUnique({
      where: {
        userId
      }
    })

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Check if the provided password matches the user's current password
    if (password && !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Incorrect old password' })
    }

    // Hash the new password if provided
    const hashedNewPassword = newPassword ? await bcrypt.hash(newPassword, 10) : null

    // Update the user profile
    const updatedUser = await prisma.user.update({
      where: {
        userId
      },
      data: {
        username,
        email,
        password: hashedNewPassword || user.password,
        height,
        weight
      }
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error updating user profile:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getAllUsers,
  getUserDetails,
  deleteUser,
  updateUserProfile
}
