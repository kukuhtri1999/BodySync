# BodySync - Healthier in your own Way

This project is a comprehensive fitness and wellness tracker that empowers users to manage their health and fitness goals effectively. The app should include features for tracking workouts, monitoring nutrition, setting goals, and providing personalized recommendations for a holistic approach to health and wellness.

## Created by: Kukuh Tri Winarno Nugroho 

- LinkedIn: [Kukuh Tri Winarno Nugroho](https://www.linkedin.com/in/kukuhtri99/)
- Website: [kukuhtri.my.id](https://kukuhtri.my.id/)

---

## Features

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
