import React from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export default function SEOHead({
  title = "GordaTech - Your Trusted Digital Partner",
  description = "GordaTech membantu transformasi digital bisnis Anda dengan solusi kustom berkelas dunia. Dari web platform hingga otomatisasi AI.",
}: SEOHeadProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "GordaTech",
    "url": "https://gordatech.com",
    "logo": "https://gordatech.com/logo.png",
    "image": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&h=630&q=80",
    "description": description,
    "telephone": "+62818880497",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Grand Slipi Tower Lt. 42, Jl. S. Parman",
      "addressLocality": "Jakarta Barat",
      "postalCode": "11480",
      "addressCountry": "ID",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.1983,
      "longitude": 106.7972,
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00",
    },
    "sameAs": [
      "https://instagram.com/gordatech",
      "https://linkedin.com/company/gordatech",
      "https://facebook.com/gordatech",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
