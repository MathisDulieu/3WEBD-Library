import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Forbidden from "./Pages/Forbidden";
import './css/App.css';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Books from "./Pages/Books";

function App() {
  return (
      <div className="content">
        <Header />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/books" element={<Books />} />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Footer />
      </div>
  );
}

export default App;
