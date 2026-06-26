🚀 REAL_TIME_CHAT_APP

A modern and feature-rich MERN-Stack Real-Time Chat Application, enabling users to communicate seamlessly through real-time messaging, friend management, notifications, and video calling features.

---

🌐 Live Demo

🔗 Live: real-time-chat-app-tawny-phi.vercel.app

---

📌 Project Overview

REAL_TIME_CHAT_APP is a MERN-stack real-time communication platform designed to provide an engaging and interactive user experience. The application supports secure authentication, real-time messaging, friend requests, notifications, and video communication features.

The frontend is built using React and Vite, while the backend leverages Express.js and MongoDB to provide secure and scalable REST APIs and real-time communication services.

---

✨ Key Features

- 🔐 Secure User Authentication & Authorization using JWT
- 👤 User Registration and Login System
- 💬 Real-Time One-to-One Messaging
- 👥 Friend Request and Friend Management System
- 🔔 Real-Time Notifications
- 🎥 Video Calling Functionality
- 🌙 Multiple Theme Support
- ⚡ Fast State Management using Zustand
- 🔄 Server State Management with React Query
- 📱 Fully Responsive User Interface
- 🎨 Modern UI built with Tailwind CSS and DaisyUI
- 🚀 Stream Chat and Stream Video SDK Integration
- 🛡️ Protected Routes and Authentication Middleware

---

🛠️ Tech Stack

Frontend

- ⚛️ React.js
- ⚡ Vite
- 🎨 Tailwind CSS
- 🌼 DaisyUI
- 🧭 React Router
- ⚡ Zustand
- 🔄 React Query
- 📡 Axios
- 💬 Stream Chat SDK
- 🎥 Stream Video SDK

Backend

- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB with Mongoose
- 🔐 JSON Web Tokens (JWT)
- 🔒 bcrypt.js
- 🍪 cookie-parser
- 🌐 CORS
- ⚙️ dotenv

Development Tools

- 🔄 Nodemon
- 🌿 Git & GitHub
- 🔗 REST APIs

---

📁 Project Structure

REAL_TIME_CHAT_APP/
├── Backend/
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── chat.controller.js
│       │   └── user.controller.js
│       ├── lib/
│       │   ├── db.js
│       │   └── stream.js
│       ├── middleware/
│       │   └── auth.middleware.js
│       ├── models/
│       │   ├── FriendRequest.js
│       │   └── User.js
│       └── routes/
│           ├── auth.route.js
│           ├── chat.route.js
│           └── user.route.js
│
└── Frontend/
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   ├── components/
    │   ├── constants/
    │   ├── hooks/
    │   ├── lib/
    │   ├── pages/
    │   └── store/
    └── public/

---

🔐 Environment Variables

Create a ".env" file inside the "Backend/" directory and configure the required environment variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
STREAM_APP_ID=your_stream_app_id

Add any additional environment variables required by your application.

---

🚀 Getting Started

Clone the Repository

git clone <repository-url>
cd REAL_TIME_CHAT_APP

Backend Setup

cd Backend
npm install
npm run dev

Frontend Setup

cd Frontend
npm install
npm run dev

---

🏗️ Build for Production

Backend

cd Backend
npm install --production
npm start

Frontend

cd Frontend
npm run build
npm run preview

---

🚀 Project Highlights

This project demonstrates the implementation of a complete real-time communication platform using modern web technologies and scalable architecture.

Key Highlights

- ✅ Developed a MERN-stack real-time chat application.
- ✅ Implemented secure authentication and authorization using JWT.
- ✅ Integrated Stream Chat and Stream Video SDK for real-time communication.
- ✅ Built a complete friend request and friend management system.
- ✅ Implemented real-time messaging and notification features.
- ✅ Developed video calling functionality.
- ✅ Utilized Zustand and React Query for efficient state management.
- ✅ Designed a modern, responsive, and interactive user interface.
- ✅ Followed modular and scalable application architecture principles.
- ✅ Implemented protected routes and middleware-based authentication.

---

Learning Outcomes

Through this project, I gained hands-on experience in:

- Real-time application development
- MERN stack architecture
- Authentication and authorization systems
- State management using Zustand and React Query
- Real-time communication services
- Video streaming integration
- Responsive UI development
- REST API design and implementation
- Scalable application architecture

---

⭐ If you found this project interesting, feel free to give it a star on GitHub!
