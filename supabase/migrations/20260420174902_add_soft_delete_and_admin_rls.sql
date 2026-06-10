/*
  # Add soft delete to vendedores and implement Admin RLS policies

  1. Schema Changes
    - Add `activo` column to `vendedores` table (defaults to true)
  
  2. Security
    - Create RLS policies for `aseguradoras` table:
      - Admins can SELECT, INSERT, UPDATE, DELETE
    - Create RLS policies for `vendedores` table:
      - Admins can SELECT (including soft-deleted), INSERT, UPDATE, DELETE
      - Non-admins can SELECT only active vendedores (activo = true)
    - Policies use cached performance pattern with auth.uid()

  3. Important Notes
    - RLS is enabled on both tables
    - Admin status checked via usuarios.cargo = 'Admin'
    - Soft delete implemented via activo = false update
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendedores' AND column_name = 'activo'
  ) THEN
    ALTER TABLE vendedores ADD COLUMN activo BOOLEAN DEFAULT true;
  END IF;
END $$;

DROP POLICY IF EXISTS "Admins can manage aseguradoras" ON aseguradoras;
DROP POLICY IF EXISTS "Non-admins can view aseguradoras" ON aseguradoras;
DROP POLICY IF EXISTS "Admins can select vendedores" ON vendedores;
DROP POLICY IF EXISTS "Non-admins can select active vendedores" ON vendedores;
DROP POLICY IF EXISTS "Admins can insert vendedores" ON vendedores;
DROP POLICY IF EXISTS "Admins can update vendedores" ON vendedores;
DROP POLICY IF EXISTS "Admins can delete vendedores" ON vendedores;

CREATE POLICY "Admins can manage aseguradoras"
  ON aseguradoras
  FOR ALL
  TO authenticated
  USING ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin')
  WITH CHECK ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin');

CREATE POLICY "Non-admins can view aseguradoras"
  ON aseguradoras
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can select vendedores"
  ON vendedores
  FOR SELECT
  TO authenticated
  USING ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin');

CREATE POLICY "Non-admins can select active vendedores"
  ON vendedores
  FOR SELECT
  TO authenticated
  USING (
    (SELECT cargo FROM usuarios WHERE id = auth.uid()) != 'Admin'
    AND activo = true
  );

CREATE POLICY "Admins can insert vendedores"
  ON vendedores
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin');

CREATE POLICY "Admins can update vendedores"
  ON vendedores
  FOR UPDATE
  TO authenticated
  USING ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin')
  WITH CHECK ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin');

CREATE POLICY "Admins can delete vendedores"
  ON vendedores
  FOR DELETE
  TO authenticated
  USING ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin');