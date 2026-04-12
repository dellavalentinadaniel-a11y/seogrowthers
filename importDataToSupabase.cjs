const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://kejitvcoalooiwbcwelt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlaml0dmNvYWxvb2l3YmN3ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4OTU3MzgsImV4cCI6MjA4MjQ3MTczOH0.FSoSs5Kpm48MVo1gziNlm_BiULhzJ1DN-fhSOMPSzmc';
const supabase = createClient(supabaseUrl, supabaseKey);

function extractHtml(raw) {
  const startStr = '"answer":"';
  const endStr = '","conversation_id"';
  const startIndex = raw.indexOf(startStr);
  const endIndex = raw.lastIndexOf(endStr);
  if (startIndex === -1 || endIndex === -1) return "Error";
  let content = raw.substring(startIndex + startStr.length, endIndex);
  
  return content.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}

async function main() {
  // Login to bypass RLS
  console.log("Logging in as admin...");
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'admin@agency.com',
    password: 'admin123'
  });

  if (authError) {
    console.error("Login failed:", authError.message);
    return;
  }
  console.log("Logged in successfully.");

  const p1 = fs.readFileSync('mcp_pillar.txt', 'utf8');
  const s1 = fs.readFileSync('mcp_satellite1.txt', 'utf8');
  const s2 = fs.readFileSync('mcp_satellite2.txt', 'utf8');

  const newsData = [
    {
      title: "La Guía Definitiva de Fundamentos SEO y Directrices de Google Search Central para 2026",
      slug: "guia-definitiva-fundamentos-seo-2026",
      excerpt: "Conquista los resultados de búsqueda: domina los enlaces de título, metadescripciones, datos estructurados y el rastreo de imágenes según las últimas directrices.",
      content: extractHtml(p1),
      featured_image: "/images/seo_pillar.png",
      category: "Desarrollo Web",
      status: "published",
      reading_time: 8,
      published_at: new Date().toISOString(),
      views: 0
    },
    {
      title: "Cómo optimizar tu Core Web Vitals paso a paso",
      slug: "optimizar-core-web-vitals-paso-a-paso",
      excerpt: "Descubre cómo analizar el rendimiento de tu sitio, optimizar imágenes y gestionar la carga diferida para superar los Core Web Vitals de Google.",
      content: extractHtml(s1),
      featured_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      category: "Desarrollo Web",
      status: "published",
      reading_time: 4,
      published_at: new Date().toISOString(),
      views: 0
    },
    {
      title: "El Mapa del Tesoro Visual: SEO Extremo para Imágenes",
      slug: "mapa-tesoro-visual-seo-extremo-imagenes",
      excerpt: "Técnicas avanzadas para posicionar tus imágenes: Sitemaps visuales, formatos Next-Gen, y metadatos estructurados para destacar en Google Images.",
      content: extractHtml(s2),
      featured_image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800",
      category: "Desarrollo Web",
      status: "published",
      reading_time: 5,
      published_at: new Date().toISOString(),
      views: 0
    }
  ];

  console.log("Inserting news...");
  for (const n of newsData) {
    const { data: existing } = await supabase.from('blog_news').select('id').eq('slug', n.slug);
    if (existing && existing.length > 0) {
       console.log("News already exists, skipping:", n.title);
       continue;
    }
    const { error } = await supabase.from('blog_news').insert(n);
    if (error) console.error("Error inserting news:", error);
    else console.log("Inserted news:", n.title);
  }

  const g1 = fs.readFileSync('mcp_guide_urls.txt', 'utf8');
  const g2 = fs.readFileSync('mcp_guide_metadata.txt', 'utf8');
  const g3 = fs.readFileSync('mcp_guide_images.txt', 'utf8');

  if (!fs.existsSync('public/guides')) fs.mkdirSync('public/guides');

  let template = (content, title) => `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #fff; background-color: #0C0D0D; max-width: 900px; margin: 0 auto; padding: 40px 20px; }
h1 { color: #22d3ee; border-bottom: 1px solid #1e293b; padding-bottom: 10px; }
h2 { color: #e2e8f0; margin-top: 2rem; }
h3 { color: #cbd5e1; }
a { color: #22d3ee; }
a:hover { color: #67e8f9; }
ul, ol { padding-left: 20px; }
li { margin-bottom: 10px; }
strong { color: #f8fafc; }
code { background: #1e293b; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
</style>
</head>
<body>
${content}
</body>
</html>`;

  fs.writeFileSync('public/guides/nomenclatura-urls-seo.html', template(extractHtml(g1), "Nomenclatura y URLs para SEO"));
  fs.writeFileSync('public/guides/metadatos-fragmentos.html', template(extractHtml(g2), "Metadatos y Fragmentos"));
  fs.writeFileSync('public/guides/optimizacion-imagenes-seo.html', template(extractHtml(g3), "Optimización de Imágenes"));

  const resourcesData = [
    {
      title: "Guía Maestra: Nomenclatura y URLs para SEO",
      description: "Prácticas recomendadas y errores comunes al nombrar páginas y URLs según Google Search Central.",
      category: "GUÍAS",
      link: "/guides/nomenclatura-urls-seo.html",
      file_type: "HTML",
      file_size: "12 KB",
      status: "published",
      published_at: new Date().toISOString()
    },
    {
      title: "Guía Maestra: Metadatos y Fragmentos de Búsqueda",
      description: "Prácticas en HTML puro para optimizar etiquetas title, metadescripciones y directivas de control de fragmentos.",
      category: "GUÍAS",
      link: "/guides/metadatos-fragmentos.html",
      file_type: "HTML",
      file_size: "15 KB",
      status: "published",
      published_at: new Date().toISOString()
    },
    {
      title: "Guía Maestra: Optimización de Imágenes para Google",
      description: "Adaptabilidad, formatos modernos y estrategias de SEO visual basándose en directrices de descubrimiento.",
      category: "GUÍAS",
      link: "/guides/optimizacion-imagenes-seo.html",
      file_type: "HTML",
      file_size: "18 KB",
      status: "published",
      published_at: new Date().toISOString()
    }
  ];

  console.log("Inserting resources...");
  for (const r of resourcesData) {
     const { data: existing } = await supabase.from('resources').select('id').eq('title', r.title);
     if (existing && existing.length > 0) {
       console.log("Resource already exists, skipping:", r.title);
       continue;
    }
    const { error } = await supabase.from('resources').insert(r);
    if (error) console.error("Error inserting resource:", error);
    else console.log("Inserted resource:", r.title);
  }

  console.log("Data inserted successfully.");
}

main();
