import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import process from 'process';

// Load environment variables from the project root's .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error(
        "Error: Supabase credentials are not defined.\n" +
        "Ensure you have a .env file in the project root with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
    );
    process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey);