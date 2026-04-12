
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
       newErrors.phone = "Formato de teléfono inválido.";
    }
    if (!formData.subject || formData.subject.length < 5) newErrors.subject = "El asunto debe tener al menos 5 caracteres.";
    if (!formData.message || formData.message.length < 10) newErrors.message = "El mensaje debe tener al menos 10 caracteres.";
    if (!formData.privacy) newErrors.privacy = "Debes aceptar la política de privacidad.";
    
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
      // 1. Insert into Supabase (Pending state)
      const { data: insertData, error: insertError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          status: 'pending',
          user_agent: navigator.userAgent
        }])
        .select()
        .single();

      if (insertError) throw new Error("Error al guardar el mensaje. Inténtalo de nuevo.");

      // 2. Call Edge Function
      const { data: funcData, error: funcError } = await supabase.functions.invoke('send-contact-email', {
        body: { 
            record_id: insertData.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            website_url: formData.website_url
        }
      });

      if (funcError) throw new Error(funcError.message || "Error al procesar el envío.");
      if (funcData && !funcData.success) throw new Error(funcData.error || "Error desconocido del servidor.");

      // Success
      setSubmitStatus('success');
      toast({
        title: "¡Mensaje enviado!",
        description: "Revisa tu email de confirmación. Te responderemos pronto.",
        className: "bg-green-600 border-none text-white"
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website_url: '',
        privacy: false
      });

    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      const msg = err.message.includes("Demasiados mensajes") 
        ? "Demasiados mensajes. Intenta de nuevo más tarde." 
        : err.message || "Hubo un problema. Inténtalo de nuevo.";
      
      setErrorMessage(msg);
      toast({
        title: "Error al enviar",
        description: msg,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const retry = () => {
    setSubmitStatus(null);
    setErrorMessage('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#111827] p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
      
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        Envíanos un mensaje
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot Field - Hidden */}
        <input 
            type="text" 
            name="website_url" 
            value={formData.website_url}
            onChange={(e) => handleChange('website_url', e.target.value)}
            className="hidden" 
            autoComplete="off"
        />

        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-300">Nombre completo <span className="text-red-500">*</span></Label>
          <Input 
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`bg-[#0a0e27] border-slate-700 focus:border-[#00d9ff] text-white ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Tu nombre"
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email <span className="text-red-500">*</span></Label>
            <Input 
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`bg-[#0a0e27] border-slate-700 focus:border-[#00d9ff] text-white ${errors.email ? 'border-red-500' : ''}`}
              placeholder="tu@email.com"
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-300">Teléfono <span className="text-xs text-gray-500">(Opcional)</span></Label>
            <Input 
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`bg-[#0a0e27] border-slate-700 focus:border-[#00d9ff] text-white ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="+34 600 000 000"
              disabled={isSubmitting}
            />
             {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-gray-300">Asunto <span className="text-red-500">*</span></Label>
          <Select 
            value={formData.subject} 
            onValueChange={(val) => handleChange('subject', val)}
            disabled={isSubmitting}
          >
            <SelectTrigger className={`bg-[#0a0e27] border-slate-700 focus:ring-[#00d9ff] text-white ${errors.subject ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Selecciona un asunto" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a2035] border-slate-700 text-white">
              <SelectItem value="Consulta general">Consulta general</SelectItem>
              <SelectItem value="Auditoría SEO">Auditoría SEO</SelectItem>
              <SelectItem value="Growth Hacking">Growth Hacking</SelectItem>
              <SelectItem value="Soporte técnico">Soporte técnico</SelectItem>
              <SelectItem value="Otro">Otro</SelectItem>
            </SelectContent>
          </Select>
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-300">Mensaje <span className="text-red-500">*</span></Label>
          <Textarea 
            id="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className={`bg-[#0a0e27] border-slate-700 focus:border-[#00d9ff] text-white min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
            placeholder="¿Cómo podemos ayudarte?"
            disabled={isSubmitting}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        <div className="flex items-start gap-2">
          <Checkbox 
            id="privacy" 
            checked={formData.privacy}
            onCheckedChange={(checked) => handleChange('privacy', checked)}
            disabled={isSubmitting}
            className={`border-slate-600 data-[state=checked]:bg-[#00d9ff] data-[state=checked]:border-[#00d9ff] ${errors.privacy ? 'border-red-500' : ''}`}
          />
          <Label htmlFor="privacy" className="text-sm text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Acepto la <a href="/privacy-policy" className="text-[#00d9ff] hover:underline">política de privacidad</a> y el tratamiento de mis datos.
          </Label>
        </div>
        {errors.privacy && <p className="text-red-500 text-xs mt-1">{errors.privacy}</p>}

        {submitStatus === 'error' && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                </div>
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={retry}
                    className="h-8 text-red-400 hover:text-white hover:bg-red-500/20"
                >
                    <RefreshCcw size={14} className="mr-1" /> Reintentar
                </Button>
            </div>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting || submitStatus === 'success'}
          className={`w-full h-12 text-black font-bold rounded-lg transition-all duration-300 ${
            submitStatus === 'success' 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-[#00d9ff] hover:bg-[#00c2e6]'
          }`}
        >
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Procesando...</>
          ) : submitStatus === 'success' ? (
            <><CheckCircle2 className="mr-2 h-4 w-4" /> ¡Mensaje enviado!</>
          ) : (
            <><Send className="mr-2 h-4 w-4" /> Enviar Mensaje</>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
