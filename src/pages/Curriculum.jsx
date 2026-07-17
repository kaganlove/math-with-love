import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, BookOpen, Clock, AlertCircle, ArrowLeft, CheckCircle, XCircle, FileText, ClipboardCheck, Sparkles } from "lucide-react";
import { curriculumLevels, sampleLessons, testPrepMappings, getLessonById } from "../data/curriculumData";
import AdsSlot from "../components/AdsSlot";
import EquationVisualizer from "../components/EquationVisualizer";
import ExpressionPartsVisualizer from "../components/ExpressionPartsVisualizer";
import WorksheetGenerator from "../components/WorksheetGenerator";

export default function Curriculum() {
  useEffect(() => {
    document.body.style.backgroundColor = "#a0a7b0";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const [activeTab, setActiveTab] = useState("library"); // "library" | "testprep"
  const [activeLevel, setActiveLevel] = useState("hs-alg"); // Default to High School Algebra
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedLessonId = searchParams.get("lesson");
  
  // Test Prep state
  const [selectedTest, setSelectedTest] = useState("sat"); // "sat" | "act" | "psat" | "tsi"
  const [selectedDiagnosticInfo, setSelectedDiagnosticInfo] = useState(null); // { testName, feedback, ccss }

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({}); // { questionIndex: selectedOptionIndex }
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Accordion expanded state for nested standards
  const [expandedLessons, setExpandedLessons] = useState({});
  const toggleLessonExpand = (lessonId) => {
    setExpandedLessons(prev => ({ ...prev, [lessonId]: !prev[lessonId] }));
  };

  // Filter levels/lessons based on search
  const filteredLevels = curriculumLevels.map(level => {
    const matchedTopics = level.topics.map(topic => {
      const matchedLessons = topic.lessons.map(lesson => {
        if (lesson.subLessons) {
          const matchedSub = lesson.subLessons.filter(sub =>
            sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (sub.ccss && sub.ccss.toLowerCase().includes(searchQuery.toLowerCase())) ||
            lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          return { ...lesson, subLessons: matchedSub };
        }
        return lesson;
      }).filter(lesson => {
        if (lesson.subLessons) {
          return lesson.subLessons.length > 0;
        }
        return (
          lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (lesson.ccss && lesson.ccss.toLowerCase().includes(searchQuery.toLowerCase())) ||
          topic.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      return { ...topic, lessons: matchedLessons };
    }).filter(topic => topic.lessons.length > 0);

    return { ...level, topics: matchedTopics };
  }).filter(level => level.topics.length > 0);

  const handleLessonSelect = (lessonId, diagInfo = null) => {
    if (lessonId) {
      setSearchParams({ lesson: lessonId });
    } else {
      setSearchParams({});
    }
    setSelectedDiagnosticInfo(diagInfo);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleSelectOption = (qIndex, optionIndex) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
  };

  const currentLevelData = curriculumLevels.find(l => l.id === activeLevel);
  const activeLesson = selectedLessonId ? getLessonById(selectedLessonId) : null;
  const currentTestData = testPrepMappings[selectedTest];

  return (
    <div className="curriculum-container animate-fade-in" style={{ backgroundColor: "#a0a7b0" }}>
      <div className="content-width">
        {/* Header */}
        <div className="curriculum-header text-center">
          <h1 className="page-title">Free Math Learning Library</h1>
          <p className="page-desc">
            Explore free step-by-step math lessons, formulas, and self-check quizzes from Kindergarten to early college math.
          </p>

          {/* Mode Switcher Tabs */}
          {!selectedLessonId && (
            <div className="curriculum-mode-tabs flex-center gap-2 mt-6">
              <button
                onClick={() => {
                  setActiveTab("library");
                  setSearchQuery("");
                }}
                className={`btn-mode-tab ${activeTab === "library" ? "active" : ""}`}
              >
                <BookOpen size={18} /> Browse K-12 Syllabus
              </button>
              <button
                onClick={() => {
                  setActiveTab("testprep");
                  setSearchQuery("");
                }}
                className={`btn-mode-tab ${activeTab === "testprep" ? "active" : ""}`}
              >
                <ClipboardCheck size={18} /> Match Test Score Report
              </button>
            </div>
          )}
        </div>

        {/* Outer Grid: Dashboard Layout */}
        {!selectedLessonId ? (
          /* ================= MODE 1: STANDARD BROWSE ================= */
          activeTab === "library" ? (
            <div className="curriculum-layout-wrapper mt-8">
              {/* Search bar */}
              <div className="search-bar-container max-w-lg mb-8">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search standard (e.g. HSA-REI.B.3, K.CC.A.1) or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="curriculum-layout">
                {/* Level selection tabs */}
                <div className="level-tabs">
                  {curriculumLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => {
                        setActiveLevel(level.id);
                        setSearchQuery("");
                      }}
                      className={`level-tab-btn ${activeLevel === level.id ? "active" : ""}`}
                    >
                      <span className="tab-title">{level.title}</span>
                      <span className="tab-subtitle">{level.subtitle}</span>
                    </button>
                  ))}
                </div>

                {/* Curriculum content */}
                <div className="curriculum-content">
                  {filteredLevels.length > 0 && currentLevelData ? (
                    <div>
                      <div className="level-info-card">
                        <h2 className="level-title-large">{currentLevelData.title} ({currentLevelData.subtitle})</h2>
                        <p className="level-desc">{currentLevelData.description}</p>
                      </div>

                      <div className="topics-grid">
                        {currentLevelData.topics.map((topic) => {
                          // Find matched topic in filtered list
                          const filteredLevel = filteredLevels.find(l => l.id === activeLevel);
                          const filteredTopic = filteredLevel ? filteredLevel.topics.find(t => t.id === topic.id) : null;
                          if (!filteredTopic) return null;

                          return (
                            <div key={topic.id} className="topic-card">
                              <h3 className="topic-title">{topic.title}</h3>
                              <div className="lessons-list">
                                {filteredTopic.lessons.map((lesson) => {
                                  const hasSub = lesson.subLessons && lesson.subLessons.length > 0;
                                  
                                  if (hasSub) {
                                    const isExpanded = expandedLessons[lesson.id];
                                    return (
                                      <div key={lesson.id} className="nested-lesson-group mb-2 border border-slate-100 rounded-lg p-2 bg-slate-50/50">
                                        <button
                                          onClick={() => toggleLessonExpand(lesson.id)}
                                          className={`lesson-item-btn parent-standard-btn ${isExpanded ? "active-expanded" : ""}`}
                                          style={{ width: "100%", justifyContent: "space-between" }}
                                        >
                                          <div className="lesson-info">
                                            <BookOpen size={16} className="lesson-icon text-muted" />
                                            <div className="text-left">
                                              <span className="lesson-title-text font-semibold block">{lesson.title}</span>
                                              {lesson.ccss && (
                                                <span className="lesson-ccss-code-badge parent-badge">{lesson.ccss}</span>
                                              )}
                                            </div>
                                          </div>
                                          <div className="lesson-meta">
                                            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">{isExpanded ? "Hide" : "Show"} Substandards ({lesson.subLessons.length})</span>
                                          </div>
                                        </button>
                                        
                                        {isExpanded && (
                                          <div className="sub-lessons-container pl-6 border-l-2 border-primary/20 mt-2 flex flex-col gap-2" style={{ paddingLeft: "1.5rem", borderLeftWidth: "2px", borderLeftColor: "var(--color-primary, #b31b1b)", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                                            {lesson.subLessons.map((sub) => (
                                              <button
                                                key={sub.id}
                                                onClick={() => handleLessonSelect(sub.id)}
                                                className={`lesson-item-btn sub-lesson-item ${sub.hasContent ? "has-content" : ""}`}
                                              >
                                                <div className="lesson-info text-left">
                                                  <div className="sub-bullet mr-2 text-primary font-bold" style={{ marginRight: "0.5rem", color: "var(--color-primary, #b31b1b)", fontWeight: "bold" }}>↳</div>
                                                  <div>
                                                    <span className="lesson-title-text text-sm">{sub.title}</span>
                                                    {sub.ccss && (
                                                      <span className="lesson-ccss-code-badge sub-badge">{sub.ccss}</span>
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="lesson-meta text-xs">
                                                  <span>{sub.duration || "25 mins"}</span>
                                                  {sub.hasContent ? (
                                                    <span className="badge-free text-[10px] px-1.5 py-0.5">Read Now</span>
                                                  ) : (
                                                    <span className="badge-soon text-[10px] px-1.5 py-0.5">Coming Soon</span>
                                                  )}
                                                </div>
                                              </button>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  }

                                  return (
                                    <button
                                      key={lesson.id}
                                      onClick={() => handleLessonSelect(lesson.id)}
                                      className={`lesson-item-btn ${lesson.hasContent ? "has-content" : ""}`}
                                    >
                                      <div className="lesson-info">
                                        <BookOpen size={16} className="lesson-icon" />
                                        <div className="text-left">
                                          <span className="lesson-title-text block">{lesson.title}</span>
                                          {lesson.ccss && (
                                            <span className="lesson-ccss-code-badge">{lesson.ccss}</span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="lesson-meta">
                                        <Clock size={12} />
                                        <span>{lesson.duration}</span>
                                        {lesson.hasContent ? (
                                          <span className="badge-free">Read Now</span>
                                        ) : (
                                          <span className="badge-soon">Coming Soon</span>
                                        )}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="no-results-card">
                      <AlertCircle size={48} className="no-results-icon" />
                      <h3>No topics match your search criteria.</h3>
                      <p>Try searching for a different term or browse levels on the left.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ================= MODE 2: TEST PREP MATCHING ================= */
            <div className="test-prep-matcher-layout mt-8">
              {/* Test Selection Grid */}
              <div className="test-selector-tabs flex-center gap-2 mb-8">
                {Object.keys(testPrepMappings).map((testKey) => {
                  const test = testPrepMappings[testKey];
                  return (
                    <button
                      key={testKey}
                      onClick={() => setSelectedTest(testKey)}
                      className={`btn-test-tab ${selectedTest === testKey ? "active" : ""}`}
                    >
                      {test.name}
                    </button>
                  );
                })}
              </div>

              {currentTestData ? (
                <div className="test-details-wrapper">
                  <div className="test-info-header text-center max-w-lg mx-auto mb-8">
                    <h2 className="section-title">{currentTestData.name} Diagnostic Linker</h2>
                    <p className="text-muted mt-2">{currentTestData.description}</p>
                    <div className="notebook-callout mt-4 text-left">
                      <span className="bullet">📝</span>
                      <p className="text-sm">
                        Look at the **Areas for Improvement** or **Feedback Strands** listed on your score report. Find those exact categories below to open the corresponding Common Core-aligned lessons.
                      </p>
                    </div>
                  </div>

                  {/* Diagnostic sections */}
                  <div className="test-sections-grid">
                    {currentTestData.sections.map((sect, sIdx) => (
                      <div key={sIdx} className="test-section-card">
                        <div className="test-section-header">
                          <FileText size={18} className="text-primary" />
                          <h3 className="test-section-title">{sect.name}</h3>
                        </div>
                        
                        <div className="diagnostic-skills-list mt-4">
                          {sect.skills.map((skill, skIdx) => (
                            <button
                              key={skIdx}
                              onClick={() => handleLessonSelect(skill.lessonId, {
                                testName: currentTestData.name,
                                feedback: skill.feedback,
                                ccss: skill.ccss
                              })}
                              className="diagnostic-skill-item"
                            >
                              <div className="skill-feedback-content">
                                <span className="feedback-bullet">&bull;</span>
                                <span className="feedback-text-label">{skill.feedback}</span>
                              </div>
                              <span className="skill-ccss-tag">{skill.ccss}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )
        ) : (
          /* ================= MODE 3: ACTIVE LESSON VIEW ================= */
          <div className="lesson-view-container">
            {/* Back to list */}
            <button
              onClick={() => handleLessonSelect(null)}
              className="btn-secondary btn-small"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.5rem"
              }}
            >
              <ArrowLeft size={16} /> <span>Back to Directory</span>
            </button>

            {activeLesson ? (
              <div className="lesson-layout">
                {/* Main Lesson Content */}
                <div className="lesson-main-card">
                  {/* Alert banner if opened via diagnostic score matching */}
                  {selectedDiagnosticInfo && (
                    <div className="diagnostic-match-callout mb-6">
                      <div className="callout-header flex-center gap-1">
                        <Sparkles size={16} className="text-primary" />
                        <span>Score Report Diagnostic Match</span>
                      </div>
                      <p className="callout-body">
                        This lesson maps to feedback from your **{selectedDiagnosticInfo.testName}** report: 
                        <br />
                        <strong className="text-gradient">"{selectedDiagnosticInfo.feedback}"</strong> 
                        <br />
                        Aligned with Common Core Standard **{selectedDiagnosticInfo.ccss}**.
                      </p>
                    </div>
                  )}

                  <div className="lesson-header-meta">
                    <span className="lesson-level-badge">{activeLesson.level}</span>
                    <span className="lesson-topic-badge">{activeLesson.topic}</span>
                    {activeLesson.ccss && (
                      <span className="lesson-ccss-badge">CCSS: {activeLesson.ccss}</span>
                    )}
                  </div>
                  <h1 className="lesson-main-title">{activeLesson.title}</h1>

                  {/* Generate Practice Worksheet & Prerequisites stacked right under the title */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1.5rem", marginBottom: "2.5rem" }}>
                    {/* Generate Practice Worksheet Box */}
                    <div className="worksheet-quick-box w-full">
                      <WorksheetGenerator
                        lessonId={activeLesson.id}
                        lessonTitle={activeLesson.title}
                        ccss={activeLesson.ccss}
                        fullWidth={true}
                      />
                    </div>

                    {/* Prerequisites (Before You Begin) Box */}
                    {activeLesson.prerequisites && (
                      <div className="sidebar-card prereq-card" style={{ margin: 0 }}>
                        <h3 className="sidebar-card-title">Before You Begin</h3>
                        <p className="text-xs text-muted mb-3">Make sure you are comfortable with these prerequisite topics:</p>
                        <div className="prereq-list">
                          {activeLesson.prerequisites.map((prereq, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleLessonSelect(prereq.id)}
                              className="prereq-link-btn"
                            >
                              <span className="prereq-bullet">✓</span> {prereq.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="lesson-intro">
                    <p>{activeLesson.introduction}</p>
                  </div>

                  {activeLesson.id === "hsa-sse-1a" ? (
                    <div className="my-6">
                      <ExpressionPartsVisualizer />
                    </div>
                  ) : activeLesson.animationSteps ? (
                    <div className="my-6">
                      <EquationVisualizer steps={activeLesson.animationSteps} />
                    </div>
                  ) : null}

                  <div className="lesson-steps">
                    <h3 className="section-divider-title">Step-by-Step Explanation</h3>
                    {activeLesson.steps.map((step, idx) => (
                      <div key={idx} className="lesson-step-card">
                        <h4 className="step-title">{step.title}</h4>
                        <p className="step-content">{step.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Practice Questions */}
                  <div className="lesson-practice-section">
                    <h3 className="section-divider-title">Interactive Self-Check Practice</h3>
                    <p className="practice-intro-text">Solve these problems to test your understanding. Answers are checked instantly.</p>
                    
                    {activeLesson.practiceQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="practice-question-card">
                        <p className="question-text">
                          <strong>Question {qIdx + 1}:</strong> {q.question}
                        </p>
                        <div className="options-grid">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = quizAnswers[qIdx] === optIdx;
                            const isCorrect = optIdx === q.correctIndex;
                            let optionClass = "";
                            
                            if (isSelected) {
                              optionClass = "selected";
                            }
                            if (quizSubmitted) {
                              if (isCorrect) optionClass = "correct";
                              else if (isSelected) optionClass = "incorrect";
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectOption(qIdx, optIdx)}
                                className={`option-btn ${optionClass}`}
                                disabled={quizSubmitted}
                              >
                                <span className="option-letter">{String.fromCharCode(65 + optIdx)}.</span>
                                <span className="option-text-content">{opt}</span>
                                {quizSubmitted && isCorrect && <CheckCircle size={16} className="option-status-icon text-success" />}
                                {quizSubmitted && isSelected && !isCorrect && <XCircle size={16} className="option-status-icon text-danger" />}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && quizAnswers[qIdx] !== undefined && (
                          <div className={`explanation-box ${quizAnswers[qIdx] === q.correctIndex ? "success" : "danger"}`}>
                            <p className="explanation-title">
                              {quizAnswers[qIdx] === q.correctIndex ? "Correct!" : "Incorrect."}
                            </p>
                            <p className="explanation-text-body">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="practice-actions">
                      {!quizSubmitted ? (
                        <button
                          onClick={submitQuiz}
                          className="btn-primary"
                          disabled={Object.keys(quizAnswers).length < activeLesson.practiceQuestions.length}
                        >
                          Submit Answers
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setQuizAnswers({});
                            setQuizSubmitted(false);
                          }}
                          className="btn-secondary"
                        >
                          Retry Quiz
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar on the right */}
                <div className="lesson-sidebar">
                  {/* Formula / Equations Card */}
                  {activeLesson.mathBox && (
                    <div className="sidebar-card formula-card">
                      <h3 className="sidebar-card-title">{activeLesson.mathBox.title}</h3>
                      <div className="formulas-list">
                        {activeLesson.mathBox.equations.map((eq, idx) => (
                          <div key={idx} className="formula-item">
                            <span className="formula-desc">{eq.desc}</span>
                            <div className="formula-math-display">
                              <code>{eq.formula}</code>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ads Slot */}
                  <AdsSlot format="vertical" fallbackText="Need help solving math problems step by step? Get personalized 1-on-1 tutoring sessions with Kagan Love!" />

                  {/* Call to Tutoring Promo */}
                  <div className="sidebar-card promo-card text-center">
                    <h3 className="promo-title">Stuck on a concept?</h3>
                    <p className="promo-desc">Get personalized, live 1-on-1 tutoring to work through homework and difficult math concepts.</p>
                    <Link to="/tutoring" className="btn-primary w-full block">Book Tutoring Session</Link>
                  </div>
                </div>
              </div>
            ) : (
              /* If clicked a soon-to-come lesson */
              <div className="soon-lesson-card text-center animate-fade-in">
                <AlertCircle size={64} className="text-amber mx-auto mb-4" />
                <h2>Lesson is Under Construction</h2>
                {selectedDiagnosticInfo ? (
                  <p className="max-w-lg mx-auto text-muted mb-6">
                    We are currently writing step-by-step notes and creating interactive practice questions for the topic **"{selectedDiagnosticInfo.feedback}"** ({selectedDiagnosticInfo.ccss}). Check back soon!
                  </p>
                ) : (
                  <p className="max-w-lg mx-auto text-muted mb-6">
                    We are currently writing step-by-step notes and creating interactive practice questions for this topic. Check back soon!
                  </p>
                )}
                <div className="soon-cta-group">
                  <Link to="/contact" className="btn-primary">
                    Request Tutoring on this Topic
                  </Link>
                  <button onClick={() => handleLessonSelect(null)} className="btn-secondary">
                    Go Back to Directory
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Banner */}
        {!selectedLessonId && (
          <div className="curriculum-footer-promo mt-12">
            <AdsSlot format="horizontal" fallbackText="Unlock academic success in your math classes. Check out our customizable private tutoring rates starting at $100/hr." />
          </div>
        )}
      </div>
    </div>
  );
}
