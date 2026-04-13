import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LaunchDetail from './pages/LaunchDetail';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/launch/:id" element={<LaunchDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
