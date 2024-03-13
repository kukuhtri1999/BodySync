// src/routes/fitnessActivity.js
const express = require('express')
const router = express.Router()
const fitnessActivityController = require('../controllers/fitnessActivityController')
const authMiddleware = require('../middlewares/authMiddleware')

/**
 * @swagger
 * /api/fitness-activities:
 *   get:
 *     summary: Get all fitness activities.
 *     tags:
 *       - FitnessActivity
 *     responses:
 *       '200':
 *         description: Successful retrieval of fitness activities.
 */
router.get('/', fitnessActivityController.getAllFitnessActivities)

/**
 * @swagger
 * /api/fitness-activities:
 *   post:
 *     summary: Create a new fitness activity.
 *     tags:
 *       - FitnessActivity
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activityName:
 *                 type: string
 *               activityType:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - activityName
 *               - activityType
 *     responses:
 *       '201':
 *         description: Fitness activity successfully created.
 *       '400':
 *         description: Validation error. Returns an array of errors.
 */
router.post('/', authMiddleware.validateCreateFitnessActivityInput, fitnessActivityController.createFitnessActivity)

/**
 * @swagger
 * /api/fitness-activities/{activityId}:
 *   put:
 *     summary: Update fitness activity by ID.
 *     tags:
 *       - FitnessActivity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         description: ID of the fitness activity to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activityName:
 *                 type: string
 *               activityType:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - activityName
 *               - activityType
 *     responses:
 *       '200':
 *         description: Fitness activity successfully updated.
 *       '400':
 *         description: Validation error. Returns an array of errors.
 *       '404':
 *         description: Fitness activity not found.
 */
router.put('/fitness-activities/:activityId', authMiddleware.validateUpdateFitnessActivityInput, fitnessActivityController.updateFitnessActivity)

/**
 * @swagger
 * /api/fitness-activities/{activityId}:
 *   delete:
 *     summary: Delete fitness activity by ID.
 *     tags:
 *       - FitnessActivity
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         description: ID of the fitness activity to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Fitness activity successfully deleted.
 *       '404':
 *         description: Fitness activity not found.
 */
router.delete('/:activityId', fitnessActivityController.deleteFitnessActivity)

module.exports = router
