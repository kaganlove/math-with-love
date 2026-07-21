import React, { useRef, useState, useEffect } from "react";
import { Paintbrush, Eraser, Trash2, Download, Circle, Type, Image as ImageIcon, Move, Upload } from "lucide-react";

// Helper function to calculate distance from point p to line segment v-w
const distanceToSegment = (p, v, w) => {
  const l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
  if (l2 === 0) return Math.sqrt((p.x - v.x) ** 2 + (p.y - v.y) ** 2);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.sqrt(
    (p.x - (v.x + t * (w.x - v.x))) ** 2 + (p.y - (v.y + t * (w.y - v.y))) ** 2
  );
};

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const fileInputRef = useRef(null);

  // Core whiteboard states
  const [elements, setElements] = useState([]);
  const [currentPoints, setCurrentPoints] = useState(null);
  const [color, setColor] = useState("#6366f1"); // Primary indigo
  const [lineWidth, setLineWidth] = useState(3);
  const [tool, setTool] = useState("pen"); // "pen" | "eraser" | "text" | "select"

  // Interaction helper states
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [editingText, setEditingText] = useState(null); // { x, y, value }
  const [draggingElement, setDraggingElement] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // PDF.js loading state indicator
  const [pdfLoading, setPdfLoading] = useState(false);

  const colors = [
    { name: "Indigo", value: "#6366f1" },
    { name: "Red", value: "#ef4444" },
    { name: "Green", value: "#22c55e" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Dark", value: "#0f172a" }
  ];

  // Track parent element dimensions to resize canvas dynamically (ResizeObserver handles panel splits)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentNode;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setCanvasSize({ width, height });
      }
    });

    resizeObserver.observe(parent);
    return () => resizeObserver.disconnect();
  }, []);

  // Main drawing logic that clears and redraws all vector elements
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    const ctx = contextRef.current;

    // Fill white board background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw all active elements
    elements.forEach((el) => {
      if (el.type === "pencil") {
        if (el.points.length < 2) return;
        ctx.beginPath();
        ctx.strokeStyle = el.color;
        ctx.lineWidth = el.lineWidth;
        ctx.moveTo(el.points[0].x, el.points[0].y);
        for (let i = 1; i < el.points.length; i++) {
          ctx.lineTo(el.points[i].x, el.points[i].y);
        }
        ctx.stroke();
      } else if (el.type === "text") {
        ctx.fillStyle = el.color;
        ctx.font = `bold ${el.fontSize}px Outfit, sans-serif`;
        ctx.textBaseline = "alphabetic";
        ctx.fillText(el.text, el.x, el.y);
      } else if (el.type === "image") {
        if (el.img) {
          try {
            ctx.drawImage(el.img, el.x, el.y, el.width, el.height);
          } catch (e) {
            console.error("Failed to render image element:", e);
          }
        } else {
          // Re-instantiate image object if it was cleared/not cached
          const img = new Image();
          img.src = el.src;
          img.onload = () => {
            el.img = img;
            drawCanvas(); // force redraw
          };
        }
      }
    });

    // Render selection indicators/bounding boxes in select mode
    if (tool === "select") {
      elements.forEach((el) => {
        if (el.type === "text") {
          const textWidth = el.text.length * (el.fontSize * 0.55);
          const textHeight = el.fontSize;
          ctx.strokeStyle = "rgba(99, 102, 241, 0.45)";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(el.x - 4, el.y - textHeight - 2, textWidth + 8, textHeight + 8);
          ctx.setLineDash([]);
        } else if (el.type === "image") {
          ctx.strokeStyle = "rgba(99, 102, 241, 0.45)";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(el.x - 2, el.y - 2, el.width + 4, el.height + 4);
          ctx.setLineDash([]);

          // Resize/drag indicator in bottom-right corner
          ctx.fillStyle = "#6366f1";
          ctx.fillRect(el.x + el.width - 4, el.y + el.height - 4, 8, 8);
        }
      });
    }

    // Render active drawing stroke
    if (currentPoints && currentPoints.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
      for (let i = 1; i < currentPoints.length; i++) {
        ctx.lineTo(currentPoints[i].x, currentPoints[i].y);
      }
      ctx.stroke();
    }
  };

  // Keep high DPI configurations updated on resize/state updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    context.resetTransform();
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineJoin = "round";
    contextRef.current = context;

    drawCanvas();
  }, [canvasSize, elements, currentPoints, tool, color, lineWidth]);

  // Click outside textarea window listener to save typing
  useEffect(() => {
    if (!editingText) return;

    const handleWindowClick = (e) => {
      // If clicking anything other than the textarea box itself or toolbar buttons
      if (
        e.target.tagName !== "TEXTAREA" &&
        !e.target.closest(".toolbar-btn") &&
        !e.target.closest(".color-btn") &&
        !e.target.closest(".thickness-btn")
      ) {
        finishEditingText();
      }
    };

    // Delay binding to prevent immediate trigger on the pointerdown that opened it
    const timeout = setTimeout(() => {
      window.addEventListener("mousedown", handleWindowClick);
      window.addEventListener("touchstart", handleWindowClick);
    }, 100);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousedown", handleWindowClick);
      window.removeEventListener("touchstart", handleWindowClick);
    };
  }, [editingText]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  // Erases elements intersecting the coordinate (x,y)
  const eraseAt = (x, y) => {
    let hitIndex = -1;

    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      if (el.type === "pencil") {
        const isNear = el.points.some((p2, idx) => {
          if (idx === 0) return false;
          const p1 = el.points[idx - 1];
          return distanceToSegment({ x, y }, p1, p2) < (el.lineWidth + 10);
        });
        if (isNear) {
          hitIndex = i;
          break;
        }
      } else if (el.type === "text") {
        const textWidth = el.text.length * (el.fontSize * 0.55);
        const textHeight = el.fontSize;
        if (
          x >= el.x - 6 &&
          x <= el.x + textWidth + 6 &&
          y >= el.y - textHeight - 4 &&
          y <= el.y + 6
        ) {
          hitIndex = i;
          break;
        }
      } else if (el.type === "image") {
        if (
          x >= el.x - 6 &&
          x <= el.x + el.width + 6 &&
          y >= el.y - 6 &&
          y <= el.y + el.height + 6
        ) {
          hitIndex = i;
          break;
        }
      }
    }

    if (hitIndex !== -1) {
      setElements((prev) => prev.filter((_, idx) => idx !== hitIndex));
    }
  };

  const handlePointerDown = (e) => {
    const { x, y } = getCoordinates(e);

    if (tool === "pen") {
      setIsDrawing(true);
      setCurrentPoints([{ x, y }]);
    } else if (tool === "eraser") {
      setIsErasing(true);
      eraseAt(x, y);
    } else if (tool === "select") {
      // Find draggable text or image elements
      let found = null;
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];
        if (el.type === "text") {
          const textWidth = el.text.length * (el.fontSize * 0.55);
          const textHeight = el.fontSize;
          if (
            x >= el.x - 4 &&
            x <= el.x + textWidth + 4 &&
            y >= el.y - textHeight - 2 &&
            y <= el.y + 4
          ) {
            found = el;
            break;
          }
        } else if (el.type === "image") {
          if (
            x >= el.x &&
            x <= el.x + el.width &&
            y >= el.y &&
            y <= el.y + el.height
          ) {
            found = el;
            break;
          }
        }
      }
      if (found) {
        setDraggingElement(found);
        setDragOffset({ x: x - found.x, y: y - found.y });
      }
    } else if (tool === "text") {
      if (editingText) {
        finishEditingText();
      } else {
        setEditingText({ x, y, value: "" });
      }
    }
  };

  const handlePointerMove = (e) => {
    const { x, y } = getCoordinates(e);

    if (tool === "pen" && isDrawing) {
      setCurrentPoints((prev) => [...prev, { x, y }]);
    } else if (tool === "eraser" && isErasing) {
      eraseAt(x, y);
    } else if (tool === "select" && draggingElement) {
      setElements((prev) =>
        prev.map((el) => {
          if (el.id === draggingElement.id) {
            return { ...el, x: x - dragOffset.x, y: y - dragOffset.y };
          }
          return el;
        })
      );
    }
  };

  const handlePointerUp = () => {
    if (tool === "pen" && isDrawing && currentPoints && currentPoints.length > 0) {
      const newEl = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: "pencil",
        points: currentPoints,
        color: color,
        lineWidth: lineWidth
      };
      setElements((prev) => [...prev, newEl]);
      setCurrentPoints(null);
    }
    setIsDrawing(false);
    setIsErasing(false);
    setDraggingElement(null);
  };

  const finishEditingText = () => {
    if (editingText && editingText.value.trim() !== "") {
      const newEl = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: "text",
        text: editingText.value,
        x: editingText.x,
        y: editingText.y,
        color: color,
        fontSize: 16
      };
      setElements((prev) => [...prev, newEl]);
    }
    setEditingText(null);
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      finishEditingText();
    }
  };

  const selectTool = (t) => {
    if (editingText) {
      finishEditingText();
    }
    setTool(t);
  };

  // PDF.js rendering pipeline: parses a PDF file dynamically on client and extracts the first page
  const renderPdfFile = async (arrayBuffer) => {
    setPdfLoading(true);
    try {
      let pdfjs = window["pdfjs-dist/build/pdf"];
      if (!pdfjs) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js";
          script.onload = () => {
            pdfjs = window["pdfjs-dist/build/pdf"];
            pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
            resolve();
          };
          script.onerror = reject;
          document.body.appendChild(script);
        });
      } else {
        pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
      }

      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });

      // Render page content to a temporary scaling canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport: viewport }).promise;

      const dataUrl = canvas.toDataURL("image/png");
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        const maxW = canvasSize.width * 0.7;
        const maxH = canvasSize.height * 0.7;

        if (w > maxW) {
          h = (maxW / w) * h;
          w = maxW;
        }
        if (h > maxH) {
          w = (maxH / h) * w;
          h = maxH;
        }

        const newEl = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          type: "image",
          src: dataUrl,
          img: img,
          x: (canvasSize.width - w) / 2,
          y: (canvasSize.height - h) / 2,
          width: w,
          height: h
        };
        setElements((prev) => [...prev, newEl]);
        setPdfLoading(false);
        selectTool("select");
      };
    } catch (err) {
      console.error("PDF extraction error:", err);
      alert("Failed to render PDF document. Attempting to run standard image fallback.");
      setPdfLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (event) => {
        renderPdfFile(event.target.result);
      };
      reader.readAsArrayBuffer(file);
    } else {
      // standard image load
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          let w = img.width;
          let h = img.height;
          const maxW = canvasSize.width * 0.7;
          const maxH = canvasSize.height * 0.7;

          if (w > maxW) {
            h = (maxW / w) * h;
            w = maxW;
          }
          if (h > maxH) {
            w = (maxH / h) * w;
            h = maxH;
          }

          const newEl = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            type: "image",
            src: dataUrl,
            img: img,
            x: (canvasSize.width - w) / 2,
            y: (canvasSize.height - h) / 2,
            width: w,
            height: h
          };
          setElements((prev) => [...prev, newEl]);
          selectTool("select");
        };
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const clearCanvas = () => {
    if (window.confirm("Are you sure you want to clear the whiteboard?")) {
      setElements([]);
      setEditingText(null);
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `tutoring-whiteboard-${Date.now()}.png`;
    link.href = image;
    link.click();
  };

  return (
    <div className="whiteboard-container">
      {/* Whiteboard Toolbar Controls */}
      <div className="whiteboard-toolbar">
        <div className="toolbar-group">
          {/* Pencil Tool */}
          <button
            className={`toolbar-btn ${tool === "pen" ? "active" : ""}`}
            onClick={() => selectTool("pen")}
            title="Draw (Pen)"
          >
            <Paintbrush size={18} />
          </button>
          
          {/* Select / Move Tool */}
          <button
            className={`toolbar-btn ${tool === "select" ? "active" : ""}`}
            onClick={() => selectTool("select")}
            title="Select & Move Objects"
          >
            <Move size={18} />
          </button>

          {/* Text Tool */}
          <button
            className={`toolbar-btn ${tool === "text" ? "active" : ""}`}
            onClick={() => selectTool("text")}
            title="Type Text Box"
          >
            <Type size={18} />
          </button>

          {/* Eraser Tool */}
          <button
            className={`toolbar-btn ${tool === "eraser" ? "active" : ""}`}
            onClick={() => selectTool("eraser")}
            title="Stroke Eraser (Click to erase any element)"
          >
            <Eraser size={18} />
          </button>
        </div>

        {/* Color Palette (available when not erasing or moving images) */}
        {tool !== "eraser" && tool !== "select" && (
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

        {/* Line Thickness */}
        {tool === "pen" && (
          <div className="toolbar-group">
            <span className="toolbar-label">Size:</span>
            {[2, 4, 8, 12].map((size) => (
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
        )}

        {/* Document/Image Upload Button */}
        <div className="toolbar-group">
          <button
            className="toolbar-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Upload PDF Worksheet or Image"
            style={{ minWidth: "auto", padding: "0 0.5rem", gap: "0.25rem" }}
            disabled={pdfLoading}
          >
            <Upload size={18} />
            <span style={{ fontSize: "0.75rem", fontWeight: 800 }}>
              {pdfLoading ? "Rendering PDF..." : "Upload Document"}
            </span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,application/pdf"
            style={{ display: "none" }}
          />
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
        {editingText && (
          <textarea
            autoFocus
            placeholder="Type here..."
            value={editingText.value}
            onChange={(e) => setEditingText({ ...editingText, value: e.target.value })}
            onKeyDown={handleTextareaKeyDown}
            style={{
              position: "absolute",
              left: `${editingText.x}px`,
              top: `${editingText.y - 12}px`,
              font: "bold 16px Outfit, sans-serif",
              color: color,
              border: "1.5px dashed var(--primary)",
              background: "#ffffff",
              outline: "none",
              padding: "2px 4px",
              borderRadius: "4px",
              resize: "none",
              zIndex: 10,
              minWidth: "150px",
              height: "auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
            }}
          />
        )}

        <canvas
          ref={canvasRef}
          width={canvasSize.width * 2}
          height={canvasSize.height * 2}
          style={{ width: `${canvasSize.width}px`, height: `${canvasSize.height}px` }}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          className="whiteboard-canvas"
        />
      </div>
    </div>
  );
}
