-- =====================================================
-- CORREÇÃO FINAL - DESABILITAR RLS TOTALMENTE
-- Execute no SQL Editor do Supabase
-- =====================================================

-- Desabilitar RLS completamente
ALTER TABLE public.wallpapers DISABLE ROW LEVEL SECURITY;

-- Verificar status
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'wallpapers';
