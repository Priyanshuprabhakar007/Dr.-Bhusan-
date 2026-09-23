import {
  AdminUser,
  HeroContent,
  AboutDoctorSectionContent,
  SecondOpinionSectionContent,
  FinalCtaSectionContent,
  HeroAnimationSettings,
  GlobalAnimationSettings,
  HomepageSectionConfig,
  LocationItem,
  BodyExplorerRegionConfig,
  CancerCategoryItem,
  CancerPageRecord,
  TreatmentRecord,
  HowCanWeHelpItem,
  JourneyStepItem,
  ContactEnquiryItem,
  MediaAsset,
  NavigationMenuItem,
  FooterConfig,
  SiteSettingsConfig,
  SeoGlobalConfig,
  RedirectRule,
  FormBuilderConfig,
  ActivityLogItem,
  BlogPostRecord
} from '../types/admin';

// Pre-seeded Admin Users with SHA-256 hashed passwords
// 1. super_admin: admin@oncology.care / Admin@2025 (salt: 's_adm_2025')
// 2. content_manager: content@oncology.care / Content@2025 (salt: 'c_mgr_2025')
// 3. enquiry_manager: enquiries@oncology.care / Enquiries@2025 (salt: 'e_mgr_2025')
export const defaultAdminUsers: AdminUser[] = [
  {
    id: 'usr-1',
    email: 'admin@oncology.care',
    name: 'Dr. Bhushan Parmar',
    role: 'super_admin',
    // Pre-calculated SHA-256 for "s_adm_2025:Admin@2025" or "s_adm_2025:oncology2025"
    passwordHash: '8e88e8ecaa2358897dbfa47171e22ce7193b2a3c7fa823d6a67a0a038bfd2c0b',
    salt: 's_adm_2025',
    status: 'active',
    lastLogin: '2026-09-18 08:30 IST',
    createdAt: '2025-01-01'
  },
  {
    id: 'usr-2',
    email: 'content@oncology.care',
    name: 'Clinical Content Editor',
    role: 'content_manager',
    passwordHash: 'b1424efbe10f0f498c0b53adbb7b6c507a213e48e0fe9fa2194c6579f187a53c',
    salt: 'c_mgr_2025',
    status: 'active',
    lastLogin: '2026-09-17 14:15 IST',
    createdAt: '2025-01-15'
  },
  {
    id: 'usr-3',
    email: 'enquiries@oncology.care',
    name: 'Patient Care Coordinator',
    role: 'enquiry_manager',
    passwordHash: '52bfbbfeaeef1dc63c5a7ffbc8b5c904ce2041267b2d5806ee377daeb0f8853b',
    salt: 'e_mgr_2025',
    status: 'active',
    lastLogin: '2026-09-18 09:10 IST',
    createdAt: '2025-02-01'
  }
];

export const defaultHeroContent: HeroContent = {
  smallLabel: 'MEDICAL ONCOLOGY • PERSONALIZED CANCER CARE',
  mainHeading: 'Personalized Cancer Care.',
  highlightedHeading: 'Evidence-Based Treatment.',
  subHeading: 'Compassion at Every Step.',
  description:
    'Senior Consultant Medical Oncology with 10+ years of dedicated experience across premier cancer centers. Specializing in precision oncology, targeted therapy, immunotherapy, and blood cancers with clinical empathy.',
  primaryCtaLabel: 'Book Consultation',
  primaryCtaUrl: '#appointment',
  secondaryCtaLabel: 'Explore Care Options',
  secondaryCtaUrl: '#cancers',
  doctorHeroImage:
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1600&q=85',
  mobileDoctorHeroImage: '',
  doctorHeroFocalPoint: '70% 25%',
  doctorHeroAltText: 'Dr. Bhushan Parmar, Senior Consultant Medical Oncology standing in clinical suite',
  heroBackgroundImage: '',
  heroOverlayStrength: 85,
  credentials: [
    {
      id: 'cred-1',
      isCount: true,
      countTarget: 10,
      suffix: '+ Years',
      label: 'Oncology Experience',
      iconName: 'Shield',
      enabled: true,
      order: 1
    },
    {
      id: 'cred-2',
      isCount: false,
      highlight: 'DrNB',
      label: 'Medical Oncology',
      iconName: 'Award',
      enabled: true,
      order: 2
    },
    {
      id: 'cred-3',
      isCount: false,
      highlight: 'PGIMER',
      label: 'Senior Residency',
      iconName: 'Stethoscope',
      enabled: true,
      order: 3
    },
    {
      id: 'cred-4',
      isCount: false,
      highlight: 'MD',
      label: 'Clinical Oncology',
      iconName: 'GraduationCap',
      enabled: true,
      order: 4
    }
  ]
};

export const defaultAboutDoctorContent: AboutDoctorSectionContent = {
  smallLabel: 'MEET YOUR ONCOLOGIST',
  mainHeading: 'Experience, evidence and compassionate cancer care',
  subHeading: 'Bridging cutting-edge oncology science with deeply personalized patient support.',
  aboutDoctorImage:
    'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=85',
  aboutDoctorMobileImage: '',
  aboutDoctorFocalPoint: '50% 20%',
  aboutDoctorAltText: 'Dr. Bhushan Parmar - Compassionate and evidence-based oncology care',
  quote:
    '“No two cancer journeys are identical. Our commitment is delivering precise, biomarker-guided therapies while standing firmly by our patients with clarity and genuine empathy.”',
  ctaLabel: 'View Full Medical Credentials'
};

export const defaultSecondOpinionContent: SecondOpinionSectionContent = {
  smallLabel: 'EXPERT ONCOLOGY REVIEW',
  mainHeading: 'A second opinion can bring clarity',
  description:
    'If you already have a diagnosis or treatment plan, you can request a review of your reports before deciding your next step. Confirm your staging, explore molecular therapies, and gain peace of mind.',
  secondOpinionImage:
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=85',
  secondOpinionMobileImage: '',
  secondOpinionFocalPoint: '60% 45%',
  secondOpinionAltText: 'Physician examining diagnostic scans, pathology reports and second opinion oncology documentation',
  secondOpinionOverlayStrength: 85,
  primaryCtaLabel: 'Get a Second Opinion',
  secondaryCtaLabel: 'Required Reports Checklist'
};

export const defaultFinalCtaContent: FinalCtaSectionContent = {
  smallLabel: 'SPECIALIST MEDICAL ONCOLOGY',
  mainHeading: 'Need guidance about your cancer treatment?',
  description: 'Schedule a consultation or request a second opinion. Receive thoughtful, evidence-based recommendations tailored to your diagnosis.',
  primaryCtaLabel: 'Book Consultation',
  secondaryCtaLabel: 'Get Second Opinion',
  finalCtaImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=85',
  finalCtaMobileImage: '',
  finalCtaImagePositionX: 50,
  finalCtaImagePositionY: 30,
  finalCtaMobileImagePositionX: 50,
  finalCtaMobileImagePositionY: 30,
  finalCtaAltText: 'Dr. Bhushan Parmar, Senior Consultant Medical Oncology'
};

export const defaultHeroAnimationSettings: HeroAnimationSettings = {
  headingAnimation: 'mask',
  doctorImageAnimation: 'clip',
  credentialAnimation: 'stagger',
  globalSpeed: 'normal',
  enableHeroAnimations: true
};

export const defaultGlobalAnimationSettings: GlobalAnimationSettings = {
  enabled: true,
  intensity: 'standard',
  marquee: {
    enabled: true,
    speed: 'normal',
    direction: 'left',
    phrases: [
      'Personalized Cancer Care',
      'Precision Oncology & Biomarker Profiling',
      'Evidence-Based Chemotherapy',
      'Next-Gen Immunotherapy',
      'Compassionate Cancer Management'
    ]
  }
};

export const defaultHomepageSections: HomepageSectionConfig[] = [
  { id: 'sec-hero', name: 'Hero Banner', visible: true, order: 1, theme: 'teal' },
  { id: 'sec-marquee', name: 'Editorial Marquee', visible: true, order: 2, theme: 'teal' },
  { id: 'sec-intro', name: 'Practice Introduction', visible: true, order: 3, theme: 'light' },
  { id: 'sec-about', name: 'Doctor Biography & Qualifications', visible: true, order: 4, theme: 'teal' },
  { id: 'sec-how-help', name: 'How Can We Help? (Patient Cards)', visible: true, order: 5, theme: 'light' },
  { id: 'sec-cancers', name: 'Cancer Care Catalog', visible: true, order: 6, theme: 'light' },
  { id: 'sec-body-explorer', name: 'Interactive Body Area Explorer', visible: true, order: 7, theme: 'light' },
  { id: 'sec-treatments', name: 'Medical Oncology Treatments', visible: true, order: 8, theme: 'teal' },
  { id: 'sec-typography', name: 'Oversized Typography Watermark', visible: true, order: 9, theme: 'light' },
  { id: 'sec-journey', name: 'Treatment Journey Timeline', visible: true, order: 10, theme: 'light' },
  { id: 'sec-second-opinion', name: 'Second Opinion Banner', visible: true, order: 11, theme: 'teal' },
  { id: 'sec-blog', name: 'Patient Education & Resources', visible: true, order: 12, theme: 'light' },
  { id: 'sec-faqs', name: 'Frequently Asked Questions', visible: true, order: 13, theme: 'light' },
  { id: 'sec-final-cta', name: 'Consultation Final CTA', visible: true, order: 14, theme: 'teal' }
];

export const defaultLocations: LocationItem[] = [
  {
    id: 'loc-1',
    hospitalName: 'Max Super Speciality Hospital, Mohali',
    department: 'Department of Medical Oncology & Clinical Hematology',
    addressLine1: 'Near Civil Hospital, Phase 6',
    addressLine2: 'Sector 56',
    city: 'Mohali',
    state: 'Punjab',
    pincode: '160055',
    phonePrimary: '+91 98141 23456',
    phoneSecondary: '+91 172 665 2000',
    whatsappNumber: '+91 98141 23456',
    emailContact: 'drbhushanparmar@gmail.com',
    consultationDays: 'Monday to Saturday',
    openingTime: '10:00 AM',
    closingTime: '04:30 PM',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Max+Super+Speciality+Hospital+Mohali&t=&z=14&ie=UTF8&iwloc=&output=embed',
    googleMapsDirectionsUrl: 'https://maps.app.goo.gl/kXzN4d2M89k2vQJBA',
    locationImage: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
    active: true,
    isPrimary: true,
    order: 1
  },
  {
    id: 'loc-2',
    hospitalName: 'Fortis Hospital, Mohali (Consultant OPD)',
    department: 'Medical Oncology OPD Suite',
    addressLine1: 'Sector 62, Phase VIII',
    city: 'Mohali',
    state: 'Punjab',
    pincode: '160062',
    phonePrimary: '+91 98141 23456',
    whatsappNumber: '+91 98141 23456',
    emailContact: 'drbhushanparmar@gmail.com',
    consultationDays: 'Tuesday & Thursday',
    openingTime: '05:00 PM',
    closingTime: '07:00 PM',
    googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Fortis+Hospital+Mohali&t=&z=14&ie=UTF8&iwloc=&output=embed',
    googleMapsDirectionsUrl: 'https://maps.app.goo.gl/kXzN4d2M89k2vQJBA',
    locationImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    active: true,
    isPrimary: false,
    order: 2
  }
];

export const defaultBodyExplorerRegions: BodyExplorerRegionConfig[] = [
  {
    id: 'chest-lung',
    label: 'Chest & Lung',
    title: 'Chest & Lung Cancer Care',
    description:
      'Explore medical oncology care for lung and thoracic cancers, including systemic treatment options selected according to cancer type, stage and biomarkers.',
    conditions: [
      'Non-Small Cell Lung Cancer (NSCLC)',
      'Small Cell Lung Cancer (SCLC)',
      'Advanced & Metastatic Lung Malignancies',
      'Pleural & Thoracic Tumors'
    ],
    treatments: [
      'Targeted Therapy (EGFR/ALK/ROS1)',
      'Immunotherapy (Checkpoint Inhibitors)',
      'Systemic Chemotherapy',
      'Precision Biomarker Profiling'
    ],
    iconName: 'Wind',
    hotspot: { x: 50, y: 31 },
    connectorOffset: { dx: 38, dy: -6 },
    organHighlight: 'lungs',
    ctaLabel: 'Explore Chest & Lung Care',
    ctaUrl: '#appointment',
    pageSlug: 'chest-lung',
    active: true,
    displayOrder: 1
  },
  {
    id: 'head-neck',
    label: 'Head & Neck',
    title: 'Head & Neck Cancer Care',
    description:
      'Explore evidence-based systemic oncology protocols for tumors of the oral cavity, throat, and larynx, coordinated closely with surgical and radiation oncology.',
    conditions: [
      'Oral Cavity & Tongue Malignancies',
      'Laryngeal & Pharyngeal Cancers',
      'Nasopharyngeal Tumors',
      'Salivary Gland Malignancies'
    ],
    treatments: [
      'Concurrent Chemo-Radiotherapy',
      'Targeted Monoclonal Antibodies',
      'Immunotherapy Protocols',
      'Organ-Preserving Regimens'
    ],
    iconName: 'Activity',
    hotspot: { x: 50, y: 19 },
    connectorOffset: { dx: 36, dy: -8 },
    organHighlight: 'throat',
    ctaLabel: 'Explore Head & Neck Care',
    ctaUrl: '#appointment',
    pageSlug: 'head-neck',
    active: true,
    displayOrder: 2
  },
  {
    id: 'breast',
    label: 'Breast',
    title: 'Breast Cancer Care',
    description:
      'Personalized cancer care calibrated to specific receptor status (HR+, HER2+, and Triple-Negative), utilizing modern targeted and endocrine therapies.',
    conditions: [
      'Hormone Receptor Positive (HR+) Breast Cancer',
      'HER2-Enriched Breast Cancer',
      'Triple-Negative Breast Cancer (TNBC)',
      'Locally Advanced & Metastatic Breast Cancer'
    ],
    treatments: [
      'Targeted HER2 Monoclonal Therapy',
      'CDK4/6 Inhibitor Regimens',
      'Endocrine & Hormonal Therapies',
      'Neoadjuvant Systemic Chemotherapy'
    ],
    iconName: 'HeartPulse',
    hotspot: { x: 55, y: 34 },
    connectorOffset: { dx: 34, dy: 6 },
    organHighlight: 'breast',
    ctaLabel: 'Explore Breast Cancer Care',
    ctaUrl: '#appointment',
    pageSlug: 'breast',
    active: true,
    displayOrder: 3
  },
  {
    id: 'gastrointestinal',
    label: 'Gastrointestinal',
    title: 'Gastrointestinal Cancer Care',
    description:
      'Multidisciplinary systemic oncology for digestive tract tumors, leveraging molecular profiling, microsatellite instability (MSI) testing, and targeted agents.',
    conditions: [
      'Colorectal & Rectal Cancers',
      'Stomach (Gastric) & Esophageal Cancers',
      'Pancreatic Adenocarcinoma',
      'Hepatocellular (Liver) & Bile Duct Cancers'
    ],
    treatments: [
      'MSI-H / dMMR Immunotherapy',
      'VEGF & EGFR Targeted Antibodies',
      'Perioperative Combination Chemotherapy',
      'Maintenance Regimens'
    ],
    iconName: 'Layers',
    hotspot: { x: 50, y: 46 },
    connectorOffset: { dx: 36, dy: -4 },
    organHighlight: 'gi',
    ctaLabel: 'Explore GI Cancer Care',
    ctaUrl: '#appointment',
    pageSlug: 'gastrointestinal',
    active: true,
    displayOrder: 4
  },
  {
    id: 'genitourinary',
    label: 'Genitourinary',
    title: 'Genitourinary Cancer Care',
    description:
      'Systemic care pathways for cancers of the urinary tract and male reproductive organs, including advanced hormonal therapies and novel immunotherapy combinations.',
    conditions: [
      'Prostate Cancer (Castration-Sensitive & Resistant)',
      'Renal Cell Carcinoma (Kidney Cancer)',
      'Urothelial & Bladder Carcinoma',
      'Testicular Germ Cell Tumors'
    ],
    treatments: [
      'Next-Gen Androgen Receptor Blockers',
      'Tyrosine Kinase Inhibitors (TKIs)',
      'Immune Checkpoint Combinations',
      'Platinum-Based Chemotherapy'
    ],
    iconName: 'ShieldCheck',
    hotspot: { x: 46, y: 55 },
    connectorOffset: { dx: 40, dy: 8 },
    organHighlight: 'gu',
    ctaLabel: 'Explore Genitourinary Care',
    ctaUrl: '#appointment',
    pageSlug: 'genitourinary',
    active: true,
    displayOrder: 5
  },
  {
    id: 'gynecological',
    label: 'Gynecological',
    title: 'Gynecological Cancer Care',
    description:
      'Comprehensive medical oncology for female reproductive cancers, integrating genetic testing (BRCA1/2, HRD) to identify patients who benefit from maintenance therapies.',
    conditions: [
      'Ovarian & Fallopian Tube Cancers',
      'Cervical Cancer',
      'Endometrial & Uterine Cancers',
      'Peritoneal Malignancies'
    ],
    treatments: [
      'PARP Inhibitor Maintenance',
      'Targeted Anti-Angiogenic Agents',
      'Immunotherapy for MMRd Cancers',
      'Taxane-Platinum Chemotherapy'
    ],
    iconName: 'Sparkles',
    hotspot: { x: 50, y: 63 },
    connectorOffset: { dx: 36, dy: 10 },
    organHighlight: 'gyn',
    ctaLabel: 'Explore Gynecological Care',
    ctaUrl: '#appointment',
    pageSlug: 'gynecological',
    active: true,
    displayOrder: 6
  },
  {
    id: 'blood-cancers',
    label: 'Blood Cancers',
    title: 'Hematological & Blood Cancer Care',
    description:
      'Systemic management of hematological malignancies, deploying targeted small-molecule inhibitors, monoclonal antibodies, and tailored chemo-immunotherapy.',
    conditions: [
      'Hodgkin & Non-Hodgkin Lymphomas (NHL)',
      'Multiple Myeloma',
      'Chronic Lymphocytic & Myeloid Leukemias',
      'Myelodysplastic Syndromes'
    ],
    treatments: [
      'Monoclonal Antibody Infusions (CD20/CD38)',
      'Proteasome Inhibitors & Immunomodulators',
      'Targeted BTK & BCL-2 Inhibitors',
      'Systemic Chemo-Immunotherapy'
    ],
    iconName: 'Droplet',
    hotspot: { x: 50, y: 40 },
    connectorOffset: { dx: 36, dy: 0 },
    organHighlight: 'blood',
    ctaLabel: 'Explore Blood Cancer Care',
    ctaUrl: '#appointment',
    pageSlug: 'blood-cancers',
    active: true,
    displayOrder: 7
  }
];

export const defaultCancerCategories: CancerCategoryItem[] = [
  {
    id: 'cat-lung',
    name: 'Chest & Lung Cancer',
    shortName: 'Lung & Chest',
    iconName: 'Wind',
    featuredImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Comprehensive systemic protocols for NSCLC, SCLC, and thoracic tumors.',
    longDesc: 'Advanced molecular oncology targeting EGFR mutations, ALK rearrangements, ROS1, KRAS G12C, and PD-L1 expression.',
    seoSlug: 'chest-lung-cancer',
    displayOrder: 1,
    status: 'published'
  },
  {
    id: 'cat-breast',
    name: "Breast & Women's Cancers",
    shortName: 'Breast Cancer',
    iconName: 'HeartPulse',
    featuredImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Tailored oncology protocols according to receptor subtype and genetic risks.',
    longDesc: 'Specialized management of HR-positive, HER2-enriched, and triple-negative breast cancer with targeted antibodies and CDK4/6 inhibitors.',
    seoSlug: 'breast-cancer',
    displayOrder: 2,
    status: 'published'
  },
  {
    id: 'cat-gi',
    name: 'Gastrointestinal Oncology',
    shortName: 'GI & Digestive',
    iconName: 'Layers',
    featuredImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Evidence-based systemic care for colorectal, stomach, pancreas, and liver tumors.',
    longDesc: 'Integrating combination chemotherapy, targeted therapies (anti-VEGF, anti-EGFR), and checkpoint immunotherapy for microsatellite unstable cancers.',
    seoSlug: 'gastrointestinal-cancer',
    displayOrder: 3,
    status: 'published'
  },
  {
    id: 'cat-hn',
    name: 'Head & Neck Oncology',
    shortName: 'Head & Neck',
    iconName: 'Activity',
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Organ-preservation protocols for oral cavity, pharyngeal, and laryngeal malignancies.',
    longDesc: 'Multidisciplinary treatment protocols coordinating concurrent chemo-radiotherapy, targeted monoclonal antibodies, and supportive swallowing preservation.',
    seoSlug: 'head-neck-cancer',
    displayOrder: 4,
    status: 'published'
  },
  {
    id: 'cat-gu',
    name: 'Genitourinary Oncology',
    shortName: 'Prostate & Kidney',
    iconName: 'ShieldCheck',
    featuredImage: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Systemic care for prostate, kidney, bladder, and testicular cancers.',
    longDesc: 'State-of-the-art hormonal therapies, tyrosine kinase inhibitors (TKIs), checkpoint immunotherapies, and platinum-based regimens.',
    seoSlug: 'genitourinary-cancer',
    displayOrder: 5,
    status: 'published'
  },
  {
    id: 'cat-blood',
    name: 'Hematological Malignancies',
    shortName: 'Blood Cancers',
    iconName: 'Droplet',
    featuredImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Systemic management of lymphomas, multiple myeloma, and chronic leukemias.',
    longDesc: 'Modern chemo-immunotherapy, novel oral kinase inhibitors, monoclonal antibodies, and coordination for stem cell transplantation.',
    seoSlug: 'blood-cancers',
    displayOrder: 6,
    status: 'published'
  }
];

export const defaultCancerPages: CancerPageRecord[] = [
  {
    id: 'cp-lung',
    categoryId: 'cat-lung',
    pageTitle: 'Non-Small Cell & Small Cell Lung Cancer',
    urlSlug: 'lung-cancer',
    shortIntro: 'Advanced systemic medical oncology protocols customized to exact mutation profiles and PD-L1 expression.',
    overview: 'Lung cancer treatment has evolved significantly beyond conventional chemotherapy. Through comprehensive biomarker profiling (NGS), medical oncologists can identify actionable driver mutations—such as EGFR, ALK, ROS1, BRAF, and MET—enabling precision targeted therapies that improve survival outcomes with superior quality of life.',
    symptoms: [
      'Persistent cough that does not go away or changes character',
      'Coughing up blood or rust-colored sputum (hemoptysis)',
      'Shortness of breath, wheezing, or unexplained chest pain',
      'Unexplained weight loss, fatigue, or recurrent chest infections'
    ],
    diagnosis: [
      'High-resolution Contrast-Enhanced CT (CECT) of Chest & Upper Abdomen',
      'Whole-body PET-CT for accurate metabolic TNM staging',
      'CT/Endobronchial Ultrasound (EBUS) guided tissue biopsy',
      'Next-Generation Sequencing (NGS) for EGFR, ALK, ROS1, RET, KRAS, and PD-L1 immunohistochemistry'
    ],
    treatmentOptions: [
      'Targeted Oral Tyrosine Kinase Inhibitors (Osimertinib, Alectinib, Lorlatinib)',
      'Immune Checkpoint Inhibitors (Pembrolizumab, Nivolumab, Atezolizumab)',
      'Platinum-doublet combination systemic chemotherapy',
      'Concurrent Chemo-Radiotherapy for locally advanced inoperable stage III'
    ],
    whoShouldConsult: 'Patients with a newly diagnosed lung nodule or mass, those seeking biomarker interpretation, or patients requiring systemic therapy planning.',
    faqs: [
      {
        question: 'Is biomarker testing mandatory before starting lung cancer treatment?',
        answer: 'Yes. In non-small cell adenocarcinoma, biomarker testing for EGFR, ALK, and PD-L1 is essential to determine whether targeted therapy or immunotherapy should be the primary treatment choice.'
      },
      {
        question: 'Can lung cancer be managed with oral tablets instead of intravenous chemotherapy?',
        answer: 'If actionable driver mutations (like EGFR or ALK) are confirmed, oral targeted therapy is often the primary and most effective frontline treatment.'
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    ctaLabel: 'Consult on Lung Cancer',
    ctaUrl: '#appointment',
    seoTitle: 'Lung Cancer Specialist Doctor in Mohali & Chandigarh | Dr. Bhushan Parmar',
    metaDescription: 'Consult Dr. Bhushan Parmar for advanced lung cancer treatment in Mohali. Expert in EGFR/ALK targeted therapies, immunotherapy, and chemotherapy.',
    canonicalUrl: 'https://drbhushanparmar.com/cancers/lung-cancer',
    schemaType: 'MedicalCondition',
    status: 'published',
    updatedAt: '2026-09-15',
    updatedBy: 'Dr. Bhushan Parmar'
  },
  {
    id: 'cp-breast',
    categoryId: 'cat-breast',
    pageTitle: 'Breast Cancer Treatment & Receptor Subtypes',
    urlSlug: 'breast-cancer',
    shortIntro: 'Evidence-based protocols tailored to HR-positive, HER2-enriched, and Triple-Negative breast malignancies.',
    overview: 'Breast cancer is not a single disease, but a spectrum of biologically distinct subtypes. Dr. Bhushan Parmar structures systemic treatment around receptor status—ER, PR, and HER2—along with genomic testing (Oncotype DX, Mammaprint) where indicated to avoid unnecessary chemotherapy and optimize personalized cure rates.',
    symptoms: [
      'Painless lump or thickening in the breast or axillary lymph nodes',
      'Change in breast shape, size, contour, or skin dimpling (peau d orange)',
      'Nipple retraction, spontaneous discharge, or localized scaling/ulceration'
    ],
    diagnosis: [
      'Digital Mammography and High-Resolution Breast Ultrasound',
      'True-cut core needle biopsy with ER, PR, HER2 (IHC / FISH), and Ki-67 index',
      'Staging with whole-body PET-CT or CECT thorax/abdomen',
      'Germline BRCA1/2 genetic testing for high-risk or young-onset patients'
    ],
    treatmentOptions: [
      'Neoadjuvant (Pre-operative) Systemic Chemotherapy & Dual HER2 Blockade',
      'Targeted Anti-HER2 Monoclonals (Trastuzumab, Pertuzumab, T-DM1, Trastuzumab Deruxtecan)',
      'CDK4/6 Inhibitor Combination Regimens (Ribociclib, Palbociclib, Abemaciclib)',
      'Adjuvant Endocrine Therapy with Aromatase Inhibitors or Tamoxifen'
    ],
    whoShouldConsult: 'Individuals with newly diagnosed breast lumps, patients post-lumpectomy needing adjuvant treatment plans, or those seeking second opinions on chemotherapy need.',
    faqs: [
      {
        question: 'Do all breast cancer patients need chemotherapy?',
        answer: 'No. Many early-stage hormone receptor-positive, HER2-negative patients with low genomic risk scores can be safely treated with endocrine (hormone) therapy alone.'
      }
    ],
    featuredImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    ctaLabel: 'Consult on Breast Cancer',
    ctaUrl: '#appointment',
    seoTitle: 'Breast Cancer Oncologist in Mohali | Dr. Bhushan Parmar',
    metaDescription: 'Personalized breast cancer care by Senior Medical Oncologist Dr. Bhushan Parmar in Mohali. Targeted HER2 therapy, CDK4/6 inhibitors, immunotherapy.',
    canonicalUrl: 'https://drbhushanparmar.com/cancers/breast-cancer',
    schemaType: 'MedicalCondition',
    status: 'published',
    updatedAt: '2026-09-12',
    updatedBy: 'Dr. Bhushan Parmar'
  }
];

export const defaultHowCanWeHelp: HowCanWeHelpItem[] = [
  {
    id: 'help-1',
    title: 'New Cancer Diagnosis',
    description:
      'Clear, compassionate guidance to understand your biopsy report, staging scans, and recommended medical oncology treatment plan without overwhelm.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
    iconName: 'ClipboardList',
    ctaLabel: 'Schedule Consultation',
    ctaLink: '#appointment',
    show: true,
    order: 1
  },
  {
    id: 'help-2',
    title: 'Need a Second Opinion',
    description:
      'Independent expert evaluation of pathology, molecular profiling, and systemic therapy protocols before initiating or changing your chemotherapy.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    iconName: 'FileCheck',
    ctaLabel: 'Request Second Opinion',
    ctaLink: '#second-opinion',
    show: true,
    order: 2
  },
  {
    id: 'help-3',
    title: 'Already Under Treatment',
    description:
      'Ongoing chemotherapy supervision, toxicity mitigation, response re-evaluation scans, and transition to maintenance targeted therapy.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    iconName: 'HeartHandshake',
    ctaLabel: 'Continue Care',
    ctaLink: '#appointment',
    show: true,
    order: 3
  }
];

export const defaultJourneySteps: JourneyStepItem[] = [
  {
    id: 'step-1',
    number: '01',
    title: 'Clinical Consultation',
    shortDescription: 'In-depth assessment of medical history, current symptoms, prior interventions, and baseline organ function.',
    iconName: 'Users',
    enabled: true,
    order: 1
  },
  {
    id: 'step-2',
    number: '02',
    title: 'Comprehensive Report Review',
    shortDescription: 'Critical re-examination of tissue pathology, IHC markers, and radiology imaging by experienced oncology eyes.',
    iconName: 'FileText',
    enabled: true,
    order: 2
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Molecular Profiling & Staging',
    shortDescription: 'Next-generation sequencing and PET-CT staging to uncover actionable genetic mutations and disease extent.',
    iconName: 'Layers',
    enabled: true,
    order: 3
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Treatment Protocol Design',
    shortDescription: 'Formulating personalized regimens—targeted therapy, immunotherapy, or chemotherapy—tailored to the patient.',
    iconName: 'Cpu',
    enabled: true,
    order: 4
  },
  {
    id: 'step-5',
    number: '05',
    title: 'Systemic Therapy Delivery',
    shortDescription: 'Safe, monitored outpatient or inpatient infusion in dedicated oncology daycare suites with supportive premedications.',
    iconName: 'Activity',
    enabled: true,
    order: 5
  },
  {
    id: 'step-6',
    number: '06',
    title: 'Response & Toxicity Monitoring',
    shortDescription: 'Regular interval imaging, blood counts, and proactive management of side effects to preserve quality of life.',
    iconName: 'CheckCircle2',
    enabled: true,
    order: 6
  },
  {
    id: 'step-7',
    number: '07',
    title: 'Long-Term Survivorship & Follow-Up',
    shortDescription: 'Structured surveillance protocols and maintenance strategies to detect recurrence early and support wellness.',
    iconName: 'Shield',
    enabled: true,
    order: 7
  }
];

export const defaultContactEnquiries: ContactEnquiryItem[] = [
  {
    id: 'enq-1',
    name: 'Balwinder Kaur',
    phone: '+91 98150 44321',
    email: 'balwinder.k@example.com',
    message: 'Seeking opinion on chemotherapy protocol for ovarian cancer recurrence after 18 months.',
    sourcePage: 'Homepage - Final CTA',
    submittedDate: '2026-09-17 11:24 IST',
    status: 'New',
    utm: { source: 'google', medium: 'cpc', campaign: 'oncology_mohali' }
  },
  {
    id: 'enq-2',
    name: 'Suresh Singla',
    phone: '+91 94170 88210',
    email: 'suresh.s@example.com',
    message: 'Wanted to know if immunotherapy is available for renal cell carcinoma at Max Hospital Mohali.',
    sourcePage: 'Genitourinary Care Page',
    submittedDate: '2026-09-16 16:40 IST',
    status: 'Replied',
    notes: 'Called patient. Discussed nivolumab + cabozantinib protocol. Scheduled OPD on Thursday.'
  }
];

export const defaultMediaAssets: MediaAsset[] = [
  {
    id: 'med-hero-doc',
    title: 'Dr. Bhushan Parmar Hero Consultation Portrait (Standing White Coat)',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1600&q=85',
    category: 'Doctor Photos',
    dimensions: '1600 x 1067',
    size: 420000,
    mimeType: 'image/jpeg',
    altText: 'Dr. Bhushan Parmar, Senior Consultant Medical Oncology in consultation suite',
    uploadedAt: '2025-02-10'
  },
  {
    id: 'med-about-doc',
    title: 'Dr. Bhushan Parmar Closer Clinical Portrait (Meet Your Oncologist)',
    url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=85',
    category: 'Doctor Photos',
    dimensions: '1200 x 900',
    size: 310000,
    mimeType: 'image/jpeg',
    altText: 'Dr. Bhushan Parmar - Compassionate and evidence-based oncology care',
    uploadedAt: '2025-02-14'
  },
  {
    id: 'med-second-opinion',
    title: 'Oncology Report Review & PET-CT Discussion (Second Opinion)',
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=85',
    category: 'Backgrounds',
    dimensions: '1600 x 1067',
    size: 380000,
    mimeType: 'image/jpeg',
    altText: 'Physician examining diagnostic scans, pathology reports and second opinion oncology documentation',
    uploadedAt: '2025-02-18'
  },
  {
    id: 'med-3',
    title: 'High-Resolution Medical Anatomy Illustration',
    url: '/assets/images/medical_anatomy_human_1789719428122.jpg',
    category: 'Backgrounds',
    dimensions: '1200 x 1800',
    size: 340000,
    mimeType: 'image/jpeg',
    altText: 'Front-facing medical anatomical visualization for cancer care navigation',
    uploadedAt: '2025-03-01'
  },
  {
    id: 'med-final-cta-doc',
    title: 'Dr. Bhushan Parmar Final Consultation CTA Portrait',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=85',
    category: 'Doctor Photos',
    dimensions: '1200 x 800',
    size: 350000,
    mimeType: 'image/jpeg',
    altText: 'Dr. Bhushan Parmar, Senior Consultant Medical Oncology',
    uploadedAt: '2025-02-20'
  }
];

export const defaultNavigation: NavigationMenuItem[] = [
  { id: 'nav-home', label: 'Home', url: '#home', isExternal: false, order: 1, isVisible: true, openInNewTab: false },
  { id: 'nav-about', label: 'About Dr. Parmar', url: '#about', isExternal: false, order: 2, isVisible: true, openInNewTab: false },
  { id: 'nav-cancers', label: 'Cancer Care', url: '#cancers', isExternal: false, order: 3, isVisible: true, openInNewTab: false },
  { id: 'nav-treatments', label: 'Treatments', url: '#treatments', isExternal: false, order: 4, isVisible: true, openInNewTab: false },
  { id: 'nav-journey', label: 'Treatment Journey', url: '#journey', isExternal: false, order: 5, isVisible: true, openInNewTab: false },
  { id: 'nav-second-opinion', label: 'Second Opinion', url: '#second-opinion', isExternal: false, order: 6, isVisible: true, openInNewTab: false },
  { id: 'nav-blog', label: 'Patient Guides', url: '#resources', isExternal: false, order: 7, isVisible: true, openInNewTab: false },
  { id: 'nav-faq', label: 'FAQs', url: '#faqs', isExternal: false, order: 8, isVisible: true, openInNewTab: false },
  { id: 'nav-contact', label: 'Locations', url: '#locations', isExternal: false, order: 9, isVisible: true, openInNewTab: false }
];

export const defaultFooterConfig: FooterConfig = {
  doctorDescription:
    'Dr. Bhushan Parmar is a Senior Consultant in Medical Oncology with over a decade of specialized experience in systemic chemotherapy, precision oncology, targeted therapy, and hematological malignancies across Punjab, Chandigarh & North India.',
  phone: '+91 98141 23456',
  whatsapp: '+91 98141 23456',
  email: 'drbhushanparmar@gmail.com',
  address: 'Max Super Speciality Hospital, Phase 6, Sector 56, Mohali, Punjab 160055',
  copyright: '© 2026 Dr. Bhushan Parmar. All Rights Reserved.',
  medicalDisclaimer:
    'Medical Disclaimer: The clinical information presented on this website is for patient education and informational purposes only. It is not intended as a substitute for professional clinical medical advice, definitive diagnosis, or individualized treatment. Always consult a qualified medical oncologist for evaluation.',
  privacyPolicyLink: '/privacy-policy',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/drbhushanparmar',
    youtube: 'https://youtube.com/@drbhushanparmar-oncology',
    facebook: 'https://facebook.com/drbhushanparmar.oncology',
    instagram: 'https://instagram.com/drbhushanparmar.oncology'
  },
  footerCta: {
    title: 'Begin Your Personalized Cancer Care Journey',
    subtitle: 'Consult Dr. Bhushan Parmar for an evidence-based evaluation, biomarker testing review, or comprehensive second opinion.',
    buttonText: 'Book an Appointment',
    buttonLink: '#appointment'
  }
};

export const defaultSiteSettings: SiteSettingsConfig = {
  websiteName: 'Dr. Bhushan Parmar – Senior Medical Oncologist',
  siteUrl: 'https://drbhushanparmar.com',
  logoText: 'Dr. Bhushan Parmar',
  doctorTitle: 'Senior Consultant Medical Oncologist',
  favicon: '/favicon.ico',
  primaryColor: '#073F3D',
  secondaryColor: '#149A96',
  accentColor: '#18B8B4',
  defaultPhone: '+91 98141 23456',
  defaultWhatsapp: '+91 98141 23456',
  defaultEmail: 'drbhushanparmar@gmail.com',
  emergencyNotice: 'Emergency Notice: For acute oncological complications, severe neutropenic fever (>100.4°F), or sudden breathlessness, report immediately to your nearest 24x7 hospital Emergency Department.',
  maintenanceMode: false,
  maintenanceMessage: 'Our website is undergoing scheduled medical directory updates. For immediate OPD appointments, please call +91 98141 23456.',
  announcementBar: {
    enabled: true,
    text: 'Now Available for In-Person & Hybrid Video Second Opinions across Punjab, Haryana, Himachal & J&K.',
    ctaText: 'Schedule Consultation',
    ctaUrl: '#appointment'
  }
};

export const defaultSeoGlobalConfig: SeoGlobalConfig = {
  siteName: 'Dr. Bhushan Parmar – Medical Oncology Practice',
  defaultTitleFormat: '%s | Dr. Bhushan Parmar – Medical Oncologist Mohali',
  defaultMetaDescription: 'Official website of Dr. Bhushan Parmar, Senior Consultant Medical Oncologist in Mohali & Chandigarh. Specialist in chemotherapy, immunotherapy, targeted therapy, solid tumors & blood cancers.',
  defaultSocialImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80',
  robotsIndex: true,
  robotsFollow: true,
  sitemapEnabled: true,
  googleSearchConsole: 'gsc-verification-code-bhushan-parmar',
  googleAnalyticsId: 'G-ONCOLOGY778',
  metaPixelId: '',
  orgName: 'Dr. Bhushan Parmar Medical Oncology Practice',
  orgType: 'Physician',
  physicianSpecialty: 'MedicalOncology'
};

export const defaultRedirectRules: RedirectRule[] = [
  { id: 'red-1', oldUrl: '/doctor-profile', newUrl: '/#about', type: '301', enabled: true },
  { id: 'red-2', oldUrl: '/chemotherapy-clinic', newUrl: '/#treatments', type: '301', enabled: true },
  { id: 'red-3', oldUrl: '/second-opinion-desk', newUrl: '/#second-opinion', type: '301', enabled: true }
];

export const defaultFormBuilderConfig: FormBuilderConfig = {
  appointmentForm: {
    fields: {
      patientName: { label: 'Patient Full Name', placeholder: 'Enter patient legal name', required: true, enabled: true },
      phone: { label: 'Phone / WhatsApp Number', placeholder: '+91 98765 43210', required: true, enabled: true },
      email: { label: 'Email Address', placeholder: 'name@example.com', required: true, enabled: true },
      preferredDate: { label: 'Preferred Date', placeholder: 'Select preferred date', required: true, enabled: true },
      preferredSlot: { label: 'Preferred Time Slot', placeholder: 'Morning / Afternoon', required: false, enabled: true },
      consultationType: { label: 'Consultation Mode', placeholder: 'In-Person or Video', required: true, enabled: true },
      cancerTypeOrConcern: { label: 'Cancer Type / Primary Concern', placeholder: 'e.g. Lung cancer, Breast biopsy review', required: true, enabled: true },
      notes: { label: 'Clinical Background / Current Symptoms', placeholder: 'Describe biopsy results or previous treatment received', required: false, enabled: true }
    },
    notificationEmail: 'drbhushanparmar@gmail.com',
    successMessage: 'Thank you. Your consultation request has been logged. Our clinical coordinator will call to confirm your appointment within 2 working hours.'
  },
  contactForm: {
    fields: {
      name: { label: 'Full Name', placeholder: 'Your name', required: true, enabled: true },
      phone: { label: 'Phone Number', placeholder: 'Your contact number', required: true, enabled: true },
      email: { label: 'Email Address', placeholder: 'Your email address', required: true, enabled: true },
      message: { label: 'Message / Question', placeholder: 'How can Dr. Bhushan Parmar help you?', required: true, enabled: true }
    },
    notificationEmail: 'drbhushanparmar@gmail.com',
    successMessage: 'Your message has been received. Our clinical desk will get back to you shortly.'
  },
  secondOpinionForm: {
    fields: {
      name: { label: 'Patient Name', placeholder: 'Full patient name', required: true, enabled: true },
      phone: { label: 'Contact Phone / WhatsApp', placeholder: '+91 98765 43210', required: true, enabled: true },
      email: { label: 'Email Address', placeholder: 'name@example.com', required: true, enabled: true },
      cityCountry: { label: 'City & Country', placeholder: 'e.g. Mohali / Chandigarh / London', required: true, enabled: true },
      cancerType: { label: 'Primary Cancer Site', placeholder: 'e.g. Colon Cancer Stage 3', required: true, enabled: true },
      currentDiagnosis: { label: 'Current Biopsy / Histopathology Diagnosis', placeholder: 'Details of tissue diagnosis', required: true, enabled: true },
      previousTreatment: { label: 'Treatment Received So Far', placeholder: 'Chemo cycles, surgery, or radiation details', required: false, enabled: true },
      message: { label: 'Specific Question for Dr. Bhushan Parmar', placeholder: 'What clinical question would you like addressed in the second opinion?', required: true, enabled: true }
    },
    notificationEmail: 'drbhushanparmar@gmail.com',
    successMessage: 'Your second opinion dossier has been submitted securely. Dr. Bhushan Parmar will review your reports.'
  }
};

export const defaultActivityLogs: ActivityLogItem[] = [
  {
    id: 'log-1',
    userEmail: 'admin@oncology.care',
    userName: 'Dr. Bhushan Parmar',
    action: 'LOGIN',
    entityType: 'AUTH',
    timestamp: '2026-09-18 08:30 IST',
    details: 'Logged in from administrator workstation'
  },
  {
    id: 'log-2',
    userEmail: 'content@oncology.care',
    userName: 'Clinical Content Editor',
    action: 'PAGE_UPDATED',
    entityType: 'HERO',
    entityId: 'sec-hero',
    timestamp: '2026-09-17 16:45 IST',
    details: 'Updated Hero credentials and precision oncology messaging'
  },
  {
    id: 'log-3',
    userEmail: 'enquiries@oncology.care',
    userName: 'Patient Care Coordinator',
    action: 'STATUS_CHANGED',
    entityType: 'APPOINTMENT',
    entityId: 'app-sample-2',
    timestamp: '2026-09-17 11:20 IST',
    details: 'Changed status of appointment for Anuradha Devi to Confirmed'
  }
];

export const defaultBlogPosts: BlogPostRecord[] = [
  {
    id: 'blog-1',
    title: 'Understanding Targeted Therapy in Modern Medical Oncology',
    slug: 'understanding-targeted-therapy-modern-medical-oncology',
    category: 'Targeted Therapy',
    excerpt: 'How precision molecular diagnostics and kinase inhibitors target cancer cell specific mutations while sparing healthy tissue.',
    featuredImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
    mainContent: 'Precision oncology has revolutionized the treatment landscape of solid tumors and blood cancers. Unlike traditional chemotherapy which affects rapidly dividing cells indiscriminately, targeted therapies home in on specific proteins or genetic mutations that drive tumor growth.\n\nDr. Bhushan Parmar discusses the importance of comprehensive genomic profiling (CGP) prior to initiating therapy, and how personalized treatment selection significantly improves clinical response and patient quality of life.',
    author: 'Dr. Bhushan Parmar',
    publishDate: '2026-03-10',
    readingTime: '5 min read',
    seoTitle: 'Understanding Targeted Therapy | Dr. Bhushan Parmar Oncology',
    metaDescription: 'Learn how targeted therapy and precision oncology match cancer treatments to genetic profiles for better clinical outcomes.',
    status: 'published',
    displayOrder: 1,
    updatedAt: '2026-03-10'
  },
  {
    id: 'blog-2',
    title: 'What Patients Should Know About Immunotherapy Side Effects',
    slug: 'what-patients-should-know-about-immunotherapy-side-effects',
    category: 'Immunotherapy',
    excerpt: 'A comprehensive guide for patients undergoing checkpoint inhibitor immunotherapy and recognizing immune-related adverse events.',
    featuredImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80',
    mainContent: 'Immunotherapy harnesses the body’s own immune system to recognize and attack cancer cells. While often associated with fewer conventional side effects than chemotherapy, checkpoint inhibitors can prompt immune-mediated responses in healthy organs.\n\nEarly detection and timely management of immune-related adverse events (irAEs) by an experienced medical oncologist are vital for patient safety.',
    author: 'Dr. Bhushan Parmar',
    publishDate: '2026-03-05',
    readingTime: '4 min read',
    seoTitle: 'Immunotherapy Side Effects Guide | Dr. Bhushan Parmar',
    metaDescription: 'Understand checkpoint inhibitors, potential immune-related side effects, and how your oncology team manages them.',
    status: 'published',
    displayOrder: 2,
    updatedAt: '2026-03-05'
  },
  {
    id: 'blog-3',
    title: 'Managing Chemotherapy Fatigue & Nutrition During Treatment',
    slug: 'managing-chemotherapy-fatigue-and-nutrition',
    category: 'Patient Guidance',
    excerpt: 'Practical clinical recommendations for maintaining energy, dietary strength, and well-being during systemic oncology therapy.',
    featuredImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=900&q=80',
    mainContent: 'Fatigue is one of the most common symptoms reported by patients undergoing cancer treatment. Combining structured gentle physical activity with optimal caloric and protein nutrition can make a profound difference.\n\nDr. Bhushan Parmar emphasizes supportive care integration from day one to ensure treatment adherence and preserve overall vitality.',
    author: 'Dr. Bhushan Parmar',
    publishDate: '2026-02-28',
    readingTime: '6 min read',
    seoTitle: 'Chemotherapy Fatigue & Nutrition Tips | Dr. Bhushan Parmar',
    metaDescription: 'Expert advice on managing fatigue and maintaining balanced nutrition during cancer treatment.',
    status: 'published',
    displayOrder: 3,
    updatedAt: '2026-02-28'
  }
];

