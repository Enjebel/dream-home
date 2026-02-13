# 🏡 DreamHome - Luxury Real Estate Marketplace

DreamHome is a premium full-stack (MERN) platform designed for agents to list high-end properties and for users to discover their next dream residence.

---

## ✨ Key Features

* **📸 Multi-Media Listings:** Full support for uploading and displaying multiple high-resolution images and videos per property.
* **📊 Agent Dashboard:** A dedicated management suite for agents to create, view, and delete their own active listings.
* **⭐ Interactive Review System:** Robust feedback system featuring star ratings and user-specific comments to build trust.
* **📱 Responsive Media Gallery:** A custom-built, interactive gallery for property details featuring smooth transitions and video playback.
* **🛡️ Secure Authentication:** JWT-based login and registration system with protected routes to ensure only authorized agents can manage listings.

---

## 🛠️ Tech Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS (Modern UI/UX)
* Lucide Icons (Minimalist Design)
* React Context API (State Management)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (NoSQL Database)
* JSON Web Tokens (JWT) for secure Auth

**Media Handling:**
* Base64 Media Processing (Optimized for Multi-media uploads)

---

## 📂 Project Structure

```text
dream-home/
├── client/             # React Frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main view components
│   │   └── context/    # Global Auth state
├── server/             # Node.js Backend (Express)
│   ├── models/         # Mongoose Schemas (User, Property)
│   ├── routes/         # API Endpoints
│   └── controllers/    # Business logic
└── .gitignore          # Root-level Monorepo ignore file



🚀 Getting Started

Prerequisites
Node.js (v18+)

MongoDB Atlas account (or a local MongoDB instance)

Installation & Setup
1.Clone the repository: git clone [https://github.com/Enjebel/dream-home.git](https://github.com/Enjebel/dream-home.git)
cd dream-home

2.Server Configuration: cd server
npm install
    
   .. Create a .env file in the server folder and add your credentials:
        MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=5000

npm start

cd ../client
npm install
npm run dev



🤝 Contributing
Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

Developed with ❤️ by Enjebel