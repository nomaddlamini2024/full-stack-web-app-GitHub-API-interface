// Importing Express and controllers
const express = require("express");
const { searchUsers, getUserDetails, getRepoDetails } 
= require("../controllers/githubController");

// Creating a new router instance
const router = express.Router(); 

// Define API routes
// Route for searching GitHub users
router.get("/search", searchUsers); 
// Route for fetching user details
router.get("/user/:username", getUserDetails); 
// Route for fetching repository details
router.get("/repo/:username/:repo", getRepoDetails); 

// Exporting the router
module.exports = router; 

