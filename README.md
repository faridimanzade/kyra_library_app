# Kyra Library System

A modular, containerized backend for managing a library system. Built with Node.js, TypeScript, Express, Prisma ORM, BullMQ, Redis and Docker, this system supports features like book inventory, borrowing, returning, wallet tracking, automated cron jobs, and email notifications.

---

## 📁 Project Structure

```
Library_2/
├── library-backend/          # Main application backend (REST API, services)
│   ├── Kyra Library.postman_collection.json  # Postman API collection
│   └── ...                   # Docker, Prisma, Jest tests, etc.
├── email-service/            # Handles email notifications using Gmail + Nodemailer
├── cron-service/             # Background workers for tasks like restocking & returning
└── .git/                     # Git metadata
```

---

## 🚀 Getting Started

### 1. Clone and Navigate to Backend
```bash
cd library-backend
```

### 2. Run All Services
```bash
docker compose up --build
```

This will start the backend API, cron jobs, database, and email service.

---

## 📮 Email Service Setup

To send emails (e.g., for notifications):

1. Navigate to the email service:
   ```bash
   cd email-service
   ```

2. Configure your Gmail credentials:
   Create a `.env` file (or use the existing one) with the following keys:

   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

   - `EMAIL_PASS` is your Gmail App Password — generate one from [Google App Passwords](https://myaccount.google.com/apppasswords).

---

## 📬 API Testing with Postman

All API endpoints are documented in the Postman collection:

```
library-backend/Kyra Library.postman_collection.json
```

Import this file into Postman to explore and test the API endpoints.

---

## 🧪 Running Tests

After starting the services:

```bash
# Open new terminal
cd library-backend
npm install
npx jest (or "npm run test")
```

Ensure your DB and services are running before executing the tests.

---

## 🧱 Technologies Used

- Node.js & TypeScript
- Express.js for HTTP APIs
- Prisma ORM for PostgreSQL
- Docker for containerization
- Nodemailer for email delivery (Gmail)
- BullMQ + Redis for job queueing and cron scheduling
- Jest for testing
- Postman for API documentation
