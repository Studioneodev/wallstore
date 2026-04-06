-- =====================================================
-- WALLSTORE - SCRIPTS SQL COMPLETOS
-- Atualizado: 06/04/2026
-- =====================================================

-- =====================================================
-- TABELA USERS (Autenticação)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all" ON public.users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Users can insert own data" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can update all" ON public.users
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = true)
  );

-- Trigger para criar usuário automático
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, is_admin)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name', false);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- TABELA WALLPAPERS (CRUD)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.wallpapers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  image_path TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

ALTER TABLE public.wallpapers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active wallpapers" ON public.wallpapers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admin can insert wallpapers" ON public.wallpapers
  FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM public.users WHERE is_admin = true));

CREATE POLICY "Admin can update wallpapers" ON public.wallpapers
  FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.users WHERE is_admin = true));

CREATE POLICY "Admin can delete wallpapers" ON public.wallpapers
  FOR DELETE USING (auth.uid() IN (SELECT id FROM public.users WHERE is_admin = true));

-- =====================================================
-- TABELA ORDERS (Pedidos - Fase 7)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  items JSONB,
  pix_qr_code TEXT,
  pix_key TEXT,
  payment_proof TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all orders" ON public.orders
  FOR SELECT USING (auth.uid() IN (SELECT id FROM public.users WHERE is_admin = true));

CREATE POLICY "Users can create orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can update orders" ON public.orders
  FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.users WHERE is_admin = true));

-- =====================================================
-- STORAGE (Imagens)
-- =====================================================
-- Criar bucket via Storage no dashboard do Supabase
-- Bucket name: wallpapers
-- Public bucket: SIM
