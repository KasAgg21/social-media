# Social Media Platform

This project is a simplified social media platform built using the MERN stack (MongoDB, Express, React/Next.js, Node.js), allowing users to sign up, create profiles, make posts, and interact with posts from other users.

## Key Features

*   **User Authentication**: Secure user signup and login functionality.
*   **User Profiles**: Users can create and update their profiles, which include a name, a short bio, and a profile picture.
*   **Profile Avatar Uploads**: Users can upload custom profile pictures.
*   **Post Creation and Feed**: Authenticated users can create text-based posts and posts with images. All posts are displayed in a global feed visible to every user.
*   **Post Reactions (Likes)**: Users can like any post multiple times. The system tracks and displays the total number of likes for each post.

## Technologies Used

*   **Frontend**:
    *   Next.js / React.js
    *   Tailwind CSS for styling
    *   Axios for API requests
*   **Backend**:
    *   Node.js with Express.js
    *   MongoDB with Mongoose for database management
    *   JSON Web Tokens (JWT) for secure authentication
    *   `bcryptjs` for password hashing

## Project Setup

### Prerequisites

*   Node.js and npm (or yarn) installed on your machine.
*   A MongoDB Atlas account and your connection string.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Set up the backend:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    MONGODB_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    PORT=5000
    ```
    Replace the placeholder values with your actual MongoDB connection string and a secret key for JWT.

3.  **Set up the frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd backend
    npm start
    ```

2.  **Start the frontend development server:**
    ```bash
    cd ../frontend
    npm run dev
    ```
