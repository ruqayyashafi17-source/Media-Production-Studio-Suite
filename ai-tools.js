// Function to Generate Real AI Commercial Script via n8n / Gemini API
async function generateAIScript() {
  var brandInput = document.getElementById("scriptBrand");
  var audienceInput = document.getElementById("scriptAudience");
  var outputBox = document.getElementById("scriptOutput");

  if (!brandInput || !audienceInput || !outputBox) return;

  var brand = brandInput.value.trim() || "Oura Media Brand";
  var audience = audienceInput.value.trim() || "General Target Audience";

  // UI Loading State
  outputBox.innerText = "⚡ Connecting to Real Gemini AI Engine...\nGenerating dynamic commercial script for " + brand + "...";

  try {
    // Yahan apna actual n8n Webhook URL paste karein jo Gemini AI node se connected ho
    var response = await fetch("YOUR_N8N_AI_WEBHOOK_URL_HERE", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand: brand,
        audience: audience,
        timestamp: new Date().toISOString()
      })
    });

    if (response.ok) {
      var data = await response.json();
      // n8n se jo real script ya output aaye ga wo yahan show hoga
      outputBox.innerText = data.script || data.output || JSON.stringify(data, null, 2);
    } else {
      outputBox.innerText = "❌ Error: Failed to connect with Gemini AI workflow. Please check your n8n webhook.";
    }
  } catch (error) {
    console.error(error);
    outputBox.innerText = "❌ Network connection error! Please check your n8n server or webhook URL.";
  }
}

// Function to Calculate Commercial Rate Card Budget (Yeh bilkul theek kaam kar raha hai)
function calculateRate() {
  var serviceSelect = document.getElementById("calcService");
  var weeksInput = document.getElementById("calcWeeks");
  var estimateDisplay = document.getElementById("totalEstimate");

  if (!serviceSelect || !weeksInput || !estimateDisplay) return;

  var baseRate = parseInt(serviceSelect.value) || 1500;
  var weeks = parseInt(weeksInput.value) || 1;

  if (weeks < 1) weeks = 1;

  var total = baseRate * weeks;
  estimateDisplay.innerText = "$" + total.toLocaleString();
}
