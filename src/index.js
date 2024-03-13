// src/index.js
const express = require('express')
const bodyParser = require('body-parser')
const { specs, swaggerUi } = require('./swagger/swagger')
const app = express()
const PORT = process.env.PORT || 3000
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const fitnessActivityRoutes = require('./routes/fitnessActivity')
const workoutRoutes = require('./routes/workout')
const nutritionRoutes = require('./routes/nutrition')
const goalRoutes = require('./routes/goal')

app.use(bodyParser.json())

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/fitness-activities', fitnessActivityRoutes)
app.use('/api/workouts', workoutRoutes)
app.use('/api/nutrition', nutritionRoutes)
app.use('/api/goals', goalRoutes)

app.get('/', (req, res) => {
  res.send('Hello, BodySync!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
