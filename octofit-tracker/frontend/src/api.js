/**
 * API Configuration for Octofit Tracker
 *
 * ENVIRONMENT VARIABLES:
 * - VITE_CODESPACE_NAME: Your GitHub Codespace name for production API access
 *   This must be set in .env.local for Codespace deployments
 *   Example .env.local content:
 *     VITE_CODESPACE_NAME=my-codespace-abc123
 *
 * If VITE_CODESPACE_NAME is unset, the app safely falls back to localhost:8000
 */

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const isCodespaceConfigured = Boolean(codespaceName)

export const apiBaseUrl = isCodespaceConfigured
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

/**
 * Constructs a full endpoint URL for a given resource
 * @param {string} resource - The API resource name (e.g., 'users', 'activities')
 * @returns {string} The full endpoint URL
 */
export function getEndpointUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

/**
 * Fetches a collection from the API with support for both paginated and array responses
 * @param {string} resource - The API resource name (e.g., 'users', 'activities')
 * @param {string} collectionKey - The key to look for in paginated responses
 * @param {AbortSignal} signal - AbortSignal for request cancellation
 * @returns {Promise<Object>} Normalized collection with items, total, and pagination metadata
 */
export async function fetchCollection(resource, collectionKey, signal) {
  const response = await fetch(getEndpointUrl(resource), { signal })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeCollection(await response.json(), collectionKey)
}

/**
 * Normalizes various API response formats into a consistent structure
 * Supports:
 * - Direct array responses: [item1, item2, ...]
 * - Paginated objects with multiple naming conventions:
 *   {results: [], total: 100}, {items: [], count: 50}, {data: []}, etc.
 * @param {Array|Object} payload - The API response payload
 * @param {string} collectionKey - The key to look for in paginated responses
 * @returns {Object} Normalized result with items, total, and pagination metadata
 */
export function normalizeCollection(payload, collectionKey) {
  if (Array.isArray(payload)) {
    return { items: payload, total: payload.length }
  }

  const candidates = [
    payload?.[collectionKey],
    payload?.results,
    payload?.items,
    payload?.data,
    payload?.docs,
  ]

  const items = candidates.find(Array.isArray) ?? []

  return {
    items,
    total: payload?.total ?? payload?.totalCount ?? payload?.count ?? items.length,
    page: payload?.page,
    totalPages: payload?.totalPages ?? payload?.pages,
    next: payload?.next,
    previous: payload?.previous,
  }
}