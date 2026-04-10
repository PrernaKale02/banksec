/**
 * BankSec AI — Shared API Client
 *
 * Centralized fetch wrapper for all API calls.
 * All frontend pages use this to communicate with the backend.
 */

const BASE_URL = "http://localhost:8000";

/**
 * Makes an API request to the backend.
 *
 * @param {string} endpoint - API endpoint path (e.g., "/api/dashboard/stats")
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<any>} Parsed JSON response
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Serialize body if present
  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `API Error: ${response.status}`);
  }

  return response.json();
}

/**
 * Shorthand helpers
 */
export const api = {
  get: (endpoint) => apiRequest(endpoint, { method: "GET" }),

  post: (endpoint, data) =>
    apiRequest(endpoint, { method: "POST", body: data }),

  put: (endpoint, data) =>
    apiRequest(endpoint, { method: "PUT", body: data }),

  patch: (endpoint, data) =>
    apiRequest(endpoint, { method: "PATCH", body: data }),

  delete: (endpoint) => apiRequest(endpoint, { method: "DELETE" }),
};

export default api;
