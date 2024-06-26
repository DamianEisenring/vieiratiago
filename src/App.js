import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Partner from './pages/Partner';
import Portrait from './pages/Portrait';
import Gallerie from './pages/Gallerie';
import Berichte from './pages/Berichte';
import Agenda from './pages/Agenda';

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
            <Route path="/berichte" element={<Berichte />} />
            <Route path="/agenda" element={<Agenda />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
