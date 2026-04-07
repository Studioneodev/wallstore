-- ============================================================
-- Criar tabela TASKS completa
-- ============================================================

CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pendente',
    priority TEXT DEFAULT 'media',
    category TEXT,
    due_date DATE,
    completed_at TIMESTAMP WITH TIME ZONE,
    assigned_to TEXT,
    company_id UUID REFERENCES public.companies(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura tasks" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Permitir insert tasks" ON public.tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update tasks" ON public.tasks FOR UPDATE USING (true);
CREATE POLICY "Permitir delete tasks" ON public.tasks FOR DELETE USING (true);
