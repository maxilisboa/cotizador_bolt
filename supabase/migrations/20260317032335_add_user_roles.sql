/*
  # Add User Roles System

  1. Changes
    - Add `rol` column to `usuarios` table with default 'vendedor'
    - Set existing user to 'admin' role
    - Possible roles: 'admin', 'vendedor'
  
  2. Notes
    - Admin users can manage all users and access all features
    - Vendedor users can only manage their own data
*/

-- Add rol column to usuarios table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'usuarios' AND column_name = 'rol'
  ) THEN
    ALTER TABLE usuarios ADD COLUMN rol text DEFAULT 'vendedor' NOT NULL;
  END IF;
END $$;

-- Create index for faster role lookups
CREATE INDEX IF NOT EXISTS idx_usuarios_rol ON usuarios(rol);