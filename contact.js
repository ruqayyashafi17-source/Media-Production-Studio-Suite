// Function to Handle Advertiser Lead Form Submission
function handleLeadSubmission(e) {
  e.preventDefault();

  var brandName = document.getElementById("brandName").value;
  var brandEmail = document.getElementById("brandEmail").value;
  var service = document.getElementById("selectedService").value;
  var projectBrief = document.getElementById("projectBrief").value;
  var successAlert = document.getElementById("successAlert");

  if (!brandName || !brandEmail) {
    alert("Please fill in all required fields.");
    return;
  }

  // Active n8n Webhook Request
  fetch('http://localhost:5678/webhook-test/media-lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      brandName: brandName,
      brandEmail: brandEmail,
      selectedService: service,
      projectBrief: projectBrief
    })
  })
  .then(response => {
    console.log("Lead successfully sent to n8n workflow!");
  })
  .catch(error => {
    console.error("Error sending lead:", error);
  });

  // Show Success Alert
  if (successAlert) {
    successAlert.classList.remove("hidden");
  }

  // Reset Form
  document.getElementById("leadForm").reset();
}
