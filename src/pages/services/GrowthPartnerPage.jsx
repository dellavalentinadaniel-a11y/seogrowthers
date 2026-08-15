import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import LeadQualifierForm from '@/components/contact/LeadQualifierForm';
import InternalLinkingCTA from '@/components/shared/InternalLinkingCTA';
import GrowthPartnerHero from '@/components/marketing/GrowthPartnerHero';
import GrowthPartnerWorkflow from '@/components/marketing/GrowthPartnerWorkflow';
import GrowthPartnerFunnelSystem from '@/components/marketing/GrowthPartnerFunnelSystem';
import GrowthPartnerTargetAudience from '@/components/marketing/GrowthPartnerTargetAudience';
import GrowthPartnerInvestmentBanner from '@/components/marketing/GrowthPartnerInvestmentBanner';
import GrowthPartnerFinalCTA from '@/components/marketing/GrowthPartnerFinalCTA';
import GrowthPartnerSupport from '@/components/marketing/GrowthPartnerSupport';
import GrowthPartnerFAQ, { growthPartnerFaqData } from '@/components/marketing/GrowthPartnerFAQ';
import GrowthPartnerPillars from '@/components/marketing/GrowthPartnerPillars';

export default function GrowthPartnerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allFaqQuestions = growthPartnerFaqData.flatMap(cat => cat.questions);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Growth Partner - SEO Avanzado + Performance Marketing en Neuquén y Argentina",
      "image": "https://seogrowthers.com/logo_kiwi.png",
      "description": "Plan insignia de crecimiento sostenible: SEO Full, Google Ads, Meta Ads, 2 Landing Pages, GA4 Pro, CRO mensual y soporte prioritario. $850 USD/mes + inversión publicitaria.",
      "brand": { "@type": "Brand", "name": "SEO Growthers" },
      "offers": {
        "@type": "Offer",
        "url": "https://seogrowthers.com/services/marketing-digital/growth-partner",
        "priceCurrency": "USD",
        "price": "850",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": allFaqQuestions.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "SEO Growthers",
      "image": "https://seogrowthers.com/logo_kiwi.png",
      "url": "https://seogrowthers.com",
      "telephone": "+54 9 299 550-4783",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Neuquén",
        "addressRegion": "Neuquén",
        "addressCountry": "AR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -38.9516,
        "longitude": -68.0591
      },
      "priceRange": "$$$"
    }
  ];

  return (
    <div className="text-on-surface font-body text-white min-h-screen relative overflow-hidden bg-transparent">
      <Helmet>
        <title>Growth Partner en Neuquén & Patagonia | SEO Avanzado, Google Ads & CRO | SEO Growthers</title>
        <meta 
          name="description" 
          content="Growth Partner: Solución insignia de crecimiento digital. SEO avanzado + Google Ads + Meta Ads + 2 Landing Pages + GA4 Pro + CRO mensual en Neuquén, Cipolletti, Vaca Muerta y Argentina. $850/mes." 
        />
        <meta 
          name="keywords" 
          content="Growth Partner Neuquén, SEO avanzado Patagonia, Google Ads Cipolletti, CRO AB Testing Argentina, GA4 Pro Setup, Marketing digital Vaca Muerta, Landing pages alta conversión Alto Valle" 
        />
        <link rel="canonical" href="https://seogrowthers.com/services/marketing-digital/growth-partner" />
        
        {/* OpenGraph */}
        <meta property="og:title" content="Growth Partner en Neuquén & Patagonia | SEO Growthers" />
        <meta property="og:description" content="Nuestra solución insignia: SEO Full + Performance Marketing + 2 Landing Pages + CRO + GA4 Pro para dominar el mercado digital." />
        <meta property="og:url" content="https://seogrowthers.com/services/marketing-digital/growth-partner" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://seogrowthers.com/logo_kiwi.png" />
        <meta property="og:locale" content="es_AR" />
        <meta property="og:site_name" content="SEO Growthers" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Growth Partner | SEO Growthers Neuquén" />
        <meta name="twitter:description" content="SEO avanzado + campañas pagas + CRO mensual + analítica. La solución insignia para crecimiento sostenible." />
        <meta name="twitter:image" content="https://seogrowthers.com/logo_kiwi.png" />

        {/* Local Geo SEO Tags */}
        <meta name="geo.region" content="AR-Q" />
        <meta name="geo.placename" content="Neuquén" />
        <meta name="geo.position" content="-38.9516;-68.0591" />
        <meta name="ICBM" content="-38.9516, -68.0591" />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="pt-28 pb-24 px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
        <Breadcrumbs className="mb-6" />

        <section className="mb-20">
          <GrowthPartnerHero />
        </section>

        <section className="mb-20">
          <GrowthPartnerPillars />
        </section>

        <section className="mb-20">
          <GrowthPartnerSupport />
        </section>

        <section className="mb-20">
          <GrowthPartnerWorkflow />
        </section>

        <section className="mb-20">
          <GrowthPartnerFunnelSystem />
        </section>

        <section className="mb-20">
          <GrowthPartnerTargetAudience />
        </section>

        <section className="mb-20">
          <GrowthPartnerFinalCTA />
        </section>

        <section className="mb-20">
          <GrowthPartnerFAQ />
        </section>

        <section className="mb-28" id="presupuesto-growth">
          <div className="max-w-4xl mx-auto">
            <LeadQualifierForm
              title="¿Querés escalar tu negocio con el Growth Partner?"
              subtitle="Completá tus datos para coordinar una llamada estratégica de 15 minutos y definir el plan para tu negocio."
            />
          </div>
        </section>

        <InternalLinkingCTA currentService="marketing-digital" />
      </main>
    </div>
  );
}
