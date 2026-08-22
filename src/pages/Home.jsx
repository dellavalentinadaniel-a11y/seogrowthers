
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import HomeHero from '@/components/home/HomeHero';
import SectionAnimator from '@/components/home/SectionAnimator';
import TechMarquee from '@/components/shared/TechMarquee';

// Below-fold sections: lazy-loaded after scroll to reduce initial JS parse cost
const UnifiedCarousel = lazy(() => import('@/components/home/UnifiedCarousel'));
const AluvalleShowcase = lazy(() => import('@/components/home/AluvalleShowcase'));
const ServicesSection = lazy(() => import('@/components/home/ServicesSection'));
const StatsSection = lazy(() => import('@/components/home/StatsSection'));
const TestimonialsCarousel = lazy(() => import('@/components/home/TestimonialsCarousel'));
const ToolsSection = lazy(() => import('@/components/home/ToolsSection'));
const CTA = lazy(() => import('@/components/home/CTA'));
const FAQSection = lazy(() => import('@/components/home/FAQSection'));

const Home = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [hasScrolled, setHasScrolled] = useState(false);
  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SEO Growthers",
    "url": "https://seogrowthers.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://seogrowthers.com/api/og?title=SEO+Growthers&subtitle=SEO%2C+Desarrollo+Web+y+Automatizaci%C3%B3n+con+IA",
      "width": 600,
      "height": 60
    },
    "description": "Agencia de SEO, Desarrollo Web y Analytics en Neuquén, Argentina. Estrategias basadas en datos para crecimiento digital sostenible.",
    "sameAs": [
      "https://x.com/SEOGrowthers",
      "https://www.instagram.com/seogrowthers/",
      "https://www.linkedin.com/company/seogrowthers",
      "https://www.youtube.com/@seogrowthers-s4r"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+54 9 2995504783",
      "contactType": "customer service",
      "areaServed": "AR",
      "availableLanguage": "es"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SEO Growthers",
    "image": "https://seogrowthers.com/logo_kiwi.png",
    "description": "Agencia digital especializada en desarrollo web, SEO y automatización con IA",
    "telephone": "+54 (299)25504783 ",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "El manzano 2115 Neuquen Capital",
      "addressLocality": "Neuquén",
      "addressRegion": "Neuquén",
      "postalCode": "8300",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-38.9517",
      "longitude": "-68.0591"
    },
    "sameAs": [
      "https://www.facebook.com/seogrowthers",
      "https://www.linkedin.com/company/seogrowthers",
      "https://www.instagram.com/seogrowthers/",
      "https://x.com/SEOGrowthers",
      "https://www.youtube.com/@seogrowthers-s4r"
    ],
    "areaServed": [
      "Neuquén",
      "Argentina",
      "Latinoamérica"
    ],
    "priceRange": "$$"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SEO Growthers",
    "url": "https://seogrowthers.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://seogrowthers.com/blog?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Helmet>
        <title>Desarrollo Web, SEO y Automatización con IA en Neuquén</title>
        <meta name="description" content="Agencia digital especializada en SEO, desarrollo web y automatización con IA en Neuquén. Estrategias de datos que impulsan resultados. ¡Contáctanos!" />
        <link rel="canonical" href="https://seogrowthers.com/" />
        <meta property="og:title" content="Desarrollo Web, SEO y Automatización con IA en Neuquén" />
        <meta property="og:description" content="Agencia digital especializada en SEO, desarrollo web y automatización con IA en Neuquén. Estrategias de datos que impulsan resultados. ¡Contáctanos!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seogrowthers.com/" />
        <meta property="og:image" content="https://seogrowthers.com/logo_kiwi.png" />
        <meta property="og:locale" content="es_AR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@SEOGrowthers" />
        <meta name="twitter:title" content="Desarrollo Web, SEO y Automatización con IA en Neuquén" />
        <meta name="twitter:description" content="Agencia digital especializada en SEO, desarrollo web y automatización con IA en Neuquén. Estrategias de datos que impulsan resultados. ¡Contáctanos!" />
        <meta name="twitter:image" content="https://seogrowthers.com/logo_kiwi.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <main className="min-h-screen">
        <HomeHero />

        <SectionAnimator>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-16">
            <TechMarquee />
          </div>
        </SectionAnimator>

        <Suspense fallback={null}>
          <SectionAnimator>
            <UnifiedCarousel />
          </SectionAnimator>

          <SectionAnimator>
            <AluvalleShowcase />
          </SectionAnimator>

          <SectionAnimator>
            <ServicesSection />
          </SectionAnimator>

          <SectionAnimator>
            <StatsSection />
          </SectionAnimator>

          {(hasScrolled || footerInView) && (
            <>
              <SectionAnimator>
                <TestimonialsCarousel />
              </SectionAnimator>

              <SectionAnimator>
                <ToolsSection />
              </SectionAnimator>

              <SectionAnimator>
                <CTA />
              </SectionAnimator>

              <div ref={footerRef}>
                <SectionAnimator>
                  <FAQSection />
                </SectionAnimator>
              </div>
            </>
          )}
        </Suspense>
      </main>
    </>
  );
};

export default Home;
