// src/controllers/nutritionController.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllNutrition = async (req, res) => {
  try {
    const nutritionData = await prisma.nutrition.findMany()
    res.status(200).json(nutritionData)
  } catch (error) {
    console.error('Error retrieving all nutrition data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getNutritionById = async (req, res) => {
  const nutritionId = parseInt(req.params.nutritionId, 10)

  try {
    const nutrition = await prisma.nutrition.findUnique({
      where: {
        nutritionId
      }
    })

    if (!nutrition) {
      return res.status(404).json({ error: 'Nutrition data not found' })
    }

    res.status(200).json(nutrition)
  } catch (error) {
    console.error('Error retrieving nutrition data by ID:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getNutritionByUser = async (req, res) => {
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

    const nutritionData = await prisma.nutrition.findMany({
      where: {
        userId
      }
    })

    res.status(200).json(nutritionData)
  } catch (error) {
    console.error('Error retrieving nutrition data by user:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const createNutrition = async (req, res) => {
  const { userId, date, mealType, foodItem, caloriesConsumed, protein, carbohydrates, fats } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const newNutrition = await prisma.nutrition.create({
      data: {
        userId,
        date,
        mealType,
        foodItem,
        caloriesConsumed,
        protein,
        carbohydrates,
        fats
      }
    })

    res.status(201).json(newNutrition)
  } catch (error) {
    console.error('Error creating nutrition data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const deleteNutrition = async (req, res) => {
  const nutritionId = parseInt(req.params.nutritionId, 10)

  try {
    const deletedNutrition = await prisma.nutrition.delete({
      where: {
        nutritionId
      }
    })

    if (!deletedNutrition) {
      return res.status(404).json({ error: 'Nutrition data not found' })
    }

    res.status(204).end()
  } catch (error) {
    console.error('Error deleting nutrition data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const updateNutrition = async (req, res) => {
  const nutritionId = parseInt(req.params.nutritionId, 10)
  const { userId, date, mealType, foodItem, caloriesConsumed, protein, carbohydrates, fats } = req.body

  try {
    // Check if the nutrition data exists
    const existingNutrition = await prisma.nutrition.findUnique({
      where: {
        nutritionId
      }
    })

    if (!existingNutrition) {
      return res.status(404).json({ error: 'Nutrition data not found' })
    }

    // Update the nutrition data
    const updatedNutrition = await prisma.nutrition.update({
      where: {
        nutritionId
      },
      data: {
        userId,
        date,
        mealType,
        foodItem,
        caloriesConsumed,
        protein,
        carbohydrates,
        fats
      }
    })

    res.status(200).json(updatedNutrition)
  } catch (error) {
    console.error('Error updating nutrition data:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getAllNutrition,
  getNutritionById,
  getNutritionByUser,
  createNutrition,
  deleteNutrition,
  updateNutrition
}
