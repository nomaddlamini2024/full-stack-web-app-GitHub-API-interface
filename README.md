# GitHub Explorer

This project is a **GitHub Explorer** application that allows users to 
search for GitHub profiles, view user details, and explore repositories 
with commits.

## Project Structure

This project consists of two main components:

1. **Frontend (React + Vite)**
2. **Backend (Express.js + GitHub API Integration)**

## Features

- Search for GitHub users
- View user details (name, bio, profile picture, repositories)
- Explore a repository and view the latest commits
- Navigate between different pages using React Router

---

## 🚀 Frontend Setup (React + Vite)

### Prerequisites

- [Node.js](https://nodejs.org/) installed

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/github-explorer.git
   cd github-explorer/react-frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm start
   ```

4. Open `http://localhost:5173` in your browser.

---

## 🛠 Backend Setup (Express.js)

### Prerequisites

- [Node.js](https://nodejs.org/) installed

### Installation

1. Navigate to the backend directory:

   ```sh
   cd github-explorer/backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the backend server:

   ```sh
   npm start
   ```

4. The API will be running at `http://localhost:5001/api/github`.

---

## 📁 Folder Structure

```
github-explorer/
│── backend/                 # Node.js + Express Backend
│   ├── routes/              # API routes
│   ├── server.js            # Entry point for backend
│   └── package.json         # Backend dependencies
│
│── react-frontend/          # Frontend React app
│   ├── src/                 # Source files
│   ├── public/              # Static files
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
│
└── README.md                # Project Documentation
```

---

## 🔗 API Endpoints

### 🔍 Search for users
```http
GET /api/github/search?query=username
```

### 👤 Get user details
```http
GET /api/github/user/:username
```

### 📂 Get repository details
```http
GET /api/github/repo/:username/:repo
```

---

## 🛠 Technologies Used

- **Frontend:** React, React Router, Axios, Bootstrap, Vite
- **Backend:** Node.js, Express.js, Axios (GitHub API Integration)
- **Testing:** Jest, React Testing Library

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

- **Nomalungelo Dlamini** - [GitHub Profile](https://github.com/nomaddlamini2024)

For any issues or contributions, feel free to open a pull request or raise 
an issue! 🚀
