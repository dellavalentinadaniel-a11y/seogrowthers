import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle, Briefcase, FileText, Link as LinkIcon } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { trackFormSubmit } from '@/lib/analytics';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const CareersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    cv_url: '',
    portfolio_url: '',
    cover_letter: '',
    website_url: '', // Honeypot
    privacy: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = "El nombre debe tener al menos 2 caracteres.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email inválido.";
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,10}$/.test(formData.phone)) {
       newErrors.phone = "Formato de teléfono inválido.";
    }
    if (!formData.position) newErrors.position = "Selecciona un puesto de interés.";
    if (!formData.cv_url) {
      newErrors.cv_url = "Debes ingresar el enlace a tu CV o perfil de LinkedIn.";
    } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.cv_url)) {
      newErrors.cv_url = "Ingresa una URL válida.";
    }
    if (formData.portfolio_url && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.portfolio_url)) {
      newErrors.portfolio_url = "Ingresa una URL de portafolio válida.";
    }
    if (!formData.privacy) newErrors.privacy = "Debes aceptar los términos de privacidad.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Honeypot check
    if (formData.website_url) {
        setSubmitStatus('success');
        return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const recordId = crypto.randomUUID();

      const finalMessage = `--- DETALLES DE POSTULACIÓN DE EMPLEO ---
Puesto de Interés: ${formData.position}
Nombre del Candidato: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone || 'No especificado'}
Enlace CV/LinkedIn: ${formData.cv_url}
Enlace Portafolio (Opcional): ${formData.portfolio_url || 'No especificado'}
-----------------------------------------

Mensaje de Presentación (Carta):
${formData.cover_letter || 'Sin mensaje adicional.'}
`;

      // 1. Insertar en Supabase
      const { error: insertError } = await supabase
        .from('contact_submissions')
        .insert([{
          id: recordId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Postulación Laboral: ${formData.position}`,
          message: finalMessage,
          status: 'pending',
          user_agent: navigator.userAgent
        }]);

      if (insertError) throw new Error("Error al guardar la postulación. Inténtalo de nuevo.");

      // 2. Ejecutar la Edge Function
      const { data: funcData, error: funcError } = await supabase.functions.invoke('send-contact-email', {
        body: { 
            record_id: recordId,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: `Postulación Laboral - ${formData.position}`,
            message: finalMessage
        }
      });

      if (funcError) throw new Error(funcError.message || "Error al enviar la postulación por correo.");
      if (funcData && !funcData.success) throw new Error(funcData.error || "Fallo del servidor de correo.");

      // Éxito
      trackFormSubmit('career_postulation_form', { position: formData.position });
      setSubmitStatus('success');
      toast({
        title: "¡Postulación enviada!",
        description: "Hemos recibido tu currículum. Si tu perfil se adapta, nos contactaremos pronto.",
        className: "bg-green-600 border-none text-white"
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        cv_url: '',
        portfolio_url: '',
        cover_letter: '',
        website_url: '',
        privacy: false
      });

    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage(err.message || "Hubo un problema. Inténtalo de nuevo.");
      toast({
        title: "Error al enviar",
        description: err.message || "Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <Helmet>
        <title>Trabaja con Nosotros | Únete al Equipo de SEO Growthers</title>
        <meta name="description" content="Únete al equipo de SEO Growthers. Buscamos profesionales apasionados por el SEO, Desarrollo Web, Automatización con IA y Marketing de Crecimiento. Envíanos tu CV." />
        <link rel="canonical" href="https://seogrowthers.com/trabaja-con-nosotros" />
        <meta property="og:title" content="Trabaja con Nosotros | SEO Growthers" />
        <meta property="og:description" content="Buscamos talentos apasionados por el SEO y el desarrollo. Envíanos tu CV hoy." />
      </Helmet>

      <ScrollToTop />

      <main className="pt-32 pb-32 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        <Breadcrumbs className="mb-4" />
        
        {/* Hero */}
        <section className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/40 border border-cyan-500/25 backdrop-blur-md mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="font-label text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-black">BÚSQUEDA ACTIVA</span>
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-white mb-6">
            Únete al Equipo de <span className="text-cyan-400">SEO Growthers</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Buscamos profesionales dinámicos y hambrientos de crecimiento para escalar marcas internacionales con SEO de élite, desarrollo moderno y automatizaciones inteligentes.
          </p>
        </section>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Side */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#1a1c1e] rounded-2xl p-6 border border-white/5 space-y-4 shadow-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Briefcase size={20} />
              </div>
              <h3 className="font-headline text-xl font-bold text-white">¿Por qué unirte?</h3>
              <ul className="space-y-3 text-sm text-gray-400 leading-relaxed font-light">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span> Trabajo 100% remoto y flexible.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span> Proyectos de alto rendimiento con marcas reales.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span> Capacitación continua en IA y metodologías ágiles.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span> Ambiente de ingeniería con enfoque en datos.
                </li>
              </ul>
            </div>

            <div className="bg-[#1a1c1e] rounded-2xl p-6 border border-white/5 space-y-4 shadow-lg">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                <FileText size={20} />
              </div>
              <h3 className="font-headline text-xl font-bold text-white">Perfiles de interés</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Buscamos constantemente consultores SEO locales y técnicos, programadores React/Node, redactores SEO de contenido estructurado y diseñadores de interfaces UX/UI minimalistas.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/60 backdrop-blur-3xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              {submitStatus === 'success' ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 mx-auto border border-green-500/20">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline text-2xl font-bold text-white">¡Postulación Enviada!</h3>
                    <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                      Muchas gracias por postularte. Hemos recibido tu información y tu CV en nuestro sistema. Un evaluador de talento analizará tu perfil y te contactará si coincide con nuestras búsquedas activas.
                    </p>
                  </div>
                  <div className="pt-4">
                    <Link to="/about" className="inline-flex items-center justify-center px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl text-xs uppercase font-headline tracking-widest hover:bg-white/10 transition-colors">
                      Volver a quiénes somos
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot Field */}
                  <input
                    type="text"
                    name="website_url"
                    value={formData.website_url}
                    onChange={(e) => handleChange('website_url', e.target.value)}
                    className="hidden"
                    autoComplete="off"
                  />

                  <h3 className="font-headline text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-cyan-400 font-bold">assignment_ind</span>
                    Completa tu candidatura
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">Nombre Completo <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-6 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Nombre y apellido"
                        disabled={isSubmitting}
                      />
                      {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">Correo Electrónico <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-6 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="correo@ejemplo.com"
                        disabled={isSubmitting}
                      />
                      {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">Teléfono o WhatsApp <span className="text-xs text-gray-500 normal-case tracking-normal">(Opcional)</span></Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-6 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="+54 9 ..."
                        disabled={isSubmitting}
                      />
                      {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">Puesto de Interés <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.position}
                        onValueChange={(val) => handleChange('position', val)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-6 text-white focus:ring-1 focus:ring-cyan-400 outline-none transition-all ${errors.position ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Selecciona el perfil" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border border-white/10 text-white">
                          <SelectItem value="SEO Specialist / Consultor">SEO Specialist / Consultor</SelectItem>
                          <SelectItem value="Desarrollador Web (React/Node)">Desarrollador Web (React/Node)</SelectItem>
                          <SelectItem value="Diseñador UX/UI">Diseñador UX/UI</SelectItem>
                          <SelectItem value="Redactor SEO de Contenidos">Redactor SEO de Contenidos</SelectItem>
                          <SelectItem value="Project Manager / Ops">Project Manager / Ops</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.position && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.position}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cv_url" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1 flex items-center gap-1.5">
                      <LinkIcon size={12} className="text-cyan-400" />
                      Enlace a tu CV / LinkedIn <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="cv_url"
                      value={formData.cv_url}
                      onChange={(e) => handleChange('cv_url', e.target.value)}
                      className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-6 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all font-mono text-sm ${errors.cv_url ? 'border-red-500' : ''}`}
                      placeholder="https://drive.google.com/... o https://linkedin.com/in/..."
                      disabled={isSubmitting}
                    />
                    <p className="text-[10px] text-gray-500 ml-1">Puedes compartir un enlace público de Google Drive, LinkedIn, Dropbox, Notion, etc.</p>
                    {errors.cv_url && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.cv_url}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="portfolio_url" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1 flex items-center gap-1.5">
                      <LinkIcon size={12} className="text-cyan-400" />
                      Enlace a tu Portfolio / Sitio Web <span className="text-xs text-gray-500 normal-case tracking-normal">(Opcional)</span>
                    </Label>
                    <Input
                      id="portfolio_url"
                      value={formData.portfolio_url}
                      onChange={(e) => handleChange('portfolio_url', e.target.value)}
                      className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-6 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all font-mono text-sm ${errors.portfolio_url ? 'border-red-500' : ''}`}
                      placeholder="https://github.com/... o https://behance.net/..."
                      disabled={isSubmitting}
                    />
                    {errors.portfolio_url && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.portfolio_url}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cover_letter" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">Carta de Presentación / Mensaje <span className="text-xs text-gray-500 normal-case tracking-normal">(Opcional)</span></Label>
                    <Textarea
                      id="cover_letter"
                      value={formData.cover_letter}
                      onChange={(e) => handleChange('cover_letter', e.target.value)}
                      className="bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all font-body min-h-[120px] resize-none"
                      placeholder="Cuéntanos un poco sobre ti, tu experiencia y por qué quieres unirte a SEO Growthers..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacy}
                      onCheckedChange={(checked) => handleChange('privacy', checked)}
                      disabled={isSubmitting}
                      className={`border-white/30 data-[state=checked]:bg-[#00E5FF] data-[state=checked]:border-[#00E5FF] ${errors.privacy ? 'border-red-500' : ''}`}
                    />
                    <Label htmlFor="privacy" className="text-xs text-gray-400 leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Acepto los <a href="/terms-of-service" className="text-[#00E5FF] hover:underline">términos de servicio</a> y la <a href="/privacy-policy" className="text-[#00E5FF] hover:underline">política de privacidad</a>.
                    </Label>
                  </div>
                  {errors.privacy && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.privacy}</p>}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400 text-xs font-bold">
                      <AlertCircle size={16} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#00E5FF] hover:bg-[#00c8e0] text-[#0C0D0D] font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:active:scale-100 uppercase tracking-widest text-xs font-headline"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> PROCESANDO CANDIDATURA...</>
                    ) : (
                      <>
                        <span>Enviar Candidatura</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default CareersPage;
