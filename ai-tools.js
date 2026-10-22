```javascript
// ============================================
// AI MEDIA STUDIO SUITE
// Real AI Commercial Script Generator via n8n
// ============================================

// IMPORTANT:
// n8n must be running on this computer.
// For this Test URL, click "Listen for test event"
// in the n8n Webhook node before generating a script.

const AI_WEBHOOK_URL =
  "http://localhost:5678/webhook-test/script-generator";


// ============================================
// FUNCTION 1: GENERATE AI COMMERCIAL SCRIPT
// ============================================

async function generateAIScript() {
  const brandInput = document.getElementById("scriptBrand");
  const audienceInput = document.getElementById("scriptAudience");
  const outputBox = document.getElementById("scriptOutput");

  const generateButton = document.querySelector(
    'button[onclick="generateAIScript()"]'
  );

  if (!brandInput || !audienceInput || !outputBox) {
    console.error("Script Generator HTML elements were not found.");
    return;
  }

  const brand = brandInput.value.trim();
  const audience =
    audienceInput.value.trim() || "General Target Audience";

  if (!brand) {
    outputBox.innerText =
      "Please enter your Brand / Product Name first.";
    brandInput.focus();
    return;
  }

  if (generateButton && generateButton.disabled) {
    return;
  }

  const originalButtonText = generateButton
    ? generateButton.innerHTML
    : "";

  // Show loading message
  outputBox.innerText =
    "Connecting to n8n and Gemini AI...\n\n" +
    "Generating a commercial script for: " + brand;

  if (generateButton) {
    generateButton.disabled = true;
    generateButton.innerText = "Generating Script...";
  }

  try {
    const response = await fetch(AI_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        brand: brand,
        audience: audience,
        timestamp: new Date().toISOString()
      })
    });

    const responseText = await response.text();

    // Check HTTP response
    if (!response.ok) {
      throw new Error(
        "HTTP Error " + response.status +
        "\n\nResponse: " + responseText.slice(0, 500)
      );
    }

    // Convert response to JSON
    let data;

    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      throw new Error(
        "n8n returned an invalid JSON response.\n\n" +
        responseText.slice(0, 500)
      );
    }

    // Extract generated script from common response formats
    function extractScript(result) {
      if (typeof result === "string") {
        return result.trim();
      }

      if (Array.isArray(result)) {
        for (const item of result) {
          const found = extractScript(item);
          if (found) return found;
        }
      }

      if (result && typeof result === "object") {
        const fields = [
          "script",
          "output",
          "text",
          "response",
          "content"
        ];

        for (const field of fields) {
          if (
            typeof result[field] === "string" &&
            result[field].trim()
          ) {
            return result[field].trim();
          }
        }

        // Gemini REST API response format
        if (Array.isArray(result.candidates)) {
          for (const candidate of result.candidates) {
            const parts = candidate?.content?.parts;

            if (Array.isArray(parts)) {
              const text = parts
                .map(part => part.text || "")
                .filter(Boolean)
                .join("\n");

              if (text.trim()) return text.trim();
            }
          }
        }

        // Check nested response fields
        for (const field of ["data", "result", "message"]) {
          if (result[field] !== undefined) {
            const found = extractScript(result[field]);
            if (found) return found;
          }
        }
      }

      return "";
    }

    const script = extractScript(data);

    if (!script) {
      console.error("Unexpected n8n response:", data);

      outputBox.innerText =
        "The n8n webhook responded, but no script was found.\n\n" +
        "Please check the Respond to Webhook node in n8n.";
      return;
    }

    // Display generated script
    outputBox.innerText = script;

  } catch (error) {
    console.error("AI Script Generator Error:", error);

    outputBox.innerText =
      "SCRIPT GENERATION FAILED\n\n" +
      "Error: " + error.message +
      "\n\nPlease check:\n" +
      "1. Is n8n running on localhost:5678?\n" +
      "2. Is the Webhook node listening for a test event?\n" +
      "3. Is the webhook path script-generator correct?\n" +
      "4. Is there a CORS error in the browser Console?\n" +
      "5. Is the HTTP Request node working in n8n?";
  } finally {
    if (generateButton) {
      generateButton.disabled = false;
      generateButton.innerHTML = originalButtonText;
    }
  }
}


// ============================================
// FUNCTION 2: COMMERCIAL RATE CALCULATOR
// ============================================

function calculateRate() {
  const serviceSelect = document.getElementById("calcService");
  const weeksInput = document.getElementById("calcWeeks");
  const estimateDisplay = document.getElementById("totalEstimate");

  if (!serviceSelect || !weeksInput || !estimateDisplay) {
    return;
  }

  const baseRate = Number(serviceSelect.value);
  let weeks = Number(weeksInput.value);

  if (!Number.isFinite(baseRate) || baseRate < 0) {
    estimateDisplay.innerText = "Invalid package price";
    return;
  }

  if (!Number.isFinite(weeks) || weeks < 1) {
    weeks = 1;
  }

  weeks = Math.floor(weeks);

  if (weeks > 52) {
    weeks = 52;
  }

  weeksInput.value = weeks;

  const total = baseRate * weeks;

  estimateDisplay.innerText =
    "$" + total.toLocaleString("en-US");
}


// ============================================
// FUNCTION 3: INITIALIZE RATE CALCULATOR
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  calculateRate();

  const serviceSelect = document.getElementById("calcService");
  const weeksInput = document.getElementById("calcWeeks");

  if (serviceSelect) {
    serviceSelect.addEventListener("change", calculateRate);
  }

  if (weeksInput) {
    weeksInput.addEventListener("input", calculateRate);
  }
});
```
