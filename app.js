document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  const messageField = form.querySelector("textarea");
  const sendButton = form.querySelector("button");
  
  // Create character counter for message textarea
  const maxChars = 500;
  const counter = document.createElement("div");
  counter.style.textAlign = "right";
  counter.style.color = "var(--text-gray)";
  counter.style.fontSize = "0.9rem";
  counter.textContent = `0 / ${maxChars}`;
  messageField.parentNode.appendChild(counter);

  messageField.addEventListener("input", () => {
    const length = messageField.value.length;
    counter.textContent = `${length} / ${maxChars}`;
    if (length > maxChars) {
      messageField.value = messageField.value.slice(0, maxChars);
      counter.textContent = `${maxChars} / ${maxChars}`;
    }
  });

  // Real-time validation feedback
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      if (input.checkValidity()) {
        input.style.borderColor = "var(--primay-color)";
      } else {
        input.style.borderColor = "red";
      }
    });
  });

  // Form submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let isValid = true;
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        input.style.borderColor = "red";
        isValid = false;
      } else {
        input.style.borderColor = "var(--primay-color)";
      }
    });

    if (!isValid) {
      alert("Please fill out all required fields correctly.");
      return;
    }

    // Show confirmation message
    const confirmation = document.createElement("div");
    confirmation.textContent = "✅ Your message has been sent successfully!";
    confirmation.style.backgroundColor = "var(--primay-color)";
    confirmation.style.color = "#000";
    confirmation.style.padding = "15px";
    confirmation.style.borderRadius = "var(--border-radius)";
    confirmation.style.marginTop = "20px";
    confirmation.style.textAlign = "center";
    confirmation.style.fontWeight = "600";

    form.parentNode.insertBefore(confirmation, form.nextSibling);

    // Clear form
    form.reset();
    counter.textContent = `0 / ${maxChars}`;

    // Remove confirmation after 5 seconds
    setTimeout(() => {
      confirmation.remove();
    }, 5000);
  });
});