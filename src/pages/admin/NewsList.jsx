import React from 'react';
import GenericList from '@/components/admin/GenericList';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const NewsList = () => {
  const columns = [
    { header: 'Titular', accessor: 'title', render: (item) => <span className="font-medium text-white">{item.title}</span> },
    { header: 'Estado', accessor: 'status', render: (item) => (
      <span className={`px-2 py-1 rounded text-xs ${item.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
        {item.status === 'published' ? 'Publicado' : 'Borrador'}
      </span>
    )},
    { header: 'Fecha', accessor: 'published_at', render: (item) => item.published_at ? format(new Date(item.published_at), 'd MMM yyyy', { locale: es }) : '-' }
  ];

  return (
    <GenericList 
      title="Noticias"
      description="Gestiona las noticias y actualizaciones rápidas."
      tableName="blog_news"
      basePath="/admin/news"
      columns={columns}
      createLabel="Nueva Noticia"
    />
  );
};

export default NewsList;