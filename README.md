# RTCA — Real-Time Chat Application

A full-stack real-time chat application built with the MERN stack and Socket.IO. RTCA supports secure authentication, live one-to-one messaging, online presence indicators, image sharing, and profile management — all wrapped in a sleek, dark-themed UI.

<!-- 📸 Add a banner/hero screenshot of the app here -->
![App Banner](./docs/images/banner.png)

---

## ✨ Features

- 🔐 **Secure Authentication** — Sign up and log in with JWT-based auth and hashed passwords (bcrypt)
- 💬 **Real-Time Messaging** — Instant one-to-one chat powered by Socket.IO
- 🟢 **Online Status** — See which of your contacts are currently online
- 🖼️ **Image Sharing** — Send images in chat, hosted via Cloudinary
- 👤 **Profile Management** — Update your name and profile picture
- ✅ **Read Receipts** — Track seen/unseen message counts per conversation
- 🔔 **Toast Notifications** — Clean, unobtrusive feedback for user actions
- 📱 **Responsive UI** — Built with React 19, Tailwind CSS, and React Router

<!-- 📸 Add a screenshot of the chat interface here -->
![Chat Interface](./docs/images/chat-interface.png)

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite
- Tailwind CSS
- React Router DOM
- Axios
- Socket.IO Client
- React Hot Toast

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- Socket.IO
- JSON Web Tokens (JWT)
- bcryptjs
- Cloudinary (image uploads)

---

## 📁 Project Structure

```
RTCA/
├── client/                # React frontend (Vite)
│   ├── context/           # AuthContext & ChatContext (global state)
│   └── src/
│       ├── components/    # Sidebar, ChatContainer, etc.
│       ├── pages/         # Homepage, Loginpage, Profilepage
│       ├── lib/           # Utility functions
│       └── assets/        # Images, icons
└── server/                # Express backend
    ├── controllers/       # Auth & message logic
    ├── models/            # User & Message schemas
    ├── routes/            # API route definitions
    ├── middleware/        # Auth middleware
    └── lib/                # DB connection, Cloudinary, JWT utils
```

<!-- 📸 Optional: add an architecture diagram here -->
![Architecture Diagram](./docs/images/architecture.png)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account for image uploads

### 1. Clone the repository

```bash
git clone https://github.com/ycode37/RTCA.git
cd RTCA
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory with the following variables:

```env
PORT=5001
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../client
npm install
npm run dev
```

The client will be available at `http://localhost:5173` (default Vite port), and the server will run on `http://localhost:5001` by default.

---

## 📡 API Overview

### Auth Routes (`/api/auth`)

| Method | Endpoint           | Description                     |
|--------|---------------------|----------------------------------|
| POST   | `/signup`           | Register a new user             |
| POST   | `/login`             | Log in an existing user         |
| PUT    | `/update-profile`    | Update profile name/picture     |
| GET    | `/check`             | Verify authentication status    |

### Message Routes (`/api/messages`)

| Method | Endpoint       | Description                              |
|--------|----------------|-------------------------------------------|
| GET    | `/users`       | Get all users for the sidebar             |
| GET    | `/:id`         | Get chat history with a specific user     |
| PUT    | `/mark/:id`    | Mark a message as seen                    |
| POST   | `/send/:id`    | Send a message (text and/or image)        |

---

## 🖥️ Screenshots

<!-- 📸 Add more screenshots below as needed -->

| Login | Chat | Profile |
|-------|------|---------|
| ![Login](./docs/images/login.png) | ![Chat](./docs/images/chat.png) | ![Profile](./docs/images/profile.png) |

---

## ☁️ Deployment

The backend is configured for serverless deployment on **Vercel** (see `server/vercel.json`). Note that real-time WebSocket features via Socket.IO require a persistent server environment — for full real-time functionality, consider deploying the backend to a platform like **Render** or **Railway** instead.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
