function setLoading(isLoading) {
  document.getElementById("loading").style.display = isLoading ? "block" : "none";
}

function setOutput(text) {
  document.getElementById("output").textContent = text || "";
}