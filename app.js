const MANIFEST_URL = "https://orion-services.orionnn.workers.dev/manifest?channel=stable";
const WINDOWS_ASSET_NAME = "OrionSetup.exe";

async function loadWindowsDownload() {
  const statusEl = document.getElementById("windows-status");
  const linkEl = document.getElementById("windows-download");

  try {
    const resp = await fetch(MANIFEST_URL);
    const data = await resp.json();
    if (!resp.ok || data.error) throw new Error(data.error || `HTTP ${resp.status}`);

    const assetUrl = data.assets && data.assets[WINDOWS_ASSET_NAME];
    if (!assetUrl) throw new Error("asset_missing");

    linkEl.href = assetUrl;
    statusEl.textContent = `Ultima versione: ${data.tag}`;
  } catch (e) {
    // linkEl.href resta il fallback statico già presente nell'HTML
    // (pagina releases di GitHub) — l'utente può comunque scaricare.
    statusEl.textContent = "Scarica l'ultima release da GitHub";
  }
}

function revealOnScroll() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  targets.forEach((el) => observer.observe(el));
}

loadWindowsDownload();
revealOnScroll();
