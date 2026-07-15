import React from "react";

export default function RefundPolicy() {
  return (
    <div className="legal-page animate-fade-in">
      <div className="content-width max-w-3xl">
        <h1 className="page-title">Refund Policy</h1>
        <p className="text-muted text-sm">Last Updated: July 15, 2026</p>
        
        <div className="legal-content mt-8">
          <section className="legal-section">
            <h2>1. Tutoring Cancellation Policy</h2>
            <p>
              We understand that schedules change. To respect the tutor's time and waitlisted students, we require at least **24 hours' notice** for cancellation or rescheduling of private tutoring sessions. 
            </p>
            <p className="mt-2">
              Sessions canceled with less than 24 hours' notice may be billed at the full rate, or subject to a late cancellation fee.
            </p>
          </section>

          <section className="legal-section mt-6">
            <h2>2. Refunds for Completed Sessions</h2>
            <p>
              We pride ourselves on delivery of high-quality, customized instruction. Refunds are not issued for tutoring sessions that have already been conducted. If you or your student are dissatisfied with a session, please reach out to us within 24 hours so we can discuss adjustments and plan future sessions.
            </p>
          </section>

          <section className="legal-section mt-6">
            <h2>3. Group Sessions Refunds</h2>
            <p>
              Group sessions are scheduled collectively. If one participant is unable to attend, the session will still proceed for other members, and no refund or partial credit will be issued. If the entire group cancels with more than 24 hours' notice, we will coordinate a make-up date.
            </p>
          </section>

          <section className="legal-section mt-6">
            <h2>4. Technical Difficulties</h2>
            <p>
              For online sessions, if connection issues arise on our platform or due to the tutor's internet provider that prevent a successful session, we will reschedule the session free of charge, or issue a full refund for that specific hour.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
