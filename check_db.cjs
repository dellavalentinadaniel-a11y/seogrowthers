const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kejitvcoalooiwbcwelt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlaml0dmNvYWxvb2l3YmN3ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4OTU3MzgsImV4cCI6MjA4MjQ3MTczOH0.FSoSs5Kpm48MVo1gziNlm_BiULhzJ1DN-fhSOMPSzmc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkNews() {
  const { data, error } = await supabase
    .from('blog_news')
    .select('title, slug, status');
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('News in DB:', data);
  }
}

checkNews();
