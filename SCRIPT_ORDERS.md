-- =====================================================
-- EXECUTAR NO SUPABASE SQL EDITOR
-- Data: 06/04/2026
-- =====================================================

-- =====================================================
-- TABELA ORDERS (Criar se não existir)
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

-- Habilitar RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all orders" ON public.orders
  FOR SELECT USING (auth.uid() IN (SELECT id FROM public.users WHERE is_admin = true));

CREATE POLICY "Users can create orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admin can update orders" ON public.orders
  FOR UPDATE USING (auth.uid() IN (SELECT id FROM public.users WHERE is_admin = true));

-- =====================================================
-- FIM - Clique em RUN para executar
-- =====================================================
