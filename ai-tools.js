// Function to Simulate AI Commercial Script Generation
function generateAIScript() {
  var brandInput = document.getElementById("scriptBrand");
  var audienceInput = document.getElementById("scriptAudience");
  var outputBox = document.getElementById("scriptOutput");

  var brand = brandInput.value.trim() || "Oura Media Brand";
  var audience = audienceInput.value.trim() || "General Target Audience";

  outputBox.innerText = "⚡ Connecting to Gemini AI Engine...\nGenerating cinematic TVC concept...";

  setTimeout(function () {
    outputBox.innerText = `[TVC PRODUCTION SCRIPT: ${brand.toUpperCase()}]\n` +
      `--------------------------------------------------\n` +
      `• TARGET NICHE: ${audience}\n` +
      `• FORMAT: 30-Second High-Impact Commercial\n\n` +
      `[00:00 - 00:08] SCENE START: Dynamic cinematic drone shot moving into a modern studio.\n` +
      `AUDIO: Energetic electronic rhythm mixed with crisp sound effects.\n` +
      `VOICEOVER: "Ready to elevate your standards? Introducing ${brand}."\n\n` +
      `[00:08 - 00:22] VISUAL MONTAGE: Fast-paced cuts showcasing product performance and happy customers.\n` +
      `VOICEOVER: "Engineered specifically for modern creators and professionals."\n\n` +
      `[00:22 - 00:30] CALL TO ACTION: Bold studio logo reveal with contact details.\n` +
      `[SCENE END - APPROVED FOR BROADCAST]`;
  }, 800);
}

// Function to Calculate Commercial Rate Card Budget
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
