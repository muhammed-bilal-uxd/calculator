const express = require("express");
const app = express();
const path = require("path");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static("public"));

// Calculator API endpoint
app.post("/api/calculate", (req, res) => {
  try {
    const { expression } = req.body;

    // Basic validation
    if (!expression || typeof expression !== "string") {
      return res.status(400).json({ error: "Invalid expression" });
    }

    // Evaluate the expression (Note: Using eval is generally not recommended for production)
    // This is a simple example - in production, you should use a proper expression evaluator
    const result = eval(expression);

    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: "Invalid calculation" });
  }
});

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
