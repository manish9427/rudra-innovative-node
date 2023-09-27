## Usage

To use the API, you can make HTTP requests to the following endpoints:

- Authentication:

  - `POST /api/auth/register`: Register a new user.
  - `POST /api/auth/login`: Log in as a registered user.

- User Management:

  - `POST /api/users`: Create a new user.
  - `GET /api/users`: Retrieve all users.
  - `PUT /api/users/:id`: Update a user by ID.
  - `DELETE /api/users/:id`: Delete a user by ID.

- Forget Password:
  - `POST /api/forgetpassword/forget`: Send a password reset link to the user's email.
  - `POST /api/forgetpassword/reset/:token`: Reset the user's password using a token (replace `:token` with the actual token).

Examples and details for each endpoint can be found in the API documentation.
