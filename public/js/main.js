function $(id) {
  return document.getElementById(id);
}

function firstMissingField(dataset, user, action, resource) {
  if (!user) return "user";
  if (!action) return "action";
  if (!resource) return "resource";
  return null;
}

async function run(fn) {
  setLoading(true);
  try {
    const data = await fn();
    const report =
      data && data.report !== undefined ? data.report : JSON.stringify(data, null, 2);
    setOutput(report);
  } catch (err) {
    setOutput(`Error: ${err && err.message ? err.message : String(err)}`);
  } finally {
    setLoading(false);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  $("btnViolations").addEventListener("click", () =>
    run(() => getViolations($("dataset").value))
  );

  $("btnWarnings").addEventListener("click", () =>
    run(() => getWarnings($("dataset").value))
  );

  $("btnRules").addEventListener("click", () =>
    run(() => getRules($("dataset").value))
  );

  $("btnPermissions").addEventListener("click", () => {
    const dataset = $("dataset").value;
    const user = ($("user").value || "").trim();
    const action = ($("action").value || "").trim();
    const resource = ($("resource").value || "").trim();

    const missing = firstMissingField(dataset, user, action, resource);
    if (missing) {
      setOutput(
        "Error: Please fill in Username, Action, and Resource before checking permissions."
      );
      const el = $(missing);
      if (el) el.focus();
      return;
    }

    run(() => checkPermission(dataset, user, action, resource));
  });

  setOutput("Ready.");
});