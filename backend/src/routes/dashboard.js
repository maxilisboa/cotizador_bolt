import express from "express";
import { requireAuth } from "../server.js";

export default function dashboardRouter(prisma) {
  const r = express.Router();

  // --- Ruta protegida del Dashboard ---
  r.get("/", requireAuth, async (req, res) => {
    try {
      // Contar cantidad de registros en tabla Mora
      const totalMoras = await prisma.mora.count();

      // Devolver resultado en formato JSON
      res.json({
        moras: totalMoras,
      });
    } catch (err) {
      console.error("Error en dashboard:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });

  return r;
}
