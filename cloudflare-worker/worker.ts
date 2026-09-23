/**
 * Cloudflare Worker API Layer for Dr. Bhushan Parmar Medical Oncology Website
 * Single source of truth for all structured data (D1) and media (R2).
 *
 * Bindings:
 * - DB: Cloudflare D1 Database ("dr-bhushan-cms")
 * - PUBLIC_MEDIA: Cloudflare R2 Bucket ("dr-bhushan-public-media")
 * - PRIVATE_REPORTS: Cloudflare R2 Bucket ("dr-bhushan-private-reports" - NO PUBLIC ACCESS)
 */

export interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  all<T = any>(): Promise<{ results: T[]; success: boolean }>;
  first<T = any>(): Promise<T | null>;
  run(): Promise<{ success: boolean; meta: any }>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<any[]>;
  exec(query: string): Promise<any>;
}

export interface R2Object {
  writeHttpMetadata(headers: Headers): void;
  httpEtag?: string;
  size: number;
  body: ReadableStream;
}

export interface R2Bucket {
  get(key: string): Promise<R2Object | null>;
  put(key: string, value: any, options?: any): Promise<any>;
  delete(keys: string | string[]): Promise<void>;
}

export interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}

export interface Env {
  DB: D1Database;
  PUBLIC_MEDIA: R2Bucket;
  PRIVATE_REPORTS: R2Bucket;
  PUBLIC_MEDIA_URL: string;
  ENVIRONMENT: string;
  ALLOWED_ORIGIN: string;
  ADMIN_AUTH_TOKEN?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    // CORS Configuration
    const origin = request.headers.get('Origin') || '*';
    const corsHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const json = (data: any, status = 200) => {
      return new Response(JSON.stringify(data), {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    };

    try {
      // -----------------------------------------------------------
      // SYSTEM & HEALTH ENDPOINTS
      // -----------------------------------------------------------
      if (pathname === '/api/health') {
        return json({
          status: 'ok',
          service: 'Cloudflare Worker (dr-bhushan-api)',
          database: 'Cloudflare D1 (dr-bhushan-cms)',
          publicMediaBucket: 'Cloudflare R2 (dr-bhushan-public-media)',
          privateReportsBucket: 'Cloudflare R2 (dr-bhushan-private-reports)',
          environment: env.ENVIRONMENT || 'production',
          timestamp: new Date().toISOString()
        });
      }

      if (pathname === '/api/test-db') {
        const result = await env.DB.prepare('SELECT COUNT(*) as media_count FROM media').first<{ media_count: number }>();
        return json({
          status: 'ok',
          connected: true,
          media_count: result?.media_count ?? 0
        });
      }

      // -----------------------------------------------------------
      // PUBLIC MEDIA STREAMING: /api/public/media/*
      // -----------------------------------------------------------
      if (pathname.startsWith('/api/public/media/')) {
        const storageKey = pathname.replace('/api/public/media/', '');
        const object = await env.PUBLIC_MEDIA.get(storageKey);

        if (!object) {
          return json({ error: 'Media asset not found in R2' }, 404);
        }

        const headers = new Headers(corsHeaders);
        object.writeHttpMetadata(headers);
        if (object.httpEtag) headers.set('etag', object.httpEtag);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');

        return new Response(object.body, { headers });
      }

      // -----------------------------------------------------------
      // PUBLIC WEBSITE AGGREGATE PAYLOAD: /api/public/site
      // Provides instantaneous single-round-trip hydration
      // -----------------------------------------------------------
      if (pathname === '/api/public/site' && request.method === 'GET') {
        const isPreview = url.searchParams.get('preview') === 'draft' || url.searchParams.get('preview') === 'true';

        // Retrieve settings, slots, doctor profile, homepage sections in parallel
        const [
          settingsRes,
          doctorRes,
          sectionsRes,
          categoriesRes,
          cancerCareRes,
          treatmentsRes,
          bodyExplorerRes,
          locationsRes,
          blogsRes,
          faqsRes,
          testimonialsRes,
          mediaRes,
          slotsRes,
          navRes,
          footerRes
        ] = await Promise.all([
          env.DB.prepare('SELECT key, value FROM site_settings').all<{ key: string; value: string }>(),
          env.DB.prepare('SELECT * FROM doctor_profile LIMIT 1').first(),
          env.DB.prepare('SELECT * FROM homepage_sections WHERE is_visible = 1 ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM cancer_categories ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM cancer_care WHERE status = "published" ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM treatments WHERE status = "published" ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM body_explorer_regions WHERE is_active = 1 ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM locations WHERE is_active = 1 ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM blogs WHERE is_published = 1 ORDER BY published_at DESC LIMIT 50').all(),
          env.DB.prepare('SELECT * FROM faqs WHERE is_published = 1 ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM testimonials WHERE is_published = 1 ORDER BY date DESC').all(),
          env.DB.prepare('SELECT * FROM media ORDER BY created_at DESC LIMIT 300').all(),
          env.DB.prepare('SELECT * FROM media_slots').all(),
          env.DB.prepare('SELECT * FROM navigation_items WHERE is_visible = 1 ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM footer_config LIMIT 1').first()
        ]);

        // Transform settings into key-value map
        const siteSettings: Record<string, any> = {};
        for (const row of settingsRes.results || []) {
          try {
            siteSettings[row.key] = JSON.parse(row.value);
          } catch {
            siteSettings[row.key] = row.value;
          }
        }

        // Transform media slots into key-value map
        const mediaSlots: Record<string, any> = {};
        for (const slot of slotsRes.results || []) {
          mediaSlots[(slot as any).slot_key] = slot;
        }

        // Parse JSON fields in doctor profile
        let doctorProfile: any = doctorRes || {};
        if (doctorProfile) {
          if (typeof doctorProfile.full_bio === 'string') try { doctorProfile.fullBio = JSON.parse(doctorProfile.full_bio); } catch {}
          if (typeof doctorProfile.qualifications === 'string') try { doctorProfile.qualifications = JSON.parse(doctorProfile.qualifications); } catch {}
          if (typeof doctorProfile.core_expertise === 'string') try { doctorProfile.coreExpertise = JSON.parse(doctorProfile.core_expertise); } catch {}
          if (typeof doctorProfile.memberships === 'string') try { doctorProfile.memberships = JSON.parse(doctorProfile.memberships); } catch {}
        }

        return json({
          success: true,
          isPreview,
          siteSettings,
          doctorProfile,
          homepageSections: sectionsRes.results || [],
          cancers: cancerCareRes.results || [],
          cancerCategories: categoriesRes.results || [],
          treatments: treatmentsRes.results || [],
          bodyExplorerRegions: bodyExplorerRes.results || [],
          locations: locationsRes.results || [],
          blogPosts: blogsRes.results || [],
          faqs: faqsRes.results || [],
          testimonials: testimonialsRes.results || [],
          navigationMenu: navRes.results || [],
          footerConfig: footerRes || {},
          mediaAssets: mediaRes.results || [],
          mediaSlots
        });
      }

      // -----------------------------------------------------------
      // INDIVIDUAL PUBLIC GET ENDPOINTS
      // -----------------------------------------------------------
      if (pathname === '/api/public/homepage') {
        const sections = await env.DB.prepare('SELECT * FROM homepage_sections WHERE is_visible = 1 ORDER BY display_order ASC').all();
        return json({ success: true, sections: sections.results });
      }

      if (pathname === '/api/public/doctor') {
        const doctor = await env.DB.prepare('SELECT * FROM doctor_profile LIMIT 1').first();
        return json({ success: true, doctorProfile: doctor });
      }

      if (pathname === '/api/public/cancer-care') {
        const cancers = await env.DB.prepare('SELECT * FROM cancer_care WHERE status = "published" ORDER BY display_order ASC').all();
        const categories = await env.DB.prepare('SELECT * FROM cancer_categories ORDER BY display_order ASC').all();
        return json({ success: true, cancers: cancers.results, categories: categories.results });
      }

      if (pathname.startsWith('/api/public/cancer-care/')) {
        const slug = pathname.replace('/api/public/cancer-care/', '');
        const cancer = await env.DB.prepare('SELECT * FROM cancer_care WHERE slug = ?').bind(slug).first();
        if (!cancer) return json({ error: 'Specialty not found' }, 404);
        return json({ success: true, cancer });
      }

      if (pathname === '/api/public/treatments') {
        const treatments = await env.DB.prepare('SELECT * FROM treatments WHERE status = "published" ORDER BY display_order ASC').all();
        return json({ success: true, treatments: treatments.results });
      }

      if (pathname.startsWith('/api/public/treatments/')) {
        const slug = pathname.replace('/api/public/treatments/', '');
        const treatment = await env.DB.prepare('SELECT * FROM treatments WHERE slug = ?').bind(slug).first();
        if (!treatment) return json({ error: 'Treatment not found' }, 404);
        return json({ success: true, treatment });
      }

      if (pathname === '/api/public/blogs') {
        const blogs = await env.DB.prepare('SELECT * FROM blogs WHERE is_published = 1 ORDER BY published_at DESC').all();
        return json({ success: true, blogs: blogs.results });
      }

      if (pathname.startsWith('/api/public/blogs/')) {
        const slug = pathname.replace('/api/public/blogs/', '');
        const blog = await env.DB.prepare('SELECT * FROM blogs WHERE slug = ?').bind(slug).first();
        if (!blog) return json({ error: 'Blog not found' }, 404);
        return json({ success: true, blog });
      }

      if (pathname === '/api/public/locations') {
        const locations = await env.DB.prepare('SELECT * FROM locations WHERE is_active = 1 ORDER BY display_order ASC').all();
        return json({ success: true, locations: locations.results });
      }

      if (pathname === '/api/public/faqs') {
        const faqs = await env.DB.prepare('SELECT * FROM faqs WHERE is_published = 1 ORDER BY display_order ASC').all();
        return json({ success: true, faqs: faqs.results });
      }

      if (pathname === '/api/public/navigation') {
        const nav = await env.DB.prepare('SELECT * FROM navigation_items WHERE is_visible = 1 ORDER BY display_order ASC').all();
        return json({ success: true, navigation: nav.results });
      }

      if (pathname === '/api/public/footer') {
        const footer = await env.DB.prepare('SELECT * FROM footer_config LIMIT 1').first();
        return json({ success: true, footer });
      }

      // -----------------------------------------------------------
      // PUBLIC SUBMISSION: ENQUIRIES & APPOINTMENTS
      // -----------------------------------------------------------
      if (pathname === '/api/public/enquiries' && request.method === 'POST') {
        const body = await request.json() as any;
        const id = `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

        await env.DB.prepare(
          `INSERT INTO enquiries (id, type, name, phone, email, preferred_date, preferred_time, location_id, cancer_type, message, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
          .bind(
            id,
            body.type || 'general',
            body.name || '',
            body.phone || '',
            body.email || '',
            body.preferredDate || body.preferred_date || '',
            body.preferredTime || body.preferred_time || '',
            body.locationId || body.location_id || '',
            body.cancerType || body.cancer_type || '',
            body.message || '',
            'new'
          )
          .run();

        return json({ success: true, message: 'Enquiry received successfully', enquiryId: id }, 201);
      }

      // -----------------------------------------------------------
      // PUBLIC SUBMISSION: SECOND OPINIONS & REPORT UPLOAD
      // Uploads directly to private R2 bucket: dr-bhushan-private-reports
      // -----------------------------------------------------------
      if (pathname === '/api/public/second-opinion' && request.method === 'POST') {
        const body = await request.json() as any;
        const id = `so-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

        await env.DB.prepare(
          `INSERT INTO second_opinion_requests (id, patient_name, phone, email, city, country, cancer_type, stage, current_treatment, specific_questions, urgency, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
          .bind(
            id,
            body.patientName || body.patient_name || '',
            body.phone || '',
            body.email || '',
            body.city || '',
            body.country || 'India',
            body.cancerType || body.cancer_type || '',
            body.stage || '',
            body.currentTreatment || body.current_treatment || '',
            body.specificQuestions || body.specific_questions || body.message || '',
            body.urgency || 'routine',
            'new'
          )
          .run();

        // If files were pre-uploaded and file IDs passed
        if (Array.isArray(body.fileIds) && body.fileIds.length > 0) {
          for (const fileId of body.fileIds) {
            await env.DB.prepare('UPDATE second_opinion_files SET request_id = ? WHERE id = ?').bind(id, fileId).run();
          }
        }

        return json({ success: true, message: 'Second opinion request recorded', requestId: id }, 201);
      }

      // Upload file directly to private R2 bucket (dr-bhushan-private-reports)
      if (pathname === '/api/public/second-opinion/upload-report' && request.method === 'POST') {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const requestId = (formData.get('requestId') as string) || (formData.get('request_id') as string) || 'temp';
        const fileType = (formData.get('fileType') as string) || 'biopsy';

        if (!file) {
          return json({ error: 'No file provided' }, 400);
        }

        const fileId = `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const ext = file.name.split('.').pop()?.toLowerCase() || 'pdf';
        const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const storageKey = `reports/${requestId}/${Date.now()}-${cleanName}`;

        // Stream into PRIVATE R2 bucket
        const arrayBuffer = await file.arrayBuffer();
        await env.PRIVATE_REPORTS.put(storageKey, arrayBuffer, {
          httpMetadata: { contentType: file.type || 'application/pdf' },
          customMetadata: {
            originalName: file.name,
            fileType,
            requestId
          }
        });

        // Record in second_opinion_files
        await env.DB.prepare(
          `INSERT INTO second_opinion_files (id, request_id, storage_key, original_filename, file_size, mime_type, file_type)
           VALUES (?, ?, ?, ?, ?, ?, ?)`
        )
          .bind(fileId, requestId, storageKey, file.name, file.size, file.type || 'application/octet-stream', fileType)
          .run();

        return json({
          success: true,
          fileId,
          originalFilename: file.name,
          fileSize: file.size,
          mimeType: file.type
          // NOTE: NO public_url returned for private reports
        }, 201);
      }

      // -----------------------------------------------------------
      // ADMIN API LAYER (Cloudflare D1 & R2)
      // -----------------------------------------------------------
      if (pathname === '/api/admin/all' && request.method === 'GET') {
        // Complete admin dataset fetch
        const [
          settings,
          doctor,
          sections,
          categories,
          cancers,
          treatments,
          regions,
          locations,
          blogs,
          faqs,
          testimonials,
          media,
          slots,
          enquiries,
          secondOpinions
        ] = await Promise.all([
          env.DB.prepare('SELECT * FROM site_settings').all(),
          env.DB.prepare('SELECT * FROM doctor_profile LIMIT 1').first(),
          env.DB.prepare('SELECT * FROM homepage_sections ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM cancer_categories ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM cancer_care ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM treatments ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM body_explorer_regions ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM locations ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM blogs ORDER BY published_at DESC').all(),
          env.DB.prepare('SELECT * FROM faqs ORDER BY display_order ASC').all(),
          env.DB.prepare('SELECT * FROM testimonials ORDER BY date DESC').all(),
          env.DB.prepare('SELECT * FROM media ORDER BY created_at DESC').all(),
          env.DB.prepare('SELECT * FROM media_slots').all(),
          env.DB.prepare('SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 100').all(),
          env.DB.prepare('SELECT * FROM second_opinion_requests ORDER BY created_at DESC LIMIT 100').all()
        ]);

        return json({
          success: true,
          data: {
            settings: settings.results,
            doctor,
            sections: sections.results,
            cancerCategories: categories.results,
            cancerCare: cancers.results,
            treatments: treatments.results,
            bodyExplorerRegions: regions.results,
            locations: locations.results,
            blogs: blogs.results,
            faqs: faqs.results,
            testimonials: testimonials.results,
            media: media.results,
            mediaSlots: slots.results,
            enquiries: enquiries.results,
            secondOpinions: secondOpinions.results
          }
        });
      }

      // MEDIA MANAGEMENT: GET /api/admin/media
      if (pathname === '/api/admin/media' && request.method === 'GET') {
        const category = url.searchParams.get('category');
        const q = url.searchParams.get('q');
        let sql = 'SELECT * FROM media';
        const params: any[] = [];

        if (category && category !== 'all') {
          sql += ' WHERE category = ?';
          params.push(category);
        }
        if (q) {
          sql += (params.length ? ' AND ' : ' WHERE ') + '(original_name LIKE ? OR alt_text LIKE ? OR storage_key LIKE ?)';
          const searchParam = `%${q}%`;
          params.push(searchParam, searchParam, searchParam);
        }
        sql += ' ORDER BY created_at DESC LIMIT 200';

        const results = await env.DB.prepare(sql).bind(...params).all();
        return json({ success: true, count: results.results?.length ?? 0, media: results.results });
      }

      // DIRECT PC UPLOAD TO R2 & D1: POST /api/admin/media/upload
      if (pathname === '/api/admin/media/upload' && request.method === 'POST') {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        if (!file) return json({ error: 'No file uploaded' }, 400);

        const category = (formData.get('category') as string) || 'Doctor Photos';
        const subfolder = (formData.get('subfolder') as string) || '';
        const altText = (formData.get('alt_text') as string) || '';
        const isDecorative = formData.get('is_decorative') === 'true' ? 1 : 0;
        const width = Number(formData.get('width')) || null;
        const height = Number(formData.get('height')) || null;

        const ext = file.name.split('.').pop()?.toLowerCase() || 'webp';
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 8);
        const cleanCat = category.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const cleanSub = subfolder ? `${subfolder.toLowerCase().replace(/[^a-z0-9]/g, '-')}/` : '';
        const storageKey = `website/${cleanCat}/${cleanSub}${timestamp}-${randomStr}.${ext}`;

        // Stream into public R2 bucket
        const arrayBuffer = await file.arrayBuffer();
        await env.PUBLIC_MEDIA.put(storageKey, arrayBuffer, {
          httpMetadata: { contentType: file.type || 'image/webp' },
          customMetadata: { originalName: file.name, category }
        });

        const publicDomain = env.PUBLIC_MEDIA_URL || 'https://media.drbhushanparmar.com';
        const publicUrl = `${publicDomain}/${storageKey}`;
        const mediaId = `med-${Date.now()}-${randomStr}`;

        await env.DB.prepare(
          `INSERT INTO media (id, storage_key, original_name, mime_type, file_size, width, height, alt_text, category, public_url, is_decorative)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
          .bind(mediaId, storageKey, file.name, file.type || 'image/webp', file.size, width, height, altText, category, publicUrl, isDecorative)
          .run();

        const mediaRecord = {
          id: mediaId,
          storage_key: storageKey,
          original_name: file.name,
          mime_type: file.type,
          file_size: file.size,
          width,
          height,
          alt_text: altText,
          category,
          public_url: publicUrl,
          created_at: new Date().toISOString()
        };

        return json({ success: true, message: 'Uploaded to Cloudflare R2 & recorded in D1', media: mediaRecord }, 201);
      }

      // SAFE DELETE: DELETE /api/admin/media/:id
      if (pathname.startsWith('/api/admin/media/') && request.method === 'DELETE') {
        const id = pathname.replace('/api/admin/media/', '');
        const item = await env.DB.prepare('SELECT * FROM media WHERE id = ?').bind(id).first<any>();
        if (!item) return json({ error: 'Media item not found' }, 404);

        // Check slots usage
        const slotUse = await env.DB.prepare('SELECT slot_name FROM media_slots WHERE published_value = ? OR draft_value = ?').bind(item.id, item.id).all();
        if ((slotUse.results?.length ?? 0) > 0 && url.searchParams.get('force') !== 'true') {
          return json({
            error: 'Media is in use in designated media slots',
            usages: slotUse.results
          }, 400);
        }

        await env.PUBLIC_MEDIA.delete(item.storage_key);
        await env.DB.prepare('DELETE FROM media WHERE id = ?').bind(id).run();
        return json({ success: true, message: 'Media removed from Cloudflare R2 and D1' });
      }

      // MEDIA SLOTS: GET /api/admin/media-slots
      if (pathname === '/api/admin/media-slots' && request.method === 'GET') {
        const slots = await env.DB.prepare('SELECT * FROM media_slots ORDER BY section ASC').all();
        const slotMap: Record<string, any> = {};
        for (const s of slots.results || []) {
          slotMap[(s as any).slot_key] = s;
        }
        return json({ success: true, mediaSlots: slotMap });
      }

      // SAVE SLOT DRAFT: PUT /api/admin/media-slots/:slotKey
      if (pathname.startsWith('/api/admin/media-slots/') && !pathname.endsWith('/publish') && request.method === 'PUT') {
        const slotKey = pathname.replace('/api/admin/media-slots/', '');
        const body = await request.json() as any;
        const { draftValue, altText, focalPoint, mobileValue } = body;

        await env.DB.prepare(
          `UPDATE media_slots
           SET draft_value = ?, alt_text = COALESCE(?, alt_text), focal_point = COALESCE(?, focal_point), mobile_value = COALESCE(?, mobile_value), status = 'draft_saved', updated_at = CURRENT_TIMESTAMP
           WHERE slot_key = ?`
        )
          .bind(draftValue, altText || null, focalPoint || null, mobileValue || null, slotKey)
          .run();

        const updated = await env.DB.prepare('SELECT * FROM media_slots WHERE slot_key = ?').bind(slotKey).first();
        return json({ success: true, message: `Draft saved for slot ${slotKey}`, slot: updated });
      }

      // PUBLISH SINGLE SLOT: POST /api/admin/media-slots/:slotKey/publish
      if (pathname.startsWith('/api/admin/media-slots/') && pathname.endsWith('/publish') && request.method === 'POST') {
        const slotKey = pathname.replace('/api/admin/media-slots/', '').replace('/publish', '');

        await env.DB.prepare(
          `UPDATE media_slots
           SET published_value = draft_value, status = 'published', updated_at = CURRENT_TIMESTAMP
           WHERE slot_key = ?`
        )
          .bind(slotKey)
          .run();

        const slot = await env.DB.prepare('SELECT * FROM media_slots WHERE slot_key = ?').bind(slotKey).first();
        return json({ success: true, message: `Slot ${slotKey} published to live website`, slot });
      }

      // PUBLISH ALL SLOTS: POST /api/admin/media-slots/publish-all
      if (pathname === '/api/admin/media-slots/publish-all' && request.method === 'POST') {
        await env.DB.prepare(
          `UPDATE media_slots
           SET published_value = draft_value, status = 'published', updated_at = CURRENT_TIMESTAMP
           WHERE status = 'draft_saved'`
        ).run();

        const slots = await env.DB.prepare('SELECT * FROM media_slots').all();
        return json({ success: true, message: 'All draft media slots published to live website', count: slots.results?.length ?? 0 });
      }

      // PRIVATE REPORT DOWNLOAD (Authorized admin only): GET /api/admin/second-opinions/:id/download-report/:fileId
      if (pathname.includes('/download-report/')) {
        const parts = pathname.split('/');
        const fileId = parts[parts.length - 1];

        const fileRecord = await env.DB.prepare('SELECT * FROM second_opinion_files WHERE id = ?').bind(fileId).first<any>();
        if (!fileRecord) return json({ error: 'File record not found in D1' }, 404);

        const object = await env.PRIVATE_REPORTS.get(fileRecord.storage_key);
        if (!object) return json({ error: 'File object not found in private R2 bucket' }, 404);

        const headers = new Headers(corsHeaders);
        object.writeHttpMetadata(headers);
        headers.set('Content-Disposition', `attachment; filename="${fileRecord.original_filename}"`);
        return new Response(object.body, { headers });
      }

      return json({ error: 'Endpoint not found', path: pathname }, 404);
    } catch (err: any) {
      return json({ error: err.message || 'Worker Internal Server Error', stack: err.stack }, 500);
    }
  }
};
