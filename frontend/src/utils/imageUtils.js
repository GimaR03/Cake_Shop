// Utility function to construct image URLs properly
import { API_URL } from '../config/api';

/**
 * Constructs a proper image URL from the backend
 * Handles edge cases like double slashes and missing paths
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return null;
  }

  // If imagePath is already a full URL, return it
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Remove leading slash from imagePath if present
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  // Remove trailing slash from API_URL if present
  const cleanApiUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  
  // Construct the full URL
  return `${cleanApiUrl}${cleanPath}`;
};

/**
 * Handles image loading errors with retry logic
 */
export const handleImageError = (e, retryCount = 0, maxRetries = 2) => {
  const img = e.target;
  
  // Store original source if not already stored
  if (!img.dataset.originalSrc) {
    img.dataset.originalSrc = img.src;
  }
  
  // If we've exhausted retries, show placeholder
  if (retryCount >= maxRetries) {
    console.warn('Image failed to load after retries:', img.dataset.originalSrc);
    img.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
    img.onerror = null; // Prevent infinite loop
    return;
  }

  // Retry loading the image after a short delay
  const retryDelay = 1000 * (retryCount + 1); // Exponential backoff: 1s, 2s, 3s
  setTimeout(() => {
    const originalSrc = img.dataset.originalSrc;
    // Add cache-busting parameter
    const separator = originalSrc.includes('?') ? '&' : '?';
    img.src = `${originalSrc}${separator}retry=${retryCount + 1}&t=${Date.now()}`;
    
    // Set up error handler for next retry
    img.onerror = (err) => {
      handleImageError(err, retryCount + 1, maxRetries);
    };
  }, retryDelay);
};

/**
 * Preloads an image to check if it's available
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error('Image failed to load'));
    img.src = src;
  });
};

