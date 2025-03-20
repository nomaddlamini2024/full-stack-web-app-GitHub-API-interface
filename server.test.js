// Importing required modules
const chai = require("chai"); // Chai assertion library
const request = require("request"); // Used to make HTTP requests
const app = require("../server"); // Importing the Express server

const { expect } = chai; // Extracting expect assertion from Chai

// Test suite for GitHub API Routes
describe("GitHub API Routes", () => {
  // Test case: Search users on GitHub API
  it("Should return search results from GitHub API", function (done) {
    this.timeout(5000); // Increasing timeout to prevent request failures

    // Make a GET request to the search endpoint
    request.get("http://localhost:5001/api/github/search?query=octocat", 
      (error, response, body) => {
      // Expect a successful response
      expect(response.statusCode).to.equal(200); 
      const data = JSON.parse(body); // Parse JSON response
      // Expect search results to be an array
      expect(data.items).to.be.an("array"); 
      // Marking test as complete
      done(); 
    });
  });

  // Test case: Fetch details of a GitHub user
  it("Should return user details", function (done) {
    this.timeout(5000);

    // Make a GET request to fetch user details
    request.get("http://localhost:5001/api/github/user/octocat", 
      (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      const data = JSON.parse(body);
      expect(data).to.have.property("user"); // Ensure "user" object exists
      expect(data).to.have.property("repos"); // Ensure "repos" list exists
      done();
    });
  });

  // Test case: Return error when fetching an invalid user
  it("Should return 500 error for invalid user", function (done) {
    this.timeout(5000);

    // Make a GET request for a non-existent user
    request.get("http://localhost:5001/api/github/user/invaliduser123456", 
      (error, response, body) => {
      // Expect internal server error
      expect(response.statusCode).to.equal(500); 
      done();
    });
  });
});
