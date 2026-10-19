// Encoded Base64 Passkey for '172000' (Plain text code me nazar nahi ayega)
var ENCODED_PASSKEY = "MTcyMDAw";

// Function to Toggle Authentication Modal
function toggleAuthModal() {
  var modal = document.getElementById("authModal");
  if (modal) {
    modal.classList.toggle("hidden");
  }
}

// Function to Verify Passkey
function verifyPasskey() {
  var inputField = document.getElementById("passkeyInput");
  if (!inputField) return;

  var inputKey = inputField.value.trim();
  
  // Decodes the hidden passkey automatically during verification
  var decodedPasskey = atob(ENCODED_PASSKEY);

  if (inputKey === decodedPasskey) {
    localStorage.setItem("oura_portal_auth", "unlocked");
    updateAuthUI(true);
    toggleAuthModal();
    alert("✓ Passkey Authenticated Successfully! System unlocked.");
  } else {
    alert("❌ Incorrect Passkey! Access Denied.");
  }
}

// Function to Update Security Badge & UI Elements
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

// Run on Page Load to Restore Unlocked State
window.addEventListener("DOMContentLoaded", function () {
  var savedAuth = localStorage.getItem("oura_portal_auth");
  if (savedAuth === "unlocked") {
    updateAuthUI(true);
  }
});
