import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Nav from './components/nav';
import Fetcher from './components/Fetcher'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Nav /> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/fetcher" element={<Fetcher />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
