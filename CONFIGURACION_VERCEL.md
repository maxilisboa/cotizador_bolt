# Configuración de Variables de Entorno en Vercel

## Problema
El dashboard no carga en Vercel porque las variables de entorno no están configuradas correctamente.

## Solución

### Paso 1: Verificar las Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Verifica que tengas estas dos variables configuradas EXACTAMENTE como se muestra:

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://xuisqgaijknpryuzwmwz.supabase.co`
- Environments: ✅ Production, ✅ Preview, ✅ Development

**Variable 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1aXNxZ2FpamtucHJ5dXp3bXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MDc1MTYsImV4cCI6MjA4OTI4MzUxNn0.jElhsSz2ao9c-J7khL5j4ZfGIth2jtzVbgwlX3HIq_c`
- Environments: ✅ Production, ✅ Preview, ✅ Development

### Paso 2: Redeploy

**IMPORTANTE:** Después de configurar las variables, DEBES hacer un redeploy:

1. Ve a **Deployments**
2. Haz clic en los tres puntos (...) del último deployment
3. Selecciona **Redeploy**
4. Confirma el redeploy

### Paso 3: Verificar

Después del redeploy, espera a que termine y verifica que:
- El build termine exitosamente
- Al abrir la aplicación, el dashboard cargue correctamente
- No haya errores en la consola del navegador

## Notas Importantes

- Las variables DEBEN tener el prefijo `VITE_` para que Vite las incluya en el build
- DEBES hacer un redeploy después de agregar/modificar variables
- Las variables se leen en tiempo de BUILD, no en tiempo de ejecución
- Si cambias las variables, SIEMPRE haz redeploy

## Si el problema persiste

1. Verifica que las variables estén configuradas en los tres ambientes (Production, Preview, Development)
2. Asegúrate de que no haya espacios extra al inicio o final de las variables
3. Haz un "Hard Refresh" en el navegador (Ctrl+Shift+R o Cmd+Shift+R)
4. Limpia la caché del navegador
