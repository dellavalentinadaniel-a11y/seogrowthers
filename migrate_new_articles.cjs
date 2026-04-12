const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://kejitvcoalooiwbcwelt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlaml0dmNvYWxvb2l3YmN3ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4OTU3MzgsImV4cCI6MjA4MjQ3MTczOH0.FSoSs5Kpm48MVo1gziNlm_BiULhzJ1DN-fhSOMPSzmc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  // Login removed, using anon key with temporary RLS policies

  const articlesDir = path.join(__dirname, 'src', 'content');
  const files = [
    {
      file: 'guia-auditoria-web-seo-seguridad.md',
      title: 'Guía Definitiva para Auditar tu Sitio Web: SEO, Seguridad y Rendimiento 🚀',
      slug: 'guia-auditoria-web-seo-seguridad',
      excerpt: 'Aprende paso a paso cómo realizar una auditoría web completa. Mejora tu SEO, seguridad, rendimiento y descubre cómo la IA facilita este proceso.',
      category: 'SEO & Marketing',
      featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    },
    {
      file: 'como-optimizar-core-web-vitals.md',
      title: 'Cómo Optimizar tus Core Web Vitals Paso a Paso (Guía 2026)',
      slug: 'como-optimizar-core-web-vitals',
      excerpt: 'Aprende qué son LCP, INP y CLS, cuáles son los umbrales de Google y cómo mejorar tus Core Web Vitals paso a paso.',
      category: 'Desarrollo Web',
      featured_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
    },
    {
      file: 'errores-indexacion-google-search-console.md',
      title: 'Errores Comunes de Indexación en Google Search Console y Cómo Resolverlos',
      slug: 'errores-indexacion-google-search-console',
      excerpt: 'Aprende qué es el Crawl Budget, qué significan los errores "Discovered not indexed" y cómo resolverlos.',
      category: 'SEO & Marketing',
      featured_image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=800'
    },
    {
      file: 'importancia-enlazado-interno-seo.md',
      title: 'La Importancia del Enlazado Interno Según Google Search Central',
      slug: 'importancia-enlazado-interno-seo',
      excerpt: 'Descubre cómo usar la estrategia de Topic Clusters y distribuir el PageRank interno para mejorar tu indexación.',
      category: 'SEO & Marketing',
      featured_image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=800'
    }
  ];

  for (const art of files) {
    const filePath = path.join(articlesDir, art.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    
    // Remove frontmatter if present (basic regex)
    const cleanContent = content.replace(/^---[\s\S]*?---/, '').trim();

    const newsItem = {
      title: art.title,
      slug: art.slug,
      excerpt: art.excerpt,
      content: cleanContent,
      featured_image: art.featured_image,
      category: art.category,
      status: 'published',
      reading_time: Math.ceil(cleanContent.split(' ').length / 200),
      published_at: new Date().toISOString(),
      views: 0
    };

    console.log(`Inserting: ${art.title}...`);
    const { data: existing } = await supabase.from('blog_news').select('id').eq('slug', art.slug);
    
    if (existing && existing.length > 0) {
      console.log(`Updating existing article: ${art.title}`);
      const { error } = await supabase.from('blog_news').update(newsItem).eq('slug', art.slug);
      if (error) console.error("Error updating:", error);
    } else {
      const { error } = await supabase.from('blog_news').insert(newsItem);
      if (error) console.error("Error inserting:", error);
      else console.log("Inserted successfully!");
    }
  }

  console.log("Migration finished.");
}

main();
