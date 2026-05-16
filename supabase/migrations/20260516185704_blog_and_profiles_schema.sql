-- ============================================================
-- SEO Growthers — Unified Schema (English Names)
-- ============================================================

-- 1. Enums
DO $$ BEGIN
    CREATE TYPE public.user_role AS ENUM ('user', 'author', 'editor', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    twitter_url TEXT,
    linkedin_url TEXT,
    website TEXT,
    xp INTEGER DEFAULT 0,
    role public.user_role DEFAULT 'user' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Categories
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    type TEXT DEFAULT 'article'
);

-- 4. Articles
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    content_html TEXT,
    featured_image TEXT,
    slug TEXT UNIQUE NOT NULL,
    category TEXT,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author TEXT,
    status TEXT DEFAULT 'published',
    reading_time INTEGER,
    views INTEGER DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    canonical_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Comments
CREATE TABLE IF NOT EXISTS public.article_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_name TEXT,
    user_avatar TEXT,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Likes
CREATE TABLE IF NOT EXISTS public.article_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(article_id, user_id)
);

-- 7. Contact Submissions
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Others
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT,
    role TEXT,
    bio TEXT,
    avatar_url TEXT,
    order_index INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.ad_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slot_name TEXT UNIQUE,
    is_enabled BOOLEAN DEFAULT true,
    ad_client TEXT,
    ad_slot TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    description TEXT,
    category TEXT,
    link TEXT,
    file_type TEXT,
    file_size TEXT,
    status TEXT DEFAULT 'published',
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.blog_news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    slug TEXT UNIQUE,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    category TEXT,
    status TEXT DEFAULT 'published',
    reading_time INTEGER,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    views INTEGER DEFAULT 0
);

-- 9. Trigger for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, role)
    VALUES (
        new.id,
        coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Nuevo Usuario'),
        coalesce(new.raw_user_meta_data->>'avatar_url', ''),
        'user'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_news ENABLE ROW LEVEL SECURITY;

-- 11. RLS Policies
CREATE POLICY "articles_public_read" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "articles_author_all" ON articles FOR ALL USING (auth.uid()::text = author_id::text);
CREATE POLICY "categories_public_read" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "comments_public_read" ON article_comments FOR SELECT USING (is_approved = true);
CREATE POLICY "comments_public_insert" ON article_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "likes_public_read" ON article_likes FOR SELECT USING (true);
CREATE POLICY "likes_auth_insert" ON article_likes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "likes_auth_delete" ON article_likes FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "contact_insert_only" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "profiles_public_read" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_self_update" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "team_public_read" ON team_members FOR SELECT USING (true);
CREATE POLICY "ads_public_read" ON ad_settings FOR SELECT USING (true);
CREATE POLICY "resources_public_read" ON resources FOR SELECT USING (true);
CREATE POLICY "news_public_read" ON blog_news FOR SELECT USING (true);

-- 12. Indexes
CREATE INDEX IF NOT EXISTS idx_articles_status_created ON articles (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles (slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles (created_at DESC) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_blog_categories_type_slug ON blog_categories (type, slug);
CREATE INDEX IF NOT EXISTS idx_comments_article_approved ON article_comments (article_id, is_approved);
CREATE INDEX IF NOT EXISTS idx_likes_article ON article_likes (article_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_article ON article_likes (user_id, article_id);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles (role);

-- Trigram extension
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS idx_articles_title_trgm ON articles USING gin (title gin_trgm_ops);

-- Full-text search
ALTER TABLE articles ADD COLUMN IF NOT EXISTS fts tsvector 
GENERATED ALWAYS AS (to_tsvector('spanish', coalesce(title, '') || ' ' || coalesce(summary, ''))) STORED;
CREATE INDEX IF NOT EXISTS idx_articles_fts ON articles USING gin (fts);
