-- Migration 005: Clinical Locations Tables
-- Database: dr-bhushan-cms (Cloudflare D1)

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

CREATE INDEX IF NOT EXISTS idx_locations_primary ON locations (is_primary);
CREATE INDEX IF NOT EXISTS idx_locations_active ON locations (is_active);
