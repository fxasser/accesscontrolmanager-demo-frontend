function setLoading(isLoading) {
  const el = document.getElementById("loading");
  if (!el) return;
  el.style.display = isLoading ? "block" : "none";
}

function setOutput(text) {
  const out = document.getElementById("output");
  if (!out) return;
  out.textContent = text || "";
}