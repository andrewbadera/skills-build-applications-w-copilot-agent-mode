const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const isCodespaceConfigured = Boolean(codespaceName)

export const apiBaseUrl = isCodespaceConfigured
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getEndpointUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export async function fetchCollection(resource, collectionKey, signal) {
  const response = await fetch(getEndpointUrl(resource), { signal })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeCollection(await response.json(), collectionKey)
}

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