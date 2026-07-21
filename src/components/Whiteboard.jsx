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

// Helper function to split text into wrapped lines based on container width and styles
// This version supports manual linebreaks and dynamically breaks ultra-long continuous strings (without spaces) character-by-character
const getTextLines = (ctx, text, fontStyle, maxWidth) => {
  if (!ctx) return text.split("\n");
  ctx.save();
  ctx.font = fontStyle;
  
  const paragraphs = text.split("\n");
  const lines = [];
  
  paragraphs.forEach((para) => {
    // If paragraph is empty, push an empty line
    if (para.trim() === "") {
      lines.push("");
      return;
    }
    
    const words = para.split(" ");
    let currentLine = "";
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const wordWidth = ctx.measureText(word).width;
      
      // If a single word itself exceeds maxWidth, break it character-by-character
      if (wordWidth > maxWidth) {
        if (currentLine) {
          lines.push(currentLine.trim());
          currentLine = "";
        }
        
        let charLine = "";
        for (let j = 0; j < word.length; j++) {
          const char = word[j];
          const testCharLine = charLine + char;
          const testCharWidth = ctx.measureText(testCharLine).width;
          if (testCharWidth > maxWidth) {
            lines.push(charLine);
            charLine = char;
          } else {
            charLine = testCharLine;
          }
        }
        currentLine = charLine + " ";
      } else {
        const testLine = currentLine + word + " ";
        const testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth && i > 0) {
          lines.push(currentLine.trim());
          currentLine = word + " ";
        } else {
          currentLine = testLine;
        }
      }
    }
    
    if (currentLine) {
      lines.push(currentLine.trim());
    }
  });
  
  ctx.restore();
  return lines;
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
  
  // Text element state (supporting rich editing variables)
  const [editingText, setEditingText] = useState(null); // { id, x, y, value, width, fontSize, bold, italic, underline }

  // Dragging states
  const [draggingElement, setDraggingElement] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Resizing states
  const [resizingElement, setResizingElement] = useState(null);
  const [resizeStartSize, setResizeStartSize] = useState({ width: 0, height: 0, fontSize: 16 });
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const [hoveringHandle, setHoveringHandle] = useState(false);

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
      // Hide the element currently being edited to avoid duplicate text overlapping
      if (editingText && el.id === editingText.id) return;

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
        const fontStyle = `${el.italic ? "italic" : "normal"} ${el.bold ? "bold" : "normal"} ${el.fontSize}px Outfit, sans-serif`;
        ctx.font = fontStyle;
        ctx.textBaseline = "alphabetic";

        const lines = getTextLines(ctx, el.text, fontStyle, el.width);
        const lineHeight = el.fontSize * 1.2;

        lines.forEach((line, idx) => {
          const ly = el.y + idx * lineHeight;
          ctx.fillText(line, el.x, ly);

          if (el.underline) {
            const textWidth = ctx.measureText(line).width;
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = el.color;
            ctx.lineWidth = Math.max(1.5, el.fontSize / 10);
            ctx.moveTo(el.x, ly + 2);
            ctx.lineTo(el.x + textWidth, ly + 2);
            ctx.stroke();
            ctx.restore();
          }
        });
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

    // Render selection indicators/bounding boxes and resize handles in select mode
    if (tool === "select") {
      elements.forEach((el) => {
        if (el.type === "text") {
          const fontStyle = `${el.italic ? "italic" : "normal"} ${el.bold ? "bold" : "normal"} ${el.fontSize}px Outfit, sans-serif`;
          const lines = getTextLines(ctx, el.text, fontStyle, el.width);
          const lineHeight = el.fontSize * 1.2;
          const textHeight = lines.length * lineHeight;

          ctx.strokeStyle = "rgba(99, 102, 241, 0.45)";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          // Dashed border wraps entire block of text lines
          ctx.strokeRect(el.x - 4, el.y - el.fontSize - 2, el.width + 8, textHeight + 4);
          ctx.setLineDash([]);

          // Resize handle controls width (causing text to wrap instead of scaling font)
          ctx.fillStyle = "#6366f1";
          ctx.fillRect(el.x + el.width - 4, el.y + (lines.length - 1) * lineHeight - 4, 8, 8);
        } else if (el.type === "image") {
          ctx.strokeStyle = "rgba(99, 102, 241, 0.45)";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(el.x - 2, el.y - 2, el.width + 4, el.height + 4);
          ctx.setLineDash([]);

          // Bounding box resize handle
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
  }, [canvasSize, elements, currentPoints, tool, color, lineWidth, editingText]);

  // Click outside textarea window listener to save typing
  useEffect(() => {
    if (!editingText) return;

    const handleWindowClick = (e) => {
      // If clicking anything other than the textarea box itself, format buttons, or toolbar buttons
      if (
        e.target.tagName !== "TEXTAREA" &&
        !e.target.closest(".toolbar-btn") &&
        !e.target.closest(".color-btn") &&
        !e.target.closest(".thickness-btn") &&
        !e.target.closest(".text-format-btn")
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
        const fontStyle = `${el.italic ? "italic" : "normal"} ${el.bold ? "bold" : "normal"} ${el.fontSize}px Outfit, sans-serif`;
        const lines = getTextLines(contextRef.current, el.text, fontStyle, el.width);
        const textHeight = lines.length * (el.fontSize * 1.2);
        if (
          x >= el.x - 6 &&
          x <= el.x + el.width + 6 &&
          y >= el.y - el.fontSize - 4 &&
          y <= el.y - el.fontSize + textHeight + 6
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
      // 1. Check if we clicked on any element's resize handle first
      let handleFound = null;
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];
        if (el.type === "image") {
          const rx = el.x + el.width;
          const ry = el.y + el.height;
          if (Math.abs(x - rx) <= 10 && Math.abs(y - ry) <= 10) {
            handleFound = { element: el, type: "image" };
            break;
          }
        } else if (el.type === "text") {
          const fontStyle = `${el.italic ? "italic" : "normal"} ${el.bold ? "bold" : "normal"} ${el.fontSize}px Outfit, sans-serif`;
          const lines = getTextLines(contextRef.current, el.text, fontStyle, el.width);
          const rx = el.x + el.width;
          const ry = el.y + (lines.length - 1) * (el.fontSize * 1.2);
          if (Math.abs(x - rx) <= 10 && Math.abs(y - ry) <= 10) {
            handleFound = { element: el, type: "text" };
            break;
          }
        }
      }

      if (handleFound) {
        setResizingElement(handleFound.element);
        setResizeStartPos({ x, y });
        setResizeStartSize({
          width: handleFound.element.width || 0,
          height: handleFound.element.height || 0,
          fontSize: handleFound.element.fontSize || 16
        });
        return; // prevent dragging trigger
      }

      // 2. Check for draggable text or image elements
      let found = null;
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];
        if (el.type === "text") {
          const fontStyle = `${el.italic ? "italic" : "normal"} ${el.bold ? "bold" : "normal"} ${el.fontSize}px Outfit, sans-serif`;
          const lines = getTextLines(contextRef.current, el.text, fontStyle, el.width);
          const textHeight = lines.length * (el.fontSize * 1.2);
          if (
            x >= el.x - 4 &&
            x <= el.x + el.width + 4 &&
            y >= el.y - el.fontSize - 2 &&
            y <= el.y - el.fontSize + textHeight + 2
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
        setEditingText({
          id: null,
          x,
          y,
          value: "",
          width: 200, // default width
          fontSize: 16,
          bold: false,
          italic: false,
          underline: false
        });
      }
    }
  };

  const handlePointerMove = (e) => {
    const { x, y } = getCoordinates(e);

    if (tool === "pen" && isDrawing) {
      setCurrentPoints((prev) => [...prev, { x, y }]);
    } else if (tool === "eraser" && isErasing) {
      eraseAt(x, y);
    } else if (tool === "select" && resizingElement) {
      // Handle resizing calculations
      const dx = x - resizeStartPos.x;
      const dy = y - resizeStartPos.y;

      setElements((prev) =>
        prev.map((el) => {
          if (el.id === resizingElement.id) {
            if (el.type === "image") {
              const newW = Math.max(30, resizeStartSize.width + dx);
              const newH = Math.max(30, resizeStartSize.height + dy);
              return { ...el, width: newW, height: newH };
            } else if (el.type === "text") {
              // Resizing textbox changes width (causes text to wrap)
              const newW = Math.max(80, resizeStartSize.width + dx);
              return { ...el, width: newW };
            }
          }
          return el;
        })
      );
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

    // Dynamic cursor feedback: sets cursor to resize arrow when hovering over handle in select mode
    if (tool === "select" && !isDrawing && !isErasing && !draggingElement && !resizingElement) {
      let overHandle = false;
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];
        if (el.type === "image") {
          const rx = el.x + el.width;
          const ry = el.y + el.height;
          if (Math.abs(x - rx) <= 10 && Math.abs(y - ry) <= 10) {
            overHandle = true;
            break;
          }
        } else if (el.type === "text") {
          const fontStyle = `${el.italic ? "italic" : "normal"} ${el.bold ? "bold" : "normal"} ${el.fontSize}px Outfit, sans-serif`;
          const lines = getTextLines(contextRef.current, el.text, fontStyle, el.width);
          const rx = el.x + el.width;
          const ry = el.y + (lines.length - 1) * (el.fontSize * 1.2);
          if (Math.abs(x - rx) <= 10 && Math.abs(y - ry) <= 10) {
            overHandle = true;
            break;
          }
        }
      }
      setHoveringHandle(overHandle);
    } else if (resizingElement) {
      setHoveringHandle(true);
    } else {
      setHoveringHandle(false);
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
    setResizingElement(null);
  };

  // Native double click handler for editing text box (100% reliable)
  const handleDoubleClick = (e) => {
    if (tool !== "select") return;
    const { x, y } = getCoordinates(e);

    let textEl = null;
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      if (el.type === "text") {
        const fontStyle = `${el.italic ? "italic" : "normal"} ${el.bold ? "bold" : "normal"} ${el.fontSize}px Outfit, sans-serif`;
        const lines = getTextLines(contextRef.current, el.text, fontStyle, el.width);
        const textHeight = lines.length * (el.fontSize * 1.2);
        
        if (
          x >= el.x - 10 &&
          x <= el.x + el.width + 10 &&
          y >= el.y - el.fontSize - 10 &&
          y <= el.y - el.fontSize + textHeight + 10
        ) {
          textEl = el;
          break;
        }
      }
    }

    if (textEl) {
      setDraggingElement(null);
      setEditingText({
        id: textEl.id,
        x: textEl.x,
        y: textEl.y,
        value: textEl.text,
        width: textEl.width,
        fontSize: textEl.fontSize,
        bold: textEl.bold,
        italic: textEl.italic,
        underline: textEl.underline
      });
    }
  };

  const finishEditingText = () => {
    if (editingText) {
      if (editingText.value.trim() !== "") {
        if (editingText.id) {
          // Update existing text element
          setElements((prev) =>
            prev.map((el) => {
              if (el.id === editingText.id) {
                return {
                  ...el,
                  text: editingText.value,
                  fontSize: editingText.fontSize,
                  width: editingText.width,
                  bold: editingText.bold,
                  italic: editingText.italic,
                  underline: editingText.underline
                };
              }
              return el;
            })
          );
        } else {
          // Create new text element
          const newEl = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            type: "text",
            text: editingText.value,
            x: editingText.x,
            y: editingText.y,
            width: editingText.width || 200,
            color: color,
            fontSize: editingText.fontSize || 16,
            bold: editingText.bold || false,
            italic: editingText.italic || false,
            underline: editingText.underline || false
          };
          setElements((prev) => [...prev, newEl]);
        }
      } else {
        // If editing box is left empty, remove it
        if (editingText.id) {
          setElements((prev) => prev.filter((el) => el.id !== editingText.id));
        }
      }
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
          
          {/* Select / Move / Resize Tool */}
          <button
            className={`toolbar-btn ${tool === "select" ? "active" : ""}`}
            onClick={() => selectTool("select")}
            title="Select, Move & Resize Objects"
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
        {/* Floating Text Formatting Toolbar Bar (Above textarea when typing or double-clicking) */}
        {editingText && (
          <div
            className="text-format-toolbar"
            style={{
              position: "absolute",
              left: `${editingText.x}px`,
              top: `${editingText.y - 48}px`,
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              backgroundColor: "#1e293b",
              border: "1px solid #475569",
              borderRadius: "6px",
              padding: "0.3rem 0.5rem",
              zIndex: 100,
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
            }}
          >
            {/* Bold */}
            <button
              onClick={() => setEditingText({ ...editingText, bold: !editingText.bold })}
              className="text-format-btn"
              style={{
                background: editingText.bold ? "#6366f1" : "none",
                border: "none",
                color: "#ffffff",
                fontWeight: "bold",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.8rem"
              }}
              title="Bold"
            >
              B
            </button>
            {/* Italic */}
            <button
              onClick={() => setEditingText({ ...editingText, italic: !editingText.italic })}
              className="text-format-btn"
              style={{
                background: editingText.italic ? "#6366f1" : "none",
                border: "none",
                color: "#ffffff",
                fontStyle: "italic",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.8rem"
              }}
              title="Italic"
            >
              I
            </button>
            {/* Underline */}
            <button
              onClick={() => setEditingText({ ...editingText, underline: !editingText.underline })}
              className="text-format-btn"
              style={{
                background: editingText.underline ? "#6366f1" : "none",
                border: "none",
                color: "#ffffff",
                textDecoration: "underline",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.8rem"
              }}
              title="Underline"
            >
              U
            </button>
            {/* Splitter */}
            <div style={{ width: "1px", height: "16px", backgroundColor: "#475569", margin: "0 0.2rem" }} />
            {/* Font Size decrease */}
            <button
              onClick={() => setEditingText({ ...editingText, fontSize: Math.max(10, editingText.fontSize - 2) })}
              className="text-format-btn"
              style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontSize: "0.8rem" }}
              title="Decrease Font Size"
            >
              A-
            </button>
            <span style={{ color: "#ffffff", fontSize: "0.75rem", fontWeight: 800 }}>
              {editingText.fontSize}px
            </span>
            {/* Font Size increase */}
            <button
              onClick={() => setEditingText({ ...editingText, fontSize: Math.min(72, editingText.fontSize + 2) })}
              className="text-format-btn"
              style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontSize: "0.8rem" }}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>
        )}

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
              width: `${editingText.width}px`,
              font: `${editingText.italic ? "italic" : "normal"} ${editingText.bold ? "bold" : "normal"} ${editingText.fontSize}px Outfit, sans-serif`,
              textDecoration: editingText.underline ? "underline" : "none",
              color: color,
              border: "1.5px dashed var(--primary)",
              background: "#ffffff",
              outline: "none",
              padding: "2px 4px",
              borderRadius: "4px",
              resize: "none",
              zIndex: 10,
              height: "auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
            }}
          />
        )}

        <canvas
          ref={canvasRef}
          width={canvasSize.width * 2}
          height={canvasSize.height * 2}
          style={{
            width: `${canvasSize.width}px`,
            height: `${canvasSize.height}px`,
            cursor: hoveringHandle ? "se-resize" : tool === "select" ? "default" : "crosshair"
          }}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onDoubleClick={handleDoubleClick}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          className="whiteboard-canvas"
        />
      </div>
    </div>
  );
}
