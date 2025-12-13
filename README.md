# 🍔 SmartBite – Full-Stack Restaurant Ordering System

SmartBite is a full-stack restaurant ordering web application that allows users to browse a menu, place orders, and track their order status in real time.  
The project demonstrates backend development using Node.js, database integration with MySQL, user authentication, and deployment.

---

## 🚀 Live Demo

- **Frontend (Netlify):**  
  https://stellar-pixie-5dfb67.netlify.app/

- **Backend API (Render):**  
  https://smartbite-backend-3ixo.onrender.com

---

## 📌 Features

### 👤 Authentication

- User signup and login
- Password hashing using bcrypt
- JWT-based authentication

### 🍽️ Menu & Cart

- Browse menu items by category
- Add and remove items from cart
- Update item quantities
- Cart managed using React Context API

### 🛒 Orders

- Place orders (authenticated users only)
- Orders stored in MySQL database
- Track order status:
  - Received
  - Preparing
  - Delivering
  - Delivered
- Full CRUD operations on orders

### 📬 Contact

- Contact form connected to backend
- Messages stored in database

### 🎨 UI / UX

- Responsive design
- Modern UI with blurred background effects
- Clean navigation and layout

---

## 🛠️ Technologies Used

### Frontend

- React.js
- React Router
- Context API
- Bootstrap
- Custom CSS

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt
- MySQL (mysql2)

### Deployment & Tools

- Frontend: Netlify
- Backend: Render
- Database: MySQL (XAMPP for local development)
- Version Control: Git & GitHub

---

## 🗄️ Database Structure

### users

| Field      | Type              |
| ---------- | ----------------- |
| id         | INT (Primary Key) |
| name       | VARCHAR           |
| email      | VARCHAR           |
| password   | VARCHAR (hashed)  |
| role       | VARCHAR           |
| created_at | TIMESTAMP         |

### orders

| Field      | Type              |
| ---------- | ----------------- |
| id         | INT (Primary Key) |
| user_id    | INT (Foreign Key) |
| items      | JSON              |
| total      | DECIMAL           |
| status     | ENUM              |
| created_at | TIMESTAMP         |

### contact_messages

| Field      | Type              |
| ---------- | ----------------- |
| id         | INT (Primary Key) |
| name       | VARCHAR           |
| email      | VARCHAR           |
| message    | TEXT              |
| created_at | TIMESTAMP         |

---
