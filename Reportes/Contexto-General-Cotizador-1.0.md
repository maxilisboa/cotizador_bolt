# Contexto General — Cotizador 1.0

**Fecha:** 2025-11-02  
**Rama principal:** `master`  
**Ramas de trabajo:** `develop`, `qa`, `respaldo`

## Objetivo
Plataforma de cotización de seguros con login y dashboard base. Desarrollo local primero, luego réplica en producción con misma estructura.

## Alcance actual
- Backend Express con Prisma sobre PostgreSQL local.
- Frontend React + Vite + Tailwind funcionando.
- Login mínimo validando contra tabla `Usuario`.
- CORS habilitado en backend para desarrollo.

## Arquitectura
- **Monorepo** con carpetas `backend/` y `frontend/` y `Reportes/`.
- **Base de datos:** PostgreSQL 18 local.
- **ORM:** Prisma.
- **API:** REST simple por ahora.
- **UI:** React + Vite + Tailwind.

## Stack técnico
- Node.js LTS.
- Express 4.x, CORS, Prisma 6.x.
- PostgreSQL 18.
- React 18 + Vite + Tailwind v4 (con `@tailwindcss/postcss`).

## Estructura de carpetas
```
Cotizador/
  backend/
    prisma/
      migrations/
      schema.prisma
    generated/prisma/         # Prisma Client
    server.js                 # API
    .env                      # DATABASE_URL
  frontend/
    src/
    index.html
    tailwind.config.js
    postcss.config.js
  Reportes/
```
> Nota: En el commit inicial el archivo de servidor se llama `Server.js`. Mantener consistencia a `server.js` en próximos cambios.

## Configuración local
- **DB local:** usuario `postgres`, pass `admin`, puerto `5432`.
- **DATABASE_URL:** `postgresql://postgres:admin@localhost:5432/cotizador` en `backend/.env`.
- **CORS:** habilitado globalmente en Express.

## Convenciones Git
- `master`: estable.
- `develop`: trabajo diario.
- `qa`: estabilización para pruebas.
- `respaldo`: resguardo temporal cuando haga falta.
- Mensajes de commit con prefijo: `feat:`, `fix:`, `chore:`, `docs:`. Versionado semántico cuando aplique.

## Seguridad y datos
- No versionar `.env` ni dumps productivos.
- Cuidado con almacenar contraseñas en texto plano. El login actual es demostrativo; se migrará a hashing y sesiones.

## Roadmap corto
1. **Dashboard base** tras login (cards + menú).
2. **Autenticación real**: hashing + sesiones o JWT.
3. **Módulos**: cotizaciones, pólizas, usuarios.
4. **Docker** para dev y prod.
5. **CI/CD** y despliegue.

