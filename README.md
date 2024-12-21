
# Blog Project

## Overview

The goal of this project is to develop a backend for a blogging platform where users can write, update, and delete their blogs. The system includes two roles: **Admin** and **User**.

- **Admin**: Has special permissions to manage users and their blogs.
- **User**: Can perform CRUD operations on their own blogs.

The backend includes secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

## Live URL

[Deployment Link](#)&#x20;

## Features

- **User Roles:**
  - Admin: Manage users and delete any blog.
  - User: Perform CRUD operations on their blogs.
- **Authentication & Authorization:**
  - Secure login system with JWT.
  - Role-based access control.
- **Blog Management:**
  - Create, update, and delete blogs.
  - View blogs with search, sort, and filter functionalities.
- **Admin Actions:**
  - Block users.
  - Delete any blog.

## Technologies Used

- **Backend:** TypeScript, Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT

## Installation and Setup

### Prerequisites

- Node.js installed (version 16 or higher).
- MongoDB installed and running locally or in the cloud.
- A package manager like npm or yarn.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Mehedy-Tanvir/Blog-Project-PHA3.git
   cd Blog-Project-PHA3
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following:

   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=your_mongodb_database_url
   BCRYPT_SALT_ROUNDS=bcrypt_salt_rounds
   JWT_ACCESS_SECRET=jwt_access_secret
   JWT_ACCESS_EXPIRES_IN=expire_duration
   ```

4. Start the server:

   ```bash
   npm run start:dev
   ```

5. Access the application at `http://localhost:5000`.

## API Endpoints

### Authentication

1. **Register User**   **POST** `/api/auth/register`

   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "securepassword"
   }
   ```

2. **Login User**   **POST** `/api/auth/login`

   ```json
   {
     "email": "john@example.com",
     "password": "securepassword"
   }
   ```

### Blog Management

1. **Create Blog**   **POST** `/api/blogs`

   ```json
   {
     "title": "My First Blog",
     "content": "This is the content of my blog."
   }
   ```

2. **Update Blog**   **PATCH** `/api/blogs/:id`

   ```json
   {
     "title": "Updated Blog Title",
     "content": "Updated content."
   }
   ```

3. **Delete Blog**   **DELETE** `/api/blogs/:id`

4. **Get All Blogs**   **GET** `/api/blogs?search=query&sortBy=createdAt&sortOrder=desc&filter=authorId`

### Admin Actions

1. **Block User**   **PATCH** `/api/admin/users/:userId/block`

2. **Delete Blog**   **DELETE** `/api/admin/blogs/:id`

## Models

### User Model

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "admin | user",
  "isBlocked": "boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Blog Model

```json
{
  "title": "string",
  "content": "string",
  "author": "ObjectId",
  "isPublished": "boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Error Handling:

- **Zod Validation Error**: Invalid data inputs based on schema validation.
- **Not Found Error**: Resource not found.
- **Validation Error**: Incorrect data format or missing fields.
- **Authentication Error**: Invalid token or expired session.
- **Authorization Error**: Unauthorized access.

### Common Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": "Additional error details" },
  "stack": "error stack trace"
}
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Contact

For questions or support, please contact [mehedytanvir451\@gmail.com].
