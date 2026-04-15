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

  $("btnPermissions").addEventListener("click", () =>
    run(() => checkPermission($("dataset").value, $("user").value, $("action").value, $("resource").value))
  );

  setOutput("Ready. Set API_BASE in public/js/config.js when your backend is deployed.");
});