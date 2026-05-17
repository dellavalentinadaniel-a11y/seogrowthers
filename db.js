const { createClient } = require('@supabase/supabase-js');

// Nota: En un entorno de servidor como Node.js, estas variables deben estar en process.env
// En el frontend (Vite), se inyectan durante el build.
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY no están definidas en el entorno.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConnection() {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Error al conectar con Supabase:', error.message);
    } else {
      console.log('Conexión exitosa. Datos recibidos:', data);
    }
  } catch (err) {
    console.error('Error inesperado:', err.message);
  }
}

checkConnection();
