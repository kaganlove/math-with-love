import React from "react";
import { Link } from "react-router-dom";
import { Check, Mail, Calendar, HelpCircle, Award, BookOpen, Clock, Globe } from "lucide-react";
import AdsSlot from "../components/AdsSlot";

export default function PrivateTutoring() {
  const services = [
    {
      title: "One-on-One Tutoring",
      price: "$100",
      period: "per hour",
      subtitle: "Personalized, targeted 1-on-1 instruction",
      description: "Ideal for students needing dedicated help catching up, mastering difficult subjects, preparing for exams, or building foundational math skills.",
      features: [
        "100% personalized learning pace",
        "Targeted homework help & test review",
        "Custom worksheet creation for practice",
        "Direct access to interactive online whiteboard",
        "Progress tracking shared with parents",
        "Flexible scheduling options"
      ],
      btnText: "Book 1-on-1 Session",
      popular: true
    },
    {
      title: "Group Session",
      price: "$160",
      period: "per session",
      subtitle: "Collaborative, small-group instruction",
      description: "Great for friends, siblings, or classmates studying the same topic who benefit from collaborative learning and shared problem-solving.",
      features: [
        "Small group (typically 2-4 students)",
        "Collaborative problem-solving worksheets",
        "ACT/SAT prep study groups",
        "Interactive math reviews & STAAR prep",
        "Cost-effective per-student pricing",
        "Scheduled around the group's availability"
      ],
      btnText: "Book Group Session",
      popular: false
    }
  ];

  const timeline = [
    {
      date: "2022 - 2023",
      degree: "Master of Education (M.Ed.)",
      field: "Educational Technology — Southeastern Oklahoma State University",
      desc: "Intensive graduate studies focused on online pedagogy, hybrid instruction, e-learning environments, instructional design, and digital assessment tools."
    },
    {
      date: "2008 - 2013",
      degree: "Bachelor of Science (B.S.)",
      field: "Mathematics & Physics Dual-Major",
      desc: "Completed theoretical and applied calculus, linear algebra, physics, electromagnetism, and classical mechanics. Began professional tutoring."
    }
  ];

  const experience = [
    {
      role: "Instructional Designer",
      org: "Texas State Technical College",
      desc: "Develop interactive course materials, alignment frameworks, and digital modules. Specialize in designing clear instructional paths for technical curricula."
    },
    {
      role: "Math Teacher (Grades 6-12)",
      org: "Christ Academy",
      desc: "Delivered curriculum across middle and high school math subjects. Tailored teaching for varied learning styles and managed hybrid math classrooms."
    },
    {
      role: "Center Director & Lead Instructor",
      org: "Mathnasium (Wichita Falls)",
      desc: "Trained tutors, conducted diagnostic assessments, created learning plans, and provided direct instruction using math visualization techniques."
    },
    {
      role: "Director of Training / Lead Instructor",
      org: "Mathnasium Centers (Chicago Area)",
      desc: "Mentored incoming tutors, verified instructional consistency, and taught individual and small-group lessons to students of all levels."
    },
    {
      role: "Lead Math Tutor",
      org: "Sylvan Learning Center / Private Clients",
      desc: "Provided tailored lessons in developmental math, geometry, algebra, and pre-calculus for private clients and learning center programs."
    }
  ];

  return (
    <div className="tutoring-page-container animate-fade-in">
      <div className="content-width">
        {/* Hero Section */}
        <section className="tutoring-hero text-center">
          <h1 className="page-title">Expert Private Math Tutoring</h1>
          <p className="page-desc">
            Building confidence and mathematical mastery through personalized instruction. Tutoring occurs online nationwide through our interactive Online Classroom. In-person tutoring requests can be made for the Dallas-Fort Worth (DFW) area—please inquire for pricing adjustments due to travel times.
          </p>
        </section>

        {/* Services / Pricing Grid */}
        <section className="pricing-section">
          <div className="pricing-grid">
            {services.map((svc, idx) => (
              <div key={idx} className={`pricing-card ${svc.popular ? "popular-card" : ""}`}>
                {svc.popular && <span className="popular-badge">Most Popular</span>}
                <h3 className="card-title">{svc.title}</h3>
                <div className="price-container">
                  <span className="price-amount">{svc.price}</span>
                  <span className="price-period">/{svc.period}</span>
                </div>
                <p className="card-subtitle">{svc.subtitle}</p>
                <p className="card-desc">{svc.description}</p>
                
                <div className="features-divider" />
                
                <ul className="features-list">
                  {svc.features.map((feat, fIdx) => (
                    <li key={fIdx} className="feature-item">
                      <Check className="feature-check" size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/contact" 
                  className={`btn-block text-center mt-6 ${svc.popular ? "btn-primary" : "btn-secondary"}`}
                >
                  {svc.btnText}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Ad slot */}
        <div className="my-8">
          <AdsSlot format="horizontal" fallbackText="Free online classroom integration included with every private session. Meet and draw on the virtual board together!" />
        </div>

        {/* Experience & Credentials */}
        <section className="bio-section">
          <div className="bio-grid">
            {/* Left Column: Story */}
            <div className="bio-story-card">
              <div className="bio-header-wrapper">
                <img src="/images/kagan-headshot.jpg" alt="Kagan Love" className="bio-headshot-img" />
                <div>
                  <h2 className="section-title">Meet Your Instructor: Kagan Love</h2>
                  <p className="story-tagline">Math Tutor & Educational Technologist</p>
                </div>
              </div>
              <p className="story-paragraph">
                With a BS in Mathematics/Physics and a Master of Education in Educational Technology, I bridge the gap between academic rigor and modern digital learning. I believe every student can succeed when math is explained in a way that matches their unique thought process.
              </p>
              <p className="story-paragraph">
                My teaching journey ranges from one-on-one sessions in learning centers to leading school classrooms for grades 6 through 12. Today, I work full-time as an Instructional Designer at Texas State Technical College while continuing to share my passion for math through private tutoring.
              </p>

              <h3 className="sub-section-title mt-8">Educational Credentials</h3>
              <div className="credentials-timeline">
                {timeline.map((item, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-marker" />
                    <span className="timeline-date">{item.date}</span>
                    <h4 className="timeline-title">{item.degree}</h4>
                    <p className="timeline-field">{item.field}</p>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Work History */}
            <div className="work-experience-card">
              <h2 className="section-title">Professional Background</h2>
              <p className="section-subtitle">Over a decade of teaching, leading, and design experience.</p>
              
              <div className="experience-list">
                {experience.map((exp, idx) => (
                  <div key={idx} className="experience-item">
                    <div className="experience-header">
                      <h4 className="experience-role">{exp.role}</h4>
                      <span className="experience-org">{exp.org}</span>
                    </div>
                    <p className="experience-desc">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works (Online Meeting Pitch) */}
        <section className="how-it-works-section">
          <div className="section-header text-center">
            <h2 className="section-title">How Online Tutoring Works</h2>
            <p className="section-subtitle">A seamless, interactive experience directly inside your browser.</p>
          </div>

          <div className="steps-row">
            <div className="step-col">
              <div className="step-num">1</div>
              <h4>Schedule & Connect</h4>
              <p>Book a time slot. We will send you a unique meeting link. When it's time, just click the link to enter our custom whiteboard classroom.</p>
            </div>
            <div className="step-col">
              <div className="step-num">2</div>
              <h4>Face-to-Face & Chat</h4>
              <p>The classroom includes fully encrypted live audio and video via Jitsi Meet. No software installs are required on your computer or mobile device.</p>
            </div>
            <div className="step-col">
              <div className="step-num">3</div>
              <h4>Collaborative Solving</h4>
              <p>Work out algebra, calculus, or prep problems on our side-by-side drawing whiteboard. Draw, erase, and save the notes directly to study later.</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/classroom" className="btn-primary">
              Preview the Online Classroom
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
