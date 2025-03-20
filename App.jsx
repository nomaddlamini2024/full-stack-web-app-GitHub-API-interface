import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import UserPage from './pages/UserPage';
import RepoPage from './pages/RepoPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/user/:username" element={<UserPage />} />
            <Route path="/repo/:username/:repo" element={<RepoPage />} />
        </Routes>
    );
}

export default App;
