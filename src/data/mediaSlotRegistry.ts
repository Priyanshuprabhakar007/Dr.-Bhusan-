export interface MediaSlotDefinition {
  slotKey: string;
  label: string;
  description: string;
  category:
    | 'Branding'
    | 'Doctor Photos'
    | 'Homepage'
    | 'Patient Care'
    | 'Cancer Care'
    | 'Treatments'
    | 'Body Explorer'
    | 'Second Opinion'
    | 'Blogs / Resources'
    | 'Locations'
    | 'SEO / Social';
  page: string;
  section: string;
  recommendedDimensions: string;
  ratio: 'Portrait' | 'Landscape' | 'Square' | 'Wide Banner' | 'Custom';
  allowMobileVariant?: boolean;
  required?: boolean;
  defaultFallbackUrl: string;
  usageContext: string;
}

export const MEDIA_SLOT_REGISTRY: MediaSlotDefinition[] = [
  // ==========================================
  // A. BRANDING & GLOBAL
  // ==========================================
  {
    slotKey: 'slot-branding-logo',
    label: 'Website Primary Logo',
    description: 'Main logo shown in the website header and navigation bar',
    category: 'Branding',
    page: 'Global',
    section: 'Header / Navigation',
    recommendedDimensions: '500 × 140px',
    ratio: 'Custom',
    required: true,
    defaultFallbackUrl: '',
    usageContext: 'Rendered in site navigation header across all pages'
  },
  {
    slotKey: 'slot-branding-logo-light',
    label: 'Website Light Logo',
    description: 'Light/white version of logo for dark backgrounds and footer',
    category: 'Branding',
    page: 'Global',
    section: 'Footer / Dark Backgrounds',
    recommendedDimensions: '500 × 140px',
    ratio: 'Custom',
    defaultFallbackUrl: '',
    usageContext: 'Rendered in website footer and dark themed sections'
  },
  {
    slotKey: 'slot-branding-logo-dark',
    label: 'Website Dark Logo',
    description: 'Dark version of logo for crisp display on light backgrounds',
    category: 'Branding',
    page: 'Global',
    section: 'Header / Light Backgrounds',
    recommendedDimensions: '500 × 140px',
    ratio: 'Custom',
    defaultFallbackUrl: '',
    usageContext: 'Rendered on white/light background headers'
  },
  {
    slotKey: 'slot-favicon',
    label: 'Website Favicon',
    description: 'Small brand icon shown in browser tab and bookmarks',
    category: 'Branding',
    page: 'Global',
    section: 'Browser Tab',
    recommendedDimensions: '64 × 64px',
    ratio: 'Square',
    required: true,
    defaultFallbackUrl: '',
    usageContext: 'Rendered as favicon in browser address tab and bookmarks'
  },
  {
    slotKey: 'slot-og-social',
    label: 'Default Open Graph Social Share Image',
    description: 'Image shown when link is shared on WhatsApp, Facebook, LinkedIn',
    category: 'SEO / Social',
    page: 'Global',
    section: 'Social Media Previews',
    recommendedDimensions: '1200 × 630px',
    ratio: 'Landscape',
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
    usageContext: 'Meta og:image meta tag for social platform share cards'
  },

  // ==========================================
  // B. HOMEPAGE HERO
  // ==========================================
  {
    slotKey: 'slot-hero-doctor',
    label: 'Homepage Hero Doctor Image',
    description: 'Primary portrait of Dr. Bhushan Parmar in the main hero banner',
    category: 'Doctor Photos',
    page: 'Homepage',
    section: 'Hero',
    recommendedDimensions: '1200 × 1400px',
    ratio: 'Portrait',
    allowMobileVariant: true,
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=85',
    usageContext: 'Right side of Homepage Hero section on desktop screens'
  },
  {
    slotKey: 'slot-hero-bg',
    label: 'Homepage Hero Background Image',
    description: 'Ambient texture or clinical background behind hero section',
    category: 'Homepage',
    page: 'Homepage',
    section: 'Hero Background',
    recommendedDimensions: '1920 × 1080px',
    ratio: 'Wide Banner',
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80',
    usageContext: 'Background ambient image container behind hero copy'
  },
  {
    slotKey: 'slot-hero-doctor-mobile',
    label: 'Homepage Hero Mobile Doctor Image',
    description: 'Optimized cropped mobile portrait of Dr. Bhushan Parmar for hero',
    category: 'Doctor Photos',
    page: 'Homepage',
    section: 'Mobile Hero',
    recommendedDimensions: '800 × 1000px',
    ratio: 'Portrait',
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=85',
    usageContext: 'Hero section portrait on mobile viewports (<640px)'
  },

  // ==========================================
  // C. ABOUT / MEET YOUR ONCOLOGIST
  // ==========================================
  {
    slotKey: 'slot-about-doctor',
    label: 'About Section Doctor Portrait',
    description: 'Formal consultation photo in Meet Your Oncologist section',
    category: 'Doctor Photos',
    page: 'Homepage',
    section: 'Meet Your Oncologist',
    recommendedDimensions: '1000 × 1200px',
    ratio: 'Portrait',
    allowMobileVariant: true,
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1000&q=85',
    usageContext: 'Meet Your Oncologist profile block on homepage and about page'
  },
  {
    slotKey: 'slot-about-doctor-mobile',
    label: 'About Doctor Mobile Portrait',
    description: 'Mobile version of Doctor portrait for Meet Your Oncologist',
    category: 'Doctor Photos',
    page: 'Homepage',
    section: 'Meet Your Oncologist Mobile',
    recommendedDimensions: '800 × 1000px',
    ratio: 'Portrait',
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=85',
    usageContext: 'Meet Your Oncologist section on smartphones'
  },

  // ==========================================
  // D. PATIENT CARE PATHWAYS
  // ==========================================
  {
    slotKey: 'slot-pathway-consultation',
    label: 'Consultation & Diagnosis Image',
    description: 'Visual image for Patient Pathway 1: Consultation & Diagnosis',
    category: 'Patient Care',
    page: 'Homepage',
    section: 'Patient Care Pathways',
    recommendedDimensions: '800 × 600px',
    ratio: 'Landscape',
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    usageContext: 'Patient Pathway Card 1: Consultation & Diagnosis'
  },
  {
    slotKey: 'slot-pathway-systemic',
    label: 'Systemic Therapy Planning Image',
    description: 'Visual image for Patient Pathway 2: Systemic Therapy Planning',
    category: 'Patient Care',
    page: 'Homepage',
    section: 'Patient Care Pathways',
    recommendedDimensions: '800 × 600px',
    ratio: 'Landscape',
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    usageContext: 'Patient Pathway Card 2: Systemic Therapy Planning'
  },
  {
    slotKey: 'slot-pathway-second-opinion',
    label: 'Second Opinion Reviews Image',
    description: 'Visual image for Patient Pathway 3: Second Opinion Reviews',
    category: 'Patient Care',
    page: 'Homepage',
    section: 'Patient Care Pathways',
    recommendedDimensions: '800 × 600px',
    ratio: 'Landscape',
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    usageContext: 'Patient Pathway Card 3: Second Opinion Reviews'
  },

  // ==========================================
  // E. EDITORIAL / EVIDENCE-BASED ONCOLOGY
  // ==========================================
  {
    slotKey: 'slot-evidence-oncology',
    label: 'Evidence-Based Oncology Feature Image',
    description: 'Feature photo in multidisciplinary tumor board banner',
    category: 'Homepage',
    page: 'Homepage',
    section: 'Evidence-Based Oncology',
    recommendedDimensions: '1200 × 675px',
    ratio: 'Landscape',
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    usageContext: 'Evidence-based oncology multidisciplinary tumor board section'
  },

  // ==========================================
  // F. CANCER CARE CATEGORIES
  // ==========================================
  {
    slotKey: 'slot-cancer-solid-tumors',
    label: 'Solid Tumors Image',
    description: 'Visual photo card for Solid Tumors category on homepage',
    category: 'Cancer Care',
    page: 'Homepage',
    section: 'Cancer Care Categories',
    recommendedDimensions: '800 × 600px',
    ratio: 'Landscape',
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    usageContext: 'Solid Tumors category card on homepage'
  },
  {
    slotKey: 'slot-cancer-blood-malignancies',
    label: 'Blood Malignancies Image',
    description: 'Visual photo card for Hematological / Blood Cancers category',
    category: 'Cancer Care',
    page: 'Homepage',
    section: 'Cancer Care Categories',
    recommendedDimensions: '800 × 600px',
    ratio: 'Landscape',
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    usageContext: 'Blood Malignancies / Hematology card on homepage'
  },

  // ==========================================
  // H. MEDICAL TREATMENTS
  // ==========================================
  {
    slotKey: 'slot-treatment-chemotherapy',
    label: 'Chemotherapy & Systemic Therapy Image',
    description: 'Infusion & systemic cancer treatment card image',
    category: 'Treatments',
    page: 'Homepage',
    section: 'Medical Treatments',
    recommendedDimensions: '800 × 600px',
    ratio: 'Landscape',
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    usageContext: 'Chemotherapy treatment card on homepage & services page'
  },
  {
    slotKey: 'slot-treatment-targeted',
    label: 'Targeted Therapy & Kinase Inhibitors Image',
    description: 'Molecular / targeted cancer therapy card photo',
    category: 'Treatments',
    page: 'Homepage',
    section: 'Medical Treatments',
    recommendedDimensions: '800 × 600px',
    ratio: 'Landscape',
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    usageContext: 'Targeted Therapy card on homepage & treatment pages'
  },
  {
    slotKey: 'slot-treatment-immunotherapy',
    label: 'Immunotherapy & Checkpoint Inhibitors Image',
    description: 'Immune system cellular oncology therapy card photo',
    category: 'Treatments',
    page: 'Homepage',
    section: 'Medical Treatments',
    recommendedDimensions: '800 × 600px',
    ratio: 'Landscape',
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    usageContext: 'Immunotherapy card on homepage'
  },
  {
    slotKey: 'slot-treatment-precision',
    label: 'Precision Oncology Image',
    description: 'Genomic profiling & personalized precision medicine card',
    category: 'Treatments',
    page: 'Homepage',
    section: 'Medical Treatments',
    recommendedDimensions: '800 × 600px',
    ratio: 'Landscape',
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    usageContext: 'Precision Oncology feature card'
  },

  // ==========================================
  // I. SECOND OPINION
  // ==========================================
  {
    slotKey: 'slot-second-opinion-doctor',
    label: 'Second Opinion Doctor Consultation Image',
    description: 'Doctor desk consultation photo for Second Opinion section',
    category: 'Doctor Photos',
    page: 'Second Opinion',
    section: 'Consultation Overview',
    recommendedDimensions: '1000 × 1200px',
    ratio: 'Portrait',
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1000&q=85',
    usageContext: 'Doctor reviewing medical records in Second Opinion section'
  },
  {
    slotKey: 'slot-second-opinion-banner',
    label: 'Second Opinion Review Banner Background',
    description: 'Background banner for "Seeking a Second Opinion" CTA block',
    category: 'Second Opinion',
    page: 'Second Opinion',
    section: 'Banner Background',
    recommendedDimensions: '1600 × 900px',
    ratio: 'Wide Banner',
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80',
    usageContext: 'Background image container for Second Opinion full-width banner'
  },

  // ==========================================
  // J. RESOURCES / BLOG HOMEPAGE
  // ==========================================
  {
    slotKey: 'slot-resource-feature-1',
    label: 'Featured Resource Card 1 Image',
    description: 'Image for Featured Oncology Insight Card 1 on homepage',
    category: 'Blogs / Resources',
    page: 'Homepage',
    section: 'Featured Insights',
    recommendedDimensions: '800 × 500px',
    ratio: 'Landscape',
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    usageContext: 'Homepage Resource Insights Card 1'
  },
  {
    slotKey: 'slot-resource-feature-2',
    label: 'Featured Resource Card 2 Image',
    description: 'Image for Featured Oncology Insight Card 2 on homepage',
    category: 'Blogs / Resources',
    page: 'Homepage',
    section: 'Featured Insights',
    recommendedDimensions: '800 × 500px',
    ratio: 'Landscape',
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    usageContext: 'Homepage Resource Insights Card 2'
  },
  {
    slotKey: 'slot-resource-feature-3',
    label: 'Featured Resource Card 3 Image',
    description: 'Image for Featured Oncology Insight Card 3 on homepage',
    category: 'Blogs / Resources',
    page: 'Homepage',
    section: 'Featured Insights',
    recommendedDimensions: '800 × 500px',
    ratio: 'Landscape',
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
    usageContext: 'Homepage Resource Insights Card 3'
  },

  // ==========================================
  // K. FINAL CONSULTATION CTA
  // ==========================================
  {
    slotKey: 'slot-final-cta-doc',
    label: 'Final Consultation CTA Doctor Portrait',
    description: 'Doctor photo in "Need guidance about your cancer treatment?" block',
    category: 'Doctor Photos',
    page: 'Homepage',
    section: 'Final CTA',
    recommendedDimensions: '1000 × 1200px',
    ratio: 'Portrait',
    allowMobileVariant: true,
    required: true,
    defaultFallbackUrl: 'med-final-cta-doc',
    usageContext: 'Final appointment booking banner on homepage & bottom of pages'
  },
  {
    slotKey: 'slot-final-cta-mobile',
    label: 'Final Consultation CTA Mobile Image',
    description: 'Mobile photo variant for final CTA consultation block',
    category: 'Doctor Photos',
    page: 'Homepage',
    section: 'Final CTA Mobile',
    recommendedDimensions: '800 × 1000px',
    ratio: 'Portrait',
    defaultFallbackUrl: 'med-final-cta-doc',
    usageContext: 'Final appointment banner on mobile viewports'
  },

  // ==========================================
  // L. CONTACT / LOCATIONS
  // ==========================================
  {
    slotKey: 'slot-location-primary',
    label: 'Primary Clinic Image',
    description: 'Photo of the primary hospital / clinic consultation center',
    category: 'Locations',
    page: 'Contact',
    section: 'Primary Location',
    recommendedDimensions: '1200 × 800px',
    ratio: 'Landscape',
    required: true,
    defaultFallbackUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
    usageContext: 'Primary clinic card on contact page & location list'
  }
];

export const getMediaSlotDefinition = (slotKey: string): MediaSlotDefinition | undefined => {
  return MEDIA_SLOT_REGISTRY.find((slot) => slot.slotKey === slotKey);
};
