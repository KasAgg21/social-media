# Social Media App

This is a simplified social media platform built with the MERN stack (MongoDB, Express, React/Next.js, Node.js).

## Key Features

*   **User Authentication**: Secure signup and login functionality.
*   **User Profiles**: Users can create and update their profiles with a name, bio, and profile picture.
*   **Post Creation and Feed**: Users can create text-based posts and view a global feed of all posts.
*   **Post Reactions (Likes)**: Users can like a post multiple times.

## Technologies Used

*   **Frontend**:
    *   Next.js
    *   React.js
    *   Tailwind CSS
    *   Axios
    *   React Context API
*   **Backend**:
    *   Node.js
    *   Express.js
    *   MongoDB
    *   Mongoose
    *   JSON Web Tokens (JWT) for authentication
    *   bcryptjs for password hashing

## Project Setup

### Prerequisites

*   Node.js and npm installed
*   MongoDB Atlas account and a connection string

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Set up environment variables:**
    *   In the `backend` directory, create a `.env` file and add the following:
        ```
        MONGODB_URI=<your_mongodb_connection_string>
        PORT=5000
        JWT_SECRET=<your_jwt_secret>
        ```
    *   Replace `<your_mongodb_connection_string>` with your actual MongoDB connection string.
    *   Replace `<your_jwt_secret>` with a long, random string.

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd backend
    npm start
    ```
    The server will start on port 5000.

2.  **Start the frontend development server:**
    ```bash
    cd ../frontend
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Known Issues/Limitations

*   The frontend has some persistent linter errors related to imports that need to be resolved.
*   No real-time updates for new posts or likes; a manual refresh is required.
*   Image uploads are not supported; profile pictures are URLs.
*   No error handling on the frontend for failed API requests.
*   The application is not yet deployed. 