-- ============================================================
-- Verificar e corrigir tabela TASKS
-- ============================================================

-- Ver as colunas atuais
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'tasks' AND table_schema = 'public';

-- Verificar se a tabela existe
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE  table_schema = 'public'
   AND    table_name = 'tasks'
);

-- Se existir, vamos dropar usando CASCADE para remover dependências
DROP TABLE IF EXISTS public.tasks CASCADE;
