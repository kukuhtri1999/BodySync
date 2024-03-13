// swagger/swagger.js
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BodySync - Healthier in your own Way',
      version: '1.0.0',
      description:
        'This is NodeJS and ExpressJS project, This App is a comprehensive fitness and wellness tracker that empowers users to manage their health and fitness goals effectively. The app should include features for tracking workouts, monitoring nutrition, setting goals, and providing personalized recommendations for a holistic approach to health and wellness',
      contact: {
        name: 'Kukuh Tri Winarno Nugroho',
        email: 'kukuhtri99@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update with your actual server URL
        description: 'Development Server'
      }
      // Add more servers for different environments if needed
    ]
  },
  apis: ['./src/**/*.js'] // Path to your API routes
}

const specs = swaggerJsdoc(options)

module.exports = { specs, swaggerUi }
