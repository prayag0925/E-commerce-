markdown# 🛒 E-commerce Platform (Node.js, Express, MongoDB, EJS, JWT)

A multi-user e-commerce web app built using the MVC pattern with JWT + cookie
based authentication and role-based access control (admin / user).

## ✨ Features
- 🔐 User registration & login (passwords hashed with bcrypt)
- 🍪 JWT issued on login, stored in an httpOnly cookie
- 🚪 Logout clears the JWT cookie
- 👥 Role-based access control (admin can manage categories, users can manage their own products)
- 📦 Multi-user product management ("My Products" page per user)
- 🏷️ Category management with product filtering
- 📱 Responsive navbar
- 🏗️ MVC folder structure (models, controllers, routes, views)

## 📁 Folder Structure
ecommerce-platform/

├── config/

│   └── db.js

├── controllers/

│   ├── authController.js

│   ├── productController.js

│   └── categoryController.js

├── middleware/

│   └── authMiddleware.js

├── models/

│   ├── User.js

│   ├── Product.js

│   └── Category.js

├── routes/

│   ├── authRoutes.js

│   ├── productRoutes.js

│   └── categoryRoutes.js

├── views/

│   ├── partials/navbar.ejs

│   ├── login.ejs

│   ├── register.ejs

│   ├── productList.ejs

│   ├── myProducts.ejs

│   ├── productForm.ejs

│   ├── productItem.ejs

│   └── categoryList.ejs

├── public/css/style.css

├── server.js

├── package.json

└── .env

## ⚙️ Setup Instructions

1. Install dependencies:
npm install

2. Make sure MongoDB is running locally (or update `MONGO_URI` in `.env`
   to point to MongoDB Atlas).

3. Start the server:
npm start
   or for development with auto-restart:
npm run dev

4. Open the browser at:
http://localhost:9000

## 🚀 Usage Flow
1. Register a new account (choose role "admin" or "user").
2. Login - a JWT token is set as a cookie.
3. As **admin**: go to "Categories" and add a few categories first.
4. As **any user**: go to "Add Product", fill in details and select a category.
5. "My Products" shows only the products added by the logged-in user.
6. "All Products" shows everything, and can be filtered by category.
7. Click "Sign Out" to logout (clears the JWT cookie).

## 🔑 Environment Variables (.env)
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_db

JWT_SECRET=mysecretkey123

PORT=9000

## 📸 Screenshots

### 🔓 Login Page
![Login Page](screenshots/login.png)

### 📝 Register Page
![Register Page](screenshots/register.png)

### ➕ Add Product
![Add Product](screenshots/add-product.png)

### 🔍 Product Details
![Product Details](screenshots/product-details.png)

---

### 👑 Admin View

**All Products (Admin)**
![All Products Admin](screenshots/all-products-admin.png)

**My Products (Admin)**
![My Products Admin](screenshots/my-products-admin.png)

**Categories (Admin) — can Add/Delete categories**
![Categories Admin](screenshots/categories-admin.png)

---

### 👤 User View

**All Products (User)**
![All Products User](screenshots/all-products-user.png)

**My Products (User)**
![My Products User](screenshots/my-products-user.png)

**Categories (User) — view only, no Add/Delete form**
![Categories User](screenshots/categories-user.png)