
# 🚀 Interactive Urban Farming Platform Backend

This is a **scalable backend API** for an Interactive Urban Farming Platform that connects urban farmers, vendors, and customers for sustainable agriculture, produce marketplace, rental farming spaces, and community collaboration.

---

## 🌟 Features

- 🔐 User Authentication & Role-Based Access Control (Admin, Vendor, Customer)
- 🏡 Garden Space Rental System with location-based filtering
- 🥦 Organic Produce Marketplace with inventory management
- 🌱 Plant Tracking system
- 🧾 Sustainability Certification & vendor verification system
- 💬 Community Forum for farming discussions
- 📦 Order management system (Customer ↔ Vendor flow)
- ⚡ Pagination, filtering, and optimized queries
- 🛡️ Rate limiting for sensitive routes
- 📊 API performance benchmarking using k6

---

## 🧰 Tech Stack

- Backend: Express.js
- Language: TypeScript
- ORM: Prisma
- Database: PostgreSQL
- Authentication: JWT (Access + Refresh Tokens)
- API Documentation: Swagger / OpenAPI
- Testing: k6 Load Testing
- Error Handling: Centralized Middleware System

---

## 🏗️ Architecture

- Modular Service-Based Architecture (Controller → Service → Route)
- Centralized Error Handling
- Consistent API Response Format
- Soft Delete Support
- Optimized DB Queries
- Pagination System

---

## 👤 Roles & Permissions

### Admin
- Manage users, vendors, certifications
- Monitor platform activity

### Vendor
- Manage farm spaces
- List organic produce
- Track orders

### Customer
- Rent farm spaces
- Purchase produce
- Track plants
- Community participation

---

## 📦 Core Modules

- Authentication System
- Farm Space Rental System
- Marketplace System
- Order Management
- Community Forum
- Sustainability Certification
- Plant Tracking System

---

## 📊 Performance

- Load testing using k6
- Concurrent user simulation
- Optimized database queries
- No critical failures in benchmark

> ⚠️ Note: Benchmark was executed in development environment.

---

## 🚀 Getting Started

### Clone Repository
```bash
git clone https://github.com/dev-alauddin-bd/Urban_Farming_Platform_Backend.git
cd Urban_Farming_Platform_Backend
````

### Install Dependencies

```bash
npm install
```

### Setup Environment

```bash
cp .env.example .env
```

Fill `.env`:

```env
PORT=5000
DATABASE_URL=your_postgres_url

BCRYPT_SALT_ROUNDS=10

JWT_ACCESS_SECRET=secret
JWT_ACCESS_EXPIRE_IN=15m

JWT_REFRESH_SECRET=secret
JWT_REFRESH_EXPIRE_IN=7d

NODE_ENV=development
```

### Prisma Setup

```bash
npm run prisma:generate
npm run prisma:migrate
```

### Run Project

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Production Start

```bash
npm start
```

---

## ⚙️ Scripts

```bash
npm run dev
npm run build
npm start
npm run prisma:generate
npm run prisma:migrate
npm run prisma:migrate:deploy
npm run seed
npm run benchmark
```



---

## 📖 API Documentation

Swagger UI:

```
/api-docs
```

---

## 🛡️ Security

* JWT Authentication
* Role-based access control
* Rate limiting
* Input validation
* Global error handling

---

## 🚀 Deployment Notes

* Set DATABASE_URL in production
* Run prisma migrate deploy before start
* Use npm start for production

---

## 👨‍💻 Author

MD ALAUDDIN

---

## ⭐ Support

If you like this project, give it a star ⭐

```

---

# 🔥 DONE

✔ single full file  
✔ no broken sections  
✔ GitHub-ready  
✔ professional SaaS backend README  

