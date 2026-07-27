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
          <span className="hero-tagline">Private Math Tutoring with Kagan Love | North Dallas & Online</span>
          <h1 className="hero-title">
            Math finally <span className="text-gradient">makes sense.</span>
          </h1>
          <p className="hero-desc">
            One-to-one math tutoring with an experienced mathematics educator helping middle school, high school, and college students build skills, confidence, and independence.
          </p>
          <div className="hero-cta-group">
            <Link to="/tutoring" className="btn-primary">
              Tutoring Services & Pricing <ArrowRight size={18} />
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
          <h2 className="section-title">The Math with Love Difference</h2>
          <p className="section-subtitle">Dedicated, expert tutoring designed to build skill and long-term academic independence.</p>
        </div>

        <div className="method-grid">
          <div className="method-card">
            <div className="method-number">01</div>
            <h3 className="method-title">One Consistent Expert</h3>
            <p className="method-text">
              Students work directly with a senior math educator and instructional designer from the very first session. No rotating learning center staff, group distractions, or matched-tutor uncertainty.
            </p>
          </div>

          <div className="method-card">
            <div className="method-number">02</div>
            <h3 className="method-title">Explanation Over Memorization</h3>
            <p className="method-text">
              We focus on the conceptual logic behind math formulas. By understanding the "why," students learn to recognize mathematical patterns and discover the simplest correct way to solve any problem.
            </p>
          </div>

          <div className="method-card">
            <div className="method-number">03</div>
            <h3 className="method-title">Independence is the Goal</h3>
            <p className="method-text">
              Tutoring should not be a permanent crutch. We identify the foundational gaps causing struggle so students build self-reliance, raise their grades, and require less tutoring over time.
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
