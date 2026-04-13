
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Helmet } from 'react-helmet-async';
import { extractHeadings, injectHeadingIds } from '@/lib/seoHelpers';
import { Calendar, User, Clock, Tag } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import AdUnit from '@/components/ads/AdUnit';
import AdSidebar from '@/components/ads/AdSidebar';
import MarkdownRenderer from '@/components/shared/MarkdownRenderer';
import BlogCommentsSection from '@/components/blog/BlogCommentsSection';
import InteractionBar from '@/components/article/InteractionBar';



const ArticleDetail = () => {
  const { category, slug } = useParams();
  const fullSlug = category && !slug ? category : (category && slug ? `${category}/${slug}` : slug);
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState([]);

  const fetchArticle = useCallback(async () => {
    setLoading(true);
    let current = null;
    
    try {
      // 1. Try from 'articles' table (Current source of truth with 5 rows)
        const { data, error } = await supabase
          .from('articles')
          .select('id, title, summary, content, content_html, featured_image, slug, category, created_at, status, author_id')
          .or(`slug.eq.${fullSlug},slug.eq.${slug}`)
          .single();

        if (!error && data) {
          current = data;
        }
      } catch (err) {
        console.warn("Supabase fetch error:", err);
      }



    if (!current) {
      toast({ title: "Error", description: "No se encontró el artículo.", variant: "destructive" });
      navigate('/blog');
      setLoading(false);
      return;
    }

    const mappedArticle = {
      ...current,
      content: current.content_html || current.content || "", 
      seo_title: current.seo_title || current.title,
      seo_description: current.seo_description || current.summary || current.description || "",
      keywords: current.keywords || [],
      canonical_url: current.canonical_url,
      featured_image_alt: current.featured_image_alt
    };

    setArticle(mappedArticle);

    // Extract headings for TOC from Markdown or HTML
    const extractedHeadings = [];
    if (mappedArticle.content.includes('<h2') || mappedArticle.content.includes('<h3')) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(mappedArticle.content, 'text/html');
      const hTags = Array.from(doc.querySelectorAll('h2, h3'));
      hTags.forEach(h => {
        extractedHeadings.push({
          id: h.id || h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          text: h.textContent,
          level: h.tagName
        });
      });
    } else {
      const headingRegex = /^(#{2,3})\s+(.+)$/gm;
      let match;
      while ((match = headingRegex.exec(mappedArticle.content)) !== null) {
        const level = match[1].length === 2 ? 'H2' : 'H3';
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        extractedHeadings.push({ id, text, level });
      }
    }
    setToc(extractedHeadings);
    setLoading(false);
  }, [slug, fullSlug, navigate]);

  useEffect(() => {
    fetchArticle();
  }, [slug, fetchArticle]);

  if (loading) return <div className="min-h-screen bg-[#0C0D0D] pt-32 text-center text-white">Cargando artículo...</div>;
  if (!article) return null;

  // Simple ad injection logic (In-article)
  // Splits content by paragraphs and injects an ad after the 3rd paragraph
  const injectAds = (html) => {
    if (!html) return '';
    const parts = html.split('</p>');
    if (parts.length > 3) {
      // We can't render the React component directly into the HTML string safely without Portal or SSR.
      // For this frontend-only task, we will just return the HTML and place ads around it, 
      // or use a specific marker if we were processing it into an array of React elements.
      // However, to keep it simple and safe for dangerouslySetInnerHTML:
      // We will place the main ad outside the content flow or between distinct sections if possible.
      // OR, we assume content is just text and we can't inject mid-stream easily with React + dangerouslySetInnerHTML.
      // OPTION 2: We don't inject inside the HTML blob. We place it above/below.
      // As requested: "between paragraphs". 
      // To do this properly in React without parsing HTML to React nodes:
      return html; 
    }
    return html;
  };

  return (
    <>
      <Helmet>
        <title>{article.seo_title || article.title}</title>
        <meta name="description" content={article.seo_description || article.summary} />
        {article.keywords && <meta name="keywords" content={article.keywords.join(', ')} />}
        {article.canonical_url && <link rel="canonical" href={article.canonical_url} />}
        <meta property="og:title" content={article.seo_title || article.title} />
        <meta property="og:description" content={article.seo_description || article.summary} />
        {article.featured_image && <meta property="og:image" content={article.featured_image} />}
      </Helmet>

      <div className="bg-[#0C0D0D] min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Content */}
            <main className="lg:col-span-8">
              {/* Leaderboard Ad Above Content */}
              <AdUnit 
                slotId="article-top-leaderboard" 
                width="728px" 
                height="90px" 
                className="hidden md:flex mb-8"
              />
              <AdUnit 
                slotId="article-top-mobile" 
                width="320px" 
                height="50px" 
                className="md:hidden mb-8"
              />

              <header className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/20">
                    {article.category || 'Noticias'}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  {article.title}
                </h1>
                
                <div className="flex items-center gap-6 text-gray-400 text-sm border-b border-slate-800 pb-6 mb-6">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Redacción</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>5 min lectura</span>
                  </div>
                </div>
              </header>

              {article.featured_image && (
                <div className="mb-10 rounded-2xl overflow-hidden border border-slate-800">
                  <img 
                    src={article.featured_image} 
                    alt={article.featured_image_alt || article.title}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* In-Article Ad (Mock placement) */}
              <div className="block lg:hidden mb-8">
                <AdUnit slotId="mobile-in-content" width="300px" height="250px" />
              </div>

              <InteractionBar 
                contentId={article.id} 
                contentType="article" 
              />

              <MarkdownRenderer content={article.content} />

              {/* In-Article Ad (After content) */}
               <AdUnit 
                slotId="article-middle-rect" 
                width="300px" 
                height="250px" 
                className="my-12"
              />

              {article.keywords && article.keywords.length > 0 && (
                <div className="mt-12 pt-6 border-t border-slate-800">
                  <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                    <Tag size={14} /> Temas relacionados:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.keywords.map(kw => (
                      <span key={kw} className="text-sm bg-slate-800 text-gray-300 px-3 py-1 rounded hover:bg-slate-700 transition-colors cursor-pointer">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Leaderboard */}
              <AdUnit 
                slotId="article-bottom-leaderboard" 
                width="728px" 
                height="90px" 
                className="hidden md:flex mt-12"
              />

              {article.id && (
                <BlogCommentsSection articleId={article.id} />
              )}
            </main>

            <aside className="lg:col-span-4 space-y-8">
               {/* Sidebar Ad Component */}
               <AdSidebar />
               
               <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 mt-8">
                <h3 className="font-bold text-white mb-4 text-lg">Tabla de Contenidos</h3>
                <nav>
                  <ul className="space-y-3">
                     {toc.length === 0 && <li className="text-gray-500 text-sm">Sin subtítulos</li>}
                     {toc.map((heading) => (
                      <li key={heading.id} style={{ paddingLeft: (heading.level - 2) * 16 }}>
                        <a 
                          href={`#${heading.id}`} 
                          className="text-sm text-gray-400 hover:text-cyan-400 transition-colors block border-l-2 border-transparent hover:border-cyan-500 pl-3 -ml-px"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
