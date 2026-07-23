import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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

  // Grouping states for pageIndex = 3
  const [groupingStep, setGroupingStep] = useState(0);
  const [splitChoiceError, setSplitChoiceError] = useState(null);
  const [middleTermSplitDropdownOpen, setMiddleTermSplitDropdownOpen] = useState(false);
  const [leftGCFExtracted, setLeftGCFExtracted] = useState(false);
  const [rightGCFExtracted, setRightGCFExtracted] = useState(false);
  const [leftGCFSelectionOpen, setLeftGCFSelectionOpen] = useState(false);
  const [rightGCFSelectionOpen, setRightGCFSelectionOpen] = useState(false);
  const [leftGCFError, setLeftGCFError] = useState(null);
  const [rightGCFError, setRightGCFError] = useState(null);
  const [leftGCFAnimationState, setLeftGCFAnimationState] = useState("none"); // "none" | "division" | "simplified"
  const [rightGCFAnimationState, setRightGCFAnimationState] = useState("none"); // "none" | "division" | "simplified"
  
  // Drag targets in grouping stage 3
  const [finalCommonFactorDropped, setFinalCommonFactorDropped] = useState(false);
  const [leftGCFDropped, setLeftGCFDropped] = useState(false);
  const [rightGCFDropped, setRightGCFDropped] = useState(false);

  // Slip 'n Slide states for pageIndex = 4
  const [slipStep, setSlipStep] = useState(0); // 0 (Slip animation), 1 (Big X Factoring), 2 (Slide animation)
  const [slipAnimationState, setSlipAnimationState] = useState("idle"); // "idle" | "slipping" | "slipped"
  const [slipFactorLeft, setSlipFactorLeft] = useState(null);
  const [slipFactorRight, setSlipFactorRight] = useState(null);
  const [slideAnimationState, setSlideAnimationState] = useState("idle"); // "idle" | "dividing" | "simplified" | "sliding" | "final"

  // Refs and paths for dynamic arrow calculations
  const slipContainerRef = useRef(null);
  const slipSourceRef = useRef(null);
  const slipTargetRef = useRef(null);
  const [slipArrowPath, setSlipArrowPath] = useState("");
  const [slipArrowHeadPath, setSlipArrowHeadPath] = useState("");

  const slideContainerRef = useRef(null);
  const slideSourceRef = useRef(null);
  const slideTargetRef = useRef(null);
  const [slideArrowPath, setSlideArrowPath] = useState("");
  const [slideArrowHeadPath, setSlideArrowHeadPath] = useState("");

  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredZone, setHoveredZone] = useState(null); // "6x" | "9" | "blank" | "blank1" | "blank2" | "leftZone" | "rightZone" | "commonZone" | "leftGCFZone" | "rightGCFZone"
  const [finalFactored, setFinalFactored] = useState(false);

  const dragContainerRef = useRef(null);
  const zone9Ref = useRef(null);
  const zone6xRef = useRef(null);
  const blankRef = useRef(null);
  const blank1Ref = useRef(null);
  const blank2Ref = useRef(null);
  const leftZoneRef = useRef(null);
  const rightZoneRef = useRef(null);
  const commonZoneRef = useRef(null);
  const leftGCFZoneRef = useRef(null);
  const rightGCFZoneRef = useRef(null);
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
    setGroupingStep(0);
    setSplitChoiceError(null);
    setMiddleTermSplitDropdownOpen(false);
    setLeftGCFExtracted(false);
    setRightGCFExtracted(false);
    setLeftGCFSelectionOpen(false);
    setRightGCFSelectionOpen(false);
    setLeftGCFError(null);
    setRightGCFError(null);
    setLeftGCFAnimationState("none");
    setRightGCFAnimationState("none");
    setFinalCommonFactorDropped(false);
    setLeftGCFDropped(false);
    setRightGCFDropped(false);
    setSlipStep(0);
    setSlipAnimationState("idle");
    setSlipFactorLeft(null);
    setSlipFactorRight(null);
    setSlideAnimationState("idle");
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

  // Self-heal/sync finalFactored for Grouping pageIndex = 3 once all final factors are placed
  useEffect(() => {
    if (pageIndex === 3 && finalCommonFactorDropped && leftGCFDropped && rightGCFDropped) {
      setFinalFactored(true);
    }
  }, [finalCommonFactorDropped, leftGCFDropped, rightGCFDropped, pageIndex]);

  // Self-heal/sync finalFactored for Slip 'n Slide pageIndex = 4 once slide step completes
  useEffect(() => {
    if (pageIndex === 4 && slideAnimationState === "final") {
      setFinalFactored(true);
    }
  }, [slideAnimationState, pageIndex]);

  // Dynamically calculate arrow paths based on actual element positions
  useLayoutEffect(() => {
    const updatePaths = () => {
      // 1. Slip Arrow (Stage 0: 2 -> 3)
      if (
        (slipAnimationState === "slipping" || slipAnimationState === "multiplying") &&
        slipSourceRef.current &&
        slipTargetRef.current &&
        slipContainerRef.current
      ) {
        const containerRect = slipContainerRef.current.getBoundingClientRect();
        const sourceRect = slipSourceRef.current.getBoundingClientRect();
        const targetRect = slipTargetRef.current.getBoundingClientRect();

        // Calculate center-top coordinates relative to container
        const sourceX = (sourceRect.left + sourceRect.right) / 2 - containerRect.left;
        const sourceY = sourceRect.top - containerRect.top;

        const targetX = (targetRect.left + targetRect.right) / 2 - containerRect.left;
        const targetY = targetRect.top - containerRect.top;

        // Arch over the top
        const controlX = (sourceX + targetX) / 2;
        const controlY = Math.min(sourceY, targetY) - 50;

        setSlipArrowPath(`M ${sourceX} ${sourceY} Q ${controlX} ${controlY} ${targetX} ${targetY}`);
        
        // Arrow head pointing down/right at target
        setSlipArrowHeadPath(`M ${targetX} ${targetY} L ${targetX - 10} ${targetY - 5} L ${targetX - 4} ${targetY - 11} Z`);
      }

      // 2. Slide Arrow (Stage 2: Denominator 2 -> in front of x)
      if (
        slideAnimationState === "sliding" &&
        slideSourceRef.current &&
        slideTargetRef.current &&
        slideContainerRef.current
      ) {
        const containerRect = slideContainerRef.current.getBoundingClientRect();
        const sourceRect = slideSourceRef.current.getBoundingClientRect();
        const targetRect = slideTargetRef.current.getBoundingClientRect();

        // Source: denominator 2 (center-bottom relative to container)
        const sourceX = (sourceRect.left + sourceRect.right) / 2 - containerRect.left;
        const sourceY = sourceRect.bottom - containerRect.top;

        // Target: ghost coefficient 2 in front of x (center-bottom relative to container)
        const targetX = (targetRect.left + targetRect.right) / 2 - containerRect.left;
        const targetY = targetRect.bottom - containerRect.top + 8; // land slightly below or level with target center

        // Arch under the bottom
        const controlX = (sourceX + targetX) / 2;
        const controlY = Math.max(sourceY, targetY) + 40;

        setSlideArrowPath(`M ${sourceX} ${sourceY} Q ${controlX} ${controlY} ${targetX} ${targetY}`);

        // Arrow head pointing up/left at target
        setSlideArrowHeadPath(`M ${targetX} ${targetY} L ${targetX + 8} ${targetY + 4} L ${targetX + 3} ${targetY + 10} Z`);
      }
    };

    // Delay slightly to allow rendering/reflow to settle
    const timer = setTimeout(updatePaths, 50);
    window.addEventListener("resize", updatePaths);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePaths);
    };
  }, [slipAnimationState, slideAnimationState, pageIndex, slipStep]);

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
    setGroupingStep(0);
    setSplitChoiceError(null);
    setMiddleTermSplitDropdownOpen(false);
    setLeftGCFExtracted(false);
    setRightGCFExtracted(false);
    setLeftGCFSelectionOpen(false);
    setRightGCFSelectionOpen(false);
    setLeftGCFError(null);
    setRightGCFError(null);
    setLeftGCFAnimationState("none");
    setRightGCFAnimationState("none");
    setFinalCommonFactorDropped(false);
    setLeftGCFDropped(false);
    setRightGCFDropped(false);
    setSlipStep(0);
    setSlipAnimationState("idle");
    setSlipFactorLeft(null);
    setSlipFactorRight(null);
    setSlideAnimationState("idle");
    setFinalFactored(false);
    setIsDragging(false);
    setHoveredZone(null);
  };

  const startDrag = (e, value) => {
    e.preventDefault();
    if (pageIndex === 0 && factoredBlankReplaced) return;
    if (pageIndex === 1 && factoredBlank1Replaced && factoredBlank2Replaced) return;
    if (pageIndex === 2 && leftFactor !== null && rightFactor !== null) return;
    if (pageIndex === 3 && finalCommonFactorDropped && leftGCFDropped && rightGCFDropped) return;
    if (pageIndex === 4 && (slipStep !== 1 || (slipFactorLeft !== null && slipFactorRight !== null))) return;

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
    } else if (pageIndex === 3) {
      if (groupingStep === 2) {
        if (!finalCommonFactorDropped && commonZoneRef.current) {
          const rect = commonZoneRef.current.getBoundingClientRect();
          if (x >= rect.left - 25 && x <= rect.right + 25 && y >= rect.top - 25 && y <= rect.bottom + 25) {
            hover = "commonZone";
          }
        }
        if (!leftGCFDropped && leftGCFZoneRef.current) {
          const rect = leftGCFZoneRef.current.getBoundingClientRect();
          if (x >= rect.left - 25 && x <= rect.right + 25 && y >= rect.top - 25 && y <= rect.bottom + 25) {
            hover = "leftGCFZone";
          }
        }
        if (!rightGCFDropped && rightGCFZoneRef.current) {
          const rect = rightGCFZoneRef.current.getBoundingClientRect();
          if (x >= rect.left - 25 && x <= rect.right + 25 && y >= rect.top - 25 && y <= rect.bottom + 25) {
            hover = "rightGCFZone";
          }
        }
      }
    } else if (pageIndex === 4) {
      if (slipStep === 1) {
        if (slipFactorLeft === null && leftZoneRef.current) {
          const rect = leftZoneRef.current.getBoundingClientRect();
          if (x >= rect.left - 25 && x <= rect.right + 25 && y >= rect.top - 25 && y <= rect.bottom + 25) {
            hover = "leftZone";
          }
        }
        if (slipFactorRight === null && rightZoneRef.current) {
          const rect = rightZoneRef.current.getBoundingClientRect();
          if (x >= rect.left - 25 && x <= rect.right + 25 && y >= rect.top - 25 && y <= rect.bottom + 25) {
            hover = "rightZone";
          }
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
        if (pageIndex === 4) {
          if (slipFactorRight !== activeDragValue) {
            setSlipFactorLeft(activeDragValue);
          }
        } else {
          if (rightFactor !== activeDragValue) {
            setLeftFactor(activeDragValue);
          }
        }
      }
    } else if (hoveredZone === "rightZone") {
      if (activeDragValue === 2 || activeDragValue === 3) {
        if (pageIndex === 4) {
          if (slipFactorLeft !== activeDragValue) {
            setSlipFactorRight(activeDragValue);
          }
        } else {
          if (leftFactor !== activeDragValue) {
            setRightFactor(activeDragValue);
          }
        }
      }
    } else if (hoveredZone === "commonZone") {
      if (activeDragValue === "x+2") {
        setFinalCommonFactorDropped(true);
      }
    } else if (hoveredZone === "leftGCFZone") {
      if (activeDragValue === "2x") {
        setLeftGCFDropped(true);
      }
    } else if (hoveredZone === "rightGCFZone") {
      if (activeDragValue === "3") {
        setRightGCFDropped(true);
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
  const isDragPage = pageIndex === 0 || pageIndex === 1 || pageIndex === 2 || pageIndex === 3 || pageIndex === 4;

  // Helper to render draggable factor pills for Trinomials a=1 (pageIndex = 2)
  const renderFactorPill = (val) => {
    const isUsed = pageIndex === 4
      ? (slipFactorLeft === val || slipFactorRight === val)
      : (leftFactor === val || rightFactor === val);
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
  };

  // Helper to render division fractions in grouping step animations
  const renderFraction = (num, den) => {
    return (
      <div 
        style={{ 
          display: "inline-flex", 
          flexDirection: "column", 
          alignItems: "center", 
          verticalAlign: "middle", 
          margin: "0 0.25rem", 
          fontSize: "1.1rem",
          lineHeight: "1.1"
        }}
      >
        <span style={{ borderBottom: "1.5px solid #cbd5e1", padding: "0 4px", color: "#60a5fa" }}>{num}</span>
        <span style={{ color: "#3b82f6", fontWeight: "bold" }}>{den}</span>
      </div>
    );
  };

  return (
    <div ref={dragContainerRef} className="interactive-parts-card" style={{ touchAction: "none", position: "relative" }}>
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
        <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginTop: "0.5rem", color: "#ffffff", marginBottom: "0.25rem" }}>
          {isDragPage ? "Interactive Factoring Sandbox" : "Step-by-Step Factoring Pattern"}
        </h3>
        <div style={{ fontSize: "1.45rem", color: "#3b82f6", fontWeight: "700", fontFamily: "Outfit, sans-serif", marginTop: "0.5rem" }}>
          {pageIndex === 3 ? "2x² + 7x + 6" : config.original}
        </div>
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
              ) : pageIndex === 2 ? (
                /* TRINOMIALS A = 1 */
                <span style={{ fontSize: "2rem" }}>x² + 5x + 6</span>
              ) : (
                /* GROUPING (pageIndex === 3) */
                null
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

            {/* Factoring by Grouping Game Layout (Only for pageIndex === 3) */}
            {pageIndex === 3 && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} className="animate-fade-in">
                
                {/* Stage 0: Split Choice */}
                {groupingStep === 0 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <span style={{ fontSize: "1rem", color: "#cbd5e1", fontWeight: "600", marginBottom: "1.5rem" }}>
                      Click on the middle term to choose how to split it:
                    </span>
                    
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: "bold", fontFamily: "Outfit, sans-serif", color: "#ffffff", marginBottom: "2rem", userSelect: "none" }}>
                      <span>2x² + </span>
                      <div style={{ position: "relative", display: "inline-block", margin: "0 0.5rem" }}>
                        <button
                          onClick={() => {
                            setMiddleTermSplitDropdownOpen(!middleTermSplitDropdownOpen);
                            setSplitChoiceError(null);
                          }}
                          className="pulse-border"
                          style={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            color: "#3b82f6",
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                            border: "2px dashed #3b82f6",
                            padding: "0.2rem 0.75rem",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontFamily: "Outfit, sans-serif",
                            outline: "none"
                          }}
                        >
                          7x
                        </button>
                        
                        {middleTermSplitDropdownOpen && (
                          <div 
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: "50%",
                              transform: "translateX(-50%) translateY(8px)",
                              backgroundColor: "#1e293b",
                              border: "1.5px solid #3b82f6",
                              borderRadius: "10px",
                              padding: "0.6rem",
                              zIndex: 10,
                              width: "160px",
                              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.4rem"
                            }}
                          >
                            {[
                              { label: "x + 6x", correct: false },
                              { label: "2x + 5x", correct: false },
                              { label: "3x + 4x", correct: true },
                              { label: "5x + 2x", correct: false },
                              { label: "6x + x", correct: false }
                            ].map((opt, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  if (opt.correct) {
                                    setGroupingStep(1);
                                    setSplitChoiceError(null);
                                    setMiddleTermSplitDropdownOpen(false);
                                  } else {
                                    setSplitChoiceError(`Incorrect! We need a split where factors of a·c (2·6 = 12) add to b (7). Only 3 and 4 multiply to 12 and add to 7.`);
                                    setMiddleTermSplitDropdownOpen(false);
                                  }
                                }}
                                style={{
                                  backgroundColor: "rgba(15, 23, 42, 0.6)",
                                  border: "1px solid #475569",
                                  color: "#ffffff",
                                  padding: "0.4rem",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                  fontSize: "0.9rem",
                                  fontWeight: "bold",
                                  transition: "all 0.15s ease"
                                }}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <span> + 6</span>
                    </div>

                    {splitChoiceError && (
                      <div 
                        style={{ 
                          marginTop: "0.5rem", 
                          color: "#f87171", 
                          fontSize: "0.85rem", 
                          backgroundColor: "rgba(248, 113, 113, 0.08)", 
                          padding: "0.6rem 1rem", 
                          borderRadius: "8px",
                          border: "1px solid rgba(248, 113, 113, 0.25)",
                          lineHeight: "1.45",
                          maxWidth: "340px",
                          textAlign: "center"
                        }}
                      >
                        {splitChoiceError}
                      </div>
                    )}
                  </div>
                )}

                {/* Stage 1: Click Groups to extract GCF */}
                {groupingStep === 1 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <span style={{ fontSize: "1rem", color: "#cbd5e1", fontWeight: "600", marginBottom: "2rem", textAlign: "center" }}>
                      Extract the Greatest Common Factor (GCF) from each group:
                    </span>
                    
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "0.5rem", fontSize: "1.8rem", fontWeight: "bold", fontFamily: "Outfit, sans-serif", margin: "1rem 0", minHeight: "120px", userSelect: "none" }}>
                      
                      {/* Left Group Column */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "120px", position: "relative" }}>
                        {leftGCFAnimationState === "division" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", fontSize: "1.45rem", color: "#cbd5e1", transform: "translateY(-4px)" }}>
                            <span style={{ color: "#3b82f6", fontWeight: "bold" }}>2x</span>
                            <span>(</span>
                            {renderFraction("2x²", "2x")}
                            <span>+</span>
                            {renderFraction("4x", "2x")}
                            <span>)</span>
                          </span>
                        ) : leftGCFAnimationState === "simplified" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", fontSize: "1.55rem", color: "#cbd5e1" }}>
                            <span style={{ color: "#3b82f6", fontWeight: "bold" }}>2x</span>
                            <span>(</span>
                            <span style={{ color: "#4ade80", fontWeight: "bold", padding: "0 0.1rem" }}>x</span>
                            <span style={{ margin: "0 0.25rem" }}>+</span>
                            <span style={{ color: "#4ade80", fontWeight: "bold", padding: "0 0.1rem" }}>2</span>
                            <span>)</span>
                          </span>
                        ) : leftGCFExtracted ? (
                          <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#4ade80", fontFamily: "Outfit, sans-serif" }}>
                            2x(x + 2)
                          </span>
                        ) : (
                          <>
                            <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#60a5fa", fontFamily: "Outfit, sans-serif" }}>
                              (2x² + 4x)
                            </span>
                            <div style={{ position: "absolute", top: "100%", marginTop: "0.5rem" }}>
                              <button
                                onClick={() => {
                                  setLeftGCFSelectionOpen(!leftGCFSelectionOpen);
                                  setRightGCFSelectionOpen(false);
                                }}
                                style={{
                                  padding: "0.3rem 0.6rem",
                                  borderRadius: "6px",
                                  border: "1.5px dashed #3b82f6",
                                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                                  color: "#60a5fa",
                                  cursor: "pointer",
                                  fontSize: "0.8rem",
                                  fontWeight: "bold",
                                  outline: "none"
                                }}
                              >
                                GCF: ?
                              </button>
                              
                              {leftGCFSelectionOpen && (
                                <div 
                                  style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: "50%",
                                    transform: "translateX(-50%) translateY(8px)",
                                    backgroundColor: "#1e293b",
                                    border: "1.5px solid #3b82f6",
                                    borderRadius: "10px",
                                    padding: "0.5rem",
                                    zIndex: 10,
                                    width: "110px",
                                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "0.4rem"
                                  }}
                                >
                                  {["2", "x", "2x", "4"].map((opt) => (
                                    <button
                                      key={opt}
                                      onClick={() => {
                                        if (opt === "2x") {
                                          setLeftGCFSelectionOpen(false);
                                          setLeftGCFError(null);
                                          // Trigger division animation steps
                                          setLeftGCFAnimationState("division");
                                          setTimeout(() => {
                                            setLeftGCFAnimationState("simplified");
                                          }, 1800);
                                          setTimeout(() => {
                                            setLeftGCFAnimationState("none");
                                            setLeftGCFExtracted(true);
                                          }, 3600);
                                        } else {
                                          setLeftGCFError("Select 2x.");
                                        }
                                      }}
                                      style={{
                                        backgroundColor: "rgba(15, 23, 42, 0.6)",
                                        border: "1px solid #475569",
                                        color: "#ffffff",
                                        padding: "0.25rem",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontSize: "0.8rem",
                                        fontWeight: "bold"
                                      }}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                        {leftGCFError && (
                          <span style={{ fontSize: "0.7rem", color: "#f87171", textAlign: "center", position: "absolute", top: "100%", marginTop: "2rem", width: "120px" }}>
                            {leftGCFError}
                          </span>
                        )}
                      </div>

                      <span style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#cbd5e1", alignSelf: "flex-start", margin: "0 0.5rem" }}>+</span>

                      {/* Right Group Column */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "120px", position: "relative" }}>
                        {rightGCFAnimationState === "division" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", fontSize: "1.45rem", color: "#cbd5e1", transform: "translateY(-4px)" }}>
                            <span style={{ color: "#3b82f6", fontWeight: "bold" }}>3</span>
                            <span>(</span>
                            {renderFraction("3x", "3")}
                            <span>+</span>
                            {renderFraction("6", "3")}
                            <span>)</span>
                          </span>
                        ) : rightGCFAnimationState === "simplified" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", fontSize: "1.55rem", color: "#cbd5e1" }}>
                            <span style={{ color: "#3b82f6", fontWeight: "bold" }}>3</span>
                            <span>(</span>
                            <span style={{ color: "#4ade80", fontWeight: "bold", padding: "0 0.1rem" }}>x</span>
                            <span style={{ margin: "0 0.25rem" }}>+</span>
                            <span style={{ color: "#4ade80", fontWeight: "bold", padding: "0 0.1rem" }}>2</span>
                            <span>)</span>
                          </span>
                        ) : rightGCFExtracted ? (
                          <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#4ade80", fontFamily: "Outfit, sans-serif" }}>
                            3(x + 2)
                          </span>
                        ) : (
                          <>
                            <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#60a5fa", fontFamily: "Outfit, sans-serif" }}>
                              (3x + 6)
                            </span>
                            <div style={{ position: "absolute", top: "100%", marginTop: "0.5rem" }}>
                              <button
                                onClick={() => {
                                  setRightGCFSelectionOpen(!rightGCFSelectionOpen);
                                  setLeftGCFSelectionOpen(false);
                                }}
                                style={{
                                  padding: "0.3rem 0.6rem",
                                  borderRadius: "6px",
                                  border: "1.5px dashed #3b82f6",
                                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                                  color: "#60a5fa",
                                  cursor: "pointer",
                                  fontSize: "0.8rem",
                                  fontWeight: "bold",
                                  outline: "none"
                                }}
                              >
                                GCF: ?
                              </button>
                              
                              {rightGCFSelectionOpen && (
                                <div 
                                  style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: "50%",
                                    transform: "translateX(-50%) translateY(8px)",
                                    backgroundColor: "#1e293b",
                                    border: "1.5px solid #3b82f6",
                                    borderRadius: "10px",
                                    padding: "0.5rem",
                                    zIndex: 10,
                                    width: "110px",
                                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                    gap: "0.4rem"
                                  }}
                                >
                                  {["3", "6", "x", "3x"].map((opt) => (
                                    <button
                                      key={opt}
                                      onClick={() => {
                                        if (opt === "3") {
                                          setRightGCFSelectionOpen(false);
                                          setRightGCFError(null);
                                          // Trigger division animation steps
                                          setRightGCFAnimationState("division");
                                          setTimeout(() => {
                                            setRightGCFAnimationState("simplified");
                                          }, 1800);
                                          setTimeout(() => {
                                            setRightGCFAnimationState("none");
                                            setRightGCFExtracted(true);
                                          }, 3600);
                                        } else {
                                          setRightGCFError("Select 3.");
                                        }
                                      }}
                                      style={{
                                        backgroundColor: "rgba(15, 23, 42, 0.6)",
                                        border: "1px solid #475569",
                                        color: "#ffffff",
                                        padding: "0.25rem",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        fontSize: "0.8rem",
                                        fontWeight: "bold"
                                      }}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                        {rightGCFError && (
                          <span style={{ fontSize: "0.7rem", color: "#f87171", textAlign: "center", position: "absolute", top: "100%", marginTop: "2rem", width: "120px" }}>
                            {rightGCFError}
                          </span>
                        )}
                      </div>

                    </div>

                    {leftGCFExtracted && rightGCFExtracted && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2.5rem" }} className="animate-fade-in">
                        <span style={{ fontSize: "1.1rem", color: "#cbd5e1", fontFamily: "Outfit, sans-serif", marginBottom: "0.5rem" }}>
                          2x(x + 2) + 3(x + 2)
                        </span>
                        <button
                          onClick={() => setGroupingStep(2)}
                          className="btn-primary"
                          style={{ padding: "0.5rem 1.25rem", fontWeight: "bold", fontSize: "0.95rem" }}
                        >
                          GCFs Extracted! Proceed
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Stage 2: Drag and drop from equation */}
                {groupingStep === 2 && !finalFactored && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <span style={{ fontSize: "0.95rem", color: "#cbd5e1", fontWeight: "600", marginBottom: "1.5rem", textAlign: "center" }}>
                      Drag the common factor and the coefficients from the equation into the blanks below:
                    </span>

                    {/* Equation with inline draggable components */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "1.8rem", fontWeight: "bold", fontFamily: "Outfit, sans-serif", color: "#ffffff", margin: "1rem 0", userSelect: "none" }}>
                      
                      {/* Coefficient 1 (2x) */}
                      <span 
                        onPointerDown={(e) => startDrag(e, "2x")}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        style={{
                          padding: "0.15rem 0.5rem",
                          borderRadius: "6px",
                          backgroundColor: leftGCFDropped ? "rgba(59, 130, 246, 0.05)" : "rgba(59, 130, 246, 0.15)",
                          border: leftGCFDropped ? "1.5px dashed rgba(59, 130, 246, 0.3)" : "1.5px solid #3b82f6",
                          color: leftGCFDropped ? "#475569" : "#60a5fa",
                          cursor: leftGCFDropped ? "default" : "grab",
                          opacity: leftGCFDropped ? 0.35 : (isDragging && activeDragValue === "2x" ? 0.55 : 1),
                          pointerEvents: leftGCFDropped ? "none" : "auto",
                          transition: "all 0.2s"
                        }}
                      >
                        2x
                      </span>

                      <span>(</span>

                      {/* Common factor x+2 (Instance 1) */}
                      <span 
                        onPointerDown={(e) => startDrag(e, "x+2")}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        style={{
                          padding: "0.15rem 0.5rem",
                          borderRadius: "6px",
                          backgroundColor: finalCommonFactorDropped ? "rgba(168, 85, 247, 0.05)" : "rgba(168, 85, 247, 0.15)",
                          border: finalCommonFactorDropped ? "1.5px dashed rgba(168, 85, 247, 0.3)" : "1.5px solid #a855f7",
                          color: finalCommonFactorDropped ? "#475569" : "#c084fc",
                          cursor: finalCommonFactorDropped ? "default" : "grab",
                          opacity: finalCommonFactorDropped ? 0.35 : (isDragging && activeDragValue === "x+2" ? 0.55 : 1),
                          pointerEvents: finalCommonFactorDropped ? "none" : "auto",
                          transition: "all 0.2s"
                        }}
                      >
                        x + 2
                      </span>

                      <span>)</span>

                      <span style={{ margin: "0 0.25rem" }}>+</span>

                      {/* Coefficient 2 (3) */}
                      <span 
                        onPointerDown={(e) => startDrag(e, "3")}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        style={{
                          padding: "0.15rem 0.5rem",
                          borderRadius: "6px",
                          backgroundColor: rightGCFDropped ? "rgba(59, 130, 246, 0.05)" : "rgba(59, 130, 246, 0.15)",
                          border: rightGCFDropped ? "1.5px dashed rgba(59, 130, 246, 0.3)" : "1.5px solid #3b82f6",
                          color: rightGCFDropped ? "#475569" : "#60a5fa",
                          cursor: rightGCFDropped ? "default" : "grab",
                          opacity: rightGCFDropped ? 0.35 : (isDragging && activeDragValue === "3" ? 0.55 : 1),
                          pointerEvents: rightGCFDropped ? "none" : "auto",
                          transition: "all 0.2s"
                        }}
                      >
                        3
                      </span>

                      <span>(</span>

                      {/* Common factor x+2 (Instance 2) */}
                      <span 
                        onPointerDown={(e) => startDrag(e, "x+2")}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        style={{
                          padding: "0.15rem 0.5rem",
                          borderRadius: "6px",
                          backgroundColor: finalCommonFactorDropped ? "rgba(168, 85, 247, 0.05)" : "rgba(168, 85, 247, 0.15)",
                          border: finalCommonFactorDropped ? "1.5px dashed rgba(168, 85, 247, 0.3)" : "1.5px solid #a855f7",
                          color: finalCommonFactorDropped ? "#475569" : "#c084fc",
                          cursor: finalCommonFactorDropped ? "default" : "grab",
                          opacity: finalCommonFactorDropped ? 0.35 : (isDragging && activeDragValue === "x+2" ? 0.55 : 1),
                          pointerEvents: finalCommonFactorDropped ? "none" : "auto",
                          transition: "all 0.2s"
                        }}
                      >
                        x + 2
                      </span>

                      <span>)</span>
                    </div>

                    {/* Targets Blanks Row */}
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
                    >
                      <span>(</span>
                      <span 
                        ref={commonZoneRef}
                        style={{
                          border: finalCommonFactorDropped ? "2px solid #22c55e" : hoveredZone === "commonZone" ? "2.5px dashed #22c55e" : "2px dashed #a855f7",
                          backgroundColor: finalCommonFactorDropped ? "rgba(34, 197, 94, 0.15)" : hoveredZone === "commonZone" ? "rgba(34, 197, 94, 0.1)" : "rgba(168, 85, 247, 0.05)",
                          padding: "0.1rem 0.6rem",
                          borderRadius: "8px",
                          color: finalCommonFactorDropped ? "#4ade80" : "#cbd5e1",
                          fontSize: "1.4rem",
                          minWidth: "80px",
                          display: "inline-block",
                          textAlign: "center",
                          transition: "all 0.15s ease",
                          transform: hoveredZone === "commonZone" ? "scale(1.05)" : "none",
                          margin: "0 0.25rem"
                        }}
                      >
                        {finalCommonFactorDropped ? "x + 2" : "common"}
                      </span>
                      <span>)(</span>
                      
                      <span 
                        ref={leftGCFZoneRef}
                        style={{
                          border: leftGCFDropped ? "2px solid #22c55e" : hoveredZone === "leftGCFZone" ? "2.5px dashed #22c55e" : "2px dashed #3b82f6",
                          backgroundColor: leftGCFDropped ? "rgba(34, 197, 94, 0.15)" : hoveredZone === "leftGCFZone" ? "rgba(34, 197, 94, 0.1)" : "rgba(59, 130, 246, 0.05)",
                          padding: "0.1rem 0.6rem",
                          borderRadius: "8px",
                          color: leftGCFDropped ? "#4ade80" : "#cbd5e1",
                          fontSize: "1.4rem",
                          minWidth: "60px",
                          display: "inline-block",
                          textAlign: "center",
                          transition: "all 0.15s ease",
                          transform: hoveredZone === "leftGCFZone" ? "scale(1.05)" : "none",
                          margin: "0 0.25rem"
                        }}
                      >
                        {leftGCFDropped ? "2x" : "coefficient"}
                      </span>

                      <span style={{ fontSize: "1.4rem", color: "#64748b", margin: "0 0.2rem" }}>+</span>

                      <span 
                        ref={rightGCFZoneRef}
                        style={{
                          border: rightGCFDropped ? "2px solid #22c55e" : hoveredZone === "rightGCFZone" ? "2.5px dashed #22c55e" : "2px dashed #3b82f6",
                          backgroundColor: rightGCFDropped ? "rgba(34, 197, 94, 0.15)" : hoveredZone === "rightGCFZone" ? "rgba(34, 197, 94, 0.1)" : "rgba(59, 130, 246, 0.05)",
                          padding: "0.1rem 0.6rem",
                          borderRadius: "8px",
                          color: rightGCFDropped ? "#4ade80" : "#cbd5e1",
                          fontSize: "1.4rem",
                          minWidth: "50px",
                          display: "inline-block",
                          textAlign: "center",
                          transition: "all 0.15s ease",
                          transform: hoveredZone === "rightGCFZone" ? "scale(1.05)" : "none",
                          margin: "0 0.25rem"
                        }}
                      >
                        {rightGCFDropped ? "3" : "coefficient"}
                      </span>

                      <span>)</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Slip 'n Slide method layout (pageIndex === 4) */}
            {pageIndex === 4 && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} className="animate-fade-in">
                
                {/* CSS styles for animating dashes */}
                <style>{`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: -20;
                    }
                  }
                  .dash-animate {
                    stroke-dasharray: 6;
                    animation: dash 1s linear infinite;
                  }
                `}</style>

                {/* Stage 0: Slip leading coefficient */}
                {slipStep === 0 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <span style={{ fontSize: "1rem", color: "#cbd5e1", fontWeight: "600", marginBottom: "1.5rem" }}>
                      Multiply the leading coefficient (2) by the constant (3):
                    </span>

                    <div ref={slipContainerRef} style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2.2rem", fontWeight: "bold", fontFamily: "Outfit, sans-serif", color: "#ffffff", height: "100px", minWidth: "300px", userSelect: "none" }}>
                      
                      {/* SVG Curved arrow from 2 to 3 - Dynamic Over Arch */}
                      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
                        {(slipAnimationState === "slipping" || slipAnimationState === "multiplying") && slipArrowPath && (
                          <>
                            <path
                              d={slipArrowPath}
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="3.5"
                              strokeDasharray="6"
                              className="dash-animate"
                            />
                            {/* Arrow head */}
                            <path
                              d={slipArrowHeadPath}
                              fill="#3b82f6"
                            />
                          </>
                        )}
                      </svg>

                      {slipAnimationState === "multiplying" ? (
                        <>
                          <span ref={slipSourceRef} style={{ textDecoration: "line-through", color: "#ef4444", opacity: 0.4, marginRight: "0.25rem", transition: "all 0.3s ease" }}>2</span>
                          <span>x² + 5x + </span>
                          <span ref={slipTargetRef} style={{ color: "#4ade80", fontWeight: "bold", fontSize: "2.5rem", transition: "all 0.3s ease", animation: "pulse 1s infinite" }}>6</span>
                        </>
                      ) : (
                        <>
                          <span ref={slipSourceRef} style={{ transition: "all 0.5s ease", transform: slipAnimationState === "slipping" ? "scale(1.2)" : "none", color: slipAnimationState === "slipping" ? "#3b82f6" : "#ffffff", fontWeight: "bold", marginRight: "0.25rem" }}>2</span>
                          <span>x² + 5x + </span>
                          <span ref={slipTargetRef} style={{ transition: "all 0.5s ease", transform: slipAnimationState === "slipping" ? "scale(1.2)" : "none", color: slipAnimationState === "slipping" ? "#3b82f6" : "#ffffff", fontWeight: "bold", marginLeft: "0.25rem" }}>3</span>
                        </>
                      )}
                    </div>

                    {(slipAnimationState === "slipping" || slipAnimationState === "multiplying") && (
                      <div className="animate-fade-in" style={{ fontSize: "1.25rem", color: "#60a5fa", fontWeight: "bold", marginTop: "1rem", fontFamily: "Outfit, sans-serif" }}>
                        2 × 3 = 6
                      </div>
                    )}

                    <div style={{ marginTop: "2rem" }}>
                      {slipAnimationState === "idle" ? (
                        <button
                          onClick={() => {
                            setSlipAnimationState("slipping");
                            setTimeout(() => {
                              setSlipAnimationState("multiplying");
                            }, 1600);
                            setTimeout(() => {
                              setSlipAnimationState("slipped");
                              setSlipStep(1);
                            }, 3400);
                          }}
                          className="btn-primary"
                          style={{ padding: "0.6rem 1.5rem", fontWeight: "bold" }}
                        >
                          Slip the 2!
                        </button>
                      ) : (
                        <button
                          disabled
                          className="btn-secondary"
                          style={{ padding: "0.6rem 1.5rem", fontWeight: "bold", opacity: 0.7, cursor: "not-allowed" }}
                        >
                          {slipAnimationState === "slipping" ? "Slipping..." : "Multiplying..."}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Stage 1: Big X Factoring */}
                {slipStep === 1 && !finalFactored && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <span style={{ fontSize: "1rem", color: "#cbd5e1", fontWeight: "600", marginBottom: "1.5rem" }}>
                      Factor the simplified trinomial expression:
                    </span>

                    <span style={{ fontSize: "2rem", fontWeight: "bold", color: "#60a5fa", fontFamily: "Outfit, sans-serif", marginBottom: "1rem" }}>
                      x² + 5x + 6
                    </span>

                    {/* Big X Component */}
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
                          border: slipFactorLeft !== null ? "2px solid #22c55e" : hoveredZone === "leftZone" ? "2.5px dashed #22c55e" : "2px dashed #475569",
                          backgroundColor: slipFactorLeft !== null ? "rgba(34, 197, 94, 0.15)" : hoveredZone === "leftZone" ? "rgba(34, 197, 94, 0.1)" : "rgba(15, 23, 42, 0.6)",
                          color: slipFactorLeft !== null ? "#4ade80" : "#64748b",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          transition: "all 0.15s ease",
                          fontFamily: "Outfit, sans-serif"
                        }}
                      >
                        {slipFactorLeft !== null ? slipFactorLeft : "?"}
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
                          border: slipFactorRight !== null ? "2px solid #22c55e" : hoveredZone === "rightZone" ? "2.5px dashed #22c55e" : "2px dashed #475569",
                          backgroundColor: slipFactorRight !== null ? "rgba(34, 197, 94, 0.15)" : hoveredZone === "rightZone" ? "rgba(34, 197, 94, 0.1)" : "rgba(15, 23, 42, 0.6)",
                          color: slipFactorRight !== null ? "#4ade80" : "#64748b",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          transition: "all 0.15s ease",
                          fontFamily: "Outfit, sans-serif"
                        }}
                      >
                        {slipFactorRight !== null ? slipFactorRight : "?"}
                      </div>
                    </div>

                    {/* Populated Binomial factors */}
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
                      <span style={{ color: slipFactorLeft !== null ? "#4ade80" : "#64748b", fontWeight: "bold" }}>
                        {slipFactorLeft !== null ? slipFactorLeft : "_"}
                      </span>
                      <span>)(x + </span>
                      <span style={{ color: slipFactorRight !== null ? "#4ade80" : "#64748b", fontWeight: "bold" }}>
                        {slipFactorRight !== null ? slipFactorRight : "_"}
                      </span>
                      <span>)</span>
                    </div>

                    {slipFactorLeft !== null && slipFactorRight !== null && (
                      <button
                        onClick={() => setSlipStep(2)}
                        className="btn-primary animate-fade-in"
                        style={{ marginTop: "2rem", padding: "0.5rem 1.25rem", fontWeight: "bold" }}
                      >
                        Proceed to Slide!
                      </button>
                    )}
                  </div>
                )}

                {/* Stage 2: Slide leading coefficient back */}
                {slipStep === 2 && !finalFactored && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "8px", backgroundColor: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.2)", fontSize: "0.85rem", color: "#60a5fa", marginBottom: "1.5rem" }}>
                      <span>💡</span>
                      <span><strong>Reminder:</strong> The coefficient we initially slipped off was <strong>2</strong>.</span>
                    </div>

                    {slideAnimationState === "idle" && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <span style={{ fontSize: "1rem", color: "#cbd5e1", fontWeight: "600", marginBottom: "1.5rem" }}>
                          Slipped factors expression:
                        </span>
                        <div style={{ fontSize: "2rem", fontWeight: "bold", fontFamily: "Outfit, sans-serif", color: "#ffffff", margin: "2rem 0" }}>
                          (x + 2)(x + 3)
                        </div>
                        <button
                          onClick={() => setSlideAnimationState("dividing")}
                          className="btn-primary"
                          style={{ padding: "0.6rem 1.5rem", fontWeight: "bold" }}
                        >
                          Divide constants by slipped 2
                        </button>
                      </div>
                    )}

                    {slideAnimationState === "dividing" && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <span style={{ fontSize: "1rem", color: "#cbd5e1", fontWeight: "600", marginBottom: "1.5rem" }}>
                          Slipped coefficient (2) divided under constants:
                        </span>
                        <div style={{ display: "flex", alignItems: "center", fontSize: "2rem", fontWeight: "bold", fontFamily: "Outfit, sans-serif", color: "#ffffff", margin: "2rem 0" }}>
                          <span>(x + </span>
                          {renderFraction("2", "2")}
                          <span>)(x + </span>
                          {renderFraction("3", "2")}
                          <span>)</span>
                        </div>
                        <button
                          onClick={() => setSlideAnimationState("simplified")}
                          className="btn-primary"
                          style={{ padding: "0.6rem 1.5rem", fontWeight: "bold" }}
                        >
                          Simplify Fractions
                        </button>
                      </div>
                    )}

                    {slideAnimationState === "simplified" && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <span style={{ fontSize: "1rem", color: "#cbd5e1", fontWeight: "600", marginBottom: "1.5rem" }}>
                          Simplified binomials. 3/2 cannot simplify!
                        </span>
                        <div style={{ display: "flex", alignItems: "center", fontSize: "2rem", fontWeight: "bold", fontFamily: "Outfit, sans-serif", color: "#ffffff", margin: "2rem 0" }}>
                          <span>(x + </span>
                          <span style={{ color: "#4ade80" }}>1</span>
                          <span>)(x + </span>
                          <span style={{ border: "2px dashed #eab308", padding: "0.25rem 0.5rem", borderRadius: "8px", backgroundColor: "rgba(234, 179, 8, 0.05)" }}>
                            {renderFraction("3", "2")}
                          </span>
                          <span>)</span>
                        </div>
                        <button
                          onClick={() => {
                            setSlideAnimationState("sliding");
                            setTimeout(() => {
                              setSlideAnimationState("final");
                            }, 2500);
                          }}
                          className="btn-primary"
                          style={{ padding: "0.6rem 1.5rem", fontWeight: "bold" }}
                        >
                          Slide the denominator 2!
                        </button>
                      </div>
                    )}

                    {slideAnimationState === "sliding" && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <span style={{ fontSize: "1rem", color: "#cbd5e1", fontWeight: "600", marginBottom: "1.5rem" }}>
                          Sliding denominator 2 back to the front of x...
                        </span>
                        <div ref={slideContainerRef} style={{ position: "relative", display: "flex", alignItems: "center", fontSize: "2rem", fontWeight: "bold", fontFamily: "Outfit, sans-serif", color: "#ffffff", margin: "2rem 0", height: "100px", minWidth: "300px" }}>
                          
                          {/* SVG arrow sliding the denominator 2 to the front - Dynamic Under Arch */}
                          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
                            {slideArrowPath && (
                              <>
                                <path
                                  d={slideArrowPath}
                                  fill="none"
                                  stroke="#eab308"
                                  strokeWidth="3.5"
                                  strokeDasharray="6"
                                  className="dash-animate"
                                />
                                {/* Arrow marker */}
                                <path
                                  d={slideArrowHeadPath}
                                  fill="#eab308"
                                />
                              </>
                            )}
                          </svg>

                          <span>(x + 1)(</span>
                          <span ref={slideTargetRef} style={{ color: "#eab308", opacity: 0.8, marginRight: "0.15rem", animation: "pulse 1s infinite" }}>2</span>
                          <span>x + </span>
                          <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", margin: "0 0.25rem", fontSize: "1.2rem", lineHeight: "1.1" }}>
                            <span style={{ borderBottom: "1.5px solid #cbd5e1", padding: "0 4px", color: "#60a5fa" }}>3</span>
                            <span ref={slideSourceRef} style={{ color: "#eab308", textDecoration: "line-through", opacity: 0.25 }}>2</span>
                          </div>
                          <span>)</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
                    opacity: isDragging ? 0.55 : 1,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    border: "1.5px solid rgba(255,255,255,0.2)"
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>☰</span>
                  <span>3</span>
                </div>
              </div>
            )}

            {/* Draggable Factors bank (For pageIndex 2 & 4) */}
            {(pageIndex === 2 || (pageIndex === 4 && slipStep === 1)) && !finalFactored && (
              <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: "600" }}>Drag the correct factor pair of 6:</span>
                <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
                  {/* Pair 1: 1 x 6 */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.6rem", borderRadius: "8px", border: "1px solid #1e293b", backgroundColor: "rgba(30, 41, 59, 0.4)" }}>
                    {renderFactorPill(1)}
                    <span style={{ fontSize: "1.1rem", color: "#64748b", fontWeight: "bold" }}>×</span>
                    {renderFactorPill(6)}
                  </div>

                  {/* Pair 2: 2 x 3 */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.6rem", borderRadius: "8px", border: "1px solid #1e293b", backgroundColor: "rgba(30, 41, 59, 0.4)" }}>
                    {renderFactorPill(2)}
                    <span style={{ fontSize: "1.1rem", color: "#64748b", fontWeight: "bold" }}>×</span>
                    {renderFactorPill(3)}
                  </div>
                </div>
              </div>
            )}

            {/* Fixed Floating Clone during Dragging */}
            {isDragging && (() => {
              const containerRect = dragContainerRef.current ? dragContainerRef.current.getBoundingClientRect() : { left: 0, top: 0 };
              const dragX = dragPosition.x - containerRect.left;
              const dragY = dragPosition.y - containerRect.top;
              return (
                <div
                  style={
                    (pageIndex === 2 || (pageIndex === 4 && slipStep === 1))
                      ? {
                          position: "absolute",
                          left: `${dragX - dragStartOffset.current.x}px`,
                          top: `${dragY - dragStartOffset.current.y}px`,
                          zIndex: 9999,
                          pointerEvents: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: hoveredZone ? "#22c55e" : "#3b82f6",
                          color: "#ffffff",
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                          border: "1.5px solid rgba(255,255,255,0.3)"
                        }
                      : (pageIndex === 3)
                      ? {
                          position: "absolute",
                          left: `${dragX - dragStartOffset.current.x}px`,
                          top: `${dragY - dragStartOffset.current.y}px`,
                          zIndex: 9999,
                          pointerEvents: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0.2rem 0.6rem",
                          borderRadius: "6px",
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          fontFamily: "Outfit, sans-serif",
                          border: activeDragValue === "x+2" ? "1.5px solid #a855f7" : "1.5px solid #3b82f6",
                          backgroundColor: hoveredZone ? "#22c55e" : (activeDragValue === "x+2" ? "#a855f7" : "#3b82f6"),
                          color: "#ffffff",
                          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
                        }
                      : {
                          position: "absolute",
                          left: `${dragX - dragStartOffset.current.x}px`,
                          top: `${dragY - dragStartOffset.current.y}px`,
                          zIndex: 9999,
                          pointerEvents: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          backgroundColor: hoveredZone ? "#22c55e" : "#3b82f6",
                          color: "#ffffff",
                          padding: "0.5rem 1.25rem",
                          borderRadius: "8px",
                          fontSize: "1rem",
                          fontWeight: "bold",
                          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                          border: "1.5px solid rgba(255,255,255,0.3)"
                        }
                  }
                >
                  {!(pageIndex === 2 || (pageIndex === 4 && slipStep === 1) || pageIndex === 3) && (
                    <span style={{ fontSize: "1.1rem" }}>☰</span>
                  )}
                  <span>{activeDragValue === "x+2" ? "x + 2" : activeDragValue === "2x+3" ? "2x + 3" : activeDragValue}</span>
                </div>
              );
            })()}

            {/* Factored Success Box */}
            {finalFactored && (
              <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: "2.25rem", fontWeight: "bold", color: "#4ade80", fontFamily: "Outfit, sans-serif" }}>
                  {pageIndex === 0 ? "(x + 3)²" : pageIndex === 1 ? "(x - 3)(x + 3)" : pageIndex === 2 ? `(x + ${leftFactor})(x + ${rightFactor})` : pageIndex === 3 ? "(x + 2)(2x + 3)" : "(x + 1)(2x + 3)"}
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
                ) : pageIndex === 2 ? (
                  finalFactored
                    ? "Factored Equivalent Form"
                    : "The Big X Method"
                ) : pageIndex === 3 ? (
                  finalFactored
                    ? "Factored Equivalent Form"
                    : groupingStep === 0
                      ? "Stage 1: Split Middle Term"
                      : groupingStep === 1
                        ? "Stage 2: Click to Extract GCFs"
                        : "Stage 3: Group and Factor"
                ) : (
                  finalFactored
                    ? "Factored Equivalent Form"
                    : slipStep === 0
                      ? "Stage 1: Slip Coefficient"
                      : slipStep === 1
                        ? "Stage 2: Big X Factoring"
                        : "Stage 3: Slide & Simplify"
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
                ) : pageIndex === 2 ? (
                  finalFactored
                    ? "Trinomials factor into the product of binomials: (x + 2)(x + 3)."
                    : "The Big X Method helps us find factors. The top number is the product (c = 6) and the bottom number is the sum (b = 5). Drag the correct factor pair (2 and 3) of 6 into the left and right spots to populate the binomial form!"
                ) : pageIndex === 3 ? (
                  finalFactored
                    ? "Factoring by grouping splits the terms and factors out their GCFs, yielding: (x + 2)(2x + 3)."
                    : groupingStep === 0
                      ? "To factor 2x² + 7x + 6, we need to split 7x into two terms whose coefficients multiply to a·c (2·6 = 12) and add to b (7). Select the correct split from the choices!"
                      : groupingStep === 1
                        ? "Great! 7x is split into 3x + 4x, giving groups (2x² + 4x) and (3x + 6). Click on each group button and select its Greatest Common Factor (GCF) to pull it out!"
                        : "Fantastic! GCFs are pulled out to reveal common binomial factor (x + 2). Drag the common factor '(x + 2)' and leftovers '(2x + 3)' into their zones to factor completely!"
                ) : (
                  finalFactored
                    ? "Slip 'n Slide factoring resolves a≠1 trinomials by slipping the coefficient, factoring, and sliding it back under to yield (x + 1)(2x + 3)."
                    : slipStep === 0
                      ? "First, we 'slip' the leading coefficient 2 to the end and multiply it by 3, transforming 2x² + 5x + 3 into x² + 5x + 6. Click 'Slip!' to animate this!"
                      : slipStep === 1
                        ? "Now, factor the simplified trinomial x² + 5x + 6. Drag the correct factor pair (2 and 3) of 6 into the Big X zones!"
                        : "Now, 'slide' the initial coefficient 2 back under each constant. Simplify 2/2 to 1. For 3/2 (which cannot simplify), slide the denominator 2 to the front of x. Click 'Slide!' to animate!"
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
