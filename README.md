### Wheel of Fooddune

Wheel of Fooddune is a practice project designed to help coworkers choose randomized lunch options from a curated list of food options. It allows users to:

    Manage food options with CRUD operations.
    Retrieve random options based on availability.
    Authenticate users with JWT-based authentication.
    Manage users via a user management system.

Built using Express, Sequelize, and TypeScript, this project demonstrates REST API design, database interactions, authentication, and Swagger documentation.

#### Features

    Authentication: Secure endpoints with JWT authentication.
    Food Options Management:
        List, create, update, and delete food options.
        Retrieve random food options based on current or specific times.
    User Management:
        List, create, update, and delete users.
    API Documentation: Interactive Swagger documentation for all API endpoints.

#### Tech Stack

    Backend: Node.js, Express
    Database: Sequelize ORM, SQLite3
    Authentication: JSON Web Tokens (JWT), bcrypt.js
    Documentation: Swagger (swagger-jsdoc, swagger-ui-express)
    Language: TypeScript

#### Prerequisites

    Node.js (v18+)
    SQLite3
    npm or yarn

#### API Endpoints
##### Authentication

    POST /api/auth/login
    Authenticate a user and receive a JWT token.

##### Food Options

    GET /api/foodOptions
    List all food options.
    GET /api/foodOptions/:id
    Get a specific food option by ID.
    GET /api/foodOptions/random-now
    Get a random food option that is currently open.
    POST /api/foodOptions/random-specific-time
    Get a random food option for a specific time.
    POST /api/foodOptions
    Create a new food option.
    PUT /api/foodOptions/:id
    Update an existing food option by ID.
    DELETE /api/foodOptions/:id
    Delete a food option by ID.

##### Users

    GET /api/users
    List all users.
    GET /api/users/:id
    Get a specific user by ID.
    POST /api/users
    Create a new user.
    PUT /api/users/:id
    Update an existing user by ID.
    DELETE /api/users/:id
    Delete a user by ID.

##### Swagger Documentation

    GET /api/docs
    Access interactive API documentation.
