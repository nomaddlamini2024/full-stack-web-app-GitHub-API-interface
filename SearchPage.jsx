import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchPage() {
  const [query, setQuery] = useState(""); // Search query state
  const [results, setResults] = useState([]); // Search results state
  const [loading, setLoading] = useState(false); // Loading state

  // Handle search operation
  const handleSearch = async () => {
    if (!query) return; // Prevent empty search
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5001/api/github/search?query=${query}`
      );
      setResults(response.data.items); // Store search results
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Hide loader after fetching data
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">🔍 Search GitHub Users</h1>

      {/* Search Input */}
      <div className="input-group mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control"
          placeholder="Enter GitHub username..."
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center mb-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Search Results */}
      <ul className="list-group">
        {results.map((user) => (
          <li key={user.id} className="list-group-item d-flex align-items-center justify-content-between">
            
            {/* GitHub Avatar */}
            <img
              src={user.avatar_url}
              alt={user.login}
              className="rounded-circle me-3"
              style={{ width: "30px", height: "30px" }}
            />

            {/* Internal link to user details */}
            <div className="flex-grow-1">
              <Link to={`/user/${user.login}`} className="text-decoration-none text-primary fw-bold">
                {user.login}
              </Link>
            </div>

            {/* External GitHub link */}
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success btn-sm"
            >
              View on GitHub
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
