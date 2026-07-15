import React, { useState } from "react";
import { Download, FileText, Search, Bookmark, ExternalLink } from "lucide-react";
import AdsSlot from "../components/AdsSlot";

export default function Resources() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const resourceCategories = [
    { id: "all", name: "All Resources" },
    { id: "guides", name: "Study Guides" },
    { id: "cheatsheets", name: "Formula Sheets" },
    { id: "worksheets", name: "Practice Worksheets" },
    { id: "testprep", name: "Test Prep & Strategy" }
  ];

  const items = [
    {
      id: "algebra-formula-sheet",
      title: "Algebra 1 & 2 Core Formula Sheet",
      category: "cheatsheets",
      type: "PDF Document",
      size: "1.2 MB",
      description: "A comprehensive reference sheet covering factoring patterns, exponent rules, quadratic formula, linear equations, and systems.",
      link: "#"
    },
    {
      id: "calculus-derivatives-integrals",
      title: "Calculus I & II Derivatives & Integrals Guide",
      category: "cheatsheets",
      type: "PDF Document",
      size: "1.8 MB",
      description: "Quick reference guide for derivative rules (chain, product, quotient) and integration formulas (substitution, integration by parts).",
      link: "#"
    },
    {
      id: "act-sat-math-strategy",
      title: "ACT & SAT Math Strategy Guide",
      category: "testprep",
      type: "Ebook / PDF",
      size: "2.4 MB",
      description: "A guide highlighting time-management strategies, pacing guidelines, plug-and-chug methods, and the top 20 formulas tested.",
      link: "#"
    },
    {
      id: "fractions-visual-models",
      title: "Visualizing Fractions: Elementary Practice Guide",
      category: "worksheets",
      type: "Printable Worksheet",
      size: "3.1 MB",
      description: "Worksheet using shapes, blocks, and number lines to help elementary students master adding, subtracting, and comparing fractions.",
      link: "#"
    },
    {
      id: "trig-unit-circle-helper",
      title: "The Unit Circle Demystified",
      category: "guides",
      type: "PDF Cheat Sheet",
      size: "850 KB",
      description: "A graphical walkthrough showing how to derive angles, radians, and coordinates of the unit circle using hand tricks and simple patterns.",
      link: "#"
    },
    {
      id: "staar-prep-middle-school",
      title: "Grade 8 Math STAAR Practice Packet",
      category: "worksheets",
      type: "Practice Packet",
      size: "4.2 MB",
      description: "20 mock questions aligned with standard 8th-grade curriculum benchmarks, including detailed step-by-step answer key.",
      link: "#"
    }
  ];

  const filteredItems = items.filter(item => {
    const matchesCategory = filter === "all" || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="resources-page animate-fade-in">
      <div className="content-width">
        {/* Header */}
        <section className="resources-header text-center">
          <h1 className="page-title">Free Teaching & Study Resources</h1>
          <p className="page-desc">
            Download free formula sheets, practice packets, and guides compiled by an educational technologist and tutor.
          </p>

          {/* Search bar */}
          <div className="search-bar-container max-w-md mx-auto">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search worksheets, formula sheets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </section>

        {/* Category Tabs */}
        <div className="resources-filter-tabs">
          {resourceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`filter-tab-btn ${filter === cat.id ? "active" : ""}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Affiliate Slot */}
        <div className="my-6">
          <AdsSlot format="horizontal" fallbackText="Want a customized set of math problems matching your course curriculum? Contact us to set up private lessons." />
        </div>

        {/* Resources Grid */}
        {filteredItems.length > 0 ? (
          <div className="resources-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="resource-card">
                <div className="resource-card-icon-wrapper">
                  <FileText className="resource-icon" size={24} />
                </div>
                
                <h3 className="resource-card-title">{item.title}</h3>
                <span className="resource-type-badge">{item.type} • {item.size}</span>
                <p className="resource-desc">{item.description}</p>
                
                <div className="resource-card-footer mt-auto">
                  <a
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`This is a mock download link for "${item.title}". You can replace the href with your actual file URL once uploaded to GitHub or Cloudflare!`);
                    }}
                    className="btn-download"
                  >
                    <Download size={16} /> Download File
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results-card text-center my-12">
            <h3>No resources found matching your filter or query.</h3>
            <p className="text-muted">Try clearing your search query or selecting "All Resources."</p>
          </div>
        )}

        {/* Custom Resource Request */}
        <section className="resource-request-card text-center mt-12">
          <Bookmark size={36} className="text-indigo mx-auto mb-2" />
          <h3>Looking for a specific worksheet or study guide?</h3>
          <p className="max-w-md mx-auto text-muted mb-4">
            If you are a student or a teacher needing a specific resource, let us know! Kagan can create custom worksheets and worksheets tailored to your curriculum.
          </p>
          <a href="/contact" className="btn-secondary">Request Custom Resource</a>
        </section>
      </div>
    </div>
  );
}
