
export const generateSrcSet = (url, variants = [320, 640, 768, 1024, 1280]) => {
  if (!url) return '';
  // Check if it's a URL we can transform (e.g., Supabase, Cloudinary)
  // For now, we assume a query param based transformation service is available 
  // or return the original if not scalable.
  
  // Implementation note: Supabase Storage Image Transformation requires specific URL construction
  // This is a generic implementation pattern.
  
  if (url.includes('supabase')) {
     return variants
      .map(width => `${url}?width=${width}&format=webp ${width}w`)
      .join(', ');
  }

  // Handle Unsplash images
  if (url.includes('images.unsplash.com')) {
    // Check if the URL already has query parameters
    const separator = url.includes('?') ? '&' : '?';
    return variants
      .map(width => `${url}${separator}w=${width}&auto=format&fit=crop&q=80 ${width}w`)
      .join(', ');
  }
  
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
