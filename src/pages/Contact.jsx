import React, { useState } from "react";
import { Mail, MapPin, Send, HelpCircle, PhoneCall } from "lucide-react";
import AdsSlot from "../components/AdsSlot";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    level: "High School Math",
    type: "One-on-One Tutoring",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link contents
    const subject = encodeURIComponent(`Math Tutoring Request: ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Kagan,\n\nI would like to request a tutoring session.\n\n` +
      `Details:\n` +
      `- Student/Parent Name: ${formData.name}\n` +
      `- Contact Email: ${formData.email}\n` +
      `- Math Level: ${formData.level}\n` +
      `- Session Type: ${formData.type}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `Thank you!\n`
    );

    // Open email client
    window.location.href = `mailto:mathwlove@gmail.com?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Tutoring request prepared in your email client! Please send the email to mathwlove@gmail.com.");
    }, 500);
  };

  const faqs = [
    {
      q: "What levels of mathematics do you tutor?",
      a: "We tutor all levels from early elementary school (K-5) through middle school (6-8), high school (Algebra 1/2, Geometry, Pre-Calc, Calculus), and early college math (Calculus I/II, Linear Algebra, and Intro Statistics), plus focused test prep (ACT, SAT, STAAR)."
    },
    {
      q: "Do you offer in-person or online sessions?",
      a: "Most tutoring sessions occur online through our interactive fullscreen Online Classroom. However, requests can be made for in-person tutoring in the Dallas-Fort Worth (DFW) area. Please inquire directly for in-person pricing, as rates may vary based on travel times."
    },
    {
      q: "How do I connect to an online tutoring session?",
      a: "When you book an online session, we will send you a unique classroom URL. Just go to mathwlove.com/classroom, enter the room code provided, and click 'Start Video Call.' No software installs are required."
    },
    {
      q: "What is your refund and cancellation policy?",
      a: "We ask for a 24-hour notice for cancellations. Sessions canceled with less than 24 hours' notice may be subject to a cancellation fee. Refunds are evaluated on a case-by-case basis."
    }
  ];

  return (
    <div className="contact-page animate-fade-in">
      <div className="content-width">
        <section className="contact-header text-center">
          <h1 className="page-title">Book a Session & Get In Touch</h1>
          <p className="page-desc">
            Have questions or want to schedule a group or 1-on-1 tutoring session? Fill out the form below or email us directly.
          </p>
        </section>

        {/* Outer Split Layout */}
        <div className="contact-grid">
          {/* Left Column: Form */}
          <div className="contact-form-card">
            <h3 className="card-title">Tutoring Inquiry Form</h3>
            <p className="card-subtitle">Submitting opens your email client pre-filled with details.</p>
            
            <form onSubmit={handleSubmit} className="contact-form mt-4">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Parent or Student Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="form-input-field"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="form-input-field"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="level" className="form-label">Math Subject/Level</label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="form-select-field"
                  >
                    <option value="Elementary School (K-5)">Elementary School (K-5)</option>
                    <option value="Middle School (6-8)">Middle School (6-8)</option>
                    <option value="High School Math">High School Math</option>
                    <option value="Early College Math">Early College Math</option>
                    <option value="ACT/SAT Test Prep">ACT/SAT Test Prep</option>
                    <option value="Other Math Help">Other Math Help</option>
                  </select>
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="type" className="form-label">Session Interest</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="form-select-field"
                  >
                    <option value="One-on-One Tutoring">One-on-One ($100/hr)</option>
                    <option value="Group Session">Group Session ($160)</option>
                    <option value="General Inquiry">General Question</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message / Student Needs</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about what concepts the student is struggling with, goals, or schedule preferences..."
                  className="form-textarea-field"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex-center gap-2 mt-4"
              >
                <Send size={18} /> {isSubmitting ? "Opening Email..." : "Send Request via Email"}
              </button>
            </form>
          </div>

          {/* Right Column: Contact info & FAQs */}
          <div className="contact-info-column">
            {/* Quick Contact Card */}
            <div className="info-card">
              <h3 className="card-title">Direct Contact</h3>
              
              <div className="contact-details mt-4">
                <a href="mailto:mathwlove@gmail.com" className="detail-item">
                  <div className="icon-badge">
                    <Mail size={18} />
                  </div>
                  <div className="detail-text">
                    <span className="detail-label">Email Address</span>
                    <span className="detail-value">mathwlove@gmail.com</span>
                  </div>
                </a>

                <div className="detail-item">
                  <div className="icon-badge">
                    <MapPin size={18} />
                  </div>
                  <div className="detail-text">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">Dallas-Fort Worth, TX, USA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ads Slot */}
            <AdsSlot format="rectangle" fallbackText="Free worksheets and cheatsheets for Algebra, Calculus, and test prep available on our Resources page!" />

            {/* FAQs */}
            <div className="faqs-card mt-6">
              <h3 className="card-title flex-center gap-1">
                <HelpCircle size={20} className="text-indigo" /> Frequently Asked Questions
              </h3>
              
              <div className="faqs-list mt-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="faq-item">
                    <h4 className="faq-question">{faq.q}</h4>
                    <p className="faq-answer">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
