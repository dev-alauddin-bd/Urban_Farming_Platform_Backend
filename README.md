# 🚀 Interactive Urban Farming Platform Backend

This is a **scalable backend API** for an Interactive Urban Farming Platform that connects urban farmers, vendors, and customers for sustainable agriculture, produce marketplace, rental farming spaces, and community collaboration.

---

## 🌟 Features

- 🔐 User Authentication & Role-Based Access Control (Admin, Vendor, Customer)
- 🏡 Garden Space Rental System with location-based filtering
- 🥦 Organic Produce Marketplace with inventory management
- 🌱 Real-time Plant Tracking system
- 🧾 Sustainability Certification & vendor verification system
- 💬 Community Forum for farming discussions
- 📦 Order management system (customer ↔ vendor flow)
- ⚡ Pagination, filtering, and optimized queries
- 🛡️ Rate limiting for sensitive routes
- 📊 API performance benchmark using k6

---

## 🧰 Tech Stack

- **Backend Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT (Access & Refresh Token)
- **API Documentation**: Swagger / OpenAPI
- **Load Testing**: k6
- **Error Handling**: Centralized middleware system

---

## 🏗️ Architecture Highlights

- Modular service-based architecture (Service → Controller → Route)
- Centralized error handling system
- Consistent API response format
- Soft delete implementation
- Optimized database queries using `select`
- Pagination support for large datasets

---

## 👤 Roles & Permissions

### Admin
- Manage users, vendors, certifications
- Monitor platform activity

### Vendor (Urban Farmer)
- Manage farm spaces
- List produce
- Track orders and harvests

### Customer
- Rent farm spaces
- Purchase organic produce
- Track plants
- Participate in community forum

---

## 📦 Core Modules

- Authentication System
- Farm Space Rental System
- Marketplace System
- Order Management
- Community Forum
- Sustainability Certification System
- Plant Tracking System

---

## 📊 Performance Benchmark

- Conducted using **k6 load testing tool**
- Simulated concurrent users
- No critical failures observed
- Optimized queries for better performance

> ⚠️ Note: This benchmark was executed on a local development environment. Performance may vary in production deployment.

---

## 📈 API Features

- Consistent JSON response structure
- Pagination for all list endpoints
- Proper HTTP status codes
- Global error handling
- Rate limiting on authentication routes

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/dev-alauddin-bd/Urban_Farming_Platform_Backend.git
cd Urban_Farming_Platform_Backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Copy the example environment file and fill in your database credentials:

```bash
cp .env.example .env
```

Update `.env` with your PostgreSQL connection string:

```env
PORT=
DATABASE_URL=
BCRYPT_SALT_ROUNDS=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRE_IN="15m"

JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRE_IN="7d"

NODE_ENV="development"
```

### 4️⃣ Generate Prisma client

```bash
npm run build
```

### 5️⃣ Run database migrations

```bash
npx prisma migrate dev --name init
```

### 7️⃣ Start development server

```bash
npm run dev
```
