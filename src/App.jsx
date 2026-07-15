import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Curriculum from "./pages/Curriculum";
import PrivateTutoring from "./pages/PrivateTutoring";
import OnlineClassroom from "./pages/OnlineClassroom";
import SessionRoom from "./pages/SessionRoom";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";

function AppContent() {
  const location = useLocation();
  
  // Hide site header and footer on the live session room page
  const isSessionRoom = location.pathname.startsWith("/session");

  return (
    <div className={isSessionRoom ? "session-shell" : "app-shell"}>
      {!isSessionRoom && <Navigation />}
      <main className={isSessionRoom ? "session-main" : "main-content"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/tutoring" element={<PrivateTutoring />} />
          <Route path="/classroom" element={<OnlineClassroom />} />
          <Route path="/session" element={<SessionRoom />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/refunds" element={<RefundPolicy />} />
        </Routes>
      </main>
      {!isSessionRoom && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
