-- ============================================================
-- Script para adicionar COLUNAS FALTANTES na tabela TASKS
-- Execute este script no SQL Editor do Supabase
-- ============================================================

-- Adicionar colunas faltantes na tabela tasks
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS title TEXT NOT NULL;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pendente';
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'media';
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS due_date DATE;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS assigned_to TEXT;
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.companies(id);
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS contact_id UUID REFERENCES public.contacts(id);
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ============================================================
-- Verificar colunas da tabela tasks
-- ============================================================
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'tasks' 
ORDER BY ordinal_position;

-- ============================================================
-- FIM DO SCRIPT
-- ============================================================
