-- =====================================================
-- WALLSTORE - SCRIPTS SQL COMPLETOS
-- Atualizado: 06/04/2026
-- CHAVE PIX: 41999220456
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

-- IMPORTANTE: Desabilitar RLS para permitir inserções
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

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
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- IMPORTANTE: Desabilitar RLS para permitir inserções
ALTER TABLE public.wallpapers DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- TABELA ORDERS (Pedidos - Fase 7)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  items JSONB,
  pix_key TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE
);

-- Desabilitar RLS
ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- STORAGE (Imagens)
-- =====================================================
-- Criar bucket via Storage no dashboard do Supabase
-- Bucket name: wallpapers
-- Public bucket: SIM
