-- =====================================================
-- CORREÇÃO RLS - WALLPAPERS (Permitir todos usuários)
-- Execute no SQL Editor do Supabase
-- =====================================================

-- Dropar políticas existentes
DROP POLICY IF EXISTS "Public can view active wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin can insert wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin can update wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin can delete wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin full access" ON public.wallpapers;

-- Policy: Todos podem ver wallpapers ativos
CREATE POLICY "Public can view active wallpapers" ON public.wallpapers
  FOR SELECT USING (is_active = true);

-- Policy: QUALQUER usuário logado pode criar
CREATE POLICY "Anyone can insert wallpapers" ON public.wallpapers
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Policy: QUALQUER usuário logado pode atualizar
CREATE POLICY "Anyone can update wallpapers" ON public.wallpapers
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Policy: QUALQUER usuário logado pode deletar
CREATE POLICY "Anyone can delete wallpapers" ON public.wallpapers
  FOR DELETE USING (auth.uid() IS NOT NULL);
