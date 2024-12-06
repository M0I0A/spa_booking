import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Modify from './components/Modify';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/modify" element={<Modify />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
