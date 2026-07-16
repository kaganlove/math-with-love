import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function ExpressionPartsVisualizer() {
  const [activeIndex, setActiveIndex] = useState(0);

  const parts = [
    {
      name: "Coefficient",
      color: "purple",
      text: "3",
      explanation: "A coefficient is a number multiplied by a variable, group, or term. It scales the value of the term it belongs to.",
      context: "In this expression, 3 is the coefficient scaling the binomial factor group (x + 4)²."
    },
    {
      name: "Binomial Factor",
      color: "green",
      text: "(x + 4)",
      explanation: "A factor is a quantity being multiplied by another quantity. Since (x + 4) has two terms, it is called a binomial factor.",
      context: "Here, (x + 4) is multiplied by itself (due to the exponent) and scaled by the coefficient 3."
    },
    {
      name: "Exponent",
      color: "orange",
      text: "²",
      explanation: "An exponent indicates how many times a base quantity is multiplied by itself.",
      context: "The exponent ² means the binomial factor base (x + 4) is squared (multiplied by itself)."
    },
    {
      name: "Coefficient",
      color: "red",
      text: "-5",
      explanation: "A coefficient is the numerical part of a term containing variables. When a term has a subtraction sign, the negative sign belongs to the coefficient.",
      context: "The coefficient here is -5, which is multiplied by the variable x."
    },
    {
      name: "Variable",
      color: "blue",
      text: "x",
      explanation: "A variable is a symbol (usually a letter) that represents an unknown or changing value.",
      context: "The letter x is the variable here. Its value determines the output of the expression."
    },
    {
      name: "Constant Term",
      color: "amber",
      text: "+ 12",
      explanation: "A constant term is a number that stands alone. It has a fixed value and is not multiplied by any variable.",
      context: "The number 12 is a constant term because its value remains exactly 12 regardless of what x is."
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev < parts.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : parts.length - 1));
  };

  return (
    <div 
      className="interactive-parts-card" 
      style={{
        padding: "2rem",
        backgroundColor: "#0f172a",
        color: "#f1f5f9",
        borderRadius: "1rem",
        border: "1.5px solid #1e293b",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "1.5rem"
      }}
    >
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
          Interactive Expression Visualizer
        </span>
        <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginTop: "0.5rem", color: "#ffffff" }}>
          Click parts of the expression below to explore!
        </h3>
      </div>

      {/* Standard Form Display */}
      <div style={{
        textAlign: "center",
        marginTop: "-0.5rem",
        marginBottom: "1rem",
        color: "#94a3b8",
        fontSize: "1rem",
        fontFamily: "sans-serif"
      }}>
        Standard Expression: <code style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: "bold", marginLeft: "6px" }}>3(x + 4)² - 5x + 12</code>
      </div>

      {/* Main Interactive Expression Row - Formatted to fit on one line */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "nowrap",
        gap: "0.15rem",
        padding: "2rem 1.5rem",
        backgroundColor: "rgba(2, 6, 23, 0.6)",
        borderRadius: "0.75rem",
        border: "1.5px solid rgba(30, 41, 59, 0.8)",
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
        fontFamily: "monospace",
        fontSize: "2rem",
        userSelect: "none",
        overflowX: "auto"
      }}>
        {parts.map((part, idx) => {
          const isActive = idx === activeIndex;
          let colorStyle = {};
          
          if (isActive) {
            switch (part.color) {
              case "purple": colorStyle = { color: "#c084fc", backgroundColor: "rgba(192, 132, 252, 0.2)", transform: "scale(1.15)", boxStyle: "0 12px 20px -3px rgba(192, 132, 252, 0.3)" }; break;
              case "green": colorStyle = { color: "#34d399", backgroundColor: "rgba(52, 211, 153, 0.2)", transform: "scale(1.15)", boxStyle: "0 12px 20px -3px rgba(52, 211, 153, 0.3)" }; break;
              case "orange": colorStyle = { color: "#fb923c", backgroundColor: "rgba(251, 146, 60, 0.2)", transform: "scale(1.15)", boxStyle: "0 12px 20px -3px rgba(251, 146, 60, 0.3)" }; break;
              case "red": colorStyle = { color: "#f87171", backgroundColor: "rgba(248, 113, 113, 0.2)", transform: "scale(1.15)", boxStyle: "0 12px 20px -3px rgba(248, 113, 113, 0.3)" }; break;
              case "blue": colorStyle = { color: "#38bdf8", backgroundColor: "rgba(56, 189, 248, 0.2)", transform: "scale(1.15)", boxStyle: "0 12px 20px -3px rgba(56, 189, 248, 0.3)" }; break;
              case "amber": colorStyle = { color: "#fbbf24", backgroundColor: "rgba(251, 191, 36, 0.2)", transform: "scale(1.15)", boxStyle: "0 12px 20px -3px rgba(251, 191, 36, 0.3)" }; break;
            }
          } else {
            switch (part.color) {
              case "purple": colorStyle = { color: "#d8b4fe" }; break;
              case "green": colorStyle = { color: "#6ee7b7" }; break;
              case "orange": colorStyle = { color: "#fdbb2d" }; break;
              case "red": colorStyle = { color: "#fca5a5" }; break;
              case "blue": colorStyle = { color: "#7dd3fc" }; break;
              case "amber": colorStyle = { color: "#fde047" }; break;
            }
          }

          return (
            <span
              key={idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                cursor: "pointer",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "inline-block",
                ...colorStyle
              }}
              className={isActive ? "ring-2 ring-white/30 font-bold" : "hover:bg-white/5"}
            >
              {part.text}
            </span>
          );
        })}
      </div>

      {/* Stepper Navigation - Centered, Spaced Out, and matching tab button styles */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1.5rem",
        marginBottom: "2rem",
        width: "100%"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "2.5rem",
          width: "100%"
        }}>
          <button
            onClick={handlePrev}
            className="btn-primary btn-small flex-center gap-2"
            style={{
              minWidth: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ArrowLeft size={14} /> <span>Prev Part</span>
          </button>
          
          <span 
            style={{
              fontSize: "0.875rem",
              fontWeight: "700",
              color: "#cbd5e1",
              fontFamily: "monospace",
              padding: "0.375rem 1rem",
              backgroundColor: "rgba(2, 6, 23, 0.8)",
              borderRadius: "0.5rem",
              border: "1.5px solid #1e293b"
            }}
          >
            Part {activeIndex + 1} of {parts.length}
          </span>

          <button
            onClick={handleNext}
            className="btn-primary btn-small flex-center gap-2"
            style={{
              minWidth: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <span>Next Part</span> <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* active Info Card */}
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
                  parts[activeIndex].color === "orange" ? "#fb923c" :
                  parts[activeIndex].color === "red" ? "#f87171" :
                  parts[activeIndex].color === "blue" ? "#38bdf8" : "#fbbf24"
              }}></span>
            </h4>
            <p style={{ color: "#e2e8f0", fontSize: "0.875rem", marginTop: "0.75rem", lineHeight: "1.6", marginBlockEnd: 0 }}>
              {parts[activeIndex].explanation}
            </p>
            <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "0.75rem", fontSize: "0.75rem", color: "#94a3b8", fontStyle: "italic", lineHeight: "1.6" }}>
              <strong>Context: </strong>{parts[activeIndex].context}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
