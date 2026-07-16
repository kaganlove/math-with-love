import React, { useState } from "react";
import { Download, FileText, X, Check, Eye } from "lucide-react";

export default function WorksheetGenerator({ lessonId, lessonTitle, ccss, fullWidth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [problemCount, setProblemCount] = useState(10);
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [customTitle, setCustomTitle] = useState(`${lessonTitle} Practice`);
  const [customInstructions, setCustomInstructions] = useState(
    "Solve each equation step-by-step. Show all work and circle your final answer."
  );

  // Helper to generate randomized equations with integer solutions
  const generateProblems = (count) => {
    const list = [];
    const equationTypes = ["basic", "parentheses", "both-sides"];

    for (let i = 0; i < count; i++) {
      const type = equationTypes[i % equationTypes.length];
      let equationText = "";
      let solutionText = "";
      let stepsText = [];

      // x is the target integer solution
      const x = Math.floor(Math.random() * 15) - 7 || 3; // random integer between -7 and 7, non-zero

      if (type === "basic") {
        // ax + b = c
        const a = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const b = Math.floor(Math.random() * 20) - 10 || 4; // -10 to 10
        const c = a * x + b;
        const bSign = b > 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        equationText = `${a}x ${bSign} = ${c}`;
        
        stepsText = [
          `Original: ${a}x ${bSign} = ${c}`,
          `Subtract/add constant: ${a}x = ${c - b}`,
          `Divide by ${a}: x = ${x}`
        ];
        solutionText = `x = ${x}`;
      } else if (type === "parentheses") {
        // a(x + b) = c
        const a = Math.floor(Math.random() * 5) + 2; // 2 to 6
        const b = Math.floor(Math.random() * 8) - 4 || 2; // -4 to 4
        const c = a * (x + b);
        const bSign = b > 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        equationText = `${a}(x ${bSign}) = ${c}`;
        
        stepsText = [
          `Original: ${a}(x ${bSign}) = ${c}`,
          `Distribute the ${a}: ${a}x ${b > 0 ? `+ ${a*b}` : `- ${Math.abs(a*b)}`} = ${c}`,
          `Isolate variable term: ${a}x = ${c - (a*b)}`,
          `Divide by ${a}: x = ${x}`
        ];
        solutionText = `x = ${x}`;
      } else {
        // ax + b = cx + d
        const a = Math.floor(Math.random() * 6) + 4; // 4 to 9
        const c = Math.floor(Math.random() * 3) + 2; // 2 to 4 (guaranteed a !== c)
        const b = Math.floor(Math.random() * 16) - 8 || 3; // -8 to 8
        // d = ax + b - cx => d = (a-c)x + b
        const d = (a - c) * x + b;
        
        const bSign = b > 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        const dSign = d >= 0 ? `+ ${d}` : `- ${Math.abs(d)}`;
        equationText = `${a}x ${bSign} = ${c}x ${d >= 0 ? `+ ${d}` : `- ${Math.abs(d)}`}`;
        
        stepsText = [
          `Original: ${a}x ${bSign} = ${c}x ${dSign.substring(1)}`,
          `Subtract ${c}x from both sides: ${a - c}x ${bSign} = ${d}`,
          `Subtract/add constant: ${a - c}x = ${d - b}`,
          `Divide by ${a - c}: x = ${x}`
        ];
        solutionText = `x = ${x}`;
      }

      list.push({
        num: i + 1,
        question: `Solve for x:\n${equationText}`,
        solution: solutionText,
        steps: stepsText
      });
    }
    return list;
  };

  const handlePrint = () => {
    const problems = generateProblems(problemCount);
    
    // Chunk problems by 6 per page to ensure ample space and zero overlaps
    const problemChunks = [];
    for (let i = 0; i < problems.length; i += 6) {
      problemChunks.push(problems.slice(i, i + 6));
    }

    // Chunk answers by 3 per page to guarantee zero margin overflows
    const answerChunks = [];
    if (includeAnswers) {
      for (let i = 0; i < problems.length; i += 3) {
        answerChunks.push(problems.slice(i, i + 3));
      }
    }

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow pop-ups to print/download worksheets!");
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${customTitle}</title>
        <style>
          @page {
            margin: 0;
            size: letter portrait;
          }
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            font-family: 'Courier New', Courier, monospace;
            color: #000000;
            line-height: 1.6;
            background-color: #ffffff;
          }
          .print-page {
            position: relative;
            box-sizing: border-box;
            padding: 15mm 15mm 25mm 15mm;
            width: 100%;
            height: 100%;
            page-break-after: always;
            break-after: page;
            overflow: hidden;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #000000;
            padding-bottom: 15px;
            margin-bottom: 30px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            text-transform: uppercase;
          }
          .header p {
            margin: 5px 0 0 0;
            font-size: 14px;
          }
          .instructions-box {
            background-color: #f8fafc;
            border: 1px dashed #000000;
            padding: 12px;
            margin-top: 10px;
            font-size: 13px;
            text-align: left;
          }
          .meta-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            font-weight: bold;
          }
          .problems-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            row-gap: 120px; /* Large space for writing solutions */
            column-gap: 50px;
          }
          .problem-card {
            page-break-inside: avoid;
          }
          .problem-num {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 10px;
          }
          .problem-eq {
            font-size: 18px;
            font-weight: bold;
            background-color: #f1f5f9;
            padding: 10px;
            border: 1px solid #000000;
            display: inline-block;
          }
          .page-break {
            page-break-before: always;
            break-before: page;
          }
          .answer-key-header {
            text-align: center;
            border-bottom: 2px solid #000000;
            padding-bottom: 10px;
            margin-bottom: 30px;
          }
          .answer-card {
            margin-bottom: 15px;
            page-break-inside: avoid;
            border-bottom: 1px dashed #cccccc;
            padding-bottom: 10px;
          }
          .answer-card strong {
            font-size: 15px;
          }
          .answer-steps {
            margin-left: 20px;
            font-size: 13px;
            color: #444444;
          }
          .answer-steps p {
            margin: 3px 0;
          }
          .page-footer {
            position: absolute;
            bottom: 12mm;
            left: 15mm;
            right: 15mm;
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            color: #555555;
            font-family: Arial, sans-serif;
            border-top: 1px solid #e2e8f0;
            padding-top: 5px;
          }
        </style>
      </head>
      <body>
        ${problemChunks.map((chunk, chunkIdx) => `
          <div class="print-page">
            ${chunkIdx === 0 ? `
              <div class="header">
                <h1>${customTitle}</h1>
                <p>Topic: ${lessonTitle} (${ccss})</p>
                ${customInstructions ? `<div class="instructions-box"><strong>Instructions:</strong> ${customInstructions}</div>` : ""}
              </div>

              <div class="meta-info">
                <span>Name: ______________________</span>
                <span>Date: ______________________</span>
              </div>
            ` : `
              <div style="height: 20px;"></div>
            `}

            <div class="problems-grid">
              ${chunk.map(p => `
                <div class="problem-card">
                  <div class="problem-num">${p.num})</div>
                  <div class="problem-eq">${p.question.split("\n")[1]}</div>
                </div>
              `).join("")}
            </div>

            <div class="page-footer">
              <span class="footer-left">mathwlove.com</span>
              <span class="footer-right">Page ${chunkIdx + 1}</span>
            </div>
          </div>
          ${chunkIdx < problemChunks.length - 1 || includeAnswers ? '<div class="page-break"></div>' : ''}
        `).join("")}

        ${includeAnswers ? answerChunks.map((chunk, chunkIdx) => `
          <div class="print-page">
            <div class="answer-key-header">
              <h1>Answer Key & Explanations</h1>
              <p>Topic: ${lessonTitle}</p>
            </div>

            <div style="margin-top: 30px;">
              ${chunk.map(p => `
                <div class="answer-card">
                  <p><strong>Problem ${p.num}:</strong> <span style="background: #e2e8f0; padding: 2px 6px; font-weight: bold;">${p.solution}</span></p>
                  <div class="answer-steps">
                    ${p.steps.map((step) => `<p>→ ${step}</p>`).join("")}
                  </div>
                </div>
              `).join("")}
            </div>

            <div class="page-footer">
              <span class="footer-left">mathwlove.com</span>
              <span class="footer-right">Page ${problemChunks.length + chunkIdx + 1}</span>
            </div>
          </div>
          ${chunkIdx < answerChunks.length - 1 ? '<div class="page-break"></div>' : ''}
        `).join("") : ''}

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setIsOpen(false);
  };

  return (
    <div className={`worksheet-generator-container ${fullWidth ? "w-full" : ""}`}>
      <button 
        onClick={() => setIsOpen(true)} 
        className={fullWidth ? "btn-primary w-full flex-center gap-2 mb-6" : "btn-primary flex-center gap-2"}
      >
        <Download size={16} /> Generate Practice Worksheet
      </button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-card max-w-md">
            <div className="modal-header">
              <div className="flex-center gap-2">
                <FileText className="text-primary" size={20} />
                <h3>Worksheet Generator</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="btn-close">
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p className="text-muted text-sm">
                Configure your custom worksheet below. This generates unique, randomized practice problems matching **{lessonTitle}** standard **{ccss}**.
              </p>

              {/* Title Input */}
              <div className="form-group mt-4 text-left">
                <label htmlFor="customTitle" className="form-label">Worksheet Title</label>
                <input
                  type="text"
                  id="customTitle"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="form-input-field mt-1"
                  placeholder="Enter custom worksheet title..."
                />
              </div>

              {/* Instructions Input */}
              <div className="form-group mt-4 text-left">
                <label htmlFor="customInstructions" className="form-label">Instructions</label>
                <textarea
                  id="customInstructions"
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  className="form-input-field mt-1"
                  rows={2}
                  style={{ height: "auto", minHeight: "60px", padding: "0.5rem" }}
                  placeholder="Enter custom solving instructions..."
                />
              </div>

              {/* Problem Count */}
              <div className="form-group mt-4 text-left">
                <label className="form-label">Number of Problems</label>
                <div className="flex gap-2 mt-2">
                  {[5, 10, 15].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setProblemCount(num)}
                      className={`btn-toggle-option ${problemCount === num ? "active" : ""}`}
                    >
                      {num} Problems
                    </button>
                  ))}
                </div>
              </div>

              {/* Include Answers Option */}
              <div className="form-group mt-4">
                <div className="flex-between items-center checkbox-row">
                  <div className="text-left">
                    <label className="form-label">Include Answer Key</label>
                    <p className="text-xs text-muted">Generates a second page with step-by-step solving solutions.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIncludeAnswers(!includeAnswers)}
                    className={`checkbox-toggle ${includeAnswers ? "checked" : ""}`}
                  >
                    {includeAnswers ? <Check size={16} className="text-white" /> : null}
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer flex-end gap-2 mt-6">
              <button onClick={() => setIsOpen(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handlePrint} className="btn-primary flex-center gap-2">
                <Eye size={16} /> Generate & Print/Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
