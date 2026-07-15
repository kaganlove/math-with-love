import React from "react";

export default function TermsOfService() {
  return (
    <div className="legal-page animate-fade-in">
      <div className="content-width max-w-3xl">
        <h1 className="page-title">Terms of Service</h1>
        <p className="text-muted text-sm">Last Updated: July 15, 2026</p>
        
        <div className="legal-content mt-8">
          <section className="legal-section">
            <h2>1. Terms of Use</h2>
            <p>
              By accessing and using this website, you agree to comply with and be bound by these Terms of Service. If you do not agree, you should not access or use the resources provided on this platform.
            </p>
          </section>

          <section className="legal-section mt-6">
            <h2>2. Free Resources & Copyright</h2>
            <p>
              All lesson notes, study guides, and worksheets hosted on this site are free for students and teachers to download and print for educational, non-commercial use. You may not sell, redistribute, or re-host our resources on other public web portals without written consent.
            </p>
          </section>

          <section className="legal-section mt-6">
            <h2>3. Tutoring Code of Conduct</h2>
            <p>
              Students and tutors are expected to treat each other with respect during all sessions. We reserve the right to refuse service or terminate online sessions immediately in the case of abusive, disruptive, or inappropriate behavior.
            </p>
          </section>

          <section className="legal-section mt-6">
            <h2>4. Third-Party Links & Tools</h2>
            <p>
              Our platform embeds external tools (such as Jitsi Meet for video calls). We do not control and are not responsible for the availability, security, or functionality of these third-party platforms.
            </p>
          </section>

          <section className="legal-section mt-6">
            <h2>5. Disclaimer of Warranties</h2>
            <p>
              Educational resources are provided "as is" without warranties of any kind. While we aim to provide accurate and helpful mathematical content, we do not guarantee specific academic results, test scores, or grades.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
