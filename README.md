# Delulu E-commerce Project

Live Demo: https://delulu-frontend-five.vercel.app/

## Overview

This repository contains a full-stack e-commerce application with separate frontend, admin, and backend packages.

- `frontend/`: customer-facing shopping website
- `admin/`: admin dashboard for product management
- `backend/`: Express API with MongoDB, Cloudinary, payments, auth, and product/order/cart endpoints

## Features

- Product listing and filtering
- Product management with image uploads
- User registration and login
- Admin authentication and protected routes
- Cart functionality and order placement
- Stripe and Razorpay payment integration
- Cloudinary image uploads

## Libraries Used

### Frontend
- React
- React Router DOM
- Axios
- React Toastify
- Tailwind CSS
- Vite

### Admin
- React
- React Router DOM
- Axios
- React Toastify
- Tailwind CSS
- Vite

### Backend
- Express
- Mongoose
- bcrypt
- JWT (jsonwebtoken)
- dotenv
- CORS
- Multer
- Cloudinary
- Stripe
- Razorpay
- Validator
- Nodemon

## Getting Started

### Backend

```powershell
cd backend
npm install
npm run server
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

### Admin

```powershell
cd admin
npm install
npm run dev
```

## Notes

- The backend expects a `.env` file with MongoDB, JWT secret, Cloudinary, and admin credentials.
- Admin routes are protected using the admin auth middleware.
- Product image uploads use Cloudinary and `multer`.

## Contact

For questions or updates, use the live site or inspect the repository directly.
