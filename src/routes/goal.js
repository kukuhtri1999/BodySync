// src/routes/goal.js
const express = require('express')
const router = express.Router()
const goalController = require('../controllers/goalController')
const authMiddleware = require('../middlewares/authMiddleware')

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get all goal data.
 *     tags:
 *       - Goal
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful retrieval of all goal data.
 */
router.get('/', goalController.getAllGoals)

/**
 * @swagger
 * /api/goals/{goalId}:
 *   get:
 *     summary: Get goal data by ID.
 *     tags:
 *       - Goal
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         description: ID of the goal data to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful retrieval of goal data by ID.
 *       '404':
 *         description: Goal data not found.
 */
router.get('/:goalId', goalController.getGoalById)

/**
 * @swagger
 * /api/goals/user/{userId}:
 *   get:
 *     summary: Get all goal data related to a specific user by userId.
 *     tags:
 *       - Goal
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve goal data for.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful retrieval of goal data related to the user.
 *       '404':
 *         description: User not found.
 */
router.get('/user/:userId', authMiddleware.validateUserIdParam, goalController.getGoalsByUser)

/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Create new goal data.
 *     tags:
 *       - Goal
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
 *               goalType:
 *                 type: string
 *               goalDescription:
 *                 type: string
 *               targetValue:
 *                 type: number
 *               progress:
 *                 type: number
 *               achieved:
 *                 type: boolean
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - userId
 *               - goalType
 *               - goalDescription
 *               - targetValue
 *               - progress
 *               - achieved
 *               - startDate
 *               - endDate
 *     responses:
 *       '201':
 *         description: Goal data successfully created.
 *       '400':
 *         description: Validation error. Returns an array of errors.
 */
router.post('/', authMiddleware.validateCreateGoalInput, goalController.createGoal)

/**
 * @swagger
 * /api/goals/{goalId}:
 *   put:
 *     summary: Update goal data by ID.
 *     tags:
 *       - Goal
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         description: ID of the goal data to update.
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
 *               goalType:
 *                 type: string
 *               goalDescription:
 *                 type: string
 *               targetValue:
 *                 type: number
 *               progress:
 *                 type: number
 *               achieved:
 *                 type: boolean
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *             required:
 *               - userId
 *               - goalType
 *               - goalDescription
 *               - targetValue
 *               - progress
 *               - achieved
 *               - startDate
 *               - endDate
 *     responses:
 *       '200':
 *         description: Goal data successfully updated.
 *       '400':
 *         description: Validation error. Returns an array of errors.
 *       '404':
 *         description: Goal data not found.
 */
router.put('/:goalId', authMiddleware.validateUpdateGoalInput, goalController.updateGoal)

/**
 * @swagger
 * /api/goals/{goalId}:
 *   delete:
 *     summary: Delete goal data by ID.
 *     tags:
 *       - Goal
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: goalId
 *         required: true
 *         description: ID of the goal data to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Goal data successfully deleted.
 *       '404':
 *         description: Goal data not found.
 */
router.delete('/:goalId', goalController.deleteGoal)

module.exports = router
