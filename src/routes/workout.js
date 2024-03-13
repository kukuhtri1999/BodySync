// src/routes/workout.js
const express = require('express')
const router = express.Router()
const workoutController = require('../controllers/workoutController')
const authMiddleware = require('../middlewares/authMiddleware')

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Get all workouts.
 *     tags:
 *       - Workout
 *     responses:
 *       '200':
 *         description: Successful retrieval of workouts.
 */
router.get('/', workoutController.getAllWorkouts)

/**
 * @swagger
 * /api/workouts/activity/{activityId}:
 *   get:
 *     summary: Get all workouts related to a specific activity by activityId.
 *     tags:
 *       - Workout
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         description: ID of the activity to retrieve workouts for.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful retrieval of workouts related to the activity.
 *       '404':
 *         description: Activity not found.
 */
router.get('/activity/:activityId', workoutController.getWorkoutsByActivity)

/**
 * @swagger
 * /api/workouts/user/{userId}:
 *   get:
 *     summary: Get all workouts related to a specific user by userId.
 *     tags:
 *       - Workout
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve workouts for.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful retrieval of workouts related to the user.
 *       '404':
 *         description: User not found.
 */
router.get('/user/:userId', authMiddleware.validateUserIdParam, workoutController.getWorkoutsByUser)

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Create a new workout.
 *     tags:
 *       - Workout
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
 *               activityId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               duration:
 *                 type: integer
 *               caloriesBurned:
 *                 type: integer
 *               notes:
 *                 type: string
 *             required:
 *               - userId
 *               - activityId
 *               - date
 *               - duration
 *     responses:
 *       '201':
 *         description: Workout successfully created.
 *       '400':
 *         description: Validation error. Returns an array of errors.
 */
router.post('/', authMiddleware.validateCreateWorkoutInput, workoutController.createWorkout)

/**
 * @swagger
 * /api/workouts/{workoutId}:
 *   delete:
 *     summary: Delete a workout by ID.
 *     tags:
 *       - Workout
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         description: ID of the workout to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Workout successfully deleted.
 *       '404':
 *         description: Workout not found.
 */
router.delete('/:workoutId', workoutController.deleteWorkout)

/**
 * @swagger
 * /api/workouts/{workoutId}:
 *   put:
 *     summary: Update a workout by ID.
 *     tags:
 *       - Workout
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         description: ID of the workout to update.
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
 *               activityId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               duration:
 *                 type: integer
 *               caloriesBurned:
 *                 type: integer
 *               notes:
 *                 type: string
 *             required:
 *               - userId
 *               - activityId
 *               - date
 *               - duration
 *     responses:
 *       '200':
 *         description: Workout successfully updated.
 *       '400':
 *         description: Validation error. Returns an array of errors.
 *       '404':
 *         description: Workout not found.
 */
router.put('/:workoutId', authMiddleware.validateUpdateWorkoutInput, workoutController.updateWorkout)

/**
 * @swagger
 * /api/workouts/{workoutId}:
 *   get:
 *     summary: Get specific workout data by ID.
 *     tags:
 *       - Workout
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         description: ID of the workout to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful retrieval of specific workout data.
 *       '404':
 *         description: Workout not found.
 */
router.get('/:workoutId', workoutController.getWorkoutById)

module.exports = router
