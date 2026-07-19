import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://cgmmbtedcwzytcwezecn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnbW1idGVkY3d6eXRjd2V6ZWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTc1MTEsImV4cCI6MjA5Mzk5MzUxMX0.3Uh5ZacJCo_AVBEU_cckJ620eBJSOWoZ6kjKN8R7kUk";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkArticles() {
  try {
    console.log('--- Consultando articulos ---');
    const { data: articles, error: errArticles } = await supabase
      .from('articles')
      .select('id, title, status, section, category')
      .limit(10);

    if (errArticles) {
      console.error('Error al obtener articulos:', errArticles.message);
    } else {
      console.log(`Se encontraron ${articles.length} articulos en la base de datos:`);
      console.log(articles);
    }

    console.log('\n--- Consultando categorias ---');
    const { data: categories, error: errCategories } = await supabase
      .from('blog_categories')
      .select('id, name, slug, type')
      .limit(10);

    if (errCategories) {
      console.error('Error al obtener categorias:', errCategories.message);
    } else {
      console.log(`Se encontraron ${categories.length} categorias:`);
      console.log(categories);
    }

  } catch (err) {
    console.error('Error inesperado:', err.message);
  }
}

checkArticles();
