# User Registration App

This is a simple user registration application built using React and Material-UI for the frontend, and it communicates with a RESTful backend API. The app allows users to register their details and view a list of registered users. It also provides the functionality to delete users.

## Live Demo

You can access the live application at [User Registration App](https://smoke-frontend.vercel.app/).

## Backend API

The backend for this application is hosted at [Smoke API](https://smokeb1-svj8hhvt.b4a.run/).

## Backend API Repository

The backend API code for this application is there at [Smoke API](https://github.com/saikrishnayadav764/smoke_backend). Below are the available endpoints:

### Endpoints

- **POST /register**
  - **Description**: Register a new user.
  - **Request Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string"
    }
    ```
  - **Response**: Returns a success message.

- **GET /users**
  - **Description**: Fetch a list of all registered users.
  - **Response**: Returns an array of users.
  
- **DELETE /user/{id}**
  - **Description**: Delete a user by ID.
  - **Response**: Returns a success message.

## Features

- User registration with validation.
- Real-time user list updates after registration and deletion.
- Snackbar notifications for success/error messages.
- Confirmation dialog before deleting a user.

## Technologies Used

- **Frontend**: React, Material-UI, Axios
- **Backend**: RESTful API (Node.js, Express)

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   npm start
   ```

4. **Visit**: Open your browser and go to `http://localhost:3000`.


---

Feel free to modify any parts to better fit your needs!
