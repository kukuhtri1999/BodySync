// src/routes/user.js
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users with limited details (email, username).
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: Successful retrieval of user list.
 */
router.get('/', userController.getAllUsers)

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: Get details of a specific user by ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve details for.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful retrieval of user details.
 *       '404':
 *         description: User not found.
 */
router.get('/:userId', userController.getUserDetails)

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete a user by ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: User successfully deleted.
 *       '404':
 *         description: User not found.
 */
router.delete('/:userId', userController.deleteUser)

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Update user profile by ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               height:
 *                 type: number
 *               weight:
 *                 type: number
 *             required:
 *               - username
 *               - email
 *               - height
 *               - weight
 *     responses:
 *       '200':
 *         description: User profile successfully updated.
 *       '400':
 *         description: Validation error. Returns an array of errors.
 *       '401':
 *         description: Unauthorized - Old password incorrect.
 *       '404':
 *         description: User not found.
 */
router.put('/:userId', authMiddleware.validateUpdateProfileInput, userController.updateUserProfile)

module.exports = router
