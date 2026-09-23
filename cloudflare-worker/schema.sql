-- Unified Cloudflare D1 Database Schema
-- Database: dr-bhushan-cms
-- Media Bucket (Public): dr-bhushan-public-media
-- Reports Bucket (Private): dr-bhushan-private-reports

-- 1. Site Global Settings & Branding
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Doctor Profile & Credentials
CREATE TABLE IF NOT EXISTS doctor_profile (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  speciality TEXT NOT NULL,
  positioning TEXT NOT NULL,
  experience_years TEXT NOT NULL,
  tagline TEXT,
  hero_headline TEXT,
  hero_subheadline TEXT,
  bio_summary TEXT,
  full_bio JSON,
  photo_url TEXT,
  hero_photo TEXT,
  about_photo TEXT,
  profile_photo TEXT,
  cta_photo TEXT,
  second_opinion_photo TEXT,
  mobile_photo TEXT,
  signature_url TEXT,
  qualifications JSON,
  core_expertise JSON,
  memberships JSON,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Navigation Items & Footer
CREATE TABLE IF NOT EXISTS navigation_items (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS footer_config (
  id TEXT PRIMARY KEY,
  about_text TEXT,
  emergency_notice TEXT,
  copyright_text TEXT,
  quick_links JSON,
  social_links JSON,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Media Assets Metadata Table (R2 public bucket: dr-bhushan-public-media)
CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  storage_key TEXT UNIQUE NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  category TEXT DEFAULT 'Doctor Photos',
  public_url TEXT NOT NULL,
  focal_point_x REAL DEFAULT 50.0,
  focal_point_y REAL DEFAULT 50.0,
  is_decorative BOOLEAN DEFAULT 0,
  uploaded_by TEXT DEFAULT 'admin@drbhushanparmar.com',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_media_category ON media (category);
CREATE INDEX IF NOT EXISTS idx_media_storage_key ON media (storage_key);

-- 5. Media Slots Table (Controls designated image placement across the website)
CREATE TABLE IF NOT EXISTS media_slots (
  slot_key TEXT PRIMARY KEY,
  slot_name TEXT NOT NULL,
  section TEXT NOT NULL,
  target_table TEXT NOT NULL,
  target_field TEXT NOT NULL,
  published_value TEXT NOT NULL,
  draft_value TEXT NOT NULL,
  status TEXT DEFAULT 'published',
  alt_text TEXT,
  focal_point TEXT,
  mobile_value TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_media_slots_section ON media_slots (section);
CREATE INDEX IF NOT EXISTS idx_media_slots_status ON media_slots (status);

-- 6. Homepage Content Sections
CREATE TABLE IF NOT EXISTS homepage_sections (
  id TEXT PRIMARY KEY,
  section_key TEXT UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  content JSON,
  is_visible BOOLEAN DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 7. Cancer Care Categories and Specialties
CREATE TABLE IF NOT EXISTS cancer_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_id TEXT,
  display_order INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cancer_care (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  category_id TEXT,
  description TEXT,
  symptoms JSON,
  diagnosis JSON,
  treatments JSON,
  image_id TEXT,
  card_image TEXT,
  banner_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  display_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cancer_care_slug ON cancer_care (slug);
CREATE INDEX IF NOT EXISTS idx_cancer_care_category ON cancer_care (category);

-- 8. Systemic Treatments & Modalities
CREATE TABLE IF NOT EXISTS treatments (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT 'Systemic Therapy',
  summary TEXT,
  details TEXT,
  benefits JSON,
  process JSON,
  image_id TEXT,
  featured_image TEXT,
  display_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_treatments_slug ON treatments (slug);

-- 9. Body Explorer Regions (Interactive Anatomy Hotspots)
CREATE TABLE IF NOT EXISTS body_explorer_regions (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  cta TEXT DEFAULT 'View Specialty',
  hotspot_x REAL DEFAULT 50.0,
  hotspot_y REAL DEFAULT 50.0,
  conditions JSON,
  treatments JSON,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 10. Educational Blogs & Categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  category_id TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_id TEXT,
  og_image_id TEXT,
  author TEXT DEFAULT 'Dr. Bhushan Parmar',
  read_time TEXT DEFAULT '5 min read',
  tags JSON,
  published_at DATE,
  is_published BOOLEAN DEFAULT 1,
  seo_title TEXT,
  seo_description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs (slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs (is_published, published_at);

-- 11. FAQs & Testimonials
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  patient_name TEXT NOT NULL,
  cancer_type TEXT,
  treatment_received TEXT,
  feedback TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  date TEXT,
  is_published BOOLEAN DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 12. Practice Locations
CREATE TABLE IF NOT EXISTS locations (
  id TEXT PRIMARY KEY,
  hospital_name TEXT NOT NULL,
  department TEXT,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  opd_timings TEXT,
  days_available TEXT,
  image_id TEXT,
  is_primary BOOLEAN DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  google_maps_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 13. General Patient Enquiries & Appointments
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  type TEXT DEFAULT 'general',
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  location_id TEXT,
  cancer_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  admin_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 14. Second Opinion Requests & Confidential Files (dr-bhushan-private-reports)
CREATE TABLE IF NOT EXISTS second_opinion_requests (
  id TEXT PRIMARY KEY,
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT,
  country TEXT DEFAULT 'India',
  cancer_type TEXT,
  stage TEXT,
  current_treatment TEXT,
  specific_questions TEXT,
  urgency TEXT DEFAULT 'routine',
  status TEXT DEFAULT 'new',
  doctor_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS second_opinion_files (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  storage_key TEXT UNIQUE NOT NULL,
  original_filename TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  file_type TEXT,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES second_opinion_requests(id) ON DELETE CASCADE
);

-- 15. Admin Users & Audit Trail
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'content_manager',
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
