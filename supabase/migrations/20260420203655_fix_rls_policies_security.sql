/*
  # Fix RLS Policy Security Issues

  1. Summary
    - Replace unrestricted "always true" RLS policies with admin-only policies
    - Ensure all authenticated users are properly restricted
    - Admins control aseguradoras, vendedores, and liquidaciones modifications
    
  2. Tables Fixed
    - `aseguradoras`: INSERT, UPDATE now require admin role
    - `liquidaciones`: INSERT, UPDATE, DELETE now require admin role
    - `vendedores`: INSERT, UPDATE already fixed in previous migration

  3. Security Model
    - SELECT: Non-admins can view data (aseguradoras unrestricted, vendedores/liquidaciones filtered)
    - INSERT/UPDATE/DELETE: Admins only (role = 'Admin' in usuarios table)
    - Uses subquery to check user role: (SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin'
*/

-- Drop insecure policies on aseguradoras
DROP POLICY IF EXISTS "Users can insert aseguradoras" ON aseguradoras;
DROP POLICY IF EXISTS "Users can update aseguradoras" ON aseguradoras;

-- Create secure aseguradoras policies
CREATE POLICY "Admins can insert aseguradoras"
  ON aseguradoras FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin');

CREATE POLICY "Admins can update aseguradoras"
  ON aseguradoras FOR UPDATE
  TO authenticated
  USING ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin')
  WITH CHECK ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin');

-- Drop insecure policies on liquidaciones
DROP POLICY IF EXISTS "Users can insert liquidaciones" ON liquidaciones;
DROP POLICY IF EXISTS "Users can update liquidaciones" ON liquidaciones;
DROP POLICY IF EXISTS "Users can delete liquidaciones" ON liquidaciones;

-- Create secure liquidaciones policies
CREATE POLICY "Admins can insert liquidaciones"
  ON liquidaciones FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin');

CREATE POLICY "Admins can update liquidaciones"
  ON liquidaciones FOR UPDATE
  TO authenticated
  USING ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin')
  WITH CHECK ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin');

CREATE POLICY "Admins can delete liquidaciones"
  ON liquidaciones FOR DELETE
  TO authenticated
  USING ((SELECT cargo FROM usuarios WHERE id = auth.uid()) = 'Admin');
