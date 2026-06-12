import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, Monitor, Search, BarChart3, Award, Sparkles, TrendingUp, Code2, Target, Zap, ArrowUpRight } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { trackFormSubmit } from '@/lib/analytics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const serviceNames = {
  seo: 'SEO y Posicionamiento',
  desarrollo: 'Desarrollo Web / E-commerce',
  marketing: 'Marketing Digital / Paid Ads',
  auditoria: 'Auditoría SEO Gratuita'
};

const LeadQualifierForm = ({ initialService = null }) => {
  const [service, setService] = useState(initialService);
  const [step, setStep] = useState(initialService ? 1 : 0); // Si hay servicio inicial, empieza en paso 1
  const [formData, setFormData] = useState({
    seo: {
      website_url: '',
      budget: '',
      challenge: ''
    },
    desarrollo: {
      project_type: '',
      has_design: '',
      budget: ''
    },
    marketing: {
      channels: [],
      budget: ''
    },
    auditoria: {
      website_url: '',
      challenge: ''
    },
    general: {
      name: '',
      email: '',
      phone: '',
      message: '',
      privacy: false,
      website_url: '' // Honeypot
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  const handleServiceSelect = (selectedService) => {
    setService(selectedService);
    setStep(1);
    setErrors({});
  };

  const handleGoBack = () => {
    if (step === 1 && !initialService) {
      setStep(0);
      setService(null);
    } else if (step > 1) {
      setStep(step - 1);
    }
    setErrors({});
  };

  const validateStep1 = () => {
    const stepErrors = {};
    if (service === 'seo') {
      if (!formData.seo.website_url) {
        stepErrors.website_url = 'La URL de tu sitio web es requerida.';
      } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.seo.website_url)) {
        stepErrors.website_url = 'Ingresa una URL válida.';
      }
      if (!formData.seo.budget) {
        stepErrors.budget = 'Selecciona un rango de inversión.';
      }
    } else if (service === 'desarrollo') {
      if (!formData.desarrollo.project_type) {
        stepErrors.project_type = 'Selecciona el tipo de proyecto.';
      }
      if (!formData.desarrollo.has_design) {
        stepErrors.has_design = 'Indica si posees diseño o identidad de marca.';
      }
      if (!formData.desarrollo.budget) {
        stepErrors.budget = 'Selecciona un rango de presupuesto.';
      }
    } else if (service === 'marketing') {
      if (formData.marketing.channels.length === 0) {
        stepErrors.channels = 'Selecciona al menos un canal de interés.';
      }
      if (!formData.marketing.budget) {
        stepErrors.budget = 'Selecciona un rango de inversión.';
      }
    } else if (service === 'auditoria') {
      if (!formData.auditoria.website_url) {
        stepErrors.website_url = 'La URL de tu sitio web es requerida.';
      } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.auditoria.website_url)) {
        stepErrors.website_url = 'Ingresa una URL válida.';
      }
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const validateStep2 = () => {
    const stepErrors = {};
    if (!formData.general.name || formData.general.name.length < 2) {
      stepErrors.name = 'El nombre debe tener al menos 2 caracteres.';
    }
    if (!formData.general.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.general.email)) {
      stepErrors.email = 'Ingresa un email válido.';
    }
    if (formData.general.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,10}$/.test(formData.general.phone)) {
      stepErrors.phone = 'Formato de teléfono inválido.';
    }
    if (!formData.general.privacy) {
      stepErrors.privacy = 'Debes aceptar las políticas de privacidad.';
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleChannelChange = (channel, checked) => {
    setFormData(prev => {
      const currentChannels = [...prev.marketing.channels];
      if (checked) {
        currentChannels.push(channel);
      } else {
        const index = currentChannels.indexOf(channel);
        if (index > -1) currentChannels.splice(index, 1);
      }
      return {
        ...prev,
        marketing: {
          ...prev.marketing,
          channels: currentChannels
        }
      };
    });
    if (errors.channels) {
      setErrors(prev => ({ ...prev, channels: null }));
    }
  };

  const handleNestedChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Determinar si es un lead de baja inversión
  const isLowTierLead = () => {
    if (service === 'seo' && formData.seo.budget === 'Menos de $200 USD/mes') return true;
    if (service === 'desarrollo' && formData.desarrollo.budget === 'Menos de $400 USD') return true;
    if (service === 'marketing' && formData.marketing.budget === 'Menos de $300 USD/mes') return true;
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    // Honeypot check
    if (formData.general.website_url) {
      setSubmitStatus('success');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const recordId = crypto.randomUUID();

      // Formatear el mensaje estructurado de calificación
      let qualificationDetails = `--- DETALLES DE CALIFICACIÓN DE LEAD ---
Servicio: ${serviceNames[service]}
`;

      if (service === 'seo') {
        qualificationDetails += `- URL del sitio: ${formData.seo.website_url}
- Rango de Inversión Mensual: ${formData.seo.budget}
- Desafío Técnico: ${formData.seo.challenge || 'No especificado'}
`;
      } else if (service === 'desarrollo') {
        qualificationDetails += `- Tipo de Web: ${formData.desarrollo.project_type}
- Cuenta con Diseño/Branding: ${formData.desarrollo.has_design}
- Inversión Única Estimada: ${formData.desarrollo.budget}
`;
      } else if (service === 'marketing') {
        qualificationDetails += `- Canales Seleccionados: ${formData.marketing.channels.join(', ')}
- Inversión Mensual en Pauta: ${formData.marketing.budget}
`;
      } else if (service === 'auditoria') {
        qualificationDetails += `- URL del sitio a auditar: ${formData.auditoria.website_url}
- Preocupación SEO Principal: ${formData.auditoria.challenge || 'No especificado'}
`;
      }

      qualificationDetails += `--------------------------------------\n\n`;
      
      const finalMessage = `${qualificationDetails}Mensaje Adicional del Cliente:\n${formData.general.message || 'Sin mensaje adicional.'}`;

      const subjectText = service === 'auditoria' 
        ? `Solicitud: Auditoría SEO Gratis - ${formData.auditoria.website_url}`
        : `Consulta Calificada: ${serviceNames[service]}`;

      // 1. Insertar en Supabase
      const { error: insertError } = await supabase
        .from('contact_submissions')
        .insert([{
          id: recordId,
          name: formData.general.name,
          email: formData.general.email,
          phone: formData.general.phone,
          subject: subjectText,
          message: finalMessage,
          status: 'pending',
          user_agent: navigator.userAgent
        }]);

      if (insertError) throw new Error('Error al guardar tu consulta en el servidor. Por favor reintenta.');

      // 2. Ejecutar la Edge Function para notificar por email
      const { data: funcData, error: funcError } = await supabase.functions.invoke('send-contact-email', {
        body: {
          record_id: recordId,
          name: formData.general.name,
          email: formData.general.email,
          phone: formData.general.phone,
          subject: service === 'auditoria' ? 'Nueva Solicitud de Auditoría SEO Gratis' : `Lead Calificado - ${serviceNames[service]}`,
          message: finalMessage
        }
      });

      if (funcError) throw new Error(funcError.message || 'Error al enviar notificaciones por correo.');
      if (funcData && !funcData.success) throw new Error(funcData.error || 'Fallo en el servidor de correos.');

      // Éxito: Tracking y Feedback
      trackFormSubmit('lead_qualifier_form', { service, isLowTier: isLowTierLead() });
      setSubmitStatus('success');

      toast({
        title: service === 'auditoria' ? "¡Auditoría Solicitada!" : "¡Consulta recibida con éxito!",
        description: service === 'auditoria'
          ? "Analizaremos tu sitio web. Recibirás tu reporte en menos de 48 horas."
          : isLowTierLead() 
            ? "Hemos registrado tus datos. Te enviamos recursos exclusivos a tu correo." 
            : "Un consultor senior analizará tu caso y te contactará en menos de 24 horas.",
        className: "bg-green-600 border-none text-white"
      });

    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Hubo un problema procesando tu formulario.');
      toast({
        title: "Error al enviar",
        description: err.message || "Por favor reintenta en unos instantes.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(initialService ? 1 : 0);
    setService(initialService);
    setSubmitStatus(null);
    setFormData({
      seo: { website_url: '', budget: '', challenge: '' },
      desarrollo: { project_type: '', has_design: '', budget: '' },
      marketing: { channels: [], budget: '' },
      auditoria: { website_url: '', challenge: '' },
      general: { name: '', email: '', phone: '', message: '', privacy: false, website_url: '' }
    });
    setErrors({});
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-3xl p-6 md:p-12 rounded-3xl md:rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E5FF] via-emerald-400 to-[#00E5FF]"></div>
      
      <AnimatePresence mode="wait">
        
        {/* PASO 0: SELECCIÓN DE SERVICIO */}
        {step === 0 && (
          <motion.div
            key="step-select-service"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 to-transparent flex items-center justify-center text-[#00E5FF] border border-[#00E5FF]/20 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                <Sparkles size={22} className="animate-pulse" />
              </div>
              <div>
                <h2 className="font-headline text-2xl md:text-3xl font-black text-white tracking-tight">
                  ¿Qué solución necesita tu negocio?
                </h2>
                <p className="text-slate-400 text-xs md:text-sm mt-1 font-light">
                  Selecciona el área de tu interés para personalizar tu hoja de ruta estratégica.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
              
              {/* Tarjeta SEO */}
              <button
                type="button"
                onClick={() => handleServiceSelect('seo')}
                className="relative bg-gradient-to-b from-[#131525]/90 to-[#0c0d16]/95 hover:bg-gradient-to-b hover:from-[#171a32]/95 hover:to-[#0f1120]/98 border border-white/[0.06] hover:border-cyan-500/40 rounded-[2rem] p-8 text-left transition-all duration-300 group flex flex-col justify-between min-h-[190px] hover:shadow-[0_20px_50px_-12px_rgba(6,182,212,0.15)] hover:-translate-y-1.5 cursor-pointer overflow-hidden"
              >
                {/* Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start justify-between w-full relative z-10">
                  {/* Contenedor del Icono Premium */}
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all duration-300">
                    <div className="absolute inset-2 rounded-xl bg-cyan-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <TrendingUp className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Flecha indicadora */}
                  <div className="w-8 h-8 rounded-full border border-white/5 bg-[#121320] flex items-center justify-center text-gray-500 group-hover:text-cyan-400 group-hover:border-cyan-500/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <div className="mt-8 relative z-10">
                  <h3 className="text-white font-headline font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                    SEO y Posicionamiento
                  </h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed group-hover:text-slate-300 transition-colors">
                    Posiciona tu marca en Google, domina las búsquedas locales y atrae tráfico orgánico calificado.
                  </p>
                </div>
              </button>

              {/* Tarjeta Desarrollo */}
              <button
                type="button"
                onClick={() => handleServiceSelect('desarrollo')}
                className="relative bg-gradient-to-b from-[#131525]/90 to-[#0c0d16]/95 hover:bg-gradient-to-b hover:from-[#14261d]/95 hover:to-[#0d1612]/98 border border-white/[0.06] hover:border-emerald-500/40 rounded-[2rem] p-8 text-left transition-all duration-300 group flex flex-col justify-between min-h-[190px] hover:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.15)] hover:-translate-y-1.5 cursor-pointer overflow-hidden"
              >
                {/* Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start justify-between w-full relative z-10">
                  {/* Contenedor del Icono Premium */}
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300">
                    <div className="absolute inset-2 rounded-xl bg-emerald-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <Code2 className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Flecha indicadora */}
                  <div className="w-8 h-8 rounded-full border border-white/5 bg-[#121320] flex items-center justify-center text-gray-500 group-hover:text-emerald-400 group-hover:border-emerald-500/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <div className="mt-8 relative z-10">
                  <h3 className="text-white font-headline font-bold text-lg mb-2 group-hover:text-emerald-400 transition-colors">
                    Desarrollo Web
                  </h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed group-hover:text-slate-300 transition-colors">
                    Páginas corporativas, landing pages de conversión y tiendas online con SEO y velocidad extrema.
                  </p>
                </div>
              </button>

              {/* Tarjeta Marketing */}
              <button
                type="button"
                onClick={() => handleServiceSelect('marketing')}
                className="relative bg-gradient-to-b from-[#131525]/90 to-[#0c0d16]/95 hover:bg-gradient-to-b hover:from-[#211732]/95 hover:to-[#120f20]/98 border border-white/[0.06] hover:border-purple-500/40 rounded-[2rem] p-8 text-left transition-all duration-300 group flex flex-col justify-between min-h-[190px] hover:shadow-[0_20px_50px_-12px_rgba(168,85,247,0.15)] hover:-translate-y-1.5 cursor-pointer overflow-hidden"
              >
                {/* Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start justify-between w-full relative z-10">
                  {/* Contenedor del Icono Premium */}
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all duration-300">
                    <div className="absolute inset-2 rounded-xl bg-purple-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <Target className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Flecha indicadora */}
                  <div className="w-8 h-8 rounded-full border border-white/5 bg-[#121320] flex items-center justify-center text-gray-500 group-hover:text-purple-400 group-hover:border-purple-500/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <div className="mt-8 relative z-10">
                  <h3 className="text-white font-headline font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">
                    Paid Ads & Marketing
                  </h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed group-hover:text-slate-300 transition-colors">
                    Estrategias de adquisición paga y campañas en Google Ads, Meta Ads y LinkedIn Ads orientadas al ROI.
                  </p>
                </div>
              </button>

              {/* Tarjeta Auditoría SEO Gratis */}
              <button
                type="button"
                onClick={() => handleServiceSelect('auditoria')}
                className="relative bg-gradient-to-b from-[#131525]/90 to-[#0c0d16]/95 hover:bg-gradient-to-b hover:from-[#292015]/95 hover:to-[#17110c]/98 border border-[#eab308]/20 hover:border-amber-500/40 rounded-[2rem] p-8 text-left transition-all duration-300 group flex flex-col justify-between min-h-[190px] hover:shadow-[0_20px_50px_-12px_rgba(245,158,11,0.15)] hover:-translate-y-1.5 cursor-pointer overflow-hidden"
              >
                {/* Ambient Glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start justify-between w-full relative z-10">
                  {/* Contenedor del Icono Premium */}
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 group-hover:border-amber-500/30 group-hover:bg-amber-500/10 transition-all duration-300">
                    <div className="absolute inset-2 rounded-xl bg-amber-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <Zap className="w-6 h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Badge Premium 48hs */}
                  <span className="relative flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full text-[10px] font-black uppercase tracking-wider shadow-[0_4px_12px_rgba(245,158,11,0.1)] group-hover:border-amber-500/40 group-hover:bg-amber-500/20 transition-all duration-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    48 HS
                  </span>
                </div>

                <div className="mt-8 relative z-10">
                  <h3 className="text-amber-400 font-headline font-bold text-lg mb-2 group-hover:text-amber-300 transition-colors">
                    Auditoría SEO Gratis
                  </h3>
                  <p className="text-slate-400 text-xs font-light leading-relaxed group-hover:text-slate-300 transition-colors">
                    Descubre errores técnicos invisibles, velocidad de carga y palabras clave con potencial de forma 100% gratuita.
                  </p>
                </div>
              </button>

            </div>
          </motion.div>
        )}

        {/* PASO 1: PREGUNTAS DE CALIFICACIÓN POR SERVICIO */}
        {step === 1 && (
          <motion.div
            key={`step-qualifier-${service}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00E5FF]">
                Paso 1 de 2: Calificación de Proyecto
              </span>
              <span className="text-xs text-gray-500 font-bold">{serviceNames[service]}</span>
            </div>

            {/* SECCIÓN SEO */}
            {service === 'seo' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="website_url" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">URL de tu sitio web <span className="text-red-500">*</span></Label>
                  <Input
                    id="website_url"
                    value={formData.seo.website_url}
                    onChange={(e) => handleNestedChange('seo', 'website_url', e.target.value)}
                    className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-4 md:py-6 text-white focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all font-mono text-sm ${errors.website_url ? 'border-red-500' : ''}`}
                    placeholder="https://tuempresa.com"
                  />
                  {errors.website_url && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.website_url}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo_budget" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">Inversión mensual estimada en SEO <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.seo.budget}
                    onValueChange={(val) => handleNestedChange('seo', 'budget', val)}
                  >
                    <SelectTrigger className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-6 text-white focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all ${errors.budget ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Selecciona el rango de inversión" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border border-white/10 text-white">
                      <SelectItem value="Menos de $200 USD/mes">Menos de $200 USD/mes (Inicial / Autoaprendizaje)</SelectItem>
                      <SelectItem value="$200 - $600 USD/mes">$200 - $600 USD/mes (Crecimiento Activo)</SelectItem>
                      <SelectItem value="$600+ USD/mes">$600+ USD/mes (Estrategia Avanzada Corporativa)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.budget && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.budget}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seo_challenge" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">¿Cuál es tu mayor desafío técnico o SEO actualmente? (Opcional)</Label>
                  <Textarea
                    id="seo_challenge"
                    value={formData.seo.challenge}
                    onChange={(e) => handleNestedChange('seo', 'challenge', e.target.value)}
                    className="bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all font-body min-h-[100px] resize-none"
                    placeholder="Ej: Caída de posiciones, la web carga lento, no indexa en Google, etc."
                  />
                </div>
              </div>
            )}

            {/* SECCIÓN DESARROLLO WEB */}
            {service === 'desarrollo' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">Tipo de proyecto web <span className="text-red-500">*</span></Label>
                    <Select
                      value={formData.desarrollo.project_type}
                      onValueChange={(val) => handleNestedChange('desarrollo', 'project_type', val)}
                    >
                      <SelectTrigger className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-6 text-white focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all ${errors.project_type ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border border-white/10 text-white">
                        <SelectItem value="Landing Page / Embudo">Landing Page / Embudo de Ventas</SelectItem>
                        <SelectItem value="Web Corporativa / Institucional">Web Corporativa / Institucional</SelectItem>
                        <SelectItem value="E-commerce / Tienda Online">E-commerce / Tienda Online</SelectItem>
                        <SelectItem value="Plataforma Web a Medida">Plataforma Web a Medida</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.project_type && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.project_type}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">¿Cuentas con Branding/Diseño? <span className="text-red-500">*</span></Label>
                    <Select
                      value={formData.desarrollo.has_design}
                      onValueChange={(val) => handleNestedChange('desarrollo', 'has_design', val)}
                    >
                      <SelectTrigger className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-6 text-white focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all ${errors.has_design ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border border-white/10 text-white">
                        <SelectItem value="Sí, tengo branding y designs Figma/mockups">Sí, tengo branding y designs Figma/mockups</SelectItem>
                        <SelectItem value="Tengo logotipo pero necesito diseño UX/UI">Tengo logotipo pero necesito diseño UX/UI</SelectItem>
                        <SelectItem value="No, empiezo de cero (Branding + Diseño + Web)">No, empiezo de cero (Branding + Diseño + Web)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.has_design && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.has_design}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">Presupuesto estimado del proyecto (Inversión única) <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.desarrollo.budget}
                    onValueChange={(val) => handleNestedChange('desarrollo', 'budget', val)}
                  >
                    <SelectTrigger className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-6 text-white focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all ${errors.budget ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Selecciona el presupuesto estimado" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border border-white/10 text-white">
                      <SelectItem value="Menos de $400 USD">Menos de $400 USD (Landing básica / Presupuesto limitado)</SelectItem>
                      <SelectItem value="$400 - $1,200 USD">$400 - $1,200 USD (Web Corporativa o E-commerce estándar)</SelectItem>
                      <SelectItem value="$1,200+ USD">$1,200+ USD (Plataforma Premium / Integraciones Complejas)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.budget && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.budget}</p>}
                </div>
              </div>
            )}

            {/* SECCIÓN MARKETING DIGITAL */}
            {service === 'marketing' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1 block">Canales publicitarios de interés <span className="text-red-500">*</span></Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0C0D0D] p-5 rounded-xl border border-white/5">
                    {[
                      { id: 'google_ads', label: 'Google Search & YouTube Ads' },
                      { id: 'meta_ads', label: 'Meta Ads (Instagram & Facebook)' },
                      { id: 'linkedin_ads', label: 'LinkedIn Ads (B2B)' },
                      { id: 'asesoramiento', label: 'No estoy seguro (Necesito asesoramiento)' }
                    ].map((channel) => (
                      <div key={channel.id} className="flex items-center gap-3">
                        <Checkbox
                          id={channel.id}
                          checked={formData.marketing.channels.includes(channel.label)}
                          onCheckedChange={(checked) => handleChannelChange(channel.label, checked)}
                          className="border-white/30 data-[state=checked]:bg-[#00E5FF] data-[state=checked]:border-[#00E5FF]"
                        />
                        <Label htmlFor={channel.id} className="text-sm text-gray-300 cursor-pointer">{channel.label}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.channels && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.channels}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">Inversión mensual estimada en pauta (Presupuesto publicitario) <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.marketing.budget}
                    onValueChange={(val) => handleNestedChange('marketing', 'budget', val)}
                  >
                    <SelectTrigger className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-6 text-white focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all ${errors.budget ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Selecciona el rango de inversión mensual" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border border-white/10 text-white">
                      <SelectItem value="Menos de $300 USD/mes">Menos de $300 USD/mes</SelectItem>
                      <SelectItem value="$300 - $1,000 USD/mes">$300 - $1,000 USD/mes</SelectItem>
                      <SelectItem value="$1,000+ USD/mes">$1,000+ USD/mes</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.budget && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.budget}</p>}
                </div>
              </div>
            )}

            {/* SECCIÓN AUDITORÍA SEO GRATIS */}
            {service === 'auditoria' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="audit_website" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">URL de tu sitio web a auditar <span className="text-red-500">*</span></Label>
                  <Input
                    id="audit_website"
                    value={formData.auditoria.website_url}
                    onChange={(e) => handleNestedChange('auditoria', 'website_url', e.target.value)}
                    className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-4 md:py-6 text-white focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all font-mono text-sm ${errors.website_url ? 'border-red-500' : ''}`}
                    placeholder="https://tuempresa.com"
                  />
                  {errors.website_url && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.website_url}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audit_challenge" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">¿Qué te preocupa de tu SEO actualmente? (Opcional)</Label>
                  <Textarea
                    id="audit_challenge"
                    value={formData.auditoria.challenge}
                    onChange={(e) => handleNestedChange('auditoria', 'challenge', e.target.value)}
                    className="bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all font-body min-h-[120px] resize-none"
                    placeholder="Ej. La web carga lento, no indexo en Google, no sé qué keywords usar..."
                  />
                </div>
              </div>
            )}

            {/* BOTONES DE NAVEGACIÓN */}
            <div className="flex gap-4 pt-4">
              {!initialService && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoBack}
                  className="bg-transparent border border-white/10 text-white hover:bg-white/5 rounded-xl px-6 py-5 flex items-center gap-2 cursor-pointer h-auto"
                >
                  <ArrowLeft size={16} /> Atrás
                </Button>
              )}
              <Button
                type="button"
                onClick={handleNextStep}
                className="bg-[#00E5FF] hover:bg-[#00c8e0] text-[#0C0D0D] font-bold rounded-xl px-8 py-5 flex items-center gap-2 ml-auto cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.2)] h-auto"
              >
                Continuar <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>
        )}

        {/* PASO 2: DATOS DE CONTACTO Y MENSAJE FINAL */}
        {step === 2 && submitStatus !== 'success' && (
          <motion.div
            key="step-contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00E5FF]">
                Paso 2 de 2: Información de Contacto
              </span>
              <span className="text-xs text-gray-500 font-bold">{serviceNames[service]}</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot Field */}
              <input
                type="text"
                name="website_url"
                value={formData.general.website_url}
                onChange={(e) => handleNestedChange('general', 'website_url', e.target.value)}
                className="hidden"
                autoComplete="off"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">Tu Nombre / Empresa <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    value={formData.general.name}
                    onChange={(e) => handleNestedChange('general', 'name', e.target.value)}
                    className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-4 md:py-6 text-white focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Ej. Juan de Pérez Corp"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">Correo Electrónico <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.general.email}
                    onChange={(e) => handleNestedChange('general', 'email', e.target.value)}
                    className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-4 md:py-6 text-white focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="correo@empresa.com"
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
                    value={formData.general.phone}
                    onChange={(e) => handleNestedChange('general', 'phone', e.target.value)}
                    className={`bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-4 md:py-6 text-white focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="+54 9 299 5504783"
                    disabled={isSubmitting}
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-label text-xs uppercase tracking-wider text-gray-400 ml-1">Mensaje o comentarios adicionales <span className="text-xs text-gray-500 normal-case tracking-normal">(Opcional)</span></Label>
                  <Textarea
                    id="message"
                    value={formData.general.message}
                    onChange={(e) => handleNestedChange('general', 'message', e.target.value)}
                    className="bg-[#0C0D0D] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] outline-none transition-all font-body min-h-[58px] resize-none"
                    placeholder="Algún detalle adicional sobre los objetivos del proyecto..."
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="privacy"
                  checked={formData.general.privacy}
                  onCheckedChange={(checked) => handleNestedChange('general', 'privacy', checked)}
                  disabled={isSubmitting}
                  className={`border-white/30 data-[state=checked]:bg-[#00E5FF] data-[state=checked]:border-[#00E5FF] ${errors.privacy ? 'border-red-500' : ''}`}
                />
                <Label htmlFor="privacy" className="text-xs text-gray-400 leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Acepto los <a href="/terms-of-service" className="text-[#00E5FF] hover:underline">términos de servicio</a> y la <a href="/privacy-policy" className="text-[#00E5FF] hover:underline">política de privacidad</a>.
                </Label>
              </div>
              {errors.privacy && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.privacy}</p>}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* ACCIONES */}
              <div className="flex gap-4 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoBack}
                  className="bg-transparent border border-white/10 text-white hover:bg-white/5 rounded-xl px-6 py-5 flex items-center gap-2 cursor-pointer h-auto"
                  disabled={isSubmitting}
                >
                  <ArrowLeft size={16} /> Atrás
                </Button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#00E5FF] hover:bg-[#00c8e0] text-[#0C0D0D] font-bold rounded-xl px-10 py-5 flex items-center gap-2 ml-auto cursor-pointer transition-all shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:active:scale-100 uppercase tracking-wider text-xs font-headline"
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> PROCESANDO...</>
                  ) : (
                    <>
                      <span>{service === 'auditoria' ? 'Solicitar Auditoría' : 'Enviar y Calificar'}</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* PANTALLA DE ÉXITO */}
        {submitStatus === 'success' && (
          <motion.div
            key="step-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-8 space-y-6"
          >
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto border border-emerald-500/20">
              <CheckCircle2 size={40} />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="font-headline text-2xl md:text-3xl font-bold text-white">
                {service === 'auditoria' ? '¡Auditoría Solicitada!' : isLowTierLead() ? '¡Registro Recibido!' : '¡Hoja de Ruta Solicitada!'}
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {service === 'auditoria'
                  ? 'Hemos recibido correctamente los datos de tu sitio web. Analizaremos tu posicionamiento SEO y te enviaremos el reporte completo en tu email en un plazo máximo de 48 horas hábiles.'
                  : isLowTierLead() 
                    ? 'Como tu proyecto se encuentra en etapa de validación inicial, hemos enviado a tu casilla de correo un pack de recursos gratuitos de SEO y desarrollo autogestionado para impulsar tu crecimiento hoy mismo.'
                    : 'Un consultor de SEO Growthers auditará tu sitio y preparará una propuesta adaptada a tu volumen de inversión. Nos comunicaremos contigo en menos de 24 horas hábiles.'}
              </p>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <Button
                type="button"
                onClick={handleReset}
                className="bg-[#00E5FF] hover:bg-[#00c8e0] text-[#0C0D0D] font-bold rounded-xl px-8 py-4 cursor-pointer text-xs uppercase font-headline tracking-wider"
              >
                Volver a empezar
              </Button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default LeadQualifierForm;
