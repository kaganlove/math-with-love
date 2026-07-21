import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function ExpressionCompoundVisualizer() {
  const [activeIndex, setActiveIndex] = useState(0);

  const parts = [
    {
      name: "Coefficient",
      color: "purple",
      text: "5",
      explanation: "A coefficient is a numerical factor that scales a variable or grouping.",
      context: "In this expression, 5 is the coefficient scaling the compound binomial group (x + 3)²."
    },
    {
      name: "Compound Group",
      color: "green",
      text: "(x + 3)",
      explanation: "This is a compound expression containing a variable and a constant. We can treat this entire block as a single entity 'u' to simplify the formula.",
      context: "If we define u = (x + 3), we can rewrite this entire binomial group as just 'u'."
    },
    {
      name: "Exponent",
      color: "orange",
      text: "²",
      explanation: "An exponent indicates how many times a base quantity is multiplied by itself.",
      context: "The exponent ² means our compound group u is squared, giving us u²."
    },
    {
      name: "Constant Term",
      color: "amber",
      text: "- 4",
      explanation: "A constant term is a number with a fixed value that is not multiplied by any variable.",
      context: "The number -4 is a constant term. Its value remains exactly -4 regardless of what x or u is."
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev < parts.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : parts.length - 1));
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
          Interactive Compound Entity Visualizer
        </span>
        <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginTop: "0.5rem", color: "#ffffff" }}>
          Click parts of the expression to see u-substitution in action!
        </h3>
      </div>

      {/* Standard Form vs u-Substitution Display */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center", marginBottom: "1.5rem" }}>
        <div className="standard-expression-container" style={{ margin: 0 }}>
          Compound Expression: <code className="standard-expression-code">5(x + 3)² - 4</code>
        </div>
        <div className="standard-expression-container" style={{ margin: 0, backgroundColor: "rgba(34, 197, 94, 0.15)", borderColor: "rgba(34, 197, 94, 0.3)" }}>
          u-Substitution Form: <code className="standard-expression-code" style={{ color: "#4ade80" }}>5u² - 4</code> <span style={{ fontSize: "0.75rem", color: "#a3a3a3", marginLeft: "0.5rem" }}>(where u = x + 3)</span>
        </div>
      </div>

      {/* Main Interactive Expression Row */}
      <div className="expression-row-container">
        {parts.map((part, idx) => {
          const isActive = idx === activeIndex;
          let colorStyle = {};
          
          if (isActive) {
            switch (part.color) {
              case "purple": colorStyle = { color: "#c084fc", backgroundColor: "rgba(192, 132, 252, 0.2)", transform: "scale(1.15)", boxStyle: "0 12px 20px -3px rgba(192, 132, 252, 0.3)" }; break;
              case "green": colorStyle = { color: "#34d399", backgroundColor: "rgba(52, 211, 153, 0.2)", transform: "scale(1.15)", boxStyle: "0 12px 20px -3px rgba(52, 211, 153, 0.3)" }; break;
              case "orange": colorStyle = { color: "#fb923c", backgroundColor: "rgba(251, 146, 60, 0.2)", transform: "scale(1.15)", boxStyle: "0 12px 20px -3px rgba(251, 146, 60, 0.3)" }; break;
              case "amber": colorStyle = { color: "#fbbf24", backgroundColor: "rgba(251, 191, 36, 0.2)", transform: "scale(1.15)", boxStyle: "0 12px 20px -3px rgba(251, 191, 36, 0.3)" }; break;
            }
          } else {
            switch (part.color) {
              case "purple": colorStyle = { color: "#d8b4fe" }; break;
              case "green": colorStyle = { color: "#6ee7b7" }; break;
              case "orange": colorStyle = { color: "#fdbb2d" }; break;
              case "amber": colorStyle = { color: "#fde047" }; break;
            }
          }

          return (
            <span
              key={idx}
              onClick={() => setActiveIndex(idx)}
              style={colorStyle}
              className={`expression-part-span ${isActive ? "ring-2 ring-white/30 font-bold" : "hover:bg-white/5"}`}
            >
              {part.text}
            </span>
          );
        })}
      </div>

      {/* Stepper Navigation */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1.5rem",
        marginBottom: "2rem",
        width: "100%"
      }}>
        <div className="stepper-nav-row">
          <button
            onClick={handlePrev}
            className="btn-primary btn-small flex-center gap-2"
          >
            <ArrowLeft size={14} /> <span>Prev Part</span>
          </button>
          
          <span className="stepper-part-label">
            Part {activeIndex + 1} of {parts.length}
          </span>

          <button
            onClick={handleNext}
            className="btn-primary btn-small flex-center gap-2"
          >
            <span>Next Part</span> <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Active Info Card */}
      <div 
        className="info-card" 
        style={{
          padding: "1.5rem",
          borderRadius: "1rem",
          border: "1.5px solid #1e293b",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          marginTop: "1rem",
          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "8rem",
          height: "8rem",
          backgroundColor: "rgba(255, 255, 255, 0.01)",
          borderRadius: "9999px",
          filter: "blur(24px)",
          transform: "translate(3rem, -3rem)"
        }}></div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <div style={{ padding: "0.75rem", backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "0.75rem", color: "#3b82f6", marginTop: "0.25rem" }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#ffffff", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {parts[activeIndex].name}
              <span style={{
                display: "inline-block",
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "9999px",
                backgroundColor: 
                  parts[activeIndex].color === "purple" ? "#c084fc" :
                  parts[activeIndex].color === "green" ? "#34d399" :
                  parts[activeIndex].color === "orange" ? "#fb923c" : "#fbbf24"
              }}></span>
            </h4>
            <p style={{ fontSize: "0.95rem", color: "#cbd5e1", marginTop: "0.5rem", marginBottom: "0.25rem", lineHeight: "1.6" }}>
              {parts[activeIndex].explanation}
            </p>
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", fontStyle: "italic", margin: 0 }}>
              <strong>In Context:</strong> {parts[activeIndex].context}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
