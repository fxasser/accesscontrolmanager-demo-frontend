function $(id) {
  return document.getElementById(id);
}

async function run(fn) {
  setLoading(true);
  try {
    const data = await fn();
    const report = (data && data.report !== undefined) ? data.report : JSON.stringify(data, null, 2);
    setOutput(report);
  } catch (err) {
    setOutput(`Error: ${err && err.message ? err.message : String(err)}`);
  } finally {
    setLoading(false);
  }
}

function setPermissionFields({ dataset, user, action, resource }) {
  if (dataset) $("dataset").value = dataset;
  if (typeof user === "string") $("user").value = user;
  if (typeof action === "string") $("action").value = action;
  if (typeof resource === "string") $("resource").value = resource;
}

// Feel free to tweak these examples (they’re just UI helpers).
const PERMISSION_EXAMPLES = [
  { label: "Dataset A — alpha · delete · Notes.Specialist.Cardiology", dataset: "A", user: "alpha", action: "delete", resource: "Notes.Specialist.Cardiology" },
  { label: "Dataset A — alpha · export · Notes.SocialWorker.Assessment", dataset: "A", user: "alpha", action: "export", resource: "Notes.SocialWorker.Assessment" },
  { label: "Dataset A — beta · delete · Notes.Specialist.Gastroenterology", dataset: "A", user: "beta", action: "delete", resource: "Notes.Specialist.Gastroenterology" },
];

function initPermissionExamplesDropdown() {
  const sel = $("permExample");
  if (!sel) return; // If you remove it from HTML, JS won’t break.

  // Keep the first placeholder option, then append the examples.
  // (Assumes your HTML already contains: <option value="" selected>Select an example…</option>)
  for (const ex of PERMISSION_EXAMPLES) {
    const opt = document.createElement("option");
    opt.value = JSON.stringify(ex); // easiest reliable way to carry 4 fields
    opt.textContent = ex.label;
    sel.appendChild(opt);
  }

  sel.addEventListener("change", () => {
    const val = sel.value;
    if (!val) return;

    try {
      const ex = JSON.parse(val);
      setPermissionFields(ex);
    } catch (e) {
      setOutput("Error: could not parse example selection.");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  $("btnViolations").addEventListener("click", () => run(() => getViolations($("dataset").value)));
  $("btnWarnings").addEventListener("click", () => run(() => getWarnings($("dataset").value)));
  $("btnRules").addEventListener("click", () => run(() => getRules($("dataset").value)));

  initPermissionExamplesDropdown();

  $("btnPermissions").addEventListener("click", () => {
    const dataset = $("dataset").value;

    const user = ($("user").value || "").trim();
    const action = ($("action").value || "").trim();
    const resource = ($("resource").value || "").trim();

    if (!user || !action || !resource) {
      setOutput(
        "Please fill out all fields before checking permissions:\n" +
        `- Username: ${user ? "OK" : "missing"}\n` +
        `- Action: ${action ? "OK" : "missing"}\n` +
        `- Resource: ${resource ? "OK" : "missing"}`
      );
      return;
    }

    run(() => checkPermission(dataset, user, action, resource));
  });

  setOutput("Ready.");
});