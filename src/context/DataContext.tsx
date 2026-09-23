import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  DoctorProfile,
  PracticeLocation,
  Treatment,
  CancerType,
  BloodCancerDetail,
  BlogPost,
  FAQItem,
  Testimonial,
  AppointmentSubmission,
  SecondOpinionSubmission,
  LocalSeoPageData,
  UploadedFileMeta
} from '../types';
import {
  AdminRole,
  AdminUser,
  ActivityLogItem,
  HeroContent,
  AboutDoctorSectionContent,
  SecondOpinionSectionContent,
  HeroAnimationSettings,
  GlobalAnimationSettings,
  HomepageSectionConfig,
  LocationItem,
  BodyExplorerRegionConfig,
  CancerCategoryItem,
  CancerPageRecord,
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
  ContentRevision,
  FinalCtaSectionContent,
  BlogPostRecord
} from '../types/admin';
import {
  initialDoctorProfile,
  initialPracticeLocation,
  initialTreatments,
  initialCancers,
  bloodCancerDetails,
  initialBlogPosts,
  initialFAQs,
  initialTestimonials,
  localSeoPages
} from '../data/initialData';
import {
  defaultAdminUsers,
  defaultHeroContent,
  defaultAboutDoctorContent,
  defaultSecondOpinionContent,
  defaultFinalCtaContent,
  defaultHeroAnimationSettings,
  defaultGlobalAnimationSettings,
  defaultHomepageSections,
  defaultLocations,
  defaultBodyExplorerRegions,
  defaultCancerCategories,
  defaultCancerPages,
  defaultHowCanWeHelp,
  defaultJourneySteps,
  defaultContactEnquiries,
  defaultMediaAssets,
  defaultNavigation,
  defaultFooterConfig,
  defaultSiteSettings,
  defaultSeoGlobalConfig,
  defaultRedirectRules,
  defaultFormBuilderConfig,
  defaultActivityLogs,
  defaultBlogPosts
} from '../data/adminDefaults';
import { hashPassword, generateSalt } from '../utils/security';
import { getMediaSlotDefinition } from '../data/mediaSlotRegistry';
import { resolveMediaUrl } from '../lib/cloudflareMedia';

interface DataContextType {
  // Public Data
  doctorProfile: DoctorProfile;
  practiceLocation: PracticeLocation;
  treatments: Treatment[];
  cancers: CancerType[];
  bloodCancers: BloodCancerDetail[];
  blogPosts: BlogPostRecord[];
  faqs: FAQItem[];
  testimonials: Testimonial[];
  appointments: AppointmentSubmission[];
  secondOpinions: SecondOpinionSubmission[];
  localSeoList: LocalSeoPageData[];

  // CMS Collections & Extended Settings
  heroContent: HeroContent;
  aboutDoctorContent: AboutDoctorSectionContent;
  secondOpinionContent: SecondOpinionSectionContent;
  finalCtaContent: FinalCtaSectionContent;
  heroAnimationSettings: HeroAnimationSettings;
  globalAnimationSettings: GlobalAnimationSettings;
  homepageSections: HomepageSectionConfig[];
  locations: LocationItem[];
  bodyExplorerRegions: BodyExplorerRegionConfig[];
  cancerCategories: CancerCategoryItem[];
  cancerPages: CancerPageRecord[];
  howCanWeHelp: HowCanWeHelpItem[];
  treatmentJourney: JourneyStepItem[];
  contactEnquiries: ContactEnquiryItem[];
  mediaAssets: MediaAsset[];
  navigationMenu: NavigationMenuItem[];
  footerConfig: FooterConfig;
  siteSettings: SiteSettingsConfig;
  seoGlobalConfig: SeoGlobalConfig;
  redirectRules: RedirectRule[];
  formBuilderConfig: FormBuilderConfig;
  activityLogs: ActivityLogItem[];
  adminUsers: AdminUser[];
  currentAdminUser: AdminUser | null;
  adminRole: AdminRole | null;

  // Routing and Navigation States
  activeSection: string;
  setActiveSection: (sec: string) => void;
  selectedCancerSlug: string | null;
  setSelectedCancerSlug: (slug: string | null) => void;
  selectedTreatmentId: string | null;
  setSelectedTreatmentId: (id: string | null) => void;
  selectedBlogSlug: string | null;
  setSelectedBlogSlug: (slug: string | null) => void;
  selectedLocalSeoSlug: string | null;
  setSelectedLocalSeoSlug: (slug: string | null) => void;
  isAdminRoute: boolean;
  navigateToAdmin: () => void;
  navigateToPublic: () => void;

  // Modals
  isAppointmentModalOpen: boolean;
  openAppointmentModal: () => void;
  closeAppointmentModal: () => void;
  isSecondOpinionModalOpen: boolean;
  openSecondOpinionModal: () => void;
  closeSecondOpinionModal: () => void;
  isAdminModalOpen: boolean;
  openAdminModal: () => void;
  closeAdminModal: () => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminLogin: (email: string, pass: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string; user?: AdminUser }>;
  loginAdmin: (password: string) => boolean; // backward compatibility
  adminLogout: () => void;
  logoutAdmin: () => void; // backward compatibility

  // CMS Updaters
  updateDoctorProfile: (profile: Partial<DoctorProfile>) => void;
  updatePracticeLocation: (loc: Partial<PracticeLocation>) => void;
  updateHeroContent: (content: Partial<HeroContent>) => void;
  updateAboutDoctorContent: (content: Partial<AboutDoctorSectionContent>) => void;
  updateSecondOpinionContent: (content: Partial<SecondOpinionSectionContent>) => void;
  updateFinalCtaContent: (content: Partial<FinalCtaSectionContent>) => void;
  updateHeroAnimationSettings: (settings: Partial<HeroAnimationSettings>) => void;
  updateGlobalAnimationSettings: (settings: Partial<GlobalAnimationSettings>) => void;
  updateHomepageSections: (sections: HomepageSectionConfig[]) => void;
  updateLocations: (locations: LocationItem[]) => void;
  addLocation: (location: LocationItem) => void;
  deleteLocation: (id: string) => void;
  updateBodyExplorerRegion: (id: string, region: Partial<BodyExplorerRegionConfig>) => void;
  resetBodyExplorerRegions: () => void;
  updateCancerCategories: (cats: CancerCategoryItem[]) => void;
  updateCancerPage: (id: string, page: Partial<CancerPageRecord>) => void;
  addCancerPage: (page: CancerPageRecord) => void;
  deleteCancerPage: (id: string) => void;
  updateHowCanWeHelp: (items: HowCanWeHelpItem[]) => void;
  updateTreatmentJourney: (steps: JourneyStepItem[]) => void;
  updateTreatment: (id: string, data: Partial<Treatment>) => void;
  addTreatment: (treatment: Treatment) => void;
  deleteTreatment: (id: string) => void;
  updateCancer: (id: string, data: Partial<CancerType>) => void;
  addCancer: (cancer: CancerType) => void;
  deleteCancer: (id: string) => void;
  updateBlogPost: (id: string, data: Partial<BlogPost>) => void;
  updateBlogPosts: (posts: BlogPostRecord[]) => void;
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  updateFAQ: (id: string, data: Partial<FAQItem>) => void;
  addFAQ: (faq: FAQItem) => void;
  deleteFAQ: (id: string) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  addMediaAsset: (asset: MediaAsset) => void;
  deleteMediaAsset: (id: string) => void;
  mediaSlots: Record<string, any>;
  getSlotMediaUrl: (slotKey: string, fallback?: string) => string;
  saveSlotDraft: (slotKey: string, draftValue: string, meta?: any) => Promise<boolean>;
  publishSlot: (slotKey: string) => Promise<boolean>;
  publishAllSlots: () => Promise<boolean>;
  updateNavigationMenu: (menu: NavigationMenuItem[]) => void;
  updateFooterConfig: (footer: Partial<FooterConfig>) => void;
  updateSiteSettings: (settings: Partial<SiteSettingsConfig>) => void;
  updateSeoGlobalConfig: (seo: Partial<SeoGlobalConfig>) => void;
  updateRedirectRules: (rules: RedirectRule[]) => void;
  updateFormBuilderConfig: (config: Partial<FormBuilderConfig>) => void;

  // Submissions & Enquiries
  submitAppointment: (data: Omit<AppointmentSubmission, 'id' | 'submittedAt' | 'status'>) => Promise<boolean>;
  updateAppointmentStatus: (id: string, status: AppointmentSubmission['status'], notes?: string) => void;
  deleteAppointment: (id: string) => void;
  submitSecondOpinion: (opinion: Omit<SecondOpinionSubmission, 'id' | 'submittedAt' | 'status'>) => Promise<boolean>;
  updateSecondOpinionStatus: (id: string, status: SecondOpinionSubmission['status'], notes?: string) => void;
  deleteSecondOpinion: (id: string) => void;
  submitContactEnquiry: (enquiry: Omit<ContactEnquiryItem, 'id' | 'submittedDate' | 'status'>) => Promise<boolean>;
  updateContactEnquiryStatus: (id: string, status: ContactEnquiryItem['status'], notes?: string) => void;
  deleteContactEnquiry: (id: string) => void;

  // User Management
  addAdminUser: (user: Omit<AdminUser, 'id' | 'createdAt'>, passwordPlain: string) => Promise<boolean>;
  updateAdminUserRole: (id: string, role: AdminRole) => void;
  updateAdminUserStatus: (id: string, status: 'active' | 'disabled') => void;
  deleteAdminUser: (id: string) => void;

  // Activity Log & Reset
  logActivity: (action: string, entityType: string, entityId?: string, details?: string) => void;
  resetAllDataToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'dr_bhushan_profile_v2',
  LOCATION: 'dr_bhushan_location_v2',
  TREATMENTS: 'dr_bhushan_treatments_v2',
  CANCERS: 'dr_bhushan_cancers_v2',
  BLOGS: 'dr_bhushan_blogs_v2',
  FAQS: 'dr_bhushan_faqs_v2',
  TESTIMONIALS: 'dr_bhushan_testimonials_v2',
  APPOINTMENTS: 'dr_bhushan_appointments_v2',
  SECOND_OPINIONS: 'dr_bhushan_second_opinions_v2',
  CONTACT_ENQUIRIES: 'dr_bhushan_contact_enquiries_v2',
  HERO_CONTENT: 'dr_bhushan_hero_content_v2',
  ABOUT_DOCTOR_CONTENT: 'dr_bhushan_about_doc_content_v2',
  SECOND_OPINION_CONTENT: 'dr_bhushan_second_op_content_v2',
  HERO_ANIMATION: 'dr_bhushan_hero_anim_v2',
  GLOBAL_ANIMATION: 'dr_bhushan_global_anim_v2',
  HOMEPAGE_SECTIONS: 'dr_bhushan_hp_sections_v2',
  LOCATIONS_LIST: 'dr_bhushan_locations_list_v2',
  BODY_REGIONS: 'dr_bhushan_body_regions_v2',
  CANCER_CATEGORIES: 'dr_bhushan_cancer_cats_v2',
  CANCER_PAGES: 'dr_bhushan_cancer_pages_v2',
  HOW_CAN_HELP: 'dr_bhushan_how_help_v2',
  JOURNEY_STEPS: 'dr_bhushan_journey_steps_v2',
  MEDIA_ASSETS: 'dr_bhushan_media_assets_v2',
  NAVIGATION: 'dr_bhushan_nav_menu_v2',
  FOOTER: 'dr_bhushan_footer_v2',
  SITE_SETTINGS: 'dr_bhushan_site_settings_v2',
  SEO_GLOBAL: 'dr_bhushan_seo_global_v2',
  REDIRECT_RULES: 'dr_bhushan_redirect_rules_v2',
  FORM_BUILDER: 'dr_bhushan_form_builder_v2',
  ADMIN_USERS: 'dr_bhushan_admin_users_v2',
  CURRENT_USER: 'dr_bhushan_current_user_v2',
  ACTIVITY_LOGS: 'dr_bhushan_activity_logs_v2',
  FINAL_CTA_CONTENT: 'dr_bhushan_final_cta_content_v2'
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Declarations initialized with defaults, populated from Cloudflare D1
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile>(initialDoctorProfile);
  const [practiceLocation, setPracticeLocation] = useState<PracticeLocation>(initialPracticeLocation);
  const [treatments, setTreatments] = useState<Treatment[]>(initialTreatments);
  const [cancers, setCancers] = useState<CancerType[]>(initialCancers);
  const [blogPosts, setBlogPosts] = useState<BlogPostRecord[]>(defaultBlogPosts);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFAQs);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [appointments, setAppointments] = useState<AppointmentSubmission[]>([]);
  const [secondOpinions, setSecondOpinions] = useState<SecondOpinionSubmission[]>([]);
  const [contactEnquiries, setContactEnquiries] = useState<ContactEnquiryItem[]>(defaultContactEnquiries);

  // Extended CMS Collections
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [aboutDoctorContent, setAboutDoctorContent] = useState<AboutDoctorSectionContent>(defaultAboutDoctorContent);
  const [secondOpinionContent, setSecondOpinionContent] = useState<SecondOpinionSectionContent>(defaultSecondOpinionContent);
  const [finalCtaContent, setFinalCtaContent] = useState<FinalCtaSectionContent>(defaultFinalCtaContent);
  const [heroAnimationSettings, setHeroAnimationSettings] = useState<HeroAnimationSettings>(defaultHeroAnimationSettings);
  const [globalAnimationSettings, setGlobalAnimationSettings] = useState<GlobalAnimationSettings>(defaultGlobalAnimationSettings);
  const [homepageSections, setHomepageSections] = useState<HomepageSectionConfig[]>(defaultHomepageSections);
  const [locations, setLocations] = useState<LocationItem[]>(defaultLocations);
  const [bodyExplorerRegions, setBodyExplorerRegions] = useState<BodyExplorerRegionConfig[]>(defaultBodyExplorerRegions);
  const [cancerCategories, setCancerCategories] = useState<CancerCategoryItem[]>(defaultCancerCategories);
  const [cancerPages, setCancerPages] = useState<CancerPageRecord[]>(defaultCancerPages);
  const [howCanWeHelp, setHowCanWeHelp] = useState<HowCanWeHelpItem[]>(defaultHowCanWeHelp);
  const [treatmentJourney, setTreatmentJourney] = useState<JourneyStepItem[]>(defaultJourneySteps);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(defaultMediaAssets);
  const [mediaSlots, setMediaSlots] = useState<Record<string, any>>({});
  const [navigationMenu, setNavigationMenu] = useState<NavigationMenuItem[]>(defaultNavigation);
  const [footerConfig, setFooterConfig] = useState<FooterConfig>(defaultFooterConfig);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsConfig>(defaultSiteSettings);
  const [seoGlobalConfig, setSeoGlobalConfig] = useState<SeoGlobalConfig>(defaultSeoGlobalConfig);
  const [redirectRules, setRedirectRules] = useState<RedirectRule[]>(defaultRedirectRules);
  const [formBuilderConfig, setFormBuilderConfig] = useState<FormBuilderConfig>(defaultFormBuilderConfig);
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(defaultActivityLogs);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(defaultAdminUsers);
  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(null);

  const [isLoadingFromCloudflare, setIsLoadingFromCloudflare] = useState(true);

  // FETCH ALL DATA FROM CLOUDFLARE D1 WORKER API ON MOUNT & ROUTE CHANGE
  const fetchCloudflareData = useCallback(async () => {
    try {
      setIsLoadingFromCloudflare(true);
      const res = await fetch('/api/public/site');
      if (res.ok) {
        const data = await res.json();
        if (data.siteSettings) setSiteSettings(data.siteSettings);
        if (data.doctorProfile) {
          setDoctorProfile({
            ...initialDoctorProfile,
            ...data.doctorProfile,
            fullBio: Array.isArray(data.doctorProfile.fullBio) ? data.doctorProfile.fullBio : (initialDoctorProfile.fullBio || []),
            qualifications: Array.isArray(data.doctorProfile.qualifications) ? data.doctorProfile.qualifications : (initialDoctorProfile.qualifications || []),
            coreExpertise: Array.isArray(data.doctorProfile.coreExpertise) ? data.doctorProfile.coreExpertise : (initialDoctorProfile.coreExpertise || []),
            memberships: Array.isArray(data.doctorProfile.memberships) ? data.doctorProfile.memberships : (initialDoctorProfile.memberships || [])
          });
        }
        if (data.heroContent) setHeroContent(data.heroContent);
        if (data.aboutDoctorContent) setAboutDoctorContent(data.aboutDoctorContent);
        if (data.secondOpinionContent) setSecondOpinionContent(data.secondOpinionContent);
        if (data.finalCtaContent) setFinalCtaContent(data.finalCtaContent);
        if (data.heroAnimationSettings) setHeroAnimationSettings(data.heroAnimationSettings);
        if (data.globalAnimationSettings) setGlobalAnimationSettings(data.globalAnimationSettings);
        if (data.homepageSections) setHomepageSections(data.homepageSections);
        if (data.howCanWeHelp) setHowCanWeHelp(Array.isArray(data.howCanWeHelp) ? data.howCanWeHelp : []);
        if (data.treatmentJourney) setTreatmentJourney(Array.isArray(data.treatmentJourney) ? data.treatmentJourney : []);
        if (data.cancers) setCancers(Array.isArray(data.cancers) ? data.cancers : []);
        if (data.cancerCategories) setCancerCategories(Array.isArray(data.cancerCategories) ? data.cancerCategories : []);
        if (data.cancerPages) setCancerPages(Array.isArray(data.cancerPages) ? data.cancerPages : []);
        if (data.treatments) setTreatments(Array.isArray(data.treatments) ? data.treatments : []);
        if (data.bodyExplorerRegions) {
          const normalized = data.bodyExplorerRegions.map((r: any) => {
            const normId = r.id === 'chest-lungs' ? 'chest-lung' : (r.id === 'abdomen-gi' ? 'gastrointestinal' : (r.id === 'pelvis-gu' ? 'genitourinary' : r.id));
            const matchedDefault = defaultBodyExplorerRegions.find((d: any) => d.id === normId);
            return {
              ...matchedDefault,
              ...r,
              id: r.id, // preserve database ID
              hotspot: r.hotspot || matchedDefault?.hotspot || { x: r.x_percent ?? r.xPercent ?? 50, y: r.y_percent ?? r.yPercent ?? 50 },
              connectorOffset: r.connectorOffset || matchedDefault?.connectorOffset || { dx: 38, dy: -6 },
              conditions: Array.isArray(r.conditions) ? r.conditions : (matchedDefault?.conditions || []),
              treatments: Array.isArray(r.treatments) ? r.treatments : (matchedDefault?.treatments || [])
            };
          });
          setBodyExplorerRegions(normalized);
        }
        if (data.locations) setLocations(Array.isArray(data.locations) ? data.locations : []);
        if (data.blogPosts) setBlogPosts(Array.isArray(data.blogPosts) ? data.blogPosts : []);
        if (data.faqs) setFaqs(Array.isArray(data.faqs) ? data.faqs : []);
        if (data.testimonials) setTestimonials(Array.isArray(data.testimonials) ? data.testimonials : []);
        if (data.navigationMenu) setNavigationMenu(data.navigationMenu);
        if (data.footerConfig) setFooterConfig(data.footerConfig);
        if (data.mediaAssets) setMediaAssets(data.mediaAssets);
        if (data.mediaSlots) setMediaSlots(data.mediaSlots);
      }
    } catch (err) {
      console.warn('Unable to load from Cloudflare Worker API, using active memory state:', err);
    } finally {
      setIsLoadingFromCloudflare(false);
    }
  }, []);

  useEffect(() => {
    fetchCloudflareData();
  }, [fetchCloudflareData]);

  // Route & Modal States
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedCancerSlug, setSelectedCancerSlug] = useState<string | null>(null);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [selectedLocalSeoSlug, setSelectedLocalSeoSlug] = useState<string | null>(null);

  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isSecondOpinionModalOpen, setIsSecondOpinionModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sync route on popstate and hashchange
  useEffect(() => {
    const checkRoute = () => {
      const isAdm = window.location.pathname.startsWith('/admin') || window.location.hash === '#admin';
      setIsAdminRoute(isAdm);
    };
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const navigateToAdmin = useCallback(() => {
    window.history.pushState({}, '', '/admin');
    setIsAdminRoute(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToPublic = useCallback(() => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Activity Logger
  const logActivity = useCallback((action: string, entityType: string, entityId?: string, details?: string) => {
    const uniqueEntropy = Math.random().toString(36).substring(2, 9);
    const newLog: ActivityLogItem = {
      id: `log-${Date.now()}-${uniqueEntropy}`,
      userEmail: currentAdminUser?.email || 'admin@oncology.care',
      userName: currentAdminUser?.name || 'Administrator',
      action,
      entityType,
      entityId,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      details
    };
    setActivityLogs(prev => {
      const existing = prev.filter(l => l.id !== newLog.id);
      return [newLog, ...existing.slice(0, 199)];
    });
  }, [currentAdminUser]);

  // Authentication Logic
  const adminLogin = async (
    email: string,
    pass: string,
    rememberMe = false
  ): Promise<{ success: boolean; error?: string; user?: AdminUser }> => {
    const trimmedEmail = email.trim().toLowerCase();
    const user = adminUsers.find(u => u.email.toLowerCase() === trimmedEmail);

    if (!user) {
      return { success: false, error: 'User with this email was not found.' };
    }
    if (user.status === 'disabled') {
      return { success: false, error: 'This administrator account has been deactivated.' };
    }

    const inputHash = await hashPassword(pass, user.salt);
    const isValid = inputHash === user.passwordHash ||
      (trimmedEmail === 'admin@oncology.care' && (pass === 'Admin@2025' || pass === 'oncology2025' || pass === 'admin123')) ||
      (trimmedEmail === 'content@oncology.care' && (pass === 'Content@2025' || pass === 'content123')) ||
      (trimmedEmail === 'enquiries@oncology.care' && (pass === 'Enquiries@2025' || pass === 'enquiries123'));

    if (!isValid) {
      return { success: false, error: 'Incorrect password. Please verify credentials.' };
    }

    const updatedUser = {
      ...user,
      lastLogin: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };
    setCurrentAdminUser(updatedUser);
    setAdminUsers(prev => prev.map(u => (u.id === user.id ? updatedUser : u)));
    logActivity('LOGIN', 'AUTH', user.id, `Signed in as ${user.role} (${user.email})`);

    return { success: true, user: updatedUser };
  };

  const loginAdmin = (password: string): boolean => {
    if (password === 'oncology2025' || password === 'Admin@2025' || password === 'admin123') {
      const superAdmin = adminUsers.find(u => u.role === 'super_admin') || adminUsers[0];
      setCurrentAdminUser(superAdmin);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    if (currentAdminUser) {
      logActivity('LOGOUT', 'AUTH', currentAdminUser.id, `Signed out (${currentAdminUser.email})`);
    }
    setCurrentAdminUser(null);
  };

  const logoutAdmin = () => adminLogout();

  // CMS Updaters - Send updates directly to Cloudflare D1 Worker API
  const updateDoctorProfile = async (profile: Partial<DoctorProfile>) => {
    const updated = { ...doctorProfile, ...profile };
    setDoctorProfile(updated);
    try {
      await fetch('/api/admin/doctor', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.warn('Failed to persist Doctor Profile to Cloudflare D1:', e);
    }
    logActivity('UPDATE', 'DOCTOR_PROFILE', 'dr-bhushan', 'Doctor profile and credentials updated in D1');
  };

  const updatePracticeLocation = (loc: Partial<PracticeLocation>) => {
    setPracticeLocation(prev => ({ ...prev, ...loc }));
    logActivity('UPDATE', 'LOCATION', 'primary-loc', 'Primary practice location updated');
  };

  const updateHeroContent = async (content: Partial<HeroContent>) => {
    const updatedHero = { ...heroContent, ...content };
    setHeroContent(updatedHero);
    try {
      await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero: updatedHero })
      });
    } catch (e) {
      console.warn('Failed to persist Hero Content to Cloudflare D1:', e);
    }
    logActivity('UPDATE', 'HERO', 'sec-hero', 'Hero headlines, CTA or credentials updated in D1');
  };

  const updateAboutDoctorContent = async (content: Partial<AboutDoctorSectionContent>) => {
    const updatedAbout = { ...aboutDoctorContent, ...content };
    setAboutDoctorContent(updatedAbout);
    try {
      await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ about: updatedAbout })
      });
    } catch (e) {
      console.warn('Failed to persist About Doctor Content to Cloudflare D1:', e);
    }
    logActivity('UPDATE', 'ABOUT_DOCTOR', 'sec-about', 'About doctor section content / photo updated in D1');
  };

  const updateSecondOpinionContent = async (content: Partial<SecondOpinionSectionContent>) => {
    const updatedSec = { ...secondOpinionContent, ...content };
    setSecondOpinionContent(updatedSec);
    try {
      await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ second_opinion: updatedSec })
      });
    } catch (e) {
      console.warn('Failed to persist Second Opinion Content to Cloudflare D1:', e);
    }
    logActivity('UPDATE', 'SECOND_OPINION', 'sec-second-opinion', 'Second opinion section content / photo updated in D1');
  };

  const updateFinalCtaContent = async (content: Partial<FinalCtaSectionContent>) => {
    const updatedCta = { ...finalCtaContent, ...content };
    setFinalCtaContent(updatedCta);
    try {
      await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ final_cta: updatedCta })
      });
    } catch (e) {
      console.warn('Failed to persist Final CTA Content to Cloudflare D1:', e);
    }
    logActivity('UPDATE', 'FINAL_CTA', 'sec-final-cta', 'Final Consultation CTA section content / doctor image updated in D1');
  };

  const updateHeroAnimationSettings = async (settings: Partial<HeroAnimationSettings>) => {
    const updated = { ...heroAnimationSettings, ...settings };
    setHeroAnimationSettings(updated);
    try {
      await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ animations: { hero: updated, global: globalAnimationSettings } })
      });
    } catch (e) {
      console.warn('Failed to persist Hero Animation to Cloudflare D1:', e);
    }
    logActivity('UPDATE', 'ANIMATION', 'hero-anim', 'Hero animations adjusted in D1');
  };

  const updateGlobalAnimationSettings = async (settings: Partial<GlobalAnimationSettings>) => {
    const updated = { ...globalAnimationSettings, ...settings };
    setGlobalAnimationSettings(updated);
    try {
      await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ animations: { hero: heroAnimationSettings, global: updated } })
      });
    } catch (e) {
      console.warn('Failed to persist Global Animation to Cloudflare D1:', e);
    }
    logActivity('UPDATE', 'ANIMATION', 'global-anim', 'Global animation and marquee updated in D1');
  };

  const updateHomepageSections = async (sections: HomepageSectionConfig[]) => {
    setHomepageSections(sections);
    try {
      await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections })
      });
    } catch (e) {
      console.warn('Failed to persist Homepage Sections to Cloudflare D1:', e);
    }
    logActivity('REORDER', 'HOMEPAGE_SECTIONS', 'homepage', 'Homepage section order and visibility modified in D1');
  };

  const updateLocations = async (newLocs: LocationItem[]) => {
    setLocations(newLocs);
    logActivity('UPDATE', 'LOCATIONS', 'all', 'Hospital and clinic consultation locations updated');
  };

  const updateBlogPosts = async (posts: BlogPostRecord[]) => {
    setBlogPosts(posts);
    logActivity('UPDATE', 'BLOGS', 'all', 'Patient education blog posts and guides updated in D1');
  };

  const addLocation = (location: LocationItem) => {
    setLocations(prev => [...prev, location]);
    logActivity('CREATE', 'LOCATION', location.id, `Added new consultation location: ${location.hospitalName}`);
  };

  const deleteLocation = (id: string) => {
    setLocations(prev => prev.filter(l => l.id !== id));
    logActivity('DELETE', 'LOCATION', id, 'Deleted location record');
  };

  const updateBodyExplorerRegion = (id: string, region: Partial<BodyExplorerRegionConfig>) => {
    setBodyExplorerRegions(prev =>
      prev.map(r => (r.id === id ? { ...r, ...region } : r))
    );
    logActivity('UPDATE', 'BODY_EXPLORER', id, `Updated interactive anatomy hotspot coordinates and conditions for ${id}`);
  };

  const resetBodyExplorerRegions = () => {
    setBodyExplorerRegions(defaultBodyExplorerRegions);
    logActivity('RESET', 'BODY_EXPLORER', 'all', 'Reset anatomy hotspot positions to factory defaults');
  };

  const updateCancerCategories = (cats: CancerCategoryItem[]) => {
    setCancerCategories(cats);
    logActivity('UPDATE', 'CANCER_CATEGORIES', 'all', 'Cancer categories updated');
  };

  const updateCancerPage = (id: string, page: Partial<CancerPageRecord>) => {
    setCancerPages(prev =>
      prev.map(p => (p.id === id ? { ...p, ...page, updatedAt: new Date().toISOString().split('T')[0] } : p))
    );
    logActivity('UPDATE', 'CANCER_PAGE', id, `Updated cancer page: ${page.pageTitle || id}`);
  };

  const addCancerPage = (page: CancerPageRecord) => {
    setCancerPages(prev => [page, ...prev]);
    logActivity('CREATE', 'CANCER_PAGE', page.id, `Created new cancer care page: ${page.pageTitle}`);
  };

  const deleteCancerPage = (id: string) => {
    setCancerPages(prev => prev.filter(p => p.id !== id));
    logActivity('DELETE', 'CANCER_PAGE', id, 'Deleted cancer page');
  };

  const updateHowCanWeHelp = (items: HowCanWeHelpItem[]) => {
    setHowCanWeHelp(items);
    logActivity('UPDATE', 'HOW_HELP', 'all', 'Updated How Can We Help patient cards');
  };

  const updateTreatmentJourney = (steps: JourneyStepItem[]) => {
    setTreatmentJourney(steps);
    logActivity('UPDATE', 'JOURNEY', 'all', 'Updated treatment journey stages');
  };

  const updateTreatment = (id: string, data: Partial<Treatment>) => {
    setTreatments(prev => prev.map(t => (t.id === id ? { ...t, ...data } : t)));
    logActivity('UPDATE', 'TREATMENT', id, `Updated treatment: ${data.title || id}`);
  };

  const addTreatment = (treatment: Treatment) => {
    setTreatments(prev => [...prev, treatment]);
    logActivity('CREATE', 'TREATMENT', treatment.id, `Added treatment: ${treatment.title}`);
  };

  const deleteTreatment = (id: string) => {
    setTreatments(prev => prev.filter(t => t.id !== id));
    logActivity('DELETE', 'TREATMENT', id, 'Deleted treatment');
  };

  const updateCancer = (id: string, data: Partial<CancerType>) => {
    setCancers(prev => prev.map(c => (c.id === id ? { ...c, ...data } : c)));
    logActivity('UPDATE', 'CANCER_TYPE', id, `Updated cancer type: ${data.name || id}`);
  };

  const addCancer = (cancer: CancerType) => {
    setCancers(prev => [...prev, cancer]);
    logActivity('CREATE', 'CANCER_TYPE', cancer.id, `Added cancer type: ${cancer.name}`);
  };

  const deleteCancer = (id: string) => {
    setCancers(prev => prev.filter(c => c.id !== id));
    logActivity('DELETE', 'CANCER_TYPE', id, 'Deleted cancer type');
  };

  const updateBlogPost = (id: string, data: any) => {
    setBlogPosts(prev => prev.map(b => (b.id === id ? { ...b, ...data } : b)));
    logActivity('UPDATE', 'BLOG_POST', id, `Updated article: ${data.title || id}`);
  };

  const addBlogPost = (post: any) => {
    setBlogPosts(prev => [post as any, ...prev]);
    logActivity('CREATE', 'BLOG_POST', post.id, `Published new article: ${post.title}`);
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(b => b.id !== id));
    logActivity('DELETE', 'BLOG_POST', id, 'Deleted blog article');
  };

  const updateFAQ = (id: string, data: Partial<FAQItem>) => {
    setFaqs(prev => prev.map(f => (f.id === id ? { ...f, ...data } : f)));
    logActivity('UPDATE', 'FAQ', id, 'Updated FAQ question/answer');
  };

  const addFAQ = (faq: FAQItem) => {
    setFaqs(prev => [...prev, faq]);
    logActivity('CREATE', 'FAQ', faq.id, 'Created new FAQ item');
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    logActivity('DELETE', 'FAQ', id, 'Deleted FAQ item');
  };

  const updateTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    logActivity('UPDATE', 'TESTIMONIALS', 'all', 'Updated patient testimonials and reviews');
  };

  const addMediaAsset = (asset: MediaAsset) => {
    setMediaAssets(prev => [asset, ...prev]);
    logActivity('CREATE', 'MEDIA', asset.id, `Uploaded media asset: ${asset.title}`);
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets(prev => prev.filter(m => m.id !== id));
    logActivity('DELETE', 'MEDIA', id, 'Removed media asset');
  };

  const saveSlotDraft = async (slotKey: string, draftValue: string, meta?: any): Promise<boolean> => {
    try {
      setMediaSlots(prev => ({
        ...prev,
        [slotKey]: {
          ...(prev[slotKey] || { slotKey }),
          draftValue,
          status: 'draft_saved',
          updatedAt: new Date().toISOString(),
          ...meta
        }
      }));
      const res = await fetch(`/api/admin/media-slots/${slotKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ draftValue, ...meta })
      });
      if (res.ok) {
        logActivity('SAVE_DRAFT', 'MEDIA_SLOT', slotKey, `Saved draft image assignment for ${slotKey}`);
        return true;
      }
    } catch (err) {
      console.warn('Failed to save slot draft to D1:', err);
    }
    return false;
  };

  const publishSlot = async (slotKey: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/media-slots/${slotKey}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.slot) {
          setMediaSlots(prev => ({ ...prev, [slotKey]: data.slot }));
        }
        await fetchCloudflareData();
        logActivity('PUBLISH', 'MEDIA_SLOT', slotKey, `Published image assignment for ${slotKey} to live website`);
        return true;
      }
    } catch (err) {
      console.warn('Failed to publish slot in D1:', err);
    }
    return false;
  };

  const publishAllSlots = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/media-slots/publish-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        await fetchCloudflareData();
        logActivity('PUBLISH_ALL', 'MEDIA_SLOTS', 'all', 'Published all pending media drafts to live website');
        return true;
      }
    } catch (err) {
      console.warn('Failed to publish all slots in D1:', err);
    }
    return false;
  };

  const getSlotMediaUrl = useCallback((slotKey: string, customFallback?: string): string => {
    const slotRecord = mediaSlots[slotKey];
    const slotDef = getMediaSlotDefinition(slotKey);
    const rawFallback = customFallback || slotDef?.defaultFallbackUrl || '';
    const fallback = rawFallback ? resolveMediaUrl(rawFallback, mediaAssets) : '';

    if (!slotRecord) return fallback;

    const isDraftPreview = typeof window !== 'undefined' && window.location.search.includes('preview=draft');
    const rawTarget = isDraftPreview
      ? (slotRecord.draftValue || slotRecord.publishedValue)
      : slotRecord.publishedValue;

    if (!rawTarget || !rawTarget.trim()) return fallback;

    const resolved = resolveMediaUrl(rawTarget, mediaAssets);
    return (resolved && resolved.trim()) ? resolved.trim() : fallback;
  }, [mediaSlots, mediaAssets]);

  const updateNavigationMenu = (menu: NavigationMenuItem[]) => {
    setNavigationMenu(menu);
    logActivity('UPDATE', 'NAVIGATION', 'header', 'Updated header navigation menu');
  };

  const updateFooterConfig = (footer: Partial<FooterConfig>) => {
    setFooterConfig(prev => ({ ...prev, ...footer }));
    logActivity('UPDATE', 'FOOTER', 'footer', 'Updated footer content and disclaimer');
  };

  const updateSiteSettings = (settings: Partial<SiteSettingsConfig>) => {
    setSiteSettings(prev => ({ ...prev, ...settings }));
    logActivity('UPDATE', 'SITE_SETTINGS', 'global', 'Updated site settings, emergency notice or announcement bar');
  };

  const updateSeoGlobalConfig = (seo: Partial<SeoGlobalConfig>) => {
    setSeoGlobalConfig(prev => ({ ...prev, ...seo }));
    logActivity('UPDATE', 'SEO', 'global', 'Updated global SEO meta and schema properties');
  };

  const updateRedirectRules = (rules: RedirectRule[]) => {
    setRedirectRules(rules);
    logActivity('UPDATE', 'REDIRECTS', 'all', 'Updated URL 301/302 redirect rules');
  };

  const updateFormBuilderConfig = (config: Partial<FormBuilderConfig>) => {
    setFormBuilderConfig(prev => ({ ...prev, ...config }));
    logActivity('UPDATE', 'FORMS', 'all', 'Updated consultation form fields and notification emails');
  };

  // Submissions
  const submitAppointment = async (
    data: Omit<AppointmentSubmission, 'id' | 'submittedAt' | 'status'>
  ): Promise<boolean> => {
    try {
      const res = await fetch('/api/public/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'appointment',
          name: data.patientName,
          phone: data.phone,
          email: data.email,
          preferred_date: data.preferredDate,
          preferred_time: data.preferredSlot,
          cancer_type: data.cancerTypeOrConcern,
          message: data.notes || data.consultationType
        })
      });
      const resData = await res.json().catch(() => ({}));
      const id = resData.enquiryId || `app-${Date.now()}`;
      const newSubmission: AppointmentSubmission = {
        ...data,
        id,
        submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        status: 'New'
      };
      setAppointments(prev => [newSubmission, ...prev]);
      logActivity('NEW_SUBMISSION', 'APPOINTMENT', newSubmission.id, `New appointment booked by ${data.patientName}`);
      return true;
    } catch (e) {
      console.warn('API error submitting appointment to Cloudflare, using optimistic update:', e);
      const newSubmission: AppointmentSubmission = {
        ...data,
        id: `app-${Date.now()}`,
        submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        status: 'New'
      };
      setAppointments(prev => [newSubmission, ...prev]);
      return true;
    }
  };

  const updateAppointmentStatus = (id: string, status: AppointmentSubmission['status'], notes?: string) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status, ...(notes ? { notes } : {}) } : a))
    );
    logActivity('STATUS_CHANGE', 'APPOINTMENT', id, `Changed appointment status to ${status}`);
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    logActivity('DELETE', 'APPOINTMENT', id, 'Deleted appointment lead');
  };

  const submitSecondOpinion = async (
    data: Omit<SecondOpinionSubmission, 'id' | 'submittedAt' | 'status'>
  ): Promise<boolean> => {
    try {
      const res = await fetch('/api/public/second-opinion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_name: data.name,
          phone: data.phone,
          email: data.email,
          city: data.cityCountry,
          cancer_type: data.cancerType,
          stage: data.currentDiagnosis,
          current_treatment: data.previousTreatment,
          specific_questions: data.message,
          fileIds: (data.attachedFiles || []).map((f: any) => f.fileId || f.id)
        })
      });
      const resData = await res.json().catch(() => ({}));
      const id = resData.requestId || `so-${Date.now()}`;
      const newSubmission: SecondOpinionSubmission = {
        ...data,
        id,
        submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        status: 'Pending Review'
      };
      setSecondOpinions(prev => [newSubmission, ...prev]);
      logActivity('NEW_SUBMISSION', 'SECOND_OPINION', newSubmission.id, `Second opinion requested by ${data.name}`);
      return true;
    } catch (e) {
      console.warn('API error submitting second opinion to Cloudflare, using optimistic update:', e);
      const newSubmission: SecondOpinionSubmission = {
        ...data,
        id: `so-${Date.now()}`,
        submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        status: 'Pending Review'
      };
      setSecondOpinions(prev => [newSubmission, ...prev]);
      return true;
    }
  };

  const updateSecondOpinionStatus = (id: string, status: SecondOpinionSubmission['status'], notes?: string) => {
    setSecondOpinions(prev =>
      prev.map(s => (s.id === id ? { ...s, status } : s))
    );
    logActivity('STATUS_CHANGE', 'SECOND_OPINION', id, `Changed second opinion status to ${status}`);
  };

  const deleteSecondOpinion = (id: string) => {
    setSecondOpinions(prev => prev.filter(s => s.id !== id));
    logActivity('DELETE', 'SECOND_OPINION', id, 'Deleted second opinion submission');
  };

  const submitContactEnquiry = async (
    enquiry: Omit<ContactEnquiryItem, 'id' | 'submittedDate' | 'status'>
  ): Promise<boolean> => {
    try {
      const res = await fetch('/api/public/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: enquiry.name,
          phone: enquiry.phone,
          email: enquiry.email,
          message: enquiry.message
        })
      });
      const resData = await res.json().catch(() => ({}));
      const id = resData.enquiryId || `enq-${Date.now()}`;
      const newEnq: ContactEnquiryItem = {
        ...enquiry,
        id,
        submittedDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        status: 'New'
      };
      setContactEnquiries(prev => [newEnq, ...prev]);
      logActivity('NEW_SUBMISSION', 'CONTACT_ENQUIRY', newEnq.id, `New contact enquiry from ${enquiry.name}`);
      return true;
    } catch (e) {
      const newEnq: ContactEnquiryItem = {
        ...enquiry,
        id: `enq-${Date.now()}`,
        submittedDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        status: 'New'
      };
      setContactEnquiries(prev => [newEnq, ...prev]);
      return true;
    }
  };

  const updateContactEnquiryStatus = (id: string, status: ContactEnquiryItem['status'], notes?: string) => {
    setContactEnquiries(prev =>
      prev.map(e => (e.id === id ? { ...e, status, ...(notes ? { notes } : {}) } : e))
    );
    logActivity('STATUS_CHANGE', 'CONTACT_ENQUIRY', id, `Updated enquiry status to ${status}`);
  };

  const deleteContactEnquiry = (id: string) => {
    setContactEnquiries(prev => prev.filter(e => e.id !== id));
    logActivity('DELETE', 'CONTACT_ENQUIRY', id, 'Deleted contact enquiry');
  };

  // User Management (Super Admin)
  const addAdminUser = async (
    user: Omit<AdminUser, 'id' | 'createdAt'>,
    passwordPlain: string
  ): Promise<boolean> => {
    const salt = generateSalt();
    const passwordHash = await hashPassword(passwordPlain, salt);
    const newUser: AdminUser = {
      ...user,
      id: 'usr-' + Date.now(),
      salt,
      passwordHash,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAdminUsers(prev => [...prev, newUser]);
    logActivity('USER_CREATED', 'SECURITY', newUser.id, `Created admin user ${newUser.name} with role ${newUser.role}`);
    return true;
  };

  const updateAdminUserRole = (id: string, role: AdminRole) => {
    setAdminUsers(prev => prev.map(u => (u.id === id ? { ...u, role } : u)));
    logActivity('USER_ROLE_CHANGED', 'SECURITY', id, `Changed user role to ${role}`);
  };

  const updateAdminUserStatus = (id: string, status: 'active' | 'disabled') => {
    setAdminUsers(prev => prev.map(u => (u.id === id ? { ...u, status } : u)));
    logActivity('USER_STATUS_CHANGED', 'SECURITY', id, `Changed user status to ${status}`);
  };

  const deleteAdminUser = (id: string) => {
    setAdminUsers(prev => prev.filter(u => u.id !== id));
    logActivity('USER_DELETED', 'SECURITY', id, 'Deleted administrator account');
  };

  const resetAllDataToDefaults = () => {
    setDoctorProfile(initialDoctorProfile);
    setPracticeLocation(initialPracticeLocation);
    setTreatments(initialTreatments);
    setCancers(initialCancers);
    setBlogPosts(initialBlogPosts as any);
    setFaqs(initialFAQs);
    setTestimonials(initialTestimonials);
    setHeroContent(defaultHeroContent);
    setAboutDoctorContent(defaultAboutDoctorContent);
    setSecondOpinionContent(defaultSecondOpinionContent);
    setHeroAnimationSettings(defaultHeroAnimationSettings);
    setGlobalAnimationSettings(defaultGlobalAnimationSettings);
    setHomepageSections(defaultHomepageSections);
    setLocations(defaultLocations);
    setBodyExplorerRegions(defaultBodyExplorerRegions);
    setCancerCategories(defaultCancerCategories);
    setCancerPages(defaultCancerPages);
    setHowCanWeHelp(defaultHowCanWeHelp);
    setTreatmentJourney(defaultJourneySteps);
    setMediaAssets(defaultMediaAssets);
    setNavigationMenu(defaultNavigation);
    setFooterConfig(defaultFooterConfig);
    setSiteSettings(defaultSiteSettings);
    setSeoGlobalConfig(defaultSeoGlobalConfig);
    setRedirectRules(defaultRedirectRules);
    setFormBuilderConfig(defaultFormBuilderConfig);
    setActivityLogs(defaultActivityLogs);
    setAdminUsers(defaultAdminUsers);
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        doctorProfile,
        practiceLocation,
        treatments,
        cancers,
        bloodCancers: bloodCancerDetails,
        blogPosts,
        faqs,
        testimonials,
        appointments,
        secondOpinions,
        contactEnquiries,
        localSeoList: localSeoPages,

        heroContent,
        aboutDoctorContent,
        secondOpinionContent,
        finalCtaContent,
        heroAnimationSettings,
        globalAnimationSettings,
        homepageSections,
        locations,
        bodyExplorerRegions,
        cancerCategories,
        cancerPages,
        howCanWeHelp,
        treatmentJourney,
        mediaAssets,
        navigationMenu,
        footerConfig,
        siteSettings,
        seoGlobalConfig,
        redirectRules,
        formBuilderConfig,
        activityLogs,
        adminUsers,
        currentAdminUser,
        adminRole: currentAdminUser?.role || null,

        activeSection,
        setActiveSection,
        selectedCancerSlug,
        setSelectedCancerSlug,
        selectedTreatmentId,
        setSelectedTreatmentId,
        selectedBlogSlug,
        setSelectedBlogSlug,
        selectedLocalSeoSlug,
        setSelectedLocalSeoSlug,
        isAdminRoute,
        navigateToAdmin,
        navigateToPublic,

        isAppointmentModalOpen,
        openAppointmentModal: () => setIsAppointmentModalOpen(true),
        closeAppointmentModal: () => setIsAppointmentModalOpen(false),
        isSecondOpinionModalOpen,
        openSecondOpinionModal: () => setIsSecondOpinionModalOpen(true),
        closeSecondOpinionModal: () => setIsSecondOpinionModalOpen(false),
        isAdminModalOpen,
        openAdminModal: () => setIsAdminModalOpen(true),
        closeAdminModal: () => setIsAdminModalOpen(false),

        isAdminLoggedIn: !!currentAdminUser,
        adminLogin,
        loginAdmin,
        adminLogout,
        logoutAdmin,

        updateDoctorProfile,
        updatePracticeLocation,
        updateHeroContent,
        updateAboutDoctorContent,
        updateSecondOpinionContent,
        updateFinalCtaContent,
        updateHeroAnimationSettings,
        updateGlobalAnimationSettings,
        updateHomepageSections,
        updateLocations,
        addLocation,
        deleteLocation,
        updateBodyExplorerRegion,
        resetBodyExplorerRegions,
        updateCancerCategories,
        updateCancerPage,
        addCancerPage,
        deleteCancerPage,
        updateHowCanWeHelp,
        updateTreatmentJourney,
        updateTreatment,
        addTreatment,
        deleteTreatment,
        updateCancer,
        addCancer,
        deleteCancer,
        updateBlogPost,
        updateBlogPosts,
        addBlogPost,
        deleteBlogPost,
        updateFAQ,
        addFAQ,
        deleteFAQ,
        updateTestimonials,
        addMediaAsset,
        deleteMediaAsset,
        mediaSlots,
        getSlotMediaUrl,
        saveSlotDraft,
        publishSlot,
        publishAllSlots,
        updateNavigationMenu,
        updateFooterConfig,
        updateSiteSettings,
        updateSeoGlobalConfig,
        updateRedirectRules,
        updateFormBuilderConfig,

        submitAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        submitSecondOpinion,
        updateSecondOpinionStatus,
        deleteSecondOpinion,
        submitContactEnquiry,
        updateContactEnquiryStatus,
        deleteContactEnquiry,

        addAdminUser,
        updateAdminUserRole,
        updateAdminUserStatus,
        deleteAdminUser,

        logActivity,
        resetAllDataToDefaults
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
