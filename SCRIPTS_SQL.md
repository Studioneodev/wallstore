-- =====================================================
-- PETMAX - SCRIPTS SQL COMPLETOS
-- ERP+CRM com Inteligência Artificial
-- Atualizado: 07/04/2026
-- =====================================================

-- =====================================================
-- TABELA USERS (Autenticação)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  is_admin BOOLEAN DEFAULT false,
  company_id UUID,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- TABELA COMPANIES (Empresas)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  trade_name TEXT,
  cnpj TEXT UNIQUE,
  cpf TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'Brasil',
  plan TEXT DEFAULT 'free',
  is_active BOOLEAN DEFAULT true,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.companies DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- TABELA CONTACTS (CRM - Contatos/Clientes)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  company_name TEXT,
  position TEXT,
  source TEXT,
  status TEXT DEFAULT 'lead',
  pipeline_stage TEXT DEFAULT 'novo',
  value DECIMAL(10,2),
  notes TEXT,
  tags TEXT[],
  assigned_to UUID,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.contacts DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- TABELA TASKS (Tarefas/Projetos)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'media',
  status TEXT DEFAULT 'pendente',
  due_date DATE,
  category TEXT,
  project_id UUID,
  assigned_to UUID,
  company_id UUID,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.tasks DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- TABELA PROJECTS (Projetos)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'ativo',
  start_date DATE,
  end_date DATE,
  company_id UUID,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- TABELA RECEITAS (Financeiro)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.receitas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT,
  source TEXT,
  date DATE NOT NULL,
  received BOOLEAN DEFAULT false,
  paid_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.receitas DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- TABELA DESPESAS (Financeiro)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.despesas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT,
  supplier TEXT,
  date DATE NOT NULL,
  paid BOOLEAN DEFAULT false,
  paid_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.despesas DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- TABELA PLANS (Planos SaaS)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  interval TEXT DEFAULT 'month',
  features JSONB,
  limits JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.plans DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- TABELA SUBSCRIPTIONS (Assinaturas)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id),
  plan_id UUID REFERENCES public.plans(id),
  status TEXT DEFAULT 'active',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.subscriptions DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- TABELA CHAT_HISTORY (Histórico Chat IA)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  company_id UUID,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.chat_history DISABLE ROW LEVEL SECURITY;

-- =====================================================
-- STORAGE (Imagens/Documentos)
-- =====================================================
-- Criar bucket via Storage no dashboard do Supabase
-- Bucket name: petmax-files
-- Public bucket: SIM