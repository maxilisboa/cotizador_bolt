CREATE TABLE IF NOT EXISTS public.vehiculos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  marca text NOT NULL,
  modelo text NOT NULL,
  ano integer,
  usuario_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.vehiculos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view vehiculos" ON public.vehiculos;
CREATE POLICY "Authenticated users can view vehiculos"
  ON public.vehiculos FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert vehiculos" ON public.vehiculos;
CREATE POLICY "Authenticated users can insert vehiculos"
  ON public.vehiculos FOR INSERT
  TO authenticated
  WITH CHECK (usuario_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own vehiculos" ON public.vehiculos;
CREATE POLICY "Users can delete own vehiculos"
  ON public.vehiculos FOR DELETE
  TO authenticated
  USING (usuario_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_vehiculos_marca_modelo ON public.vehiculos(marca, modelo);