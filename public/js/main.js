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

window.addEventListener("DOMContentLoaded", () => {
  $("btnViolations").addEventListener("click", () => run(() => getViolations($("dataset").value)));
  $("btnWarnings").addEventListener("click", () => run(() => getWarnings($("dataset").value)));
  $("btnRules").addEventListener("click", () => run(() => getRules($("dataset").value)));

  $("btnPermissions").addEventListener("click", () => {
    const dataset = $("dataset").value;

    const user = ($("user").value || "").trim();
    const action = ($("action").value || "").trim();
    const resource = ($("resource").value || "").trim();

    // Frontend validation (prevents confusing backend behavior)
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