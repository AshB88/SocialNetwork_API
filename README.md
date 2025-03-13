# SocialNetwork_API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
SocialNetwork_API is a backend API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. This project uses Express.js for routing, a MongoDB database, and the Mongoose ODM. The API allows for the creation, updating, and deletion of users, thoughts, reactions, and friends.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/AshB88/SocialNetwork_API.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd SocialNetwork_API
    ```

3. **Install the dependencies**:
    ```bash
    npm install
    ```

4. Ensure MongoDB is installed and running on your machine.

5. **Start the development server**:
    ```bash
    npm run start
    ```

## Usage

Use Insomnia or any other API client to test the API routes. The server should be running on `http://localhost:3001`.

## API Routes

### Users

- `GET /api/users`: Get all users
- `GET /api/users/:userId`: Get a single user by its `_id` and populated thought and friend data
- `POST /api/users`: Create a new user
    ```json
    {
        "username": "ExampleUsername",
        "email": "example@gmail.com"
    }
    ```
- `PUT /api/users/:userId`: Update a user by its `_id`
- `DELETE /api/users/:userId`: Remove a user by its `_id`

### Friends

- `POST /api/users/:userId/friends/:friendId`: Add a new friend to a user's friend list
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list

### Thoughts

- `GET /api/thoughts`: Get all thoughts
- `GET /api/thoughts/:thoughtId`: Get a single thought by its `_id`
- `POST /api/thoughts`: Create a new thought
    ```json
    {
        "thoughtText": "Example thought...",
        "username": "ExampleUsername",
    }
    ```
- `PUT /api/thoughts/:thoughtId`: Update a thought by its `_id`
    ```json
    {
        "thoughtText": "Updated Example thought..."
    }
- `DELETE /api/thoughts/:thoughtId`: Remove a thought by its `_id`

### Reactions

- `POST /api/thoughts/:thoughtId/reactions`: Create a reaction
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Pull and remove a reaction by the reaction's `_id` value

**Walkthrough Video**:

[Walkthrough link](#https://drive.google.com/file/d/1_nAmWQIwgpG6ZbPj2JdssCcQRY0VA79e/view?usp=sharing)

## Contributing
Contributions are welcome! If you would like to contribute to this project, please follow these steps:

  1. Fork the repository.
  2. Create a new branch (`git checkout -b feature/YourFeature`).
  3. Make your changes and commit them (`git commit -m 'Add some feature'`).
  4. Push to the branch (`git push origin feature/YourFeature`).
  5. Open a pull request to the `main` branch of the original repository.

## License
This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.

## Questions
For any inquiries or feedback, please contact me at:
- **Email**: ashleighb.jjd@gmail.com
- **LinkedIn**: [Ashleigh Brown](https://www.linkedin.com/in/ashleigh-brown-42981834a/)
- **GitHub**: [AshB88](https://github.com/AshB88)

## Acknowledgements

This project was made possible with the help of various resources and contributions. Some of the code was sourced from the instructor-provided files, and additional assistance was provided by GitHub Copilot. Special thanks to the following:

- **Instructor**: For providing the initial project files and guidance.
- **GitHub Copilot**: For offering code suggestions and improvements throughout the development process.