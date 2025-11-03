import express from "express";
import cors from "cors";
import session from "express-session";
import fetch from "node-fetch";
import { PrismaClient } from "../generated/prisma/index.js";
import authRouter from "./routes/auth.js";
import dashboardRouter from "./routes/dashboard.js"; // nuevo módulo

const app = express();
const prisma = new PrismaClient();

// --- Configuración base ---

// CORS para frontend en 5173
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);

// Parseo JSON
app.use(express.json());

// Requerido para que Edge o Chrome acepten cookie cross-site en dev
app.set("trust proxy", 1);

// Sesión
app.use(
  session({
    name: "connect.sid",
    secret: "dev",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,     // true solo con HTTPS
      sameSite: "lax",   // en HTTP usar "lax", no "none"
      maxAge: 1000 * 60 * 60, // 1h
    },
  })
);

// --- Middleware global de autorización ---
export function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "No autorizado" });
  }
  next();
}

// --- Rutas principales ---
app.use("/api", authRouter(prisma));
app.use("/api/dashboard", dashboardRouter(prisma)); // ruta protegida

// --- Indicadores UF/USD con cache de 12h ---
let cache = { uf: 0, usd: 0, fecha: null, ultimaActualizacion: 0 };

app.get("/api/indicadores", async (req, res) => {
  const ahora = Date.now();
  const doceHoras = 1000 * 60 * 60 * 12;

  // usar cache si está dentro de las 12h
  if (ahora - cache.ultimaActualizacion < doceHoras && cache.uf && cache.usd) {
    return res.json({
      uf: cache.uf,
      usd: cache.usd,
      fecha: cache.fecha,
      fuente: "mindicador.cl (cache)",
    });
  }

  try {
    const respuesta = await fetch("https://mindicador.cl/api");
    if (!respuesta.ok) throw new Error("Respuesta inválida del servidor");
    const data = await respuesta.json();

    cache = {
      uf: data.uf?.valor || 0,
      usd: data.dolar?.valor || 0,
      fecha: data.fecha || new Date().toISOString(),
      ultimaActualizacion: ahora,
    };

    return res.json({
      uf: cache.uf,
      usd: cache.usd,
      fecha: cache.fecha,
      fuente: "mindicador.cl",
    });
  } catch (err) {
    console.error("Error obteniendo indicadores:", err.message);
    // si falla la API, usamos los valores de cache o default
    return res.json({
      uf: cache.uf || 0,
      usd: cache.usd || 0,
      fecha: cache.fecha || new Date().toISOString(),
      fuente: "Cache local (último intento fallido)",
    });
  }
});

// --- Servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Backend listo en http://localhost:${PORT}`)
);
