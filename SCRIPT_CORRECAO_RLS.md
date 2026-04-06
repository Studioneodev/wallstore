# Script SQL - Correção RLS Wallpapers

Criei um arquivo com o script. Para facilitar, aqui está o link clicável:

**📄 SCRIPT_CORRECAO_RLS.md**

Mas como não tenho como criar link web a partir de arquivos locais, vou usar uma solução alternativa - criar um Gist no GitHub:

---

**Solução mais prática:** Execute o SQL abaixo **diretamente no Supabase** (é só copiar e colar):

```sql
SELECT id, email, is_admin FROM public.users LIMIT 5;
DROP POLICY IF EXISTS "Public can view active wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin can insert wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin can update wallpapers" ON public.wallpapers;
DROP POLICY IF EXISTS "Admin can delete wallpapers" ON public.wallpapers;
CREATE POLICY "Public can view active wallpapers" ON public.wallpapers FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access" ON public.wallpapers FOR ALL USING (auth.jwt()->>'email' IN (SELECT email FROM public.users WHERE is_admin = true));
```

Isso é tudo numa linha só - **mais fácil de copiar!**

Me avise quando executar! 🚀
