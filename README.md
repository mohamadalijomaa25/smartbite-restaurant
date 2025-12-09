# SmartBite – Full-Stack Restaurant Ordering System

SmartBite is a complete **full-stack restaurant ordering platform** built with  
**ReactJS (frontend)** and **Node.js + Express + MySQL (backend)**.

Customers can browse the menu, add items to their cart, create an account, log in, place an order, and track its status in real time.  
All data is stored in a real MySQL database, and authentication is handled using JWT.

---

## 🚀 Live Frontend Demo (Netlify)

https://resilient-figolla-694906.netlify.app/

## 🔗 Backend API (Render / Railway)

_(Add your backend link here once deployed)_  
Example:  
`https://smartbite-api.onrender.com`

---

# ⭐ Features

## 🍔 **Menu System**

- Organized menu by category (Mains, Drinks, Desserts, etc.)
- Each item includes an image, description, and price
- Responsive grid layout

## 🛒 **Cart System**

- Add items to cart
- Adjust quantities or remove items
- Live total price calculation
- Cart persists while browsing

## 👤 **Authentication (Backend)**

- User Signup (with hashed passwords)
- User Login (JWT authentication)
- Protected routes (Orders tied to logged-in user)

## 📦 **Order System (Full-Stack)**

Orders are stored in **MySQL** with:

- items (JSON)
- total
- user_id (FK)
- order status (received → preparing → delivering → delivered)

Supported features:

- Create Order
- Get Order Details
- Get Logged-in User Orders
- Update Order Status
- Auto “Next Step” status upgrade

## 📍 **Order Tracking Page**

Fetches real order data from backend:

- Order status timeline
- Ordered items
- Total cost
- Created date

## 📱 **Fully Responsive**

Works smoothly on:

- Desktop
- Tablet
- Mobile

---

# 🛠 Technologies Used

## **Frontend**

- ReactJS
- React Router DOM
- Bootstrap 5
- Custom CSS
- Context API (Auth, Cart)

## **Backend**

- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt (password hashing)
- CORS
- .env for configuration

## **Database**

### Tables:

- **Users** (id, name, email, password)
- **Orders** (id, user_id, items JSON, total, status, created_at)

---

# 🗂 Project Structure
