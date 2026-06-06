/**
 * Security checks and input sanitization layer for the chatbot.
 * Ensures the chatbot deals with clean data and prevents XSS/manipulation attempts.
 */

export function sanitizeInput(input: string): string {
  if (!input) return "";
  
  // 1. Strip raw HTML tags to prevent obvious injection in UI mirrors
  let clean = input.replace(/<[^>]*>?/gm, "");
  
  // 2. Limit input length to prevent denial-of-service / buffer heavy processing
  // 250 characters is more than enough for a calculator query
  clean = clean.slice(0, 250);
  
  return clean.trim();
}

/**
 * Validates that an output ID conforms to known safe characters.
 */
export function validatePath(path: string): string {
  // Ensure we only link to internal URLs starting with '/'
  if (path.startsWith("/")) {
    return path;
  }
  // Fallback to safe directory
  return "/";
}
