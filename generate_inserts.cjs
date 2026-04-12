const fs = require('fs');
const path = require('path');

async function main() {
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

  function escapeSql(str) {
    return str.replace(/'/g, "''");
  }

  let sql = "-- INSERT BLOG NEWS\\n";
  
  for (const art of files) {
    const filePath = path.join(articlesDir, art.file);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    const cleanContent = content.replace(/^---[\\s\\S]*?---/, '').trim();

    sql += "INSERT INTO blog_news (title, slug, excerpt, content, featured_image, category, status, reading_time, published_at, views) \\n";
    sql += "VALUES ('" + escapeSql(art.title) + "', '" + art.slug + "', '" + escapeSql(art.excerpt) + "', '" + escapeSql(cleanContent) + "', '" + art.featured_image + "', '" + art.category + "', 'published', " + Math.ceil(cleanContent.split(' ').length / 200) + ", '" + new Date().toISOString() + "', 0) \\n";
    sql += "ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, excerpt=EXCLUDED.excerpt, content=EXCLUDED.content, featured_image=EXCLUDED.featured_image, category=EXCLUDED.category, status=EXCLUDED.status;\\n\\n";
  }

  fs.writeFileSync('new_articles.sql', sql);
  console.log('SQL File new_articles.sql generated.');
}

main();
