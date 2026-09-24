# MERN E-Commerce Platform

A full-stack e-commerce web application built using the MERN stack, featuring user authentication, product browsing, cart and wishlist management, checkout, and order tracking.

## Live Demo

[View Live Project] https://fullstack-ecommerce-mern.netlify.app/

## Features

* User registration and login with JWT authentication
* Browse products and view product details
* Search, category filtering, and sorting
* Shopping cart with quantity management
* Wishlist functionality
* Protected user profile and order pages
* Checkout with shipping details
* Cash on Delivery order placement
* Order history and order details
* Responsive user interface
* Toast notifications and alerts
* Persistent cart and wishlist using local storage

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React
* SweetAlert

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

## Project Structure

```text
fullstack-ecommerce-mern/
├── frontend/
└── backend/
```

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/codewithvaish/fullstack-ecommerce-mern.git
cd fullstack-ecommerce-mern
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## Future Improvements

* Admin dashboard
* Online payment gateway integration
* Product management for administrators
* Advanced order management

## Author

**Vaishali Variya**

[GitHub](https://github.com/codewithvaish)
