Reporte Técnico v1.0.7 – Cotizador 1.0
Fecha: 03-11-2025
Proyecto: Cotizador 1.0
Rama activa: develop
Versión: v1.0.7
1. Contexto general

Esta versión consolida el flujo completo de Dashboard funcional con datos reales.
Se integró la lectura de la tabla Mora desde PostgreSQL mediante Prisma y se muestran los valores en el frontend dentro de una nueva card.
También se estabilizó la carga de indicadores UF/USD con cache local y fallback automático, garantizando visualización incluso si la fuente externa falla.

2. Avance técnico
Backend

Se agregó modelo Mora al schema.prisma y se sincronizó mediante prisma db pull para reflejar la estructura creada desde DBeaver.

Implementado endpoint protegido /api/dashboard con conteo de registros:

const totalMoras = await prisma.mora.count();
res.json({ moras: totalMoras });


Mejorado el endpoint /api/indicadores con:

Manejo de errores en fetch hacia mindicador.cl.

Cache local por 12 horas.

Fallback automático con última data válida si la API externa falla.

Frontend

Dashboard.jsx actualizado para:

Mostrar los valores reales de UF, USD, fuente y fecha en el encabezado.

Incluir card nueva “Moras pendientes” conectada al backend.

Mantener el diseño original (sidebar, navbar, cards y gráfico).

Confirmada comunicación segura entre frontend y backend mediante credentials: "include" y cookie connect.sid con sameSite: "lax".

Base de datos

Tabla Mora creada manualmente y reconocida por Prisma con el registro inicial:

Ramo	Póliza	Titular	Cuota	Monto	Moneda	Fecha Venc.	Estado
Vehículos Motorizados	571608	Beatriz Navarrete Carrasco	1	1,013483	UF	15-10-2025	Pendiente
3. Flujo Git
Rama	Propósito	Estado remoto
develop	Desarrollo activo (v1.0.7)	actualizado
respaldo	Copia manual sincronizada	actualizado
qa	Validación interna	sin cambios
master	Producción estable	sin cambios

Flujo ejecutado:

git add .
git commit -m "v1.0.7 - Integración Dashboard + Moras + Indicadores estables"
git push origin develop
git checkout respaldo
git merge develop
git push origin respaldo
git checkout develop

4. Próximos pasos

Crear módulo /api/polizas con estructura real desde Prisma.

Ampliar dashboard para mostrar resumen de pólizas vigentes y vencidas.

Implementar endpoint de login protegido con bcrypt.

Preparar entorno Docker (backend, frontend y base PostgreSQL).

Publicar build QA → v1.1.0.

5. Observaciones

Indicadores UF/USD ahora estables con fallback local.

Dashboard funcional y protegido por middleware requireAuth.

Comunicación y sesión confirmadas en Edge y Chrome.

Flujo general listo para agregar módulos de negocio.