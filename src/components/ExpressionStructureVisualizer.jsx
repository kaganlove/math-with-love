import React, { useState, useEffect, useRef } from "react";
import { Sparkles, RefreshCw, Layers } from "lucide-react";

export default function ExpressionStructureVisualizer({ pageIndex = 0 }) {
  const [step, setStep] = useState(0); // 0: original, 1: structured/grouped, 2: factored

  // Drag-and-drop states for Perfect Squares (pageIndex = 0) and Difference of Squares (pageIndex = 1)
  const [zone9Replaced, setZone9Replaced] = useState(false);
  const [zone6xReplaced, setZone6xReplaced] = useState(false);
  const [factoredBlankReplaced, setFactoredBlankReplaced] = useState(false);
  const [factoredBlank1Replaced, setFactoredBlank1Replaced] = useState(false);
  const [factoredBlank2Replaced, setFactoredBlank2Replaced] = useState(false);

  // Big X states for Trinomials a=1 (pageIndex = 2)
  const [leftFactor, setLeftFactor] = useState(null);
  const [rightFactor, setRightFactor] = useState(null);
  const [activeDragValue, setActiveDragValue] = useState(null);

  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredZone, setHoveredZone] = useState(null); // "6x" | "9" | "blank" | "blank1" | "blank2" | "leftZone" | "rightZone"
  const [finalFactored, setFinalFactored] = useState(false);

  const zone9Ref = useRef(null);
  const zone6xRef = useRef(null);
  const blankRef = useRef(null);
  const blank1Ref = useRef(null);
  const blank2Ref = useRef(null);
  const leftZoneRef = useRef(null);
  const rightZoneRef = useRef(null);
  const dragRef = useRef(null);
  const dragStartOffset = useRef({ x: 0, y: 0 });

  // Reset steps and drag variables whenever pageIndex changes
  useEffect(() => {
    setStep(0);
    setZone9Replaced(false);
    setZone6xReplaced(false);
    setFactoredBlankReplaced(false);
    setFactoredBlank1Replaced(false);
    setFactoredBlank2Replaced(false);
    setLeftFactor(null);
    setRightFactor(null);
    setActiveDragValue(null);
    setFinalFactored(false);
    setIsDragging(false);
    setHoveredZone(null);
  }, [pageIndex]);

  // Self-heal/sync finalFactored for Difference of Squares once both blanks are populated
  useEffect(() => {
    if (pageIndex === 1 && factoredBlank1Replaced && factoredBlank2Replaced) {
      setFinalFactored(true);
    }
  }, [factoredBlank1Replaced, factoredBlank2Replaced, pageIndex]);

  // Self-heal/sync finalFactored for Trinomials a=1 once both factors are placed in Big X
  useEffect(() => {
    if (pageIndex === 2 && leftFactor !== null && rightFactor !== null) {
      setFinalFactored(true);
    }
  }, [leftFactor, rightFactor, pageIndex]);

  const handleNextStep = () => {
    setStep((prev) => (prev < 2 ? prev + 1 : 0));
  };

  const handleReset = () => {
    setStep(0);
    setZone9Replaced(false);
    setZone6xReplaced(false);
    setFactoredBlankReplaced(false);
    setFactoredBlank1Replaced(false);
    setFactoredBlank2Replaced(false);
    setLeftFactor(null);
    setRightFactor(null);
    setActiveDragValue(null);
    setFinalFactored(false);
    setIsDragging(false);
    setHoveredZone(null);
  };

  const startDrag = (e, value) => {
    e.preventDefault();
    if (pageIndex === 0 && factoredBlankReplaced) return;
    if (pageIndex === 1 && factoredBlank1Replaced && factoredBlank2Replaced) return;
    if (pageIndex === 2 && leftFactor !== null && rightFactor !== null) return;

    const rect = e.currentTarget.getBoundingClientRect();
    dragStartOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setActiveDragValue(value);
    setIsDragging(true);
    setDragPosition({ x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX;
    const y = e.clientY;
    setDragPosition({ x, y });

    // Check collisions with active drop zones
    let hover = null;
    if (pageIndex === 0) {
      if (!zone6xReplaced || !zone9Replaced) {
        if (!zone6xReplaced && zone6xRef.current) {
          const rect = zone6xRef.current.getBoundingClientRect();
          if (x >= rect.left - 25 && x <= rect.right + 25 && y >= rect.top - 25 && y <= rect.bottom + 25) {
            hover = "6x";
          }
        }
        if (!zone9Replaced && zone9Ref.current) {
          const rect = zone9Ref.current.getBoundingClientRect();
          if (x >= rect.left - 25 && x <= rect.right + 25 && y >= rect.top - 25 && y <= rect.bottom + 25) {
            hover = "9";
          }
        }
      } else {
        if (!factoredBlankReplaced && blankRef.current) {
          const rect = blankRef.current.getBoundingClientRect();
          if (x >= rect.left - 25 && x <= rect.right + 25 && y >= rect.top - 25 && y <= rect.bottom + 25) {
            hover = "blank";
          }
        }
      }
    } else if (pageIndex === 1) {
      if (!zone9Replaced) {
        if (zone9Ref.current) {
          const rect = zone9Ref.current.getBoundingClientRect();
          if (x >= rect.left - 25 && x <= rect.right + 25 && y >= rect.top - 25 && y <= rect.bottom + 25) {
            hover = "9";
          }
        }
      } else {
        if (!factoredBlank1Replaced && blank1Ref.current) {
          const rect = blank1Ref.current.getBoundingClientRect();
          if (x >= rect.left - 25 && x <= rect.right + 25 && y >= rect.top - 25 && y <= rect.bottom + 25) {
            hover = "blank1";
          }
        }
        if (!factoredBlank2Replaced && blank2Ref.current) {
          const rect = blank2Ref.current.getBoundingClientRect();
          if (x >= rect.left - 25 && x <= rect.right + 25 && y >= rect.top - 25 && y <= rect.bottom + 25) {
            hover = "blank2";
          }
        }
      }
    } else if (pageIndex === 2) {
      if (leftFactor === null && leftZoneRef.current) {
        const rect = leftZoneRef.current.getBoundingClientRect();
        if (x >= rect.left - 25 && x <= rect.right + 25 && y >= rect.top - 25 && y <= rect.bottom + 25) {
          hover = "leftZone";
        }
      }
      if (rightFactor === null && rightZoneRef.current) {
        const rect = rightZoneRef.current.getBoundingClientRect();
        if (x >= rect.left - 25 && x <= rect.right + 25 && y >= rect.top - 25 && y <= rect.bottom + 25) {
          hover = "rightZone";
        }
      }
    }
    setHoveredZone(hover);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);

    if (hoveredZone === "6x") {
      setZone6xReplaced(true);
    } else if (hoveredZone === "9") {
      setZone9Replaced(true);
    } else if (hoveredZone === "blank") {
      setFactoredBlankReplaced(true);
      setFinalFactored(true);
    } else if (hoveredZone === "blank1") {
      setFactoredBlank1Replaced(true);
    } else if (hoveredZone === "blank2") {
      setFactoredBlank2Replaced(true);
    } else if (hoveredZone === "leftZone") {
      if (activeDragValue === 2 || activeDragValue === 3) {
        if (rightFactor !== activeDragValue) {
          setLeftFactor(activeDragValue);
        }
      }
    } else if (hoveredZone === "rightZone") {
      if (activeDragValue === 2 || activeDragValue === 3) {
        if (leftFactor !== activeDragValue) {
          setRightFactor(activeDragValue);
        }
      }
    }
    setHoveredZone(null);
  };

  // Content configuration for each slide index
  const pagesConfig = [
    {
      title: "Factoring Perfect Squares",
      original: "x² + 6x + 9",
      structured: "(x)² + 2(x)(3) + (3)²",
      factored: "(x + 3)²",
      explanation0: "Identify if the start and end terms are perfect squares. Here, x² is the square of x, and 9 is the square of 3.",
      explanation1: "Check if the middle term is 2 * (first root) * (second root). Indeed, 2 * x * 3 = 6x, confirming a perfect square structure.",
      explanation2: "Apply the template: (a + b)². Substituting our terms yields the factored form: (x + 3)²."
    },
    {
      title: "Difference of Squares",
      original: "x² - 9",
      structured: "(x)² - (3)²",
      factored: "(x - 3)(x + 3)",
      explanation0: "Identify if the expression fits the template a² - b². Here, x² is a perfect square, and 9 is also a perfect square (3²), separated by subtraction.",
      explanation1: "Rewrite each term as a squared base to clearly isolate the values of a and b. In this case, a = x and b = 3.",
      explanation2: "Apply the factoring template: (a - b)(a + b). Substituting our bases gives the fully factored expression: (x - 3)(x + 3)."
    },
    {
      title: "Factoring Trinomials (a = 1)",
      original: "x² + 5x + 6",
      structured: "Multiply to 6, Add to 5 → Factors are 2 and 3",
      factored: "(x + 2)(x + 3)",
      explanation0: "For trinomials of the form x² + bx + c, we need to find two numbers that multiply to the constant term c (6) and add to the middle coefficient b (5).",
      explanation1: "List the factor pairs of 6: (1, 6) and (2, 3). The pair (2, 3) adds up to 5, so these are our binomial constants.",
      explanation2: "Write the factored form as (x + factor1)(x + factor2). This gives the equivalent expression: (x + 2)(x + 3)."
    },
    {
      title: "Factoring by Grouping (a ≠ 1)",
      original: "2x² + 4x + 3x + 6",
      structured: "2x(x + 2) + 3(x + 2)",
      factored: "(2x + 3)(x + 2)",
      explanation0: "When a polynomial has four terms, group them in pairs to factor out the GCF: (2x² + 4x) and (3x + 6).",
      explanation1: "Factor out the GCF of each group: 2x from the first group, and 3 from the second. Notice that the remaining binomial (x + 2) is identical!",
      explanation2: "Factor out the common binomial group (x + 2) as a single entity, grouping the GCF coefficients: (2x + 3)(x + 2)."
    },
    {
      title: "Slip 'n Slide Method (a ≠ 1)",
      original: "2x² + 5x + 3",
      structured: "Slip: x² + 5x + 6 → Factor: (x + 2)(x + 3)",
      factored: "Slide: (x + 2/2)(x + 3/2) → (x + 1)(2x + 3)",
      explanation0: "To factor ax² + bx + c when a ≠ 1, 'slip' the leading coefficient a (2) to the end and multiply it by c (3) to temporarily clear the leading coefficient.",
      explanation1: "Factor the simplified trinomial x² + 5x + 6 normally. The numbers that multiply to 6 and add to 5 are 2 and 3, yielding (x + 2)(x + 3).",
      explanation2: "Now 'slide' the original leading coefficient (2) back under the constants. Simplify the fractions (2/2 = 1) and move any remaining denominators to the front of x: (x + 1)(2x + 3)."
    },
    {
      title: "Completing the Square (a = 1)",
      original: "x² + 6x + 5",
      structured: "(x² + 6x + 9 - 9) + 5",
      factored: "(x + 3)² - 4",
      explanation0: "Take half of the linear coefficient 6 (which is 3), square it (9), and both add and subtract it to keep the expression balanced.",
      explanation1: "Group the perfect square trinomial part: (x² + 6x + 9) factors to (x + 3)².",
      explanation2: "Combine the remaining constants outside the parentheses: -9 + 5 = -4. This gives the vertex form: (x + 3)² - 4."
    },
    {
      title: "Completing the Square (a ≠ 1)",
      original: "2x² + 8x + 6",
      structured: "2(x² + 4x + 4 - 4) + 6",
      factored: "2(x + 2)² - 2",
      explanation0: "To complete the square when a ≠ 1, first factor out the leading coefficient a (2) from the variable terms only: 2(x² + 4x) + 6.",
      explanation1: "Take half of the middle term (4/2 = 2), square it (4), and both add and subtract it inside the parentheses: 2(x² + 4x + 4 - 4) + 6.",
      explanation2: "Separate the perfect square trinomial (x² + 4x + 4 = (x + 2)²) and multiply the subtracted constant (-4) by the outer coefficient (2) to move it outside: 2(x + 2)² - 8 + 6 = 2(x + 2)² - 2."
    }
  ];

  // Safeguard index range
  const config = pagesConfig[pageIndex] || pagesConfig[0];

  // Determine if this is a custom drag-and-drop page
  const isDragPage = pageIndex === 0 || pageIndex === 1 || pageIndex === 2;

  return (
    <div className="interactive-parts-card" style={{ touchAction: "none" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <span 
          style={{
            fontSize: "0.75rem",
            color: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}
        >
          {config.title} Visualizer
        </span>
        <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginTop: "0.5rem", color: "#ffffff" }}>
          {isDragPage ? "Interactive Factoring Sandbox" : "Step-by-Step Factoring Pattern"}
        </h3>
      </div>

      {/* Visualization Canvas area */}
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem 1.5rem",
          background: "rgba(15, 23, 42, 0.6)",
          border: "1.5px solid #1e293b",
          borderRadius: "12px",
          minHeight: "200px",
          position: "relative",
          margin: "1rem 0"
        }}
      >
        {isDragPage ? (
          /* ================= DRAG AND DROP SANDBOX LAYOUT ================= */
          <div style={{ textAlign: "center", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            
            {/* Equation Row */}
            <div 
              style={{ 
                fontSize: "2.25rem", 
                fontWeight: "bold", 
                color: "#ffffff", 
                fontFamily: "Outfit, sans-serif",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                userSelect: "none"
              }}
            >
              {pageIndex === 0 || pageIndex === 1 ? (
                <>
                  <span>x²</span>
                  {pageIndex === 0 ? (
                    /* PERFECT SQUARES */
                    <>
                      <span>+</span>
                      {zone6xReplaced ? (
                        <span style={{ color: "#d8b4fe", padding: "0 0.2rem" }}>2(x)(3)</span>
                      ) : (
                        <span 
                          ref={zone6xRef}
                          style={{
                            border: hoveredZone === "6x" ? "2.5px dashed #22c55e" : "2px dashed #ef4444",
                            backgroundColor: hoveredZone === "6x" ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.05)",
                            padding: "0.1rem 0.8rem",
                            borderRadius: "8px",
                            color: hoveredZone === "6x" ? "#4ade80" : "#e2e8f0",
                            fontSize: "1.75rem",
                            transition: "all 0.15s ease",
                            transform: hoveredZone === "6x" ? "scale(1.05)" : "none",
                            margin: "0 0.25rem"
                          }}
                        >
                          6x
                        </span>
                      )}
                      <span>+</span>
                      {zone9Replaced ? (
                        <span style={{ color: "#d8b4fe", padding: "0 0.2rem" }}>(3)²</span>
                      ) : (
                        <span 
                          ref={zone9Ref}
                          style={{
                            border: hoveredZone === "9" ? "2.5px dashed #22c55e" : "2px dashed #ef4444",
                            backgroundColor: hoveredZone === "9" ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.05)",
                            padding: "0.1rem 0.8rem",
                            borderRadius: "8px",
                            color: hoveredZone === "9" ? "#4ade80" : "#e2e8f0",
                            fontSize: "1.75rem",
                            transition: "all 0.15s ease",
                            transform: hoveredZone === "9" ? "scale(1.05)" : "none",
                            margin: "0 0.25rem"
                          }}
                        >
                          9
                        </span>
                      )}
                    </>
                  ) : (
                    /* DIFFERENCE OF SQUARES */
                    <>
                      <span>-</span>
                      {zone9Replaced ? (
                        <span style={{ color: "#d8b4fe", padding: "0 0.2rem" }}>(3)²</span>
                      ) : (
                        <span 
                          ref={zone9Ref}
                          style={{
                            border: hoveredZone === "9" ? "2.5px dashed #22c55e" : "2px dashed #ef4444",
                            backgroundColor: hoveredZone === "9" ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.05)",
                            padding: "0.1rem 0.8rem",
                            borderRadius: "8px",
                            color: hoveredZone === "9" ? "#4ade80" : "#e2e8f0",
                            fontSize: "1.75rem",
                            transition: "all 0.15s ease",
                            transform: hoveredZone === "9" ? "scale(1.05)" : "none",
                            margin: "0 0.25rem"
                          }}
                        >
                          9
                        </span>
                      )}
                    </>
                  )}
                </>
              ) : (
                /* TRINOMIALS A = 1 */
                <span style={{ fontSize: "2rem" }}>x² + 5x + 6</span>
              )}
            </div>

            {/* Big X Layout (Only for pageIndex === 2) */}
            {pageIndex === 2 && (
              <div 
                style={{ 
                  position: "relative", 
                  width: "220px", 
                  height: "220px", 
                  margin: "1.5rem 0", 
                  userSelect: "none" 
                }} 
                className="animate-fade-in"
              >
                <svg width="220" height="220" viewBox="0 0 220 220" style={{ overflow: "visible" }}>
                  <line x1="40" y1="40" x2="180" y2="180" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                  <line x1="180" y1="40" x2="40" y2="180" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                </svg>
                
                {/* Top Term (c = 6, Multiply) */}
                <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
                  <span style={{ fontSize: "0.7rem", color: "#4ade80", fontWeight: "bold", display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>Multiply (·)</span>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#ffffff", fontFamily: "Outfit, sans-serif" }}>6</span>
                </div>

                {/* Bottom Term (b = 5, Add) */}
                <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
                  <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#ffffff", fontFamily: "Outfit, sans-serif" }}>5</span>
                  <span style={{ fontSize: "0.7rem", color: "#60a5fa", fontWeight: "bold", display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>Add (+)</span>
                </div>

                {/* Left Zone Box */}
                <div 
                  ref={leftZoneRef}
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    border: leftFactor !== null ? "2px solid #22c55e" : hoveredZone === "leftZone" ? "2.5px dashed #22c55e" : "2px dashed #475569",
                    backgroundColor: leftFactor !== null ? "rgba(34, 197, 94, 0.15)" : hoveredZone === "leftZone" ? "rgba(34, 197, 94, 0.1)" : "rgba(15, 23, 42, 0.6)",
                    color: leftFactor !== null ? "#4ade80" : "#64748b",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    transition: "all 0.15s ease",
                    fontFamily: "Outfit, sans-serif"
                  }}
                >
                  {leftFactor !== null ? leftFactor : "?"}
                </div>

                {/* Right Zone Box */}
                <div 
                  ref={rightZoneRef}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    border: rightFactor !== null ? "2px solid #22c55e" : hoveredZone === "rightZone" ? "2.5px dashed #22c55e" : "2px dashed #475569",
                    backgroundColor: rightFactor !== null ? "rgba(34, 197, 94, 0.15)" : hoveredZone === "rightZone" ? "rgba(34, 197, 94, 0.1)" : "rgba(15, 23, 42, 0.6)",
                    color: rightFactor !== null ? "#4ade80" : "#64748b",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    transition: "all 0.15s ease",
                    fontFamily: "Outfit, sans-serif"
                  }}
                >
                  {rightFactor !== null ? rightFactor : "?"}
                </div>
              </div>
            )}

            {/* Factored Blanks Row (Phase 2 - Visible when structure is revealed but not fully completed) */}
            {pageIndex === 0 && zone6xReplaced && zone9Replaced && !finalFactored && (
              <div 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  fontSize: "2rem", 
                  marginTop: "2rem", 
                  color: "#d8b4fe", 
                  gap: "0.2rem",
                  fontFamily: "Outfit, sans-serif" 
                }}
                className="animate-fade-in"
              >
                <span>(x + </span>
                <span 
                  ref={blankRef}
                  style={{
                    border: hoveredZone === "blank" ? "2.5px dashed #22c55e" : "2px dashed #a855f7",
                    backgroundColor: hoveredZone === "blank" ? "rgba(34, 197, 94, 0.15)" : "rgba(168, 85, 247, 0.08)",
                    padding: "0.1rem 0.8rem",
                    borderRadius: "8px",
                    color: hoveredZone === "blank" ? "#4ade80" : "#cbd5e1",
                    fontSize: "1.75rem",
                    transition: "all 0.15s ease",
                    transform: hoveredZone === "blank" ? "scale(1.05)" : "none",
                    margin: "0 0.25rem",
                    minWidth: "40px",
                    display: "inline-block",
                    textAlign: "center"
                  }}
                >
                  _
                </span>
                <span>)²</span>
              </div>
            )}

            {pageIndex === 1 && zone9Replaced && !finalFactored && (
              <div 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  fontSize: "1.8rem", 
                  marginTop: "2rem", 
                  color: "#d8b4fe", 
                  gap: "0.2rem",
                  fontFamily: "Outfit, sans-serif" 
                }}
                className="animate-fade-in"
              >
                <span>(x - </span>
                {factoredBlank1Replaced ? (
                  <span style={{ color: "#4ade80", fontWeight: "bold", padding: "0 0.2rem" }}>3</span>
                ) : (
                  <span 
                    ref={blank1Ref}
                    style={{
                      border: hoveredZone === "blank1" ? "2.5px dashed #22c55e" : "2px dashed #a855f7",
                      backgroundColor: hoveredZone === "blank1" ? "rgba(34, 197, 94, 0.15)" : "rgba(168, 85, 247, 0.08)",
                      padding: "0.1rem 0.6rem",
                      borderRadius: "8px",
                      color: hoveredZone === "blank1" ? "#4ade80" : "#cbd5e1",
                      fontSize: "1.5rem",
                      transition: "all 0.15s ease",
                      transform: hoveredZone === "blank1" ? "scale(1.05)" : "none",
                      margin: "0 0.25rem",
                      minWidth: "36px",
                      display: "inline-block",
                      textAlign: "center"
                    }}
                  >
                    _
                  </span>
                )}
                <span>)(x + </span>
                {factoredBlank2Replaced ? (
                  <span style={{ color: "#4ade80", fontWeight: "bold", padding: "0 0.2rem" }}>3</span>
                ) : (
                  <span 
                    ref={blank2Ref}
                    style={{
                      border: hoveredZone === "blank2" ? "2.5px dashed #22c55e" : "2px dashed #a855f7",
                      backgroundColor: hoveredZone === "blank2" ? "rgba(34, 197, 94, 0.15)" : "rgba(168, 85, 247, 0.08)",
                      padding: "0.1rem 0.6rem",
                      borderRadius: "8px",
                      color: hoveredZone === "blank2" ? "#4ade80" : "#cbd5e1",
                      fontSize: "1.5rem",
                      transition: "all 0.15s ease",
                      transform: hoveredZone === "blank2" ? "scale(1.05)" : "none",
                      margin: "0 0.25rem",
                      minWidth: "36px",
                      display: "inline-block",
                      textAlign: "center"
                    }}
                  >
                    _
                  </span>
                )}
                <span>)</span>
              </div>
            )}

            {pageIndex === 2 && !finalFactored && (
              <div 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  fontSize: "1.8rem", 
                  marginTop: "1.5rem", 
                  color: "#d8b4fe", 
                  gap: "0.2rem",
                  fontFamily: "Outfit, sans-serif" 
                }}
                className="animate-fade-in"
              >
                <span>(x + </span>
                <span style={{ color: leftFactor !== null ? "#4ade80" : "#64748b", fontWeight: "bold" }}>
                  {leftFactor !== null ? leftFactor : "_"}
                </span>
                <span>)(x + </span>
                <span style={{ color: rightFactor !== null ? "#4ade80" : "#64748b", fontWeight: "bold" }}>
                  {rightFactor !== null ? rightFactor : "_"}
                </span>
                <span>)</span>
              </div>
            )}

            {/* Draggable Number Pill (For pageIndex 0 & 1) */}
            {((pageIndex === 0 && !factoredBlankReplaced) || (pageIndex === 1 && !(factoredBlank1Replaced && factoredBlank2Replaced))) && (
              <div style={{ marginTop: "2.5rem", minHeight: "55px", display: "flex", alignItems: "center" }}>
                <div
                  onPointerDown={(e) => startDrag(e, 3)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    padding: "0.5rem 1.25rem",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "grab",
                    userSelect: "none",
                    touchAction: "none",
                    opacity: isDragging ? 0.3 : 1,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    border: "1.5px solid rgba(255,255,255,0.2)"
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>☰</span>
                  <span>3</span>
                </div>
              </div>
            )}

            {/* Draggable Factors bank (For pageIndex 2) */}
            {pageIndex === 2 && !finalFactored && (
              <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: "600" }}>Drag the correct factor pair of 6:</span>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {[1, 2, 3, 6].map((val) => {
                    const isUsed = leftFactor === val || rightFactor === val;
                    return (
                      <div
                        key={val}
                        onPointerDown={(e) => startDrag(e, val)}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#3b82f6",
                          color: "#ffffff",
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          cursor: isUsed ? "not-allowed" : "grab",
                          userSelect: "none",
                          touchAction: "none",
                          opacity: isUsed ? 0.25 : (isDragging && activeDragValue === val ? 0.3 : 1),
                          pointerEvents: isUsed ? "none" : "auto",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          border: "1.5px solid rgba(255,255,255,0.2)",
                          transition: "all 0.2s"
                        }}
                      >
                        {val}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Fixed Floating Clone during Dragging */}
            {isDragging && (
              <div
                style={{
                  position: "fixed",
                  left: `${dragPosition.x - dragStartOffset.current.x}px`,
                  top: `${dragPosition.y - dragStartOffset.current.y}px`,
                  zIndex: 9999,
                  pointerEvents: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: hoveredZone ? "#22c55e" : "#2563eb",
                  color: "#ffffff",
                  padding: "0.5rem 1.25rem",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                  border: "1.5px solid rgba(255,255,255,0.3)"
                }}
              >
                <span>{activeDragValue}</span>
              </div>
            )}

            {/* Factored Success Box */}
            {finalFactored && (
              <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#4ade80", fontFamily: "Outfit, sans-serif" }}>
                  {pageIndex === 0 ? "(x + 3)²" : pageIndex === 1 ? "(x - 3)(x + 3)" : `(x + ${leftFactor})(x + ${rightFactor})`}
                </div>
                <button
                  onClick={handleReset}
                  className="btn-secondary flex-center gap-1"
                  style={{ marginTop: "1.5rem", padding: "0.4rem 0.8rem", fontSize: "0.75rem", fontWeight: "bold" }}
                >
                  <RefreshCw size={12} /> Reset Interactive
                </button>
              </div>
            )}

          </div>
        ) : (
          /* ================= STANDARD STEP-BY-STEP LAYOUT ================= */
          <div style={{ textAlign: "center", width: "100%" }}>
            {step === 0 && (
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ffffff", fontFamily: "Outfit, sans-serif" }}>
                {config.original}
              </div>
            )}
            {step === 1 && (
              <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#d8b4fe", fontFamily: "Outfit, sans-serif" }}>
                {config.structured}
              </div>
            )}
            {step === 2 && (
              <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#4ade80", fontFamily: "Outfit, sans-serif", transform: "scale(1.05)", transition: "all 0.2s" }}>
                {config.factored}
              </div>
            )}
          </div>
        )}

        {/* Steps Navigator (only for standard layout) */}
        {!isDragPage && (
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            <button
              onClick={handleNextStep}
              className="btn-primary btn-small"
              style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.4rem 1rem", fontSize: "0.8rem" }}
            >
              <Layers size={14} /> 
              {step === 0 && "Show Structure"}
              {step === 1 && "Factor Expression"}
              {step === 2 && "Reset Pattern"}
            </button>
            
            {step > 0 && (
              <button
                onClick={handleReset}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                <RefreshCw size={12} /> Reset
              </button>
            )}
          </div>
        )}
      </div>

      {/* Info Card explaining the active step */}
      <div 
        className="info-card" 
        style={{
          padding: "1.5rem",
          borderRadius: "1rem",
          border: "1.5px solid #1e293b",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)"
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <div style={{ padding: "0.75rem", backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "0.75rem", color: "#3b82f6", marginTop: "0.25rem" }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#ffffff", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {isDragPage ? (
                pageIndex === 0 ? (
                  finalFactored 
                    ? "Factored Equivalent Form" 
                    : (zone6xReplaced && zone9Replaced ? "Stage 2: Factor Binomial" : "Stage 1: Rewrite Structure")
                ) : pageIndex === 1 ? (
                  finalFactored 
                    ? "Factored Equivalent Form" 
                    : (zone9Replaced ? "Stage 2: Factor Binomial" : "Stage 1: Rewrite Structure")
                ) : (
                  finalFactored
                    ? "Factored Equivalent Form"
                    : "The Big X Method"
                )
              ) : (
                <>
                  {step === 0 && "Original Expression"}
                  {step === 1 && "Reveal Pattern Structure"}
                  {step === 2 && "Factored Equivalent Form"}
                </>
              )}
            </h4>
            <p style={{ fontSize: "0.95rem", color: "#cbd5e1", marginTop: "0.5rem", lineHeight: "1.6" }}>
              {isDragPage ? (
                pageIndex === 0 ? (
                  finalFactored 
                    ? "Perfect square trinomials factor cleanly into the square of a binomial: (x + 3)²."
                    : (zone6xReplaced && zone9Replaced
                        ? "Great job! The structured form is revealed. Now, drag the number 3 into the blank space inside (x + _)² to factor it completely!"
                        : "A perfect square trinomial follows the template a² + 2ab + b² = (a + b)². Drag the number 3 (since √9 = 3) into 9 to make it (3)² and into 6x to make it 2(x)(3).")
                ) : pageIndex === 1 ? (
                  finalFactored
                    ? "The difference of two perfect squares factors cleanly into the product of conjugate binomials: (x - 3)(x + 3)."
                    : (zone9Replaced
                        ? "Awesome! The structured form is revealed. Now, drag the number 3 into both blank spaces inside the binomials to factor it completely!"
                        : "A difference of squares follows the template a² - b² = (a - b)(a + b). Drag the number 3 (since √9 = 3) into the constant term 9 to rewrite it as a perfect square: (3)².")
                ) : (
                  finalFactored
                    ? "Trinomials factor into the product of binomials: (x + 2)(x + 3)."
                    : "The Big X Method helps us find factors. The top number is the product (c = 6) and the bottom number is the sum (b = 5). Drag the correct factor pair (2 and 3) of 6 into the left and right spots to populate the binomial form!"
                )
              ) : (
                <>
                  {step === 0 && config.explanation0}
                  {step === 1 && config.explanation1}
                  {step === 2 && config.explanation2}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
