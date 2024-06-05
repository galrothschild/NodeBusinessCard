# Business Card API

This project is a Node.js API built with Express, enabling users to create and manage business cards. It supports various user roles, including business users, admin users, and regular users.
You can read the documentation here: https://documenter.getpostman.com/view/34926651/2sA3QqesJn

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

There is also an option for logging in with google with google's auth library with oauth2. It requires the frontend to have a login with google button that sends a get request to /users/auth/google and redirects to the url provided from that endpoint. it then continues with google's authentication and confirmation, then it will redirect to an endpoint in the front end called /google-login with a token in the url params, take that token and login with it in the front end.

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
- `GOOGLE_CLIENT_ID=xxxxxxxxx.apps.googleusercontent.com`
- `GOOGLE_CLIENT_SECRET=XXXXXXXX`
- `GOOGLE_CALLBACK_URL=http://localhost:8181/users/auth/google/callback` # The URL for the callback needs to be the URL you are hosting the API on /users/auth/google/callback
- `FRONTEND_URL=http://localhost:3000` # Also needs to be adjusted per your frontend domain or port if in dev

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
- `google-auth-library`

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
