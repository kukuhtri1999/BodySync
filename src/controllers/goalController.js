// src/controllers/goalController.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllGoals = async (req, res) => {
  try {
    const goalData = await prisma.goal.findMany()
    res.status(200).json(goalData)
  } catch (error) {
    console.error('Error retrieving all goal data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getGoalById = async (req, res) => {
  const goalId = parseInt(req.params.goalId, 10)

  try {
    const goal = await prisma.goal.findUnique({
      where: {
        goalId
      }
    })

    if (!goal) {
      return res.status(404).json({ error: 'Goal data not found' })
    }

    res.status(200).json(goal)
  } catch (error) {
    console.error('Error retrieving goal data by ID:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getGoalsByUser = async (req, res) => {
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

    const goalData = await prisma.goal.findMany({
      where: {
        userId
      }
    })

    res.status(200).json(goalData)
  } catch (error) {
    console.error('Error retrieving goal data by user:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteGoal = async (req, res) => {
  const goalId = parseInt(req.params.goalId, 10)

  try {
    const deletedGoal = await prisma.goal.delete({
      where: {
        goalId
      }
    })

    if (!deletedGoal) {
      return res.status(404).json({ error: 'Goal data not found' })
    }

    res.status(204).end()
  } catch (error) {
    console.error('Error deleting goal data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const createGoal = async (req, res) => {
  const { userId, goalType, goalDescription, targetValue, progress, achieved, startDate, endDate } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const newGoal = await prisma.goal.create({
      data: {
        userId,
        goalType,
        goalDescription,
        targetValue,
        progress,
        achieved,
        startDate,
        endDate
      }
    })

    res.status(201).json(newGoal)
  } catch (error) {
    console.error('Error creating goal data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateGoal = async (req, res) => {
  const goalId = parseInt(req.params.goalId, 10)
  const { userId, goalType, goalDescription, targetValue, progress, achieved, startDate, endDate } = req.body

  try {
    // Check if the goal data exists
    const existingGoal = await prisma.goal.findUnique({
      where: {
        goalId
      }
    })

    if (!existingGoal) {
      return res.status(404).json({ error: 'Goal data not found' })
    }

    // Update the goal data
    const updatedGoal = await prisma.goal.update({
      where: {
        goalId
      },
      data: {
        userId,
        goalType,
        goalDescription,
        targetValue,
        progress,
        achieved,
        startDate,
        endDate
      }
    })

    res.status(200).json(updatedGoal)
  } catch (error) {
    console.error('Error updating goal data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getAllGoals,
  getGoalById,
  getGoalsByUser,
  createGoal,
  deleteGoal,
  updateGoal
}
