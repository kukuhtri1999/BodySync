// src/routes/auth.js
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login to the BodySync app.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       '200':
 *         description: Successful login. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 *       '401':
 *         description: Invalid credentials.
 */
router.post('/login', authMiddleware.validateLoginInput, authController.login)

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user in the BodySync app.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: User's password.
 *               height:
 *                 type: number
 *                 description: User's height in meters.
 *               weight:
 *                 type: number
 *                 description: User's weight in kilograms.
 *     responses:
 *       '201':
 *         description: User successfully registered.
 *       '400':
 *         description: Validation error. Returns an array of errors.
 */
router.post('/register', authMiddleware.validateRegistrationInput, authController.register)

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout from the BodySync app.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful logout.
 */
router.post('/logout', authController.logout)

module.exports = router
