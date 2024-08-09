import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './pages/Home';
import Partner from './pages/Partner';
import Portrait from './pages/Portrait';
import Gallerie from './pages/Gallerie';
import Agenda from './pages/Agenda';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/portrait" element={<Portrait />} />
            <Route path="/gallerie" element={<Gallerie />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
  