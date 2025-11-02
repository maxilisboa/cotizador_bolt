1. Carpeta raíz del proyecto
Cotizador/
├─ backend/
│  ├─ src/
│  │  ├─ server.js
│  │  └─ routes/auth.js
│  ├─ prisma/schema.prisma
│  ├─ package.json
│  ├─ .env.example
│  └─ Dockerfile
└─ frontend/
   ├─ index.html
   ├─ vite.config.js
   ├─ postcss.config.js
   ├─ tailwind.config.js
   └─ src/
      ├─ main.jsx
      ├─ App.jsx
      ├─ pages/Login.jsx
      ├─ pages/Dashboard.jsx
      └─ styles/globals.css

2. Backend
backend/package.json
{
  "name": "cotizador-backend",
  "type": "module",
  "scripts": {
    "dev": "node src/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init"
  },
  "dependencies": {
    "@prisma/client": "^6.0.0",
    "express": "^5.0.0",
    "express-session": "^1.17.3",
    "cors": "^2.8.5",
    "pg": "^8.11.3"
  },
  "devDependencies": {
    "prisma": "^6.0.0"
  }
}

backend/.env.example
PORT=3000
SESSION_SECRET=clave_super_segura
DATABASE_URL=postgresql://admin:admin@localhost:5432/cotiz_bbdd_live

backend/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Usuario {
  id        Int      @id @default(autoincrement())
  nombre    String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}

backend/src/server.js
import express from "express";
import session from "express-session";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRouter from "./routes/auth.js";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || "dev",
  resave: false,
  saveUninitialized: false,
}));

app.use("/api", authRouter(prisma));

app.listen(PORT, () => console.log(`Backend listo en http://localhost:${PORT}`));

backend/src/routes/auth.js
export default function authRouter(prisma) {
  const express = (await import("express")).default;
  const r = express.Router();

  r.post("/login", async (req, res) => {
    const { email, password } = req.body || {};
    const u = await prisma.usuario.findUnique({ where: { email } });
    if (!u || u.password !== password)
      return res.status(401).json({ error: "Credenciales inválidas" });
    req.session.userId = u.id;
    const { password: _, ...safe } = u;
    res.json(safe);
  });

  r.get("/me", async (req, res) => {
    if (!req.session.userId) return res.status(401).json({ error: "No autenticado" });
    const u = await prisma.usuario.findUnique({ where: { id: req.session.userId } });
    const { password: _, ...safe } = u;
    res.json(safe);
  });

  r.post("/logout", (req, res) => {
    req.session.destroy(() => res.json({ ok: true }));
  });

  return r;
}

3. Frontend
frontend/package.json
{
  "name": "cotizador-frontend",
  "type": "module",
  "scripts": {
    "dev": "vite"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.4.4",
    "vite": "^5.0.0"
  }
}

frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { proxy: { "/api": "http://localhost:3000" } }
});

frontend/postcss.config.js
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
export default { plugins: [tailwindcss(), autoprefixer()] };

frontend/tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: []
};

frontend/src/styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((r) => r.ok ? r.json() : null)
      .then((d) => d && setUser(d));
  }, []);

  return user ? <Dashboard user={user} setUser={setUser} /> : <Login setUser={setUser} />;
}

frontend/src/pages/Login.jsx
import React, { useState } from "react";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
    if (res.ok) setUser(await res.json());
    else setError("Credenciales inválidas");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow w-80">
        <h2 className="text-xl mb-4 text-center">Iniciar sesión</h2>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
          placeholder="Correo" className="border w-full p-2 mb-2 rounded" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
          placeholder="Contraseña" className="border w-full p-2 mb-2 rounded" />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}

frontend/src/pages/Dashboard.jsx
import React from "react";

export default function Dashboard({ user, setUser }) {
  const logout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
          Cerrar sesión
        </button>
      </div>
      <p>Bienvenido, {user.nombre}</p>
    </div>
  );
}

4. Inicialización rápida
# Backend
cd backend
cp .env.example .env
npm i
npx prisma generate
npx prisma migrate dev --name init

# Insertar usuario demo (en DBeaver o CLI):
# INSERT INTO "Usuario"(nombre,email,password)
# VALUES ('Maximiliano','mlisboa@liveseguros.cl','123456');

npm run dev

# Frontend
cd ../frontend
npm i
npm run dev


Abrir:

Frontend: http://localhost:5173

Backend: http://localhost:3000