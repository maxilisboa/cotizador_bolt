/*
  # Add comuna field to polizas table

  1. Changes to `polizas` table
    - Add `comuna_asegurado` (text) - Municipality/commune of the insured person

  2. Notes
    - This field complements the address information for better location data
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'comuna_asegurado'
  ) THEN
    ALTER TABLE polizas ADD COLUMN comuna_asegurado text;
  END IF;
END $$;