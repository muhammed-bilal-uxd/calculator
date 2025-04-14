document.addEventListener("DOMContentLoaded", () => {
  const result = document.getElementById("result");
  const buttons = document.querySelectorAll("button");
  let currentInput = "";

  // Add click event listeners to all buttons
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.textContent;

      if (value === "C") {
        // Clear the display
        currentInput = "";
        result.value = "";
      } else if (value === "=") {
        // Make API request to calculate result
        calculateResult(currentInput);
      } else {
        // Append the clicked value to current input
        currentInput += value;
        result.value = currentInput;
      }
    });
  });

  // Function to make API request and calculate result
  async function calculateResult(expression) {
    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ expression }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      result.value = data.result;
      currentInput = data.result.toString();
    } catch (error) {
      console.error("Error:", error);
      result.value = "Error";
      currentInput = "";
    }
  }
});
