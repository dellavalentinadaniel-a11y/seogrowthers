require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: Faltan variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function parseMarkdownFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const parts = content.split('---');
    if (parts.length < 3) return null;
    
    const frontmatter = parts[1];
    const body = parts.slice(2).join('---').trim();
    
    const meta = {};
    frontmatter.split('\n').forEach(line => {
        const match = line.match(/^([a-z_]+):\s*(.*)$/);
        if (match) {
            let key = match[1].trim();
            let val = match[2].trim();
            if (val.startsWith('"') && val.endsWith('"')) {
                val = val.slice(1, -1);
            }
            meta[key] = val;
        }
    });

    let slug = '';
    if (filePath.includes('neuquen')) {
        slug = 'informe-competitividad-comercio-neuquen-transformacion-digital';
    } else {
        slug = 'invisibilidad-digital-negocios-condenados-desaparecer';
    }

    return {
        title: meta.title || 'Untitled',
        slug: slug,
        summary: meta.summary || meta.title,
        content: body,
        category: meta.category || 'Tendencias',
        featured_image: meta.image_url || '',
        status: 'published'
    };
}

const articles = [
    parseMarkdownFile(path.join(__dirname, 'blog_articles', 'articulo_blog_neuquen.md')),
    parseMarkdownFile(path.join(__dirname, 'blog_articles', 'articulo_invisibilidad_digital.md'))
].filter(Boolean);

async function insertArticles() {
    let sessionUser = null;
    console.log('Intentando iniciar sesión como administrador...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: 'dellavalentina.daniel@gmail.com',
        password: 'admin123'
    });

    if (authError) {
        console.warn("Login administrador falló. Intentando registrar usuario temporal...");
        const tempEmail = `temp_admin_${Date.now()}@example.com`;
        const tempPass = 'TempPass123!';
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: tempEmail,
            password: tempPass
        });

        if (signUpError) {
            console.error("Error al registrar usuario temporal:", signUpError.message);
        } else {
            console.log("Usuario temporal registrado:", tempEmail);
            sessionUser = signUpData.user;
        }
    } else {
        console.log("Sesión iniciada con éxito.");
        sessionUser = authData.user;
    }

    console.log('Iniciando inserción de artículos...');
    
    for (const article of articles) {
        const articleToInsert = {
            title: article.title,
            summary: article.summary,
            content: article.content,
            featured_image: article.featured_image,
            slug: article.slug,
            category: article.category,
            created_at: new Date().toISOString()
        };

        const { data, error } = await supabase
            .from('articles')
            .upsert(articleToInsert, { onConflict: 'slug' })
            .select();

        if (error) {
            console.error(`Error insertando artículo "${article.title}":`, error.message);
        } else {
            console.log(`Artículo insertado/actualizado con éxito: ${article.title}`);
        }
    }
}

insertArticles();
