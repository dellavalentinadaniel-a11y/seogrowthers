import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Loader2, Edit2, Check, X, User, FileText, Calendar, Link as LinkIcon, Award, Zap, Star, Trophy, Camera, Twitter, Linkedin, Globe, Instagram, Youtube, MessageSquare } from 'lucide-react';
import AvatarSelector from '@/components/profile/AvatarSelector.jsx';
import BannerSelector from '@/components/profile/BannerSelector.jsx';
import SkillsPicker from '@/components/profile/SkillsPicker.jsx';
import FacebookStyleEditor from '@/components/forum/FacebookStyleEditor';
import AdminSocialHub from '@/components/profile/AdminSocialHub';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress.jsx";
import { Badge } from '@/components/ui/badge.jsx';

const PRESET_BADGES = [
  'Novato Neural',
  'Data Voyager',
  'Elite Explorer',
  'Master Pathbreaker',
  'Gurú del SEO',
  'Creador Legendario',
  'Cerebro Algorítmico',
  'Arquitecto de Sistemas',
  'Hacker Ético',
  'Lumina Master',
  'Colaborador Destacado',
  'Ganador del Mes'
];

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ articles: 0, comments: 0, shares: 0, guides: 0 });
  const [achievements, setAchievements] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [forumFeed, setForumFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ 
    full_name: '', 
    bio: '', 
    username: '', 
    twitter_url: '', 
    linkedin_url: '', 
    website: '',
    instagram_url: '',
    youtube_url: '',
    custom_badge: ''
  });
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [selectedBanner, setSelectedBanner] = useState('');
  const [profileSkills, setProfileSkills] = useState([]);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);
  const [isSkillsDialogOpen, setIsSkillsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { navigate('/login'); return; }
        setUser(user);

        // Fetch profile from profiles table
        let { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: user.id, 
                full_name: user.user_metadata?.full_name || '',
                avatar_url: user.user_metadata?.avatar_url || '/images/iconos/guiaspersonaje.webp',
                updated_at: new Date().toISOString()
              }
            ])
            .select()
            .single();
          
          if (!createError) profileData = newProfile;
        }

        const resolvedProfile = profileData || { id: user.id };

        // 1. Fetch real article count (author_id = user.id)
        const { count: articleCount } = await supabase
          .from('articles')
          .select('*', { count: 'exact', head: true })
          .eq('author_id', user.id);

        // 2. Fetch comments count (safely catch if table doesn't exist)
        let blogCommentsCount = 0;
        let newsCommentsCount = 0;
        try {
          const { count: bc } = await supabase.from('article_comments').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
          blogCommentsCount = bc;
        } catch (e) {}
        try {
          const { count: nc } = await supabase.from('news_comments').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
          newsCommentsCount = nc;
        } catch (e) {}

        // 3. Fetch guide progress
        const { count: guidesCount } = await supabase
          .from('user_guides_progress')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        // 4. Fetch achievements
        const { data: achievementsData } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', user.id);

        // 5. Fetch forum feed and sidebar posts
        try {
          const { data: feedData } = await supabase
            .from('articles')
            .select(`
              id,
              title,
              slug,
              category,
              created_at,
              summary,
              featured_image,
              views,
              profiles:author_id (
                username,
                full_name,
                avatar_url,
                custom_badge
              )
            `)
            .eq('section', 'Foro')
            .eq('status', 'published')
            .order('created_at', { ascending: false })
            .limit(5);
          
          const resolvedFeed = feedData || [];
          setForumFeed(resolvedFeed);
          setForumPosts(resolvedFeed.slice(0, 3));
        } catch (e) {
          console.error("Error fetching forum feed on mount:", e);
        }

        setProfile(resolvedProfile);
        setSelectedAvatar(resolvedProfile.avatar_url || '/images/iconos/guiaspersonaje.webp');
        setSelectedBanner(resolvedProfile.banner_url || '');
        setProfileSkills(resolvedProfile.skills_tags || []);
        setAchievements(achievementsData || []);
        
        setStats({ 
          articles: articleCount || 0, 
          comments: (blogCommentsCount || 0) + (newsCommentsCount || 0),
          shares: 0, 
          guides: guidesCount || 0 
        });

        setEditForm({
          full_name: resolvedProfile.full_name || user.user_metadata?.full_name || '',
          bio: resolvedProfile.bio || '',
          username: resolvedProfile.username || '',
          twitter_url: resolvedProfile.twitter_url || '',
          linkedin_url: resolvedProfile.linkedin_url || '',
          website: resolvedProfile.website || '',
          instagram_url: resolvedProfile.instagram_url || '',
          youtube_url: resolvedProfile.youtube_url || '',
          custom_badge: resolvedProfile.custom_badge || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [navigate]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const updateData = {
        ...editForm,
        custom_badge: editForm.custom_badge || null,
        instagram_url: editForm.instagram_url || null,
        youtube_url: editForm.youtube_url || null,
        twitter_url: editForm.twitter_url || null,
        linkedin_url: editForm.linkedin_url || null,
        website: editForm.website || null,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);
      
      if (error) throw error;
      setProfile(prev => ({ ...prev, ...updateData }));
      setEditing(false);
      toast({ title: 'Perfil actualizado', description: 'Tus datos han sido guardados correctamente.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error al guardar', description: error.message });
    } finally {
      setSaving(false);
    }
  };

  const checkProfileCompletion = (p) => {
    return p.full_name && p.username && p.bio && p.avatar_url && p.banner_url && p.skills_tags?.length > 0;
  };

  const handleUpdateAvatar = async () => {
    setSaving(true);
    try {
      const wasComplete = checkProfileCompletion(profile);
      const newProfile = { ...profile, avatar_url: selectedAvatar };
      const isNowComplete = checkProfileCompletion(newProfile);
      
      let xpBonus = 0;
      if (!wasComplete && isNowComplete) xpBonus = 20;

      const { error } = await supabase
        .from('profiles')
        .update({
            avatar_url: selectedAvatar,
            xp: (profile.xp || 0) + xpBonus,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      setProfile(prev => ({ ...prev, avatar_url: selectedAvatar, xp: (prev.xp || 0) + xpBonus }));
      window.dispatchEvent(new CustomEvent('profileUpdated', { detail: { avatar_url: selectedAvatar } }));
      setIsAvatarDialogOpen(false);
      toast({ 
        title: 'Avatar actualizado', 
        description: xpBonus > 0 ? '¡Perfil completado! +20 XP ganados.' : 'Tu nueva identidad ha sido guardada.' 
      });
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudo actualizar el avatar.' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateBanner = async () => {
    setSaving(true);
    try {
      const wasComplete = checkProfileCompletion(profile);
      const newProfile = { ...profile, banner_url: selectedBanner };
      const isNowComplete = checkProfileCompletion(newProfile);
      
      let xpBonus = 0;
      if (!wasComplete && isNowComplete) xpBonus = 20;

      const { error } = await supabase
        .from('profiles')
        .update({
            banner_url: selectedBanner,
            xp: (profile.xp || 0) + xpBonus,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      setProfile(prev => ({ ...prev, banner_url: selectedBanner, xp: (prev.xp || 0) + xpBonus }));
      setIsBannerDialogOpen(false);
      toast({ 
        title: 'Banner actualizado', 
        description: xpBonus > 0 ? '¡Perfil completado! +20 XP ganados.' : 'La cabecera ha sido personalizada.' 
      });
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudo actualizar el banner.' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateSkills = async () => {
    setSaving(true);
    try {
      const wasComplete = checkProfileCompletion(profile);
      const newProfile = { ...profile, skills_tags: profileSkills };
      const isNowComplete = checkProfileCompletion(newProfile);
      
      let xpBonus = 0;
      if (!wasComplete && isNowComplete) xpBonus = 20;

      const { error } = await supabase
        .from('profiles')
        .update({
            skills_tags: profileSkills,
            xp: (profile.xp || 0) + xpBonus,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      setProfile(prev => ({ ...prev, skills_tags: profileSkills, xp: (prev.xp || 0) + xpBonus }));
      setIsSkillsDialogOpen(false);
      toast({ 
        title: 'Habilidades actualizadas', 
        description: xpBonus > 0 ? '¡Perfil completado! +20 XP ganados.' : 'Tus especialidades han sido guardadas.' 
      });
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudieron actualizar las habilidades.' });
    } finally {
      setSaving(false);
    }
  };

  const toggleSkill = (skill) => {
    setProfileSkills(prev => 
        prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };


  const getRankInfo = (xp = 0, customBadge = null) => {
    if (customBadge) {
      return { 
        name: customBadge, 
        color: 'text-amber-400 animate-pulse', 
        border: 'border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.25)]', 
        icon: <Trophy className="w-4 h-4 text-amber-400" />, 
        next: null 
      };
    }
    if (xp >= 2001) return { name: 'Master Pathbreaker', color: 'text-amber-400', border: 'border-amber-500/50', icon: <Trophy className="w-4 h-4" />, next: null };
    if (xp >= 501) return { name: 'Elite Explorer', color: 'text-fuchsia-400', border: 'border-fuchsia-500/50', icon: <Star className="w-4 h-4" />, next: 2001 };
    if (xp >= 101) return { name: 'Data Voyager', color: 'text-purple-400', border: 'border-purple-500/50', icon: <Zap className="w-4 h-4" />, next: 501 };
    return { name: 'Novato Neural', color: 'text-cyan-400', border: 'border-cyan-500/50', icon: <Award className="w-4 h-4" />, next: 101 };
  };

  const rank = getRankInfo(profile?.xp, profile?.custom_badge);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({ title: 'Sesión cerrada', description: 'Has salido del ecosistema de forma segura.' });
      navigate('/login');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error al cerrar sesión', description: error.message });
    }
  };

  const fetchForumFeed = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          id,
          title,
          slug,
          category,
          created_at,
          summary,
          featured_image,
          views,
          profiles:author_id (
            username,
            full_name,
            avatar_url,
            custom_badge
          )
        `)
        .eq('section', 'Foro')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setForumFeed(data || []);
      
      // Mantener en sincronía la barra lateral de debates
      if (data) {
        setForumPosts(data.slice(0, 3));
      }
    } catch (err) {
      console.error('Error fetching forum feed:', err);
    }
  };

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario';
  const joinDate = user?.created_at ? format(new Date(user.created_at), "MMMM 'de' yyyy", { locale: es }) : '';

  const dashboardMenu = [
    { label: 'Blog Comunitario', href: '/blog', icon: <FileText className="w-5 h-5" />, desc: 'Debates' },
    { label: 'Recursos & Guías', href: '/resources', icon: <User className="w-5 h-5" />, desc: 'Aprender' },
    { label: 'Noticias SEO', href: '/news', icon: <FileText className="w-5 h-5" />, desc: 'Actualidad' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="text-white font-sans min-h-screen relative overflow-hidden">
      <Helmet>
        <title>{displayName} — Dashboard | Lumina Quest</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Atmospheric Background glow */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <main className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ── Left Sidebar (Identity) ── */}
          <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
            <div className="bg-[#0e0e15] border border-white/5 rounded-3xl overflow-hidden relative shadow-2xl">
              {/* Subtle Banner */}
              <div className="relative h-32 group">
                <img 
                  src={profile?.banner_url || "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1920&auto=format&fit=crop"} 
                  alt="Banner" 
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e15] via-transparent to-transparent" />
                <Dialog open={isBannerDialogOpen} onOpenChange={setIsBannerDialogOpen}>
                  <DialogTrigger asChild>
                    <button className="absolute top-3 right-3 bg-black/40 backdrop-blur-md rounded-xl p-2 opacity-0 group-hover:opacity-100 transition hover:bg-white/10">
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#12111A] border-white/10 text-white max-w-3xl">
                    <DialogHeader><DialogTitle>Cabecera Estelar</DialogTitle></DialogHeader>
                    <BannerSelector currentBanner={selectedBanner} onSelect={setSelectedBanner} onSave={handleUpdateBanner} isSaving={saving} />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Avatar & Profile Details */}
              <div className="px-6 pb-8 relative -mt-16 flex flex-col items-center text-center">
                <div className="relative group mb-4">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-md opacity-40 group-hover:opacity-70 transition duration-700" />
                  <div className="relative w-28 h-28 rounded-full border-4 border-[#0e0e15] overflow-hidden bg-slate-900 z-10">
                      <img
                        className="w-full h-full object-cover scale-[1.35]"
                        alt={displayName}
                        src={profile?.avatar_url || "/images/iconos/guiaspersonaje.webp"}
                      />
                  </div>
                  <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
                    <DialogTrigger asChild>
                      <button className="absolute bottom-0 right-0 z-20 bg-[#1A1825] border border-white/10 text-purple-400 p-2 rounded-full hover:scale-110 active:scale-95 transition-all">
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#12111A] border-white/10 text-white max-w-2xl">
                        <DialogHeader><DialogTitle className="text-xl font-bold text-purple-400">Identidad Virtual</DialogTitle></DialogHeader>
                        <AvatarSelector currentAvatar={selectedAvatar} onSelect={setSelectedAvatar} onSave={handleUpdateAvatar} isSaving={saving} user={user} />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border ${rank.border} ${rank.color} text-[10px] font-bold uppercase tracking-widest mb-3`}>
                    {rank.icon}
                    {rank.name}
                </div>

                {editing ? (
                  <input type="text" value={editForm.full_name} onChange={e => setEditForm(p => ({ ...p, full_name: e.target.value }))} className="w-full bg-white/5 border border-purple-500/50 rounded-lg px-3 py-2 text-white font-bold mb-2 text-center" placeholder="Tu nombre" />
                ) : (
                  <h1 className="text-2xl font-bold font-headline tracking-tight text-white mb-1">{displayName}</h1>
                )}

                {editing ? (
                  <input type="text" value={editForm.username} onChange={e => setEditForm(p => ({ ...p, username: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-slate-400 text-sm mb-2 text-center" placeholder="@username" />
                ) : (
                  <p className="text-purple-400 text-sm font-medium mb-2">{profile?.username ? `@${profile.username}` : user?.email}</p>
                )}

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-1.5 my-4">
                  {profile?.skills_tags?.map(skill => (
                    <span key={skill} className="bg-purple-500/10 text-purple-300 border border-purple-500/20 rounded-md text-[10px] py-1 px-2 font-medium">
                      {skill}
                    </span>
                  ))}
                  {!editing && (
                    <Dialog open={isSkillsDialogOpen} onOpenChange={setIsSkillsDialogOpen}>
                      <DialogTrigger asChild>
                        <button className="text-[10px] text-slate-500 hover:text-purple-400 transition-colors flex items-center gap-1 py-1">
                          <Edit2 className="w-3 h-3" /> Editar Habilidades
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#12111A] border-white/10 text-white">
                        <DialogHeader><DialogTitle>Arsenal Técnico</DialogTitle></DialogHeader>
                        <SkillsPicker selectedSkills={profileSkills} onToggle={toggleSkill} onSave={handleUpdateSkills} isSaving={saving} />
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {editing ? (
                  <textarea value={editForm.bio} onChange={e => setEditForm(p => ({ ...p, bio: e.target.value }))} className="w-full mt-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none" rows={3} placeholder="Bio..." />
                ) : profile?.bio ? (
                  <p className="text-slate-400 text-xs leading-relaxed max-w-[250px] mx-auto">{profile.bio}</p>
                ) : null}

                {/* Social Links */}
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  {editing ? (
                    <div className="w-full space-y-3">
                      <div className="text-left mb-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">Redes Sociales & Enlaces</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 group focus-within:border-cyan-500/50 transition-all">
                        <Twitter className="w-4 h-4 text-cyan-400 shrink-0" />
                        <input type="text" value={editForm.twitter_url} onChange={e => setEditForm(p => ({ ...p, twitter_url: e.target.value }))} className="bg-transparent border-none text-white text-xs w-full focus:ring-0 placeholder:text-slate-600 focus:outline-none" placeholder="Twitter URL" />
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 group focus-within:border-blue-500/50 transition-all">
                        <Linkedin className="w-4 h-4 text-blue-500 shrink-0" />
                        <input type="text" value={editForm.linkedin_url} onChange={e => setEditForm(p => ({ ...p, linkedin_url: e.target.value }))} className="bg-transparent border-none text-white text-xs w-full focus:ring-0 placeholder:text-slate-600 focus:outline-none" placeholder="LinkedIn URL" />
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 group focus-within:border-pink-500/50 transition-all">
                        <Instagram className="w-4 h-4 text-pink-500 shrink-0" />
                        <input type="text" value={editForm.instagram_url} onChange={e => setEditForm(p => ({ ...p, instagram_url: e.target.value }))} className="bg-transparent border-none text-white text-xs w-full focus:ring-0 placeholder:text-slate-600 focus:outline-none" placeholder="Instagram URL" />
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 group focus-within:border-red-500/50 transition-all">
                        <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                        <input type="text" value={editForm.youtube_url} onChange={e => setEditForm(p => ({ ...p, youtube_url: e.target.value }))} className="bg-transparent border-none text-white text-xs w-full focus:ring-0 placeholder:text-slate-600 focus:outline-none" placeholder="YouTube URL" />
                      </div>
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 group focus-within:border-emerald-500/50 transition-all">
                        <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                        <input type="text" value={editForm.website} onChange={e => setEditForm(p => ({ ...p, website: e.target.value }))} className="bg-transparent border-none text-white text-xs w-full focus:ring-0 placeholder:text-slate-600 focus:outline-none" placeholder="Website URL" />
                      </div>

                      {/* Exclusivo Administradores: Mención & Categoría de Premio */}
                      {profile?.role === 'admin' && (
                        <div className="mt-4 pt-4 border-t border-white/5 text-left space-y-3">
                          <div className="flex items-center gap-1.5 text-cyan-400">
                            <Award className="w-4 h-4" />
                            <span className="text-[10px] uppercase font-bold tracking-wider">Mención Especial (Admin)</span>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Categoría / Rango</label>
                            <select 
                              value={PRESET_BADGES.includes(editForm.custom_badge) ? editForm.custom_badge : (editForm.custom_badge ? 'Personalizado' : '')} 
                              onChange={e => {
                                const val = e.target.value;
                                if (val === 'Personalizado') {
                                  setEditForm(p => ({ ...p, custom_badge: 'Mención Especial' }));
                                } else {
                                  setEditForm(p => ({ ...p, custom_badge: val }));
                                }
                              }} 
                              className="w-full bg-[#12111A] border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-xs focus:border-purple-500/50"
                            >
                              <option value="">Rango Automático (XP)</option>
                              {PRESET_BADGES.map(badge => (
                                <option key={badge} value={badge}>{badge}</option>
                              ))}
                              <option value="Personalizado">🏆 Premio Personalizado...</option>
                            </select>
                          </div>

                          {(editForm.custom_badge !== '' && !PRESET_BADGES.includes(editForm.custom_badge)) && (
                            <div className="space-y-1 animate-fadeIn">
                              <label className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block">Nombre del Premio</label>
                              <input 
                                type="text" 
                                value={editForm.custom_badge} 
                                onChange={e => setEditForm(p => ({ ...p, custom_badge: e.target.value }))} 
                                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-3 py-1.5 text-white text-xs focus:border-cyan-500/50 focus:outline-none"
                                placeholder="Escribe el nombre del premio..." 
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {profile?.twitter_url && (
                        <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all group">
                          <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </a>
                      )}
                      {profile?.linkedin_url && (
                        <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group">
                          <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </a>
                      )}
                      {profile?.instagram_url && (
                        <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all group">
                          <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform animate-fadeIn" />
                        </a>
                      )}
                      {profile?.youtube_url && (
                        <a href={profile.youtube_url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-all group">
                          <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform animate-fadeIn" />
                        </a>
                      )}
                      {profile?.website && (
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-emerald-400 hover:border-emerald-400/50 hover:bg-emerald-400/10 transition-all group">
                          <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </a>
                      )}
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 w-full flex flex-col gap-2">
                  {editing ? (
                    <>
                      <button onClick={handleSaveProfile} disabled={saving} className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold rounded-xl text-sm transition-all flex justify-center items-center gap-2">
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Guardar
                      </button>
                      <button onClick={() => setEditing(false)} className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-sm transition-all border border-white/10">
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => navigate('/blog/create')} className="w-full py-2.5 bg-primary text-on-primary font-bold rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] flex justify-center items-center gap-2 mb-2">
                        <FileText className="w-4 h-4" /> Crear Publicación
                      </button>
                      <button onClick={() => setEditing(true)} className="w-full py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-medium rounded-xl text-sm transition-all border border-purple-500/20 flex justify-center items-center gap-2">
                        <Edit2 className="w-3.5 h-3.5" /> Editar Perfil
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="bg-[#0e0e15] border border-white/5 rounded-3xl p-4 shadow-2xl">
              <h3 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold mb-4 px-2">Explorar Destinos</h3>
              <nav className="flex flex-col gap-1">
                {dashboardMenu.map(item => (
                  <Link key={item.href} to={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors group">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{item.label}</span>
                      <span className="text-[10px] text-slate-500">{item.desc}</span>
                    </div>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Foro Recuadro Amarillo Neón */}
            <div className="bg-[#0e0e15]/90 backdrop-blur border border-yellow-500/30 hover:border-yellow-500/60 shadow-[0_0_15px_rgba(234,179,8,0.03)] hover:shadow-[0_0_20px_rgba(234,179,8,0.1)] rounded-3xl p-5 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 blur-3xl -mr-12 -mt-12 rounded-full"></div>
              
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-xs uppercase tracking-[0.2em] text-yellow-500 font-black flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-yellow-500 animate-pulse animate-duration-1000" />
                  Debates del Foro
                </h3>
                <Link to="/forum" className="text-[10px] font-black uppercase text-slate-400 hover:text-yellow-500 transition-colors">
                  Ver Todo
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                {forumPosts.length === 0 ? (
                  <p className="text-xs text-slate-500 italic px-2">No hay debates activos.</p>
                ) : (
                  forumPosts.map(post => (
                    <Link 
                      key={post.id} 
                      to={`/blog/${post.category}/${post.slug}`}
                      className="p-3 bg-white/[0.01] border border-white/5 hover:border-yellow-500/20 hover:bg-yellow-500/[0.01] rounded-xl flex flex-col gap-1.5 transition-all group/post"
                    >
                      <span className="text-xs font-semibold text-slate-300 group-hover/post:text-yellow-400 transition-colors line-clamp-2 leading-relaxed">
                        {post.title}
                      </span>
                      <div className="flex items-center justify-between mt-1 text-[9px] text-slate-500 font-medium">
                        <span className="uppercase bg-yellow-500/10 text-yellow-500/80 border border-yellow-500/20 px-1.5 py-0.5 rounded-md font-bold">
                          {post.category || 'General'}
                        </span>
                        <span className="font-semibold uppercase tracking-tighter">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
            
            <button onClick={handleLogout} className="w-full py-3 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-xl text-xs font-semibold uppercase tracking-widest transition-all border border-transparent hover:border-red-500/20 flex justify-center items-center gap-2">
               Cerrar Módulo de Conexión
            </button>

          </aside>

          {/* ── Right Main Dashboard ── */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Header Area */}
            <header className="flex justify-between items-end border-b border-white/10 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white font-headline">Panel Central Lumina</h2>
                <p className="text-sm text-slate-400">Analíticas en tiempo real y progresión.</p>
              </div>
            </header>

            {/* Top Grid: XP & Status */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Main XP Card */}
              <div className="col-span-1 md:col-span-8 bg-[#0e0e15] border border-white/5 p-6 rounded-3xl relative overflow-hidden flex flex-col justify-center">
                 <div className="absolute right-0 top-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl -mr-20 -mt-20" />
                 <div className="flex justify-between items-end mb-4 relative z-10">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-purple-400 block mb-1">Ruta de Aprendizaje</span>
                    <span className="text-3xl font-extrabold text-white">{profile?.xp || 0} <span className="text-slate-500 text-sm font-normal">XP de {rank.next || 'MAX'}</span></span>
                  </div>
                  {rank.next && (
                    <span className="text-xs text-slate-400 font-medium">Nivel {Math.floor((profile?.xp || 10) / 100) + 1}</span>
                  )}
                </div>
                <Progress 
                  value={rank.next ? ((profile?.xp || 0) / rank.next) * 100 : 100} 
                  className="h-2.5 bg-black ring-1 ring-white/5 rounded-full" 
                  indicatorColor="bg-gradient-to-r from-purple-500 to-cyan-400"
                />
              </div>

              {/* Status Nodes */}
              <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
                <div className="bg-[#0e0e15] border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div>
                    <span className="text-xs text-slate-400 font-medium mb-1 block">Artículos Creados</span>
                    <span className="text-xl font-bold text-cyan-400">{stats.articles}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20"><FileText className="w-5 h-5 text-cyan-400" /></div>
                </div>
                <div className="bg-[#0e0e15] border border-white/5 p-4 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div>
                    <span className="text-xs text-slate-400 font-medium mb-1 block">Misiones (Guías)</span>
                    <span className="text-xl font-bold text-fuchsia-400">{stats.guides}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-fuchsia-500/10 flex items-center justify-center border border-fuchsia-500/20"><Award className="w-5 h-5 text-fuchsia-400" /></div>
                </div>
              </div>
            </div>

            {/* Admin Social Hub & Scheduler */}
            {profile?.role === 'admin' && (
              <div className="mt-2 animate-fadeIn">
                <AdminSocialHub />
              </div>
            )}

            {/* Secondary Grid (Trophies & Quests) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              
              {/* Trophies Gallery */}
              <div className="bg-[#0e0e15] border border-white/5 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" /> Galería de Reliquias
                  </h3>
                  <button className="text-xs font-bold text-purple-400 hover:text-purple-300">Ver todas</button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {[
                      { key: 'first_post', label: 'Iniciador', icon: '✍️', desc: 'Primer Artículo', active: stats.articles > 0 },
                      { key: 'commenter', label: 'Debatiente', icon: '💬', desc: '5 Comentarios', active: stats.comments >= 5 },
                      { key: 'guides', label: 'Pionero', icon: '🎓', desc: '3 Guías Completadas', active: stats.guides >= 3 },
                      { key: 'high_xp', label: 'Ascendido', icon: '🚀', desc: '+1000 XP Total', active: (profile?.xp || 0) >= 1000 },
                  ].map(trophy => (
                      <div key={trophy.key} className={`relative p-4 rounded-2xl border transition-all overflow-hidden ${trophy.active ? 'bg-gradient-to-b from-[#161420] to-[#0e0e15] border-purple-500/30' : 'bg-black/20 border-white/5 grayscale opacity-50'}`}>
                          {trophy.active && <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 blur-xl rounded-full" />}
                          <div className={`text-2xl mb-2 flex items-center justify-center w-10 h-10 rounded-xl ${trophy.active ? 'bg-white/5 border border-white/10' : 'bg-transparent'}`}>{trophy.icon}</div>
                          <h4 className="text-sm font-bold text-white mb-0.5">{trophy.label}</h4>
                          <p className="text-[10px] text-slate-500">{trophy.desc}</p>
                      </div>
                  ))}
                </div>
              </div>

              {/* Current Quests */}
              <div className="bg-[#0e0e15] border border-white/5 rounded-3xl p-6">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" /> Misiones Activas
                </h3>
                
                <div className="space-y-3">
                  {/* Quest 1 */}
                  <div className="bg-black/40 border border-white/5 p-4 rounded-2xl flex items-start gap-4 hover:border-white/10 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Actualizar Arsenal Técnico</h4>
                      <p className="text-xs text-slate-500 mt-1">Completa tu perfil al 100% añadiendo al menos una habilidad para obtener +20 XP.</p>
                    </div>
                  </div>
                  {/* Quest 2 */}
                  <Link to="/resources" className="bg-black/40 border border-white/5 p-4 rounded-2xl flex items-start gap-4 hover:border-cyan-500/20 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">Decodificación de Conocimiento</h4>
                      <p className="text-xs text-slate-500 mt-1">Completa la guía de "Google AI Studio 2026" para un multiplicador de conocimiento.</p>
                    </div>
                  </Link>
                </div>
              </div>

            </div>

            {/* Editor de Debates estilo Facebook (Rectángulo Amarillo) */}
            <FacebookStyleEditor onPostCreated={fetchForumFeed} />

            {/* Actividad Reciente del Foro (Rectángulo Verde) */}
            <div className="mt-6 bg-[#0e0e15]/95 border border-emerald-500/20 hover:border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.02)] hover:shadow-[0_0_30px_rgba(16,185,129,0.08)] rounded-3xl p-6 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -mr-16 -mt-16 rounded-full pointer-events-none"></div>

              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <MessageSquare className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base tracking-tight text-white">Últimos Debates del Foro</h3>
                    <p className="text-xs text-slate-500">Únete a la conversación con la comunidad.</p>
                  </div>
                </div>
                <Link to="/forum" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-400 transition-colors border border-white/5 hover:border-emerald-500/30 px-4 py-2 rounded-xl bg-white/[0.02]">
                  Ver Foro Completo
                </Link>
              </div>

              <div className="space-y-4">
                {forumFeed.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 italic text-sm">
                    No hay publicaciones recientes en el foro. ¡Sé el primero en iniciar un debate!
                  </div>
                ) : (
                  forumFeed.map(post => {
                    const authorName = post.profiles?.full_name || post.profiles?.username || 'Growther';
                    const authorAvatar = post.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=10B981&color=fff`;
                    const categoryColors = {
                      'SEO': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
                      'Web Dev': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
                      'Herramientas AI': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
                      'Growth': 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    };
                    const pillClass = categoryColors[post.category] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';

                    return (
                      <div 
                        key={post.id} 
                        className="p-5 bg-black/30 border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/[0.01] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 group/feed-item"
                      >
                        <div className="flex items-start gap-4 flex-1">
                          {/* Author Avatar */}
                          <div className="w-11 h-11 rounded-full overflow-hidden border border-white/10 shrink-0 relative group-hover/feed-item:border-emerald-500/30 transition-colors">
                            <img src={authorAvatar} alt={authorName} className="w-full h-full object-cover" />
                          </div>
                          
                          {/* Post details */}
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${pillClass}`}>
                                {post.category || 'General'}
                              </span>
                              <span className="text-[10px] text-slate-500 font-bold uppercase">
                                Por <span className="text-slate-400 font-extrabold">{authorName}</span>
                              </span>
                              {post.profiles?.custom_badge && (
                                <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                                  {post.profiles.custom_badge}
                                </span>
                              )}
                            </div>
                            
                            <h4 className="font-extrabold text-sm text-white group-hover/feed-item:text-emerald-400 transition-colors leading-snug">
                              <Link to={`/blog/${post.category}/${post.slug}`}>
                                {post.title}
                              </Link>
                            </h4>
                            
                            {post.summary && (
                              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-light">
                                {post.summary}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Action and Metadata on the right */}
                        <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0 pt-3 md:pt-0 border-t border-white/5 md:border-t-0">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                            {new Date(post.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          
                          <Link 
                            to={`/blog/${post.category}/${post.slug}`} 
                            className="flex items-center gap-1.5 bg-white/5 hover:bg-emerald-500 hover:text-black border border-white/5 hover:border-transparent px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 active:scale-95"
                          >
                            Unirse
                          </Link>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
