import React, { useRef, useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";

export default function ExpressionCompoundVisualizer() {
  const [isReplaced, setIsReplaced] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const dragRef = useRef(null);
  const targetRef = useRef(null);
  const dragStartOffset = useRef({ x: 0, y: 0 });
  const dragContainerRef = useRef(null);

  const handlePointerDown = (e) => {
    if (isReplaced) return;
    const rect = dragRef.current.getBoundingClientRect();
    dragStartOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setIsDragging(true);
    setDragPosition({ x: e.clientX, y: e.clientY });
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX;
    const y = e.clientY;
    setDragPosition({ x, y });

    // Check collision with target bounding rect
    if (targetRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const isOver =
        x >= targetRect.left - 25 &&
        x <= targetRect.right + 25 &&
        y >= targetRect.top - 25 &&
        y <= targetRect.bottom + 25;
      setIsHovered(isOver);
    }
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);

    if (isHovered) {
      setIsReplaced(true);
    }
    setIsHovered(false);
  };

  const handleReset = () => {
    setIsReplaced(false);
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
          Interactive Substitution Balancer
        </span>
        <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginTop: "0.5rem", color: "#ffffff" }}>
          {isReplaced 
            ? "Substitution Complete!" 
            : "Drag the variable block 'u' onto the compound factor!"}
        </h3>
      </div>

      {/* Main Substitution Sandbox */}
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          background: "rgba(15, 23, 42, 0.6)",
          border: "1.5px solid #1e293b",
          borderRadius: "12px",
          minHeight: "180px",
          position: "relative",
          margin: "1.5rem 0"
        }}
      >
        {/* Math Expression Row */}
        <div 
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#ffffff",
            fontFamily: "Outfit, sans-serif",
            gap: "0.4rem",
            userSelect: "none"
          }}
        >
          <span>5</span>

          {/* Target Drop Zone / Variable Segment */}
          {isReplaced ? (
            <span
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.2)",
                color: "#4ade80",
                border: "2px solid #22c55e",
                padding: "0.1rem 0.8rem",
                borderRadius: "8px",
                transform: "scale(1.1)",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
            >
              u
            </span>
          ) : (
            <span
              ref={targetRef}
              style={{
                border: isHovered ? "2.5px dashed #22c55e" : "2px dashed #6366f1",
                backgroundColor: isHovered ? "rgba(34, 197, 94, 0.15)" : "rgba(99, 102, 241, 0.08)",
                color: isHovered ? "#4ade80" : "#d8b4fe",
                padding: "0.1rem 0.8rem",
                borderRadius: "8px",
                fontSize: "1.75rem",
                transition: "all 0.15s ease",
                transform: isHovered ? "scale(1.05)" : "none"
              }}
            >
              (x + 3)
            </span>
          )}

          <span>²</span>
          <span style={{ marginLeft: "0.3rem" }}>- 4</span>
        </div>

        {/* Floating draggable placeholder to avoid layout jumps while dragging */}
        {!isReplaced && (
          <div style={{ marginTop: "2.5rem", minHeight: "45px", display: "flex", alignItems: "center" }}>
            <div
              ref={dragRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#6366f1",
                color: "#ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: "bold",
                cursor: "grab",
                userSelect: "none",
                touchAction: "none",
                opacity: isDragging ? 0.55 : 1,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                border: "1.5px solid rgba(255,255,255,0.2)"
              }}
            >
              <span style={{ fontSize: "1.1rem", cursor: "grab" }}>☰</span>
              <span>u = (x + 3)</span>
            </div>
          </div>
        )}

        {/* Freeform Floating Drag Element */}
        {isDragging && (() => {
          const containerRect = dragContainerRef.current ? dragContainerRef.current.getBoundingClientRect() : { left: 0, top: 0 };
          const dragX = dragPosition.x - containerRect.left;
          const dragY = dragPosition.y - containerRect.top;
          return (
            <div
              style={{
                position: "absolute",
                left: `${dragX - dragStartOffset.current.x}px`,
                top: `${dragY - dragStartOffset.current.y}px`,
                zIndex: 9999,
                pointerEvents: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: isHovered ? "#22c55e" : "#6366f1",
                color: "#ffffff",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: "bold",
                boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.5)",
                border: "1.5px solid rgba(255,255,255,0.3)"
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>☰</span>
              <span>u = (x + 3)</span>
            </div>
          );
        })()}

        {/* Success / Restart Box */}
        {isReplaced && (
          <div 
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              animation: "fadeIn 0.4s ease forwards"
            }}
          >
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
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)"}
            >
              <RotateCcw size={12} /> Reset Substitution
            </button>
          </div>
        )}
      </div>

      {/* Info Card explaining the concept */}
      <div 
        className="info-card" 
        style={{
          padding: "1.5rem",
          borderRadius: "1rem",
          border: "1.5px solid #1e293b",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <div style={{ padding: "0.75rem", backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "0.75rem", color: "#3b82f6", marginTop: "0.25rem" }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#ffffff", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Compound Substitution (u-Sub)
            </h4>
            {isReplaced ? (
              <p style={{ fontSize: "0.95rem", color: "#4ade80", marginTop: "0.5rem", marginBottom: "0.25rem", lineHeight: "1.6" }}>
                Success! By substituting <strong>u = (x + 3)</strong>, the original expression is simplified into a standard quadratic form: <strong>5u² - 4</strong>. This reveals the core shape and behavior of the function, making it much easier to analyze and solve.
              </p>
            ) : (
              <p style={{ fontSize: "0.95rem", color: "#cbd5e1", marginTop: "0.5rem", marginBottom: "0.25rem", lineHeight: "1.6" }}>
                In mathematics, we can simplify our understanding of a complex expression by grouping several parts into a single new variable. Try grabbing the pill <strong>u = (x + 3)</strong> above and dragging it onto the <strong>(x + 3)</strong> group to see the substitution take place!
              </p>
            )}
            <p style={{ fontSize: "0.85rem", color: "#94a3b8", fontStyle: "italic", margin: "0.25rem 0 0 0" }}>
              <strong>In Context:</strong> Grouping terms makes graphing, factoring, and completing the square much cleaner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
