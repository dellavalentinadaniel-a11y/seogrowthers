import { supabase } from '../lib/supabaseClient.js';

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
