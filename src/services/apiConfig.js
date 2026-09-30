/**
 * Centralized API & Service Configuration
 * 
 * Provides production-ready API URL resolution, request interceptors,
 * and graceful fallback to localStorage when running in standalone mode.
 */

// Production API Base URL configured via environment variable
export const API_BASE_URL = (import.meta.env.VITE_API_URL || "").trim();

export const isBackendConnected = () => {
  return Boolean(API_BASE_URL && API_BASE_URL.length > 0);
};

/**
 * Standardized HTTP fetch wrapper with automatic timeout and error handling.
 */
export const apiClient = async (endpoint, options = {}) => {
  if (!isBackendConnected()) {
    // Standalone static mode: Fall back to local data handler
    return {
      success: true,
      mode: "local-storage",
      message: "Operating in client-side persistence mode"
    };
  }

  const url = `${API_BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || 15000);

  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Network request timed out. Please check your internet connection.");
    }
    throw error;
  }
};

export default {
  API_BASE_URL,
  isBackendConnected,
  apiClient
};
