import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen, Clock, AlertCircle, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { curriculumLevels, sampleLessons } from "../data/curriculumData";
import AdsSlot from "../components/AdsSlot";

export default function Curriculum() {
  const [activeLevel, setActiveLevel] = useState("9-12"); // Default to High School
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  
  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({}); // { questionIndex: selectedOptionIndex }
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Filter levels/lessons based on search
  const filteredLevels = curriculumLevels.map(level => {
    const matchedTopics = level.topics.map(topic => {
      const matchedLessons = topic.lessons.filter(lesson => 
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...topic, lessons: matchedLessons };
    }).filter(topic => topic.lessons.length > 0);

    return { ...level, topics: matchedTopics };
  }).filter(level => level.topics.length > 0);

  const handleLessonSelect = (lessonId) => {
    setSelectedLessonId(lessonId);
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
  const activeLesson = sampleLessons[selectedLessonId];

  return (
    <div className="curriculum-container animate-fade-in">
      <div className="content-width">
        {/* Header */}
        <div className="curriculum-header text-center">
          <h1 className="page-title">Free Math Learning Library</h1>
          <p className="page-desc">
            Explore free step-by-step math lessons, formulas, and self-check quizzes from Kindergarten to early college math.
          </p>

          {/* Search bar */}
          <div className="search-bar-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search equations, topics (e.g. Linear, Fraction, Addition)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Outer Grid: Dashboard Layout */}
        {!selectedLessonId ? (
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
              {currentLevelData ? (
                <div>
                  <div className="level-info-card">
                    <h2 className="level-title-large">{currentLevelData.title} ({currentLevelData.subtitle})</h2>
                    <p className="level-desc">{currentLevelData.description}</p>
                  </div>

                  <div className="topics-grid">
                    {currentLevelData.topics.map((topic) => (
                      <div key={topic.id} className="topic-card">
                        <h3 className="topic-title">{topic.title}</h3>
                        <div className="lessons-list">
                          {topic.lessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              onClick={() => handleLessonSelect(lesson.id)}
                              className={`lesson-item-btn ${lesson.hasContent ? "has-content" : ""}`}
                            >
                              <div className="lesson-info">
                                <BookOpen size={16} className="lesson-icon" />
                                <span className="lesson-title-text">{lesson.title}</span>
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
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-results-card">
                  <AlertCircle size={48} className="no-results-icon" />
                  <h3>No topics match your search criteria.</h3>
                  <p>Try searching for a different term or browse levels above.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Render Active Lesson Page */
          <div className="lesson-view-container">
            {/* Back to list */}
            <button
              onClick={() => setSelectedLessonId(null)}
              className="btn-back"
            >
              <ArrowLeft size={16} /> Back to Curriculum Directory
            </button>

            {activeLesson ? (
              <div className="lesson-layout">
                {/* Main Lesson Content */}
                <div className="lesson-main-card">
                  <div className="lesson-header-meta">
                    <span className="lesson-level-badge">{activeLesson.level}</span>
                    <span className="lesson-topic-badge">{activeLesson.topic}</span>
                  </div>
                  <h1 className="lesson-main-title">{activeLesson.title}</h1>
                  <div className="lesson-intro">
                    <p>{activeLesson.introduction}</p>
                  </div>

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

                {/* Sidebar Cards */}
                <div className="lesson-sidebar">
                  {/* Formula / Equations Card */}
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

                  {/* Ads Slot */}
                  <AdsSlot format="vertical" fallbackText="Need help solving math problems step by step? Get personalized 1-on-1 tutoring sessions with Kagan Love!" />

                  {/* Call to Tutoring */}
                  <div className="sidebar-card promo-card text-center">
                    <h3 className="promo-title">Stuck on a concept?</h3>
                    <p className="promo-desc">Get personalized, live 1-on-1 tutoring to work through homework and difficult math concepts.</p>
                    <Link to="/tutoring" className="btn-primary w-full block">Book Tutoring Session</Link>
                  </div>
                </div>
              </div>
            ) : (
              /* If clicked a soon lesson */
              <div className="soon-lesson-card text-center">
                <AlertCircle size={64} className="text-amber mx-auto mb-4" />
                <h2>Lesson is Under Construction</h2>
                <p className="max-w-lg mx-auto text-muted mb-6">
                  We are currently writing step-by-step notes and creating interactive practice questions for this topic. Check back soon!
                </p>
                <div className="soon-cta-group">
                  <Link to="/tutoring" className="btn-primary">
                    Request Tutoring on this Topic
                  </Link>
                  <button onClick={() => setSelectedLessonId(null)} className="btn-secondary">
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
