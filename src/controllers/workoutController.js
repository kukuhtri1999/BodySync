// src/controllers/workoutController.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await prisma.workout.findMany()
    res.status(200).json(workouts)
  } catch (error) {
    console.error('Error retrieving workouts:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getWorkoutsByActivity = async (req, res) => {
  const activityId = parseInt(req.params.activityId, 10)

  try {
    const activity = await prisma.fitnessActivity.findUnique({
      where: {
        activityId
      }
    })

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' })
    }

    const workouts = await prisma.workout.findMany({
      where: {
        activityId
      }
    })

    res.status(200).json(workouts)
  } catch (error) {
    console.error('Error retrieving workouts by activity:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getWorkoutsByUser = async (req, res) => {
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

    const workouts = await prisma.workout.findMany({
      where: {
        userId
      }
    })

    res.status(200).json(workouts)
  } catch (error) {
    console.error('Error retrieving workouts by user:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const createWorkout = async (req, res) => {
  const { userId, activityId, date, duration, caloriesBurned, notes } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const activity = await prisma.fitnessActivity.findUnique({
      where: {
        activityId
      }
    })

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' })
    }

    const newWorkout = await prisma.workout.create({
      data: {
        userId,
        activityId,
        date,
        duration,
        caloriesBurned,
        notes
      }
    })

    res.status(201).json(newWorkout)
  } catch (error) {
    console.error('Error creating workout:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteWorkout = async (req, res) => {
  const workoutId = parseInt(req.params.workoutId, 10)

  try {
    const deletedWorkout = await prisma.workout.delete({
      where: {
        workoutId
      }
    })

    if (!deletedWorkout) {
      return res.status(404).json({ error: 'Workout not found' })
    }

    res.status(204).end()
  } catch (error) {
    console.error('Error deleting workout:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateWorkout = async (req, res) => {
  const workoutId = parseInt(req.params.workoutId, 10)
  const { userId, activityId, date, duration, caloriesBurned, notes } = req.body

  try {
    // Check if the workout exists
    const existingWorkout = await prisma.workout.findUnique({
      where: {
        workoutId
      }
    })

    if (!existingWorkout) {
      return res.status(404).json({ error: 'Workout not found' })
    }

    // Update the workout
    const updatedWorkout = await prisma.workout.update({
      where: {
        workoutId
      },
      data: {
        userId,
        activityId,
        date,
        duration,
        caloriesBurned,
        notes
      }
    })

    res.status(200).json(updatedWorkout)
  } catch (error) {
    console.error('Error updating workout:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getWorkoutById = async (req, res) => {
  const workoutId = parseInt(req.params.workoutId, 10)

  try {
    const workout = await prisma.workout.findUnique({
      where: {
        workoutId
      }
    })

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' })
    }

    res.status(200).json(workout)
  } catch (error) {
    console.error('Error retrieving specific workout data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getAllWorkouts,
  getWorkoutsByActivity,
  getWorkoutsByUser,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  getWorkoutById
}
