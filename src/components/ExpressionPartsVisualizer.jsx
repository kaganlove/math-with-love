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
      context: "In this expression, 3 is the coefficient scaling the binomial factor group (x + 4)³."
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
    <div className="interactive-parts-card p-6 bg-slate-900 text-slate-100 rounded-2xl shadow-xl border border-slate-800">
      <div className="text-center mb-6">
        <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
          Interactive Expression Visualizer
        </span>
        <h3 className="text-lg font-bold mt-2 text-white">Click parts of the expression below to explore!</h3>
      </div>

      {/* Main Interactive Expression Row */}
      <div className="flex justify-center items-center gap-1 py-8 px-4 bg-slate-950/60 rounded-xl border border-slate-800/80 mb-6 font-mono text-2xl md:text-3xl select-none">
        {parts.map((part, idx) => {
          const isActive = idx === activeIndex;
          let colorStyle = {};
          
          if (isActive) {
            switch (part.color) {
              case "purple": colorStyle = { color: "#c084fc", backgroundColor: "rgba(192, 132, 252, 0.2)", transform: "scale(1.1)", boxShadow: "0 10px 15px -3px rgba(192, 132, 252, 0.2)" }; break;
              case "green": colorStyle = { color: "#34d399", backgroundColor: "rgba(52, 211, 153, 0.2)", transform: "scale(1.1)", boxShadow: "0 10px 15px -3px rgba(52, 211, 153, 0.2)" }; break;
              case "orange": colorStyle = { color: "#fb923c", backgroundColor: "rgba(251, 146, 60, 0.2)", transform: "scale(1.1)", boxShadow: "0 10px 15px -3px rgba(251, 146, 60, 0.2)" }; break;
              case "red": colorStyle = { color: "#f87171", backgroundColor: "rgba(248, 113, 113, 0.2)", transform: "scale(1.1)", boxShadow: "0 10px 15px -3px rgba(248, 113, 113, 0.2)" }; break;
              case "blue": colorStyle = { color: "#38bdf8", backgroundColor: "rgba(56, 189, 248, 0.2)", transform: "scale(1.1)", boxShadow: "0 10px 15px -3px rgba(56, 189, 248, 0.2)" }; break;
              case "amber": colorStyle = { color: "#fbbf24", backgroundColor: "rgba(251, 191, 36, 0.2)", transform: "scale(1.1)", boxShadow: "0 10px 15px -3px rgba(251, 191, 36, 0.2)" }; break;
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
                padding: "0.25rem 0.5rem",
                borderRadius: "0.375rem",
                transition: "all 0.3s ease",
                display: "inline-block",
                ...colorStyle
              }}
              className={isActive ? "ring-2 ring-white/20 font-bold" : "hover:bg-white/5"}
            >
              {part.text}
            </span>
          );
        })}
      </div>

      {/* Stepper Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg text-sm transition-colors border border-slate-700"
        >
          <ArrowLeft size={16} /> Prev Part
        </button>
        <span className="text-sm font-semibold text-slate-400 font-mono">
          Part {activeIndex + 1} of {parts.length}
        </span>
        <button
          onClick={handleNext}
          className="flex items-center gap-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-lg text-sm transition-colors border border-slate-700"
        >
          Next Part <ArrowRight size={16} />
        </button>
      </div>

      {/* active Info Card */}
      <div className="info-card p-5 rounded-xl border border-slate-800/80 bg-slate-900/60 relative overflow-hidden transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl transform translate-x-12 -translate-y-12"></div>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white/5 rounded-lg text-primary">
            <Sparkles size={18} />
          </div>
          <div>
            <h4 className="text-md font-bold text-white uppercase tracking-wider flex items-center gap-2">
              {parts[activeIndex].name}
              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{
                backgroundColor: 
                  parts[activeIndex].color === "purple" ? "#c084fc" :
                  parts[activeIndex].color === "green" ? "#34d399" :
                  parts[activeIndex].color === "orange" ? "#fb923c" :
                  parts[activeIndex].color === "red" ? "#f87171" :
                  parts[activeIndex].color === "blue" ? "#38bdf8" : "#fbbf24"
              }}></span>
            </h4>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              {parts[activeIndex].explanation}
            </p>
            <div className="mt-4 p-3 bg-white/[0.02] border border-white/5 rounded-lg text-xs text-slate-400 italic font-sans leading-relaxed">
              <strong>Context: </strong>{parts[activeIndex].context}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
