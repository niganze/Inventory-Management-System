# Inventory Management System

## 📌 Project Overview
The **Inventory Management System** is a web application designed to efficiently manage inventory, track damaged items, and log user activities. It supports role-based access control for **Inventory Managers** and **Program Managers**.

## 🚀 Features
- **User Authentication & Role Management**
- **Inventory Management** (Add, Update, Delete Items)
- **Borrowing & Returning Items**
- **Damage Reporting & Status Updates**
- **System Logs for User Actions**

---

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT)

---

## 📦 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/niganze/inventory-management-system.git
cd inventory-management-system
```
### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
### 4️⃣ Start the Server
```sh
npm run dev
```
The server will run on `http://localhost:5000`.

---

## 🔗 API Endpoints
### **User Authentication**
| Method | Endpoint        | Description |
|--------|---------------|-------------|
| POST   | `/api/users/register` | Register a new user |
| POST   | `/api/users/login`    | User login |

### **Inventory Management**
| Method | Endpoint         | Description |
|--------|----------------|-------------|
| GET    | `/api/inventory` | Get all items |
| POST   | `/api/inventory` | Add a new item |
| PUT    | `/api/inventory/:id` | Update an item |
| DELETE | `/api/inventory/:id` | Delete an item |

### **Damage Reports**
| Method | Endpoint         | Description |
|--------|----------------|-------------|
| GET    | `/api/damages` | Get all damage reports |
| POST   | `/api/damages` | Report a damaged item |
| PUT    | `/api/damages/:id` | Update damage status |

---

## 👥 User Roles & Permissions
- **Inventory Manager (Admin)**: Full access to manage inventory, borrow/return items, and handle damage reports.
- **Program Manager**: Read-only access to view inventory and reports.

---

## 📄 Contributing
Want to contribute? Follow these steps:
1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature-name`)
3. **Commit your changes** (`git commit -m 'Add new feature'`)
4. **Push to GitHub** (`git push origin feature-name`)
5. **Open a Pull Request**

---

## 📜 License
This project is licensed under the MIT License.

---

## 📧 Contact
For support, contact **Alain Niganze** at [niganzealain@gmail.com](mailto:niganzealain@gmail.com).

