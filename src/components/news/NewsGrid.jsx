
import React, { useEffect } from 'react';
import NewsCard from './NewsCard';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import SkeletonLoader from '@/components/shared/SkeletonLoader';

const NewsGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-slate-900/40 rounded-2xl overflow-hidden border border-slate-800 h-[450px]">
        <SkeletonLoader className="w-full aspect-[4/3]" />
        <div className="p-6 space-y-4">
          <SkeletonLoader className="h-6 w-3/4" />
          <SkeletonLoader className="h-4 w-full" />
          <SkeletonLoader className="h-4 w-2/3" />
          <div className="pt-4 flex justify-between">
             <SkeletonLoader className="h-3 w-20" />
             <SkeletonLoader className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const NewsGrid = ({ news, loading, hasMore, onLoadMore }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      onLoadMore();
    }
  }, [inView, hasMore, loading, onLoadMore]);

  if (loading && news.length === 0) {
    return <NewsGridSkeleton />;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="w-full flex justify-center py-12">
          {loading ? (
             <div className="flex items-center gap-2 text-cyan-400">
               <Loader2 className="animate-spin" size={24} />
               <span className="text-sm font-medium">Cargando más noticias...</span>
             </div>
          ) : (
             <div className="h-10" /> 
          )}
        </div>
      )}
      
      {!hasMore && news.length > 0 && (
         <div className="text-center py-12 text-gray-500 text-sm">
            Has llegado al final del feed.
         </div>
      )}
    </div>
  );
};

export default NewsGrid;
