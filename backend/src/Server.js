import express from "express";
import cors from "cors";
import session from "express-session";
import { PrismaClient } from "../generated/prisma/index.js";
import authRouter from "./routes/auth.js";

const app = express();          // ← debe ir antes de usar app
const prisma = new PrismaClient();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(express.json());

app.use(
  session({
    name: "connect.sid",
    secret: "dev",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,   // true solo si usas HTTPS
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    },
  })
);



// --- Rutas ---
app.use("/api", authRouter(prisma));

// --- Servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Backend listo en http://localhost:${PORT}`)
);


//API Indicadores UF y USD

import fetch from "node-fetch";

let cache = { uf: 0, usd: 0, fecha: null, ultimaActualizacion: 0 };

app.get("/api/indicadores", async (req, res) => {
  const ahora = Date.now();
  const doceHoras = 1000 * 60 * 60 * 12;

  // usa cache si no han pasado 12h
  if (ahora - cache.ultimaActualizacion < doceHoras && cache.uf && cache.usd) {
    return res.json({
      uf: cache.uf,
      usd: cache.usd,
      fecha: cache.fecha,
      fuente: "mindicador.cl (cache)"
    });
  }

  try {
    const r = await fetch("https://mindicador.cl/api");
    const d = await r.json();

    cache = {
      uf: d.uf?.valor || 0,
      usd: d.dolar?.valor || 0,
      fecha: d.fecha || new Date().toISOString(),
      ultimaActualizacion: ahora
    };

    res.json({
      uf: cache.uf,
      usd: cache.usd,
      fecha: cache.fecha,
      fuente: "mindicador.cl"
    });
  } catch (err) {
    console.error("Error obteniendo indicadores:", err);
    res.status(500).json({ error: "Error al obtener datos desde mindicador.cl" });
  }
});
