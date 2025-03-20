import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function UserPage() {
  const { username } = useParams(); // Get the username from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from the backend
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/github/user/${username}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [username]);

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
      <div className="card mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body text-center">
          {/* User Avatar */}
          <img
            src={user.user.avatar_url}
            alt={user.user.name}
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px" }}
          />
          <h2 className="card-title">{user.user.name}</h2>
          <p className="text-muted">{user.user.bio}</p>

          {/* External GitHub Profile Link */}
          <a
            href={user.user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success mb-3"
          >
            View on GitHub
          </a>

          {/* User Repositories List */}
          <h3 className="h5">Repositories</h3>
          <ul className="list-group">
            {user.repos.map((repo) => (
              <li key={repo.id} className="list-group-item d-flex justify-content-between align-items-center">
                <Link to={`/repo/${username}/${repo.name}`} className="text-decoration-none text-primary fw-bold">
                  {repo.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/" className="btn btn-secondary mt-3">
            Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
