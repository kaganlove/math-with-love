// Comprehensive K-12 Common Core Aligned Curriculum & Test Prep Mappings

export const curriculumLevels = [
  {
    id: "k-5",
    title: "Elementary School",
    subtitle: "Grades K-5",
    description: "Building numerical confidence and foundational skills. Conceptual understanding, visual math models, and math facts mastery.",
    topics: [
      {
        id: "counting-cardinality",
        title: "Counting & Cardinality (K.CC)",
        lessons: [
          { id: "counting-10", title: "Counting to 10 with Visuals", ccss: "K.CC.A.1", duration: "10 mins" },
          { id: "number-patterns", title: "Number Patterns & Skip Counting", ccss: "K.CC.A.2", duration: "15 mins" }
        ]
      },
      {
        id: "operations-algebraic",
        title: "Operations & Algebraic Thinking (1-5.OA)",
        lessons: [
          { id: "addition-facts", title: "Visualizing Addition: Making 10", ccss: "1.OA.A.1", duration: "15 mins" },
          { id: "subtraction-takeaway", title: "Subtraction as Taking Away", ccss: "1.OA.A.2", duration: "15 mins" },
          { id: "intro-multiplication", title: "Intro to Multiplication: Repeated Addition", ccss: "3.OA.A.1", duration: "20 mins" },
          { id: "division-sharing", title: "Intro to Division: Equal Sharing", ccss: "3.OA.A.2", duration: "20 mins" }
        ]
      },
      {
        id: "base-ten",
        title: "Numbers in Base Ten (1-5.NBT)",
        lessons: [
          { id: "place-value-ones-tens", title: "Understanding Tens and Ones", ccss: "1.NBT.B.2", duration: "15 mins" },
          { id: "double-digit-addition", title: "Double-Digit Addition with Regrouping", ccss: "2.NBT.B.5", duration: "20 mins" }
        ]
      },
      {
        id: "fractions-elementary",
        title: "Fractions & Decimals (3-5.NF)",
        lessons: [
          { id: "fraction-pizza", title: "Fractions with Pizza: Parts of a Whole", ccss: "3.NF.A.1", duration: "20 mins" },
          { id: "equivalent-fractions", title: "Equivalent Fractions with Bars", ccss: "4.NF.A.1", duration: "25 mins" }
        ]
      }
    ]
  },
  {
    id: "6-8",
    title: "Middle School Math",
    subtitle: "Grades 6-8",
    description: "Bridging the gap between concrete numbers and abstract thinking. We master ratios, proportions, integers, and expressions.",
    topics: [
      {
        id: "ratios-rates",
        title: "Ratios & Proportional Relationships (6-7.RP)",
        lessons: [
          { id: "understanding-ratios", title: "Understanding Ratios & Rates", ccss: "6.RP.A.1", duration: "20 mins" },
          { id: "unit-rates", title: "Calculating Unit Rates in Real Life", ccss: "6.RP.A.2", duration: "25 mins" },
          { id: "proportions-cross-multiply", title: "Solving Proportions: The Why Behind Cross-Multiplying", ccss: "7.RP.A.2", duration: "25 mins" }
        ]
      },
      {
        id: "number-system",
        title: "The Number System (6-8.NS)",
        lessons: [
          { id: "integers-number-line", title: "Integers & Absolute Value on a Number Line", ccss: "6.NS.C.6", duration: "20 mins" },
          { id: "fraction-division", title: "Dividing Fractions: Keep, Change, Flip", ccss: "6.NS.A.1", duration: "25 mins" }
        ]
      },
      {
        id: "expressions-equations",
        title: "Expressions & Equations (6-8.EE)",
        lessons: [
          { id: "like-terms", title: "Combining Like Terms with Visual Blocks", ccss: "6.EE.A.3", duration: "25 mins" },
          { id: "one-step-equations", title: "Solving One-Step Equations", ccss: "6.EE.B.7", duration: "25 mins" },
          { id: "two-step-equations", title: "Solving Two-Step Equations Step-by-Step", ccss: "7.EE.B.4", duration: "30 mins" }
        ]
      }
    ]
  },
  {
    id: "9-12",
    title: "High School Math",
    subtitle: "Grades 9-12",
    description: "Rigorous preparation for Algebra, Geometry, Algebra II, Pre-Calculus, and AP exams.",
    topics: [
      {
        id: "algebra-1",
        title: "Algebra 1 (HSA)",
        lessons: [
          { id: "linear-equations", title: "Solving Multi-Step Linear Equations", ccss: "HSA-REI.B.3", duration: "30 mins", hasContent: true },
          { id: "graphing-slope-intercept", title: "Graphing Lines in Slope-Intercept Form (y = mx + b)", ccss: "8.F.B.4", duration: "30 mins" },
          { id: "systems-substitution", title: "Systems of Equations: Substitution Method", ccss: "HSA-REI.C.6", duration: "35 mins" },
          { id: "factoring-quadratics", title: "Factoring Quadratic Trinomials (x² + bx + c)", ccss: "HSA-SSE.A.2", duration: "40 mins" }
        ]
      },
      {
        id: "geometry",
        title: "Geometry (HSG)",
        lessons: [
          { id: "pythagorean-theorem", title: "Pythagorean Theorem: Proof and Practice", ccss: "8.G.B.7", duration: "25 mins" },
          { id: "triangle-congruence", title: "Triangle Congruence Postulates (SSS, SAS, ASA)", ccss: "HSG-CO.B.8", duration: "30 mins" },
          { id: "trig-ratios", title: "Right Triangle Trig: SOH CAH TOA", ccss: "HSG-SRT.C.8", duration: "35 mins" }
        ]
      },
      {
        id: "algebra-2",
        title: "Algebra 2 (HSA & HSF)",
        lessons: [
          { id: "quadratic-formula", title: "The Quadratic Formula Demystified", ccss: "HSA-REI.B.4", duration: "35 mins" },
          { id: "laws-of-exponents", title: "Mastering Laws of Exponents & Radicals", ccss: "HSN-RN.A.2", duration: "30 mins" },
          { id: "logarithms-intro", title: "Intro to Logarithms: Undoing Exponents", ccss: "HSF-LE.A.4", duration: "35 mins" }
        ]
      },
      {
        id: "pre-calculus",
        title: "Pre-Calculus & Trig (HSF)",
        lessons: [
          { id: "unit-circle-understanding", title: "Understanding the Unit Circle", ccss: "HSF-TF.A.2", duration: "40 mins" },
          { id: "trig-identities", title: "Proving Trigonometric Identities", ccss: "HSF-TF.C.8", duration: "45 mins" }
        ]
      }
    ]
  },
  {
    id: "college",
    title: "Early College Math",
    subtitle: "Undergraduate Level",
    description: "Advanced math for STEM and college core requirements. Covers Calculus, Linear Algebra, and Statistics.",
    topics: [
      {
        id: "calculus-1",
        title: "Calculus I (Limits & Derivatives)",
        lessons: [
          { id: "limits-definition", title: "Limits: The Conceptual Definition", ccss: "College-Calc1", duration: "40 mins" },
          { id: "derivative-rules", title: "Power, Product, and Quotient Rules", ccss: "College-Calc1", duration: "35 mins" },
          { id: "chain-rule", title: "The Chain Rule Step-by-Step", ccss: "College-Calc1", duration: "40 mins" },
          { id: "optimization-problems", title: "Solving Optimization Problems in Calculus", ccss: "College-Calc1", duration: "45 mins" }
        ]
      },
      {
        id: "calculus-2",
        title: "Calculus II (Integration)",
        lessons: [
          { id: "integration-substitution", title: "Integration by u-Substitution", ccss: "College-Calc2", duration: "40 mins" },
          { id: "integration-by-parts", title: "Integration by Parts: LIATE Rule", ccss: "College-Calc2", duration: "45 mins" }
        ]
      },
      {
        id: "linear-algebra",
        title: "Linear Algebra",
        lessons: [
          { id: "gaussian-elimination", title: "Row Reduction and Gaussian Elimination", ccss: "College-Linear", duration: "35 mins" },
          { id: "determinants-eigenvalues", title: "Understanding Determinants & Eigenvalues", ccss: "College-Linear", duration: "45 mins" }
        ]
      },
      {
        id: "statistics",
        title: "Introductory Statistics",
        lessons: [
          { id: "normal-distribution", title: "The Normal Distribution and Z-Scores", ccss: "HSS-ID.A.4", duration: "35 mins" },
          { id: "hypothesis-testing", title: "Understanding p-Values and Hypothesis Testing", ccss: "HSS-IC.B.5", duration: "45 mins" }
        ]
      }
    ]
  }
];

// Test Prep Diagnostic mappings matching exam score report feedback to CCSS lessons
export const testPrepMappings = {
  sat: {
    name: "SAT (Digital)",
    description: "Match your College Board score report feedback to review weak areas.",
    sections: [
      {
        name: "Heart of Algebra",
        skills: [
          { feedback: "Linear equations in one variable", lessonId: "linear-equations", ccss: "HSA-REI.B.3" },
          { feedback: "Linear equations in two variables (systems)", lessonId: "systems-substitution", ccss: "HSA-REI.C.6" },
          { feedback: "Linear functions and graphing", lessonId: "graphing-slope-intercept", ccss: "8.F.B.4" }
        ]
      },
      {
        name: "Passport to Advanced Math",
        skills: [
          { feedback: "Solving quadratic equations", lessonId: "quadratic-formula", ccss: "HSA-REI.B.4" },
          { feedback: "Factoring quadratic polynomials", lessonId: "factoring-quadratics", ccss: "HSA-SSE.A.2" },
          { feedback: "Exponents, radicals, and polynomial operations", lessonId: "laws-of-exponents", ccss: "HSN-RN.A.2" },
          { feedback: "Logarithmic and exponential growth", lessonId: "logarithms-intro", ccss: "HSF-LE.A.4" }
        ]
      },
      {
        name: "Problem Solving and Data Analysis",
        skills: [
          { feedback: "Ratios, rates, proportions, and percentages", lessonId: "understanding-ratios", ccss: "6.RP.A.1" },
          { feedback: "Unit rates and unit conversions", lessonId: "unit-rates", ccss: "6.RP.A.2" },
          { feedback: "Normal distribution and statistical spreads", lessonId: "normal-distribution", ccss: "HSS-ID.A.4" }
        ]
      },
      {
        name: "Geometry and Trigonometry",
        skills: [
          { feedback: "Pythagorean Theorem and triangle lengths", lessonId: "pythagorean-theorem", ccss: "8.G.B.7" },
          { feedback: "Right triangle trigonometry ratios (SOH CAH TOA)", lessonId: "trig-ratios", ccss: "HSG-SRT.C.8" },
          { feedback: "Unit circle angles and radians", lessonId: "unit-circle-understanding", ccss: "HSF-TF.A.2" }
        ]
      }
    ]
  },
  act: {
    name: "ACT",
    description: "Align your ACT score report math categories to clear lessons.",
    sections: [
      {
        name: "Preparing for Higher Math - Algebra",
        skills: [
          { feedback: "Solve linear equations and simple inequalities", lessonId: "linear-equations", ccss: "HSA-REI.B.3" },
          { feedback: "Systems of linear equations", lessonId: "systems-substitution", ccss: "HSA-REI.C.6" }
        ]
      },
      {
        name: "Preparing for Higher Math - Functions",
        skills: [
          { feedback: "Linear functions, slope, and intercepts", lessonId: "graphing-slope-intercept", ccss: "8.F.B.4" },
          { feedback: "Exponential and logarithmic models", lessonId: "logarithms-intro", ccss: "HSF-LE.A.4" }
        ]
      },
      {
        name: "Preparing for Higher Math - Geometry",
        skills: [
          { feedback: "Pythagorean theorem & right triangles", lessonId: "pythagorean-theorem", ccss: "8.G.B.7" },
          { feedback: "Basic trigonometric ratios", lessonId: "trig-ratios", ccss: "HSG-SRT.C.8" },
          { feedback: "Congruence and similarity criteria", lessonId: "triangle-congruence", ccss: "HSG-CO.B.8" }
        ]
      },
      {
        name: "Preparing for Higher Math - Number & Quantity",
        skills: [
          { feedback: "Exponents, powers, and radical laws", lessonId: "laws-of-exponents", ccss: "HSN-RN.A.2" }
        ]
      },
      {
        name: "Preparing for Higher Math - Stats & Probability",
        skills: [
          { feedback: "Normal distribution curves and probability spreads", lessonId: "normal-distribution", ccss: "HSS-ID.A.4" }
        ]
      },
      {
        name: "Integrating Essential Skills",
        skills: [
          { feedback: "Ratios, proportions, percentages, and scale factors", lessonId: "understanding-ratios", ccss: "6.RP.A.1" },
          { feedback: "Division of fractions and word problems", lessonId: "fraction-division", ccss: "6.NS.A.1" }
        ]
      }
    ]
  },
  psat: {
    name: "PSAT",
    description: "Review diagnostic indicators on your PSAT score sheet.",
    sections: [
      {
        name: "Heart of Algebra (PSAT)",
        skills: [
          { feedback: "Solving single-variable linear equations", lessonId: "linear-equations", ccss: "HSA-REI.B.3" },
          { feedback: "Linear functions and basic slope concepts", lessonId: "graphing-slope-intercept", ccss: "8.F.B.4" }
        ]
      },
      {
        name: "Passport to Advanced Math (PSAT)",
        skills: [
          { feedback: "Factoring quadratic binomials/trinomials", lessonId: "factoring-quadratics", ccss: "HSA-SSE.A.2" },
          { feedback: "Laws of exponents", lessonId: "laws-of-exponents", ccss: "HSN-RN.A.2" }
        ]
      },
      {
        name: "Problem Solving and Data Analysis (PSAT)",
        skills: [
          { feedback: "Ratios and unit rates", lessonId: "understanding-ratios", ccss: "6.RP.A.1" }
        ]
      }
    ]
  },
  tsi: {
    name: "TSI (TSIA2)",
    description: "Align your TSIA2 diagnostic feedback strands to review areas.",
    sections: [
      {
        name: "Quantitative Reasoning",
        skills: [
          { feedback: "Division of fractions and decimals", lessonId: "fraction-division", ccss: "6.NS.A.1" },
          { feedback: "Ratios, proportions, and unit rates", lessonId: "understanding-ratios", ccss: "6.RP.A.1" }
        ]
      },
      {
        name: "Algebraic Reasoning",
        skills: [
          { feedback: "Linear equations and systems of equations", lessonId: "linear-equations", ccss: "HSA-REI.B.3" },
          { feedback: "Quadratic equations and functions", lessonId: "quadratic-formula", ccss: "HSA-REI.B.4" },
          { feedback: "Exponential and logarithmic properties", lessonId: "logarithms-intro", ccss: "HSF-LE.A.4" }
        ]
      },
      {
        name: "Geometric and Spatial Reasoning",
        skills: [
          { feedback: "Pythagorean Theorem right-triangles", lessonId: "pythagorean-theorem", ccss: "8.G.B.7" },
          { feedback: "Similarity and congruence rules", lessonId: "triangle-congruence", ccss: "HSG-CO.B.8" }
        ]
      },
      {
        name: "Probabilistic and Statistical Reasoning",
        skills: [
          { feedback: "Normal distribution and standard deviations", lessonId: "normal-distribution", ccss: "HSS-ID.A.4" }
        ]
      }
    ]
  }
};

export const sampleLessons = {
  "linear-equations": {
    id: "linear-equations",
    title: "Solving Multi-Step Linear Equations",
    subtitle: "Algebra 1 Foundations",
    duration: "30 mins",
    level: "High School Math",
    topic: "Algebra 1",
    ccss: "HSA-REI.B.3",
    introduction: "Solving equations is like balancing a scale. Whatever you do to one side of the equation, you must do to the other side to keep it balanced. Our ultimate goal is to isolate the variable (get x by itself on one side).",
    steps: [
      {
        title: "Step 1: Distribute to clear parentheses",
        content: "If you see a number outside a parenthesis, distribute (multiply) it to everything inside. \n\nFormula: a(b + c) = ab + ac\n\nExample: In 3(x + 2) = 18, distribute the 3 to get: 3x + 6 = 18."
      },
      {
        title: "Step 2: Combine like terms",
        content: "Combine any variable terms or constant terms that are on the SAME side of the equal sign. Do not cross the equal sign yet!\n\nExample: In 3x + 2x - 5 = 15, combine 3x and 2x to get 5x - 5 = 15."
      },
      {
        title: "Step 3: Move variables to one side",
        content: "If you have variables on both sides, use addition or subtraction to move one of them. It is usually easiest to move the smaller variable.\n\nExample: In 5x - 3 = 2x + 9, subtract 2x from both sides to get 3x - 3 = 9."
      },
      {
        title: "Step 4: Undo addition/subtraction (Isolate variable term)",
        content: "Look at the side with the variable. Remove any added or subtracted numbers by doing the opposite operation.\n\nExample: In 3x - 3 = 9, undo the subtraction of 3 by ADDING 3 to both sides: 3x = 12."
      },
      {
        title: "Step 5: Undo multiplication/division (Isolate variable)",
        content: "Finally, divide or multiply to get the variable completely alone.\n\nExample: In 3x = 12, undo the multiplication of 3 by DIVIDING both sides by 3: x = 4."
      }
    ],
    mathBox: {
      title: "Interactive Formula Guide",
      equations: [
        { desc: "General Linear Equation", formula: "ax + b = c" },
        { desc: "Inverse of Addition", formula: "ax + b - b = c - b" },
        { desc: "Inverse of Multiplication", formula: "(ax)/a = (c-b)/a  =>  x = (c-b)/a" }
      ]
    },
    practiceQuestions: [
      {
        question: "Solve for x:  2(x - 3) + 4 = 12",
        options: [
          "x = 5",
          "x = 7",
          "x = 8",
          "x = 4"
        ],
        correctIndex: 1, // x = 7
        explanation: "1) Distribute the 2: 2x - 6 + 4 = 12. \n2) Combine constants: 2x - 2 = 12. \n3) Add 2 to both sides: 2x = 14. \n4) Divide by 2: x = 7."
      },
      {
        question: "Solve for x:  5x + 3 = 2x + 18",
        options: [
          "x = 3",
          "x = 5",
          "x = 15",
          "x = 6"
        ],
        correctIndex: 1, // x = 5
        explanation: "1) Subtract 2x from both sides: 3x + 3 = 18. \n2) Subtract 3 from both sides: 3x = 15. \n3) Divide by 3: x = 5."
      }
    ]
  }
};
