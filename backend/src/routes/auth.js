import express from "express";

export default function authRouter(prisma) {
  const r = express.Router();

  // === LOGIN ===
  r.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body || {};
      console.log("Login recibido:", email); // debug

      const u = await prisma.usuario.findUnique({ where: { email } });
      if (!u || u.pass !== password)
        return res.status(401).json({ error: "Credenciales inválidas" });

      req.session.userId = u.id;
      req.session.save(() => {
        console.log("Sesión guardada:", req.session.userId);
        const { pass: _, ...safe } = u;
        res.json(safe);
      });
    } catch (err) {
      console.error("Error en /api/login:", err);
      res.status(500).json({ error: "Error interno" });
    }
  });

  // === SESIÓN ACTUAL ===
  r.get("/me", async (req, res) => {
    console.log("Verificando sesión:", req.session.userId);
    if (!req.session.userId)
      return res.status(401).json({ error: "No autenticado" });

    const u = await prisma.usuario.findUnique({
      where: { id: req.session.userId },
    });

    if (!u) return res.status(404).json({ error: "Usuario no encontrado" });

    const { pass: _, ...safe } = u;
    res.json(safe);
  });

  // === LOGOUT ===
  r.post("/logout", (req, res) => {
    req.session.destroy(() => res.json({ ok: true }));
  });

  return r;
}
