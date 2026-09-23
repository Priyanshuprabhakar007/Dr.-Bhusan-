-- Migration 007: Second Opinion Requests and Private Patient Files
-- Database: dr-bhushan-cms (Cloudflare D1)
-- Storage: dr-bhushan-private-reports (Cloudflare R2 - NO PUBLIC ACCESS)

-- 1. Second Opinion Submissions
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
  urgency TEXT DEFAULT 'routine', -- 'routine', 'urgent'
  status TEXT DEFAULT 'new', -- 'new', 'under_review', 'report_ready', 'completed', 'archived'
  doctor_notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_second_opinion_status ON second_opinion_requests (status);
CREATE INDEX IF NOT EXISTS idx_second_opinion_created ON second_opinion_requests (created_at);

-- 2. Attached Confidential Patient Reports / Biopsies / Imaging
-- Stored strictly in private R2 bucket (dr-bhushan-private-reports)
CREATE TABLE IF NOT EXISTS second_opinion_files (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  storage_key TEXT UNIQUE NOT NULL,
  original_filename TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  file_type TEXT, -- 'biopsy', 'pet_scan', 'ct_scan', 'blood_work', 'discharge_summary', 'other'
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES second_opinion_requests(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_second_opinion_files_req ON second_opinion_files (request_id);
