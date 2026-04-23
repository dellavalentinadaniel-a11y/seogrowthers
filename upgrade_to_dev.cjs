const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://kejitvcoalooiwbcwelt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtlaml0dmNvYWxvb2l3YmN3ZWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4OTU3MzgsImV4cCI6MjA4MjQ3MTczOH0.FSoSs5Kpm48MVo1gziNlm_BiULhzJ1DN-fhSOMPSzmc';
const supabase = createClient(supabaseUrl, supabaseKey);

const eliteEmails = [
  'dellavalentina.daniel@gmail.com',
  'seogrowthers@gmail.com',
  'assistdigital.dellavalentina@gmail.com'
];

async function upgradeProfiles() {
  console.log('=== Iniciando Ascenso de Rango a Desarrollador Elite ===');

  for (const email of eliteEmails) {
    console.log(`\nProcesando nodo: ${email}`);
    
    // 1. Intentamos encontrar el perfil por email si existe esa columna, 
    // o buscamos en una tabla de mapeo si la hay.
    // Dado que usualmente se usa el ID de auth, intentaremos actualizar por coincidencia de nombre/email.
    
    const { data: profile, error: findError } = await supabase
      .from('profiles')
      .select('id, full_name, role')
      .ilike('email', email)
      .single();

    if (findError || !profile) {
      console.log(`  - No se encontró perfil público para ${email}. Es posible que el usuario deba iniciar sesión primero o que la tabla no use el campo 'email'.`);
      continue;
    }

    // 2. Actualizamos al rango más alto
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        role: 'owner', 
        full_name: profile.full_name || 'Desarrollador Senior' 
      })
      .eq('id', profile.id);

    if (updateError) {
      console.error(`  - Error al ascender rango:`, updateError.message);
    } else {
      console.log(`  - ¡ÉXITO! ${email} ahora tiene rango 'owner' (Desarrollador Elite).`);
    }
  }
}

upgradeProfiles();
