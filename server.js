// Importing required modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const githubRoutes = require("./routes/githubRoutes");

dotenv.config(); // Loading environment variables

const app = express(); // Creating an Express app instance

// Applying middleware
app.use(cors()); // Enabling Cross-Origin Resource Sharing
app.use(express.json()); // Parsing JSON request bodies
app.use(helmet()); // Improving security by setting HTTP headers

// Defining API routes
app.use("/api/github", githubRoutes); // Mounting GitHub API routes

// Using port from environment or default to 5001
const PORT = process.env.PORT || 5001;

// Starting the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Exporting app for testing
module.exports = app;
