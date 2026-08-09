import { supabase } from '../lib/supabaseClient.js';

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
