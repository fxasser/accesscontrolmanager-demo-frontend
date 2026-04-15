/**
 * Fetch a JSON report from the backend.
 * Supports either:
 *  - API_BASE = "" (same-origin; paths like "/api/...")
 *  - API_BASE = "https://api.example.com" (cross-origin)
 *
 * Expected response JSON: { report: "..." }
 *
 * @param {string} path request path beginning with "/"
 * @returns {Promise<{report: string}>}
 */
async function fetchReport(path) {
  const base = (typeof API_BASE === "string") ? API_BASE.trim() : "";
  const url = base ? `${base}${path}` : path;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return { report: `Request failed: ${res.status} ${res.statusText}` };
    }

    return await res.json();
  } catch (err) {
    return {
      report:
        `Could not reach backend at ${url}.\n` +
        `If using same-domain proxying, ensure Nginx routes "/api" to your backend.\n` +
        `Error: ${err && err.message ? err.message : String(err)}`
    };
  }
}

/** Get violations report for a preset dataset (A/B/C/D). */
async function getViolations(dataset) {
  return fetchReport(`/api/violations?dataset=${encodeURIComponent(dataset)}`);
}

/** Get warnings report for a preset dataset (A/B/C/D). */
async function getWarnings(dataset) {
  return fetchReport(`/api/warnings?dataset=${encodeURIComponent(dataset)}`);
}

/** Get rules report for a preset dataset (A/B/C/D). */
async function getRules(dataset) {
  return fetchReport(`/api/rules?dataset=${encodeURIComponent(dataset)}`);
}

/**
 * Check permission for a specific user/action/resource in the selected dataset.
 */
async function checkPermission(dataset, user, action, resource) {
  const qs = new URLSearchParams({
    dataset,
    user,
    action,
    resource
  }).toString();

  return fetchReport(`/api/permissions?${qs}`);
}