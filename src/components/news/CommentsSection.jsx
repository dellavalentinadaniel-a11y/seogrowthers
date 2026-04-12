import React, { useState, useEffect, useCallback } from 'react';

import { supabase } from '@/lib/customSupabaseClient';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { MessageCircle, Send, User, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const CommentsSection = ({ newsId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  const checkUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }, []);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('news_comments')
        .select(`
          id, content, created_at, user_id, news_id, is_approved,
          profiles:user_id(username, full_name, avatar_url)
        `)
        .eq('news_id', newsId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  }, [newsId]);

  useEffect(() => {
    fetchComments();
    checkUser();
  }, [fetchComments, checkUser]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('news_comments')
        .insert([
          {
            news_id: newsId,
            user_id: user.id,
            content: newComment.trim(),
            is_approved: true
          }
        ])
        .select(`
          id, content, created_at, user_id, news_id, is_approved,
          profiles:user_id(username, full_name, avatar_url)
        `)
        .single();

      if (error) throw error;

      setComments([data, ...comments]);
      setNewComment('');
      toast({ title: "Comentario enviado", description: "Tu comentario ha sido publicado." });
    } catch (error) {
      toast({ title: "Error", description: "No se pudo enviar el comentario.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const { error } = await supabase
        .from('news_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
      setComments(comments.filter(c => c.id !== commentId));
      toast({ title: "Comentario eliminado" });
    } catch (error) {
      toast({ title: "Error", description: "No se pudo eliminar el comentario.", variant: "destructive" });
    }
  };

  return (
    <section className="mt-16 pt-12 border-t border-slate-800">
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="text-cyan-400" />
        <h3 className="text-2xl font-bold text-white">Comentarios ({comments.length})</h3>
      </div>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-12 relative">
          <div className="relative group">
            <textarea
              className="w-full bg-[#0d0e17]/80 border border-white/5 rounded-2xl p-4 min-h-[120px] text-white placeholder:text-slate-600 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all outline-none resize-none font-body"
              placeholder="Escribe tu opinión tecnológica..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={isSubmitting}
            />
            <div className="absolute bottom-4 right-4">
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-primary-container text-[#0d0e17] rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? "Enviando..." : (
                  <>
                    <Send size={16} />
                    Enviar
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-[#0d0e17]/60 border border-white/5 rounded-2xl p-8 mb-12 text-center">
          <p className="text-slate-400 mb-4">Inicia sesión para participar en el debate.</p>
          <a href="/login" className="inline-block px-8 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all font-medium">
            Iniciar Sesión
          </a>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-slate-500 text-center py-8">Cargando pensamientos...</p>
        ) : comments.length === 0 ? (
          <p className="text-slate-500 text-center py-8 italic">Sé el primero en comentar esta innovación.</p>
        ) : (
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0d0e17]/40 border border-white/5 p-6 rounded-2xl backdrop-blur-sm group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-primary/20 bg-primary/5 overflow-hidden">
                      {comment.profiles?.avatar_url ? (
                        <img src={comment.profiles.avatar_url} alt={comment.profiles.username} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/40">
                          <User size={20} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">
                        {comment.profiles?.full_name || comment.profiles?.username || 'Usuario Neural'}
                      </h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: es })}
                      </p>
                    </div>
                  </div>
                  
                  {user?.id === comment.user_id && (
                    <button 
                      onClick={() => handleDelete(comment.id)}
                      className="text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-body">
                  {comment.content}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default CommentsSection;
