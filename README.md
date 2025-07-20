# Easify 🛒

**Easify** is an integrated E-commerce website that provides **price comparisons** of products from multiple vendors such as **Amazon** and **Flipkart**. It allows users to view, compare, and explore products all in one platform.

---

## 🔍 Features

- 🛒 Product browsing with price comparisons  
- 🔐 User authentication (Login / Register)  
- 🧾 Add to Cart  
- 📦 View Product Details  
- 🔎 Search & Filter products  
- 🌐 Clean and responsive UI using HTML/CSS/JavaScript  

---

## 🛠️ Tech Stack

**Frontend:**  
- HTML5  
- CSS3  
- JavaScript (Vanilla)  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (via Mongoose)  

---

## 🚀 Getting Started

git clone https://github.com/Sameed995/easify.git  
cd easify  
npm install  

Create a `.env` file in the root directory and add:

MONGO_URI=your_mongodb_connection_string  
PORT=3000  
SESSION_SECRET=your_secret_key  

Then start the server:

node server.js  

Visit: http://localhost:3000

---

## 📁 Project Structure

easify/  
├── controllers/ # Backend controllers  
├── data/ # Static/mock data 
├── frontend/ # Source HTML/CSS/JS files  
├── middlewares/ # Express middleware  
├── models/ # Mongoose schemas  
├── node_modules/ # Node dependencies  
├── public/ # Public static assets (for serving to client)  
├── routes/ # Express route handlers  
├── .gitignore  
├── package.json  
├── package-lock.json  
├── server.js # Main server file  
└── README.md # You are here!

---

## 📌 TODO / Future Features

✅ Admin panel to manage products  
✅ Real vendor price API integration  
🔄 Wishlist & Order History  
💳 Payment gateway (Stripe/Razorpay)  
🌐 Product review and rating system  
