# Instrucciones para Migrar a Otro Agente Bolt

## Pasos para continuar el desarrollo en otro agente Bolt:

### 1. Clonar el Repositorio
En el nuevo agente Bolt, ejecuta:
```
Clona este repositorio: https://github.com/maxilisboa/cotizador_bolt
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con este contenido:

```
VITE_SUPABASE_URL=https://xuisqgaijknpryuzwmwz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1aXNxZ2FpamtucHJ5dXp3bXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MDc1MTYsImV4cCI6MjA4OTI4MzUxNn0.jElhsSz2ao9c-J7khL5j4ZfGIth2jtzVbgwlX3HIq_c
```

### 3. Instalar Dependencias
El agente ejecutará automáticamente:
```
npm install
```

### 4. Listo para Desarrollar
El nuevo agente tendrá acceso a:
- Todo el código fuente
- La base de datos Supabase (con todas las tablas y datos)
- Las migraciones aplicadas
- El mismo entorno de desarrollo

## Información del Proyecto

### Base de Datos Supabase
- **Proyecto**: xuisqgaijknpryuzwmwz
- **URL**: https://xuisqgaijknpryuzwmwz.supabase.co
- **Tablas**: usuarios, aseguradoras, vendedores, polizas, configuracion_comisiones, liquidaciones

### Estado Actual del Desarrollo
- Sistema de autenticación implementado
- CRUD de usuarios, aseguradoras y vendedores
- Gestión de pólizas completa
- Importación de datos desde Excel
- Dashboard con indicadores
- Módulo de liquidaciones en desarrollo (50% completado)

### Usuarios de Prueba
Consulta con el administrador actual las credenciales de acceso.

## Continuidad del Desarrollo

El nuevo agente podrá:
1. Continuar desarrollando nuevas funcionalidades
2. Hacer commits y push al repositorio de GitHub
3. Acceder a todos los datos en Supabase
4. Aplicar nuevas migraciones si es necesario

## Token de GitHub
Para hacer push al repositorio, necesitarás el token de acceso personal de GitHub.
