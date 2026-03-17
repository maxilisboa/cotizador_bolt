/*
  # Add insured person (asegurado) fields to polizas table

  1. Changes to `polizas` table
    - Add `rut_asegurado` (text) - Insured person's RUT/Tax ID
    - Add `email_asegurado` (text) - Insured person's email
    - Add `telefono_asegurado` (text) - Insured person's phone number
    - Add `direccion_asegurado` (text) - Insured person's address
    - Add `observaciones` (text) - General observations/notes about the policy

  2. Notes
    - These fields complete the insured person information from the Excel template
    - All fields are optional to allow flexibility in data entry
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'rut_asegurado'
  ) THEN
    ALTER TABLE polizas ADD COLUMN rut_asegurado text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'email_asegurado'
  ) THEN
    ALTER TABLE polizas ADD COLUMN email_asegurado text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'telefono_asegurado'
  ) THEN
    ALTER TABLE polizas ADD COLUMN telefono_asegurado text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'direccion_asegurado'
  ) THEN
    ALTER TABLE polizas ADD COLUMN direccion_asegurado text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'observaciones'
  ) THEN
    ALTER TABLE polizas ADD COLUMN observaciones text;
  END IF;
END $$;