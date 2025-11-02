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
