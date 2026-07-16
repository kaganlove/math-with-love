import React, { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Scale } from "lucide-react";

export default function EquationVisualizer({ steps }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  const step = steps[currentStep];

  // Helper to get CSS class for term color-coding
  const getColorClass = (color) => {
    switch (color) {
      case "blue": return "term-variable"; // Variable terms (blue)
      case "orange": return "term-constant"; // Constant terms (orange)
      case "green": return "term-solved"; // Final answer (green)
      case "red": return "term-operation-active"; // Active operation (red)
      default: return "term-slate"; // Unmodified slate terms
    }
  };

  // Helper to render the contents of a plate with hand-drawn whiteboard animations
  const renderPlate = (plate) => {
    if (plate.type === "expression") {
      // 1. Whiteboard Distribution Arrow Overlay
      if (plate.action === "distribute") {
        return (
          <div className="distribution-container">
            <svg className="distribution-svg" viewBox="0 0 120 40">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
                </marker>
              </defs>
              {/* Arrow 1: Distributing coefficient 3 to term x */}
              <path d="M 12 32 Q 22 8 36 28" className="distribution-arrow-path arrow-delay-1" markerEnd="url(#arrow)" />
              {/* Arrow 2: Distributing coefficient 3 to constant 2 */}
              <path d="M 12 32 Q 38 4 60 28" className="distribution-arrow-path arrow-delay-2" markerEnd="url(#arrow)" />
            </svg>
            <span className="math-term term-slate">{plate.terms[0].val}</span>
          </div>
        );
      }

      // 2. Whiteboard Combining Underline Loop
      if (plate.action === "combine") {
        return (
          <div className="expression-row">
            <span className="math-term term-slate">{plate.terms[0].val}</span>
            <div className="whiteboard-combine">
              <span className="math-term term-constant">{plate.terms[1].val}</span>
              <span className="math-term term-constant">{plate.terms[2].val}</span>
            </div>
          </div>
        );
      }

      return (
        <div className="expression-row">
          {plate.terms.map((t, idx) => (
            <span
              key={idx}
              className={`math-term ${getColorClass(t.color)} ${t.active ? "animate-highlight" : ""}`}
            >
              {t.val}
            </span>
          ))}
        </div>
      );
    }

    if (plate.type === "operation") {
      // 3. Whiteboard Cancellation Slash on subtraction columns
      if (plate.operationType === "subtract") {
        const isCancelled = plate.action === "cancel";
        return (
          <div className="vertical-operation-layout">
            <div className="expression-row">
              {plate.terms.map((t, idx) => {
                const shouldSlash = isCancelled && t.val.includes("1");
                return (
                  <span
                    key={idx}
                    className={`math-term ${getColorClass(t.color)} ${shouldSlash ? "whiteboard-slash" : ""}`}
                  >
                    {t.val}
                  </span>
                );
              })}
            </div>
            <div className={`subtraction-row animate-operation-fade ${isCancelled ? "whiteboard-slash" : ""}`}>
              <span>{plate.opVal}</span>
            </div>
          </div>
        );
      }

      // 4. Whiteboard Cancellation Slash on fraction division numerator/denominator
      if (plate.operationType === "divide") {
        const isCancelled = plate.action === "cancel-division";
        return (
          <div className="fraction-layout animate-operation-fade">
            <div className="fraction-numerator">
              {plate.terms.map((t, idx) => {
                if (isCancelled && t.val === "3x") {
                  return (
                    <span key={idx} className="flex-center">
                      <span className="math-term term-variable whiteboard-slash">3</span>
                      <span className="math-term term-variable">x</span>
                    </span>
                  );
                }
                return (
                  <span key={idx} className={`math-term ${getColorClass(t.color)}`}>
                    {t.val}
                  </span>
                );
              })}
            </div>
            <div className="fraction-line" />
            <div className={`fraction-denominator term-operation-divide ${isCancelled ? "whiteboard-slash" : ""}`}>
              {plate.opVal}
            </div>
          </div>
        );
      }
    }

    return null;
  };

  return (
    <div className="visualizer-card">
      <div className="visualizer-header">
        <Scale size={20} className="text-primary" />
        <h4>Step-by-Step Whiteboard Balancer</h4>
      </div>

      <p className="visualizer-intro">
        Watch balancing operations draw directly on the scale plates. Click the buttons below to proceed step-by-step.
      </p>

      {/* Large Equation Typewriter Display */}
      <div className="visualizer-equation-display text-center">
        <code>{step.equation}</code>
      </div>

      {/* The Balancing Scale Display */}
      <div className="scale-container">
        <div className="scale-beam-wrapper">
          {/* Left Side Plate */}
          <div className={`scale-plate left-plate ${step.left.action || step.left.type === "operation" ? "active-plate" : ""}`}>
            <div className="plate-contents">
              {renderPlate(step.left)}
            </div>
            <div className="plate-base" />
          </div>

          {/* Equal Sign Pivot */}
          <div className="scale-pivot-equal">
            <span className="equal-symbol">=</span>
          </div>

          {/* Right Side Plate */}
          <div className={`scale-plate right-plate ${step.right.action || step.right.type === "operation" ? "active-plate" : ""}`}>
            <div className="plate-contents">
              {renderPlate(step.right)}
            </div>
            <div className="plate-base" />
          </div>
        </div>
        
        {/* Support Stand */}
        <div className="scale-stand">
          <div className="stand-pole" />
          <div className="stand-base" />
        </div>
      </div>

      {/* Step Description */}
      <div className="step-description-box">
        <div className="step-counter">
          Step {currentStep + 1} of {steps.length}
        </div>
        <p className="step-text-body">{step.desc}</p>
      </div>

      {/* Manual Click-Through Controls */}
      <div className="visualizer-controls">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="btn-control flex-center gap-1"
          title="Previous Step"
        >
          <ArrowLeft size={16} /> <span>Back</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="btn-control btn-play flex-center gap-1"
          title="Next Step"
        >
          <span>Next Step</span> <ArrowRight size={16} />
        </button>

        <button
          onClick={handleReset}
          className="btn-control"
          title="Reset"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="visualizer-progress-bg">
        <div
          className="visualizer-progress-fill"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
