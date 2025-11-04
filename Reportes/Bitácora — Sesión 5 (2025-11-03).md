Bitácora — Sesión 5 (2025-11-03)
Resumen

Durante esta sesión se desarrolló la integración real del Dashboard con datos dinámicos.
Se conectó la tabla Mora en PostgreSQL mediante Prisma, se habilitó el conteo de registros y se añadió la visualización directa en el frontend.
Además, se corrigió el endpoint de indicadores UF/USD con cache local y manejo de fallos.
Flujo completo validado en Edge con sesión persistente.

Detalle paso a paso
1) Conexión base de datos

Confirmada conexión en DBeaver a localhost:5432 con base cotizador.

Creada tabla Mora manualmente con registro inicial:

Vehículos Motorizados | 571608 | Beatriz Navarrete Carrasco | 1 | 1.013483 UF | 15-10-2025 | Pendiente


Verificada estructura en DBeaver y sincronizada con Prisma vía npx prisma db pull.

2) Actualización Prisma

Añadido modelo Mora en schema.prisma.

Ejecutados comandos:

npx prisma db pull
npx prisma generate
npx prisma studio


Confirmadas tablas Usuario y Mora visibles en Prisma Studio con datos activos.

3) Backend

Actualizado backend/src/routes/dashboard.js:

const totalMoras = await prisma.mora.count();
res.json({ moras: totalMoras });


Mejorado /api/indicadores con cache local y fallback en caso de error externo.

Validado middleware requireAuth operativo en /api/dashboard.

4) Frontend

Actualizado Dashboard.jsx para mostrar:

Indicadores UF/USD con fuente y fecha.

Nueva card “Moras pendientes” conectada al backend.

Mantención completa del layout existente (sidebar, navbar, gráfico Recharts).

Confirmada carga de datos { moras: 1 } en consola y visualización en UI.

5) Validaciones

Pruebas de sesión desde Edge con cookies connect.sid (sameSite: "lax", secure: false).

Verificados endpoints:

/api/me → autenticación funcional.

/api/dashboard → devuelve { moras: 1 }.

/api/indicadores → devuelve datos con fuente o cache local.

6) Flujo Git
git add .
git commit -m "v1.0.7 - Integración Dashboard + Moras + Indicadores estables"
git push origin develop
git checkout respaldo
git merge develop
git push origin respaldo
git checkout develop

Incidencias y resoluciones
Incidencia	Causa	Resolución
Error 500 en /api/dashboard	Prisma no reconocía tabla Mora	Sincronización con prisma db pull
Error 500 en /api/indicadores	Falla en fetch hacia mindicador.cl	Implementado fallback local
Variable duplicada cards	Repetición accidental en frontend	Consolidado array único con card de Moras
Cookie sin sesión	Configuración sameSite incorrecta	Ajustado a "lax" para desarrollo local
Estado final

Backend estable y sincronizado con PostgreSQL.

Dashboard operativo con datos reales (Moras) e indicadores actualizados.

Flujo completo: Login → Sesión persistente → Dashboard con métricas.

Pendientes próximos

Crear módulo /api/polizas con datos reales en Prisma.

Incorporar resumen de pólizas vencidas y vigentes.

Implementar hash de contraseñas (bcrypt).

Preparar entorno Docker Compose.

Versión QA → v1.1.0.