import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NotesPage from './pages/NotesPage';
import EditNotePage from './pages/EditNotePage';
import AddNotePage from './pages/AddNotePage';
import 'react-quill/dist/quill.snow.css';
import './styles/quill.css';
import './styles/global.css';

export default function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={<NotesPage />} />
        <Route path="/add" element={<AddNotePage />} />
        <Route path="/edit/:id" element={<EditNotePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
