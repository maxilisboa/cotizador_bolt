/*
  # Add Commission Configuration

  1. New Tables
    - `aseguradoras` - Insurance companies
      - `id` (uuid, primary key)
      - `nombre` (text, unique)
      - `comision_porcentaje` (numeric, default commission %)
      - `created_at` (timestamp)
    
    - `vendedores` - Salespeople
      - `id` (uuid, primary key)
      - `nombre` (text, unique)
      - `comision_porcentaje` (numeric, commission % we pay them)
      - `created_at` (timestamp)
  
  2. Changes to `polizas` table
    - Add `aseguradora_id` (foreign key to aseguradoras)
    - Add `vendedor_id` (foreign key to vendedores)
    - Add `comision_neta` (calculated commission after vendor payment)
  
  3. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Create aseguradoras table
CREATE TABLE IF NOT EXISTS aseguradoras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text UNIQUE NOT NULL,
  comision_porcentaje numeric(5,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE aseguradoras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view aseguradoras"
  ON aseguradoras FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert aseguradoras"
  ON aseguradoras FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update aseguradoras"
  ON aseguradoras FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create vendedores table
CREATE TABLE IF NOT EXISTS vendedores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text UNIQUE NOT NULL,
  comision_porcentaje numeric(5,2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE vendedores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view vendedores"
  ON vendedores FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert vendedores"
  ON vendedores FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update vendedores"
  ON vendedores FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add columns to polizas table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'aseguradora_id'
  ) THEN
    ALTER TABLE polizas ADD COLUMN aseguradora_id uuid REFERENCES aseguradoras(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'vendedor_id'
  ) THEN
    ALTER TABLE polizas ADD COLUMN vendedor_id uuid REFERENCES vendedores(id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'polizas' AND column_name = 'comision_neta'
  ) THEN
    ALTER TABLE polizas ADD COLUMN comision_neta numeric(12,2) DEFAULT 0;
  END IF;
END $$;