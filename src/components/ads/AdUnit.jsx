
import React, { useEffect, useRef, useState } from 'react';
import AdContainer from './AdContainer';

const AdUnit = ({ 
  slotId, 
  format = 'auto', 
  layoutKey,
  responsive = true,
  className,
  width,
  height,
  label = "Anuncio"
}) => {
  const adRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Determine if we should push ads
    const shouldPush = adRef.current && window.adsbygoogle && !adRef.current.querySelector('iframe');

    if (shouldPush) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense push error:', err);
        setError(true);
      }
    }
  }, []);

  // Anti-CLS dimensions
  // Standard sizes map
  const getMinDimensions = () => {
    if (width && height) return { minWidth: width, minHeight: height };
    if (className?.includes('h-[90px]')) return { minHeight: '90px' };
    if (className?.includes('h-[250px]')) return { minHeight: '250px' };
    if (className?.includes('h-[600px]')) return { minHeight: '600px' };
    return { minHeight: '50px' }; // minimal default
  };

  const { minWidth, minHeight } = getMinDimensions();

  if (error) {
    return (
      <div className="w-full p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-center text-xs text-gray-500">
        No se pudo cargar el anuncio
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center my-6 ${className || ''}`}>
      <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 opacity-60">
        {label}
      </span>
      <AdContainer 
        width={width} 
        height={height} 
        minHeight={minHeight}
        minWidth={minWidth}
        className="bg-transparent shadow-none"
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client="ca-pub-xxxxxxxxxxxxxxxx" // Replace with real ID in production
          data-ad-slot={slotId || "1234567890"}    // Replace with real Slot ID
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
          data-ad-layout-key={layoutKey}
        />
      </AdContainer>
    </div>
  );
};

export default AdUnit;
