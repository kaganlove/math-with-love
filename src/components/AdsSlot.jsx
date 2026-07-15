import React, { useEffect } from "react";

/**
 * AdsSlot Component
 * Renders an AdSense container or an affiliate placeholder.
 * 
 * Props:
 * - format: 'horizontal' | 'vertical' | 'rectangle'
 * - adSlotId: Google AdSense Slot ID (optional)
 * - publisherId: Google AdSense Publisher ID (optional, e.g. "ca-pub-XXXXXXXXXXXXXXXX")
 * - fallbackText: Custom text to display on the affiliate placeholder
 */
export default function AdsSlot({ 
  format = "horizontal", 
  adSlotId = "", 
  publisherId = "", 
  fallbackText = "Looking for premium math tutoring? Book a 1-on-1 session with Kagan Love today!" 
}) {
  const isProd = process.env.NODE_ENV === "production";
  const hasAdSense = adSlotId && publisherId;

  useEffect(() => {
    if (hasAdSense && isProd) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense script load error:", e);
      }
    }
  }, [hasAdSense, isProd]);

  // Determine size classes
  const formatClasses = {
    horizontal: "ad-slot-horizontal",
    vertical: "ad-slot-vertical",
    rectangle: "ad-slot-rectangle"
  };

  const selectedClass = formatClasses[format] || formatClasses.horizontal;

  return (
    <div className={`ad-slot-container ${selectedClass}`}>
      {hasAdSense && isProd ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={publisherId}
          data-ad-slot={adSlotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        // Premium Fallback Affiliate Banner
        <div className="ad-placeholder-content">
          <span className="ad-badge">SPONSORED / PARTNER RESOURCE</span>
          <div className="ad-placeholder-body">
            <p className="ad-placeholder-text">{fallbackText}</p>
            <a href="/tutoring" className="ad-placeholder-btn">Learn More</a>
          </div>
        </div>
      )}
    </div>
  );
}
