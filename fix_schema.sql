-- Script de unificación y corrección de esquema para SEOGrowthers
-- Ejecutar en el SQL Editor de Supabase

-- 1. Correcciones en blog_news
ALTER TABLE public.blog_news 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 2. Correcciones en resources
ALTER TABLE public.resources 
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Actualizar slugs para resources existentes basados en el título si es necesario
UPDATE public.resources SET slug = lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g')) WHERE slug IS NULL;

-- 3. Crear tabla tools si no existe
CREATE TABLE IF NOT EXISTS public.tools (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    link TEXT,
    category TEXT,
    icon TEXT,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS para tools
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tools_public_read" ON public.tools FOR SELECT USING (true);

-- 4. Ajustar RLS para artículos (Permitir inserción por administrador)
-- Primero eliminamos la política restrictiva si existe
DROP POLICY IF EXISTS "articles_author_all" ON articles;
-- Creamos una política más flexible para autores y administradores
CREATE POLICY "articles_admin_all" ON articles 
FOR ALL USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role IN ('admin', 'editor')
  )
) WITH CHECK (
  auth.uid() IN (
    SELECT id FROM profiles WHERE role IN ('admin', 'editor')
  )
);

-- Aseguramos que el autor original también pueda editar los suyos
CREATE POLICY "articles_author_manage" ON articles 
FOR ALL USING (auth.uid()::text = author_id::text);

-- 5. Importar datos de ejemplo para Tools si está vacía
INSERT INTO public.tools (title, description, link, category, icon)
SELECT 'Analizador de Títulos', 'Optimiza tus enlaces de título según Search Central', '/tools/title-analyzer', 'SEO', 'Layout'
WHERE NOT EXISTS (SELECT 1 FROM public.tools WHERE title = 'Analizador de Títulos');

INSERT INTO public.tools (title, description, link, category, icon)
SELECT 'Generador de Metadatos', 'Crea metadescripciones perfectas con IA', '/tools/metadata-generator', 'Content', 'FileText'
WHERE NOT EXISTS (SELECT 1 FROM public.tools WHERE title = 'Generador de Metadatos');
