// Function to check authentication and open tool links securely
function openProtectedTool(url) {
  var savedAuth = localStorage.getItem("oura_portal_auth");
  
  if (savedAuth === "unlocked") {
    window.open(url, "_blank");
  } else {
    alert("🔒 Access Denied! System is locked. Please go to the Security Gate and unlock the portal first using your passkey.");
  }
}

// Update UI Badge on Load based on Auth State
window.addEventListener("DOMContentLoaded", function () {
  var savedAuth = localStorage.getItem("oura_portal_auth");
  var badge = document.getElementById("statusBadge");
  var dot = document.getElementById("dotIndicator");
  var label = document.getElementById("statusText");
  var locks = document.querySelectorAll(".tool-lock");

  if (savedAuth === "unlocked") {
    if (badge) badge.className = "flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full";
    if (dot) dot.className = "w-2 h-2 rounded-full bg-emerald-500";
    if (label) {
      label.className = "text-xs font-semibold text-emerald-400";
      label.innerText = "System Unlocked";
    }
    // Change lock icons to unlocked
    locks.forEach(function(lock) {
      lock.className = "fa-solid fa-lock-open text-emerald-400 tool-lock text-sm";
    });
  } else {
    if (badge) badge.className = "flex items-center space-x-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full";
    if (dot) dot.className = "w-2 h-2 rounded-full bg-red-500 animate-pulse";
    if (label) {
      label.className = "text-xs font-semibold text-red-400";
      label.innerText = "System Locked";
    }
  }
});
