# BodySync - Healthier in your own Way

This project is a comprehensive fitness and wellness tracker that empowers users to manage their health and fitness goals effectively. The app should include features for tracking workouts, monitoring nutrition, setting goals, and providing personalized recommendations for a holistic approach to health and wellness.

## Created by: Kukuh Tri Winarno Nugroho 

- LinkedIn: [Kukuh Tri Winarno Nugroho](https://www.linkedin.com/in/kukuhtri99/)
- Website: [kukuhtri.my.id](https://kukuhtri.my.id/)

---

## Key Features

- **User Management:**
  - User registration and login.
  - User profile management with details such as height, weight, and profile image.

- **Fitness Activities:**
  - View a list of available fitness activities.
  - Admin functionality to add, edit, or delete fitness activities.

- **Workout Tracking:**
  - Log and track workouts with details like date, duration, and calories burned.
  - Set and monitor workout goals.
  - View workout history and statistics.

- **Nutrition Tracking:**
  - Log and track daily nutrition intake.
  - Set and monitor nutrition goals.
  - View nutrition history and statistics.

- **Goal Setting:**
  - Set and manage fitness, nutrition, and wellness goals.
  - Track progress towards goals.
  - Receive notifications and recommendations based on goal progress.

- **Progress Photos:**
  - Upload and view progress photos to track physical changes over time.

- **Notifications:**
  - Receive notifications for workout reminders, goal achievements, and more.

## Database Structure

### Users:

- userId (Primary Key)
- username
- email
- password (hashed)
- height
- weight
- createdAt
- updatedAt

### Fitness Activities:

- activityId (Primary Key)
- activityName
- activityType
- description
- createdAt
- updatedAt

### Workouts:

- workoutId (Primary Key)
- userId (Foreign Key referencing Users table)
- activityId (Foreign Key referencing Fitness Activities table)
- date
- duration
- caloriesBurned
- notes
- createdAt
- updatedAt

### Nutrition Tracking:

- nutritionId (Primary Key)
- userId (Foreign Key referencing Users table)
- date
- mealType
- foodItem
- caloriesConsumed
- protein
- carbohydrates
- fats
- notes
- createdAt
- updatedAt

### Goals:

- goalId (Primary Key)
- userId (Foreign Key referencing Users table)
- goalType (Fitness, Nutrition, Wellness)
- goalDescription
- targetValue
- progress
- achieved (true/false)
- startDate
- endDate
- createdAt
- updatedAt

---

## Modules and Endpoints

### User Module:

- **Register:**
  - Endpoint: `POST /api/register`

- **Login:**
  - Endpoint: `POST /api/login`

- **Get User Profile:**
  - Endpoint: `GET /api/profile`

- **Update User Profile:**
  - Endpoint: `PUT /api/profile`

- **Change Password:**
  - Endpoint: `PUT /api/change-password`

### Fitness Activity Module:

- **Get All Fitness Activities:**
  - Endpoint: `GET /api/fitness-activities`

- **Add New Fitness Activity (Admin):**
  - Endpoint: `POST /api/admin/fitness-activities`

- **Edit Fitness Activity (Admin):**
  - Endpoint: `PUT /api/admin/fitness-activities/:activityId`

- **Delete Fitness Activity (Admin):**
  - Endpoint: `DELETE /api/admin/fitness-activities/:activityId`

### Workout Module:

- **Log Workout:**
  - Endpoint: `POST /api/workouts`

- **Get Workout History:**
  - Endpoint: `GET /api/workouts`

- **Get Workout Statistics:**
  - Endpoint: `GET /api/workouts/statistics`

- **Set Workout Goal:**
  - Endpoint: `POST /api/workouts/goals`

### Nutrition Tracking Module:

- **Log Nutrition:**
  - Endpoint: `POST /api/nutrition`

- **Get Nutrition History:**
  - Endpoint: `GET /api/nutrition`

- **Get Nutrition Statistics:**
  - Endpoint: `GET /api/nutrition/statistics`

- **Set Nutrition Goal:**
  - Endpoint: `POST /api/nutrition/goals`

### Goals Module:

- **Set Fitness Goal:**
  - Endpoint: `POST /api/goals/fitness`

- **Set Nutrition Goal:**
  - Endpoint: `POST /api/goals/nutrition`

- **Set Wellness Goal:**
  - Endpoint: `POST /api/goals/wellness`

- **Get Goal Progress:**
  - Endpoint: `GET /api/goals/progress`

---

## Framework and Technology

- **Node.js and Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
- **Prisma:** Modern database toolkit for PostgreSQL with type-safe database access.
- **Swagger:** API documentation for better developer understanding.
- **ESLint:** JavaScript and TypeScript linter for maintaining code quality.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine.
- PostgreSQL database server running.
- Git installed.

## Getting Started

To get a local copy up and running, follow these simple steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/null-percent/ExpressJS-Template.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ExpressJs-Template
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up the PostgreSQL database:

   - Create a new database and update the database configuration in `prisma/.env`. also change your database schema in prisma/schme.prisma. and then run this :

   ```bash
   npx prisma generate
   ```

5. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

   The server will be running at `http://localhost:3000`.

## API Documentation

Explore the API endpoints using Swagger documentation. Visit `http://localhost:3000/api-docs` in your browser.

## Deploying to Production

To deploy TaskMagnet to a production environment, follow these steps:

1. Set up a production-ready PostgreSQL database.

2. Update the database configuration in `prisma/.env` with production credentials.

3. Build the TypeScript project:

   ```bash
   npm run build
   ```

4. Start the production server:

   ```bash
   npm start
   ```

   The server will be running in production mode.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
