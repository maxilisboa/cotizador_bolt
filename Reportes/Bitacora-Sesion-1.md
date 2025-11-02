# Bitácora — Sesión 1 (2025-11-02)

## Resumen
Se levantó backend con Express + Prisma sobre PostgreSQL local, se creó la base y el modelo `Usuario`. Se levantó frontend con React + Vite + Tailwind v4, se implementó login funcional consultando `/usuarios`. Se habilitó CORS y se hizo commit inicial. Se crearon ramas `develop`, `qa`, `respaldo` y se dejó activa `develop`.

## Detalle paso a paso

### 1) PostgreSQL local
- Instalación limpia en `D:\Programs\Postgre`.
- Verificación de binarios:
  ```powershell
  & "D:\Programs\Postgre\bin\psql.exe" --version
  ```
- Servicio:
  - Nombre: `postgresql-x64-18`.
- Creación de base:
  ```sql
  CREATE DATABASE cotizador;
  \l
  ```

### 2) Prisma y modelo
- `.env` en `backend/`:
  ```env
  DATABASE_URL="postgresql://postgres:admin@localhost:5432/cotizador"
  ```
- `schema.prisma`:
  ```prisma
  datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")
  }

  generator client {
    provider = "prisma-client-js"
    output   = "../generated/prisma"
  }

  model Usuario {
    id        Int      @id @default(autoincrement())
    nombre    String
    email     String   @unique
    pass      String
    cargo     String?
    creadoEn  DateTime @default(now())
  }
  ```
- Migración:
  ```powershell
  npx prisma migrate dev --name init
  ```
- Verificación en Prisma Studio:
  ```powershell
  npx prisma studio
  ```
- Inserción de usuario de prueba (vía UI).

### 3) Backend Express
- `backend/server.js`:
  ```js
  import express from "express";
  import cors from "cors";
  import { PrismaClient } from "./generated/prisma/index.js";

  const app = express();
  const prisma = new PrismaClient();

  app.use(cors());
  app.use(express.json());

  app.get("/usuarios", async (req, res) => {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  });

  app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
  ```
- `package.json` en backend:
  ```json
  {
    "name": "backend",
    "version": "1.0.0",
    "main": "server.js",
    "type": "module",
    "scripts": { "start": "node server.js" },
    "dependencies": {
      "@prisma/client": "^6.18.0",
      "express": "^4.19.2",
      "cors": "^2.8.5"
    },
    "devDependencies": { "prisma": "^6.18.0" }
  }
  ```
- Ejecución:
  ```powershell
  cd backend
  npm install
  npm start
  ```

### 4) Frontend React + Vite + Tailwind
- Creación:
  ```powershell
  npm create vite@latest frontend -- --template react
  cd frontend
  npm install
  npm install axios react-router-dom
  npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
  ```
- Archivos de configuración:
  - `tailwind.config.js`
    ```js
    export default {
      content: ["./index.html", "./src/**/*.{js,jsx}"],
      theme: { extend: {} },
      plugins: [],
    };
    ```
  - `postcss.config.js`
    ```js
    export default {
      plugins: {
        "@tailwindcss/postcss": {},
        autoprefixer: {},
      },
    };
    ```
  - `src/index.css`
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
- Login mínimo `src/App.jsx`:
  ```jsx
  import { useState } from "react";
  import axios from "axios";

  export default function App() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.get("http://localhost:3000/usuarios");
        const user = res.data.find((u) => u.email === email && u.pass === pass);
        setMensaje(user ? `Bienvenido ${user.nombre}` : "Credenciales inválidas");
      } catch {
        setMensaje("Error al conectar con el servidor");
      }
    };

    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-md w-80">
          <h1 className="text-2xl font-semibold text-center mb-6 text-blue-700">Login Cotizador</h1>
          <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" />
          <input type="password" placeholder="Contraseña" value={pass} onChange={(e) => setPass(e.target.value)} className="w-full mb-3 p-2 border rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Ingresar</button>
          {mensaje && <p className="text-center mt-4 text-sm text-gray-700">{mensaje}</p>}
        </form>
      </div>
    );
  }
  ```
- Dev server:
  ```powershell
  npm run dev
  ```

### 5) CORS
- Error observado: bloqueo CORS entre `5173` y `3000`.
- Solución: `app.use(cors());` en backend y `npm install cors`.

### 6) Git
- Inicialización y commit:
  ```powershell
  git init
  git add .
  git commit -m "v1.0.0 - Login y backend funcional (inicio del proyecto Cotizador 1.0)"
  ```
- Ramas:
  ```powershell
  git branch develop
  git branch qa
  git branch respaldo
  git checkout develop
  ```

## Incidencias y resoluciones
- `psql` no reconocido → ajuste PATH e instalación limpia.
- `pg_hba.conf` y contraseña → se optó por reinstalación para acelerar.
- Prisma `Missing DATABASE_URL` → `.env` en `backend/` y renombrar `prisma.config.ts` a `.bak`.
- Tailwind v4 → usar `@tailwindcss/postcss`.
- CORS entre puertos → habilitado en Express.

## Pendientes próximos
- Dashboard base post login.
- Hash de contraseñas y sesiones.
- Variables `.env` para frontend y backend por entorno.
- Docker para replicar entornos.
