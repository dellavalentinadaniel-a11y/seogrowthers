require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    try {
        console.log('Testing articles fetch from kejitvcoalooiwbcwelt...');
        const { data, error, count } = await supabase.from('articles').select('id, title, status, slug', { count: 'exact' });
        if (error) {
            console.error('Error fetching articles:', error);
        } else {
            console.log(`Articles fetched successfully: ${data.length} items (Total: ${count})`);
            console.log('Sample articles:', data.slice(0, 3));
        }
        
        console.log('Testing blog_categories fetch from kejitvcoalooiwbcwelt...');
        const { data: catData, error: catError } = await supabase.from('blog_categories').select('*');
        if (catError) {
             console.error('Error fetching blog_categories:', catError);
        } else {
             console.log(`Categories fetched successfully: ${catData.length} items`);
             console.log('Sample categories:', catData.slice(0, 3));
        }
    } catch (e) {
        console.error('Unexpected error:', e);
    }
}

test();
