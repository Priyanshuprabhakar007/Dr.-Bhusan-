-- Migration 001: Initial Setup
-- Database: dr-bhushan-cms (Cloudflare D1)

-- 1. Site Global Settings & Branding
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Doctor Profile & Qualifications
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

-- 3. Navigation Menu Items
CREATE TABLE IF NOT EXISTS navigation_items (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Footer Configuration
CREATE TABLE IF NOT EXISTS footer_config (
  id TEXT PRIMARY KEY,
  about_text TEXT,
  emergency_notice TEXT,
  copyright_text TEXT,
  quick_links JSON,
  social_links JSON,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Admin Users & Audit Log
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
