# CRS – Admin Panel

## 📌 Overview

The **Admin Panel** is part of the CRS MERN project and is designed for administrators to manage and control the system.
It provides interfaces for monitoring data, managing users, and handling core system operations.

---

## 🛠 Tech Stack

* **Frontend:** React.js
* **Styling:** CSS / Bootstrap (if used)
* **API Communication:** Axios / Fetch
* **Backend Integration:** Node.js + Express APIs

---

## ⚙️ Features

* Admin authentication & authorization
* Dashboard overview
* Manage users / records
* View and control system data
* Perform CRUD operations
* Secure access to admin-only routes

---

## 🚀 How to Run Admin App Locally

```bash
cd admin
npm install
npm start
```

The app will start on:

```
http://localhost:5173/
```

(or the port configured in your project)

---

## 🔗 API Usage

The Admin Panel communicates with the backend server via REST APIs.
Ensure the **server application is running** before starting the admin app.

---

## 📂 Folder Structure (Example)

```
admin/
 ├── src/
 ├── public/
 ├── package.json
 └── README.md
```

---

## ⚠️ Notes

* Backend server must be running
* Environment variables (if any) should be properly configured
* Admin access is restricted to authorized users only
