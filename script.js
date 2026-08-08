// ===========================================================
// IRONGATE HOME SERVICES — sample site
// Demo interactivity only. No backend is connected.
// Replace SERVICED_ZIPS with your real service-area list,
// and wire the form submit handler to your CRM / webhook /
// ad-conversion pixel.
// ===========================================================

const SERVICED_ZIPS = [
  "30301", "30302", "30303", "30305", "30306", "30308",
  "30309", "30310", "30312", "30316", "30318", "30324",
  "30044", "30518", "30097", "30022"
];

function randomWorkOrder(){
  const n = Math.floor(1000 + Math.random() * 9000);
  return `#IG-${n}`;
}
document.getElementById("woNumber").textContent = randomWorkOrder();

const zipInput = document.getElementById("zipInput");
const zipCheckBtn = document.getElementById("zipCheckBtn");
const zipResult = document.getElementById("zipResult");
const stampEl = document.getElementById("stampEl");
const stampText = document.getElementById("stampText");
const stampMessage = document.getElementById("stampMessage");

function checkZip(){
  const raw = zipInput.value.trim();
  if (!/^\d{5}$/.test(raw)){
    zipResult.hidden = false;
    stampEl.className = "stamp stamp--no";
    stampText.textContent = "INVALID";
    stampMessage.textContent = "Enter a 5-digit ZIP code.";
    return;
  }

  const serviced = SERVICED_ZIPS.includes(raw);
  zipResult.hidden = false;
  // restart the stamp animation
  zipResult.classList.remove("stamp-result");
  void zipResult.offsetWidth;
  zipResult.classList.add("stamp-result");

  if (serviced){
    stampEl.className = "stamp stamp--yes";
    stampText.textContent = "SERVICED";
    stampMessage.textContent = `Good news — ${raw} is a live service area. A dispatcher can reach you today.`;
  } else {
    stampEl.className = "stamp stamp--no";
    stampText.textContent = "COMING SOON";
    stampMessage.textContent = `We don't have a technician in ${raw} yet — add your ZIP to the waitlist below.`;
  }
}

zipCheckBtn.addEventListener("click", checkZip);
zipInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkZip();
});
zipInput.addEventListener("input", () => {
  zipInput.value = zipInput.value.replace(/\D/g, "").slice(0, 5);
});

// Render the "service area" ZIP chip list
const zipChips = document.getElementById("zipChips");
SERVICED_ZIPS.forEach((z) => {
  const span = document.createElement("span");
  span.textContent = z;
  zipChips.appendChild(span);
});

// Lead capture form — demo only, no network request
const quoteForm = document.getElementById("quoteForm");
const formSuccess = document.getElementById("formSuccess");

quoteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!quoteForm.checkValidity()){
    quoteForm.reportValidity();
    return;
  }
  // In production: send this payload to your CRM / automation
  // platform (e.g. via a webhook), and fire your ad platform's
  // conversion event (Meta Pixel / Google Ads conversion tag) here.
  const payload = Object.fromEntries(new FormData(quoteForm).entries());
  console.log("Lead captured (demo — not sent anywhere):", payload);

  formSuccess.hidden = false;
  quoteForm.reset();
  formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
