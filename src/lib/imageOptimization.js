
export const generateSrcSet = (url, variants = [320, 640, 768, 1024, 1280, 1920]) => {
  if (!url) return '';
  
  // Handle Unsplash images (native resizing support)
  if (url.includes('images.unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return variants
      .map(width => `${baseUrl}?w=${width}&auto=format,compress&q=75&fit=crop ${width}w`)
      .join(', ');
  }

  // Supabase Image Transformation requires a paid add-on.
  // For now, return empty string to let the browser use the plain src directly.
  // To enable srcSet, activate "Image Transformations" in your Supabase project settings.
  if (url.includes('supabase.co/storage/v1/object/public')) {
    return '';
  }
  
  // Relative paths (local /images/blog/...) — just return empty, src works fine
  return '';
};

export const calculateAspectRatio = (width, height) => {
  if (!width || !height) return 'auto';
  return `${width}/${height}`;
};

export const getImageDimensions = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = url;
  });
};

export const getBlurPlaceholder = (color = '#1e293b') => {
    // Returns a tiny base64 SVG placeholder
    const svg = `
      <svg width="10" height="10" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <rect width="10" height="10" fill="${color}" />
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};
