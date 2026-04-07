-- ============================================================
-- Tabela de ALERTAS para o sistema de notificações
-- Execute este script no SQL Editor do Supabase
-- ============================================================

CREATE TABLE IF NOT EXISTS public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success')),
  is_read BOOLEAN DEFAULT false,
  link TEXT,
  user_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura alertas" ON public.alerts FOR SELECT USING (true);
CREATE POLICY "Permitir insert alertas" ON public.alerts FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir update alertas" ON public.alerts FOR UPDATE USING (true);
CREATE POLICY "Permitir delete alertas" ON public.alerts FOR DELETE USING (true);

-- Inserir alguns alertas de exemplo
INSERT INTO public.alerts (title, description, type, is_read) VALUES
  ('Bem-vindo ao Petmax!', 'Configure suas preferências no menu Configurações.', 'success', false),
  ('Tarefa pendente', 'Você tem tarefas pendentes para revisar.', 'warning', false),
  ('Nova funcionalidade', 'O módulo de relatórios agora está disponível.', 'info', false);
