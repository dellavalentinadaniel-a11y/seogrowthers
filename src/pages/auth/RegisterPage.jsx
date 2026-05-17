import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { m } from 'framer-motion';
import { Chrome, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles, TrendingUp, Users, CheckCircle } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente. ¡Bienvenido a SEO Growthers!",
      });
      
      navigate('/profile');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de registro",
        description: error.message || "No se pudo completar el registro. Verifica tus datos.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/profile',
        },
      });
      if (error) throw error;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: error.message || "No se pudo sincronizar vía Google.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="font-body text-on-background selection:bg-primary/30 min-h-screen flex flex-col overflow-hidden">
      <Helmet>
        <title>Crear Cuenta | SEO Growthers</title>
      </Helmet>

      <main className="flex-grow flex items-center justify-center p-4 md:p-10 relative">
        {/* Background Atmospheric Elements */}
        <div className="absolute inset-0 circuit-bg opacity-20 pointer-events-none"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]"></div>
        
        {/* Auth Container */}
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0 rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.7)] relative z-10 border border-white/10 bg-surface-container-low/10 backdrop-blur-3xl">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-20"></div>

          {/* Left Side: Visual Narrative & Branding */}
          <div className="hidden md:flex flex-col justify-between p-16 bg-[#0d0e17]/80 relative border-r border-white/5 overflow-hidden">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="relative z-10">
              <Link to="/" className="flex items-center gap-3 mb-10 group">
                <div className="p-2 rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan-500/50 transition-all">
                  <span className="material-symbols-outlined text-cyan-400 text-3xl">hub</span>
                </div>
                <span className="font-headline font-bold tracking-[0.3em] text-xl text-white">SEO GROWTHERS</span>
              </Link>
              
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="font-headline text-5xl font-extrabold tracking-tighter text-white leading-[1.05] mb-6">
                  Únete al Círculo <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-500 animate-gradient-x">de Crecimiento</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-sm leading-relaxed font-light mb-8">
                  Desbloquea recursos de desarrollo de primer nivel, tácticas SEO probadas en el mercado y un entorno diseñado para escalar tus proyectos.
                </p>
              </m.div>

              {/* Engaging Bullet Points */}
              <div className="space-y-4 max-w-md">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all duration-300">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Despliegues en Minutos</h4>
                    <p className="text-xs text-slate-400 mt-1">Accede a templates optimizados, componentes y configuraciones listas para lanzar.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all duration-300">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">SEO Avanzado y Auditorías</h4>
                    <p className="text-xs text-slate-400 mt-1">Herramientas para descargas técnicas, PDFs de rendimiento y análisis SEO de competidores.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all duration-300">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Comunidad Activa y Mentoría</h4>
                    <p className="text-xs text-slate-400 mt-1">Resuelve dudas complejas en minutos y colabora directamente con fundadores y especialistas.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="p-6 rounded-[2rem] bg-cyan-950/20 backdrop-blur-3xl border border-cyan-500/10 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <span className="font-label text-[11px] tracking-[0.3em] uppercase text-cyan-400 font-bold">Comunidad Activa: +1,250 Miembros</span>
                </div>
                <div className="font-mono text-xs text-slate-500 leading-relaxed space-y-1">
                  <p><span className="text-cyan-500/60">&gt;</span> optimizando_perfil_seo... [OK]</p>
                  <p><span className="text-cyan-500/60">&gt;</span> conectando_workspace_desarrollo... [OK]</p>
                  <p><span className="text-cyan-500/60">&gt;</span> listo_para_escalar_tus_resultados... [✓]</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          </div>

          {/* Right Side: Sign Up Form */}
          <div className="bg-[#0C0D0D]/40 p-8 md:p-16 lg:p-20 flex flex-col justify-center backdrop-blur-4xl relative">
            {/* Mobile Header Branding (Visible only on mobile) */}
            <div className="mb-8 md:hidden text-center flex flex-col items-center">
              <img 
                src="/images/iconos/fondo-tecnologico-moderno.png" 
                alt="SEO Growthers Logo" 
                className="w-28 h-auto rounded-3xl shadow-2xl border border-white/10 mb-4 animate-pulse"
              />
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                <span className="font-label text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-bold">Registro de Cuenta</span>
              </div>
              <h2 className="text-3xl font-headline font-extrabold text-white">Crear Cuenta</h2>
            </div>

            <div className="hidden md:block space-y-3 mb-10">
              <h2 className="text-4xl font-headline font-extrabold text-white tracking-tighter">Crear Cuenta</h2>
              <p className="text-slate-500 text-sm font-light">Completa tus datos para unirte a la comunidad líder en crecimiento digital.</p>
            </div>

            <form className="space-y-6" onSubmit={handleRegister}>
              {/* Name Field */}
              <m.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2 group"
              >
                <label className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-400 ml-1">Nombre Completo</label>
                <div className="relative flex items-center transition-all duration-500 bg-[#0d0e17]/60 border border-white/5 rounded-2xl group-within:border-cyan-500/50 group-within:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-within:bg-[#0d0e17]">
                  <span className="material-symbols-outlined absolute left-5 text-slate-500 text-xl group-focus-within:text-cyan-400 transition-colors">person</span>
                  <input 
                    className="w-full bg-transparent border-none py-5 pl-14 pr-5 text-white placeholder:text-slate-700 focus:ring-0 focus:outline-none font-body text-sm" 
                    id="name" 
                    placeholder="Tu nombre y apellido" 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </m.div>

              {/* Email Field */}
              <m.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2 group"
              >
                <label className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-400 ml-1">Correo Electrónico</label>
                <div className="relative flex items-center transition-all duration-500 bg-[#0d0e17]/60 border border-white/5 rounded-2xl group-within:border-cyan-500/50 group-within:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-within:bg-[#0d0e17]">
                  <span className="material-symbols-outlined absolute left-5 text-slate-500 text-xl group-focus-within:text-cyan-400 transition-colors">alternate_email</span>
                  <input 
                    className="w-full bg-transparent border-none py-5 pl-14 pr-5 text-white placeholder:text-slate-700 focus:ring-0 focus:outline-none font-body text-sm" 
                    id="email" 
                    placeholder="ejemplo@email.com" 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </m.div>

              {/* Password Field */}
              <m.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2 group"
              >
                <label className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-400 ml-1">Contraseña</label>
                <div className="relative flex items-center transition-all duration-500 bg-[#0d0e17]/60 border border-white/5 rounded-2xl group-within:border-cyan-500/50 group-within:shadow-[0_0_30px_rgba(6,182,212,0.15)] group-within:bg-[#0d0e17]">
                  <span className="material-symbols-outlined absolute left-5 text-slate-500 text-xl group-focus-within:text-cyan-400 transition-colors">lock</span>
                  <input 
                    className="w-full bg-transparent border-none py-5 pl-14 pr-12 text-white placeholder:text-slate-700 focus:ring-0 focus:outline-none font-body text-sm" 
                    id="password" 
                    placeholder="••••••••••••" 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    className="absolute right-5 text-slate-500 hover:text-white transition-colors" 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </m.div>

              {/* Terms */}
              <div className="flex items-center gap-4 py-3 px-2">
                <input className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-cyan-500 focus:ring-cyan-500/50 focus:ring-offset-0" id="terms" type="checkbox" required />
                <label className="text-xs text-slate-400 font-light" htmlFor="terms">
                  Acepto los <a className="text-cyan-400 hover:text-cyan-300 font-bold underline decoration-cyan-500/30" href="#">Términos y Condiciones</a>
                </label>
              </div>

              {/* Submit Button */}
              <button 
                className="w-full group relative flex items-center justify-center py-6 bg-cyan-500 text-[#0d0e17] rounded-2xl font-headline font-black text-xs tracking-[0.3em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70" 
                type="submit"
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-white to-cyan-400 group-hover:animate-shimmer transition-opacity"></div>
                <span className="relative z-10 flex items-center gap-4">
                  {isLoading ? "REGISTRANDO..." : "REGISTRARSE"}
                  {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </span>
              </button>

              {/* Separator */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em]">
                  <span className="bg-[#111218] px-4 text-slate-500">O Registrarse con</span>
                </div>
              </div>

              {/* Google Register Button */}
              <button 
                onClick={handleGoogleLogin}
                type="button"
                disabled={isLoading}
                className="w-full group relative flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl font-label text-[11px] font-bold text-white uppercase tracking-widest hover:bg-white/10 transition-all duration-300 hover:border-cyan-500/30 disabled:opacity-50"
              >
                <Chrome className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                Registrarse con Google
              </button>
            </form>

            {/* Footer Links (Synced with Login) */}
            <div className="mt-12 text-center">
              <p className="text-slate-500 text-xs mb-4">
                ¿Ya tienes una cuenta activa? 
              </p>
              <Link className="inline-block font-headline text-sm font-black text-cyan-400 hover:text-white transition-colors tracking-widest border-b-2 border-cyan-500/20 hover:border-cyan-500" to="/login">INICIAR SESIÓN</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-10 text-center text-slate-700 text-[10px] font-mono tracking-[0.5em] uppercase">
        © 2026 SEO GROWTHERS PLATFORM. SECURE_AUTH_V5.
      </footer>
    </div>
  );
};

export default RegisterPage;
