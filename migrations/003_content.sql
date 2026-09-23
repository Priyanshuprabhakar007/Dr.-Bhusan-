-- Migration 003: Core Website Content Tables
-- Database: dr-bhushan-cms (Cloudflare D1)

-- 1. Homepage Content & Sections
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

-- 2. Cancer Care Categories and Specialties
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

-- 3. Systemic Oncology Treatments & Modalities
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

-- 4. Interactive Body Anatomy Explorer Hotspot Data
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

-- 5. FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Testimonials
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
