import React, { useRef, useState, useEffect } from "react";
import { Paintbrush, Eraser, Trash2, Download, Circle, Type, Image as ImageIcon, Move, Upload, Grid3X3, Compass, Undo2, MonitorUp, Shapes, ChevronDown } from "lucide-react";

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

// Computes normalized dimensions for shapes that require fixed mathematical aspect ratios
const normalizeShapeBox = (shapeType, startX, startY, endX, endY) => {
  const rawW = Math.abs(endX - startX);
  const rawH = Math.abs(endY - startY);
  const dirX = endX >= startX ? 1 : -1;
  const dirY = endY >= startY ? 1 : -1;

  let w = rawW;
  let h = rawH;

  if (
    shapeType === "circle" ||
    shapeType === "quad-square" ||
    shapeType === "pentagon" ||
    shapeType === "hexagon"
  ) {
    const side = Math.max(rawW, rawH);
    w = side;
    h = side;
  } else if (shapeType === "triangle-equilateral") {
    const side = Math.max(rawW, rawH);
    w = side;
    h = Math.round(side * (Math.sqrt(3) / 2));
  }

  const x = dirX >= 0 ? startX : startX - w;
  const y = dirY >= 0 ? startY : startY - h;
  return { x, y, width: w, height: h };
};

// Returns polygon vertices (or circle parameters) for any 2D shape element
const getShapeGeometry = (el) => {
  const { shapeType, x, y, width: w, height: h } = el;
  const cx = x + w / 2;
  const cy = y + h / 2;

  if (shapeType === "circle") {
    const r = Math.min(w, h) / 2;
    return { isCircle: true, cx, cy, r };
  }

  let points = [];
  if (shapeType === "triangle-equilateral") {
    const side = w;
    const eqH = side * (Math.sqrt(3) / 2);
    points = [
      { x: cx, y: cy - eqH / 2 },
      { x: cx + side / 2, y: cy + eqH / 2 },
      { x: cx - side / 2, y: cy + eqH / 2 }
    ];
  } else if (shapeType === "triangle-isosceles") {
    points = [
      { x: cx, y },
      { x: x + w, y: y + h },
      { x, y: y + h }
    ];
  } else if (shapeType === "triangle-right") {
    points = [
      { x, y },
      { x, y: y + h },
      { x: x + w, y: y + h }
    ];
  } else if (shapeType === "quad-square") {
    const s = Math.min(w, h);
    const sx = cx - s / 2;
    const sy = cy - s / 2;
    points = [
      { x: sx, y: sy },
      { x: sx + s, y: sy },
      { x: sx + s, y: sy + s },
      { x: sx, y: sy + s }
    ];
  } else if (shapeType === "quad-rectangle") {
    points = [
      { x, y },
      { x: x + w, y },
      { x: x + w, y: y + h },
      { x, y: y + h }
    ];
  } else if (shapeType === "quad-parallelogram") {
    const offset = w * 0.22;
    points = [
      { x: x + offset, y },
      { x: x + w, y },
      { x: x + w - offset, y: y + h },
      { x, y: y + h }
    ];
  } else if (shapeType === "quad-trapezoid") {
    const inset = w * 0.22;
    points = [
      { x: x + inset, y },
      { x: x + w - inset, y },
      { x: x + w, y: y + h },
      { x, y: y + h }
    ];
  } else if (shapeType === "quad-rhombus") {
    points = [
      { x: cx, y },
      { x: x + w, y: cy },
      { x: cx, y: y + h },
      { x, y: cy }
    ];
  } else if (shapeType === "pentagon") {
    const r = Math.min(w, h) / 2;
    for (let k = 0; k < 5; k++) {
      const angle = -Math.PI / 2 + (k * 2 * Math.PI) / 5;
      points.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
    }
  } else if (shapeType === "hexagon") {
    const r = Math.min(w, h) / 2;
    for (let k = 0; k < 6; k++) {
      const angle = -Math.PI / 2 + (k * 2 * Math.PI) / 6;
      points.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
    }
  } else {
    points = [
      { x, y },
      { x: x + w, y },
      { x: x + w, y: y + h },
      { x, y: y + h }
    ];
  }

  return { isCircle: false, points };
};

// Draws a 2D shape onto the canvas context
const drawShapeOnCtx = (ctx, el) => {
  if (!el || el.width < 2 || el.height < 2) return;
  const geom = getShapeGeometry(el);
  ctx.save();
  ctx.strokeStyle = el.color || "#3b82f6";
  ctx.lineWidth = el.lineWidth || 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.beginPath();
  if (geom.isCircle) {
    ctx.arc(geom.cx, geom.cy, Math.max(1, geom.r), 0, Math.PI * 2);
  } else if (geom.points && geom.points.length > 0) {
    ctx.moveTo(geom.points[0].x, geom.points[0].y);
    for (let i = 1; i < geom.points.length; i++) {
      ctx.lineTo(geom.points[i].x, geom.points[i].y);
    }
    ctx.closePath();
  }
  ctx.stroke();

  // Draw small right-angle square indicator for right triangles if large enough
  if (el.shapeType === "triangle-right" && el.width >= 28 && el.height >= 28) {
    const sq = Math.min(12, el.width * 0.18, el.height * 0.18);
    ctx.beginPath();
    ctx.lineWidth = Math.max(1.5, (el.lineWidth || 3) * 0.65);
    ctx.moveTo(el.x, el.y + el.height - sq);
    ctx.lineTo(el.x + sq, el.y + el.height - sq);
    ctx.lineTo(el.x + sq, el.y + el.height);
    ctx.stroke();
  }

  ctx.restore();
};

// Checks if point (x, y) is near a shape's boundary (for stroke eraser)
const isPointNearShape = (pt, el) => {
  const threshold = (el.lineWidth || 3) + 10;
  const geom = getShapeGeometry(el);
  if (geom.isCircle) {
    const distFromCenter = Math.sqrt((pt.x - geom.cx) ** 2 + (pt.y - geom.cy) ** 2);
    return Math.abs(distFromCenter - geom.r) <= threshold;
  }
  const pts = geom.points || [];
  for (let i = 0; i < pts.length; i++) {
    const p1 = pts[i];
    const p2 = pts[(i + 1) % pts.length];
    if (distanceToSegment(pt, p1, p2) <= threshold) {
      return true;
    }
  }
  return false;
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

// Helper function to compress and scale uploaded images/worksheets to fit data channel limits (<50KB)
const compressImage = (img, callback) => {
  const maxDim = 800; // Resize down to maximum 800px width/height
  let w = img.width;
  let h = img.height;
  if (w > maxDim || h > maxDim) {
    if (w > h) {
      h = (maxDim / w) * h;
      w = maxDim;
    } else {
      w = (maxDim / h) * w;
      h = maxDim;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, w, h);

  // Export to JPEG with a compression quality of 0.4
  const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.4);
  callback(compressedDataUrl, w, h);
};

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const fileInputRef = useRef(null);
  const customColorInputRef = useRef(null);
  const imageCacheRef = useRef(new Map());
  const incomingChunksRef = useRef({});

  // Core whiteboard states
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentPoints, setCurrentPoints] = useState(null);
  const [currentShape, setCurrentShape] = useState(null);
  const [color, setColor] = useState("#3b82f6"); // Default Blue
  const [customColor, setCustomColor] = useState("#8b5cf6"); // Custom picker color
  const [lineWidth, setLineWidth] = useState(4);
  const [tool, setTool] = useState("pen"); // "pen" | "eraser" | "text" | "select" | "shape"
  const [selectedShape, setSelectedShape] = useState("triangle-equilateral");
  const [openShapeCategory, setOpenShapeCategory] = useState(null); // "triangles" | "quadrilaterals" | null
  const [background, setBackground] = useState("none"); // "none" | "grid" | "axes"
  const backgroundRef = useRef("none");

  useEffect(() => {
    backgroundRef.current = background;
  }, [background]);

  const pushHistory = (snapshot) => {
    setHistory((prev) => [...prev.slice(-29), snapshot]);
  };

  // Interaction helper states
  const [canvasSize, setCanvasSize] = useState({ width: 2400, height: 1800 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  // Helper to identify our own messages to prevent feedback loops
  const myClientId = window.mathWithLoveClientId || (window.mathWithLoveClientId = Date.now().toString() + Math.random().toString(36).substr(2, 9));

  // Low-level packet sender via Jitsi WebRTC Data Channels and Group Chat fallback
  const sendRawString = (str, targetParticipantId = null) => {
    if (!window.jitsiApi) return;
    try {
      if (targetParticipantId) {
        window.jitsiApi.executeCommand('sendEndpointTextMessage', targetParticipantId, str);
      } else {
        window.jitsiApi.executeCommand('sendEndpointTextMessage', undefined, str);
        window.jitsiApi.executeCommand('sendEndpointTextMessage', '', str);

        const participants = window.jitsiApi.getParticipantsInfo?.();
        if (participants && participants.length > 0) {
          participants.forEach((p) => {
            if (p.id) {
              window.jitsiApi.executeCommand('sendEndpointTextMessage', p.id, str);
            }
          });
        }
      }

      // Fallback: Jitsi XMPP Group Chat
      window.jitsiApi.executeCommand('sendChatMessage', '[WB]:' + str);
    } catch (e) {
      console.error("Failed to send raw whiteboard packet:", e);
    }
  };

  // Helper to broadcast messages (with automatic chunking for large PDF/image documents)
  const broadcast = (cmd, targetParticipantId = null) => {
    if (!window.jitsiApi) return;
    try {
      const cleanCmd = { ...cmd };
      if (cleanCmd.element && cleanCmd.element.img) {
        const { img, ...rest } = cleanCmd.element;
        cleanCmd.element = rest;
      }
      if (Array.isArray(cleanCmd.elements)) {
        cleanCmd.elements = cleanCmd.elements.map(({ img, ...rest }) => rest);
      }

      const payload = { ...cleanCmd, senderId: myClientId, mathWithLoveWhiteboard: true };
      const payloadStr = JSON.stringify(payload);

      const CHUNK_SIZE = 3000;
      if (payloadStr.length <= CHUNK_SIZE) {
        sendRawString(payloadStr, targetParticipantId);
      } else {
        const msgId = Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
        const total = Math.ceil(payloadStr.length / CHUNK_SIZE);
        for (let i = 0; i < total; i++) {
          const chunkPayload = JSON.stringify({
            mathWithLoveWhiteboard: true,
            mathWithLoveChunk: true,
            senderId: myClientId,
            msgId,
            index: i,
            total,
            data: payloadStr.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
          });
          setTimeout(() => {
            sendRawString(chunkPayload, targetParticipantId);
          }, i * 35);
        }
      }
    } catch (e) {
      console.error("Failed to broadcast whiteboard command:", e);
    }
  };

  useEffect(() => {
    const processIncomingPayload = (payloadStr, remoteSenderId) => {
      try {
        const msg = JSON.parse(payloadStr);
        if (!msg || !msg.mathWithLoveWhiteboard) return;
        if (msg.senderId === myClientId) return; // Ignore our own broadcasted actions

        // Reassemble chunked payloads (for shared PDFs and images)
        if (msg.mathWithLoveChunk) {
          const bucket = incomingChunksRef.current[msg.msgId] || {
            chunks: new Array(msg.total),
            receivedCount: 0,
            total: msg.total
          };
          if (bucket.chunks[msg.index] === undefined) {
            bucket.chunks[msg.index] = msg.data;
            bucket.receivedCount += 1;
          }
          incomingChunksRef.current[msg.msgId] = bucket;

          if (bucket.receivedCount === bucket.total) {
            const fullPayloadStr = bucket.chunks.join("");
            delete incomingChunksRef.current[msg.msgId];
            processIncomingPayload(fullPayloadStr, remoteSenderId);
          }
          return;
        }

        console.log("Whiteboard collaborative command received:", msg.type, msg);

        if (msg.type === "ADD_ELEMENT") {
          setElements((prev) => {
            if (prev.some((el) => el.id === msg.element.id)) return prev;
            return [...prev, msg.element];
          });
        } else if (msg.type === "UPDATE_ELEMENT") {
          setElements((prev) =>
            prev.map((el) => (el.id === msg.id ? { ...el, ...msg.updates } : el))
          );
        } else if (msg.type === "DELETE_ELEMENT") {
          setElements((prev) => {
            pushHistory(prev);
            return prev.filter((el) => el.id !== msg.id);
          });
        } else if (msg.type === "CLEAR_BOARD") {
          setElements((prev) => {
            if (prev.length > 0) pushHistory(prev);
            return [];
          });
          setEditingText(null);
        } else if (msg.type === "SYNC_ELEMENTS") {
          if (Array.isArray(msg.elements)) {
            setElements(msg.elements);
            setEditingText(null);
          }
        } else if (msg.type === "SET_BACKGROUND") {
          setBackground(msg.background || "none");
        } else if (msg.type === "REQUEST_STATE") {
          // If we have elements or an active background on our board, reply with our state
          setElements((currentElements) => {
            if ((currentElements.length > 0 || backgroundRef.current !== "none") && window.jitsiApi) {
              broadcast(
                {
                  type: "INITIAL_STATE",
                  elements: currentElements,
                  background: backgroundRef.current
                },
                remoteSenderId
              );
            }
            return currentElements;
          });
        } else if (msg.type === "INITIAL_STATE") {
          if (msg.elements) setElements(msg.elements);
          if (msg.background !== undefined) setBackground(msg.background);
        }
      } catch (err) {
        // Ignore non-whiteboard JSON payloads
      }
    };

    const handleSyncMessage = (event) => {
      if (event && event.eventData && event.eventData.text) {
        processIncomingPayload(event.eventData.text, event.senderInfo ? event.senderInfo.id : null);
      }
    };

    const handleIncomingChatMessage = (event) => {
      if (event && event.message && event.message.startsWith('[WB]:')) {
        processIncomingPayload(event.message.substring(5), null);
      }
    };

    const handleParticipantJoined = () => {
      // Send current state to newly joined participant
      setElements((currentElements) => {
        if ((currentElements.length > 0 || backgroundRef.current !== "none") && window.jitsiApi) {
          broadcast({
            type: "INITIAL_STATE",
            elements: currentElements,
            background: backgroundRef.current
          });
        }
        return currentElements;
      });
    };

    const handleVideoConferenceJoined = () => {
      console.log("Joined/reconnected to video conference, requesting whiteboard state...");
      broadcast({ type: "REQUEST_STATE" });
    };

    // Periodically request state during initial connection settling
    let requestCount = 0;
    const requestInterval = setInterval(() => {
      if (window.jitsiApi && requestCount < 3) {
        broadcast({ type: "REQUEST_STATE" });
        requestCount++;
      } else if (requestCount >= 3) {
        clearInterval(requestInterval);
      }
    }, 3000);

    if (window.jitsiApi) {
      window.jitsiApi.on("endpointTextMessageReceived", handleSyncMessage);
      window.jitsiApi.on("incomingMessage", handleIncomingChatMessage);
      broadcast({ type: "REQUEST_STATE" });
    }

    const handleJitsiReady = () => {
      if (window.jitsiApi) {
        window.jitsiApi.on("endpointTextMessageReceived", handleSyncMessage);
        window.jitsiApi.on("incomingMessage", handleIncomingChatMessage);
        broadcast({ type: "REQUEST_STATE" });
      }
    };

    window.addEventListener("jitsi-ready", handleJitsiReady);
    window.addEventListener("jitsi-participant-joined", handleParticipantJoined);
    window.addEventListener("jitsi-video-conference-joined", handleVideoConferenceJoined);

    return () => {
      clearInterval(requestInterval);
      if (window.jitsiApi) {
        window.jitsiApi.removeListener("endpointTextMessageReceived", handleSyncMessage);
        window.jitsiApi.removeListener("incomingMessage", handleIncomingChatMessage);
      }
      window.removeEventListener("jitsi-ready", handleJitsiReady);
      window.removeEventListener("jitsi-participant-joined", handleParticipantJoined);
      window.removeEventListener("jitsi-video-conference-joined", handleVideoConferenceJoined);
    };
  }, []);
  
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
    { name: "Red", value: "#ef4444" },
    { name: "Yellow", value: "#eab308" },
    { name: "Green", value: "#22c55e" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Black", value: "#0f172a" }
  ];

  // Main drawing logic that clears and redraws all vector elements
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    const ctx = contextRef.current;

    // Fill white board background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw optional Grid Paper or Coordinate Plane background
    if (background === "grid" || background === "axes") {
      const gridSize = 28;
      const originX = 420; // 15 * 28 (centered nicely in the initial viewport)
      const originY = 364; // 13 * 28

      ctx.save();

      // 1. Minor grid lines (every 1 unit = 28px)
      ctx.beginPath();
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      for (let x = 0; x <= canvasSize.width; x += gridSize) {
        if (Math.round((x - originX) / gridSize) % 5 !== 0) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvasSize.height);
        }
      }
      for (let y = 0; y <= canvasSize.height; y += gridSize) {
        if (Math.round((y - originY) / gridSize) % 5 !== 0) {
          ctx.moveTo(0, y);
          ctx.lineTo(canvasSize.width, y);
        }
      }
      ctx.stroke();

      // 2. Major grid lines (every 5 units = 140px)
      ctx.beginPath();
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1.25;
      for (let x = 0; x <= canvasSize.width; x += gridSize) {
        if (Math.round((x - originX) / gridSize) % 5 === 0) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvasSize.height);
        }
      }
      for (let y = 0; y <= canvasSize.height; y += gridSize) {
        if (Math.round((y - originY) / gridSize) % 5 === 0) {
          ctx.moveTo(0, y);
          ctx.lineTo(canvasSize.width, y);
        }
      }
      ctx.stroke();

      // 3. Coordinate Plane axes, arrowheads, ticks, and labels (-10 to 10)
      if (background === "axes") {
        const axisExtent = 11 * gridSize; // ±11 units for axis arrows
        const leftX = originX - axisExtent;
        const rightX = originX + axisExtent;
        const topY = originY - axisExtent;
        const bottomY = originY + axisExtent;

        // Draw primary X and Y axes
        ctx.beginPath();
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 2;
        // X-axis
        ctx.moveTo(leftX, originY);
        ctx.lineTo(rightX, originY);
        // Y-axis
        ctx.moveTo(originX, topY);
        ctx.lineTo(originX, bottomY);
        ctx.stroke();

        // Draw arrowheads at all 4 ends
        const drawArrowhead = (tipX, tipY, dirX, dirY) => {
          const headLen = 9;
          const headWidth = 5;
          ctx.beginPath();
          ctx.fillStyle = "#1e293b";
          ctx.moveTo(tipX, tipY);
          ctx.lineTo(
            tipX - dirX * headLen - dirY * headWidth,
            tipY - dirY * headLen + dirX * headWidth
          );
          ctx.lineTo(
            tipX - dirX * headLen + dirY * headWidth,
            tipY - dirY * headLen - dirX * headWidth
          );
          ctx.closePath();
          ctx.fill();
        };

        drawArrowhead(rightX, originY, 1, 0);
        drawArrowhead(leftX, originY, -1, 0);
        drawArrowhead(originX, topY, 0, -1);
        drawArrowhead(originX, bottomY, 0, 1);

        // Draw tick marks and integer labels from -10 to 10
        ctx.font = "600 11px Outfit, sans-serif";
        ctx.fillStyle = "#334155";
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 1.5;

        for (let i = -10; i <= 10; i++) {
          if (i === 0) continue;

          // X-axis tick & number
          const tx = originX + i * gridSize;
          ctx.beginPath();
          ctx.moveTo(tx, originY - 4);
          ctx.lineTo(tx, originY + 4);
          ctx.stroke();

          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.save();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 3;
          ctx.strokeText(String(i), tx, originY + 7);
          ctx.fillText(String(i), tx, originY + 7);
          ctx.restore();

          // Y-axis tick & number (up is positive, so -i * gridSize)
          const ty = originY - i * gridSize;
          ctx.beginPath();
          ctx.moveTo(originX - 4, ty);
          ctx.lineTo(originX + 4, ty);
          ctx.stroke();

          ctx.textAlign = "right";
          ctx.textBaseline = "middle";
          ctx.save();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 3;
          ctx.strokeText(String(i), originX - 8, ty);
          ctx.fillText(String(i), originX - 8, ty);
          ctx.restore();
        }

        // Origin "0" label
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        ctx.fillText("0", originX - 6, originY + 6);

        // Axis labels "x" and "y"
        ctx.font = "italic bold 15px Outfit, sans-serif";
        ctx.fillStyle = "#0f172a";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("x", rightX + 8, originY);
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText("y", originX, topY - 6);
      }

      ctx.restore();
    }

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
      } else if (el.type === "shape") {
        drawShapeOnCtx(ctx, el);
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
        const cachedImg =
          el.img instanceof HTMLImageElement
            ? el.img
            : imageCacheRef.current.get(el.id);

        if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
          try {
            ctx.drawImage(cachedImg, el.x, el.y, el.width, el.height);
          } catch (e) {
            console.error("Failed to render image element:", e);
          }
        } else if (el.src && !cachedImg) {
          // Instantiate and cache HTMLImageElement from base64 src (especially for remote shared documents)
          const img = new Image();
          imageCacheRef.current.set(el.id, img);
          img.onload = () => {
            drawCanvas(); // force redraw once loaded
          };
          img.src = el.src;
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
        } else if (el.type === "image" || el.type === "shape") {
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

    // Render active 2D shape preview while dragging
    if (currentShape && currentShape.width > 1 && currentShape.height > 1) {
      drawShapeOnCtx(ctx, currentShape);
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
  }, [canvasSize, elements, currentPoints, currentShape, tool, color, lineWidth, editingText, background]);

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
      } else if (el.type === "shape") {
        if (isPointNearShape({ x, y }, el)) {
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
      const elToDelete = elements[hitIndex];
      if (elToDelete) {
        pushHistory(elements);
        setElements((prev) => prev.filter((_, idx) => idx !== hitIndex));
        broadcast({ type: 'DELETE_ELEMENT', id: elToDelete.id });
      }
    }
  };

  const handlePointerDown = (e) => {
    const { x, y } = getCoordinates(e);

    if (tool === "pen") {
      setIsDrawing(true);
      setCurrentPoints([{ x, y }]);
    } else if (tool === "shape") {
      setIsDrawing(true);
      setCurrentShape({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: "shape",
        shapeType: selectedShape,
        startX: x,
        startY: y,
        x,
        y,
        width: 0,
        height: 0,
        color,
        lineWidth
      });
    } else if (tool === "eraser") {
      setIsErasing(true);
      eraseAt(x, y);
    } else if (tool === "select") {
      // 1. Check if we clicked on any element's resize handle first
      let handleFound = null;
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];
        if (el.type === "image" || el.type === "shape") {
          const rx = el.x + el.width;
          const ry = el.y + el.height;
          if (Math.abs(x - rx) <= 10 && Math.abs(y - ry) <= 10) {
            handleFound = { element: el, type: el.type };
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
        pushHistory(elements);
        setResizingElement(handleFound.element);
        setResizeStartPos({ x, y });
        setResizeStartSize({
          width: handleFound.element.width || 0,
          height: handleFound.element.height || 0,
          fontSize: handleFound.element.fontSize || 16
        });
        return; // prevent dragging trigger
      }

      // 2. Check for draggable text, shape, or image elements
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
        } else if (el.type === "image" || el.type === "shape") {
          if (
            x >= el.x - 4 &&
            x <= el.x + el.width + 4 &&
            y >= el.y - 4 &&
            y <= el.y + el.height + 4
          ) {
            found = el;
            break;
          }
        }
      }
      if (found) {
        pushHistory(elements);
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
    } else if (tool === "shape" && isDrawing && currentShape) {
      const box = normalizeShapeBox(
        currentShape.shapeType,
        currentShape.startX,
        currentShape.startY,
        x,
        y
      );
      setCurrentShape((prev) => (prev ? { ...prev, ...box } : null));
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
            } else if (el.type === "shape") {
              let newW = Math.max(24, resizeStartSize.width + dx);
              let newH = Math.max(24, resizeStartSize.height + dy);
              if (
                el.shapeType === "circle" ||
                el.shapeType === "quad-square" ||
                el.shapeType === "pentagon" ||
                el.shapeType === "hexagon"
              ) {
                const side = Math.max(newW, newH);
                newW = side;
                newH = side;
              } else if (el.shapeType === "triangle-equilateral") {
                newH = Math.round(newW * (Math.sqrt(3) / 2));
              }
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
        if (el.type === "image" || el.type === "shape") {
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
      pushHistory(elements);
      setElements((prev) => [...prev, newEl]);
      setCurrentPoints(null);
      broadcast({ type: 'ADD_ELEMENT', element: newEl });
    } else if (tool === "shape" && isDrawing && currentShape) {
      let finalW = currentShape.width;
      let finalH = currentShape.height;
      let finalX = currentShape.x;
      let finalY = currentShape.y;

      // If the user clicked without dragging, stamp a clean default-sized shape centered at click
      if (finalW < 10 && finalH < 10) {
        if (currentShape.shapeType === "triangle-equilateral") {
          finalW = 100;
          finalH = Math.round(100 * (Math.sqrt(3) / 2));
        } else if (
          currentShape.shapeType === "quad-rectangle" ||
          currentShape.shapeType === "quad-parallelogram" ||
          currentShape.shapeType === "quad-trapezoid"
        ) {
          finalW = 128;
          finalH = 84;
        } else {
          finalW = 96;
          finalH = 96;
        }
        finalX = Math.max(10, currentShape.startX - Math.round(finalW / 2));
        finalY = Math.max(10, currentShape.startY - Math.round(finalH / 2));
      }

      const newShapeEl = {
        id: currentShape.id,
        type: "shape",
        shapeType: currentShape.shapeType,
        x: finalX,
        y: finalY,
        width: finalW,
        height: finalH,
        color: currentShape.color,
        lineWidth: currentShape.lineWidth
      };

      pushHistory(elements);
      setElements((prev) => [...prev, newShapeEl]);
      setCurrentShape(null);
      broadcast({ type: "ADD_ELEMENT", element: newShapeEl });
    }
    if (tool === "select" && draggingElement) {
      setElements((prev) => {
        const el = prev.find(item => item.id === draggingElement.id);
        if (el) {
          broadcast({ type: 'UPDATE_ELEMENT', id: el.id, updates: { x: el.x, y: el.y } });
        }
        return prev;
      });
    }
    if (tool === "select" && resizingElement) {
      setElements((prev) => {
        const el = prev.find(item => item.id === resizingElement.id);
        if (el) {
          broadcast({
            type: 'UPDATE_ELEMENT',
            id: el.id,
            updates: (el.type === "image" || el.type === "shape")
              ? { width: el.width, height: el.height }
              : { width: el.width }
          });
        }
        return prev;
      });
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
          pushHistory(elements);
          setElements((prev) =>
            prev.map((el) => {
              if (el.id === editingText.id) {
                const updated = {
                  ...el,
                  text: editingText.value,
                  fontSize: editingText.fontSize,
                  width: editingText.width,
                  bold: editingText.bold,
                  italic: editingText.italic,
                  underline: editingText.underline
                };
                broadcast({ type: 'UPDATE_ELEMENT', id: editingText.id, updates: updated });
                return updated;
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
          pushHistory(elements);
          setElements((prev) => [...prev, newEl]);
          broadcast({ type: 'ADD_ELEMENT', element: newEl });
        }
      } else {
        // If editing box is left empty, remove it
        if (editingText.id) {
          pushHistory(elements);
          setElements((prev) => prev.filter((el) => el.id !== editingText.id));
          broadcast({ type: 'DELETE_ELEMENT', id: editingText.id });
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
        compressImage(img, (compressedDataUrl, w, h) => {
          const compressedImg = new Image();
          compressedImg.src = compressedDataUrl;
          compressedImg.onload = () => {
            const maxW = 680;
            const maxH = 560;
            let finalW = w;
            let finalH = h;

            if (finalW > maxW) {
              finalH = (maxW / finalW) * finalH;
              finalW = maxW;
            }
            if (finalH > maxH) {
              finalW = (maxH / finalH) * finalW;
              finalH = maxH;
            }

            const elId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
            imageCacheRef.current.set(elId, compressedImg);

            const wrapper = canvasRef.current?.parentElement;
            const scrollLeft = wrapper ? wrapper.scrollLeft : 0;
            const scrollTop = wrapper ? wrapper.scrollTop : 0;

            const newEl = {
              id: elId,
              type: "image",
              src: compressedDataUrl,
              x: scrollLeft + 60,
              y: scrollTop + 40,
              width: Math.round(finalW),
              height: Math.round(finalH)
            };
            pushHistory(elements);
            setElements((prev) => [...prev, newEl]);
            broadcast({ type: 'ADD_ELEMENT', element: newEl });
            setPdfLoading(false);
            selectTool("select");
          };
        });
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
          compressImage(img, (compressedDataUrl, w, h) => {
            const compressedImg = new Image();
            compressedImg.src = compressedDataUrl;
            compressedImg.onload = () => {
              const maxW = 680;
              const maxH = 560;
              let finalW = w;
              let finalH = h;

              if (finalW > maxW) {
                finalH = (maxW / finalW) * finalH;
                finalW = maxW;
              }
              if (finalH > maxH) {
                finalW = (maxH / finalH) * finalW;
                finalH = maxH;
              }

              const elId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
              imageCacheRef.current.set(elId, compressedImg);

              const wrapper = canvasRef.current?.parentElement;
              const scrollLeft = wrapper ? wrapper.scrollLeft : 0;
              const scrollTop = wrapper ? wrapper.scrollTop : 0;

              const newEl = {
                id: elId,
                type: "image",
                src: compressedDataUrl,
                x: scrollLeft + 60,
                y: scrollTop + 40,
                width: Math.round(finalW),
                height: Math.round(finalH)
              };
              pushHistory(elements);
              setElements((prev) => [...prev, newEl]);
              broadcast({ type: 'ADD_ELEMENT', element: newEl });
              selectTool("select");
            };
          });
        };
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const captureScreenToBoard = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      alert("Screen capture is not supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: false
      });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.muted = true;
      await video.play();

      // Wait briefly to ensure the first frame is decoded
      await new Promise((resolve) => setTimeout(resolve, 150));

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = video.videoWidth || 1280;
      tempCanvas.height = video.videoHeight || 720;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

      // Stop all screen capture tracks immediately after taking the snapshot
      stream.getTracks().forEach((track) => track.stop());

      const dataUrl = tempCanvas.toDataURL("image/png");
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        compressImage(img, (compressedDataUrl, w, h) => {
          const compressedImg = new Image();
          compressedImg.src = compressedDataUrl;
          compressedImg.onload = () => {
            const maxW = 680;
            const maxH = 560;
            let finalW = w;
            let finalH = h;

            if (finalW > maxW) {
              finalH = (maxW / finalW) * finalH;
              finalW = maxW;
            }
            if (finalH > maxH) {
              finalW = (maxH / finalH) * finalW;
              finalH = maxH;
            }

            const elId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
            imageCacheRef.current.set(elId, compressedImg);

            const wrapper = canvasRef.current?.parentElement;
            const scrollLeft = wrapper ? wrapper.scrollLeft : 0;
            const scrollTop = wrapper ? wrapper.scrollTop : 0;

            const newEl = {
              id: elId,
              type: "image",
              src: compressedDataUrl,
              x: scrollLeft + 60,
              y: scrollTop + 40,
              width: Math.round(finalW),
              height: Math.round(finalH)
            };
            pushHistory(elements);
            setElements((prev) => [...prev, newEl]);
            broadcast({ type: "ADD_ELEMENT", element: newEl });
            selectTool("select");
          };
        });
      };
    } catch (err) {
      // User cancelled screen picker or permission denied
      console.log("Screen capture cancelled or failed:", err);
    }
  };

  const toggleBackground = (mode) => {
    const nextBg = background === mode ? "none" : mode;
    setBackground(nextBg);
    broadcast({ type: "SET_BACKGROUND", background: nextBg });
  };

  const undoAction = () => {
    setHistory((prevHistory) => {
      if (prevHistory.length === 0) return prevHistory;
      const previousElements = prevHistory[prevHistory.length - 1];
      setElements(previousElements);
      setEditingText(null);
      broadcast({
        type: "SYNC_ELEMENTS",
        elements: previousElements
      });
      return prevHistory.slice(0, -1);
    });
  };

  // Keyboard shortcut Ctrl+Z / Cmd+Z to Undo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (editingText) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undoAction();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editingText]);

  const clearCanvas = () => {
    if (window.confirm("Are you sure you want to clear the whiteboard?")) {
      if (elements.length > 0) {
        pushHistory(elements);
      }
      setElements([]);
      setEditingText(null);
      broadcast({ type: 'CLEAR_BOARD' });
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

  const isPresetColor = colors.some((c) => c.value.toLowerCase() === color.toLowerCase());

  const triangleSubtypes = [
    { id: "triangle-equilateral", label: "Equilateral" },
    { id: "triangle-isosceles", label: "Isosceles" },
    { id: "triangle-right", label: "Right" }
  ];

  const quadSubtypes = [
    { id: "quad-square", label: "Square" },
    { id: "quad-rectangle", label: "Rectangle" },
    { id: "quad-parallelogram", label: "Parallelogram" },
    { id: "quad-trapezoid", label: "Trapezoid" },
    { id: "quad-rhombus", label: "Rhombus" }
  ];

  const renderShapeIcon = (typeId) => {
    switch (typeId) {
      case "circle":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="12" cy="12" r="9" />
          </svg>
        );
      case "triangle-equilateral":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
            <polygon points="12,3 21,19 3,19" />
          </svg>
        );
      case "triangle-isosceles":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
            <polygon points="12,2 18,21 6,21" />
          </svg>
        );
      case "triangle-right":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
            <polygon points="4,3 4,20 21,20" />
          </svg>
        );
      case "quad-square":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" />
          </svg>
        );
      case "quad-rectangle":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="12" />
          </svg>
        );
      case "quad-parallelogram":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
            <polygon points="7,6 22,6 17,18 2,18" />
          </svg>
        );
      case "quad-trapezoid":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
            <polygon points="7,6 17,6 22,18 2,18" />
          </svg>
        );
      case "quad-rhombus":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
            <polygon points="12,2 21,12 12,22 3,12" />
          </svg>
        );
      case "pentagon":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
            <polygon points="12,2 22,9 18,21 6,21 2,9" />
          </svg>
        );
      case "hexagon":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round">
            <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" />
          </svg>
        );
      default:
        return <Shapes size={14} />;
    }
  };

  return (
    <div className="whiteboard-container">
      {/* Whiteboard Toolbar Controls */}
      <div
        className="whiteboard-toolbar"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "0.45rem",
          padding: "0.5rem 0.75rem"
        }}
      >
        {/* Top Row: Primary Tools, Background & Upload Controls, and Right Action Buttons (Never wraps) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "nowrap",
            gap: "0.45rem",
            width: "100%",
            overflowX: "auto"
          }}
        >
          <div className="toolbar-group" style={{ flexShrink: 0 }}>
            {/* Pencil / Brush Tool */}
            <button
              className={`toolbar-btn ${tool === "pen" ? "active" : ""}`}
              onClick={() => selectTool("pen")}
              title="Draw (Brush)"
            >
              <Paintbrush size={18} />
            </button>

            {/* 2D Shapes Tool */}
            <button
              className={`toolbar-btn ${tool === "shape" ? "active" : ""}`}
              onClick={() => {
                selectTool("shape");
                if (!openShapeCategory) {
                  if (selectedShape.startsWith("triangle-")) {
                    setOpenShapeCategory("triangles");
                  } else if (selectedShape.startsWith("quad-")) {
                    setOpenShapeCategory("quadrilaterals");
                  }
                }
              }}
              title="2D Shapes (Circles, Triangles, Quadrilaterals, Pentagons, Hexagons)"
              style={{ minWidth: "auto", padding: "0 0.5rem", gap: "0.25rem" }}
            >
              <Shapes size={17} />
              <span style={{ fontSize: "0.75rem", fontWeight: 800 }}>Shapes</span>
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

          {/* Background Toggles: Grid Paper & Coordinate Plane */}
          <div className="toolbar-group" style={{ flexShrink: 0 }}>
            <button
              className={`toolbar-btn ${background === "grid" ? "active" : ""}`}
              onClick={() => toggleBackground("grid")}
              title="Toggle Grid Paper Background"
              style={{ minWidth: "auto", padding: "0 0.5rem", gap: "0.25rem" }}
            >
              <Grid3X3 size={17} />
              <span style={{ fontSize: "0.75rem", fontWeight: 800 }}>Grid Paper</span>
            </button>
            <button
              className={`toolbar-btn ${background === "axes" ? "active" : ""}`}
              onClick={() => toggleBackground("axes")}
              title="Toggle Coordinate Plane Background"
              style={{ minWidth: "auto", padding: "0 0.5rem", gap: "0.25rem" }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <polyline points="9 5 12 2 15 5" />
                <polyline points="19 9 22 12 19 15" />
              </svg>
              <span style={{ fontSize: "0.75rem", fontWeight: 800 }}>Coordinate Plane</span>
            </button>
          </div>

          {/* Document/Image Upload & Screen Capture Buttons */}
          <div className="toolbar-group" style={{ flexShrink: 0 }}>
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
            <button
              className="toolbar-btn"
              onClick={captureScreenToBoard}
              title="Capture a Screen, Window, or Browser Tab directly onto the Whiteboard"
              style={{ minWidth: "auto", padding: "0 0.5rem", gap: "0.25rem" }}
            >
              <MonitorUp size={18} />
              <span style={{ fontSize: "0.75rem", fontWeight: 800 }}>Screen to Board</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*,application/pdf"
              style={{ display: "none" }}
            />
          </div>

          <div className="toolbar-spacer" style={{ flex: 1, minWidth: "0.25rem" }} />

          {/* Right Action Buttons (Locked on top row so they never slide under) */}
          <div className="toolbar-group" style={{ flexShrink: 0 }}>
            <button
              className="toolbar-btn"
              onClick={undoAction}
              disabled={history.length === 0}
              title="Undo Last Erase, Clear, or Action (Ctrl+Z)"
              style={{ opacity: history.length === 0 ? 0.45 : 1 }}
            >
              <Undo2 size={18} />
              <span className="btn-label-desktop">Undo</span>
            </button>
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

        {/* Second Row Directly Under Brush: Colors (+ Custom Color Picker), Sizes, and 2D Shape Options */}
        {(tool === "pen" || tool === "text" || tool === "shape") && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              paddingTop: "0.1rem"
            }}
          >
            {/* 5 Preset Colors (Red, Yellow, Green, Blue, Black) + Custom Color Chooser */}
            <div className="toolbar-group" style={{ gap: "0.35rem" }}>
              <span className="toolbar-label">Color:</span>
              {colors.map((c) => (
                <button
                  key={c.name}
                  className={`color-btn ${color.toLowerCase() === c.value.toLowerCase() ? "selected" : ""}`}
                  style={{ backgroundColor: c.value }}
                  onClick={() => setColor(c.value)}
                  title={c.name}
                />
              ))}

              {/* Custom Color Picker Button */}
              <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                <button
                  type="button"
                  className={`color-btn ${!isPresetColor ? "selected" : ""}`}
                  onClick={() => customColorInputRef.current?.click()}
                  title="Choose Custom Color"
                  style={{
                    background: !isPresetColor
                      ? color
                      : "conic-gradient(#ef4444, #eab308, #22c55e, #3b82f6, #a855f7, #ef4444)",
                    border: !isPresetColor ? "2px solid #0f172a" : "1.5px solid #cbd5e1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                />
                <input
                  ref={customColorInputRef}
                  type="color"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    setColor(e.target.value);
                  }}
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: 0,
                    height: 0,
                    pointerEvents: "none"
                  }}
                />
              </div>
            </div>

            {/* Brush / Shape Line Size */}
            {(tool === "pen" || tool === "shape") && (
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

            {/* 2D Shape Selector Categories & Sub-options */}
            {tool === "shape" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "0.4rem"
                }}
              >
                <div className="toolbar-group" style={{ gap: "0.25rem" }}>
                  <span className="toolbar-label">2D Shape:</span>

                  {/* Circle */}
                  <button
                    type="button"
                    className={`toolbar-btn ${selectedShape === "circle" ? "active" : ""}`}
                    onClick={() => {
                      setSelectedShape("circle");
                      setOpenShapeCategory(null);
                    }}
                    style={{ minWidth: "auto", padding: "0 0.5rem", height: "28px", gap: "0.25rem", fontSize: "0.75rem", fontWeight: 700 }}
                    title="Circle"
                  >
                    {renderShapeIcon("circle")}
                    <span>Circle</span>
                  </button>

                  {/* Triangles Category Button */}
                  <button
                    type="button"
                    className={`toolbar-btn ${selectedShape.startsWith("triangle-") ? "active" : ""}`}
                    onClick={() => {
                      if (!selectedShape.startsWith("triangle-")) {
                        setSelectedShape("triangle-equilateral");
                      }
                      setOpenShapeCategory((prev) => (prev === "triangles" ? null : "triangles"));
                    }}
                    style={{ minWidth: "auto", padding: "0 0.5rem", height: "28px", gap: "0.25rem", fontSize: "0.75rem", fontWeight: 700 }}
                    title="Triangles (Equilateral, Isosceles, Right)"
                  >
                    {renderShapeIcon(selectedShape.startsWith("triangle-") ? selectedShape : "triangle-equilateral")}
                    <span>Triangles</span>
                    <ChevronDown size={13} />
                  </button>

                  {/* Quadrilaterals Category Button */}
                  <button
                    type="button"
                    className={`toolbar-btn ${selectedShape.startsWith("quad-") ? "active" : ""}`}
                    onClick={() => {
                      if (!selectedShape.startsWith("quad-")) {
                        setSelectedShape("quad-square");
                      }
                      setOpenShapeCategory((prev) => (prev === "quadrilaterals" ? null : "quadrilaterals"));
                    }}
                    style={{ minWidth: "auto", padding: "0 0.5rem", height: "28px", gap: "0.25rem", fontSize: "0.75rem", fontWeight: 700 }}
                    title="Quadrilaterals (Square, Rectangle, Parallelogram, Trapezoid, Rhombus)"
                  >
                    {renderShapeIcon(selectedShape.startsWith("quad-") ? selectedShape : "quad-square")}
                    <span>Quadrilaterals</span>
                    <ChevronDown size={13} />
                  </button>

                  {/* Pentagon */}
                  <button
                    type="button"
                    className={`toolbar-btn ${selectedShape === "pentagon" ? "active" : ""}`}
                    onClick={() => {
                      setSelectedShape("pentagon");
                      setOpenShapeCategory(null);
                    }}
                    style={{ minWidth: "auto", padding: "0 0.5rem", height: "28px", gap: "0.25rem", fontSize: "0.75rem", fontWeight: 700 }}
                    title="Pentagon"
                  >
                    {renderShapeIcon("pentagon")}
                    <span>Pentagon</span>
                  </button>

                  {/* Hexagon */}
                  <button
                    type="button"
                    className={`toolbar-btn ${selectedShape === "hexagon" ? "active" : ""}`}
                    onClick={() => {
                      setSelectedShape("hexagon");
                      setOpenShapeCategory(null);
                    }}
                    style={{ minWidth: "auto", padding: "0 0.5rem", height: "28px", gap: "0.25rem", fontSize: "0.75rem", fontWeight: 700 }}
                    title="Hexagon"
                  >
                    {renderShapeIcon("hexagon")}
                    <span>Hexagon</span>
                  </button>
                </div>

                {/* Expanded Triangle Sub-options */}
                {openShapeCategory === "triangles" && (
                  <div
                    className="toolbar-group"
                    style={{
                      gap: "0.25rem",
                      background: "#eef2ff",
                      borderColor: "#c7d2fe"
                    }}
                  >
                    <span className="toolbar-label" style={{ color: "#4338ca" }}>Triangle Type:</span>
                    {triangleSubtypes.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        className={`toolbar-btn ${selectedShape === sub.id ? "active" : ""}`}
                        onClick={() => setSelectedShape(sub.id)}
                        style={{ minWidth: "auto", padding: "0 0.45rem", height: "26px", gap: "0.25rem", fontSize: "0.73rem", fontWeight: 700 }}
                      >
                        {renderShapeIcon(sub.id)}
                        <span>{sub.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Expanded Quadrilateral Sub-options */}
                {openShapeCategory === "quadrilaterals" && (
                  <div
                    className="toolbar-group"
                    style={{
                      gap: "0.25rem",
                      background: "#eef2ff",
                      borderColor: "#c7d2fe"
                    }}
                  >
                    <span className="toolbar-label" style={{ color: "#4338ca" }}>Quadrilateral Type:</span>
                    {quadSubtypes.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        className={`toolbar-btn ${selectedShape === sub.id ? "active" : ""}`}
                        onClick={() => setSelectedShape(sub.id)}
                        style={{ minWidth: "auto", padding: "0 0.45rem", height: "26px", gap: "0.25rem", fontSize: "0.73rem", fontWeight: 700 }}
                      >
                        {renderShapeIcon(sub.id)}
                        <span>{sub.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
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
