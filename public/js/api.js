async function fetchReport(path) {
  if (!API_BASE) {
    return { report: "API_BASE not set. Edit public/js/config.js and set your backend URL." };
  }

  const url = `${API_BASE}${path}`;
  const res = await fetch(url);

  if (!res.ok) {
    return { report: `Request failed: ${res.status} ${res.statusText}` };
  }

  // Expect JSON: { report: "..." }
  return await res.json();
}

async function getViolations(dataset) {
  return fetchReport(`/api/violations?dataset=${encodeURIComponent(dataset)}`);
}

async function getWarnings(dataset) {
  return fetchReport(`/api/warnings?dataset=${encodeURIComponent(dataset)}`);
}

async function getRules(dataset) {
  return fetchReport(`/api/rules?dataset=${encodeURIComponent(dataset)}`);
}

async function checkPermission(dataset, user, action, resource) {
  const qs = new URLSearchParams({ dataset, user, action, resource }).toString();
  return fetchReport(`/api/permissions?${qs}`);
}