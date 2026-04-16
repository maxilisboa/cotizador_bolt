/*
  # Add commission type to vendedores

  1. Changes
    - Add `tipo_comision` column to vendedores table
      - Values: 'porcentaje' or 'prima_bruta_mensual'
      - Default: 'porcentaje' (existing behavior)
    
  2. Notes
    - This allows executives to be paid either by percentage of commission or by the monthly gross premium amount
    - Existing records will default to 'porcentaje' to maintain current behavior
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendedores' AND column_name = 'tipo_comision'
  ) THEN
    ALTER TABLE vendedores 
    ADD COLUMN tipo_comision text DEFAULT 'porcentaje' CHECK (tipo_comision IN ('porcentaje', 'prima_bruta_mensual'));
  END IF;
END $$;