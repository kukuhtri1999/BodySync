// src/routes/nutrition.js
const express = require('express')
const router = express.Router()
const nutritionController = require('../controllers/nutritionController')
const authMiddleware = require('../middlewares/authMiddleware')

/**
 * @swagger
 * /api/nutrition:
 *   get:
 *     summary: Get all nutrition data.
 *     tags:
 *       - Nutrition
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful retrieval of all nutrition data.
 */
router.get('/', nutritionController.getAllNutrition)

/**
 * @swagger
 * /api/nutrition/{nutritionId}:
 *   get:
 *     summary: Get nutrition data by ID.
 *     tags:
 *       - Nutrition
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nutritionId
 *         required: true
 *         description: ID of the nutrition data to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful retrieval of nutrition data by ID.
 *       '404':
 *         description: Nutrition data not found.
 */
router.get('/:nutritionId', nutritionController.getNutritionById)

/**
 * @swagger
 * /api/nutrition/user/{userId}:
 *   get:
 *     summary: Get all nutrition data related to a specific user by userId.
 *     tags:
 *       - Nutrition
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve nutrition data for.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful retrieval of nutrition data related to the user.
 *       '404':
 *         description: User not found.
 */
router.get('/user/:userId', authMiddleware.validateUserIdParam, nutritionController.getNutritionByUser)

/**
 * @swagger
 * /api/nutrition:
 *   post:
 *     summary: Create new nutrition data.
 *     tags:
 *       - Nutrition
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               mealType:
 *                 type: string
 *               foodItem:
 *                 type: string
 *               caloriesConsumed:
 *                 type: integer
 *               protein:
 *                 type: integer
 *               carbohydrates:
 *                 type: integer
 *               fats:
 *                 type: integer
 *             required:
 *               - userId
 *               - date
 *               - mealType
 *               - foodItem
 *               - caloriesConsumed
 *               - protein
 *               - carbohydrates
 *               - fats
 *     responses:
 *       '201':
 *         description: Nutrition data successfully created.
 *       '400':
 *         description: Validation error. Returns an array of errors.
 */
router.post('/', authMiddleware.validateCreateNutritionInput, nutritionController.createNutrition)

/**
 * @swagger
 * /api/nutrition/{nutritionId}:
 *   delete:
 *     summary: Delete nutrition data by ID.
 *     tags:
 *       - Nutrition
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nutritionId
 *         required: true
 *         description: ID of the nutrition data to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Nutrition data successfully deleted.
 *       '404':
 *         description: Nutrition data not found.
 */
router.delete('/:nutritionId', nutritionController.deleteNutrition)

/**
 * @swagger
 * /api/nutrition/{nutritionId}:
 *   put:
 *     summary: Update nutrition data by ID.
 *     tags:
 *       - Nutrition
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nutritionId
 *         required: true
 *         description: ID of the nutrition data to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               mealType:
 *                 type: string
 *               foodItem:
 *                 type: string
 *               caloriesConsumed:
 *                 type: integer
 *               protein:
 *                 type: integer
 *               carbohydrates:
 *                 type: integer
 *               fats:
 *                 type: integer
 *             required:
 *               - userId
 *               - date
 *               - mealType
 *               - foodItem
 *               - caloriesConsumed
 *               - protein
 *               - carbohydrates
 *               - fats
 *     responses:
 *       '200':
 *         description: Nutrition data successfully updated.
 *       '400':
 *         description: Validation error. Returns an array of errors.
 *       '404':
 *         description: Nutrition data not found.
 */
router.put('/:nutritionId', authMiddleware.validateUpdateNutritionInput, nutritionController.updateNutrition)

module.exports = router
