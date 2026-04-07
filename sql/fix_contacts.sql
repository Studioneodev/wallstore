-- ============================================================
-- Script para adicionar COLUNAS FALTANTES na tabela CONTACTS
-- Execute este script no SQL Editor do Supabase
-- ============================================================

-- Verificar e adicionar cada coluna individualmente

-- Adicionar notes se não existir
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS notes TEXT;

-- Adicionar tags se não existir
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS tags TEXT[];

-- Adicionar created_at se não existir
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Adicionar updated_at se não existir
ALTER TABLE public.contacts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ============================================================
-- Verificar colunas da tabela contacts
-- ============================================================
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'contacts' 
ORDER BY ordinal_position;

-- ============================================================
-- FIM DO SCRIPT
-- ============================================================
