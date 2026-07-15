import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="legal-page animate-fade-in">
      <div className="content-width max-w-3xl">
        <h1 className="page-title">Privacy Policy</h1>
        <p className="text-muted text-sm">Last Updated: July 15, 2026</p>
        
        <div className="legal-content mt-8">
          <section className="legal-section">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you voluntarily provide to us when you fill out forms on our website (such as booking inquiries or custom resource requests). This may include your name, email address, student grade level, and any messages or files you send to us.
            </p>
          </section>

          <section className="legal-section mt-6">
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the collected information solely to respond to your tutoring inquiries, coordinate tutoring schedules, and deliver educational worksheets. We do not sell, rent, or trade your personal information to third parties.
            </p>
          </section>

          <section className="legal-section mt-6">
            <h2>3. Google AdSense & Analytics</h2>
            <p>
              We may display advertisements provided by Google AdSense on our site. Google uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google's Ads Settings.
            </p>
          </section>

          <section className="legal-section mt-6">
            <h2>4. Security of Your Information</h2>
            <p>
              We take the security of your data seriously. Our interactive online classroom utilizes Jitsi Meet, which provides fully encrypted, peer-to-peer audio and video calls. We do not store recordings or video call data on our servers.
            </p>
          </section>

          <section className="legal-section mt-6">
            <h2>5. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy, please contact us at <a href="mailto:mathwlove@gmail.com">mathwlove@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
