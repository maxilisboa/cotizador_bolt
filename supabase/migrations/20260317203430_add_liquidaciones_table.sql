/*
  # Add liquidaciones (payroll) table

  1. New Tables
    - `liquidaciones`
      - `id` (uuid, primary key)
      - `vendedor_id` (uuid, foreign key to vendedores)
      - `periodo_mes` (integer, month 1-12)
      - `periodo_anio` (integer, year)
      - `total_comision_uf` (decimal, total commission in UF)
      - `total_comision_clp` (decimal, total commission in CLP)
      - `total_honorarios` (decimal, gross honorarios amount)
      - `retencion_impuesto` (decimal, tax retention amount)
      - `total_liquido` (decimal, net amount after tax)
      - `valor_uf` (decimal, UF value used for calculation)
      - `porcentaje_retencion` (decimal, tax retention percentage, default 15.25%)
      - `negativa_fuga` (decimal, deductions if any, default 0)
      - `pdf_url` (text, optional URL to generated PDF)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `liquidaciones` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS liquidaciones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendedor_id uuid REFERENCES vendedores(id) ON DELETE CASCADE NOT NULL,
  periodo_mes integer NOT NULL CHECK (periodo_mes >= 1 AND periodo_mes <= 12),
  periodo_anio integer NOT NULL CHECK (periodo_anio >= 2000),
  total_comision_uf decimal(10,3) DEFAULT 0,
  total_comision_clp decimal(12,2) DEFAULT 0,
  total_honorarios decimal(12,2) DEFAULT 0,
  retencion_impuesto decimal(12,2) DEFAULT 0,
  total_liquido decimal(12,2) DEFAULT 0,
  valor_uf decimal(10,2) NOT NULL,
  porcentaje_retencion decimal(5,2) DEFAULT 15.25,
  negativa_fuga decimal(12,2) DEFAULT 0,
  pdf_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(vendedor_id, periodo_mes, periodo_anio)
);

ALTER TABLE liquidaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view liquidaciones"
  ON liquidaciones FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert liquidaciones"
  ON liquidaciones FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update liquidaciones"
  ON liquidaciones FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete liquidaciones"
  ON liquidaciones FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_liquidaciones_vendedor ON liquidaciones(vendedor_id);
CREATE INDEX IF NOT EXISTS idx_liquidaciones_periodo ON liquidaciones(periodo_mes, periodo_anio);
