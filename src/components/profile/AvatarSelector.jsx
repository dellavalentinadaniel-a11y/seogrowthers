import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from '@/components/ui/use-toast';

const standardAvatars = [
    { id: 1, url: '/images/Diseño sin título (2)/1.png' },
    { id: 2, url: '/images/Diseño sin título (2)/2.png' },
    { id: 3, url: '/images/Diseño sin título (2)/3.png' },
    { id: 4, url: '/images/Diseño sin título (2)/4.png' },
    { id: 5, url: '/images/Diseño sin título (2)/5.png' },
    { id: 6, url: '/images/Diseño sin título (2)/6.png' },
    { id: 7, url: '/images/Diseño sin título (2)/7.png' },
    { id: 8, url: '/images/Diseño sin título (2)/8.png' },
    { id: 9, url: '/images/Diseño sin título (2)/9.png' },
    { id: 10, url: '/images/Diseño sin título (2)/10.png' },
    { id: 11, url: '/images/Diseño sin título (2)/13.webp' },
    { id: 12, url: '/images/Diseño sin título (2)/guias.webp' },
];

const AvatarSelector = ({ currentAvatar, onSelect, onSave, isSaving, user }) => {
    const [uploading, setUploading] = useState(false);

    // Filtrar/añadir avatar exclusivo sólo para el usuario de Daniel
    const isExclusiveUser = user?.email === 'dellavalentina.daniel@gmail.com';
    const avatars = isExclusiveUser
        ? [
            ...standardAvatars,
            { id: 13, url: '/images/Diseño sin título (2)/channels4_profile.jpg', isExclusive: true }
          ]
        : standardAvatars;

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validar tamaño (máx 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                variant: 'destructive',
                title: 'Archivo demasiado grande',
                description: 'La foto de perfil no debe superar los 5MB.'
            });
            return;
        }

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            toast({
                variant: 'destructive',
                title: 'Tipo de archivo inválido',
                description: 'Por favor, selecciona un archivo de imagen válido.'
            });
            return;
        }

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${user?.id || 'guest'}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            // Subir al bucket publico 'article-images'
            const { error: uploadError } = await supabase.storage
                .from('article-images')
                .upload(filePath, file, { cacheControl: '3600', upsert: true });

            if (uploadError) throw uploadError;

            // Obtener URL publica
            const { data: { publicUrl } } = supabase.storage
                .from('article-images')
                .getPublicUrl(filePath);

            onSelect(publicUrl);
            toast({
                title: '¡Foto subida con éxito!',
                description: 'Haz clic en "Confirmar Avatar" para guardar los cambios.'
            });
        } catch (error) {
            console.error('Error al subir el avatar:', error);
            toast({
                variant: 'destructive',
                title: 'Error de carga',
                description: 'No se pudo subir la foto a Supabase Storage.'
            });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950/40 border border-white/5 p-4 rounded-2xl">
                <div className="relative w-20 h-20 rounded-full border-2 border-purple-500/30 overflow-hidden bg-slate-900 shrink-0">
                    {currentAvatar ? (
                        <img 
                            src={currentAvatar} 
                            alt="Vista previa de avatar" 
                            className="w-full h-full object-cover scale-[1.35]"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900">
                            <ImageIcon size={32} />
                        </div>
                    )}
                </div>
                <div className="flex-1 text-center sm:text-left space-y-1">
                    <h4 className="text-sm font-bold text-white">Sube tu propia foto</h4>
                    <p className="text-xs text-slate-400">Archivos JPG, PNG o WEBP de hasta 5MB. Se almacenará en tu perfil.</p>
                </div>
                <div className="shrink-0 w-full sm:w-auto">
                    <input 
                        type="file" 
                        id="custom-avatar-file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileUpload}
                        disabled={uploading || isSaving}
                    />
                    <label 
                        htmlFor="custom-avatar-file"
                        className={`w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition duration-300 shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                Subiendo...
                            </>
                        ) : (
                            <>
                                <Upload className="w-3.5 h-3.5" />
                                Seleccionar Archivo
                            </>
                        )}
                    </label>
                </div>
            </div>

            <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">Colección de Avatares Oficiales</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {avatars.map((avatar) => (
                        <motion.button
                            key={avatar.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelect(avatar.url)}
                            className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all ${
                                currentAvatar === avatar.url 
                                ? 'border-cyan-500 ring-2 ring-cyan-500/20' 
                                : avatar.isExclusive
                                    ? 'border-yellow-500/50 hover:border-yellow-400 bg-yellow-500/5'
                                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/50'
                            }`}
                        >
                            <img 
                                src={avatar.url} 
                                alt={`Avatar ${avatar.id}`} 
                                className="w-full h-full object-cover scale-[1.35]"
                            />
                            {avatar.isExclusive && (
                                <div className="absolute top-1 left-1 bg-yellow-500 text-slate-950 font-extrabold text-[8px] px-1 rounded uppercase tracking-widest z-10 shadow-lg">
                                    Daniel
                                </div>
                            )}
                            {currentAvatar === avatar.url && (
                                <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center z-10">
                                    <div className="bg-cyan-500 text-slate-950 p-1 rounded-full shadow-lg">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/80">
                <Button 
                    onClick={onSave} 
                    disabled={isSaving || uploading}
                    className="relative overflow-hidden premium-btn-glow bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl px-5 text-xs h-10"
                >
                    {isSaving ? 'Guardando...' : 'Confirmar Avatar'}
                </Button>
            </div>
        </div>
    );
};

export default AvatarSelector;
