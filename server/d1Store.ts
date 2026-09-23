import fs from 'fs';
import path from 'path';

// Ensure data directories exist
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const privateReportsDir = path.join(dataDir, 'private_reports');
if (!fs.existsSync(privateReportsDir)) {
  fs.mkdirSync(privateReportsDir, { recursive: true });
}

const dbFilePath = path.join(dataDir, 'd1_database.json');

export interface MediaSlotRecord {
  slotKey: string;
  slotName: string;
  section: string;
  targetTable: string;
  targetField: string;
  publishedValue: string;
  draftValue: string;
  status: 'published' | 'draft_saved' | 'unsaved';
  updatedAt: string;
  altText?: string;
  focalPoint?: string;
  mobileValue?: string;
}

export interface D1DatabaseSchema {
  site_settings: any;
  doctor_profile: any;
  homepage: {
    hero: any;
    about: any;
    second_opinion: any;
    final_cta: any;
    animations: {
      hero: any;
      global: any;
    };
    sections: any[];
    how_can_help: any[];
    journey_steps: any[];
  };
  cancers: any[];
  cancer_categories: any[];
  cancer_pages: any[];
  treatments: any[];
  body_explorer: any[];
  locations: any[];
  blogs: any[];
  blog_categories?: any[];
  faqs: any[];
  testimonials: any[];
  navigation: any[];
  footer: any;
  media: any[];
  media_slots: Record<string, MediaSlotRecord>;
  enquiries: any[];
  second_opinion_requests?: any[];
  second_opinion_files?: any[];
  activity_logs: any[];
  admin_users: any[];
  updated_at: string;
}

// Initial 18 canonical media slots
const initialMediaSlots: Record<string, MediaSlotRecord> = {
  'slot-hero-doc': {
    slotKey: 'slot-hero-doc',
    slotName: 'Homepage Hero Doctor Image',
    section: 'Homepage Hero',
    targetTable: 'homepage.hero',
    targetField: 'doctorHeroImage',
    publishedValue: '/uploads/muaxx0ec-k2da59.png',
    draftValue: '/uploads/muaxx0ec-k2da59.png',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-hero-bg': {
    slotKey: 'slot-hero-bg',
    slotName: 'Hero Background Ambient Image',
    section: 'Homepage Hero',
    targetTable: 'homepage.hero',
    targetField: 'heroBackgroundImage',
    publishedValue: '/uploads/muaxx6o2-ax6xwp.png',
    draftValue: '/uploads/muaxx6o2-ax6xwp.png',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-about-doc': {
    slotKey: 'slot-about-doc',
    slotName: 'About Section Doctor Portrait',
    section: 'Homepage About',
    targetTable: 'homepage.about',
    targetField: 'aboutDoctorImage',
    publishedValue: '/uploads/muaxxd1t-v1294f.png',
    draftValue: '/uploads/muaxxd1t-v1294f.png',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-pathway-consultation': {
    slotKey: 'slot-pathway-consultation',
    slotName: 'Care Pathway 1: Consultation & Diagnosis',
    section: 'Patient Care Pathways',
    targetTable: 'homepage.how_can_help',
    targetField: 'image_id:0',
    publishedValue: 'med-1',
    draftValue: 'med-1',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-pathway-systemic': {
    slotKey: 'slot-pathway-systemic',
    slotName: 'Care Pathway 2: Systemic Therapy Planning',
    section: 'Patient Care Pathways',
    targetTable: 'homepage.how_can_help',
    targetField: 'image_id:1',
    publishedValue: 'med-2',
    draftValue: 'med-2',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-pathway-second-opinion': {
    slotKey: 'slot-pathway-second-opinion',
    slotName: 'Care Pathway 3: Second Opinion Reviews',
    section: 'Patient Care Pathways',
    targetTable: 'homepage.how_can_help',
    targetField: 'image_id:2',
    publishedValue: 'med-hero-doc',
    draftValue: 'med-hero-doc',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-evidence-oncology': {
    slotKey: 'slot-evidence-oncology',
    slotName: 'Evidence-Based Oncology Banner',
    section: 'Evidence-Based Oncology',
    targetTable: 'homepage.sections',
    targetField: 'journey_banner',
    publishedValue: 'med-3',
    draftValue: 'med-3',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-cancer-solid-tumors': {
    slotKey: 'slot-cancer-solid-tumors',
    slotName: 'Solid Tumors Category Card Image',
    section: 'Cancer Care Categories',
    targetTable: 'cancer_categories',
    targetField: 'solid-tumors',
    publishedValue: 'med-3',
    draftValue: 'med-3',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-cancer-blood-malignancies': {
    slotKey: 'slot-cancer-blood-malignancies',
    slotName: 'Blood Malignancies Category Card Image',
    section: 'Cancer Care Categories',
    targetTable: 'cancer_categories',
    targetField: 'blood-malignancies',
    publishedValue: 'med-hero-doc',
    draftValue: 'med-hero-doc',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-treatment-chemotherapy': {
    slotKey: 'slot-treatment-chemotherapy',
    slotName: 'Chemotherapy Treatment Card Image',
    section: 'Treatments & Modalities',
    targetTable: 'treatments',
    targetField: 'chemotherapy-systemic',
    publishedValue: 'med-1',
    draftValue: 'med-1',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-treatment-targeted': {
    slotKey: 'slot-treatment-targeted',
    slotName: 'Targeted Therapy Card Image',
    section: 'Treatments & Modalities',
    targetTable: 'treatments',
    targetField: 'targeted-therapy',
    publishedValue: 'med-2',
    draftValue: 'med-2',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-treatment-immunotherapy': {
    slotKey: 'slot-treatment-immunotherapy',
    slotName: 'Immunotherapy Card Image',
    section: 'Treatments & Modalities',
    targetTable: 'treatments',
    targetField: 'immunotherapy',
    publishedValue: 'med-3',
    draftValue: 'med-3',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-second-opinion-doctor': {
    slotKey: 'slot-second-opinion-doctor',
    slotName: 'Second Opinion Doctor Desk Photo',
    section: 'Second Opinion',
    targetTable: 'homepage.second_opinion',
    targetField: 'secondOpinionImage',
    publishedValue: '/uploads/muaxxd1t-v1294f.png',
    draftValue: '/uploads/muaxxd1t-v1294f.png',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-second-opinion-banner': {
    slotKey: 'slot-second-opinion-banner',
    slotName: 'Second Opinion Review Banner Background',
    section: 'Second Opinion',
    targetTable: 'site_settings',
    targetField: 'secondOpinionBannerImage',
    publishedValue: 'med-2',
    draftValue: 'med-2',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-final-cta-doc': {
    slotKey: 'slot-final-cta-doc',
    slotName: 'Final Consultation CTA Doctor Portrait',
    section: 'Final Consultation CTA',
    targetTable: 'homepage.final_cta',
    targetField: 'finalCtaImage',
    publishedValue: 'med-final-cta-doc',
    draftValue: 'med-final-cta-doc',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-branding-logo': {
    slotKey: 'slot-branding-logo',
    slotName: 'Website Primary Header Logo',
    section: 'Branding & Identity',
    targetTable: 'site_settings',
    targetField: 'logoUrl',
    publishedValue: '/assets/images/logo.png',
    draftValue: '/assets/images/logo.png',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-favicon': {
    slotKey: 'slot-favicon',
    slotName: 'Website Favicon Icon',
    section: 'Branding & Identity',
    targetTable: 'site_settings',
    targetField: 'favicon',
    publishedValue: '/favicon.ico',
    draftValue: '/favicon.ico',
    status: 'published',
    updatedAt: new Date().toISOString()
  },
  'slot-og-social': {
    slotKey: 'slot-og-social',
    slotName: 'Default Open Graph Social Share Image',
    section: 'SEO & Metadata',
    targetTable: 'site_settings',
    targetField: 'defaultSocialImage',
    publishedValue: 'med-final-cta-doc',
    draftValue: 'med-final-cta-doc',
    status: 'published',
    updatedAt: new Date().toISOString()
  }
};

// Initial default seed
const defaultDatabaseSeed: D1DatabaseSchema = {
  site_settings: {
    siteName: 'Dr. Bhushan Parmar – Senior Consultant Medical Oncology',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'oncology.drbhushan@gmail.com',
    publicMediaUrl: 'https://media.drbhushanparmar.com',
    logoUrl: '/assets/images/logo.png',
    darkLogoUrl: '/assets/images/logo.png',
    lightLogoUrl: '/assets/images/logo.png',
    footerLogoUrl: '/assets/images/logo.png',
    favicon: '/favicon.ico',
    defaultSocialImage: 'med-final-cta-doc',
    secondOpinionBannerImage: 'med-2',
    finalCtaDoctorImage: 'med-final-cta-doc',
    anatomyImage: '/assets/images/medical_translucent_anatomy_fullbody.svg',
    desktopAnatomyImage: '/assets/images/medical_translucent_anatomy_fullbody.svg',
    mobileAnatomyImage: '/assets/images/medical_translucent_anatomy_fullbody.svg',
    updatedAt: new Date().toISOString()
  },
  doctor_profile: {
    name: 'Dr. Bhushan Parmar',
    speciality: 'Medical Oncology / Onco Sciences',
    positioning: 'Senior Consultant – Medical Oncology',
    experienceYears: '10+',
    tagline: 'Personalized Cancer Care. Evidence-Based Treatment. Compassion at Every Step.',
    heroHeadline: 'Personalized Cancer Care.\nEvidence-Based Treatment.\nCompassion at Every Step.',
    heroSubheadline:
      'Advanced medical oncology care for solid tumors and blood cancers with personalized treatment planning using modern systemic therapies, targeted drugs, and immunotherapy.',
    bioSummary:
      'Dr. Bhushan Parmar is a distinguished Senior Consultant in Medical Oncology with over a decade of dedicated clinical experience in diagnosing and treating solid tumors and hematological malignancies.',
    fullBio: [
      'Dr. Bhushan Parmar completed his MBBS from Indira Gandhi Government Medical College, Shimla, followed by his MD in Clinical Oncology & Radiation Therapy from the Regional Cancer Centre, IGMC Shimla.',
      'To achieve the highest tier of super-specialization, Dr. Parmar attained his DrNB in Medical Oncology from the acclaimed Rajiv Gandhi Cancer Institute & Research Centre, Delhi.'
    ],
    photoUrl: 'med-final-cta-doc',
    hero_image_id: 'med-hero-doc',
    about_image_id: 'med-1',
    profile_image_id: 'med-hero-doc',
    second_opinion_image_id: 'med-2',
    final_cta_image_id: 'med-final-cta-doc',
    qualifications: [
      { degree: 'MBBS', institution: 'IGMC Shimla', period: 'Graduation', description: 'Comprehensive medical education with distinction.' },
      { degree: 'MD – Clinical Oncology', institution: 'RCC, IGMC Shimla', period: 'Postgraduate', description: 'Specialized clinical oncology training.' },
      { degree: 'Senior Residency', institution: 'PGIMER Chandigarh', period: 'Super-Specialty', description: 'Tertiary cancer care management.' },
      { degree: 'DrNB – Medical Oncology', institution: 'Rajiv Gandhi Cancer Institute, Delhi', period: 'Doctorate', description: 'Precision oncology & targeted therapy.' }
    ],
    coreExpertise: [
      'Medical Oncology & Systemic Protocols',
      'Chemotherapy & Neoadjuvant Therapy',
      'Targeted Therapy & Kinase Inhibitors',
      'Immunotherapy & Checkpoint Inhibitors',
      'Solid Tumor Comprehensive Care',
      'Blood Malignancies (Leukemias & Lymphomas)'
    ],
    memberships: ['ESMO', 'ASCO', 'ISMPO', 'API']
  },
  homepage: {
    hero: {
      headline: 'Personalized Cancer Care. Evidence-Based Treatment.',
      subheadline: 'Advanced medical oncology care for solid tumors and blood cancers with personalized treatment planning using modern systemic therapies, targeted drugs, and immunotherapy.',
      primaryCtaText: 'Book Consultation',
      secondaryCtaText: 'Get Second Opinion',
      doctorHeroImage: 'med-hero-doc',
      hero_image_id: 'med-hero-doc',
      mobile_hero_image_id: 'med-hero-doc',
      experienceYearsText: '10+ Years',
      experienceSubtext: 'Dedicated Oncology Practice'
    },
    about: {
      sectionTitle: 'MEET YOUR ONCOLOGIST',
      heading: 'Compassionate, Evidence-Based Medical Oncology',
      description: 'Dr. Bhushan Parmar believes in a patient-first approach to cancer care, combining cutting-edge medical oncology advancements with deep empathy and personalized attention.',
      aboutDoctorImage: 'med-1',
      about_image_id: 'med-1',
      highlights: ['PGIMER & RGCI Trained', '10+ Years Dedicated Experience', 'Personalized Treatment Protocols']
    },
    second_opinion: {
      smallLabel: 'CONFIRM YOUR DIAGNOSIS',
      mainHeading: 'Seeking a Second Opinion on Your Cancer Care Plan?',
      description: 'Reviewing your diagnostic reports, genomic profiling, and treatment options with an experienced medical oncologist provides clarity and confidence before starting therapy.',
      secondOpinionImage: 'med-2',
      second_opinion_image_id: 'med-2',
      primaryCtaLabel: 'Request Second Opinion Review'
    },
    final_cta: {
      smallLabel: 'SPECIALIST MEDICAL ONCOLOGY',
      mainHeading: 'Need guidance about your cancer treatment?',
      description: 'Schedule a consultation or request a second opinion. Receive thoughtful, evidence-based recommendations tailored to your diagnosis.',
      primaryCtaLabel: 'Book Consultation',
      secondaryCtaLabel: 'Get Second Opinion',
      finalCtaImage: 'med-final-cta-doc',
      final_cta_image_id: 'med-final-cta-doc',
      finalCtaImagePositionX: 50,
      finalCtaImagePositionY: 30,
      finalCtaAltText: 'Dr. Bhushan Parmar, Senior Consultant Medical Oncology'
    },
    animations: {
      hero: { enabled: true, speed: 1.0 },
      global: { reduceMotion: false, smoothScroll: true }
    },
    sections: [
      { id: 'hero', name: 'Hero Banner', visible: true, order: 1 },
      { id: 'about', name: 'Meet Doctor / About', visible: true, order: 2 },
      { id: 'body-explorer', name: 'Body Anatomy Explorer', visible: true, order: 3 },
      { id: 'cancers', name: 'Cancer Specialties', visible: true, order: 4 },
      { id: 'treatments', name: 'Treatments & Therapies', visible: true, order: 5 },
      { id: 'second-opinion', name: 'Second Opinion', visible: true, order: 6 },
      { id: 'journey', name: 'Treatment Journey', visible: true, order: 7 },
      { id: 'blogs', name: 'Cancer Education & Articles', visible: true, order: 8 },
      { id: 'faqs', name: 'Frequently Asked Questions', visible: true, order: 9 },
      { id: 'locations', name: 'Practice Locations', visible: true, order: 10 },
      { id: 'final-cta', name: 'Final Consultation CTA', visible: true, order: 11 }
    ],
    how_can_help: [
      { id: '1', title: 'Consultation & Diagnosis', description: 'Comprehensive evaluation of cancer diagnosis with advanced diagnostic reviews.', image_id: 'med-1' },
      { id: '2', title: 'Systemic Therapy Planning', description: 'Tailored chemotherapy, targeted therapy, and immunotherapy protocols.', image_id: 'med-2' },
      { id: '3', title: 'Second Opinion Reviews', description: 'Unbiased expert review of tumor molecular profiles and therapeutic options.', image_id: 'med-hero-doc' }
    ],
    journey_steps: [
      { stepNumber: '01', title: 'Initial Consultation & Diagnostic Review', description: 'Comprehensive review of medical history, pathology reports, radiological scans, and tissue biomarkers.' },
      { stepNumber: '02', title: 'Multidisciplinary Tumor Board', description: 'Collaborative case discussion with surgical, radiation, and diagnostic specialists.' },
      { stepNumber: '03', title: 'Personalized Care Plan', description: 'Formulation of an individualized treatment plan incorporating systemic therapies.' },
      { stepNumber: '04', title: 'Treatment & Active Monitoring', description: 'Safe administration of therapies with proactive toxicity monitoring and support.' }
    ]
  },
  cancers: [
    {
      id: 'lung-cancer',
      name: 'Lung Cancer',
      slug: 'lung-cancer',
      category: 'Solid Tumors',
      image_id: 'med-3',
      description: 'Comprehensive medical oncology care for Non-Small Cell Lung Cancer (NSCLC) and Small Cell Lung Cancer (SCLC) using EGFR, ALK, KRAS targeted therapies and immunotherapy.',
      symptoms: ['Persistent cough', 'Shortness of breath', 'Chest pain', 'Coughing up blood'],
      diagnosis: ['CT Scan', 'PET-CT', 'Biopsy', 'NGS Genomic Testing'],
      treatments: ['Targeted Therapy', 'Immunotherapy', 'Chemotherapy']
    },
    {
      id: 'breast-cancer',
      name: 'Breast Cancer',
      slug: 'breast-cancer',
      category: 'Solid Tumors',
      image_id: 'med-1',
      description: 'Personalized treatment protocols for ER/PR positive, HER2 positive, and Triple Negative Breast Cancer (TNBC) using CDK4/6 inhibitors, HER2 targeted agents, and endocrine therapy.',
      symptoms: ['Breast lump', 'Nipple discharge', 'Skin dimpling', 'Swollen lymph nodes'],
      diagnosis: ['Mammography', 'Breast Ultrasound', 'Core Needle Biopsy', 'HER2/ER/PR Testing'],
      treatments: ['CDK4/6 Inhibitors', 'Hormonal Therapy', 'Targeted Therapy', 'Chemotherapy']
    },
    {
      id: 'gastrointestinal-cancer',
      name: 'Gastrointestinal Cancers',
      slug: 'gastrointestinal-cancers',
      category: 'Solid Tumors',
      image_id: 'med-2',
      description: 'Expert medical management for Stomach, Colon, Rectal, Pancreatic, and Liver cancers including MSI-H immunotherapy and anti-VEGF / anti-EGFR targeted regimens.',
      symptoms: ['Abdominal pain', 'Unexplained weight loss', 'Jaundice', 'Changes in bowel habits'],
      diagnosis: ['Endoscopy / Colonoscopy', 'Biopsy', 'CT Abdomen', 'Tumor Markers (CEA, CA 19-9)'],
      treatments: ['Systemic Chemotherapy', 'Targeted Immunotherapy', 'Neoadjuvant Protocols']
    },
    {
      id: 'lymphoma-blood-cancers',
      name: 'Lymphoma & Blood Cancers',
      slug: 'lymphomas-and-blood-cancers',
      category: 'Blood Malignancies',
      image_id: 'med-hero-doc',
      description: 'Advanced systemic treatment for Hodgkin Lymphoma, Non-Hodgkin Lymphoma (DLBCL, Follicular), Multiple Myeloma, and Chronic Leukemias.',
      symptoms: ['Painless lymph node swelling', 'Fever & night sweats', 'Fatigue', 'Unexplained weight loss'],
      diagnosis: ['Lymph Node Biopsy', 'Bone Marrow Aspirate', 'Flow Cytometry', 'PET-CT'],
      treatments: ['Immunochemotherapy (R-CHOP)', 'Targeted Monoclonal Antibodies', 'Novel Oral Inhibitors']
    }
  ],
  cancer_categories: [
    { id: 'cat-solid', name: 'Solid Tumors', slug: 'solid-tumors', description: 'Cancers affecting solid organs including lung, breast, GI, head & neck, and GU cancers.', image_id: 'med-3' },
    { id: 'cat-blood', name: 'Blood Malignancies', slug: 'blood-malignancies', description: 'Hematological cancers including lymphomas, multiple myeloma, and leukemias.', image_id: 'med-hero-doc' }
  ],
  cancer_pages: [],
  treatments: [
    {
      id: 'chemotherapy-systemic',
      title: 'Chemotherapy & Systemic Therapy',
      slug: 'chemotherapy-systemic',
      image_id: 'med-1',
      summary: 'Evidence-based cytotoxic chemotherapy protocols tailored to tumor stage and patient performance status.',
      details: 'Chemotherapy uses anti-cancer medications to stop the growth of rapidly dividing cancer cells throughout the body.',
      benefits: ['Destroys micrometastatic disease', 'Shrinks tumors before surgery (Neoadjuvant)', 'Prevents recurrence (Adjuvant)'],
      process: ['Pre-chemotherapy fitness check', 'Port-a-cath insertion', 'Monitored day-care infusion', 'Proactive anti-emetic care']
    },
    {
      id: 'targeted-therapy',
      title: 'Targeted Therapy & Kinase Inhibitors',
      slug: 'targeted-therapy',
      image_id: 'med-2',
      summary: 'Precision oral and intravenous therapies engineered to block specific genetic mutations (EGFR, ALK, HER2, BRCA).',
      details: 'Targeted therapy acts specifically on unique molecular drivers responsible for cancer cell proliferation while sparing normal cells.',
      benefits: ['High therapeutic specificity', 'Fewer systemic side effects than traditional chemotherapy', 'Convenient oral administration for many drugs'],
      process: ['Next-Generation Genomic Sequencing (NGS)', 'Identification of actionable mutations', 'Precision prescription and response monitoring']
    },
    {
      id: 'immunotherapy',
      title: 'Immunotherapy & Checkpoint Inhibitors',
      slug: 'immunotherapy',
      image_id: 'med-3',
      summary: 'Advanced monoclonal antibodies (PD-1, PD-L1, CTLA-4 inhibitors) that empower the patient immune system to eradicate tumors.',
      details: 'Immune checkpoint inhibitors release the brakes on immune T-cells, enabling them to recognize and attack cancer cells.',
      benefits: ['Potential for long-lasting durable remissions', 'Effective across multiple cancer types', 'Favorable side-effect profile'],
      process: ['PD-L1 / MSI biomarker evaluation', 'Infusion therapy every 2 to 4 weeks', 'Immune-related adverse event surveillance']
    }
  ],
  body_explorer: [
    { id: 'head-neck', label: 'Head & Neck', x_percent: 50, y_percent: 18, title: 'Head & Neck Cancers', description: 'Oral cavity, larynx, pharynx, and thyroid cancers.', cta: 'View Specialty', display_order: 1, active: true },
    { id: 'chest-lungs', label: 'Chest & Lungs', x_percent: 50, y_percent: 32, title: 'Thoracic & Lung Cancers', description: 'NSCLC, SCLC, mesothelioma, and mediastinal tumors.', cta: 'View Specialty', display_order: 2, active: true },
    { id: 'breast', label: 'Breast Area', x_percent: 42, y_percent: 35, title: 'Breast Cancers', description: 'Early stage, locally advanced, and metastatic breast cancer care.', cta: 'View Specialty', display_order: 3, active: true },
    { id: 'abdomen-gi', label: 'GI & Abdomen', x_percent: 50, y_percent: 48, title: 'Gastrointestinal Cancers', description: 'Stomach, colorectal, pancreatic, liver, and esophageal tumors.', cta: 'View Specialty', display_order: 4, active: true },
    { id: 'pelvis-gu', label: 'Pelvis & GU', x_percent: 50, y_percent: 62, title: 'Genitourinary & Pelvic Cancers', description: 'Prostate, bladder, renal, ovarian, and cervical cancers.', cta: 'View Specialty', display_order: 5, active: true }
  ],
  locations: [
    {
      id: 'loc-primary-mohali',
      hospitalName: 'Max Super Speciality Hospital / Fortis Cancer Institute',
      department: 'Department of Medical Oncology & Onco Sciences',
      addressLine1: 'Phase 6, Sector 56 (Near Civil Hospital)',
      addressLine2: 'SAS Nagar (Mohali), Punjab',
      city: 'Mohali',
      state: 'Punjab',
      pincode: '160055',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      email: 'oncology.drbhushan@gmail.com',
      opd_timings: 'Monday to Saturday: 10:00 AM – 4:00 PM (By Prior Appointment)',
      image_id: 'med-2',
      is_primary: true,
      is_active: true,
      google_maps_url: 'https://maps.google.com/?q=Mohali+Punjab'
    }
  ],
  blogs: [
    {
      id: 'blog-1',
      title: 'Understanding Targeted Therapy in Modern Lung Cancer Care',
      slug: 'understanding-targeted-therapy-lung-cancer',
      category: 'Precision Oncology',
      excerpt: 'How genomic profiling and biomarker testing have revolutionized Non-Small Cell Lung Cancer treatment.',
      content: 'Targeted therapy represents one of the most significant advances in modern oncology over the past two decades...',
      featured_image_id: 'med-3',
      og_image_id: 'med-3',
      publishedAt: '2025-02-15',
      author: 'Dr. Bhushan Parmar',
      readTime: '5 min read',
      tags: ['Lung Cancer', 'Targeted Therapy', 'Precision Medicine'],
      isPublished: true
    },
    {
      id: 'blog-2',
      title: 'Demystifying Immunotherapy: How It Works and Who Benefits',
      slug: 'demystifying-immunotherapy-how-it-works',
      category: 'Immunotherapy',
      excerpt: 'An evidence-based guide to immune checkpoint inhibitors (PD-1/PD-L1) for patients and families.',
      content: 'Unlike traditional chemotherapy which attacks rapidly dividing cells, immunotherapy empowers the bodys immune system to recognize and eliminate cancer cells...',
      featured_image_id: 'med-1',
      og_image_id: 'med-1',
      publishedAt: '2025-03-01',
      author: 'Dr. Bhushan Parmar',
      readTime: '6 min read',
      tags: ['Immunotherapy', 'Cancer Treatment', 'Patient Education'],
      isPublished: true
    }
  ],
  faqs: [
    {
      question: 'What is the difference between a Medical Oncologist and a Surgical Oncologist?',
      answer: 'A Medical Oncologist specializes in systemic cancer treatments such as chemotherapy, targeted therapy, and immunotherapy that circulate throughout the bloodstream. A Surgical Oncologist specializes in surgically removing localized tumors.'
    },
    {
      question: 'How do I request a Second Opinion with Dr. Bhushan Parmar?',
      answer: 'You can submit your pathology reports, radiological scans (CT/PET-CT), and treatment history via our website enquiry form or WhatsApp.'
    }
  ],
  testimonials: [
    {
      id: 't-1',
      patientName: 'Ramesh K.',
      cancerType: 'Non-Small Cell Lung Cancer',
      treatmentReceived: 'Targeted Therapy (EGFR Inhibitor)',
      feedback: 'Dr. Bhushan Parmar recommended genomic sequencing which identified an EGFR mutation. His targeted therapy plan gave us clear hope and exceptional quality of life.',
      rating: 5,
      date: '2025-01-20'
    }
  ],
  navigation: [
    { id: 'nav-home', label: 'Home', url: '/', order: 1, visible: true },
    { id: 'nav-about', label: 'About', url: '/#about', order: 2, visible: true },
    { id: 'nav-cancers', label: 'Cancer Care', url: '/#cancers', order: 3, visible: true },
    { id: 'nav-treatments', label: 'Treatments', url: '/#treatments', order: 4, visible: true },
    { id: 'nav-blogs', label: 'Blogs', url: '/#blogs', order: 5, visible: true },
    { id: 'nav-contact', label: 'Contact', url: '/#contact', order: 6, visible: true }
  ],
  footer: {
    aboutText: 'Dr. Bhushan Parmar is a Senior Consultant in Medical Oncology dedicated to providing evidence-based, compassionate cancer care.',
    emergencyNotice: 'For medical emergencies, please visit the nearest hospital emergency department immediately.',
    copyrightText: '© 2025 Dr. Bhushan Parmar. All rights reserved.',
    quickLinks: [
      { label: 'Home', url: '/' },
      { label: 'About Doctor', url: '/#about' },
      { label: 'Cancer Specialties', url: '/#cancers' },
      { label: 'Systemic Treatments', url: '/#treatments' },
      { label: 'Blogs', url: '/#blogs' },
      { label: 'Contact', url: '/#contact' }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com'
    }
  },
  media: [
    {
      id: 'med-hero-doc',
      storage_key: 'website/doctor/hero/dr-bhushan-parmar-hero.webp',
      original_name: 'dr-bhushan-parmar-hero.webp',
      mime_type: 'image/jpeg',
      file_size: 420000,
      width: 1200,
      height: 1200,
      alt_text: 'Dr. Bhushan Parmar, Senior Consultant Medical Oncology - Primary Hero Portrait',
      category: 'Doctor Photos',
      public_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      uploaded_by: 'admin@drbhushanparmar.com'
    },
    {
      id: 'med-1',
      storage_key: 'website/doctor/about/dr-bhushan-parmar-about.webp',
      original_name: 'dr-bhushan-parmar-about.webp',
      mime_type: 'image/jpeg',
      file_size: 380000,
      width: 1200,
      height: 800,
      alt_text: 'Dr. Bhushan Parmar in Clinical Oncology Consultation',
      category: 'Doctor Photos',
      public_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      uploaded_by: 'admin@drbhushanparmar.com'
    },
    {
      id: 'med-2',
      storage_key: 'website/doctor/second-opinion/dr-bhushan-parmar-desk.webp',
      original_name: 'dr-bhushan-parmar-desk.webp',
      mime_type: 'image/jpeg',
      file_size: 360000,
      width: 1200,
      height: 800,
      alt_text: 'Dr. Bhushan Parmar Reviewing Cancer Diagnostic Reports',
      category: 'Doctor Photos',
      public_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      uploaded_by: 'admin@drbhushanparmar.com'
    },
    {
      id: 'med-3',
      storage_key: 'website/backgrounds/anatomy-illustration.svg',
      original_name: 'medical_translucent_anatomy_fullbody.svg',
      mime_type: 'image/svg+xml',
      file_size: 15000,
      width: 400,
      height: 700,
      alt_text: 'Translucent full-body human medical anatomical visualization',
      category: 'Backgrounds',
      public_url: '/assets/images/medical_translucent_anatomy_fullbody.svg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      uploaded_by: 'admin@drbhushanparmar.com'
    },
    {
      id: 'med-final-cta-doc',
      storage_key: 'website/homepage/final-cta/dr-bhushan-final-cta.webp',
      original_name: 'dr-bhushan-final-cta.webp',
      mime_type: 'image/jpeg',
      file_size: 350000,
      width: 1200,
      height: 800,
      alt_text: 'Dr. Bhushan Parmar, Senior Consultant Medical Oncology - Final CTA Portrait',
      category: 'Doctor Photos',
      public_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=85',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      uploaded_by: 'admin@drbhushanparmar.com'
    }
  ],
  media_slots: initialMediaSlots,
  enquiries: [],
  second_opinion_requests: [],
  second_opinion_files: [],
  activity_logs: [],
  admin_users: [
    { id: 'usr-1', email: 'admin@drbhushanparmar.com', role: 'super_admin', name: 'Dr. Bhushan Parmar' }
  ],
  updated_at: new Date().toISOString()
};

// Load or initialize store
export function getD1Store(): D1DatabaseSchema {
  if (fs.existsSync(dbFilePath)) {
    try {
      const raw = fs.readFileSync(dbFilePath, 'utf-8');
      const parsed = JSON.parse(raw);
      // Ensure media_slots has all 18 canonical slots
      const mergedSlots = { ...initialMediaSlots, ...(parsed.media_slots || {}) };
      return {
        ...defaultDatabaseSeed,
        ...parsed,
        media_slots: mergedSlots,
        second_opinion_requests: parsed.second_opinion_requests || parsed.second_opinions || [],
        second_opinion_files: parsed.second_opinion_files || []
      };
    } catch (err) {
      console.error('Error reading d1_database.json, re-seeding default database store:', err);
    }
  }
  saveD1Store(defaultDatabaseSeed);
  return defaultDatabaseSeed;
}

export function saveD1Store(data: Partial<D1DatabaseSchema>): D1DatabaseSchema {
  const current = fs.existsSync(dbFilePath) ? getD1Store() : defaultDatabaseSeed;
  const updated: D1DatabaseSchema = {
    ...current,
    ...data,
    updated_at: new Date().toISOString()
  };
  fs.writeFileSync(dbFilePath, JSON.stringify(updated, null, 2), 'utf-8');
  return updated;
}

/**
 * Searches across all D1 database records to find where a media item is referenced.
 */
export function getMediaUsagesInD1(mediaIdOrKey: string): string[] {
  if (!mediaIdOrKey || typeof mediaIdOrKey !== 'string') return [];
  const target = mediaIdOrKey.trim();
  const store = getD1Store();
  const usages: string[] = [];

  const matches = (val: any) => {
    if (!val || typeof val !== 'string') return false;
    const v = val.trim();
    return v === target || v.includes(target);
  };

  // Doctor Profile
  if (store.doctor_profile) {
    const doc = store.doctor_profile;
    if (matches(doc.hero_image_id) || matches(doc.photoUrl)) usages.push('Doctor Profile (Hero Image)');
    if (matches(doc.about_image_id)) usages.push('Doctor Profile (About Image)');
    if (matches(doc.second_opinion_image_id)) usages.push('Doctor Profile (Second Opinion Image)');
    if (matches(doc.final_cta_image_id)) usages.push('Doctor Profile (Final CTA Image)');
  }

  // Homepage Sections
  if (store.homepage) {
    if (matches(store.homepage.hero?.doctorHeroImage) || matches(store.homepage.hero?.hero_image_id))
      usages.push('Homepage Hero Section');
    if (matches(store.homepage.about?.aboutDoctorImage) || matches(store.homepage.about?.about_image_id))
      usages.push('Homepage About Section');
    if (matches(store.homepage.second_opinion?.secondOpinionImage) || matches(store.homepage.second_opinion?.second_opinion_image_id))
      usages.push('Homepage Second Opinion Section');
    if (matches(store.homepage.final_cta?.finalCtaImage) || matches(store.homepage.final_cta?.final_cta_image_id))
      usages.push('Homepage Final Consultation CTA Section');
  }

  // Cancers
  if (Array.isArray(store.cancers)) {
    store.cancers.forEach((c) => {
      if (matches(c.image_id) || matches(c.featuredImage)) usages.push(`Cancer Page: ${c.name}`);
    });
  }

  // Treatments
  if (Array.isArray(store.treatments)) {
    store.treatments.forEach((t) => {
      if (matches(t.image_id) || matches(t.featuredImage)) usages.push(`Treatment Page: ${t.title}`);
    });
  }

  // Blogs
  if (Array.isArray(store.blogs)) {
    store.blogs.forEach((b) => {
      if (matches(b.featured_image_id) || matches(b.og_image_id)) usages.push(`Blog Article: ${b.title}`);
    });
  }

  // Locations
  if (Array.isArray(store.locations)) {
    store.locations.forEach((l) => {
      if (matches(l.image_id)) usages.push(`Location: ${l.hospitalName}`);
    });
  }

  // Site Settings
  if (store.site_settings) {
    if (matches(store.site_settings.defaultSocialImage)) usages.push('Site Settings (Default Open Graph Image)');
    if (matches(store.site_settings.finalCtaDoctorImage)) usages.push('Site Settings (Final CTA Doctor Image)');
    if (matches(store.site_settings.logoUrl)) usages.push('Site Settings (Header Logo)');
  }

  // Media Slots
  if (store.media_slots) {
    Object.values(store.media_slots).forEach((slot) => {
      if (matches(slot.publishedValue) || matches(slot.draftValue)) {
        usages.push(`Designated Media Slot: ${slot.slotName}`);
      }
    });
  }

  return usages;
}

/**
 * Updates draft or published media value across actual D1 tables (site_settings, homepage, etc.)
 */
export function updateTargetD1TableField(store: D1DatabaseSchema, slotKey: string, newValue: string) {
  if (slotKey === 'slot-hero-doc') {
    if (store.homepage?.hero) store.homepage.hero.doctorHeroImage = newValue;
    if (store.doctor_profile) store.doctor_profile.photoUrl = newValue;
  } else if (slotKey === 'slot-hero-bg') {
    if (store.homepage?.hero) store.homepage.hero.heroBackgroundImage = newValue;
  } else if (slotKey === 'slot-about-doc') {
    if (store.homepage?.about) store.homepage.about.aboutDoctorImage = newValue;
  } else if (slotKey === 'slot-pathway-consultation') {
    if (store.homepage?.how_can_help?.[0]) store.homepage.how_can_help[0].image_id = newValue;
  } else if (slotKey === 'slot-pathway-systemic') {
    if (store.homepage?.how_can_help?.[1]) store.homepage.how_can_help[1].image_id = newValue;
  } else if (slotKey === 'slot-pathway-second-opinion') {
    if (store.homepage?.how_can_help?.[2]) store.homepage.how_can_help[2].image_id = newValue;
  } else if (slotKey === 'slot-second-opinion' || slotKey === 'slot-second-opinion-doctor') {
    if (store.homepage?.second_opinion) store.homepage.second_opinion.secondOpinionImage = newValue;
  } else if (slotKey === 'slot-second-opinion-banner') {
    if (store.site_settings) store.site_settings.secondOpinionBannerImage = newValue;
  } else if (slotKey === 'slot-final-cta-doc') {
    if (store.homepage?.final_cta) store.homepage.final_cta.finalCtaImage = newValue;
    if (store.site_settings) store.site_settings.finalCtaDoctorImage = newValue;
  } else if (slotKey === 'slot-branding-logo') {
    if (store.site_settings) {
      store.site_settings.logoUrl = newValue;
      store.site_settings.darkLogoUrl = newValue;
      store.site_settings.lightLogoUrl = newValue;
      store.site_settings.footerLogoUrl = newValue;
    }
  } else if (slotKey === 'slot-favicon') {
    if (store.site_settings) store.site_settings.favicon = newValue;
  } else if (slotKey === 'slot-og-social') {
    if (store.site_settings) store.site_settings.defaultSocialImage = newValue;
  } else if (slotKey === 'slot-cancer-solid-tumors') {
    const cat = store.cancer_categories?.find((c: any) => c.slug === 'solid-tumors');
    if (cat) cat.image_id = newValue;
  } else if (slotKey === 'slot-cancer-blood-malignancies') {
    const cat = store.cancer_categories?.find((c: any) => c.slug === 'blood-malignancies');
    if (cat) cat.image_id = newValue;
  } else if (slotKey === 'slot-treatment-chemotherapy') {
    const t = store.treatments?.find((t: any) => t.slug === 'chemotherapy-systemic');
    if (t) t.image_id = newValue;
  } else if (slotKey === 'slot-treatment-targeted') {
    const t = store.treatments?.find((t: any) => t.slug === 'targeted-therapy');
    if (t) t.image_id = newValue;
  } else if (slotKey === 'slot-treatment-immunotherapy') {
    const t = store.treatments?.find((t: any) => t.slug === 'immunotherapy');
    if (t) t.image_id = newValue;
  }
}

export function saveMediaSlotDraftInD1(
  slotKey: string,
  draftValue: string,
  extra?: { altText?: string; focalPoint?: string; mobileValue?: string; slotName?: string; section?: string }
): MediaSlotRecord {
  const store = getD1Store();
  const slots = store.media_slots || {};
  const existing = slots[slotKey] || initialMediaSlots[slotKey] || {
    slotKey,
    slotName: extra?.slotName || slotKey,
    section: extra?.section || 'Media Slot',
    targetTable: 'd1',
    targetField: slotKey,
    publishedValue: draftValue,
    draftValue: draftValue,
    status: 'published',
    updatedAt: new Date().toISOString()
  };

  const isUnchanged = existing.publishedValue === draftValue;
  const updatedSlot: MediaSlotRecord = {
    ...existing,
    draftValue,
    status: isUnchanged ? 'published' : 'draft_saved',
    updatedAt: new Date().toISOString(),
    ...(extra?.altText !== undefined ? { altText: extra.altText } : {}),
    ...(extra?.focalPoint !== undefined ? { focalPoint: extra.focalPoint } : {}),
    ...(extra?.mobileValue !== undefined ? { mobileValue: extra.mobileValue } : {})
  };

  slots[slotKey] = updatedSlot;
  store.media_slots = slots;
  saveD1Store(store);
  return updatedSlot;
}

export function publishMediaSlotInD1(slotKey: string): MediaSlotRecord | null {
  const store = getD1Store();
  const slots = store.media_slots || {};
  const slot = slots[slotKey] || initialMediaSlots[slotKey];
  if (!slot) return null;

  slot.publishedValue = slot.draftValue;
  slot.status = 'published';
  slot.updatedAt = new Date().toISOString();

  // Apply to target D1 table field
  updateTargetD1TableField(store, slotKey, slot.publishedValue);

  slots[slotKey] = slot;
  store.media_slots = slots;
  saveD1Store(store);
  return slot;
}

export function publishAllMediaSlotsInD1(): MediaSlotRecord[] {
  const store = getD1Store();
  const slots = store.media_slots || {};
  const publishedList: MediaSlotRecord[] = [];

  Object.keys(slots).forEach((key) => {
    const slot = slots[key];
    if (slot.status !== 'published' || slot.draftValue !== slot.publishedValue) {
      slot.publishedValue = slot.draftValue;
      slot.status = 'published';
      slot.updatedAt = new Date().toISOString();
      updateTargetD1TableField(store, key, slot.publishedValue);
      publishedList.push(slot);
    }
  });

  store.media_slots = slots;
  saveD1Store(store);
  return publishedList;
}
