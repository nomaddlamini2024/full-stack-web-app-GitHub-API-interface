// Importing required modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const githubRoutes = require("./routes/githubRoutes");

// Loading environment variables
dotenv.config();

// Creating an Express app instance
const app = express();

// Applying middleware
// Enabling Cross-Origin Resource Sharing
app.use(cors());
// Parsing JSON request bodies
app.use(express.json());
// Improving security by setting HTTP headers
app.use(helmet());

// Define API routes
// Mount GitHub API routes
app.use("/api/github", githubRoutes);

// Using port from environment or default to 5001
const PORT = process.env.PORT || 5001;

// Starting the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app; // Export app for testing
