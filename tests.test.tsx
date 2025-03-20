import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import SearchPage from "../src/pages/SearchPage";
import UserPage from "../src/pages/UserPage";
import RepoPage from "../src/pages/RepoPage";
import App from "../src/App";

jest.mock("axios");

describe("SearchPage", () => {
  test("renders search input and button", () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText("Enter GitHub username...")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  test("performs search and displays results", async () => {
    axios.get.mockResolvedValue({
      data: { items: [{ id: 1, login: "testuser", avatar_url: "test.jpg", html_url: "https://github.com/testuser" }] }
    });

    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter GitHub username..."), {
      target: { value: "testuser" },
    });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => expect(screen.getByText("testuser")).toBeInTheDocument());
  });
});

describe("UserPage", () => {
  test("fetches and displays user data", async () => {
    axios.get.mockResolvedValue({
      data: {
        user: { name: "Test User", avatar_url: "test.jpg", bio: "Test bio", html_url: "https://github.com/testuser" },
        repos: [{ id: 1, name: "test-repo" }]
      }
    });

    render(
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText("Test User")).toBeInTheDocument());
    expect(screen.getByText("Test bio")).toBeInTheDocument();
  });
});

describe("RepoPage", () => {
  test("fetches and displays repository data", async () => {
    axios.get.mockResolvedValue({
      data: {
        repo: { name: "Test Repo", description: "Test description", html_url: "https://github.com/test-repo" },
        commits: [{ sha: "abc123", commit: { message: "Initial commit" } }]
      }
    });

    render(
      <BrowserRouter>
        <RepoPage />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText("Test Repo")).toBeInTheDocument());
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("Initial commit")).toBeInTheDocument();
  });
});