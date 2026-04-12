const fs = require('fs');

function extractHtml(raw) {
  const startStr = '"answer":"';
  const endStr = '","conversation_id"';
  const startIndex = raw.indexOf(startStr);
  const endIndex = raw.lastIndexOf(endStr);
  if (startIndex === -1 || endIndex === -1) return "Error";
  let content = raw.substring(startIndex + startStr.length, endIndex);
  return content.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}

function escapeSql(str) {
  return str.replace(/'/g, "''");
}

function main() {
  const p1 = extractHtml(fs.readFileSync('mcp_pillar.txt', 'utf8'));
  const s1 = extractHtml(fs.readFileSync('mcp_satellite1.txt', 'utf8'));
  const s2 = extractHtml(fs.readFileSync('mcp_satellite2.txt', 'utf8'));

  const newsData = [
    {
      title: "La Guía Definitiva de Fundamentos SEO y Directrices de Google Search Central para 2026",
      slug: "guia-definitiva-fundamentos-seo-2026",
      excerpt: "Conquista los resultados de búsqueda: domina los enlaces de título, metadescripciones, datos estructurados y el rastreo de imágenes según las últimas directrices.",
      content: p1,
      featured_image: "/images/seo_pillar.png",
      category: "Desarrollo Web",
      status: "published",
      reading_time: 8
    },
    {
      title: "Cómo optimizar tu Core Web Vitals paso a paso",
      slug: "optimizar-core-web-vitals-paso-a-paso",
      excerpt: "Descubre cómo analizar el rendimiento de tu sitio, optimizar imágenes y gestionar la carga diferida para superar los Core Web Vitals de Google.",
      content: s1,
      featured_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      category: "Desarrollo Web",
      status: "published",
      reading_time: 4
    },
    {
      title: "El Mapa del Tesoro Visual: SEO Extremo para Imágenes",
      slug: "mapa-tesoro-visual-seo-extremo-imagenes",
      excerpt: "Técnicas avanzadas para posicionar tus imágenes: Sitemaps visuales, formatos Next-Gen, y metadatos estructurados para destacar en Google Images.",
      content: s2,
      featured_image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800",
      category: "Desarrollo Web",
      status: "published",
      reading_time: 5
    }
  ];

  let sql = `-- INSERT BLOG NEWS\n`;
  for (const n of newsData) {
    sql += `INSERT INTO blog_news (title, slug, excerpt, content, featured_image, category, status, reading_time, published_at, views) \n`;
    sql += `VALUES ('${escapeSql(n.title)}', '${n.slug}', '${escapeSql(n.excerpt)}', '${escapeSql(n.content)}', '${n.featured_image}', '${n.category}', '${n.status}', ${n.reading_time}, NOW(), 0);\n\n`;
  }

  const resourcesData = [
    {
      title: "Guía Maestra: Nomenclatura y URLs para SEO",
      description: "Prácticas recomendadas y errores comunes al nombrar páginas y URLs según Google Search Central.",
      category: "GUÍAS",
      link: "/guides/nomenclatura-urls-seo.html",
      file_type: "HTML",
      file_size: "12 KB",
      status: "published"
    },
    {
      title: "Guía Maestra: Metadatos y Fragmentos de Búsqueda",
      description: "Prácticas en HTML puro para optimizar etiquetas title, metadescripciones y directivas de control de fragmentos.",
      category: "GUÍAS",
      link: "/guides/metadatos-fragmentos.html",
      file_type: "HTML",
      file_size: "15 KB",
      status: "published"
    },
    {
      title: "Guía Maestra: Optimización de Imágenes para Google",
      description: "Adaptabilidad, formatos modernos y estrategias de SEO visual basándose en directrices de descubrimiento.",
      category: "GUÍAS",
      link: "/guides/optimizacion-imagenes-seo.html",
      file_type: "HTML",
      file_size: "18 KB",
      status: "published"
    }
  ];

  sql += `-- INSERT RESOURCES\n`;
  for (const r of resourcesData) {
    sql += `INSERT INTO resources (title, description, category, link, file_type, file_size, status, published_at) \n`;
    sql += `VALUES ('${escapeSql(r.title)}', '${escapeSql(r.description)}', '${r.category}', '${r.link}', '${r.file_type}', '${r.file_size}', '${r.status}', NOW());\n\n`;
  }

  fs.writeFileSync('import_data.sql', sql);
  console.log('SQL File import_data.sql generated.');
}

main();
