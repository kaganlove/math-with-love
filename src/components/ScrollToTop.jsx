import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * Listens to location changes in React Router and resets window scroll to (0,0).
 */
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (typeof window.gtag === "function") {
      window.gtag("config", "G-ET63RPZBG8", {
        page_path: pathname + search
      });
    }
  }, [pathname, search]);

  return null;
}
