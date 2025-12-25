/**
 * Centralized Google OAuth Authentication Utility
 * 
 * This module provides a single source of truth for Google API authentication,
 * with built-in rate limiting, caching, and error handling.
 * 
 * Uses Supabase Edge Function to securely handle Google OAuth credentials.
 */

// Supabase configuration
const SUPABASE_URL = 'https://oleiodivubhtcagrlfug.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sZWlvZGl2dWJodGNhZ3JsZnVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTkxMjYsImV4cCI6MjA4MTU5NTEyNn0.QH_201DUxgNACmV9_48z1UUM5rFoy0-0yACIBBRkT2s';

// Spreadsheet IDs
export const SPREADSHEET_IDS = {
  PAYROLL: import.meta.env.VITE_PAYROLL_SPREADSHEET_ID || '1DSRuJJBhl1Sc9yfY6ki-ZFhdmQ_OeVeGyPDE6n9zpK4',
  SESSIONS: import.meta.env.VITE_SESSIONS_SPREADSHEET_ID || '1mqjZXStj_PeCt_exDSk-1RP-20Jgk0yl1Lmcg3sZty8',
  EXPIRATIONS: import.meta.env.VITE_EXPIRATIONS_SPREADSHEET_ID || '1rGMDDvvTbZfNg1dueWtRN3LhOgGQOdLg3Fd7Sn1GCZo',
  SALES: import.meta.env.VITE_SALES_SPREADSHEET_ID || '1HbGnJk-peffUp7XoXSlsL55924E9yUt8cP_h93cdTT0',
};

// Request queue for rate limiting
interface QueuedRequest {
  resolve: (value: any) => void;
  reject: (error: any) => void;
  request: () => Promise<any>;
}

const requestQueue: QueuedRequest[] = [];
let isProcessingQueue = false;
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests (60/min limit)

/**
 * Get a valid access token - now deprecated as edge function handles auth
 * @deprecated Use edge function instead
 */
export const getGoogleAccessToken = async (): Promise<string> => {
  // This is now handled by the edge function
  console.warn('getGoogleAccessToken is deprecated. Using edge function for Google Sheets access.');
  return 'handled-by-edge-function';
};

/**
 * Process the request queue with rate limiting
 */
const processQueue = async () => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  while (requestQueue.length > 0) {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
    }
    
    const item = requestQueue.shift();
    if (!item) continue;
    
    try {
      lastRequestTime = Date.now();
      const result = await item.request();
      item.resolve(result);
    } catch (error) {
      item.reject(error);
    }
  }
  
  isProcessingQueue = false;
};

/**
 * Queue a request to be executed with rate limiting
 */
export const queueRequest = <T>(request: () => Promise<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    requestQueue.push({ resolve, reject, request });
    processQueue();
  });
};

/**
 * Fetch data from a Google Sheet via Supabase Edge Function
 */
export const fetchGoogleSheet = async (
  spreadsheetId: string,
  range: string,
  options: {
    valueRenderOption?: 'FORMATTED_VALUE' | 'UNFORMATTED_VALUE' | 'FORMULA';
    dateTimeRenderOption?: 'SERIAL_NUMBER' | 'FORMATTED_STRING';
  } = {}
): Promise<any[][]> => {
  const { 
    valueRenderOption = 'UNFORMATTED_VALUE',
    dateTimeRenderOption = 'FORMATTED_STRING'
  } = options;

  return queueRequest(async () => {
    const url = new URL(`${SUPABASE_URL}/functions/v1/google-sheets`);
    url.searchParams.set('spreadsheetId', spreadsheetId);
    url.searchParams.set('range', range);
    url.searchParams.set('valueRenderOption', valueRenderOption);
    url.searchParams.set('dateTimeRenderOption', dateTimeRenderOption);
    
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch sheet data: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result.values || [];
  });
};

/**
 * Batch fetch multiple ranges from a Google Sheet
 */
export const batchFetchGoogleSheet = async (
  spreadsheetId: string,
  ranges: string[],
  options: {
    valueRenderOption?: 'FORMATTED_VALUE' | 'UNFORMATTED_VALUE' | 'FORMULA';
    dateTimeRenderOption?: 'SERIAL_NUMBER' | 'FORMATTED_STRING';
  } = {}
): Promise<Map<string, any[][]>> => {
  const { 
    valueRenderOption = 'UNFORMATTED_VALUE',
    dateTimeRenderOption = 'FORMATTED_STRING'
  } = options;

  return queueRequest(async () => {
    const accessToken = await getGoogleAccessToken();
    
    const url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet`);
    ranges.forEach(range => url.searchParams.append('ranges', range));
    url.searchParams.set('valueRenderOption', valueRenderOption);
    url.searchParams.set('dateTimeRenderOption', dateTimeRenderOption);
    
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to batch fetch sheet data: ${response.status}`);
    }

    const result = await response.json();
    const resultMap = new Map<string, any[][]>();
    
    result.valueRanges?.forEach((vr: any, index: number) => {
      resultMap.set(ranges[index], vr.values || []);
    });
    
    return resultMap;
  });
};

/**
 * Parse a numeric value from sheet data
 */
export const parseNumericValue = (value: string | number): number => {
  if (typeof value === 'number') {
    return isNaN(value) ? 0 : value;
  }
  if (!value || value === '') return 0;
  const cleaned = value.toString().replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Parse a date value from sheet data
 */
export const parseDateValue = (value: string | number): Date | null => {
  if (!value) return null;
  
  // Handle Excel serial date numbers
  if (typeof value === 'number') {
    const date = new Date((value - 25569) * 86400 * 1000);
    return isNaN(date.getTime()) ? null : date;
  }
  
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Validate that required environment variables are set
 */
export const validateGoogleConfig = (): boolean => {
  const required = ['VITE_GOOGLE_CLIENT_ID', 'VITE_GOOGLE_CLIENT_SECRET', 'VITE_GOOGLE_REFRESH_TOKEN'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    console.warn('Missing Google OAuth environment variables:', missing);
    return false;
  }
  
  return true;
};

// Validate on module load
if (import.meta.env.DEV) {
  validateGoogleConfig();
}
