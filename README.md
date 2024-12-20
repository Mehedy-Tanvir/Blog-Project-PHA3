# 🚴 Bike Store API

It is an application to manage bike store. This application manages bike stock, take orders and calculate profits.This application is developed in **TypeScript**, **Express.js**, and **MongoDB**, and it has rich endpoints that can be used effectively for managing a bike store.

---

## 🌟 Features

### 📦 **Product Management**

- **Add New Product**: It can create a bike with details like name, brand, price, category, and stock status.
- **Get All Bikes**: It can retrieve a list of all available bikes with support for filters (e.g., name, brand, category).
- **Get Specific Bike**: It can fetch detailed information about a specific bike using its unique ID.
- **Update Bike**: it can modify bike details such as price and stock quantity.
- **Delete Bike**: It can soft delete a bike, ensuring it is no longer available for transactions.
- **Error Handling**: It can return appropriate messages if invalid values are tried to add.

### 🛒 **Order Management**

- **Place Orders**: It can reduce inventory when a bike is ordered, ensuring inventory accuracy.
- **Handle Stock**: It can automatically update stock status (`inStock`) when quantities reach zero.
- **Error Handling**: It can return appropriate messages for insufficient stock during order placement.

### 📊 **Revenue Calculation**

- **Calculate Revenue**: It uses MongoDB's aggregation pipeline to compute total revenue from all orders.

### 📊 **Debuggers**

- **ESlint**: It finds and fixes errors in run time.
- **Prettier**: It finds and formates code in run time.

---

## 🛠️ **Getting Started**

### ⚡ Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (Local or Cloud instance)
- **Git**
- **npm** or **yarn**

---

### 🚀 **Setup Instructions**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Mehedy-Tanvir/Bike-Store-PHA2.git
   cd Bike-Store-PHA2
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory and add the following:

   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bike-store
   ```

4. **Run the Project**

   - **Development Mode**
     ```bash
     npm run start:dev
     # or
     yarn start:dev
     ```
   - **Production Mode**
     ```bash
     npm run build
     npm run start:prod
     # or
     yarn build && yarn start:prod
     ```

5. **Run Linter and Formatter**
   - To check for linting issues:
     ```bash
     npm run lint
     # or
     yarn lint
     ```
   - To fix linting and formatting:
     ```bash
     npm run lint:fix
     npm run prettier
     # or
     yarn lint:fix && yarn prettier
     ```

---

## 🧪 **API Endpoints**

### 1. **Add New Bike**

- **Endpoint**: `POST /api/products`
- **Request Body**:
  ```json
  {
    "name": "Xtreme Mountain Bike",
    "brand": "Giant",
    "price": 1200,
    "category": "Mountain",
    "description": "A high-performance bike built for tough terrains.",
    "quantity": 50
  }
  ```
- **Response**:
  ```json
  {
    "message": "Product added successfully",
    "status": true,
    "data": { ... }
  }
  ```

### 2. **Get All Bikes**

- **Endpoint**: `GET /api/products`
- **Query Parameters**:
  - `searchTerm` (optional): Search by `name`, `brand`, or `category`.
- **Response**:
  ```json
  {
    "message": "Bikes retrieved successfully",
    "status": true,
    "data": [ ... ]
  }
  ```

### 3. **Get Specific Bike**

- **Endpoint**: `GET /api/products/:productId`
- **Response**:
  ```json
  {
    "message": "Bike retrieved successfully",
    "status": true,
    "data": { ... }
  }
  ```

### 4. **Update a Bike**

- **Endpoint**: `PUT /api/products/:productId`
- **Request Body** (example):
  ```json
  {
    "price": 1300,
    "quantity": 30
  }
  ```
- **Response**:
  ```json
  {
    "message": "Bike updated successfully",
    "status": true,
    "data": { ... }
  }
  ```

### 5. **Delete a Bike**

- **Endpoint**: `DELETE /api/products/:productId`
- **Response**:
  ```json
  {
    "message": "Bike deleted successfully",
    "status": true
  }
  ```

### 6. **Place an Order**

- **Endpoint**: `POST /api/orders`
- **Request Body**:
  ```json
  {
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 2400
  }
  ```
- **Response**:
  ```json
  {
    "message": "Order created successfully",
    "status": true,
    "data": { ... }
  }
  ```

### 7. **Calculate Revenue**

- **Endpoint**: `GET /api/orders/revenue`
- **Response**:
  ```json
  {
    "message": "Revenue calculated successfully",
    "status": true,
    "data": {
      "totalRevenue": 3600
    }
  }
  ```

---

## 📚 **Technologies Used**

- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose**
- **TypeScript**
- **Zod** for request validation
- **ESLint** & **Prettier** for code quality
- **ts-node-dev** for seamless development

---

## 📧 **Contact**

For questions or support, please reach out via [Md. Mehedy Hasan Tanvir](https://github.com/Mehedy-Tanvir).
