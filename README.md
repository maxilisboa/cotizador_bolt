# Cotizador de Seguros

Sistema de gestión de pólizas de seguros con cálculo automático de comisiones.

## Características

- 📊 Dashboard con indicadores clave (primas, comisiones, pólizas)
- 📄 Gestión completa de pólizas
- 💼 Administración de vendedores y aseguradoras
- 📥 Importación masiva desde Excel
- 🔐 Autenticación segura con Supabase
- 💰 Cálculo automático de comisiones configurables

## Tecnologías

- Vanilla JavaScript (sin frameworks)
- Vite para desarrollo y build
- Supabase para backend y base de datos
- CSS moderno

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Configuración

Crea un archivo `.env` con:

```
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_ANON_KEY=tu_clave
```

## Estructura de la base de datos

- **vendedores**: Gestión de vendedores
- **aseguradoras**: Catálogo de aseguradoras
- **polizas**: Registro de pólizas con toda la información
- **configuracion_comisiones**: Configuración de porcentajes de comisión por aseguradora

## Deploy

Compatible con Vercel, Netlify, y cualquier hosting que soporte sitios estáticos.
