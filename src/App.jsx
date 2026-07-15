import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Curriculum from "./pages/Curriculum";
import PrivateTutoring from "./pages/PrivateTutoring";
import OnlineClassroom from "./pages/OnlineClassroom";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/tutoring" element={<PrivateTutoring />} />
            <Route path="/classroom" element={<OnlineClassroom />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
