# CRS – Server (Backend)

## 📌 Overview

The **Server Application** is the backend of the CRS MERN project.
It handles business logic, database operations, authentication, and API endpoints used by both Admin and Client applications.

---

## 🛠 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Authentication:** JWT / Middleware
* **Environment Management:** dotenv

---

## 🔧 Core Responsibilities

* REST API development
* Database connection and management
* Authentication & authorization
* Data validation
* Error handling
* Secure communication with frontend apps

---

## 🚀 How to Run Server Locally

```bash
cd server
npm install
npm start
```

Server will run on:

```
http://localhost:5000
```

(or configured port)

---

## 🌱 Environment Variables

Create a `.env` file inside the server folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 📂 Folder Structure (Example)

```
server/
 ├── models/
 ├── routes/
 ├── controllers/
 ├── middleware/
 ├── config/
 ├── server.js
 ├── package.json
 └── README.md
```

---

## 🔐 Security Notes

* Never commit `.env` files
* Use strong JWT secrets
* Enable CORS properly
* Validate all inputs

---

## 📡 API Consumers

* Admin Application
* Client Application
