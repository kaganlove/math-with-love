import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * Listens to location changes in React Router, resets window scroll to (0,0),
 * and reports SPA route navigations to Google Analytics 4.
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname + search,
        page_location: window.location.href,
        page_title: document.title
      });
    }
  }, [pathname, search]);

  return null;
}
