import React, { useState, useEffect } from "react";
import { Download, FileText, X, Check, Eye } from "lucide-react";

export default function WorksheetGenerator({ lessonId, lessonTitle, ccss, fullWidth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [problemCount, setProblemCount] = useState(10);
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [customTitle, setCustomTitle] = useState(`${lessonTitle} Practice`);
  const [customInstructions, setCustomInstructions] = useState("");

  useEffect(() => {
    setCustomTitle(`${lessonTitle} Practice`);
    if (lessonId === "hsa-sse-1a") {
      setCustomInstructions("Identify the specified algebraic parts of each expression (coefficients, factors, variables, terms, or constants).");
    } else if (lessonId === "hsa-sse-1b") {
      setCustomInstructions("Treat compound terms as single entities to rewrite the expressions.");
    } else if (lessonId === "hsa-sse-2") {
      setCustomInstructions("Factor or rewrite the algebraic expressions using their underlying structure.");
    } else if (lessonId === "hsa-sse-3b") {
      setCustomInstructions("Complete the square to rewrite the quadratic expressions in vertex form.");
    } else if (lessonId === "hsa-sse-3c") {
      setCustomInstructions("Use properties of exponents to rewrite and interpret exponential growth or decay expressions.");
    } else if (lessonId === "hsa-sse-4") {
      setCustomInstructions("Use the sum formula for a finite geometric series to compute the sum or derive expressions.");
    } else {
      setCustomInstructions("Solve each equation step-by-step. Show all work and circle your final answer.");
    }
  }, [lessonId, lessonTitle]);

  // Helper to generate randomized equations with integer solutions
  const generateProblems = (count) => {
    const list = [];
    const equationTypes = ["basic", "parentheses", "both-sides"];
    const isEarlyGrade = ccss && (ccss.startsWith("K.") || ccss.startsWith("1.") || ccss.startsWith("2.") || ccss.startsWith("3."));

    for (let i = 0; i < count; i++) {
      let equationText = "";
      let solutionText = "";
      let stepsText = [];

      if (isEarlyGrade) {
        const a = Math.floor(Math.random() * 12) + 2; // 2 to 14
        const b = Math.floor(Math.random() * 10) + 1; // 1 to 10
        const isAddition = Math.random() > 0.5;
        if (isAddition) {
          equationText = `${a} + ${b} = x`;
          solutionText = `x = ${a + b}`;
          stepsText = [
            `Original: x = ${a} + ${b}`,
            `Count up from ${a} by ${b}: x = ${a + b}`
          ];
        } else {
          const max = Math.max(a, b);
          const min = Math.min(a, b);
          equationText = `${max} - ${min} = x`;
          solutionText = `x = ${max - min}`;
          stepsText = [
            `Original: x = ${max} - ${min}`,
            `Subtract ${min} from ${max}: x = ${max - min}`
          ];
        }
      } else if (lessonId === "hsa-sse-1b") {
        const groups = ["(x + y)", "(a + b)", "(2x - 3)", "(p + q)", "(1 + r)"];
        const group = groups[i % groups.length];
        const coeff1 = Math.floor(Math.random() * 5) + 2;
        const coeff2 = Math.floor(Math.random() * 4) + 1;
        const constVal = Math.floor(Math.random() * 8) + 1;
        
        equationText = `Treat the compound term as a single entity 'u' and rewrite the expression:\n${coeff1}${group}² - ${coeff2}${group} + ${constVal}`;
        solutionText = `${coeff1}u² - ${coeff2}u + ${constVal}  (where u = ${group})`;
        stepsText = [
          `Original: ${coeff1}${group}² - ${coeff2}${group} + ${constVal}`,
          `Identify the repeated compound grouping: ${group}`,
          `Let u = ${group} to rewrite the expression: ${solutionText}`
        ];
      } else if (lessonId === "hsa-sse-2") {
        if (i % 2 === 0) {
          const bases = [3, 4, 5, 2];
          const b = bases[i % bases.length];
          const bSq = b * b;
          const bQuad = bSq * bSq;
          equationText = `Factor completely using difference of squares:\nx⁴ - ${bQuad}`;
          solutionText = `(x - ${b})(x + ${b})(x² + ${bSq})`;
          stepsText = [
            `Original: x⁴ - ${bQuad}`,
            `Rewrite as squares: (x²)² - (${bSq})²`,
            `First factor step: (x² - ${bSq})(x² + ${bSq})`,
            `Factor (x² - ${bSq}) further: (x - ${b})(x + ${b})(x² + ${bSq})`
          ];
        } else {
          const a = Math.floor(Math.random() * 4) + 2;
          const b = Math.floor(Math.random() * 3) + 2;
          equationText = `Factor by grouping:\nx³ + ${a}x² + ${b}x + ${a*b}`;
          solutionText = `(x² + ${b})(x + ${a})`;
          stepsText = [
            `Original: x³ + ${a}x² + ${b}x + ${a*b}`,
            `Group first two and last two terms: x²(x + ${a}) + ${b}(x + ${a})`,
            `Factor out the common binomial (x + ${a}): (x² + ${b})(x + ${a})`
          ];
        }
      } else if (lessonId === "hsa-sse-3b") {
        const b = (Math.floor(Math.random() * 5) + 2) * 2; // 4, 6, 8, 10, 12
        const halfB = b / 2;
        const halfBSq = halfB * halfB;
        const c = Math.floor(Math.random() * 15) + 1;
        const remainder = c - halfBSq;
        const remSign = remainder >= 0 ? `+ ${remainder}` : `- ${Math.abs(remainder)}`;
        
        equationText = `Rewrite in vertex form by completing the square:\nx² + ${b}x + ${c}`;
        solutionText = `(x + ${halfB})² ${remSign}`;
        stepsText = [
          `Original expression: x² + ${b}x + ${c}`,
          `Find half of the linear term coefficient: ${b} / 2 = ${halfB}`,
          `Square it to find the perfect square constant: ${halfB}² = ${halfBSq}`,
          `Add and subtract ${halfBSq} to balance: x² + ${b}x + ${halfBSq} - ${halfBSq} + ${c}`,
          `Factor trinomial and combine remaining constants: (x + ${halfB})² ${remSign}`
        ];
      } else if (lessonId === "hsa-sse-3c") {
        const rates = [1.12, 1.15, 1.08, 1.24];
        const base = rates[i % rates.length];
        const pct = Math.round((base - 1) * 100);
        const monthlyBase = Math.round(Math.pow(base, 1/12) * 10000) / 10000;
        const monthlyPct = Math.round((monthlyBase - 1) * 10000) / 100;
        
        equationText = `An account grows annually by ${pct}%: ${base}^t. Find the equivalent monthly compounding rate formula.`;
        solutionText = `(${monthlyBase})^(12t)  (approx. ${monthlyPct}% monthly rate)`;
        stepsText = [
          `Annual formula: ${base}^t`,
          `Set up monthly intervals (1/12 scale): (${base}^(1/12))^(12t)`,
          `Evaluate the inner base: ${base}^(1/12) ≈ ${monthlyBase}`,
          `New growth base: (${monthlyBase})^(12t)`
        ];
      } else if (lessonId === "hsa-sse-4") {
        const a = Math.floor(Math.random() * 3) + 2; // 2 to 4
        const r = Math.floor(Math.random() * 2) + 2; // 2 to 3
        const n = Math.floor(Math.random() * 2) + 3; // 3 to 4
        
        const termsList = [];
        for (let k = 0; k < n; k++) {
          termsList.push(a * Math.pow(r, k));
        }
        const seriesText = termsList.join(" + ");
        const sumVal = a * (Math.pow(r, n) - 1) / (r - 1);
        
        equationText = `Find the sum of the finite geometric series:\n${seriesText}`;
        solutionText = `Sn = ${sumVal}`;
        stepsText = [
          `Series: ${seriesText}  (where a = ${a}, r = ${r}, n = ${n})`,
          `Formula: Sn = a(1 - r^n) / (1 - r)`,
          `Calculate: Sn = ${a}(1 - ${r}^${n}) / (1 - ${r}) = ${a}(1 - ${Math.pow(r, n)}) / (${1 - r})`,
          `Result: Sn = ${sumVal}`
        ];
      } else if (lessonId === "hsa-sse-3a") {
        const p = Math.floor(Math.random() * 8) - 4 || 2; // -4 to 4, non-zero
        const q = Math.floor(Math.random() * 8) - 4 || 3; // -4 to 4, non-zero
        const b = p + q;
        const c = p * q;
        const bSign = b > 0 ? `+ ${b}` : b < 0 ? `- ${Math.abs(b)}` : "";
        const cSign = c > 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
        
        equationText = `Factor the trinomial:\nx² ${bSign ? `${bSign}x` : ""} ${cSign}`;
        solutionText = `(x ${p >= 0 ? `+ ${p}` : `- ${Math.abs(p)}`})(x ${q >= 0 ? `+ ${q}` : `- ${Math.abs(q)}`})`;
        
        stepsText = [
          `Trinomial: x² ${bSign ? `${bSign}x` : ""} ${cSign}`,
          `Find numbers that multiply to ${c} and add to ${b}: ${p} and ${q}`,
          `Rewrite as binomial product: ${solutionText}`
        ];
      } else if (lessonId === "hsa-rei-6") {
        const xVal = Math.floor(Math.random() * 6) - 3 || 2; // -3 to 3
        const a = Math.floor(Math.random() * 3) + 1; // 1 to 3
        const b = Math.floor(Math.random() * 8) - 4; // -4 to 4
        const yVal = a * xVal + b;
        const c = Math.floor(Math.random() * 2) + 1; // 1 to 2
        const d = c * xVal + yVal;
        
        const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
        const cSign = c === 1 ? "" : `${c}`;

        equationText = `Solve the system using substitution:\ny = ${a}x ${bSign}\n${cSign}x + y = ${d}`;
        solutionText = `x = ${xVal}, y = ${yVal} => (${xVal}, ${yVal})`;
        
        stepsText = [
          `Equations: y = ${a}x ${bSign}  and  ${cSign}x + y = ${d}`,
          `Substitute y: ${cSign}x + (${a}x ${bSign}) = ${d}`,
          `Combine and simplify: ${c + a}x = ${d - b} => x = ${xVal}`,
          `Substitute x back: y = ${a}(${xVal}) ${bSign} => y = ${yVal}`
        ];
      } else if (lessonId === "hsa-sse-1a") {
        const types = ["identify-coeff", "identify-constant", "name-factor", "name-coeff", "name-constant", "name-variable", "identify-terms"];
        const qType = types[i % types.length];
        
        if (qType === "identify-coeff") {
          const a = Math.floor(Math.random() * 8) + 2;
          const b = Math.floor(Math.random() * 15) + 1;
          equationText = `In the expression:\n${a}x - ${b}\nWhat is the coefficient of x?`;
          solutionText = `${a}`;
          stepsText = [
            `Expression: ${a}x - ${b}`,
            `The coefficient is the numerical factor multiplied by the variable. Here, x is multiplied by ${a}.`
          ];
        } else if (qType === "identify-constant") {
          const a = Math.floor(Math.random() * 5) + 2;
          const b = Math.floor(Math.random() * 10) + 1;
          equationText = `In the expression:\n${a}x + ${b}\nWhat is the constant term?`;
          solutionText = `${b}`;
          stepsText = [
            `Expression: ${a}x + ${b}`,
            `The constant term is the stand-alone number with no variable. Here, it is ${b}.`
          ];
        } else if (qType === "name-factor") {
          const a = Math.floor(Math.random() * 4) + 2;
          const b = Math.floor(Math.random() * 8) + 2;
          equationText = `In the expression:\n${a}(x + ${b})\nWhat algebraic part does the grouping '(x + ${b})' represent?`;
          solutionText = `Factor (or Binomial Factor)`;
          stepsText = [
            `Expression: ${a}(x + ${b})`,
            `The terms ${a} and (x + ${b}) are multiplied together, so they are factors. A factor with two terms is a binomial factor.`
          ];
        } else if (qType === "name-coeff") {
          const a = Math.floor(Math.random() * 6) + 2;
          const b = Math.floor(Math.random() * 12) + 1;
          equationText = `In the expression:\n${a}x - ${b}\nWhat algebraic part does the number '${a}' represent?`;
          solutionText = `Coefficient`;
          stepsText = [
            `Expression: ${a}x - ${b}`,
            `The number ${a} is multiplied by the variable x, which makes it a coefficient.`
          ];
        } else if (qType === "name-constant") {
          const a = Math.floor(Math.random() * 6) + 2;
          const b = Math.floor(Math.random() * 12) + 1;
          equationText = `In the expression:\n${a}x + ${b}\nWhat algebraic part does the number '${b}' represent?`;
          solutionText = `Constant Term`;
          stepsText = [
            `Expression: ${a}x + ${b}`,
            `The number ${b} stands alone without a variable, so it is a constant term.`
          ];
        } else if (qType === "name-variable") {
          const a = Math.floor(Math.random() * 8) + 2;
          const b = Math.floor(Math.random() * 12) + 1;
          equationText = `In the expression:\n${a}y + ${b}\nWhat algebraic part does the letter 'y' represent?`;
          solutionText = `Variable`;
          stepsText = [
            `Expression: ${a}y + ${b}`,
            `The letter y is a symbol representing a changing or unknown value, making it a variable.`
          ];
        } else {
          const a = Math.floor(Math.random() * 5) + 2;
          const b = Math.floor(Math.random() * 8) + 2;
          equationText = `How many terms are in the expression:\n${a}x² - ${b}x + 12`;
          solutionText = `3`;
          stepsText = [
            `Expression: ${a}x² - ${b}x + 12`,
            `Terms are parts separated by addition or subtraction: '${a}x²', '-${b}x', and '12'. There are exactly 3 terms.`
          ];
        }
      } else {
        const type = equationTypes[i % equationTypes.length];
        const x = Math.floor(Math.random() * 15) - 7 || 3;

        if (type === "basic") {
          const a = Math.floor(Math.random() * 8) + 2;
          const b = Math.floor(Math.random() * 20) - 10 || 4;
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
          const a = Math.floor(Math.random() * 5) + 2;
          const b = Math.floor(Math.random() * 8) - 4 || 2;
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
          const a = Math.floor(Math.random() * 6) + 4;
          const c = Math.floor(Math.random() * 3) + 2;
          const b = Math.floor(Math.random() * 16) - 8 || 3;
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
      }

      list.push({
        num: i + 1,
        question: (lessonId && lessonId.startsWith("hsa-sse-")) || lessonId === "hsa-rei-6" ? `${equationText}` : `Solve for x:\n${equationText}`,
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

    // Chunk answers dynamically based on their vertical height to maximize space and avoid overlap
    const answerChunks = [];
    if (includeAnswers) {
      const PAGE_HEIGHT = 1056; // Letter height in pixels (96dpi)
      const PADDING_BUFFER = 160; // 15mm top + 25mm bottom padding
      const HEADER_HEIGHT = 110; // Answer key header height
      const SPACER_HEIGHT = 20; // Top margin spacer on pages 2+
      const FOOTER_BUFFER = 50; // Extra boundary space above page footer
      
      const limitPage1 = PAGE_HEIGHT - PADDING_BUFFER - HEADER_HEIGHT - FOOTER_BUFFER; // ~736px available
      const limitPageN = PAGE_HEIGHT - PADDING_BUFFER - SPACER_HEIGHT - FOOTER_BUFFER; // ~826px available

      const getAnswerCardHeight = (p) => {
        // Estimation of title line wrapping (approx 65 characters max per line)
        const titleLength = `Problem ${p.num}: ${p.solution}`.length;
        const titleLines = Math.max(1, Math.ceil(titleLength / 65));
        const titleH = titleLines * 30; // Increased to 30px to match real line height

        let stepsLines = 0;
        p.steps.forEach(step => {
          // Monospace font character limit in columns is around 65 characters.
          stepsLines += Math.max(1, Math.ceil(step.length / 65));
        });
        const stepsH = stepsLines * 28; // Increased to 28px to match font + margin spacing
        const borderMarginH = 30; // Increased to 30px margin/padding buffer
        return titleH + stepsH + borderMarginH;
      };

      let currentPageList = [];
      let currentAccumulatedHeight = 0;
      let isFirstPage = true;

      for (let i = 0; i < problems.length; i++) {
        const p = problems[i];
        const h = getAnswerCardHeight(p);
        const limit = isFirstPage ? limitPage1 : limitPageN;

        if (currentAccumulatedHeight + h > limit && currentPageList.length > 0) {
          answerChunks.push(currentPageList);
          currentPageList = [p];
          currentAccumulatedHeight = h;
          isFirstPage = false;
        } else {
          currentPageList.push(p);
          currentAccumulatedHeight += h;
        }
      }

      if (currentPageList.length > 0) {
        answerChunks.push(currentPageList);
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
            margin-bottom: 25px;
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
            margin-bottom: 30px;
            font-weight: bold;
          }
          .problems-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            row-gap: 95px; /* Slightly reduced space so it fits without running into the footer */
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
              ${chunk.map(p => {
                const questionLines = p.question.split("\n");
                const hasMultipleLines = questionLines.length > 1;
                return `
                  <div class="problem-card">
                    <div class="problem-num">${p.num})</div>
                    ${hasMultipleLines ? `
                      <div class="problem-question-container" style="font-size: 13px; margin-top: 4px; font-family: monospace;">
                        <div style="margin-bottom: 6px;">${questionLines[0]}</div>
                        <div class="problem-eq" style="font-size: 16px; font-weight: bold; background-color: #f8fafc; padding: 8px 12px; border: 1px solid #000000; display: inline-block; margin-bottom: 6px;">
                          ${questionLines[1]}
                        </div>
                        <div style="margin-top: 4px; font-weight: bold; color: #1e293b;">${questionLines[2] || ""}</div>
                      </div>
                    ` : `
                      <div class="problem-eq">${p.question}</div>
                    `}
                  </div>
                `;
              }).join("")}
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
            ${chunkIdx === 0 ? `
              <div class="answer-key-header">
                <h1>Answer Key & Explanations</h1>
                <p>Topic: ${lessonTitle}</p>
              </div>
            ` : `
              <div style="height: 20px;"></div>
            `}

            <div style="margin-top: 20px;">
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
