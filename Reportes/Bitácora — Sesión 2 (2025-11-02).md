Bitácora — Sesión 2 (2025-11-02)
Resumen

Durante esta sesión se consolidó el flujo completo de autenticación y sesión persistente.
El backend fue reestructurado bajo src/, se configuró correctamente express-session con compatibilidad localhost y el frontend se integró para mostrar el Dashboard posterior al login.

Detalle paso a paso
1) Reestructuración backend

Creación de carpetas:

backend/
  src/
    routes/auth.js
    server.js


Corrección de imports:
PrismaClient ahora se importa desde ../generated/prisma/index.js.

Configuración definitiva de server.js:

app.set("trust proxy", 1);
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"]
}));
app.use(express.json());
app.use(session({
  name: "connect.sid",
  secret: "dev",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1000 * 60 * 60
  }
}));
app.use("/api", authRouter(prisma));


auth.js implementado con logs para depuración:

/api/login guarda req.session.userId.

/api/me retorna el usuario activo.

/api/logout destruye la sesión.

2) Validación Prisma

Prisma funcional, base cotizador activa.

Usuario:

Campo	Tipo	Ejemplo
id	Int	1
nombre	String	Maximiliano Lisboa
email	String	mlisboa@liveseguros.cl

pass	String	123456
cargo	String	Administrador
creadoEn	DateTime	2025-11-02T16:46:06.896Z
3) Frontend

Login.jsx restaurado con diseño blanco simple y credentials:"include".

App.jsx actualiza el estado user al detectar sesión activa:

useEffect(() => {
  fetch("/api/me", { credentials: "include" })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => d && setUser(d));
}, []);


Dashboard.jsx muestra layout corporativo Live Seguros con gradiente azul-púrpura y cuatro cards vacías.

4) Pruebas

Cookie connect.sid confirmada visible bajo http://localhost:5173.

Flujo funcional validado:

Login → responde usuario JSON.

/api/me → devuelve usuario autenticado.

Dashboard renderiza Maximiliano Lisboa.

Logout → borra cookie, retorna a Login.

5) Git

Commit y respaldo:

git add .
git commit -m "v1.0.4 - Dashboard base y sesión persistente funcional"
git push
git push origin develop
git checkout respaldo
git merge develop
git push origin respaldo
git checkout develop

6) Estado final

Backend: operativo y estable en puerto 3000.

Frontend: operativo en puerto 5173.

Sesión persistente: confirmada entre reloads.

Diseño: coherente con línea gráfica Live Seguros.