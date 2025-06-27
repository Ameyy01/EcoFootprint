# 🌿 EcoFootprint – Personal Carbon Footprint Tracker

**EcoFootprint** is a full-stack web application that helps users **track, monitor, and reduce their carbon footprint** based on their daily activities. It promotes sustainability by offering a dashboard, badges for eco-friendly behavior, and actionable suggestions.

---

## 🚀 Features

* 🔐 **User Authentication** – Google, GitHub login via Firebase Auth
* 📝 **Vehicle Emission Tracking** – Log your daily travel activity and track CO₂ emissions based on vehicle usage. 
* 📊 **Real-Time Dashboard** – Visualizes carbon emissions
* 🏆 **Achievement Badges** – Get rewarded for eco-friendly actions
* 📈 **Leaderboard** – Compare with other users (coming soon)
* 🌱 **Eco Suggestions** – Smart tips to reduce your impact

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **Tailwind CSS**
* **Framer Motion**
* **Material UI (MUI)**

### Backend

* **Node.js + Express.js**
* **MongoDB (Mongoose)**

### Auth & Hosting

* **Firebase Authentication**
* **GitHub Actions (CI/CD)**
* **Render (Backend Deployment)**
* **Vercel (Frontend Deployment)**

---

## 📦 Folder Structure

```
EcoFootprint/
├── client/                  # React frontend
├── server/                  # Node.js backend
├── .github/workflows/      # CI/CD pipeline (GitHub Actions)
├── README.md
└── .env.example             # Environment variable template
```

---

## ⚙️ Setup & Run Locally

> Make sure Node.js and MongoDB are installed.

### 1. Clone the repository:

```bash
git clone https://github.com/Ameyy01/EcoFootprint.git
cd EcoFootprint
```

### 2. Install dependencies:

```bash
# In client/
cd client
npm install

# In server/
cd ../server
npm install
```

### 3. Configure environment variables:

Copy `.env.example` to `.env` in both frontend and backend folders and fill in your secrets.

### 4. Run the app:

```bash
# In server/
npm run dev

# In client/
npm start
```

The frontend will typically run on `http://localhost:3000` and backend on `http://localhost:5000`.

---


## 🔐 Environment Variables

Create `.env` files in both frontend and backend directories. Example keys:

### Backend `.env`:

```
MONGO_URI=your_mongodb_url
PORT=5000
FIREBASE_API_KEY=your_firebase_key
```

### Frontend `.env`:

```
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_BACKEND_URL=https://ecofootprint-api.onrender.com
```

> ⚠️ Never commit your actual `.env` files — use `.gitignore`.

---

## 🌟 Screenshots
![image](https://github.com/user-attachments/assets/67b3d5f7-eb7c-404c-9fc6-3dc952874271)

![image](https://github.com/user-attachments/assets/c7725416-ec76-4679-be0f-06ae18754653) 

![image](https://github.com/user-attachments/assets/8d52ae12-5f45-41ae-be76-ca7894f4dc37) 

![image](https://github.com/user-attachments/assets/ae800a36-5915-4558-a36a-cc0c3747cdd5) 

![image](https://github.com/user-attachments/assets/5b4138a8-3e9a-493b-8428-060fa2b17cb3) 

![image](https://github.com/user-attachments/assets/02259dde-ec29-46f8-85f0-4c8537bfb187)







## 🙇‍♂️ Author

**Amey Dabhole**
📍 Goregaon, Mumbai
🔗 [LinkedIn](www.linkedin.com/in/amey-dabhole-61a637340)
💼 Full-Stack Developer

