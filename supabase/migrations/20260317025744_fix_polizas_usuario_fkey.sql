/*
  # Corregir foreign key de usuario en polizas

  1. Cambios
    - Eliminar constraint que apunta a tabla `usuarios` (que no existe)
    - Crear nuevo constraint que apunta correctamente a `auth.users`
    
  2. Notas
    - Esto corrige el error de violación de foreign key al crear pólizas
    - La tabla auth.users es la tabla real de usuarios de Supabase
*/

ALTER TABLE polizas DROP CONSTRAINT IF EXISTS polizas_usuario_id_fkey;

ALTER TABLE polizas 
  ADD CONSTRAINT polizas_usuario_id_fkey 
  FOREIGN KEY (usuario_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;
