import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// App-wide styles
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} SmartRecipe - Created by Tianze Yin & Xinghang Tong</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;