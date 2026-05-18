import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://cgmmbtedcwzytcwezecn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnbW1idGVkY3d6eXRjd2V6ZWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTc1MTEsImV4cCI6MjA5Mzk5MzUxMX0.3Uh5ZacJCo_AVBEU_cckJ620eBJSOWoZ6kjKN8R7kUk";

const supabase = createClient(supabaseUrl, supabaseKey);

async function listProfiles() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, full_name, role, custom_badge');

    if (error) {
      console.error('Error al listar perfiles:', error.message);
    } else {
      console.log('Perfiles registrados en la Base de Datos:');
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('Error inesperado:', err.message);
  }
}

listProfiles();
