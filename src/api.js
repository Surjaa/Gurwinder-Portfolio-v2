// Connects the website to the Google Apps Script backend (apps-script/Code.gs).
// Paste your Web app URL here after deploying (ends with /exec).
export const API_URL = "https://script.google.com/macros/s/AKfycbwpuFB0Ou11XUVEmr7wfrKS-StcHIgCtV8uN0ZVGkjbGnV1sctRkz4uiGyUD21YAx7w/exec";

const isConfigured = () => API_URL.includes("/macros/s/") && !API_URL.includes("PASTE_YOUR");

// Apps Script accepts a plain text/plain POST, which avoids CORS preflight problems.
async function post(action, body = {}) {
  if (!isConfigured()) throw new Error("Backend URL not set in src/api.js");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...body }),
  });
  return res.json();
}

const VISITOR_KEY = "pf_visitor_id";
const OWNER_KEY = "pf_owner";

// Owner switch: open the site with ?owner=on once in your browser to stop logging your own visits,
// and ?owner=off to start logging again. Runs on every page load.
try {
  const mode = new URLSearchParams(window.location.search).get("Suraj");
  if (mode === "on") localStorage.setItem(OWNER_KEY, "1");
  if (mode === "off") localStorage.removeItem(OWNER_KEY);
} catch {
  // Storage blocked: the switch simply does nothing.
}

const isOwnerBrowser = () => {
  try { return localStorage.getItem(OWNER_KEY) === "1"; } catch { return false; }
};

function getVisitorId() {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    let isNew = false;
    if (!id) {
      id = (crypto.randomUUID && crypto.randomUUID()) || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(VISITOR_KEY, id);
      isNew = true;
    }
    return { id, isNew };
  } catch {
    return { id: "no-storage", isNew: false };
  }
}

// City-level place from the visitor's IP (cached for the page session).
let geoPromise;
function getGeo() {
  if (!geoPromise) {
    geoPromise = (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const j = await res.json();
        return { country: j.country_name, region: j.region, city: j.city };
      } catch {
        return {};
      }
    })();
  }
  return geoPromise;
}

// Device type, name, OS and browser from the user agent (and the device model on Chromium Android).
async function getDevice() {
  const ua = navigator.userAgent || "";
  const type = /iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua))
    ? "Tablet"
    : /Mobi|iPhone|Android/i.test(ua) ? "Mobile" : "Desktop";

  let os = "Unknown";
  let m;
  if (/Windows NT/.test(ua)) os = "Windows";
  else if ((m = ua.match(/Android ([\d.]+)/))) os = `Android ${m[1]}`;
  else if ((m = ua.match(/OS ([\d_]+) like Mac/))) os = `iOS ${m[1].replace(/_/g, ".")}`;
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/CrOS/.test(ua)) os = "ChromeOS";
  else if (/Linux/.test(ua)) os = "Linux";

  let browser = "Unknown";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\//.test(ua)) browser = "Opera";
  else if (/SamsungBrowser/.test(ua)) browser = "Samsung Internet";
  else if (/Chrome\//.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua)) browser = "Safari";

  let model = "";
  try {
    if (navigator.userAgentData?.getHighEntropyValues) {
      const v = await navigator.userAgentData.getHighEntropyValues(["model"]);
      model = v.model || "";
    }
  } catch {
    // Not supported in this browser: fall back below.
  }

  const name = model
    || (/iPhone/.test(ua) ? "iPhone"
      : /iPad/.test(ua) ? "iPad"
      : type === "Desktop" ? (os === "macOS" ? "Mac computer" : `${os} computer`)
      : `${os.split(" ")[0]} device`);

  return { type, name, os, browser };
}

// Exact coordinates from the browser (GPS / Wi-Fi). Only asks the visitor when allowPrompt is true
// (the contact form). For normal visits it uses the location only if permission was already granted.
function getExactLocation(allowPrompt) {
  return new Promise(async (resolve) => {
    try {
      if (!navigator.geolocation) return resolve(null);
      if (!allowPrompt) {
        if (!navigator.permissions) return resolve(null);
        const p = await navigator.permissions.query({ name: "geolocation" });
        if (p.state !== "granted") return resolve(null);
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
        () => resolve(null),
        { enableHighAccuracy: true, timeout: 6000, maximumAge: 600000 },
      );
    } catch {
      resolve(null);
    }
  });
}

export async function trackVisit() {
  try {
    if (["localhost", "127.0.0.1"].includes(window.location.hostname) || !isConfigured()) return;
    if (isOwnerBrowser()) return; // your own browser: not logged
    const { id, isNew } = getVisitorId();
    const [geo, device, exact] = await Promise.all([getGeo(), getDevice(), getExactLocation(false)]);
    await post("visit", {
      visitorId: id,
      isNew,
      geo,
      exact,
      device,
      page: window.location.pathname + window.location.hash,
      referrer: document.referrer || "direct",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      language: navigator.language || "",
      screen: `${window.screen.width}x${window.screen.height}`,
    });
  } catch {
    // Tracking must never break the page.
  }
}

export async function sendContact({ name, email, message, website = "" }) {
  const { id } = getVisitorId();
  const [geo, device, exact] = await Promise.all([getGeo(), getDevice(), getExactLocation(true)]);
  return post("contact", { name, email, message, website, visitorId: id, geo, device, exact });
}

export async function askAI(question) {
  const { id } = getVisitorId();
  const geo = await getGeo();
  const res = await post("ask", { question, visitorId: id, geo });
  if (!res.ok) throw new Error(res.error || "AI unavailable");
  return res.answer;
}

export async function getStats(token) {
  return post("stats", { token });
}
