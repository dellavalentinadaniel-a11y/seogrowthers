const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

function loadEnv() {
    const envPath = 'c:/Users/della/OneDrive/Escritorio/seogrowthers/Nueva carpeta/Nueva carpeta/horizons-export-4ae51224-e377-439c-9315-7d2c7f7b11c2/seogrowthers/.env';
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) {
                process.env[key.trim()] = value.trim();
            }
        });
    }
}

loadEnv();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: credentials not found');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Últimos artículos:');
    console.table(data);
  }
}

checkArticles();
