-- ============================================================
-- Script de Atualização das Tabelas no Supabase
-- Execute este script para atualizar as tabelas existentes
-- ============================================================

-- ============================================================
-- 1. Verificar e adicionar colunas na tabela CONTACTS
-- ============================================================

-- Adicionar coluna pipeline_stage se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'pipeline_stage') THEN
        ALTER TABLE public.contacts ADD COLUMN pipeline_stage TEXT DEFAULT 'novo';
    END IF;
END $$;

-- Adicionar coluna source se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'source') THEN
        ALTER TABLE public.contacts ADD COLUMN source TEXT;
    END IF;
END $$;

-- Adicionar coluna value se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'value') THEN
        ALTER TABLE public.contacts ADD COLUMN value DECIMAL(12,2);
    END IF;
END $$;

-- Adicionar coluna company_id se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'company_id') THEN
        ALTER TABLE public.contacts ADD COLUMN company_id UUID REFERENCES public.companies(id);
    END IF;
END $$;

-- Adicionar coluna position se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contacts' AND column_name = 'position') THEN
        ALTER TABLE public.contacts ADD COLUMN position TEXT;
    END IF;
END $$;

-- ============================================================
-- 2. Verificar e adicionar colunas na tabela TASKS
-- ============================================================

-- Adicionar coluna assigned_to se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'assigned_to') THEN
        ALTER TABLE public.tasks ADD COLUMN assigned_to TEXT;
    END IF;
END $$;

-- Adicionar coluna company_id se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tasks' AND column_name = 'company_id') THEN
        ALTER TABLE public.tasks ADD COLUMN company_id UUID REFERENCES public.companies(id);
    END IF;
END $$;

-- ============================================================
-- 3. Verificar e adicionar colunas na tabela RECEITAS
-- ============================================================

-- Adicionar coluna source se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'receitas' AND column_name = 'source') THEN
        ALTER TABLE public.receitas ADD COLUMN source TEXT;
    END IF;
END $$;

-- Adicionar coluna received se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'receitas' AND column_name = 'received') THEN
        ALTER TABLE public.receitas ADD COLUMN received BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Adicionar coluna company_id se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'receitas' AND column_name = 'company_id') THEN
        ALTER TABLE public.receitas ADD COLUMN company_id UUID REFERENCES public.companies(id);
    END IF;
END $$;

-- ============================================================
-- 4. Verificar e adicionar colunas na tabela DESPESAS
-- ============================================================

-- Adicionar coluna supplier se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'despesas' AND column_name = 'supplier') THEN
        ALTER TABLE public.despesas ADD COLUMN supplier TEXT;
    END IF;
END $$;

-- Adicionar coluna paid se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'despesas' AND column_name = 'paid') THEN
        ALTER TABLE public.despesas ADD COLUMN paid BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Adicionar coluna company_id se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'despesas' AND column_name = 'company_id') THEN
        ALTER TABLE public.despesas ADD COLUMN company_id UUID REFERENCES public.companies(id);
    END IF;
END $$;

-- ============================================================
-- 5. Verificar e adicionar colunas na tabela COMPANIES
-- ============================================================

-- Adicionar coluna is_active se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'companies' AND column_name = 'is_active') THEN
        ALTER TABLE public.companies ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
END $$;

-- ============================================================
-- VERIFICAR COLADAS ADICIONADAS
-- ============================================================
SELECT 'contacts' as tabela, column_name 
FROM information_schema.columns 
WHERE table_name = 'contacts' 
ORDER BY ordinal_position;

SELECT 'tasks' as tabela, column_name 
FROM information_schema.columns 
WHERE table_name = 'tasks' 
ORDER BY ordinal_position;

SELECT 'receitas' as tabela, column_name 
FROM information_schema.columns 
WHERE table_name = 'receitas' 
ORDER BY ordinal_position;

SELECT 'despesas' as tabela, column_name 
FROM information_schema.columns 
WHERE table_name = 'despesas' 
ORDER BY ordinal_position;

-- ============================================================
-- FIM DO SCRIPT
-- ============================================================
