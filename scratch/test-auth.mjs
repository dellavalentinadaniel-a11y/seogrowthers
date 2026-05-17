import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cgmmbtedcwzytcwezecn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnbW1idGVkY3d6eXRjd2V6ZWNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MTc1MTEsImV4cCI6MjA5Mzk5MzUxMX0.3Uh5ZacJCo_AVBEU_cckJ620eBJSOWoZ6kjKN8R7kUk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testAuth() {
  console.log('--- Probando Autenticación Remota ---');
  
  // Test 1: Intentar registro
  const email = `test_${Date.now()}@seogrowthers.com`;
  const password = 'testPassword123!';
  
  console.log(`\n1. Intentando registrar usuario: ${email}`);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('❌ Error al registrar:', error.message);
  } else {
    console.log('✅ Registro exitoso!');
    console.log('User ID:', data.user?.id);
    console.log('¿Requiere confirmar email?:', data.user?.identities?.length === 0 ? 'Sí/Quizás' : 'No (o ya confirmado)');
  }
}

testAuth();
