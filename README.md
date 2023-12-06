# First Server with Express, Mongoose and Typescript

this is a Node.js and Express.js application with TypeScript as the programming language, integrating MongoDB with Mongoose for user data and order management. Ensure data integrity through validation using Joi/Zod.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- Express.js installed
- Typescript installed

## Getting Started

Follow these steps to get your project up and running:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/touhidcodes/Level-2-Assignment-2-Server-with-Mongoose-and-Typescript
   ```

2. **Navigate to the project folder:**

```
cd your-repository
```

3. **Install dependencies:**

```
npm install
```

4. **Configure environment variables:**
   Create a .env file in the project root and configure any necessary environment variables. For example:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database
```

3. **Run the application:**

```
npm start
```

#### Your application should now be running at http://localhost:5000.

## API Documentation

#### Live API URL: https://touhidcodes-level-2-asignment-2.vercel.app/

#### API Endpoints:

- POST /api/users
- GET /api/users
- GET /api/users/:userId
- PUT /api/users/:userId
- DELETE /api/users/:userId
- PUT /api/users/:userId/orders
- GET /api/users/:userId/orders
- GET /api/users/:userId/orders/total-price

## Project Dependencies

#### Dependencies List

```
 "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^8.0.1",
    "zod": "^3.22.4"
  },
```

#### Dev Dependencies List

```
 "devDependencies": {
  "@types/bcrypt": "^5.0.2",
  "@types/cors": "^2.8.17",
  "@types/express": "^4.17.21",
  "@types/node": "^20.9.4",
  "@typescript-eslint/eslint-plugin": "^6.12.0",
  "@typescript-eslint/parser": "^6.12.0",
  "eslint": "^8.54.0",
  "eslint-config-prettier": "^9.0.0",
  "ts-node-dev": "^2.0.0",
  "typescript": "^5.3.2"
}
```
