export type AdminRole = 'super_admin' | 'content_manager' | 'enquiry_manager';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  passwordHash: string;
  salt: string;
  status: 'active' | 'disabled';
  lastLogin?: string;
  createdAt: string;
}

export interface ActivityLogItem {
  id: string;
  userEmail: string;
  userName: string;
  action: string;
  entityType: string;
  entityId?: string;
  timestamp: string;
  details?: string;
}

export interface CredentialItem {
  id: string;
  isCount: boolean;
  countTarget?: number;
  suffix?: string;
  highlight?: string;
  label: string;
  iconName: string;
  enabled: boolean;
  order: number;
}

export interface HeroContent {
  smallLabel: string;
  mainHeading: string;
  highlightedHeading: string;
  subHeading: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
  doctorHeroImage: string;
  mobileDoctorHeroImage?: string;
  doctorHeroFocalPoint?: string;
  doctorHeroAltText?: string;
  heroBackgroundImage: string;
  heroOverlayStrength: number; // 0 to 100
  credentials: CredentialItem[];
}

export interface HeroAnimationSettings {
  headingAnimation: 'mask' | 'fade-up' | 'slide' | 'none';
  doctorImageAnimation: 'clip' | 'fade' | 'slide-right' | 'none';
  credentialAnimation: 'stagger' | 'fade' | 'none';
  globalSpeed: 'slow' | 'normal' | 'fast';
  enableHeroAnimations: boolean;
}

export interface GlobalAnimationSettings {
  enabled: boolean;
  intensity: 'subtle' | 'standard' | 'enhanced';
  marquee: {
    enabled: boolean;
    speed: 'slow' | 'normal' | 'fast';
    direction: 'left' | 'right';
    phrases: string[];
  };
}

export interface AboutDoctorSectionContent {
  smallLabel: string;
  mainHeading: string;
  subHeading: string;
  aboutDoctorImage: string;
  aboutDoctorMobileImage?: string;
  aboutDoctorFocalPoint?: string;
  aboutDoctorAltText?: string;
  quote: string;
  ctaLabel: string;
}

export interface SecondOpinionSectionContent {
  smallLabel: string;
  mainHeading: string;
  description: string;
  secondOpinionImage: string;
  secondOpinionMobileImage?: string;
  secondOpinionFocalPoint?: string;
  secondOpinionAltText?: string;
  secondOpinionOverlayStrength: number; // 0 to 100
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
}

export interface FinalCtaSectionContent {
  smallLabel: string;
  mainHeading: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  finalCtaImage: string;
  imageId?: string;
  finalCtaMobileImage?: string;
  finalCtaImagePositionX: number; // 0 to 100
  finalCtaImagePositionY: number; // 0 to 100
  finalCtaMobileImagePositionX?: number; // 0 to 100
  finalCtaMobileImagePositionY?: number; // 0 to 100
  finalCtaAltText: string;
}

export interface HomepageSectionConfig {
  id: string;
  name: string;
  visible: boolean;
  order: number;
  customTitle?: string;
  customSubtitle?: string;
  theme?: 'light' | 'teal' | 'navy';
}

export interface DoctorProfileExtended {
  name: string;
  professionalTitle: string;
  specialization: string;
  shortIntro: string;
  fullBio: string[];
  yearsExperience: number;
  qualifications: {
    id: string;
    degree: string;
    institution: string;
    year?: string;
    description?: string;
    order: number;
  }[];
  training: string[];
  areasOfExpertise: string[];
  profilePhoto: string;
  heroPhoto: string;
  aboutPhoto: string;
  signatureUrl?: string;
}

export interface LocationItem {
  id: string;
  hospitalName: string;
  department: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phonePrimary: string;
  phoneSecondary?: string;
  whatsappNumber: string;
  emailContact: string;
  consultationDays: string;
  openingTime: string;
  closingTime: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  locationImage?: string;
  active: boolean;
  isPrimary: boolean;
  order: number;
}

export interface BodyExplorerRegionConfig {
  id: string;
  label: string;
  title: string;
  description: string;
  conditions: string[];
  treatments: string[];
  iconName: string;
  hotspot: { x: number; y: number }; // percentage
  connectorOffset: { dx: number; dy: number };
  organHighlight: string;
  ctaLabel: string;
  ctaUrl: string;
  pageSlug: string;
  active: boolean;
  displayOrder: number;
}

export interface CancerCategoryItem {
  id: string;
  name: string;
  shortName: string;
  iconName: string;
  featuredImage: string;
  shortDesc: string;
  longDesc: string;
  seoSlug: string;
  displayOrder: number;
  status: 'published' | 'draft';
}

export interface CancerPageRecord {
  id: string;
  categoryId: string;
  pageTitle: string;
  urlSlug: string;
  shortIntro: string;
  overview: string;
  symptoms: string[];
  diagnosis: string[];
  treatmentOptions: string[];
  whoShouldConsult: string;
  faqs: { question: string; answer: string }[];
  featuredImage: string;
  ctaLabel: string;
  ctaUrl: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  schemaType: string;
  status: 'published' | 'draft';
  updatedAt: string;
  updatedBy: string;
}

export interface TreatmentRecord {
  id: string;
  title: string;
  slug: string;
  category: 'Systemic' | 'Targeted' | 'Cellular' | 'Preventive' | 'Supportive';
  shortDesc: string;
  fullContent: string;
  iconName: string;
  featuredImage: string;
  benefits: string[];
  whoMayBeConsidered: string[];
  treatmentProcess: string[];
  faqs: { question: string; answer: string }[];
  ctaText: string;
  ctaUrl: string;
  seoTitle: string;
  metaDescription: string;
  status: 'published' | 'draft';
  displayOrder: number;
}

export interface HowCanWeHelpItem {
  id: string;
  title: string;
  description: string;
  image: string;
  iconName: string;
  ctaLabel: string;
  ctaLink: string;
  show: boolean;
  order: number;
}

export interface JourneyStepItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  iconName?: string;
  enabled: boolean;
  order: number;
}

export interface ContactEnquiryItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  sourcePage: string;
  submittedDate: string;
  status: 'New' | 'Replied' | 'Archived';
  notes?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
    referrer?: string;
  };
}

export interface MediaAsset {
  id: string;
  title: string;
  url: string;
  category:
    | 'Doctor Photos'
    | 'Homepage'
    | 'Cancer Care'
    | 'Treatments'
    | 'Body Explorer'
    | 'Blog'
    | 'Locations'
    | 'Branding'
    | 'Backgrounds'
    | 'SEO / Social'
    | 'Icons'
    | 'Documents'
    | 'Miscellaneous';
  dimensions?: string;
  size: number;
  mimeType: string;
  altText: string;
  caption?: string;
  uploadedAt: string;
  focalPoint?: string;
}

export interface NavigationMenuItem {
  id: string;
  label: string;
  url: string;
  isExternal: boolean;
  order: number;
  isVisible: boolean;
  openInNewTab: boolean;
}

export interface FooterConfig {
  doctorDescription: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  copyright: string;
  medicalDisclaimer: string;
  privacyPolicyLink: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    linkedin?: string;
    twitter?: string;
  };
  footerCta: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
  };
}

export interface SiteSettingsConfig {
  websiteName: string;
  siteUrl: string;
  logoText: string;
  doctorTitle: string;
  logoUrl?: string;
  darkLogoUrl?: string;
  lightLogoUrl?: string;
  mobileLogoUrl?: string;
  footerLogoUrl?: string;
  favicon: string;
  appleTouchIcon?: string;
  defaultSocialImage?: string;
  secondOpinionBannerImage?: string;
  finalCtaDoctorImage?: string;
  anatomyImage?: string;
  desktopAnatomyImage?: string;
  mobileAnatomyImage?: string;
  bodyExplorerBackgroundVisual?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  defaultPhone: string;
  defaultWhatsapp: string;
  defaultEmail: string;
  emergencyNotice: string;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  announcementBar: {
    enabled: boolean;
    text: string;
    ctaText: string;
    ctaUrl: string;
    startDate?: string;
    endDate?: string;
  };
}

export interface SeoGlobalConfig {
  siteName: string;
  defaultTitleFormat: string;
  defaultMetaDescription: string;
  defaultSocialImage: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  sitemapEnabled: boolean;
  googleSearchConsole: string;
  googleAnalyticsId: string;
  metaPixelId: string;
  orgName: string;
  orgType: string;
  physicianSpecialty: string;
}

export interface RedirectRule {
  id: string;
  oldUrl: string;
  newUrl: string;
  type: '301' | '302';
  enabled: boolean;
}

export interface FormBuilderConfig {
  appointmentForm: {
    fields: Record<string, { label: string; placeholder: string; required: boolean; enabled: boolean }>;
    notificationEmail: string;
    successMessage: string;
  };
  contactForm: {
    fields: Record<string, { label: string; placeholder: string; required: boolean; enabled: boolean }>;
    notificationEmail: string;
    successMessage: string;
  };
  secondOpinionForm: {
    fields: Record<string, { label: string; placeholder: string; required: boolean; enabled: boolean }>;
    notificationEmail: string;
    successMessage: string;
  };
}

export interface ContentRevision {
  id: string;
  entityType: string;
  entityId: string;
  snapshot: any;
  timestamp: string;
  updatedBy: string;
  notes?: string;
}

export interface BlogPostRecord {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  featuredImage: string;
  mainContent: string;
  author: string;
  publishDate: string;
  readingTime: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  openGraphImage?: string;
  status: 'published' | 'draft' | 'scheduled';
  displayOrder?: number;
  updatedAt: string;
}

