import { AdminRole } from '../types/admin';

// Web Crypto API SHA-256 Hashing with Salt
export async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function generateSalt(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, salt: string, storedHash: string): Promise<boolean> {
  const computedHash = await hashPassword(password, salt);
  return computedHash === storedHash;
}

// Role-based permission verification
export function canManageContent(role?: AdminRole): boolean {
  return role === 'super_admin' || role === 'content_manager';
}

export function canManageEnquiries(role?: AdminRole): boolean {
  return role === 'super_admin' || role === 'enquiry_manager';
}

export function isSuperAdmin(role?: AdminRole): boolean {
  return role === 'super_admin';
}

export function canManageSecurity(role?: AdminRole): boolean {
  return role === 'super_admin';
}

// Document upload validation
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];
const MAX_DOCUMENT_SIZE_BYTES = 15 * 1024 * 1024; // 15MB

export function validateMedicalDocument(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `File type "${file.type || 'unknown'}" is not supported. Please upload PDF, JPG, or PNG files only.`
    };
  }
  if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 15MB safety limit. (File is ${(file.size / (1024 * 1024)).toFixed(1)}MB)`
    };
  }
  return { valid: true };
}
