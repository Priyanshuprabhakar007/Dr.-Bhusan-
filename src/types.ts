export interface DoctorProfile {
  name: string;
  speciality: string;
  positioning: string;
  experienceYears: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  bioSummary: string;
  fullBio: string[];
  photoUrl: string;
  heroPhoto?: string;
  aboutPhoto?: string;
  profilePhoto?: string;
  secondOpinionPhoto?: string;
  ctaPhoto?: string;
  mobilePhoto?: string;
  signatureUrl?: string;
  qualifications: {
    degree: string;
    institution: string;
    period?: string;
    description?: string;
  }[];
  coreExpertise: string[];
  memberships: string[];
}

export interface PracticeLocation {
  hospitalName: string;
  department: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  consultationTimings: string;
  daysAvailable: string;
  phonePrimary: string;
  phoneSecondary?: string;
  whatsappNumber: string;
  emailContact: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  locationImage?: string;
  hospitalImage?: string;
  mapPreviewImage?: string;
}

export interface Treatment {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  category: 'Systemic' | 'Targeted' | 'Cellular' | 'Preventive' | 'Supportive';
  overview: string;
  indications: string[];
  howItWorks: string;
  keyBenefits: string[];
  whatToExpect: string;
  featuredImage?: string;
  cardImage?: string;
  heroImage?: string;
  iconImage?: string;
}

export interface CancerType {
  id: string;
  name: string;
  category: 'Solid Tumor' | 'Blood Cancer' | 'Rare & Advanced';
  slug: string;
  shortOverview: string;
  symptoms: string[];
  diagnosticEvaluation: string[];
  medicalOncologyTreatment: string[];
  personalizedApproach: string;
  featuredImage?: string;
  cardImage?: string;
  bannerImage?: string;
  mobileBannerImage?: string;
}

export interface BloodCancerDetail {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  diagnosticWorkup: string[];
  systemicTherapies: string[];
  monitoringProtocols: string[];
  featuredImage?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishedDate: string;
  readTime: string;
  author: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  featuredImageUrl: string;
  heroImageUrl?: string;
  ogImageUrl?: string;
  contentImages?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  source: 'Google Review';
  rating: number;
  date: string;
  condition: string;
  reviewText: string;
  verified: boolean;
}

export interface UploadedFileMeta {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  category: 'Pathology' | 'Biopsy' | 'PET-CT/CT' | 'Previous Summary' | 'Other';
}

export interface SecondOpinionSubmission {
  id: string;
  submittedAt: string;
  status: 'Pending Review' | 'Reviewed' | 'Contacted';
  name: string;
  phone: string;
  email: string;
  cityCountry: string;
  cancerType: string;
  currentDiagnosis: string;
  previousTreatment: string;
  message: string;
  attachedFiles: UploadedFileMeta[];
}

export interface AppointmentSubmission {
  id: string;
  submittedAt: string;
  status: 'New' | 'Confirmed' | 'Completed' | 'Cancelled';
  patientName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredSlot: string;
  consultationType: 'In-Person (Hospital)' | 'Video Consultation';
  cancerTypeOrConcern: string;
  notes?: string;
}

export interface LocalSeoPageData {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  intro: string;
  whyChooseDrBhushan: string[];
  servicesOffered: string[];
  clinicalFocus: string;
}
