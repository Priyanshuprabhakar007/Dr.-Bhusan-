-- Migration 002: Media and Media Slots Tables
-- Database: dr-bhushan-cms (Cloudflare D1)
-- Storage: dr-bhushan-public-media (Cloudflare R2)

-- 1. Media Assets Metadata Table
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

-- 2. Media Slots Table
-- Maps key high-visibility frontend locations to public media assets in R2
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
