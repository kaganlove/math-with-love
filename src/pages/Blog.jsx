import React, { useState } from "react";
import { Search, Calendar, Clock, BookOpen, ArrowLeft, ArrowRight, Star } from "lucide-react";
import AdsSlot from "../components/AdsSlot";
import { Link } from "react-router-dom";

export default function Blog() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activePost, setActivePost] = useState(null);

  const blogCategories = [
    { id: "all", name: "All Articles" },
    { id: "Test Prep", name: "Test Prep" },
    { id: "Local Schools", name: "Local Schools" },
    { id: "Math Foundations", name: "Foundations" },
    { id: "Education Technology", name: "EdTech & AI" },
    { id: "College Prep", name: "College Prep" }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Mastering the Digital SAT & ACT Math: Strategies for Dallas High Schoolers",
      slug: "mastering-digital-sat-act-math",
      date: "July 24, 2026",
      category: "Test Prep",
      readTime: "5 min read",
      excerpt: "With college admissions tests going digital, preparing for SAT and ACT math requires a new set of tools. Learn how to master the onscreen graphing calculator and pace yourself during adaptive sections.",
      content: `Standardized testing has changed dramatically over the last few years. The shift to the digital SAT and the optional digital ACT has introduced computerized, adaptive testing formats. For high school students in the Dallas-Fort Worth area, this transition means that old paper-and-pencil test preparation methods are no longer sufficient.

Success on the digital SAT math section relies heavily on test-taking strategy. Students must practice using the built-in Desmos graphing calculator and master active problem-solving skills rather than relying on simple rote memorization. The adaptive nature of the exam means the second module adjusts its difficulty based on your performance in the first module. This makes early accuracy crucial.

To score well, students need to familiarize themselves with the digital testing interface. Practice using active scratchpad scratch work to keep calculations organized, even when reading the questions from a screen. Pacing is another key factor. Spending too much time on a single complex algebra question can leave you rushed at the end of the module. Focus on securing the points for easier questions first, then return to the challenging ones if time permits.`
    },
    {
      id: 2,
      title: "Navigating the Redesigned Texas STAAR Math Exams in Plano & Frisco ISDs",
      slug: "texas-staar-math-redesign-plano-frisco",
      date: "July 18, 2026",
      category: "Local Schools",
      readTime: "4 min read",
      excerpt: "Texas public schools have introduced interactive question types to the STAAR math exams. Here is what Collin County parents need to know to help their students succeed.",
      content: `The State of Texas Assessments of Academic Readiness, commonly known as the STAAR test, underwent a significant redesign to align with modern educational standards. For families in Plano ISD, Frisco ISD, and neighboring districts, the most noticeable change is the transition to online testing and the introduction of new interactive question types.

Students no longer face simple multiple-choice questions. Instead, they must input numeric answers directly, select multiple correct answers from a grid, and drag terms into equations. These new formats test a deeper level of mathematical understanding.

Parents can support their students by encouraging regular practice with multi-step math problems. Focus on the Texas Essential Knowledge and Skills (TEKS) curriculum guidelines. Understanding how to model equations visually is key to scoring well on the redesigned test. Regular review of core algebraic concepts and geometry formulas throughout the school year prevents testing anxiety when spring arrives.`
    },
    {
      id: 3,
      title: "Why Algebra I is the Critical Gateway to High School Math Success",
      slug: "algebra-critical-gateway-high-school",
      date: "July 10, 2026",
      category: "Math Foundations",
      readTime: "6 min read",
      excerpt: "Algebra I is the foundation for all future high school math and science courses. Discover why mastering this gateway subject early is essential for STEM pathways.",
      content: `Educators have long recognized Algebra I as the single most predictive course for high school graduation and college readiness. It marks the transition from basic arithmetic to abstract mathematical thinking. Students who struggle in Algebra I often face difficulties in subsequent classes, including Geometry, Algebra II, Chemistry, and Physics.

Mastering algebraic concepts is about understanding relationships between variables. When a student learns to solve for x, they are developing critical problem-solving skills that apply to real-world scenarios. 

If your student is entering high school in the fall, look for early signs of frustration with math. Struggling to graph linear equations or factor quadratic trinomials indicates that foundational tutoring could be beneficial. Addressing these gaps early builds confidence and keeps college STEM pathways open.`
    },
    {
      id: 4,
      title: "Artificial Intelligence vs. Mathematical Reasoning: Why Conceptual Learning Beats Procedures",
      slug: "ai-vs-mathematical-reasoning",
      date: "June 28, 2026",
      category: "Education Technology",
      readTime: "5 min read",
      excerpt: "While AI tools can solve procedural math equations instantly, they often struggle with deep reasoning. Learn why conceptual math understanding is more important than ever.",
      content: `Artificial intelligence tools have become incredibly capable at solving routine mathematical calculations. Anyone with a smartphone can take a photo of an algebra equation and receive a step-by-step solution in seconds. However, this technology highlights a critical educational truth: memorizing procedures is no longer the primary goal of math education.

Computers excel at calculation, but humans must excel at reasoning. A student needs to understand the meaning behind the numbers to apply math effectively. 

When tutoring math, focus on the conceptual 'why' of each step. Knowing how to factor a trinomial is useful, but understanding that those factors represent the intercepts of a curve connects the algebra to a visual reality. Students who learn to think mathematically can solve novel problems that AI cannot easily handle.`
    },
    {
      id: 5,
      title: "Should Your High Schooler Take Calculus? Weighing AP, Dual-Credit, and College Algebra Roots",
      slug: "high-school-calculus-ap-dual-credit",
      date: "June 15, 2026",
      category: "College Prep",
      readTime: "6 min read",
      excerpt: "Is rushing to Calculus in high school the right choice for your student? Compare AP Calculus, Dual-Credit college algebra, and college admissions expectations.",
      content: `Rushing to take Calculus before graduating high school has become a common trend among college-bound students in North Dallas. While having Advanced Placement (AP) or Dual-Credit Calculus on a transcript looks impressive to admissions officers, it is not always the best path for every student.

Succeeding in Calculus requires an absolute mastery of algebra, geometry, and trigonometry. Rushing through pre-calculus to reach AP Calculus often results in shaky foundations. 

For students planning to major in humanities, arts, or business, a strong college algebra or statistics foundation is often more valuable than a rushed calculus course. Consider your student's workload and ultimate career goals. Building a deep, confident understanding of algebra and pre-calculus provides a much better starting point for college than struggling through calculus in high school.`
    }
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesFilter = filter === "all" || post.category === filter;
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="curriculum-container animate-fade-in" style={{ paddingBottom: "4rem" }}>
      <div className="content-width">
        {activePost ? (
          /* Full Article View */
          <div style={{ maxWidth: "800px", margin: "0 auto", marginTop: "2rem" }}>
            <button 
              onClick={() => setActivePost(null)}
              className="hover-scale"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1.5px solid var(--border-color)",
                color: "#ffffff",
                padding: "0.6rem 1.2rem",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.9rem",
                marginBottom: "2rem",
                transition: "all 0.2s ease"
              }}
            >
              <ArrowLeft size={16} /> Back to Blog
            </button>

            <article style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1.5px solid var(--border-color)",
              borderRadius: "20px",
              padding: "2.5rem",
              boxShadow: "6px 6px 0px 0px var(--border-color)",
              marginBottom: "3rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <span style={{
                  backgroundColor: "rgba(59, 130, 246, 0.15)",
                  color: "#60a5fa",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  fontWeight: "bold"
                }}>
                  {activePost.category}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  <Calendar size={14} /> {activePost.date}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                  <Clock size={14} /> {activePost.readTime}
                </span>
              </div>

              <h1 style={{
                fontSize: "2.2rem",
                fontWeight: "bold",
                color: "#ffffff",
                lineHeight: "1.25",
                marginBottom: "1.5rem",
                fontFamily: "Outfit, sans-serif"
              }}>
                {activePost.title}
              </h1>

              <div style={{
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                lineHeight: "1.75",
                whiteSpace: "pre-wrap"
              }}>
                {activePost.content}
              </div>

              {/* Call to action inside post */}
              <div style={{
                marginTop: "3rem",
                padding: "2rem",
                backgroundColor: "rgba(59, 130, 246, 0.05)",
                border: "1.5px solid rgba(59, 130, 246, 0.2)",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
              }}>
                <h4 style={{ fontSize: "1.2rem", color: "#ffffff", fontWeight: "bold", marginBottom: "0.5rem" }}>
                  Need Help with these Topics?
                </h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "1.5rem", maxWidth: "500px" }}>
                  Kagan Love offers personalized, 1-on-1 tutoring sessions in Dallas and online. Let's build real skills and confidence together.
                </p>
                <Link to="/contact" className="btn-primary" style={{ padding: "0.75rem 1.5rem" }}>
                  Book a Consultation
                </Link>
              </div>
            </article>
          </div>
        ) : (
          /* Article Grid View */
          <div>
            <header className="curriculum-header text-center" style={{ margin: "2.5rem 0" }}>
              <span className="hero-tagline" style={{ display: "inline-block", marginBottom: "0.5rem" }}>Insights & Advice</span>
              <h1 className="page-title">The Math with Love Blog</h1>
              <p className="page-desc" style={{ maxWidth: "600px", margin: "0 auto" }}>
                Explore modern strategies, school district updates, and educational insights to support your student's mathematical journey.
              </p>
            </header>

            {/* Filter and Search Bar */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2.5rem",
              backgroundColor: "var(--bg-secondary)",
              padding: "1rem",
              border: "1.5px solid var(--border-color)",
              borderRadius: "16px",
              boxShadow: "3px 3px 0 0 var(--border-color)"
            }}>
              {/* Categories */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {blogCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    style={{
                      backgroundColor: filter === cat.id ? "#3b82f6" : "rgba(255, 255, 255, 0.05)",
                      color: filter === cat.id ? "#ffffff" : "var(--text-secondary)",
                      border: filter === cat.id ? "1.5px solid #3b82f6" : "1.5px solid var(--border-color)",
                      padding: "0.4rem 0.9rem",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div style={{ position: "relative", minWidth: "240px", flex: "1", maxWidth: "400px" }}>
                <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    backgroundColor: "var(--bg-primary)",
                    border: "1.5px solid var(--border-color)",
                    borderRadius: "10px",
                    padding: "0.5rem 1rem 0.5rem 2.2rem",
                    color: "#ffffff",
                    fontSize: "0.9rem",
                    outline: "none"
                  }}
                />
              </div>
            </div>

            {/* Ads Banner */}
            <AdsSlot format="horizontal" fallbackText="Looking for personalized 1-on-1 tutoring? Private math and physics sessions are available online and locally in Collin County." />

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "2rem",
                marginTop: "2rem"
              }}>
                {filteredPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="hover-scale"
                    onClick={() => setActivePost(post)}
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      border: "1.5px solid var(--border-color)",
                      borderRadius: "16px",
                      padding: "1.8rem",
                      boxShadow: "4px 4px 0px 0px var(--border-color)",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      transition: "all 0.25s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}>
                      <span style={{
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        color: "#60a5fa",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: "bold"
                      }}>
                        {post.category}
                      </span>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
                        {post.date}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#ffffff",
                      marginBottom: "0.75rem",
                      lineHeight: "1.4",
                      fontFamily: "Outfit, sans-serif"
                    }}>
                      {post.title}
                    </h3>

                    <p style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                      lineHeight: "1.6",
                      marginBottom: "1.5rem",
                      flex: "1"
                    }}>
                      {post.excerpt}
                    </p>

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderTop: "1.5px solid var(--border-color)",
                      paddingTop: "0.8rem",
                      marginTop: "auto"
                    }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <Clock size={12} /> {post.readTime}
                      </span>
                      <span style={{
                        color: "#60a5fa",
                        fontSize: "0.85rem",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem"
                      }}>
                        Read Article <ArrowRight size={14} />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                <p style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>No articles found matching your criteria.</p>
                <button 
                  onClick={() => { setFilter("all"); setSearch(""); }}
                  className="btn-secondary mt-4"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
