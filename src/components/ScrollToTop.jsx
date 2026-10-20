import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ROUTE_SEO = {
  "/": {
    title: "Math with Love | North Dallas & Online Math Tutoring (Plano, Frisco, McKinney)",
    description:
      "One-on-one math tutoring in North Dallas, Plano, Frisco, McKinney, Allen, Richardson, and online with Kagan Love (B.S. Mathematics, M.Ed. Curriculum & Instruction)."
  },
  "/tutoring": {
    title: "1-on-1 Math Tutoring in North Dallas & Online | Math with Love",
    description:
      "Book private 1-on-1 math tutoring for Algebra 1 & 2, Geometry, Pre-Calculus, Calculus, STAAR, SAT, and ACT in North Dallas (Plano, Frisco, McKinney, Allen) or online."
  },
  "/curriculum": {
    title: "Interactive Math Curriculum & Practice Lessons | Math with Love",
    description:
      "Explore free interactive math lessons, step-by-step examples, and practice problems from elementary foundations through Algebra, Geometry, and Calculus."
  },
  "/blog": {
    title: "Math Education Blog | Algebra, SAT Prep & Study Strategies | Math with Love",
    description:
      "In-depth articles on 8th-grade Algebra readiness, Digital SAT Desmos strategies, overcoming math anxiety, and building lasting conceptual math fluency."
  },
  "/resources": {
    title: "Free Math Study Sheets, Formula Guides & Resources | Math with Love",
    description:
      "Download free math reference sheets, formula guides, and study resources for middle school, high school, and test prep."
  },
  "/meet": {
    title: "Interactive Online Math Classroom & Whiteboard | Math with Love",
    description:
      "Preview or join the Math with Love interactive online classroom featuring live video, two-way whiteboard, coordinate plane graphing, and document sharing."
  },
  "/classroom": {
    title: "Interactive Online Math Classroom & Whiteboard | Math with Love",
    description:
      "Preview or join the Math with Love interactive online classroom featuring live video, two-way whiteboard, coordinate plane graphing, and document sharing."
  },
  "/contact": {
    title: "Contact Kagan Love | North Dallas & Online Math Tutor | Math with Love",
    description:
      "Get in touch with Kagan Love to discuss your student's math goals, schedule a consultation, or book 1-on-1 tutoring in North Dallas or online."
  },
  "/privacy": {
    title: "Privacy Policy | Math with Love",
    description: "Privacy Policy for Math with Love tutoring services and website."
  },
  "/terms": {
    title: "Terms of Service | Math with Love",
    description: "Terms of Service and tutoring policies for Math with Love."
  },
  "/refunds": {
    title: "Refund & Cancellation Policy | Math with Love",
    description: "Session cancellation, rescheduling, and refund policy for Math with Love tutoring."
  }
};

export default function ScrollToTop() {
  const { pathname, search } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Update page title, meta description, and canonical URL per route so Google indexes each page distinctly
    const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const seo = ROUTE_SEO[cleanPath] || ROUTE_SEO["/"];
    document.title = seo.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", seo.description);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute(
      "href",
      `https://www.mathwlove.com${cleanPath === "/" ? "/" : cleanPath}`
    );

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
