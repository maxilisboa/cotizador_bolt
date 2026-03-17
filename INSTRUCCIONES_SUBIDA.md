# Instrucciones para subir a GitHub

## Opción 1: Subir directamente desde la interfaz web de GitHub

1. Ve a: https://github.com/maxilisboa/cotizador_bolt
2. Click en "Add file" → "Upload files"
3. Arrastra TODOS los archivos de este proyecto
4. Escribe un mensaje de commit: "Proyecto completo de cotizador de seguros"
5. Click en "Commit changes"

## Opción 2: Usar Git desde la línea de comandos

Descarga este proyecto completo y luego ejecuta:

```cmd
cd cotizador-bolt-proyecto
git init
git add .
git commit -m "Proyecto completo de cotizador de seguros"
git branch -M main
git remote add origin https://github.com/maxilisboa/cotizador_bolt.git
git push -u origin main
```

Si el repositorio ya tiene contenido, usa:
```cmd
git push -f origin main
```

## Variables de entorno importantes

No olvides configurar estas variables en tu hosting (Vercel, Netlify, etc.):

```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
```

Las encontrarás en el archivo .env de este proyecto.
