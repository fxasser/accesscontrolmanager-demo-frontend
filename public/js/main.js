function $(id) {
  return document.getElementById(id);
}

async function run(fn) {
  setLoading(true);
  try {
    const data = await fn();
    const report = (data && data.report !== undefined)
      ? data.report
      : JSON.stringify(data, null, 2);
    setOutput(report);
  } catch (err) {
    setOutput(`Error: ${err && err.message ? err.message : String(err)}`);
  } finally {
    setLoading(false);
  }
}

function validatePermissionInputs(user, action, resource) {
  if (!user || !action || !resource) {
    setOutput(
      "Please fill out all fields before checking permissions:\n" +
      `- Username: ${user ? "OK" : "missing"}\n` +
      `- Action: ${action ? "OK" : "missing"}\n` +
      `- Resource: ${resource ? "OK" : "missing"}`
    );
    return false;
  }
  return true;
}

function ensurePermissionExampleUI() {
  const permsDetails = document.querySelector("details summary + *") 
    ? document.querySelector("details") 
    : null;

  // safer: locate the permissions button and insert right above it
  const btn = $("btnPermissions");
  if (!btn) return;

  // If we've already injected, don't inject again
  if ($("permExample")) return;

  const wrapper = document.createElement("div");
  wrapper.style.marginTop = "0.75rem";

  // Label
  const label = document.createElement("label");
  label.setAttribute("for", "permExample");
  label.textContent = "Try an example (auto-fills the fields)";
  label.style.display = "block";
  label.style.marginBottom = "0.35rem";

  // Select
  const select = document.createElement("select");
  select.id = "permExample";

  // Curated examples (from your known outputs)
  const options = [
    { value: "", text: "Select an example…" },
    { value: "alpha|delete|Notes.Specialist.Cardiology", text: "alpha · delete · Notes.Specialist.Cardiology" },
    { value: "alpha|export|Notes.SocialWorker.Assessment", text: "alpha · export · Notes.SocialWorker.Assessment" },
    { value: "beta|delete|Notes.Specialist.Gastroenterology", text: "beta · delete · Notes.Specialist.Gastroenterology" }
  ];

  for (const opt of options) {
    const o = document.createElement("option");
    o.value = opt.value;
    o.textContent = opt.text;
    select.appendChild(o);
  }

  // Optional helper text
  const small = document.createElement("small");
  small.style.display = "block";
  small.style.marginTop = "0.35rem";
  small.style.opacity = "0.9";
  small.textContent = "Examples are from the preset datasets so viewers can test this feature without guessing.";

  // Optional “Use example” button (nice on mobile)
  const useBtn = document.createElement("button");
  useBtn.type = "button";
  useBtn.id = "btnUseExample";
  useBtn.textContent = "Use selected example";
  useBtn.style.marginTop = "0.5rem";

  function applySelectedExample() {
    const v = select.value;
    if (!v) return;

    const [u, a, r] = v.split("|");
    if ($("user")) $("user").value = u;
    if ($("action")) $("action").value = a;
    if ($("resource")) $("resource").value = r;
  }

  // Auto-fill immediately when changed
  select.addEventListener("change", applySelectedExample);
  useBtn.addEventListener("click", applySelectedExample);

  wrapper.appendChild(label);
  wrapper.appendChild(select);
  wrapper.appendChild(small);
  wrapper.appendChild(useBtn);

  // Insert right before the "Check Permissions" button
  btn.parentNode.insertBefore(wrapper, btn);
}

window.addEventListener("DOMContentLoaded", () => {
  if ($("btnViolations")) {
    $("btnViolations").addEventListener("click", () =>
      run(() => getViolations($("dataset").value))
    );
  }

  if ($("btnWarnings")) {
    $("btnWarnings").addEventListener("click", () =>
      run(() => getWarnings($("dataset").value))
    );
  }

  if ($("btnRules")) {
    $("btnRules").addEventListener("click", () =>
      run(() => getRules($("dataset").value))
    );
  }

  // Add the cleaner example dropdown UI
  ensurePermissionExampleUI();

  if ($("btnPermissions")) {
    $("btnPermissions").addEventListener("click", () => {
      const dataset = $("dataset") ? $("dataset").value : "A";

      const user = ($("user")?.value || "").trim();
      const action = ($("action")?.value || "").trim();
      const resource = ($("resource")?.value || "").trim();

      if (!validatePermissionInputs(user, action, resource)) return;

      run(() => checkPermission(dataset, user, action, resource));
    });
  }

  setOutput("Ready.");
});