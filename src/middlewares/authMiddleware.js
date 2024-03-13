// src/middlewares/authMiddleware.js
const { param, body, validationResult } = require('express-validator')

const validateLoginInput = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

const validateRegistrationInput = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('height').isNumeric().withMessage('Invalid height'),
  body('weight').isNumeric().withMessage('Invalid weight'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

const validateUpdateProfileInput = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('newPassword').optional().isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  body('height').isNumeric().withMessage('Invalid height'),
  body('weight').isNumeric().withMessage('Invalid weight'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

const validateCreateFitnessActivityInput = [
  body('activityName').isLength({ min: 3 }).withMessage('Activity name must be at least 3 characters'),
  body('activityType').isLength({ min: 3 }).withMessage('Activity type must be at least 3 characters'),
  body('description').optional().isLength({ min: 5 }).withMessage('Description must be at least 5 characters'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

const validateUpdateFitnessActivityInput = [
  body('activityName').isLength({ min: 3 }).withMessage('Activity name must be at least 3 characters'),
  body('activityType').isLength({ min: 3 }).withMessage('Activity type must be at least 3 characters'),
  body('description').optional().isLength({ min: 5 }).withMessage('Description must be at least 5 characters'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

const validateUserIdParam = [
  param('userId').isInt().withMessage('Invalid userId parameter'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

const validateCreateWorkoutInput = [
  body('userId').isInt().withMessage('Invalid userId'),
  body('activityId').isInt().withMessage('Invalid activityId'),
  body('date').isISO8601().toDate().withMessage('Invalid date format'),
  body('duration').isInt().withMessage('Invalid duration'),
  body('caloriesBurned').isInt().withMessage('Invalid caloriesBurned'),
  body('notes').optional().isString().withMessage('Notes must be a string'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

const validateUpdateWorkoutInput = [
  param('workoutId').isInt().withMessage('Invalid workoutId parameter'),
  body('userId').isInt().withMessage('Invalid userId'),
  body('activityId').isInt().withMessage('Invalid activityId'),
  body('date').isISO8601().toDate().withMessage('Invalid date format'),
  body('duration').isInt().withMessage('Invalid duration'),
  body('caloriesBurned').isInt().withMessage('Invalid caloriesBurned'),
  body('notes').optional().isString().withMessage('Notes must be a string'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

const validateWorkoutIdParam = [
  param('workoutId').isInt().withMessage('Invalid workoutId parameter'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
]

module.exports = {
  validateLoginInput, validateRegistrationInput, validateUpdateProfileInput, validateCreateFitnessActivityInput, validateUpdateFitnessActivityInput, validateUserIdParam, validateCreateWorkoutInput, validateUpdateWorkoutInput, validateWorkoutIdParam
}
