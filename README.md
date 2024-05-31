# Business Card API

This project is a Node.js API built with Express, enabling users to create and manage business cards. It supports various user roles, including business users, admin users, and regular users.

## Features

- **Users:**
  - Get Users
  - Register User
  - Login
  - Get User By ID
  - Edit User
  - Delete User
  - Patch User's Business Status
- **Cards:**
  - Get Cards
  - Get User's Cards
  - Get Card By ID
  - Create Card
  - Edit Card
  - Like Card
  - Patch Card Business Number
  - Delete Card

## Authentication

The API uses JWT for authentication. Tokens include properties for user roles (`isBusiness`, `isAdmin`) and user ID. Authorization middleware ensures appropriate permissions for protected endpoints.

## Project Structure

```plaintext
src
├── auth
│   └── Providers
├── cards
│   ├── data
│   ├── models
│   │   └── mongodb
│   ├── routes
│   ├── utils
│   └── validations
│       └── joi
├── common
│   └── mongodb
├── db
│   └── mongodb
├── initialData
│   └── mongodb
├── logger
│   └── loggers
├── router
└── users
    ├── data
    ├── models
    │   └── mongodb
    ├── routes
    └── utils
```

## Environment Variables

- `PORT=8181`
- `MONGO_URI=mongodb://localhost:27017/business-card-app` # If you'd like to connect to Atlas, you can put here the full URI (including db username + password)
- `TOKEN_GENERATOR=jwt`
- `LOGGER=morgan`
- `DB=MONGODB`
- `PEPPER=pepper`
- `LOG_LEVEL=INFO`
- `TOKEN_SECRET=secret-key`

## Error Handling and Logging

Errors are logged using Morgan and handled by middleware. Errors with a status code above 400 are logged to `logs/<Date>.log`.

## Dependencies

- `bcrypt`
- `chalk`
- `cors`
- `express`
- `joi`
- `jsonwebtoken`
- `lodash`
- `mongoose`
- `morgan`

## Dev Dependencies

- `@types/bcrypt`
- `@types/chalk`
- `@types/cors`
- `@types/express`
- `@types/jsonwebtoken`
- `@types/lodash`
- `@types/mongoose`
- `@types/morgan`
- `@types/node`
- `nodemon`
- `ts-node`
- `typescript`

## Installation

1. Clone the repo:
    ```bash
    git clone <repository-url>
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables in `.env` file.
4. Run the server (This will compile the project to js and run it.):
    ```bash
    npm start
    ```
