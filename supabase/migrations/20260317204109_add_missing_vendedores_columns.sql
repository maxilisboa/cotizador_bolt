/*
  # Add missing columns to vendedores table

  1. Changes
    - Add `porcentaje_comision` column if it doesn't exist
    - Add `monto_fijo_comision` column if it doesn't exist
    - Add `email` column if it doesn't exist
    - Add `rut` column if it doesn't exist
  
  2. Notes
    - Uses conditional logic to prevent errors if columns already exist
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendedores' AND column_name = 'porcentaje_comision'
  ) THEN
    ALTER TABLE vendedores ADD COLUMN porcentaje_comision decimal(5,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendedores' AND column_name = 'monto_fijo_comision'
  ) THEN
    ALTER TABLE vendedores ADD COLUMN monto_fijo_comision decimal(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendedores' AND column_name = 'email'
  ) THEN
    ALTER TABLE vendedores ADD COLUMN email text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendedores' AND column_name = 'rut'
  ) THEN
    ALTER TABLE vendedores ADD COLUMN rut text;
  END IF;
END $$;
