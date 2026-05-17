import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';
import { m } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles, TrendingUp, Users } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Sesión iniciada con éxito",
        description: "¡Bienvenido de nuevo a SEO Growthers!",
      });
      
      if (redirectPath === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error de inicio de sesión",
        description: error.message || "Credenciales incorrectas. Por favor, verifica tus datos.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-body text-on-background selection:bg-primary/30 min-h-screen flex flex-col overflow-hidden">
      <Helmet>
        <title>Iniciar Sesión | SEO Growthers</title>
      </Helmet>

      <main className="flex-grow flex items-center justify-center p-4 md:p-10 relative">
        {/* Background Atmospheric Elements */}
        <div className="absolute inset-0 circuit-bg opacity-20 pointer-events-none"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]"></div>
        
        {/* Auth Container with Two Blocks */}
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0 rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.7)] relative z-10 border border-white/10 bg-surface-container-low/10 backdrop-blur-3xl">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-20"></div>

          {/* Left Side: Call to Action and Branding */}
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
                  Impulsa tu <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-500 animate-gradient-x">Crecimiento Digital</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-sm leading-relaxed font-light mb-8">
                  Accede a la plataforma definitiva para potenciar tus estrategias de SEO, Desarrollo de Software y Analítica de datos.
                </p>
              </m.div>

              {/* Community Benefits */}
              <div className="space-y-4 max-w-md">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all duration-300">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Herramientas con IA</h4>
                    <p className="text-xs text-slate-400 mt-1">Automatiza auditorías, análisis semánticos y optimización de contenido en segundos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all duration-300">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Métricas en Tiempo Real</h4>
                    <p className="text-xs text-slate-400 mt-1">Visualiza el rendimiento de tus campañas, KPIs y tracción de búsquedas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all duration-300">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Comunidad Selecta</h4>
                    <p className="text-xs text-slate-400 mt-1">Colabora con ingenieros, desarrolladores y especialistas en crecimiento digital.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span className="font-label text-xs tracking-wider text-slate-400 font-bold">Workspace 100% Protegido</span>
              </div>
            </div>

            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-[#0C0D0D]/40 p-8 md:p-16 lg:p-20 flex flex-col justify-center backdrop-blur-4xl relative">
            
            {/* Logo SG en el formulario */}
            <div className="mb-10 text-center flex flex-col items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 blur-2xl opacity-100 group-hover:scale-110 transition-transform duration-700"></div>
                <img 
                  src="/images/iconos/fondo-tecnologico-moderno.png" 
                  alt="SEO Growthers Logo" 
                  className="relative w-36 h-auto rounded-[2rem] shadow-2xl border border-white/5 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                <span className="font-label text-[10px] tracking-[0.3em] text-cyan-400 uppercase font-bold">Ingreso a la Plataforma</span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="space-y-2 group">
                <label className="font-label text-[10px] uppercase tracking-[0.2em] text-slate-400 ml-1">Correo Electrónico</label>
                <div className="relative flex items-center transition-all duration-300 bg-[#0d0e17]/80 border border-white/5 rounded-2xl group-within:border-cyan-500/50 group-within:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                  <span className="material-symbols-outlined absolute left-4 text-slate-600 text-xl group-focus-within:text-cyan-400 transition-colors">alternate_email</span>
                  <input 
                    className="w-full bg-transparent border-none py-5 pl-12 pr-4 text-white placeholder:text-slate-700 focus:ring-0 focus:outline-none font-body text-sm" 
                    placeholder="ejemplo@email.com" 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2 group">
                <div className="flex justify-between items-center px-1">
                  <label className="font-label text-[10px] uppercase tracking-[0.2em] text-slate-400">Contraseña</label>
                  <Link className="text-[10px] font-label uppercase tracking-widest text-cyan-400/60 hover:text-cyan-400 transition-colors font-bold" to="/auth/forgot-password">¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="relative flex items-center transition-all duration-300 bg-[#0d0e17]/80 border border-white/5 rounded-2xl group-within:border-cyan-500/50 group-within:shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                  <span className="material-symbols-outlined absolute left-4 text-slate-600 text-xl group-focus-within:text-cyan-400 transition-colors">lock</span>
                  <input 
                    className="w-full bg-transparent border-none py-5 pl-12 pr-12 text-white placeholder:text-slate-700 focus:ring-0 focus:outline-none font-body text-sm" 
                    placeholder="••••••••••••" 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    className="absolute right-4 text-slate-500 hover:text-white transition-colors" 
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
              </div>

              {/* Submit Button */}
              <button 
                className="w-full group relative flex items-center justify-center py-5 bg-cyan-500 text-[#0d0e17] rounded-2xl font-headline font-bold text-sm tracking-[0.2em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,229,255,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100" 
                type="submit"
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-white to-cyan-400 group-hover:animate-shimmer transition-opacity"></div>
                <span className="relative z-10 flex items-center gap-3">
                  {isLoading ? "INICIANDO SESIÓN..." : "INICIAR SESIÓN"}
                  {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </span>
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-xs text-slate-500">¿No tienes una cuenta activa?</p>
              <Link className="inline-block mt-2 font-headline text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors tracking-widest border-b border-cyan-500/20 hover:border-cyan-500" to="/register">REGISTRARSE</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
