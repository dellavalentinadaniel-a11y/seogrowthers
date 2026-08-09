import { supabase } from '../lib/supabaseClient.js';
import process from 'process';

async function checkConnection() {
  try {
    console.log('Attempting to connect to Supabase...');
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Error connecting to Supabase:', error.message);
      process.exit(1);
    } else {
      console.log('✅ Connection successful. Found at least one profile.');
    }
  } catch (err) {
    console.error('Unexpected error:', err.message);
    process.exit(1);
  }
}

checkConnection();
