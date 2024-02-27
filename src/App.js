import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Forbidden from "./Pages/Forbidden";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdvancedResearch from "./Pages/AdvancedResearch";
import BookDetails from "./Pages/BookDetails";
import About from "./Pages/About";
import './css/App.css';
import QuickSearch from "./Pages/QuickSearch";
import Admin from "./Pages/Admin";

function App() {
    return (
        <div className="content">
            <Router>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/advanced-search" element={<AdvancedResearch />} />
                    <Route exact path='/quick-search/:query' element={<QuickSearch />} />
                    <Route exact path="/books/:title" element={<BookDetails />} />
                    <Route exact path="/about" element={<About />} />
                    <Route exact path="/admin" element={<Admin />} />
                    <Route path="/forbidden" element={<Forbidden />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
