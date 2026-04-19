const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('https://kejitvcoalooiwbcwelt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlaml0dmNvYWxvb2l3YmN3ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4OTU3MzgsImV4cCI6MjA4MjQ3MTczOH0.FSoSs5Kpm48MVo1gziNlm_BiULhzJ1DN-fhSOMPSzmc');

const updates = [
  { 
    id: 20, 
    image: '/images/blog/marketing-ai-2026.png',
    meta_title: 'Plan Estratégico AI 2026 | SEO Growthers',
    meta_description: 'Descubre cómo liderar el marketing del futuro con nuestro plan estratégico de IA para 2026. Estrategias predictivas y automatización.'
  },
  { 
    id: 11, 
    image: '/images/blog/ps5-pro-future.png',
    meta_title: 'El Futuro de PlayStation: Rumores PS5 Pro | Blog',
    meta_description: 'Todo lo que sabemos sobre la PS5 Pro: especificaciones técnicas, fecha de lanzamiento y el futuro de Sony en el gaming.'
  },
  { 
    id: 23, 
    image: '/images/blog/privacy-no-cookies.png',
    meta_title: 'El Fin de las Cookies en 2026: Guía de Privacidad',
    meta_description: 'Prepárate para el ecosistema sin cookies. Cómo la privacidad está transformando el marketing digital y la protección de datos.'
  },
  { 
    id: 7, 
    image: '/images/blog/gta-vi-release.png',
    meta_title: 'GTA VI: Últimas Noticias y Filtraciones | Lanzamiento',
    meta_description: 'Recopilamos todo sobre GTA VI. Fecha de lanzamiento, personajes, mapa de Vice City y más del juego más esperado.'
  },
  { 
    id: 8, 
    image: '/images/blog/ffvii-rebirth-analysis.png',
    meta_title: 'Final Fantasy VII Rebirth: Análisis Maestro RPG',
    meta_description: 'Análisis profundo de FFVII Rebirth. Exploramos la historia, el sistema de combate y por qué es una obra maestra de Square Enix.'
  },
  { 
    id: 9, 
    image: '/images/blog/ssd-ps5-guide.png',
    meta_title: 'Los Mejores SSD para PS5 2026 - Guía de Compra',
    meta_description: 'Amplía el almacenamiento de tu PS5 con los mejores SSD NVMe de 2026. Velocidad, refrigeración y compatibilidad garantizada.'
  },
  { 
    id: 10, 
    image: '/images/blog/elden-ring-guide.png',
    meta_title: 'Elden Ring: Shadow of the Erdtree - Guía Completa',
    meta_description: 'Domina el Reino de las Sombras en Elden Ring. Guía de jefes, nuevas armas y secretos de la expansión de FromSoftware.'
  },
  { 
    id: 13, 
    image: '/images/blog/fake-docs-ai.png',
    meta_title: 'Detección de Documentos Falsos con IA | Seguridad',
    meta_description: 'Cómo identificar fraudes y documentos falsificados usando herramientas de IA. El futuro de la verificación de identidad.'
  },
  { 
    id: 19, 
    image: '/images/blog/total-search-aeo.png',
    meta_title: 'Total Search y AEO: El Futuro del SEO en 2026',
    meta_description: 'Aprende qué es Total Search y Answer Engine Optimization (AEO). Cómo adaptar tu contenido para las respuestas de IA.'
  },
  { 
    id: 21, 
    image: '/images/blog/digital-trends-2026.png',
    meta_title: 'Tendencias Digitales 2026: Guía Definitiva',
    meta_description: 'Anticípate al cambio con nuestra guía de tendencias digitales para 2026. De la Web3 a la IA generativa.'
  },
  { 
    id: 22, 
    image: '/images/blog/data-protection-latam.png',
    meta_title: 'Protección de Datos en LATAM 2026 - Legislación',
    meta_description: 'Estado actual y futuro de la protección de datos en Latinoamérica. Desafíos legales y derechos digitales.'
  },
  { 
    id: 25, 
    image: '/images/blog/web-exploration-future.png',
    meta_title: 'Una Nueva Manera de Explorar la Web | Debates',
    meta_description: 'Exploramos cómo la IA y las nuevas interfaces están cambiando nuestra forma de navegar por internet.'
  }
];

async function run() {
  for (const update of updates) {
    const { error } = await supabase
      .from('articles')
      .update({ 
        featured_image: update.image,
        meta_title: update.meta_title,
        meta_description: update.meta_description
      })
      .eq('id', update.id);
    
    if (error) {
      console.error(`Error updating article ${update.id}:`, error);
    } else {
      console.log(`Updated article ${update.id} (Metadata & Image)`);
    }
  }
}

run();
