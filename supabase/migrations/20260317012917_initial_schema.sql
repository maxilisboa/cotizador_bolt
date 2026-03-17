/*
  # Initial Database Schema - Sistema de Cotización de Seguros

  ## Overview
  Creates the complete database schema for an insurance quotation system migrated from Prisma/PostgreSQL.

  ## New Tables

  ### 1. usuarios
  Stores user authentication and profile information
  - `id` (uuid, primary key) - Unique user identifier
  - `email` (text, unique) - User email for login
  - `password` (text) - Encrypted password (will be migrated to Supabase Auth)
  - `nombre` (text) - User's full name
  - `cargo` (text) - User's job title/position
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. polizas
  Stores insurance policies
  - `id` (uuid, primary key) - Unique policy identifier
  - `numero_poliza` (text) - Policy number
  - `nombre_asegurado` (text) - Insured party name
  - `monto` (decimal) - Policy amount
  - `fecha` (timestamptz) - Policy date
  - `usuario_id` (uuid, foreign key) - User who created the policy
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. vehiculo_alias
  Lookup table for vehicle naming variations
  - `id` (uuid, primary key) - Unique identifier
  - `scope` (text) - Scope of the alias (brand/model)
  - `pattern` (text) - Pattern to match
  - `normalized` (text) - Normalized version
  - `created_at` (timestamptz) - Record creation timestamp

  ### 4. sii_vehiculos_staging
  Staging table for vehicle data imports
  - `id` (uuid, primary key) - Unique identifier
  - `marca` (text) - Vehicle brand
  - `modelo` (text) - Vehicle model
  - `anio` (integer) - Vehicle year
  - `created_at` (timestamptz) - Record creation timestamp

  ### 5. vehiculo_catalogo
  Master vehicle catalog
  - `id` (uuid, primary key) - Unique identifier
  - `country` (text) - Country code
  - `make_code` (text) - Manufacturer code
  - `model_code` (text) - Model code
  - `year` (integer) - Vehicle year
  - `make_name` (text) - Manufacturer display name
  - `model_name` (text) - Model display name
  - `created_at` (timestamptz) - Record creation timestamp
  - Unique constraint on (country, make_code, model_code, year)

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users
  - usuarios table: users can read their own data
  - polizas table: users can manage their own policies
  - vehiculo_alias, sii_vehiculos_staging, vehiculo_catalogo: read access for authenticated users, write for admin
*/

-- Create usuarios table
CREATE TABLE IF NOT EXISTS usuarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  nombre text NOT NULL,
  cargo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create polizas table
CREATE TABLE IF NOT EXISTS polizas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_poliza text NOT NULL,
  nombre_asegurado text NOT NULL,
  monto decimal(12,2) NOT NULL,
  fecha timestamptz DEFAULT now(),
  usuario_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create vehiculo_alias table
CREATE TABLE IF NOT EXISTS vehiculo_alias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scope text NOT NULL,
  pattern text NOT NULL,
  normalized text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create sii_vehiculos_staging table
CREATE TABLE IF NOT EXISTS sii_vehiculos_staging (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  marca text,
  modelo text,
  anio integer,
  created_at timestamptz DEFAULT now()
);

-- Create vehiculo_catalogo table
CREATE TABLE IF NOT EXISTS vehiculo_catalogo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL,
  make_code text NOT NULL,
  model_code text NOT NULL,
  year integer NOT NULL,
  make_name text NOT NULL,
  model_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(country, make_code, model_code, year)
);

-- Enable RLS on all tables
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE polizas ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehiculo_alias ENABLE ROW LEVEL SECURITY;
ALTER TABLE sii_vehiculos_staging ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehiculo_catalogo ENABLE ROW LEVEL SECURITY;

-- RLS Policies for usuarios
CREATE POLICY "Users can read own profile"
  ON usuarios FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON usuarios FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for polizas
CREATE POLICY "Users can view own policies"
  ON polizas FOR SELECT
  TO authenticated
  USING (usuario_id = auth.uid());

CREATE POLICY "Users can create own policies"
  ON polizas FOR INSERT
  TO authenticated
  WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Users can update own policies"
  ON polizas FOR UPDATE
  TO authenticated
  USING (usuario_id = auth.uid())
  WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "Users can delete own policies"
  ON polizas FOR DELETE
  TO authenticated
  USING (usuario_id = auth.uid());

-- RLS Policies for vehiculo_alias (read for all authenticated users)
CREATE POLICY "Authenticated users can view vehicle aliases"
  ON vehiculo_alias FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for sii_vehiculos_staging (read for all authenticated users)
CREATE POLICY "Authenticated users can view staging vehicles"
  ON sii_vehiculos_staging FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for vehiculo_catalogo (read for all authenticated users)
CREATE POLICY "Authenticated users can view vehicle catalog"
  ON vehiculo_catalogo FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_polizas_usuario_id ON polizas(usuario_id);
CREATE INDEX IF NOT EXISTS idx_polizas_fecha ON polizas(fecha);
CREATE INDEX IF NOT EXISTS idx_vehiculo_catalogo_lookup ON vehiculo_catalogo(country, make_code, model_code, year);
CREATE INDEX IF NOT EXISTS idx_vehiculo_alias_pattern ON vehiculo_alias(pattern);
