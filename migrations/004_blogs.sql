-- Migration 004: Blogs and Blog Categories Tables
-- Database: dr-bhushan-cms (Cloudflare D1)

-- 1. Blog Categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Educational Articles & Blogs
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
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs (category);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs (is_published, published_at);
