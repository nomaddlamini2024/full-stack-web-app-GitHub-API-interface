// Importing required modules
// Axios for making HTTP requests
const axios = require("axios"); 
// Loading environment variables
require("dotenv").config(); 

// GitHub API base URL
const GITHUB_API_URL = process.env.GITHUB_API_URL; 

/**
 * Search GitHub users by query
 * @route GET /api/github/search
 */
const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query required" });

    const response = await axios.get(`${GITHUB_API_URL}`
      +`/search/users?q=${query}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching GitHub users:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
};

/**
 * Get GitHub user details and their top 5 repositories
 * @route GET /api/github/user/:username
 */
const getUserDetails = async (req, res) => {
  try {
    const { username } = req.params;
    const userResponse = await axios.get(`${GITHUB_API_URL}`
      +`/users/${username}`);
    const reposResponse = await axios.get(`${GITHUB_API_URL}`
      +`/users/${username}/repos?per_page=5&sort=updated`);

    res.json({ user: userResponse.data, repos: reposResponse.data });
  } catch (error) {
    console.error("Error fetching GitHub user:", error.message);
    res.status(500).json({ error: "Error fetching user data" });
  }
};

/**
 * Get GitHub repository details and last 5 commits
 * @route GET /api/github/repo/:username/:repo
 */
const getRepoDetails = async (req, res) => {
  try {
    const { username, repo } = req.params;
    const repoResponse = await axios.get(`${GITHUB_API_URL}`
      +`/repos/${username}/${repo}`);
    const commitsResponse = await axios.get(`${GITHUB_API_URL}`
      +`/repos/${username}/${repo}/commits?per_page=5`);

    res.json({ repo: repoResponse.data, commits: commitsResponse.data });
  } catch (error) {
    console.error("Error fetching GitHub repo:", error.message);
    res.status(500).json({ error: "Error fetching repository data" });
  }
};

module.exports = { searchUsers, getUserDetails, getRepoDetails }; // E
