import React, { useState, useEffect } from "react";
import { Sparkles, RefreshCw, Layers } from "lucide-react";

export default function ExpressionStructureVisualizer({ pageIndex = 0 }) {
  const [step, setStep] = useState(0); // 0: original, 1: structured/grouped, 2: factored

  // Reset step whenever page changes
  useEffect(() => {
    setStep(0);
  }, [pageIndex]);

  const handleNextStep = () => {
    setStep((prev) => (prev < 2 ? prev + 1 : 0));
  };

  const handleReset = () => {
    setStep(0);
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

  return (
    <div className="interactive-parts-card">
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
          Step-by-Step Factoring Pattern
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
          minHeight: "180px",
          position: "relative",
          margin: "1rem 0"
        }}
      >
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

        {/* Steps Navigator */}
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
              {step === 0 && "Original Expression"}
              {step === 1 && "Reveal Pattern Structure"}
              {step === 2 && "Factored Equivalent Form"}
            </h4>
            <p style={{ fontSize: "0.95rem", color: "#cbd5e1", marginTop: "0.5rem", lineHeight: "1.6" }}>
              {step === 0 && config.explanation0}
              {step === 1 && config.explanation1}
              {step === 2 && config.explanation2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
