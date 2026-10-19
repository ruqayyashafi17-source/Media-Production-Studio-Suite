document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("advertiserForm");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("clientName").value;
    const email = document.getElementById("clientEmail").value;
    const brand = document.getElementById("clientBrand").value;
    const goal = document.getElementById("clientGoal").value;
    const resultBox = document.getElementById("bookingResult");
    const submitBtn = document.getElementById("submitLeadBtn");

    // UI Loading State
    submitBtn.disabled = true;
    submitBtn.innerText = "Processing Lead...";
    resultBox.classList.remove("hidden");
    resultBox.innerHTML = "<p class='text-slate-400 animate-pulse'>⚡ Transmitting campaign request to n8n workflow engine...</p>";

    try {
      // Replace with your actual n8n lead Webhook URL
      const response = await fetch("YOUR_N8N_WEBHOOK_URL_HERE", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          brand: brand,
          goal: goal,
          submitted_at: new Date().toISOString()
        })
      });

      if (response.ok) {
        resultBox.innerHTML = `
          <h4 class="text-emerald-400 font-bold mb-1">✓ Campaign Submitted Successfully!</h4>
          <p class="text-slate-300 text-sm">Your details have been logged and our automation has triggered successfully.</p>
        `;
        form.reset();
      } else {
        resultBox.innerHTML = "<p class='text-red-400'>❌ Submission failed. Please verify n8n webhook status.</p>";
      }
    } catch (error) {
      console.error(error);
      resultBox.innerHTML = "<p class='text-red-400'>❌ Connection error! Please check network or webhook endpoint.</p>";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Campaign Request";
    }
  });
});
