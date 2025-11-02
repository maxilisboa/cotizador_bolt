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

// === ENDPOINT LOGIN REAL ===
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario || usuario.pass !== password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json({
      mensaje: "Login exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        cargo: usuario.cargo,
      },
    });
  } catch (error) {
    console.error("Error en /api/login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
