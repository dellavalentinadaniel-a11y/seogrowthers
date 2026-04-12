const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://kejitvcoalooiwbcwelt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlaml0dmNvYWxvb2l3YmN3ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4OTU3MzgsImV4cCI6MjA4MjQ3MTczOH0.FSoSs5Kpm48MVo1gziNlm_BiULhzJ1DN-fhSOMPSzmc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: articles } = await supabase.from('articles').select('title, slug, status');
  const { data: news } = await supabase.from('blog_news').select('title, slug, status');
  
  const results = {
    articles: articles || [],
    news: news || []
  };
  
  fs.writeFileSync('db_check_results.json', JSON.stringify(results, null, 2));
  console.log('Results written to db_check_results.json');
}

check();
