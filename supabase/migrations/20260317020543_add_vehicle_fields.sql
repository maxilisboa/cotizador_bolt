/*
  # Add vehicle fields to polizas table

  1. Changes to `polizas` table
    - Add `patente` (text) - Vehicle license plate number
    - Add `marca` (text) - Vehicle brand/make
    - Add `modelo` (text) - Vehicle model
    - Add `ano` (integer) - Vehicle year

  2. Notes
    - These fields complete the vehicle information for automotive insurance policies
    - All fields are optional to allow flexibility for non-automotive policies
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'patente'
  ) THEN
    ALTER TABLE polizas ADD COLUMN patente text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'marca'
  ) THEN
    ALTER TABLE polizas ADD COLUMN marca text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'modelo'
  ) THEN
    ALTER TABLE polizas ADD COLUMN modelo text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'ano'
  ) THEN
    ALTER TABLE polizas ADD COLUMN ano integer;
  END IF;
END $$;