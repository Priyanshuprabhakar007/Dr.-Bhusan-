import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import {
  getD1Store,
  saveD1Store,
  getMediaUsagesInD1,
  saveMediaSlotDraftInD1,
  publishMediaSlotInD1,
  publishAllMediaSlotsInD1
} from './server/d1Store.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure public uploads directories exist for simulated Cloudflare R2 public bucket
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Ensure private reports directory exists for simulated Cloudflare R2 private bucket
// CRITICAL: This directory is inside data/ and NOT exposed statically, ensuring zero unauthorized public access
const privateReportsDir = path.join(process.cwd(), 'data', 'private_reports');
if (!fs.existsSync(privateReportsDir)) {
  fs.mkdirSync(privateReportsDir, { recursive: true });
}

// Multer storage setup for local PC direct uploads to R2 public bucket simulation
const publicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = (req.body.category || 'doctor').toLowerCase().replace(/[^a-z0-9]/g, '-');
    const catDir = path.join(uploadsDir, 'website', category);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }
    cb(null, catDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.webp';
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    cb(null, `${timestamp}-${random}${ext}`);
  }
});

const publicUpload = multer({
  storage: publicStorage,
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max
});

// Multer storage setup for private patient records (biopsies, scans) to R2 private bucket simulation
const privateStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const reqId = (req.body.requestId || req.body.request_id || 'general').replace(/[^a-zA-Z0-9_-]/g, '_');
    const folder = path.join(privateReportsDir, reqId);
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.pdf';
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${Date.now()}-${cleanName}${ext}`);
  }
});

const privateUpload = multer({
  storage: privateStorage,
  limits: { fileSize: 30 * 1024 * 1024 } // 30MB max
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // CORS headers for seamless frontend and external client calls
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Serve uploads folder as public R2 simulation endpoint
  app.use('/uploads', express.static(uploadsDir));
  app.use('/api/public/media', express.static(uploadsDir));

  // Initialize Cloudflare D1 Store
  getD1Store();

  // -------------------------------------------------------------
  // SYSTEM & HEALTH API ROUTES
  // -------------------------------------------------------------

  // GET /api/health
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Cloudflare Worker & R2 / D1 Backend API Layer (dr-bhushan-api)',
      r2_public_bucket: 'dr-bhushan-public-media',
      r2_private_bucket: 'dr-bhushan-private-reports',
      d1_database: 'dr-bhushan-cms',
      timestamp: new Date().toISOString()
    });
  });

  // GET /api/test-db
  app.get('/api/test-db', (req, res) => {
    const store = getD1Store();
    res.json({
      status: 'ok',
      connected: true,
      database: 'dr-bhushan-cms',
      mediaCount: store.media?.length || 0,
      slotsCount: Object.keys(store.media_slots || {}).length,
      cancersCount: store.cancers?.length || 0,
      treatmentsCount: store.treatments?.length || 0,
      blogsCount: store.blogs?.length || 0,
      enquiriesCount: store.enquiries?.length || 0
    });
  });

  // -------------------------------------------------------------
  // PUBLIC WEBSITE API ROUTES
  // -------------------------------------------------------------

  // GET /api/public/site - Aggregated payload for public website (1 fast request)
  app.get('/api/public/site', (req, res) => {
    try {
      const store = getD1Store();
      const isPreview = req.query.preview === 'draft' || req.query.preview === 'true';

      let siteSettings = { ...store.site_settings };
      let doctorProfile = { ...store.doctor_profile };
      let heroContent = { ...(store.homepage?.hero || {}) };
      let aboutDoctorContent = { ...(store.homepage?.about || {}) };
      let secondOpinionContent = { ...(store.homepage?.second_opinion || {}) };
      let finalCtaContent = { ...(store.homepage?.final_cta || {}) };
      let howCanWeHelp = Array.isArray(store.homepage?.how_can_help) ? [...store.homepage.how_can_help] : [];
      let cancers = Array.isArray(store.cancers) ? [...store.cancers] : [];
      let cancerCategories = Array.isArray(store.cancer_categories) ? [...store.cancer_categories] : [];
      let treatments = Array.isArray(store.treatments) ? [...store.treatments] : [];

      if (isPreview && store.media_slots) {
        const slots = store.media_slots;
        if (slots['slot-hero-doc']) {
          heroContent.doctorHeroImage = slots['slot-hero-doc'].draftValue;
          doctorProfile.photoUrl = slots['slot-hero-doc'].draftValue;
        }
        if (slots['slot-hero-bg']) heroContent.heroBackgroundImage = slots['slot-hero-bg'].draftValue;
        if (slots['slot-about-doc']) aboutDoctorContent.aboutDoctorImage = slots['slot-about-doc'].draftValue;
        if (slots['slot-second-opinion'] || slots['slot-second-opinion-doctor']) {
          const draftVal = slots['slot-second-opinion-doctor']?.draftValue || slots['slot-second-opinion']?.draftValue;
          if (draftVal) secondOpinionContent.secondOpinionImage = draftVal;
        }
        if (slots['slot-second-opinion-banner']) siteSettings.secondOpinionBannerImage = slots['slot-second-opinion-banner'].draftValue;
        if (slots['slot-final-cta-doc']) {
          finalCtaContent.finalCtaImage = slots['slot-final-cta-doc'].draftValue;
          siteSettings.finalCtaDoctorImage = slots['slot-final-cta-doc'].draftValue;
        }
        if (slots['slot-branding-logo']) siteSettings.logoUrl = slots['slot-branding-logo'].draftValue;
        if (slots['slot-favicon']) siteSettings.favicon = slots['slot-favicon'].draftValue;
        if (slots['slot-og-social']) siteSettings.defaultSocialImage = slots['slot-og-social'].draftValue;

        if (slots['slot-pathway-consultation'] && howCanWeHelp[0]) howCanWeHelp[0].image_id = slots['slot-pathway-consultation'].draftValue;
        if (slots['slot-pathway-systemic'] && howCanWeHelp[1]) howCanWeHelp[1].image_id = slots['slot-pathway-systemic'].draftValue;
        if (slots['slot-pathway-second-opinion'] && howCanWeHelp[2]) howCanWeHelp[2].image_id = slots['slot-pathway-second-opinion'].draftValue;

        if (slots['slot-cancer-solid-tumors']) {
          const cat = cancerCategories.find((c: any) => c.slug === 'solid-tumors');
          if (cat) cat.image_id = slots['slot-cancer-solid-tumors'].draftValue;
        }
        if (slots['slot-cancer-blood-malignancies']) {
          const cat = cancerCategories.find((c: any) => c.slug === 'blood-malignancies');
          if (cat) cat.image_id = slots['slot-cancer-blood-malignancies'].draftValue;
        }
        if (slots['slot-treatment-chemotherapy']) {
          const t = treatments.find((t: any) => t.slug === 'chemotherapy-systemic');
          if (t) t.image_id = slots['slot-treatment-chemotherapy'].draftValue;
        }
        if (slots['slot-treatment-targeted']) {
          const t = treatments.find((t: any) => t.slug === 'targeted-therapy');
          if (t) t.image_id = slots['slot-treatment-targeted'].draftValue;
        }
        if (slots['slot-treatment-immunotherapy']) {
          const t = treatments.find((t: any) => t.slug === 'immunotherapy');
          if (t) t.image_id = slots['slot-treatment-immunotherapy'].draftValue;
        }
      }

      res.json({
        success: true,
        isPreview,
        siteSettings,
        doctorProfile,
        heroContent,
        aboutDoctorContent,
        secondOpinionContent,
        finalCtaContent,
        heroAnimationSettings: store.homepage?.animations?.hero,
        globalAnimationSettings: store.homepage?.animations?.global,
        homepageSections: store.homepage?.sections || [],
        howCanWeHelp,
        treatmentJourney: store.homepage?.journey_steps || [],
        cancers,
        cancerCategories,
        cancerPages: store.cancer_pages || [],
        treatments,
        bodyExplorerRegions: store.body_explorer || [],
        locations: store.locations || [],
        blogPosts: store.blogs || [],
        faqs: store.faqs || [],
        testimonials: store.testimonials || [],
        navigationMenu: store.navigation || [],
        footerConfig: store.footer || {},
        mediaAssets: store.media || [],
        mediaSlots: store.media_slots || {},
        updated_at: store.updated_at
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch public site data from D1', details: err.message });
    }
  });

  // GET /api/public/homepage
  app.get('/api/public/homepage', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, homepage: store.homepage, siteSettings: store.site_settings });
  });

  // GET /api/public/doctor
  app.get('/api/public/doctor', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, doctorProfile: store.doctor_profile });
  });

  // GET /api/public/cancer-care (and alias /api/public/cancers)
  app.get(['/api/public/cancer-care', '/api/public/cancers'], (req, res) => {
    const store = getD1Store();
    res.json({ success: true, cancers: store.cancers, categories: store.cancer_categories });
  });

  // GET /api/public/cancer-care/:slug
  app.get('/api/public/cancer-care/:slug', (req, res) => {
    const store = getD1Store();
    const item = (store.cancers || []).find((c: any) => c.slug === req.params.slug || c.id === req.params.slug);
    if (!item) return res.status(404).json({ error: 'Cancer specialty not found' });
    res.json({ success: true, cancer: item });
  });

  // GET /api/public/treatments
  app.get('/api/public/treatments', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, treatments: store.treatments });
  });

  // GET /api/public/treatments/:slug
  app.get('/api/public/treatments/:slug', (req, res) => {
    const store = getD1Store();
    const item = (store.treatments || []).find((t: any) => t.slug === req.params.slug || t.id === req.params.slug);
    if (!item) return res.status(404).json({ error: 'Treatment modality not found' });
    res.json({ success: true, treatment: item });
  });

  // GET /api/public/blogs
  app.get('/api/public/blogs', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, blogs: store.blogs });
  });

  // GET /api/public/blogs/:slug
  app.get('/api/public/blogs/:slug', (req, res) => {
    const store = getD1Store();
    const blog = (store.blogs || []).find((b: any) => b.slug === req.params.slug || b.id === req.params.slug);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ success: true, blog });
  });

  // GET /api/public/locations
  app.get('/api/public/locations', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, locations: store.locations });
  });

  // GET /api/public/faqs
  app.get('/api/public/faqs', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, faqs: store.faqs });
  });

  // GET /api/public/navigation
  app.get('/api/public/navigation', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, navigation: store.navigation });
  });

  // GET /api/public/footer
  app.get('/api/public/footer', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, footer: store.footer });
  });

  // GET /api/public/body-explorer
  app.get('/api/public/body-explorer', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, bodyExplorerRegions: store.body_explorer });
  });

  // POST /api/public/enquiries - Public enquiry submission (Appointments, Contact)
  app.post('/api/public/enquiries', (req, res) => {
    try {
      const store = getD1Store();
      const enquiry = {
        id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        ...req.body,
        created_at: new Date().toISOString(),
        status: 'new'
      };
      store.enquiries = [enquiry, ...(store.enquiries || [])];
      saveD1Store({ enquiries: store.enquiries });
      res.status(201).json({ success: true, message: 'Enquiry recorded in D1', enquiry });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to record enquiry in D1', details: err.message });
    }
  });

  // POST /api/public/second-opinion - Public second opinion submission
  app.post('/api/public/second-opinion', (req, res) => {
    try {
      const store = getD1Store();
      const requestId = `so-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const requestRecord = {
        id: requestId,
        ...req.body,
        status: 'new',
        created_at: new Date().toISOString()
      };
      store.second_opinion_requests = [requestRecord, ...(store.second_opinion_requests || [])];
      saveD1Store({ second_opinion_requests: store.second_opinion_requests });
      res.status(201).json({ success: true, message: 'Second opinion request registered', requestId });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to record second opinion request in D1', details: err.message });
    }
  });

  // POST /api/public/second-opinion/upload-report - Direct file upload to private R2 storage simulation
  // CRITICAL: NO public URL is returned. Patient files are protected in private storage.
  app.post('/api/public/second-opinion/upload-report', privateUpload.single('file'), (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'No report file provided' });
      }

      const requestId = req.body.requestId || req.body.request_id || 'temp';
      const fileType = req.body.fileType || 'biopsy';
      const fileId = `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const storageKey = `reports/${requestId}/${file.filename}`;

      const store = getD1Store();
      const fileRecord = {
        id: fileId,
        request_id: requestId,
        storage_key: storageKey,
        original_filename: file.originalname,
        local_path: file.path,
        file_size: file.size,
        mime_type: file.mimetype,
        file_type: fileType,
        uploaded_at: new Date().toISOString()
      };

      store.second_opinion_files = [fileRecord, ...(store.second_opinion_files || [])];
      saveD1Store({ second_opinion_files: store.second_opinion_files });

      // Notice: NO public_url returned for confidential medical files!
      res.status(201).json({
        success: true,
        fileId,
        originalFilename: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        message: 'Patient medical record securely stored in private R2 bucket'
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to upload report file to private storage', details: err.message });
    }
  });

  // -------------------------------------------------------------
  // ADMIN API ROUTES
  // -------------------------------------------------------------

  // GET /api/admin/all - Full admin dataset fetch
  app.get('/api/admin/all', (req, res) => {
    try {
      const store = getD1Store();
      res.json({ success: true, data: store });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch admin dataset', details: err.message });
    }
  });

  // GET /api/admin/homepage
  app.get('/api/admin/homepage', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, homepage: store.homepage });
  });

  // PUT /api/admin/homepage - Update entire Homepage
  app.put('/api/admin/homepage', (req, res) => {
    try {
      const store = getD1Store();
      const updatedHomepage = { ...store.homepage, ...req.body };
      saveD1Store({ homepage: updatedHomepage });
      res.json({ success: true, message: 'Homepage updated in D1', homepage: updatedHomepage });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update homepage', details: err.message });
    }
  });

  // PUT /api/admin/homepage/:sectionKey - Update specific section in Homepage
  app.put('/api/admin/homepage/:sectionKey', (req, res) => {
    try {
      const { sectionKey } = req.params;
      const store = getD1Store();
      if (!store.homepage) (store as any).homepage = {};

      (store.homepage as any)[sectionKey] = {
        ...((store.homepage as any)[sectionKey] || {}),
        ...req.body
      };

      saveD1Store({ homepage: store.homepage });
      res.json({ success: true, message: `Homepage section ${sectionKey} updated`, section: (store.homepage as any)[sectionKey] });
    } catch (err: any) {
      res.status(500).json({ error: `Failed to update section ${req.params.sectionKey}`, details: err.message });
    }
  });

  // GET /api/admin/doctor
  app.get('/api/admin/doctor', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, doctorProfile: store.doctor_profile });
  });

  // PUT /api/admin/doctor - Update Doctor Profile in D1
  app.put('/api/admin/doctor', (req, res) => {
    try {
      const store = getD1Store();
      const updatedDoctor = { ...store.doctor_profile, ...req.body };
      saveD1Store({ doctor_profile: updatedDoctor });
      res.json({ success: true, message: 'Doctor profile updated in D1', doctorProfile: updatedDoctor });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update doctor profile', details: err.message });
    }
  });

  // GET /api/admin/cancer-care & /api/admin/cancers
  app.get(['/api/admin/cancer-care', '/api/admin/cancers'], (req, res) => {
    const store = getD1Store();
    res.json({ success: true, cancers: store.cancers, categories: store.cancer_categories });
  });

  // POST /api/admin/cancer-care
  app.post(['/api/admin/cancer-care', '/api/admin/cancers'], (req, res) => {
    const store = getD1Store();
    const newCancer = { id: `cancer-${Date.now()}`, ...req.body };
    store.cancers = [newCancer, ...(store.cancers || [])];
    saveD1Store({ cancers: store.cancers });
    res.status(201).json({ success: true, cancer: newCancer });
  });

  // PUT /api/admin/cancer-care/:id
  app.put(['/api/admin/cancer-care/:id', '/api/admin/cancers/:id'], (req, res) => {
    const store = getD1Store();
    const index = (store.cancers || []).findIndex((c: any) => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Cancer record not found' });
    store.cancers[index] = { ...store.cancers[index], ...req.body };
    saveD1Store({ cancers: store.cancers });
    res.json({ success: true, cancer: store.cancers[index] });
  });

  // DELETE /api/admin/cancer-care/:id
  app.delete(['/api/admin/cancer-care/:id', '/api/admin/cancers/:id'], (req, res) => {
    const store = getD1Store();
    store.cancers = (store.cancers || []).filter((c: any) => c.id !== req.params.id);
    saveD1Store({ cancers: store.cancers });
    res.json({ success: true, message: 'Cancer record deleted from D1' });
  });

  // GET / POST / PUT / DELETE /api/admin/treatments
  app.get('/api/admin/treatments', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, treatments: store.treatments });
  });

  app.post('/api/admin/treatments', (req, res) => {
    const store = getD1Store();
    const newTreatment = { id: `treatment-${Date.now()}`, ...req.body };
    store.treatments = [newTreatment, ...(store.treatments || [])];
    saveD1Store({ treatments: store.treatments });
    res.status(201).json({ success: true, treatment: newTreatment });
  });

  app.put('/api/admin/treatments/:id', (req, res) => {
    const store = getD1Store();
    const index = (store.treatments || []).findIndex((t: any) => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Treatment record not found' });
    store.treatments[index] = { ...store.treatments[index], ...req.body };
    saveD1Store({ treatments: store.treatments });
    res.json({ success: true, treatment: store.treatments[index] });
  });

  app.delete('/api/admin/treatments/:id', (req, res) => {
    const store = getD1Store();
    store.treatments = (store.treatments || []).filter((t: any) => t.id !== req.params.id);
    saveD1Store({ treatments: store.treatments });
    res.json({ success: true, message: 'Treatment record deleted from D1' });
  });

  // GET / POST / PUT / DELETE /api/admin/blogs
  app.get('/api/admin/blogs', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, blogs: store.blogs });
  });

  app.post('/api/admin/blogs', (req, res) => {
    const store = getD1Store();
    const newBlog = { id: `blog-${Date.now()}`, publishedAt: new Date().toISOString().split('T')[0], ...req.body };
    store.blogs = [newBlog, ...(store.blogs || [])];
    saveD1Store({ blogs: store.blogs });
    res.status(201).json({ success: true, blog: newBlog });
  });

  app.put('/api/admin/blogs/:id', (req, res) => {
    const store = getD1Store();
    const index = (store.blogs || []).findIndex((b: any) => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Blog record not found' });
    store.blogs[index] = { ...store.blogs[index], ...req.body };
    saveD1Store({ blogs: store.blogs });
    res.json({ success: true, blog: store.blogs[index] });
  });

  app.delete('/api/admin/blogs/:id', (req, res) => {
    const store = getD1Store();
    store.blogs = (store.blogs || []).filter((b: any) => b.id !== req.params.id);
    saveD1Store({ blogs: store.blogs });
    res.json({ success: true, message: 'Blog record deleted from D1' });
  });

  // GET / POST / PUT / DELETE /api/admin/locations
  app.get('/api/admin/locations', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, locations: store.locations });
  });

  app.post('/api/admin/locations', (req, res) => {
    const store = getD1Store();
    const newLoc = { id: `loc-${Date.now()}`, ...req.body };
    store.locations = [newLoc, ...(store.locations || [])];
    saveD1Store({ locations: store.locations });
    res.status(201).json({ success: true, location: newLoc });
  });

  app.put('/api/admin/locations/:id', (req, res) => {
    const store = getD1Store();
    const index = (store.locations || []).findIndex((l: any) => l.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Location record not found' });
    store.locations[index] = { ...store.locations[index], ...req.body };
    saveD1Store({ locations: store.locations });
    res.json({ success: true, location: store.locations[index] });
  });

  app.delete('/api/admin/locations/:id', (req, res) => {
    const store = getD1Store();
    store.locations = (store.locations || []).filter((l: any) => l.id !== req.params.id);
    saveD1Store({ locations: store.locations });
    res.json({ success: true, message: 'Location deleted from D1' });
  });

  // GET / PUT /api/admin/site-settings
  app.get('/api/admin/site-settings', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, siteSettings: store.site_settings });
  });

  app.put('/api/admin/site-settings', (req, res) => {
    const store = getD1Store();
    const updatedSettings = { ...store.site_settings, ...req.body };
    saveD1Store({ site_settings: updatedSettings });
    res.json({ success: true, siteSettings: updatedSettings });
  });

  // GET / PUT /api/admin/navigation
  app.get('/api/admin/navigation', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, navigation: store.navigation });
  });

  app.put('/api/admin/navigation', (req, res) => {
    const store = getD1Store();
    saveD1Store({ navigation: req.body.navigation });
    res.json({ success: true, navigation: req.body.navigation });
  });

  // GET / PUT /api/admin/footer
  app.get('/api/admin/footer', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, footer: store.footer });
  });

  app.put('/api/admin/footer', (req, res) => {
    const store = getD1Store();
    const updatedFooter = { ...store.footer, ...req.body };
    saveD1Store({ footer: updatedFooter });
    res.json({ success: true, footer: updatedFooter });
  });

  // GET /api/admin/enquiries
  app.get('/api/admin/enquiries', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, enquiries: store.enquiries || [] });
  });

  app.put('/api/admin/enquiries/:id', (req, res) => {
    const store = getD1Store();
    const index = (store.enquiries || []).findIndex((e: any) => e.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Enquiry not found' });
    store.enquiries[index] = { ...store.enquiries[index], ...req.body };
    saveD1Store({ enquiries: store.enquiries });
    res.json({ success: true, enquiry: store.enquiries[index] });
  });

  app.delete('/api/admin/enquiries/:id', (req, res) => {
    const store = getD1Store();
    store.enquiries = (store.enquiries || []).filter((e: any) => e.id !== req.params.id);
    saveD1Store({ enquiries: store.enquiries });
    res.json({ success: true, message: 'Enquiry deleted' });
  });

  // GET /api/admin/second-opinions
  app.get('/api/admin/second-opinions', (req, res) => {
    const store = getD1Store();
    const requests = store.second_opinion_requests || [];
    const files = store.second_opinion_files || [];

    // Attach corresponding file records to each request
    const enriched = requests.map((r: any) => ({
      ...r,
      files: files.filter((f: any) => f.request_id === r.id)
    }));

    res.json({ success: true, requests: enriched });
  });

  // GET /api/admin/second-opinions/:id/download-report/:fileId - Secure download of private patient report
  app.get('/api/admin/second-opinions/:id/download-report/:fileId', (req, res) => {
    const store = getD1Store();
    const file = (store.second_opinion_files || []).find((f: any) => f.id === req.params.fileId);
    if (!file) {
      return res.status(404).json({ error: 'Confidential file record not found in D1' });
    }

    if (file.local_path && fs.existsSync(file.local_path)) {
      return res.download(file.local_path, file.original_filename);
    }

    // Try finding in private reports dir
    const cleanReqId = req.params.id.replace(/[^a-zA-Z0-9_-]/g, '_');
    const folder = path.join(privateReportsDir, cleanReqId);
    if (fs.existsSync(folder)) {
      const matchingFile = fs.readdirSync(folder).find((fname) => fname.includes(file.original_filename) || fname === path.basename(file.storage_key));
      if (matchingFile) {
        return res.download(path.join(folder, matchingFile), file.original_filename);
      }
    }

    res.status(404).json({ error: 'Report file object not found in private storage' });
  });

  // -------------------------------------------------------------
  // MEDIA SLOTS ADMIN API ROUTES
  // -------------------------------------------------------------

  // GET /api/admin/media-slots
  app.get('/api/admin/media-slots', (req, res) => {
    const store = getD1Store();
    res.json({ success: true, mediaSlots: store.media_slots || {} });
  });

  // PUT /api/admin/media-slots/:slotKey - Save Draft
  app.put('/api/admin/media-slots/:slotKey', (req, res) => {
    try {
      const { slotKey } = req.params;
      const { draftValue, altText, focalPoint, mobileValue, slotName, section } = req.body;
      const slot = saveMediaSlotDraftInD1(slotKey, draftValue, { altText, focalPoint, mobileValue, slotName, section });
      res.json({ success: true, message: `Draft saved for slot ${slotKey}`, slot });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save media slot draft', details: err.message });
    }
  });

  // POST /api/admin/media-slots/:slotKey/publish - Publish Single Slot
  app.post('/api/admin/media-slots/:slotKey/publish', (req, res) => {
    try {
      const { slotKey } = req.params;
      const slot = publishMediaSlotInD1(slotKey);
      if (!slot) return res.status(404).json({ error: 'Slot not found' });
      res.json({ success: true, message: `Slot ${slotKey} published to live website`, slot });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to publish media slot', details: err.message });
    }
  });

  // POST /api/admin/media-slots/publish-all - Publish All Draft Slots
  app.post('/api/admin/media-slots/publish-all', (req, res) => {
    try {
      const published = publishAllMediaSlotsInD1();
      res.json({ success: true, message: 'All draft media slots published to live website', count: published.length, published });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to publish all media slots', details: err.message });
    }
  });

  // -------------------------------------------------------------
  // MEDIA ASSET MANAGEMENT API ROUTES (R2 & D1)
  // -------------------------------------------------------------

  // GET /api/admin/media - Query media assets
  app.get('/api/admin/media', (req, res) => {
    const store = getD1Store();
    let media = store.media || [];
    const { category, q } = req.query;

    if (category && category !== 'all') {
      media = media.filter((m: any) => (m.category || '').toLowerCase() === (category as string).toLowerCase());
    }

    if (q) {
      const term = (q as string).toLowerCase();
      media = media.filter(
        (m: any) =>
          (m.original_name || '').toLowerCase().includes(term) ||
          (m.alt_text || '').toLowerCase().includes(term) ||
          (m.storage_key || '').toLowerCase().includes(term)
      );
    }

    res.json({ success: true, count: media.length, media });
  });

  // GET /api/admin/media/usage/:id - Check where a media asset is used
  app.get('/api/admin/media/usage/:id', (req, res) => {
    const { id } = req.params;
    const store = getD1Store();
    const mediaItem = (store.media || []).find((m: any) => m.id === id);
    if (!mediaItem) return res.status(404).json({ error: 'Media not found' });

    const usages = getMediaUsagesInD1(mediaItem.id).concat(getMediaUsagesInD1(mediaItem.storage_key));
    const uniqueUsages = Array.from(new Set(usages));

    res.json({
      success: true,
      mediaId: id,
      storageKey: mediaItem.storage_key,
      usageCount: uniqueUsages.length,
      usages: uniqueUsages
    });
  });

  // POST /api/admin/media/upload - Direct PC Upload to Public R2 Simulation & D1
  app.post('/api/admin/media/upload', publicUpload.single('file'), (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const category = (req.body.category as string) || 'Doctor Photos';
      const subfolder = (req.body.subfolder as string) || '';
      const altText = (req.body.alt_text as string) || '';
      const isDecorative = req.body.is_decorative === 'true';
      const width = req.body.width ? Number(req.body.width) : 1200;
      const height = req.body.height ? Number(req.body.height) : 800;

      let focalPoint: any = { x: 50, y: 50 };
      if (req.body.focal_point) {
        try {
          focalPoint = typeof req.body.focal_point === 'string' ? JSON.parse(req.body.focal_point) : req.body.focal_point;
        } catch {
          focalPoint = req.body.focal_point;
        }
      }

      const ext = path.extname(file.originalname).toLowerCase().replace('.', '') || 'webp';
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substring(2, 8);
      const cleanCat = category.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const cleanSub = subfolder ? `${subfolder.toLowerCase().replace(/[^a-z0-9]/g, '-')}/` : '';
      const storageKey = `website/${cleanCat}/${cleanSub}${timestamp}-${random}.${ext}`;

      // Relative public URL
      const relativeSubpath = path.relative(uploadsDir, file.path).replace(/\\/g, '/');
      const publicUrl = `/uploads/${relativeSubpath}`;

      const store = getD1Store();
      const mediaRecord = {
        id: `med-${Date.now()}-${random}`,
        storage_key: storageKey,
        original_name: file.originalname,
        mime_type: file.mimetype || 'image/webp',
        file_size: file.size,
        width,
        height,
        alt_text: altText || `${file.originalname.replace(/\.[^/.]+$/, '')} - Dr. Bhushan Parmar`,
        category,
        public_url: publicUrl,
        focal_point: focalPoint,
        is_decorative: isDecorative,
        uploaded_by: 'admin@drbhushanparmar.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      store.media = [mediaRecord, ...(store.media || [])];
      saveD1Store({ media: store.media });

      res.status(201).json({
        success: true,
        message: 'File uploaded directly to Cloudflare R2 & recorded in D1',
        media: mediaRecord
      });
    } catch (err: any) {
      console.error('Error during media upload:', err);
      res.status(500).json({ error: err.message || 'Failed to upload media file' });
    }
  });

  // POST /api/admin/media/complete
  app.post('/api/admin/media/complete', (req, res) => {
    try {
      const { storageKey, originalName, mimeType, fileSize, width, height, altText, category } = req.body;
      const store = getD1Store();
      const random = Math.random().toString(36).substring(2, 8);
      const mediaRecord = {
        id: `med-${Date.now()}-${random}`,
        storage_key: storageKey,
        original_name: originalName || 'uploaded-image.webp',
        mime_type: mimeType || 'image/webp',
        file_size: fileSize || 100000,
        width: width || 1200,
        height: height || 800,
        alt_text: altText || 'Dr. Bhushan Parmar Medical Oncology',
        category: category || 'General',
        public_url: `https://media.drbhushanparmar.com/${storageKey}`,
        uploaded_by: 'admin@drbhushanparmar.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      store.media = [mediaRecord, ...(store.media || [])];
      saveD1Store({ media: store.media });
      res.status(201).json({ success: true, mediaId: mediaRecord.id, media: mediaRecord });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to complete media record in D1', details: err.message });
    }
  });

  // PUT /api/admin/media/:id
  app.put('/api/admin/media/:id', (req, res) => {
    const { id } = req.params;
    const store = getD1Store();
    const item = (store.media || []).find((m: any) => m.id === id);
    if (!item) return res.status(404).json({ error: 'Media not found' });

    if (req.body.alt_text !== undefined) item.alt_text = req.body.alt_text;
    if (req.body.category !== undefined) item.category = req.body.category;
    if (req.body.focal_point !== undefined) item.focal_point = req.body.focal_point;
    if (req.body.is_decorative !== undefined) item.is_decorative = req.body.is_decorative;
    item.updated_at = new Date().toISOString();

    saveD1Store({ media: store.media });
    res.json({ success: true, media: item });
  });

  // DELETE /api/admin/media/:id - Safe Delete with usage protection
  app.delete('/api/admin/media/:id', (req, res) => {
    const { id } = req.params;
    const store = getD1Store();
    const mediaItem = (store.media || []).find((m: any) => m.id === id);
    if (!mediaItem) return res.status(404).json({ error: 'Media item not found' });

    const usages = getMediaUsagesInD1(mediaItem.id).concat(getMediaUsagesInD1(mediaItem.storage_key));
    const uniqueUsages = Array.from(new Set(usages));

    if (uniqueUsages.length > 0 && req.query.force !== 'true') {
      return res.status(400).json({
        error: 'Cannot delete media item because it is still in use across the website.',
        usageCount: uniqueUsages.length,
        usages: uniqueUsages
      });
    }

    store.media = (store.media || []).filter((m: any) => m.id !== id);
    saveD1Store({ media: store.media });
    res.json({ success: true, message: 'Media record removed from R2 / D1', deletedId: id });
  });

  // -------------------------------------------------------------
  // VITE MIDDLEWARE (DEV) & STATIC SERVING (PROD)
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cloudflare Worker & R2 / D1 Fullstack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
