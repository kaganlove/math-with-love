import React, { useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Scale } from "lucide-react";

export default function EquationVisualizer({ steps }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500); // Wait 3.5s per step to let the student read the description
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

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
    setIsPlaying(false);
  };

  const step = steps[currentStep];

  // Helper to get CSS class for term color-coding
  const getColorClass = (color) => {
    switch (color) {
      case "blue": return "term-variable"; // Variable terms (blue)
      case "orange": return "term-constant"; // Constant terms (orange)
      case "green": return "term-solved"; // Final answer (green)
      default: return "term-slate"; // Unmodified slate terms
    }
  };

  return (
    <div className="visualizer-card">
      <div className="visualizer-header">
        <Scale size={20} className="text-primary" />
        <h4>Interactive Equation Balancer</h4>
      </div>

      <p className="visualizer-intro">
        Watch how operations are balanced on both sides of the equal sign.
      </p>

      {/* The Balancing Scale Display */}
      <div className="scale-container">
        <div className="scale-beam-wrapper">
          {/* Left Side Plate */}
          <div className={`scale-plate left-plate ${step.leftTerms.some(t => t.active) ? "active-plate" : ""}`}>
            <div className="plate-contents">
              {step.leftTerms.map((t, idx) => (
                <span
                  key={idx}
                  className={`math-term ${getColorClass(t.color)} ${t.active ? "animate-highlight" : ""}`}
                >
                  {t.val}
                </span>
              ))}
            </div>
            <div className="plate-base" />
          </div>

          {/* Equal Sign Pivot */}
          <div className="scale-pivot-equal">
            <span className="equal-symbol">=</span>
          </div>

          {/* Right Side Plate */}
          <div className={`scale-plate right-plate ${step.rightTerms.some(t => t.active) ? "active-plate" : ""}`}>
            <div className="plate-contents">
              {step.rightTerms.map((t, idx) => (
                <span
                  key={idx}
                  className={`math-term ${getColorClass(t.color)} ${t.active ? "animate-highlight" : ""}`}
                >
                  {t.val}
                </span>
              ))}
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

      {/* Controls */}
      <div className="visualizer-controls">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="btn-control"
          title="Previous Step"
        >
          <SkipBack size={16} />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`btn-control btn-play ${isPlaying ? "playing" : ""}`}
          title={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="btn-control"
          title="Next Step"
        >
          <SkipForward size={16} />
        </button>

        <button
          onClick={handleReset}
          className="btn-control"
          title="Reset Animation"
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
