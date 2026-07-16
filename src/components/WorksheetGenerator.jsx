import React, { useState } from "react";
import { Download, FileText, X, Check, Eye } from "lucide-react";

export default function WorksheetGenerator({ lessonId, lessonTitle, ccss }) {
  const [isOpen, setIsOpen] = useState(false);
  const [problemCount, setProblemCount] = useState(10);
  const [includeAnswers, setIncludeAnswers] = useState(true);

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
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow pop-ups to print/download worksheets!");
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Worksheet - ${lessonTitle}</title>
        <style>
          body {
            font-family: 'Courier New', Courier, monospace;
            padding: 40px;
            color: #000000;
            line-height: 1.6;
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
          }
          .answer-key-header {
            text-align: center;
            margin-top: 50px;
            border-bottom: 2px solid #000000;
            padding-bottom: 10px;
            margin-bottom: 30px;
          }
          .answer-card {
            margin-bottom: 25px;
            page-break-inside: avoid;
            border-bottom: 1px dashed #cccccc;
            padding-bottom: 15px;
          }
          .answer-card strong {
            font-size: 16px;
          }
          .answer-steps {
            margin-left: 20px;
            font-size: 14px;
            color: #444444;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Math with Love Worksheet</h1>
          <p>Topic: ${lessonTitle} (${ccss})</p>
        </div>

        <div class="meta-info">
          <span>Name: ______________________</span>
          <span>Date: ______________________</span>
        </div>

        <div class="problems-grid">
          ${problems
            .map(
              (p) => `
            <div class="problem-card">
              <div className="problem-num">${p.num})</div>
              <div class="problem-eq">${p.question.split("\n")[1]}</div>
            </div>
          `
            )
            .join("")}
        </div>

        ${
          includeAnswers
            ? `
          <div class="page-break"></div>
          <div class="answer-key-header">
            <h1>Answer Key & Explanations</h1>
            <p>Topic: ${lessonTitle}</p>
          </div>

          <div style="margin-top: 30px;">
            ${problems
              .map(
                (p) => `
              <div class="answer-card">
                <p><strong>Problem ${p.num}:</strong> <span style="background: #e2e8f0; padding: 2px 6px; font-weight: bold;">${p.solution}</span></p>
                <div class="answer-steps">
                  ${p.steps.map((step) => `<p>→ ${step}</p>`).join("")}
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }

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
    <div className="worksheet-generator-container">
      <button onClick={() => setIsOpen(true)} className="btn-primary flex-center gap-2">
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

              {/* Problem Count */}
              <div className="form-group mt-6">
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
              <div className="form-group mt-6">
                <div className="flex-between items-center checkbox-row">
                  <div>
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

            <div className="modal-footer flex-end gap-2 mt-8">
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
