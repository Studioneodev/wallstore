-- =====================================================
-- CORREÇÃO POLÍTICAS RLS - WALLPAPERS (APENAS ADMIN)
-- Execute no SQL Editor do Supabase
-- =====================================================

-- Dropar políticas existentes
DROP POLICY IF EXISTS "Public can view active wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin can insert wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin can update wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin can delete wallpapers" ON public.wallpapers;

-- Policy: TODOS podem ver wallpapers ativos
CREATE POLICY "Public can view active wallpapers" ON public.wallpapers
  FOR SELECT USING (is_active = true);

-- Policy: APENAS ADMIN pode criar wallpapers
CREATE POLICY "Admin can insert wallpapers" ON public.wallpapers
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Policy: APENAS ADMIN pode atualizar
CREATE POLICY "Admin can update wallpapers" ON public.wallpapers
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Policy: APENAS ADMIN pode deletar
CREATE POLICY "Admin can delete wallpapers" ON public.wallpapers
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- =====================================================
-- IMPORTANTE: Seu usuário precisa ter is_admin = true
-- na tabela public.users
-- =====================================================
