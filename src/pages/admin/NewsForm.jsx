import React from 'react';
import GenericForm from '@/components/admin/GenericForm';

const NewsForm = () => {
  return (
    <GenericForm 
      title="Noticia"
      tableName="blog_news"
      basePath="/admin/news"
      categoryType="news"
    />
  );
};

export default NewsForm;