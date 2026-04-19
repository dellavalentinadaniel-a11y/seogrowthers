const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kejitvcoalooiwbcwelt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlaml0dmNvYWxvb2l3YmN3ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4OTU3MzgsImV4cCI6MjA4MjQ3MTczOH0.FSoSs5Kpm48MVo1gziNlm_BiULhzJ1DN-fhSOMPSzmc';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCategories() {
  const { data, error } = await supabase
    .from('articles')
    .select('category');
  
  if (error) {
    console.error(error);
  } else {
    const categories = [...new Set(data.map(d => d.category))];
    console.log('Categories in articles table:', categories);
  }
}

checkCategories();
