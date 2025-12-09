# SmartBite – Full-Stack Restaurant Ordering System

SmartBite is a complete **full-stack restaurant ordering platform** built with  
**ReactJS (frontend)** and **Node.js + Express + MySQL (backend)**.

Customers can browse the menu, add items to their cart, create an account, log in, place an order, and track its status in real time.  
All data is stored in a real MySQL database, and authentication is handled securely using JWT.

---

## 🚀 Live Demo (Frontend – Netlify)

https://resilient-figolla-694906.netlify.app/

## 🔗 Backend API (Render / Railway)

_Add backend URL once deployed_  
Example:  
`https://smartbite-api.onrender.com`

---

# ⭐ Features

## 🍔 Menu System

- Categorized menu (Mains, Drinks, Desserts, etc.)
- Item images, descriptions, and prices
- Responsive grid layout

## 🛒 Cart System

- Add items to cart
- Update quantities / remove items
- Live total price calculation

## 👤 Authentication (Backend)

- User registration (Signup)
- Secure login with **JWT tokens**
- Password hashing with **bcrypt**
- Protected routes (orders require login)

## 📦 Order System (Full Stack)

Orders are stored in **MySQL** with:

- Items (JSON)
- Total amount
- User ID (foreign key)
- Status (`received → preparing → delivering → delivered`)
- Timestamp

Features:

- Create order (POST)
- Get all user orders (GET)
- Get specific order (GET)
- Update status (PUT)
- Move to next status automatically (PUT)

## 📍 Order Tracking Page

- Fetches live order status from backend
- Shows progress steps
- Lists ordered items with quantities and prices
- Displays total and timestamp

## 📱 Responsive UI

Works smoothly on:

- Desktop
- Tablet
- Mobile phones

---

# 🛠 Technologies Used

## **Frontend**

- ReactJS
- React Router DOM
- Bootstrap 5
- Custom CSS
- Context API (Cart, Auth)
- Netlify (hosting)

## **Backend**

- Node.js
- Express.js
- MySQL (via mysql2)
- JWT Authentication
- bcrypt (password hashing)
- CORS
- dotenv (.env configuration)

## **Tools**

- VS Code
- XAMPP (MySQL server)
- Git & GitHub
- Netlify (frontend hosting)
- Render / Railway (backend hosting)

---

# 🗂 Project Structure
