/*
  # Remove Insecure Vendedores Policies

  1. Summary
    - Remove old insecure "Users can insert vendedores" policy (WITH CHECK = true)
    - Remove old insecure "Users can update vendedores" policy (USING = true, WITH CHECK = true)
    - Remove overly permissive "Users can view vendedores" policy (USING = true)
    - Keep secure admin-only and non-admin filtered policies

  2. Security Impact
    - Prevents unrestricted INSERT access to authenticated users
    - Prevents unrestricted UPDATE access to authenticated users
    - Enforces admin-only modifications via existing secure policies
*/

DROP POLICY IF EXISTS "Users can insert vendedores" ON vendedores;
DROP POLICY IF EXISTS "Users can update vendedores" ON vendedores;
DROP POLICY IF EXISTS "Users can view vendedores" ON vendedores;
