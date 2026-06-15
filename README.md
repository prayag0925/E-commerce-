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
![Login Page]<img width="1920" height="863" alt="Screenshot 2026-06-15 103334" src="https://github.com/user-attachments/assets/66608692-6ef4-4fad-9005-add680233bb4" />


### 📝 Register Page
![Register Page](<img width="1920" height="869" alt="Screenshot 2026-06-15 103357" src="https://github.com/user-attachments/assets/96813a93-63e2-47a9-9a63-660c35b50a38" />
)

### ➕ Add Product
![Add Product](<img width="1920" height="876" alt="Screenshot 2026-06-15 225611" src="https://github.com/user-attachments/assets/c96982d8-ca41-4ed5-a631-d8caf1d8f16d" />
)

---

### 👑 Admin View

**All Products (Admin)**
![All Products Admin](<img width="1920" height="872" alt="Screenshot 2026-06-15 105947" src="https://github.com/user-attachments/assets/814ecda7-c608-487e-901f-0562629dd4af" />
)

**My Products (Admin)**
![My Products Admin](<img width="1920" height="873" alt="Screenshot 2026-06-15 113345" src="https://github.com/user-attachments/assets/a13a5bf6-4c79-4d5e-b822-ed98361b99f5" />
)

**Categories (Admin) — can Add/Delete categories**
![Categories Admin](<img width="1920" height="872" alt="Screenshot 2026-06-15 110215" src="https://github.com/user-attachments/assets/f995bb8f-c618-4a15-a309-a2e876673118" />
)

---

### 👤 User View

**All Products (User)**
![All Products User](<img width="1920" height="873" alt="Screenshot 2026-06-15 111630" src="https://github.com/user-attachments/assets/bcb12381-fd7f-441e-bb6c-ef2fce8fd652" />
)

**My Products (User)**
![My Products User](<img width="1920" height="869" alt="Screenshot 2026-06-15 111702" src="https://github.com/user-attachments/assets/a4383ce0-316f-4896-95f2-9dc2578d41db" />
)

**Categories (User) — view only, no Add/Delete form**
![Categories User](<img width="1920" height="882" alt="Screenshot 2026-06-15 111731" src="https://github.com/user-attachments/assets/f1b3fe9e-ff76-4d5d-b85b-042157ba4102" />
)
