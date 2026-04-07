-- Tabela calendar_events para o Calendário
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  color TEXT DEFAULT '#6366f1',
  type TEXT DEFAULT 'event',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE public.calendar_events DISABLE ROW LEVEL SECURITY;

-- Inserir tabela calendar_events se não existir (retry)
-- Se der erro de duplicata, ignore