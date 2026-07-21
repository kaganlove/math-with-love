import React, { useState } from "react";
import { Sparkles, RefreshCw, Layers } from "lucide-react";

export default function ExpressionStructureVisualizer() {
  const [activeTab, setActiveTab] = useState("squares"); // "squares" | "grouping"
  const [step, setStep] = useState(0); // 0: original, 1: structured/grouped, 2: factored

  const handleNextStep = () => {
    setStep((prev) => (prev < 2 ? prev + 1 : 0));
  };

  const handleReset = () => {
    setStep(0);
  };

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
          Interactive Structure Visualizer
        </span>
        <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginTop: "0.5rem", color: "#ffffff" }}>
          Explore patterns to rewrite expressions step-by-step!
        </h3>
      </div>

      {/* Tab Switchers */}
      <div 
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem"
        }}
      >
        <button
          onClick={() => { setActiveTab("squares"); setStep(0); }}
          className="btn-mode-tab"
          style={{
            background: activeTab === "squares" ? "#6366f1" : "rgba(30, 41, 59, 0.5)",
            border: "1px solid #475569",
            color: "#ffffff",
            padding: "0.4rem 1rem",
            fontSize: "0.8rem",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Difference of Squares
        </button>
        <button
          onClick={() => { setActiveTab("grouping"); setStep(0); }}
          className="btn-mode-tab"
          style={{
            background: activeTab === "grouping" ? "#6366f1" : "rgba(30, 41, 59, 0.5)",
            border: "1px solid #475569",
            color: "#ffffff",
            padding: "0.4rem 1rem",
            fontSize: "0.8rem",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Factoring by Grouping
        </button>
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
        {activeTab === "squares" ? (
          /* ================= DIFFERENCE OF SQUARES ================= */
          <div style={{ textAlign: "center", width: "100%" }}>
            {step === 0 && (
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ffffff", fontFamily: "Outfit, sans-serif" }}>
                x² - 9
              </div>
            )}
            {step === 1 && (
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#d8b4fe", fontFamily: "Outfit, sans-serif" }}>
                (x)² - (3)²
              </div>
            )}
            {step === 2 && (
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#4ade80", fontFamily: "Outfit, sans-serif", transform: "scale(1.05)", transition: "all 0.2s" }}>
                (x - 3)(x + 3)
              </div>
            )}
          </div>
        ) : (
          /* ================= FACTORING BY GROUPING ================= */
          <div style={{ textAlign: "center", width: "100%" }}>
            {step === 0 && (
              <div style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#ffffff", fontFamily: "Outfit, sans-serif" }}>
                x³ + 2x² + 3x + 6
              </div>
            )}
            {step === 1 && (
              <div style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#d8b4fe", fontFamily: "Outfit, sans-serif" }}>
                x²(x + 2) + 3(x + 2)
              </div>
            )}
            {step === 2 && (
              <div style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#4ade80", fontFamily: "Outfit, sans-serif", transform: "scale(1.05)", transition: "all 0.2s" }}>
                (x² + 3)(x + 2)
              </div>
            )}
          </div>
        )}

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

      {/* Info Card explaining the concept */}
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
            {activeTab === "squares" ? (
              <div>
                <h4 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#ffffff", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Difference of Squares
                </h4>
                {step === 0 && (
                  <p style={{ fontSize: "0.95rem", color: "#cbd5e1", marginTop: "0.5rem", lineHeight: "1.6" }}>
                    Identify if the expression fits the template $a^2 - b^2$. Here, $x^2$ is a perfect square, and $9$ is also a perfect square ($3^2$), separated by subtraction.
                  </p>
                )}
                {step === 1 && (
                  <p style={{ fontSize: "0.95rem", color: "#d8b4fe", marginTop: "0.5rem", lineHeight: "1.6" }}>
                    Rewrite each term as a squared base to clearly isolate the values of $a$ and $b$. In this case, $a = x$ and $b = 3$.
                  </p>
                )}
                {step === 2 && (
                  <p style={{ fontSize: "0.95rem", color: "#4ade80", marginTop: "0.5rem", lineHeight: "1.6" }}>
                    Apply the factoring template: $(a - b)(a + b)$. Substituting our bases gives the fully factored expression: <strong>(x - 3)(x + 3)</strong>.
                  </p>
                )}
              </div>
            ) : (
              <div>
                <h4 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#ffffff", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Factoring by Grouping
                </h4>
                {step === 0 && (
                  <p style={{ fontSize: "0.95rem", color: "#cbd5e1", marginTop: "0.5rem", lineHeight: "1.6" }}>
                    Factoring by grouping is used for polynomials with four terms. We split the terms into two separate groups: $(x^3 + 2x^2)$ and $(3x + 6)$.
                  </p>
                )}
                {step === 1 && (
                  <p style={{ fontSize: "0.95rem", color: "#d8b4fe", marginTop: "0.5rem", lineHeight: "1.6" }}>
                    Factor out the Greatest Common Factor (GCF) from each group. For the first group, we factor out $x^2$, and for the second group, we factor out $3$. Notice how the remaining binomial $(x + 2)$ is identical!
                  </p>
                )}
                {step === 2 && (
                  <p style={{ fontSize: "0.95rem", color: "#4ade80", marginTop: "0.5rem", lineHeight: "1.6" }}>
                    Finally, factor out the common binomial group $(x + 2)$ as a single entity, combining the remaining GCFs into the other binomial factor: <strong>(x² + 3)(x + 2)</strong>.
                  </p>
                )}
              </div>
            )}
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", fontStyle: "italic", margin: "0.25rem 0 0 0" }}>
              <strong>Rule template:</strong> $a^2 - b^2 = (a - b)(a + b)$ or $x(a + b) + y(a + b) = (x + y)(a + b)$.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
