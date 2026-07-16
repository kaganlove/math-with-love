import React from "react";
import { Link } from "react-router-dom";
import { Award, BookOpen, Users, ArrowRight, Heart } from "lucide-react";
import AdsSlot from "../components/AdsSlot";

export default function Home() {
  return (
    <div className="home-container animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-tagline">Math Tutoring & Free Resources</span>
          <h1 className="hero-title">
            Math help that <span className="text-gradient">actually helps.</span>
          </h1>
          <p className="hero-desc">
            Whether your student is struggling, aiming to excel, or preparing for high-stakes exams, we build real confidence, master core concepts, and make math finally make sense.
          </p>
          <div className="hero-cta-group">
            <Link to="/tutoring" className="btn-primary">
              Tutoring Services <ArrowRight size={18} />
            </Link>
            <Link to="/curriculum" className="btn-secondary">
              Browse Free Lessons
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper bg-indigo">
              <Award className="stat-icon text-indigo" />
            </div>
            <h3 className="stat-number">BS & M.Ed</h3>
            <p className="stat-label">Math/Physics & Educational Technology</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper bg-rose">
              <Heart className="stat-icon text-rose animate-pulse" />
            </div>
            <h3 className="stat-number">1-on-1 Focus</h3>
            <p className="stat-label">Tailored learning matching student needs</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon-wrapper bg-amber">
              <BookOpen className="stat-icon text-amber" />
            </div>
            <h3 className="stat-number">K-College</h3>
            <p className="stat-label">Curriculum spanning all math levels</p>
          </div>
        </div>
      </section>

      {/* Ad/Affiliate Slot */}
      <div className="content-width">
        <AdsSlot format="horizontal" fallbackText="Join Kagan Love for private, custom math lessons online. In-person tutoring is available in the DFW area by request." />
      </div>

      {/* Core Method/Mission Section */}
      <section className="method-section">
        <div className="section-header">
          <h2 className="section-title">The Math with Love Method</h2>
          <p className="section-subtitle">We believe math should be a tool of empowerment, not a source of anxiety.</p>
        </div>

        <div className="method-grid">
          <div className="method-card">
            <div className="method-number">01</div>
            <h3 className="method-title">Confidence is the Goal</h3>
            <p className="method-text">
              Confidence changes everything. We work side-by-side with students to grow in skill and self-belief. Every session builds trust and clarity, transforming fear into capability.
            </p>
          </div>

          <div className="method-card">
            <div className="method-number">02</div>
            <h3 className="method-title">Mastery Through Method</h3>
            <p className="method-text">
              We go beyond blind memorization of formulas to help students understand the "why" behind every step. Teaching math as an understandable system forms a mental foundation that lasts.
            </p>
          </div>

          <div className="method-card">
            <div className="method-number">03</div>
            <h3 className="method-title">Focused Test Prep</h3>
            <p className="method-text">
              Test prep is about strategy, pacing, and specific problem-solving models. We prepare students for the ACT, SAT, STAAR, and college placement tests to build calm, prepared performers.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Kagan Section */}
      <section className="meet-tutor-section">
        <div className="meet-tutor-grid">
          <div className="meet-tutor-image-placeholder">
            <img src="/images/kagan-board.jpg" alt="Kagan Love solving math problems on a board" />
          </div>
          <div className="meet-tutor-info">
            <span className="info-tag">Your Tutor</span>
            <h2 className="info-title">Hi, I'm Kagan Love</h2>
            <p className="info-text">
              I am a math tutor and instructional designer with a background in Mathematics and Physics and a Master's degree in Educational Technology. I've taught in classrooms (grades 6-12) and served as Center Director for Mathnasium.
            </p>
            <p className="info-text">
              I started Math With Love to offer personal, one-on-one and small group tutoring that is clear, encouraging, and effective. My goal is to teach students how to think, stay focused, and feel genuinely confident.
            </p>
            <Link to="/tutoring" className="btn-primary mt-4">
              More About My Method & Experience
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="cta-banner">
        <div className="cta-banner-content">
          <h2 className="cta-title">Ready to build your math confidence?</h2>
          <p className="cta-desc">
            Schedule a group or one-on-one session. Let's make math make sense together.
          </p>
          <div className="cta-btn-group">
            <Link to="/contact" className="btn-white">
              Book a Session Now
            </Link>
            <Link to="/curriculum" className="btn-outline-white">
              Explore Free Lessons
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
