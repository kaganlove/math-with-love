import React, { useRef, useState, useEffect } from "react";
import { Paintbrush, Eraser, Trash2, Download, Circle } from "lucide-react";

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#6366f1"); // Primary indigo
  const [lineWidth, setLineWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  const colors = [
    { name: "Indigo", value: "#6366f1" },
    { name: "Red", value: "#ef4444" },
    { name: "Green", value: "#22c55e" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Dark", value: "#0f172a" }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Support high DPI screens
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    contextRef.current = context;

    // Fill with white background initially
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, rect.width, rect.height);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !contextRef.current) return;
      
      // Save content
      const tempCanvas = document.createElement("canvas");
      const tempContext = tempCanvas.getContext("2d");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempContext.drawImage(canvas, 0, 0);

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const context = canvas.getContext("2d");
      context.scale(2, 2);
      context.lineCap = "round";
      context.lineJoin = "round";
      contextRef.current = context;

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, rect.width, rect.height);
      context.drawImage(tempCanvas, 0, 0, tempCanvas.width / 2, tempCanvas.height / 2, 0, 0, rect.width, rect.height);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    // Support Touch Events
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    
    // Mouse Events
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    const { x, y } = getCoordinates(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    contextRef.current.strokeStyle = isEraser ? "#ffffff" : color;
    contextRef.current.lineWidth = isEraser ? lineWidth * 4 : lineWidth;
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    contextRef.current.fillStyle = "#ffffff";
    contextRef.current.fillRect(0, 0, rect.width, rect.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `math-whiteboard-${Date.now()}.png`;
    link.href = image;
    link.click();
  };

  return (
    <div className="whiteboard-container">
      {/* Tool Controls Toolbar */}
      <div className="whiteboard-toolbar">
        <div className="toolbar-group">
          {/* Mode Toggles */}
          <button
            className={`toolbar-btn ${!isEraser ? "active" : ""}`}
            onClick={() => setIsEraser(false)}
            title="Draw Mode"
          >
            <Paintbrush size={18} />
          </button>
          <button
            className={`toolbar-btn ${isEraser ? "active" : ""}`}
            onClick={() => setIsEraser(true)}
            title="Eraser Mode"
          >
            <Eraser size={18} />
          </button>
        </div>

        {/* Color Palette (disabled in eraser mode) */}
        {!isEraser && (
          <div className="toolbar-group">
            {colors.map((c) => (
              <button
                key={c.name}
                className={`color-btn ${color === c.value ? "selected" : ""}`}
                style={{ backgroundColor: c.value }}
                onClick={() => setColor(c.value)}
                title={c.name}
              />
            ))}
          </div>
        )}

        {/* Thickness */}
        <div className="toolbar-group">
          <span className="toolbar-label">Size:</span>
          {[2, 4, 8, 16].map((size) => (
            <button
              key={size}
              className={`thickness-btn ${lineWidth === size ? "selected" : ""}`}
              onClick={() => setLineWidth(size)}
              title={`${size}px`}
            >
              <Circle size={6 + size / 2} fill="#334155" stroke="none" />
            </button>
          ))}
        </div>

        <div className="toolbar-spacer" />

        <div className="toolbar-group">
          <button
            className="toolbar-btn text-danger"
            onClick={clearCanvas}
            title="Clear Board"
          >
            <Trash2 size={18} />
            <span className="btn-label-desktop">Clear</span>
          </button>
          <button
            className="toolbar-btn text-success"
            onClick={downloadCanvas}
            title="Save Board"
          >
            <Download size={18} />
            <span className="btn-label-desktop">Save</span>
          </button>
        </div>
      </div>

      {/* Canvas Drawing Area */}
      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="whiteboard-canvas"
        />
      </div>
    </div>
  );
}
