-- =====================================================
-- CORREÇÃO TOTAL RLS - WALLPAPERS
-- Execute no SQL Editor do Supabase - TODAS as políticas
-- =====================================================

-- Dropar TODAS as políticas
DROP POLICY IF EXISTS "Public can view active wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin can insert wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin can update wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin can delete wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin full access" ON public.wallpapers;
DROP POLICY IF EXISTS "Anyone can insert wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Anyone can update wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Anyone can delete wallpapers" ON public.wallpapers;

-- Policy: Todos podem ver
CREATE POLICY "view_wallpapers" ON public.wallpapers FOR SELECT USING (true);

-- Policy: Todos podem criar (SEM VERIFICAÇÃO)
CREATE POLICY "insert_wallpapers" ON public.wallpapers FOR INSERT WITH CHECK (true);

-- Policy: Todos podem atualizar
CREATE POLICY "update_wallpapers" ON public.wallpapers FOR UPDATE USING (true);

-- Policy: Todos podem deletar
CREATE POLICY "delete_wallpapers" ON public.wallpapers FOR DELETE USING (true);

-- Verificar políticas criadas
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'wallpapers';
