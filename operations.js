// Operations Page Initializer & Interactive Manager
window.addEventListener("DOMContentLoaded", function () {
  console.log("✓ AI Media Studio: Operations & Workforce Directory Loaded Successfully.");

  // Interactive Feature: Log active department count
  var roleCards = document.querySelectorAll(".glass");
  if (roleCards.length > 0) {
    console.log("Total Active Operational Elements Tracked: " + roleCards.length);
  }

  // Optional: Add live timestamp or status check simulation
  updateStudioLiveStatus();
});

function updateStudioLiveStatus() {
  // You can expand this function to fetch live studio transmission status if needed
  var statusBadge = document.querySelector(".bg-blue-500\\/10");
  if (statusBadge) {
    // Ensuring clean interaction state
    statusBadge.title = "All broadcasting feeds and studio floors are operating normally.";
  }
}
