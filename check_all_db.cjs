const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kejitvcoalooiwbcwelt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlaml0dmNvYWxvb2l3YmN3ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4OTU3MzgsImV4cCI6MjA4MjQ3MTczOH0.FSoSs5Kpm48MVo1gziNlm_BiULhzJ1DN-fhSOMPSzmc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('title, slug, status');
  
  if (error) {
    console.error('Error articles:', error);
  } else {
    console.log('Articles in DB:', data);
  }

  const { data: news, error: newsErr } = await supabase
    .from('blog_news')
    .select('title, slug, status');

  if (newsErr) {
    console.error('Error news:', newsErr);
  } else {
    console.log('News in DB:', news);
  }
}

checkArticles();
