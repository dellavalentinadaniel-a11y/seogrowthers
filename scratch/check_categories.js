
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import process from 'process';

// This script connects to a different Supabase project.
// We'll use separate environment variables for it.
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.ALT_SUPABASE_URL;
const supabaseKey = process.env.ALT_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: ALT_SUPABASE_URL or ALT_SUPABASE_ANON_KEY is not defined in your .env file.");
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCategories() {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Categories:', JSON.stringify(data, null, 2));
}

checkCategories();
