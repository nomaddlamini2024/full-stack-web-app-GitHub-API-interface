import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function RepoPage() {
  // Extracting `username` and `repo` parameters from the URL
  const { username, repo } = useParams();
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch repository data from the backend API when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/github/repo/${username}/${repo}`)
      .then((response) => {
        setRepoData(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [username, repo]);

  // Show a loading spinner while fetching data
  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h2 className="card-title">{repoData.repo.name}</h2>
          <p className="text-muted">{repoData.repo.description}</p>

          {/* List the last 5 commits */}
          <h3 className="h5 mt-4">Last 5 Commits:</h3>
          <ul className="list-group">
            {repoData.commits.map((commit) => (
              <li key={commit.sha} className="list-group-item">
                {commit.commit.message}
              </li>
            ))}
          </ul>

          {/* Buttons for navigation */}
          <div className="d-flex justify-content-between mt-3">
            <a
              href={repoData.repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success"
            >
              View on GitHub
            </a>
            <Link to="/" className="btn btn-secondary">
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepoPage;
