-- ============================================================
-- PETMAX - Script de Criação das Tabelas no Supabase
-- Execute este script no SQL Editor do Supabase
-- ============================================================

-- ============================================================
-- 1. TABELA COMPANIES (Empresas)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  cnpj TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  segment TEXT,
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para companies
DROP POLICY IF EXISTS "Permitir leitura companies" ON public.companies;
DROP POLICY IF EXISTS "Permitir insert companies" ON public.companies;
DROP POLICY IF EXISTS "Permitir update companies" ON public.companies;
DROP POLICY IF EXISTS "Permitir delete companies" ON public.companies;

CREATE POLICY "Permitir leitura companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Permitir insert companies" ON public.companies FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update companies" ON public.companies FOR UPDATE USING (true);
CREATE POLICY "Permitir delete companies" ON public.companies FOR DELETE USING (true);


-- ============================================================
-- 2. TABELA CONTACTS (CRM - Contatos/Clientes)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company_id UUID REFERENCES public.companies(id),
  position TEXT,
  status TEXT DEFAULT 'lead' CHECK (status IN ('lead', 'cliente', 'inativo')),
  pipeline_stage TEXT DEFAULT 'novo' CHECK (pipeline_stage IN ('novo', 'qualificado', 'proposta', 'negociacao', 'ganho', 'perdido')),
  source TEXT,
  value DECIMAL(12,2),
  notes TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para contacts
DROP POLICY IF EXISTS "Permitir leitura contacts" ON public.contacts;
DROP POLICY IF EXISTS "Permitir insert contacts" ON public.contacts;
DROP POLICY IF EXISTS "Permitir update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Permitir delete contacts" ON public.contacts;

CREATE POLICY "Permitir leitura contacts" ON public.contacts FOR SELECT USING (true);
CREATE POLICY "Permitir insert contacts" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update contacts" ON public.contacts FOR UPDATE USING (true);
CREATE POLICY "Permitir delete contacts" ON public.contacts FOR DELETE USING (true);


-- ============================================================
-- 3. TABELA TASKS (Tarefas/Projetos)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_progresso', 'concluida', 'cancelada')),
  priority TEXT DEFAULT 'media' CHECK (priority IN ('baixa', 'media', 'alta', 'urgente')),
  category TEXT,
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  assigned_to TEXT,
  company_id UUID REFERENCES public.companies(id),
  contact_id UUID REFERENCES public.contacts(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilrar RLS
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para tasks
DROP POLICY IF EXISTS "Permitir leitura tasks" ON public.tasks;
DROP POLICY IF EXISTS "Permitir insert tasks" ON public.tasks;
DROP POLICY IF EXISTS "Permitir update tasks" ON public.tasks;
DROP POLICY IF EXISTS "Permitir delete tasks" ON public.tasks;

CREATE POLICY "Permitir leitura tasks" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Permitir insert tasks" ON public.tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update tasks" ON public.tasks FOR UPDATE USING (true);
CREATE POLICY "Permitir delete tasks" ON public.tasks FOR DELETE USING (true);


-- ============================================================
-- 4. TABELA RECEITAS (Entradas Financeiras)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.receitas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  category TEXT,
  subcategory TEXT,
  payment_method TEXT,
  date DATE NOT NULL,
  company_id UUID REFERENCES public.companies(id),
  contact_id UUID REFERENCES public.contacts(id),
  notes TEXT,
  is_recurring BOOLEAN DEFAULT false,
  recurring_frequency TEXT,
  received BOOLEAN DEFAULT false,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilrar RLS
ALTER TABLE public.receitas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para receitas
DROP POLICY IF EXISTS "Permitir leitura receitas" ON public.receitas;
DROP POLICY IF EXISTS "Permitir insert receitas" ON public.receitas;
DROP POLICY IF EXISTS "Permitir update receitas" ON public.receitas;
DROP POLICY IF EXISTS "Permitir delete receitas" ON public.receitas;

CREATE POLICY "Permitir leitura receitas" ON public.receitas FOR SELECT USING (true);
CREATE POLICY "Permitir insert receitas" ON public.receitas FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update receitas" ON public.receitas FOR UPDATE USING (true);
CREATE POLICY "Permitir delete receitas" ON public.receitas FOR DELETE USING (true);


-- ============================================================
-- 5. TABELA DESPESAS (Saídas Financeiras)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.despesas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  category TEXT,
  subcategory TEXT,
  payment_method TEXT,
  date DATE NOT NULL,
  company_id UUID REFERENCES public.companies(id),
  notes TEXT,
  is_recurring BOOLEAN DEFAULT false,
  recurring_frequency TEXT,
  paid BOOLEAN DEFAULT false,
  supplier TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilrar RLS
ALTER TABLE public.despesas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para despesas
DROP POLICY IF EXISTS "Permitir leitura despesas" ON public.despesas;
DROP POLICY IF EXISTS "Permitir insert despesas" ON public.despesas;
DROP POLICY IF EXISTS "Permitir update despesas" ON public.despesas;
DROP POLICY IF EXISTS "Permitir delete despesas" ON public.despesas;

CREATE POLICY "Permitir leitura despesas" ON public.despesas FOR SELECT USING (true);
CREATE POLICY "Permitir insert despesas" ON public.despesas FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update despesas" ON public.despesas FOR UPDATE USING (true);
CREATE POLICY "Permitir delete despesas" ON public.despesas FOR DELETE USING (true);


-- ============================================================
-- 6. TABELA CALENDAR_EVENTS (Eventos do Calendário)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME,
  end_time TIME,
  color TEXT DEFAULT '#6366f1',
  type TEXT DEFAULT 'event',
  all_day BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilrar RLS
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para calendar_events
DROP POLICY IF EXISTS "Permitir leitura calendar_events" ON public.calendar_events;
DROP POLICY IF EXISTS "Permitir insert calendar_events" ON public.calendar_events;
DROP POLICY IF EXISTS "Permitir update calendar_events" ON public.calendar_events;
DROP POLICY IF EXISTS "Permitir delete calendar_events" ON public.calendar_events;

CREATE POLICY "Permitir leitura calendar_events" ON public.calendar_events FOR SELECT USING (true);
CREATE POLICY "Permitir insert calendar_events" ON public.calendar_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update calendar_events" ON public.calendar_events FOR UPDATE USING (true);
CREATE POLICY "Permitir delete calendar_events" ON public.calendar_events FOR DELETE USING (true);


-- ============================================================
-- 7. ÍNDICES PARA OTIMIZAÇÃO
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_pipeline ON public.contacts(pipeline_stage);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON public.tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_receitas_date ON public.receitas(date);
CREATE INDEX IF NOT EXISTS idx_despesas_date ON public.despesas(date);
CREATE INDEX IF NOT EXISTS idx_calendar_start ON public.calendar_events(start_date);

-- ============================================================
-- VERIFICAR CRIAÇÃO DAS TABELAS
-- ============================================================
SELECT 
  'companies' as tabela,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'companies') as existe
UNION ALL
SELECT 
  'contacts',
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'contacts')
UNION ALL
SELECT 
  'tasks',
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'tasks')
UNION ALL
SELECT 
  'receitas',
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'receitas')
UNION ALL
SELECT 
  'despesas',
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'despesas')
UNION ALL
SELECT 
  'calendar_events',
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_name = 'calendar_events');

-- ============================================================
-- FIM DO SCRIPT
-- ============================================================
