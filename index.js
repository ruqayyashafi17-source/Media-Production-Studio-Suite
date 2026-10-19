// Encrypted SHA-256 Hash of Password 'OURA2026'
var HASHED_PASSKEY = "2c5108f51a2d5e75128ff3e707b66df825b3068fbf173a11b7b054238e235d10";

// SHA-256 Hash Function
async function hashString(string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Toggle Modal
function toggleAuthModal() {
  var modal = document.getElementById("authModal");
  if (modal) {
    modal.classList.toggle("hidden");
  }
}

// Verify Passkey
async function verifyPasskey() {
  var inputField = document.getElementById("passkeyInput");
  if (!inputField) return;

  var inputKey = inputField.value.trim();
  var inputHash = await hashString(inputKey);

  if (inputHash === HASHED_PASSKEY) {
    localStorage.setItem("oura_portal_auth", "unlocked");
    updateAuthUI(true);
    toggleAuthModal();
    alert("✓ System Authenticated & Unlocked! Access Granted to All Pages.");
  } else {
    alert("❌ Access Denied! Incorrect Security Passkey.");
  }
}

// Update UI Badge
function updateAuthUI(isUnlocked) {
  var badge = document.getElementById("statusBadge");
  var dot = document.getElementById("dotIndicator");
  var label = document.getElementById("statusText");
  var btn = document.getElementById("authBtn");

  if (isUnlocked) {
    if (badge) badge.className = "flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full";
    if (dot) dot.className = "w-2 h-2 rounded-full bg-emerald-500";
    if (label) {
      label.className = "text-xs font-semibold text-emerald-400";
      label.innerText = "System Unlocked";
    }
    if (btn) {
      btn.innerText = "Lock System Access";
      btn.onclick = function () {
        localStorage.removeItem("oura_portal_auth");
        updateAuthUI(false);
        window.location.reload();
      };
    }
  } else {
    if (badge) badge.className = "flex items-center space-x-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full";
    if (dot) dot.className = "w-2 h-2 rounded-full bg-red-500 animate-pulse";
    if (label) {
      label.className = "text-xs font-semibold text-red-400";
      label.innerText = "System Locked";
    }
    if (btn) {
      btn.innerText = "Unlock Portal Access";
      btn.onclick = toggleAuthModal;
    }
  }
}

// Auto Check on Load
window.addEventListener("DOMContentLoaded", function () {
  var savedAuth = localStorage.getItem("oura_portal_auth");
  if (savedAuth === "unlocked") {
    updateAuthUI(true);
  }
});
