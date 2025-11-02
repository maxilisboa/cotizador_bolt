# **Reporte Técnico v1.0.3 – Cotizador 1.0**

### **Fecha:** 02-11-2025  
### **Proyecto:** Cotizador 1.0  
### **Rama activa:** `develop`  
### **Versión:** v1.0.3  

---

## **1. Contexto general**

Durante esta sesión se consolidó el flujo **Login → Backend → Base de datos** y se completó la estructura de ramas del repositorio remoto en GitHub.  
El objetivo fue pasar del entorno de pruebas con validación local a un entorno funcional conectado a Prisma, manteniendo compatibilidad con Tailwind v4 y el diseño corporativo Live Seguros.

---

## **2. Avance técnico**

### **Frontend**
- Integración definitiva de **Tailwind CSS v4.1.16** mediante `postcss.config.mjs`.
- Diseño completo del **Login Live Seguros**, con estructura 50/50:
  - Panel izquierdo: degradado azul–púrpura, logotipo, frase de marca.
  - Panel derecho: formulario de acceso estilizado con componentes reusables.
- Eliminación de dependencias obsoletas (`setUser`, lógica Axios local).
- Conexión directa al endpoint `http://localhost:3000/api/login`.
- Validación visual completa: mensajes de error, éxito y conexión.

### **Backend**
- Extensión de `server.js` (Express + Prisma) con endpoint real `/api/login`.
- Validación real de usuario desde tabla `usuario`:
  - Campos: `id`, `nombre`, `email`, `pass`, `cargo`, `creadoEn`.
- Manejo de errores y respuestas JSON estructuradas.
- Configuración base lista para agregar endpoints `/api/session` y `/api/logout`.

---

## **3. Flujo Git**

Ramas locales y remotas sincronizadas correctamente:

| Rama | Propósito | Estado remoto |
|------|------------|----------------|
| **master** | Producción estable | `origin/master` |
| **develop** | Desarrollo activo | `origin/develop` |
| **qa** | Validación interna | `origin/qa` |
| **respaldo** | Copias manuales | `origin/respaldo` |

Flujo operativo:  
`develop` → revisión en `qa` → merge a `master`.  
Respaldo se mantiene para copias antes de sprints mayores.

---

## **4. Próximos pasos**

1. Implementar endpoint `/api/session` para control de sesión persistente.  
2. Crear vista **Dashboard** con el mismo design system del login (gradientes, tipografía, espaciado).  
3. Definir estructura base de componentes:  
   - Navbar, Sidebar, Cards de métricas, tabla de cotizaciones.  
4. Agregar autenticación completa (sesión + middleware de autorización).  
5. Publicar primera build estable (`v1.1.0`) en rama `qa`.

---

## **5. Observaciones**
- Tailwind v4 confirmado funcional y compilando correctamente.
- Se mantiene compatibilidad con Vite 7 y React 18.
- Login validado con credenciales reales (`mlisboa@liveseguros.cl / 123456`).
