# Noman Nawaz — Full-Stack MERN Portfolio & CMS

A high-performance, dynamic, and fully animated portfolio website with an integrated CMS backend for **Noman Nawaz**.

---

## ⚡ Tech Stack

- **Frontend**: React 19, Tailwind CSS v4, Motion (Framer Motion), Lucide Icons, Canvas Confetti, Vite
- **Backend**: Node.js, Express.js
- **Database & Storage**: MongoDB (Mongoose), Cloudinary (Image & media hosting)
- **Authentication**: JWT-based Admin Authentication

---

## 🎨 Key Features

1. **3 Theme Modes**:
   - 🌙 **Dark (Default)**: Deep midnight obsidian with electric violet & cyan accents.
   - ☀️ **Light**: Clean aesthetic with deep purples and high-contrast typography.
   - ⚡ **High-Contrast**: Ultra-sharp pure black/white with neon green highlights.
2. **Interactive Motion & Physics**:
   - **Custom Magnetic Cursor**: Proximity attraction to buttons & interactive elements.
   - **3D Tilt Cards**: Perspective tilt with real-time glare calculation on hover.
   - **Interactive Skills Wheel**: Momentum drag velocity and hold-to-pause controls.
   - **Staggered Entrance Reveals**: Header typography, project cards, and metrics.
3. **Projects & Case Studies**:
   - Grid cards displaying thumbnail, date, and project title.
   - Drill-down modal with full Markdown case studies, tech pills, and image galleries.
4. **Admin CMS Panel (`/admin`)**:
   - Secure login route (`nawaznoman7766@gmail.com`)
   - Hero section management with Cloudinary image upload.
   - Full Project CRUD with thumbnail + gallery uploads and Markdown editor.
   - Contact & social profile management + Admin password updater.

---

## 🚀 Local Development Setup

### 1. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in `/server`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/noman_portfolio
JWT_SECRET=super_secret_jwt_key_noman_nawaz_2026_portfolio
CLIENT_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Seed default data and admin account:
```bash
npm run seed
```
*(Default Admin: `nawaznoman7766@gmail.com` / `668626@Noman`)*

Start the backend server:
```bash
npm run dev
# Server will run on http://localhost:5000
```

---

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
# Frontend will run on http://localhost:5173
```

---

## 🌐 Deployment Instructions

### Deploy Frontend on Vercel
1. Push your code to GitHub.
2. Import repository in [Vercel](https://vercel.com).
3. Set **Root Directory** to `client`.
4. Add Environment Variable:
   - `VITE_API_URL`: `https://your-render-backend.onrender.com/api`
5. Click **Deploy**.

### Deploy Backend on Render
1. In [Render](https://render.com), create a new **Web Service**.
2. Connect your GitHub repository.
3. Set **Root Directory** to `server`.
4. Set **Build Command** to `npm install`.
5. Set **Start Command** to `node server.js`.
6. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection URI
   - `JWT_SECRET`: A secure random secret string
   - `CLIENT_URL`: `https://your-portfolio.vercel.app`
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
7. Click **Create Web Service**.
