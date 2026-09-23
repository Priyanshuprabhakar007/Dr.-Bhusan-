-- Migration 006: Patient Enquiries & Consultations Tables
-- Database: dr-bhushan-cms (Cloudflare D1)

CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  type TEXT DEFAULT 'general', -- 'appointment', 'contact', 'consultation'
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_date TEXT,
  preferred_time TEXT,
  location_id TEXT,
  cancer_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'in_progress', 'contacted', 'completed', 'archived'
  admin_notes TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries (status);
CREATE INDEX IF NOT EXISTS idx_enquiries_type ON enquiries (type);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries (created_at);
