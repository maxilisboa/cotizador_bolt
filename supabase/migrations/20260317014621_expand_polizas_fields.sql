/*
  # Expand polizas table with detailed commission fields

  1. Changes to `polizas` table
    - Add `ejecutivo_venta` (text) - Sales executive name
    - Add `categoria` (text) - Category (Automotriz, etc.)
    - Add `estado` (text) - State/Status
    - Add `compania` (text) - Company name (alternative to aseguradora for compatibility)
    - Add `deducible` (numeric) - Deductible amount
    - Add `prima_bruta_anual_uf` (numeric) - Annual gross premium in UF
    - Add `prima_bruta_anual_clp` (numeric) - Annual gross premium in CLP
    - Add `prima_neta_anual_uf` (numeric) - Annual net premium in UF
    - Add `prima_neta_anual_clp` (numeric) - Annual net premium in CLP
    - Add `prima_bruta_mensual_uf` (numeric) - Monthly gross premium in UF
    - Add `prima_bruta_mensual_clp` (numeric) - Monthly gross premium in CLP
    - Add `prima_neta_mensual_uf` (numeric) - Monthly net premium in UF
    - Add `prima_neta_mensual_clp` (numeric) - Monthly net premium in CLP
    - Add `comision_neta_uf` (numeric) - Net commission in UF (what we keep)
    - Add `comision_neta_clp` (numeric) - Net commission in CLP
    - Add `comision_empresa_live` (numeric) - Company commission LIVE
    - Add `comision_en_uf` (numeric) - Commission in UF
    - Add `comision_en_clp` (numeric) - Commission in CLP
    - Add `comision_en_jorge` (numeric) - Commission to Jorge/vendor
    - Add `utilidad_live` (numeric) - LIVE profit
    - Add `realizado` (boolean) - Whether it's completed/realized
    - Add `negativa` (boolean) - Whether it's negative
    - Add `negativa_comision` (numeric) - Negative commission amount

  2. Notes
    - Keeping existing fields for backward compatibility
    - New fields allow for full Excel-style calculations
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'ejecutivo_venta'
  ) THEN
    ALTER TABLE polizas ADD COLUMN ejecutivo_venta text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'categoria'
  ) THEN
    ALTER TABLE polizas ADD COLUMN categoria text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'estado'
  ) THEN
    ALTER TABLE polizas ADD COLUMN estado text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'compania'
  ) THEN
    ALTER TABLE polizas ADD COLUMN compania text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'deducible'
  ) THEN
    ALTER TABLE polizas ADD COLUMN deducible numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'prima_bruta_anual_uf'
  ) THEN
    ALTER TABLE polizas ADD COLUMN prima_bruta_anual_uf numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'prima_bruta_anual_clp'
  ) THEN
    ALTER TABLE polizas ADD COLUMN prima_bruta_anual_clp numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'prima_neta_anual_uf'
  ) THEN
    ALTER TABLE polizas ADD COLUMN prima_neta_anual_uf numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'prima_neta_anual_clp'
  ) THEN
    ALTER TABLE polizas ADD COLUMN prima_neta_anual_clp numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'prima_bruta_mensual_uf'
  ) THEN
    ALTER TABLE polizas ADD COLUMN prima_bruta_mensual_uf numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'prima_bruta_mensual_clp'
  ) THEN
    ALTER TABLE polizas ADD COLUMN prima_bruta_mensual_clp numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'prima_neta_mensual_uf'
  ) THEN
    ALTER TABLE polizas ADD COLUMN prima_neta_mensual_uf numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'prima_neta_mensual_clp'
  ) THEN
    ALTER TABLE polizas ADD COLUMN prima_neta_mensual_clp numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'comision_neta_uf'
  ) THEN
    ALTER TABLE polizas ADD COLUMN comision_neta_uf numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'comision_neta_clp'
  ) THEN
    ALTER TABLE polizas ADD COLUMN comision_neta_clp numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'comision_empresa_live'
  ) THEN
    ALTER TABLE polizas ADD COLUMN comision_empresa_live numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'comision_en_uf'
  ) THEN
    ALTER TABLE polizas ADD COLUMN comision_en_uf numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'comision_en_clp'
  ) THEN
    ALTER TABLE polizas ADD COLUMN comision_en_clp numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'comision_en_jorge'
  ) THEN
    ALTER TABLE polizas ADD COLUMN comision_en_jorge numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'utilidad_live'
  ) THEN
    ALTER TABLE polizas ADD COLUMN utilidad_live numeric(12,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'realizado'
  ) THEN
    ALTER TABLE polizas ADD COLUMN realizado boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'negativa'
  ) THEN
    ALTER TABLE polizas ADD COLUMN negativa boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'negativa_comision'
  ) THEN
    ALTER TABLE polizas ADD COLUMN negativa_comision numeric(12,2) DEFAULT 0;
  END IF;
END $$;