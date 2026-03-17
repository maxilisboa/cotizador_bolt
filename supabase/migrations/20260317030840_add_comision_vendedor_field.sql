/*
  # Add Comisión Vendedor Field

  ## Changes
  1. New Field
    - `comision_vendedor_uf` (numeric) - Commission amount for the salesperson in UF, calculated from comision_neta_uf * vendedor.comision_porcentaje / 100

  ## Notes
  - This field stores the salesperson's commission calculated automatically based on their assigned percentage
  - It's derived from the net commission (comision_neta_uf) multiplied by the salesperson's commission rate
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'comision_vendedor_uf'
  ) THEN
    ALTER TABLE polizas ADD COLUMN comision_vendedor_uf numeric(12,2) DEFAULT 0;
  END IF;
END $$;