import React, { useState } from "react";
import { Search, Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
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
      title: "Mastering the Digital SAT & ACT Math: Essential Strategies for High Schoolers",
      slug: "mastering-digital-sat-act-math",
      date: "July 24, 2026",
      category: "Test Prep",
      readTime: "8 min read",
      excerpt: "With college admissions tests going digital, preparing for SAT and ACT math requires a new set of tools. Learn how to master the onscreen graphing calculator and pace yourself during adaptive sections.",
      content: `Standardized college admissions testing has entered a brand new era. The transition to the digital SAT and the optional digital ACT has introduced computerized, adaptive structures that fundamentally change how students must prepare. Traditional paper-based techniques are no longer sufficient to secure a top-tier score. Understanding the system behind computerized testing is now just as important as mastering the underlying algebra and geometry concepts.

The most significant change on the digital SAT math section is the permanent availability of the Desmos graphing calculator. This built-in tool is incredibly powerful, yet many students do not know how to use it to its full potential. Rather than trying to solve complex systems of equations or coordinate geometry problems entirely by hand, students can learn to input the functions directly into Desmos to find intersections, vertices, and intercepts visually. This approach saves valuable seconds and eliminates simple arithmetic mistakes.

However, relying too heavily on the calculator without a solid conceptual understanding can be counterproductive. The exam is adaptive, meaning that the difficulty of the second math module depends entirely on your performance in the first module. If you solve questions accurately in the first section, the system presents you with a second module containing more advanced algebra, advanced math, and trigonometry questions. This adaptive structure makes early accuracy vital.

Pacing is another critical area that requires a shift in strategy. On a computer screen, it is easy to lose track of time. Students must practice active scratchpad habits on their provided scratch paper. Writing down key formulas and organizing calculations line by line helps maintain focus and prevents errors when reading questions off a digital display. If a problem seems too complex to solve within a minute, mark it for review and move on. Securing points on the easier questions first ensures that you do not run out of time at the end of the module.

Finally, regular practice with official digital practice tests is essential. Using the Bluebook application provided by the College Board allows students to become familiar with the active testing tools, including the question flag system, the countdown timer, and the calculator layout. Familiarity with the software reduces test-day anxiety, allowing students to focus purely on the mathematics.`
    },
    {
      id: 2,
      title: "Navigating the Redesigned STAAR Math Exams: A Guide for Texas Parents",
      slug: "texas-staar-math-redesign",
      date: "July 18, 2026",
      category: "Local Schools",
      readTime: "7 min read",
      excerpt: "Texas public schools have introduced interactive question types to the STAAR math exams. Here is what Collin County parents need to know to help their students succeed.",
      content: `The State of Texas Assessments of Academic Readiness, widely known as the STAAR test, has undergone a comprehensive overhaul. For families navigating public education in Texas, these updates represent a major change in how student progress is evaluated. The test is now administered entirely online, and the structure of the questions has shifted away from traditional multiple-choice answers.

The new interactive item types are designed to test a deeper level of mathematical comprehension. Instead of guessing from four options, students must complete tasks such as typing numbers directly into empty fields, selecting multiple correct statements from tables, and dragging terms to build correct equations. These interactive formats ensure that students cannot simply rely on the process of elimination. They must actually understand how to solve the problem from start to finish.

This redesign aligns closely with the Texas Essential Knowledge and Skills (TEKS) curriculum, which emphasizes real-world problem-solving and mathematical modeling. For example, a middle school math question might ask a student to drag points on a grid to graph a linear relationship, or an Algebra I question might require them to input the exact binomial factors of a quadratic trinomial. These tasks require a strong visual and conceptual grasp of the material.

Parents can help their children prepare for these online exams by encouraging active study habits at home. Working through multi-step word problems together and asking your child to explain their reasoning aloud is a highly effective way to build confidence. Focus on the underlying concepts rather than just finding the final answer. If a student understands why a formula works, they can adapt to whatever question format the online test presents.

Familiarizing students with the online testing platform is also beneficial. The Texas Education Agency provides free practice tests on their official website. Letting your child practice navigating the tools, such as the digital graph paper and equation editors, helps ensure they feel comfortable and focused when test day arrives in the spring.`
    },
    {
      id: 3,
      title: "Why Algebra I is the Critical Gateway to High School Math Success",
      slug: "algebra-critical-gateway-high-school",
      date: "July 10, 2026",
      category: "Math Foundations",
      readTime: "8 min read",
      excerpt: "Algebra I is the foundation for all future high school math and science courses. Discover why mastering this gateway subject early is essential for STEM pathways.",
      content: `In the landscape of secondary education, Algebra I stands out as the single most important gateway course. Decades of educational research indicate that student performance in Algebra I is a powerful predictor of future high school graduation rates, college enrollment, and success in STEM fields. This course represents the critical transition point where mathematics shifts from concrete arithmetic to abstract symbolic reasoning.

In elementary and middle school, students focus primarily on computation, working with concrete numbers to add, subtract, multiply, and divide. Algebra I introduces variables, functions, and coordinate graphing, requiring students to think about numbers in terms of general relationships and patterns. If a student does not fully grasp these abstract concepts, they will face significant challenges in subsequent classes like Geometry, Algebra II, Chemistry, and Physics.

One of the most common reasons students struggle in Algebra I is a weak foundation in pre-algebra concepts, particularly fractions, decimals, and negative numbers. When these basic operations are not fluent, the cognitive load of learning new algebraic structures becomes overwhelming. For instance, solving a linear equation that involves fractional coefficients becomes twice as difficult if a student is still unsure how to find a common denominator.

Recognizing the early warning signs of algebra struggle is essential for parents. If your student is spending hours on homework with little progress, feeling anxious before quizzes, or memorizing steps without understanding what they mean, they likely need additional support. Addressing these gaps early prevents a cumulative cycle of frustration.

Providing personalized, conceptual tutoring can make a profound difference. When students learn the logic behind solving equations and graphing functions, they realize that algebra is a structured, predictable system rather than a collection of random rules. This realization builds lasting confidence and prepares them for the academic challenges of high school and beyond.`
    },
    {
      id: 4,
      title: "Artificial Intelligence vs. Mathematical Reasoning: Why Conceptual Learning Beats Procedures",
      slug: "ai-vs-mathematical-reasoning",
      date: "June 28, 2026",
      category: "Education Technology",
      readTime: "9 min read",
      excerpt: "While AI tools can solve procedural math equations instantly, they often struggle with deep reasoning. Learn why conceptual math understanding is more important than ever.",
      content: `The rise of advanced artificial intelligence has transformed how students interact with their schoolwork. Mobile apps can scan any math problem and generate a step-by-step solution instantly. While this technology is a powerful tool, it raises an important question for parents and educators: why should students invest time in learning math procedures when a computer can solve them in a fraction of a second?

The answer lies in the difference between procedural execution and conceptual reasoning. Artificial intelligence is exceptional at following algorithms and calculations, but it frequently struggles with creative problem solving and true logical reasoning. In a world where calculation is automated, the value of human mathematical ability lies in understanding, application, and critical thinking.

If a student only learns the procedures to solve an equation, they are acting like a computer, repeating steps without understanding the underlying purpose. Once they encounter a problem that does not fit the standard template, they are unable to proceed. On the other hand, a student who understands the concepts behind the math can apply their knowledge to completely new situations.

For example, anyone can learn the mechanical steps of the quadratic formula. However, understanding that the formula finds the roots of a parabola, which represent where a curve crosses the horizontal axis, connects the algebra to a visual reality. This conceptual understanding allows students to interpret what those roots mean in the context of physics, economics, or engineering.

Math education must shift its focus toward deep conceptual comprehension. Tutoring sessions should emphasize the logic of why operations work, encouraging students to explain their steps and visualize equations. Developing these higher-order thinking skills ensures that students remain competitive and capable in an increasingly automated world.`
    },
    {
      id: 5,
      title: "Should Your High Schooler Take Calculus? Weighing AP, Dual-Credit, and College Readiness",
      slug: "high-school-calculus-ap-dual-credit",
      date: "June 15, 2026",
      category: "College Prep",
      readTime: "9 min read",
      excerpt: "Is rushing to Calculus in high school the right choice for your student? Compare AP Calculus, Dual-Credit college algebra, and college admissions expectations.",
      content: `Over the last two decades, rushing to take Calculus before high school graduation has become a standard pathway for college-bound students. Parents and students often assume that having Advanced Placement (AP) or Dual-Credit Calculus on their transcript is a prerequisite for admission to competitive universities. While advanced coursework is valuable, pushing ahead too quickly can sometimes do more harm than good.

Success in Calculus requires an absolute mastery of pre-calculus, algebra, and trigonometry. The actual concepts of calculus, such as limits, derivatives, and integrals, are relatively straightforward to introduce. The difficulty arises because solving calculus problems requires applying complex algebraic manipulation and trigonometric identities at every step. If a student enters Calculus with a shaky algebra foundation, they will struggle, regardless of how hard they study.

Pushing students into advanced math classes before they are ready often leads to learning gaps. Many college professors report that incoming freshmen who took calculus in high school often need remedial algebra support because they memorized procedures without understanding the foundational math. A grade of A in a solid pre-calculus course is far more beneficial for college readiness than a low grade in an AP Calculus class.

When deciding on a math pathway, consider your student's academic interests and career goals. For students pursuing STEM majors like engineering, physics, or computer science, taking Calculus in high school is highly recommended, provided they have the prerequisite skills. For students planning to major in the humanities, social sciences, or business, a strong course in statistics or college algebra is often a much more practical choice.

Ultimately, the goal of high school mathematics is to build a confident, competent problem solver. Pacing coursework to match your student's actual readiness ensures they develop a deep appreciation for the subject and enter college with a secure, functional mathematical foundation.`
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

  const handleCategoryClick = (catId) => {
    setFilter(catId);
    setActivePost(null);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setActivePost(null);
  };

  return (
    <div className="curriculum-container animate-fade-in" style={{ paddingBottom: "4rem" }}>
      <div className="content-width">
        <header className="curriculum-header text-center" style={{ margin: "2.5rem 0" }}>
          <span className="hero-tagline" style={{ display: "inline-block", marginBottom: "0.5rem" }}>Insights & Advice</span>
          <h1 className="page-title">The Math with Love Blog</h1>
          <p className="page-desc" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Explore modern strategies, school curriculum updates, and educational insights to support your student's mathematical journey.
          </p>
        </header>

        {/* PERSISTENT Filter and Search Bar (Visible on both list and single article page) */}
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
                onClick={() => handleCategoryClick(cat.id)}
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
              onChange={handleSearchChange}
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

        {activePost ? (
          /* Full Article View */
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
              <ArrowLeft size={16} /> Back to Blog List
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
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#ffffff",
                lineHeight: "1.3",
                marginBottom: "2rem",
                fontFamily: "Outfit, sans-serif"
              }}>
                {activePost.title}
              </h1>

              <div style={{
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                lineHeight: "1.8",
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
                  Kagan Love offers personalized, 1-on-1 tutoring sessions online and locally. Let's build real skills and confidence together.
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
            {/* Ads Banner */}
            <AdsSlot format="horizontal" fallbackText="Looking for personalized 1-on-1 tutoring? Private math and physics sessions are available online and locally." />

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
                      fontSize: "1.2rem",
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
