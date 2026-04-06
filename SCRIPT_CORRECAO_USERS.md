-- =====================================================
-- CORREÇÃO EMERGENCIAL - TABELA USERS
-- Execute no SQL Editor do Supabase
-- =====================================================

-- Verificar se a tabela existe
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'users'
);

-- Se não existir, criar
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Limpar políticas antigas
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
DROP POLICY IF EXISTS "Admins can view all" ON public.users;
DROP POLICY IF EXISTS "Users can insert own data" ON public.users;
DROP POLICY IF EXISTS "Admins can update all" ON public.users;

-- Criar políticas simples
CREATE POLICY "Allow all select" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow all insert" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.users FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON public.users FOR DELETE USING (true);

-- =====================================================
-- Verificar usuários existentes
-- =====================================================
SELECT id, email, is_admin FROM public.users LIMIT 10;

-- =====================================================
-- Garantir que seu email seja admin
-- =====================================================
UPDATE public.users 
SET is_admin = true 
WHERE email = 'atendimento.nossoamigao@gmail.com';
