// src/controllers/fitnessActivityController.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllFitnessActivities = async (req, res) => {
  try {
    const fitnessActivities = await prisma.fitnessActivity.findMany()
    res.status(200).json(fitnessActivities)
  } catch (error) {
    console.error('Error retrieving fitness activities:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const createFitnessActivity = async (req, res) => {
  const { activityName, activityType, description } = req.body

  try {
    const newFitnessActivity = await prisma.fitnessActivity.create({
      data: {
        activityName,
        activityType,
        description
      }
    })

    res.status(201).json(newFitnessActivity)
  } catch (error) {
    console.error('Error creating fitness activity:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateFitnessActivity = async (req, res) => {
  const activityId = parseInt(req.params.activityId, 10)
  const { activityName, activityType, description } = req.body

  try {
    // Retrieve the fitness activity
    const fitnessActivity = await prisma.fitnessActivity.findUnique({
      where: {
        activityId
      }
    })

    // Check if the fitness activity exists
    if (!fitnessActivity) {
      return res.status(404).json({ error: 'Fitness activity not found' })
    }

    // Update the fitness activity
    const updatedFitnessActivity = await prisma.fitnessActivity.update({
      where: {
        activityId
      },
      data: {
        activityName,
        activityType,
        description
      }
    })

    res.status(200).json(updatedFitnessActivity)
  } catch (error) {
    console.error('Error updating fitness activity:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteFitnessActivity = async (req, res) => {
  const activityId = parseInt(req.params.activityId, 10)

  try {
    const deletedFitnessActivity = await prisma.fitnessActivity.delete({
      where: {
        activityId
      }
    })

    if (!deletedFitnessActivity) {
      return res.status(404).json({ error: 'Fitness activity not found' })
    }

    res.status(204).end()
  } catch (error) {
    console.error('Error deleting fitness activity:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getAllFitnessActivities,
  createFitnessActivity,
  updateFitnessActivity,
  deleteFitnessActivity
}
