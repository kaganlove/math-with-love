export const curriculumLevels = [
  {
    id: "k-5",
    title: "Elementary School",
    subtitle: "Grades K-5",
    description: "Building confidence and strong numerical foundations. We focus on conceptual understanding, visual math models, and math facts mastery.",
    topics: [
      {
        id: "counting",
        title: "Counting & Cardinality",
        lessons: [
          { id: "counting-10", title: "Counting to 10 with Visuals", duration: "10 mins" },
          { id: "number-patterns", title: "Number Patterns & Skip Counting", duration: "15 mins" }
        ]
      },
      {
        id: "operations-algebraic",
        title: "Operations & Algebraic Thinking",
        lessons: [
          { id: "addition-facts", title: "Visualizing Addition: Making 10", duration: "15 mins" },
          { id: "subtraction-takeaway", title: "Subtraction as Taking Away", duration: "15 mins" },
          { id: "intro-multiplication", title: "Intro to Multiplication: Repeated Addition", duration: "20 mins" },
          { id: "division-sharing", title: "Intro to Division: Equal Sharing", duration: "20 mins" }
        ]
      },
      {
        id: "base-ten",
        title: "Numbers in Base Ten",
        lessons: [
          { id: "place-value-ones-tens", title: "Understanding Tens and Ones", duration: "15 mins" },
          { id: "double-digit-addition", title: "Double-Digit Addition with Regrouping", duration: "20 mins" }
        ]
      },
      {
        id: "fractions-elementary",
        title: "Fractions & Decimals",
        lessons: [
          { id: "fraction-pizza", title: "Fractions with Pizza: Parts of a Whole", duration: "20 mins" },
          { id: "equivalent-fractions", title: "Equivalent Fractions with Bars", duration: "25 mins" }
        ]
      }
    ]
  },
  {
    id: "6-8",
    title: "Middle School",
    subtitle: "Grades 6-8",
    description: "Bridging the gap between concrete numbers and abstract thinking. We master ratios, proportions, integers, and intro algebraic expressions.",
    topics: [
      {
        id: "ratios-rates",
        title: "Ratios & Proportional Relationships",
        lessons: [
          { id: "understanding-ratios", title: "Understanding Ratios & Rates", duration: "20 mins" },
          { id: "unit-rates", title: "Calculating Unit Rates in Real Life", duration: "25 mins" },
          { id: "proportions-cross-multiply", title: "Solving Proportions: The Why Behind Cross-Multiplying", duration: "25 mins" }
        ]
      },
      {
        id: "number-system",
        title: "The Number System",
        lessons: [
          { id: "integers-number-line", title: "Integers & Absolute Value on a Number Line", duration: "20 mins" },
          { id: "fraction-division", title: "Dividing Fractions: Keep, Change, Flip", duration: "25 mins" }
        ]
      },
      {
        id: "expressions-equations",
        title: "Expressions & Equations",
        lessons: [
          { id: "like-terms", title: "Combining Like Terms with Visual Blocks", duration: "25 mins" },
          { id: "one-step-equations", title: "Solving One-Step Equations", duration: "25 mins" },
          { id: "two-step-equations", title: "Solving Two-Step Equations Step-by-Step", duration: "30 mins" }
        ]
      }
    ]
  },
  {
    id: "9-12",
    title: "High School Math",
    subtitle: "Grades 9-12",
    description: "Developing rigorous problem-solving skills for Algebra, Geometry, Algebra II, Pre-Calculus, and AP Calculus & Test Prep.",
    topics: [
      {
        id: "algebra-1",
        title: "Algebra 1",
        lessons: [
          { id: "linear-equations", title: "Solving Multi-Step Linear Equations", duration: "30 mins", hasContent: true },
          { id: "graphing-slope-intercept", title: "Graphing Lines in Slope-Intercept Form (y = mx + b)", duration: "30 mins" },
          { id: "systems-substitution", title: "Systems of Equations: Substitution Method", duration: "35 mins" },
          { id: "factoring-quadratics", title: "Factoring Quadratic Trinomials (x² + bx + c)", duration: "40 mins" }
        ]
      },
      {
        id: "geometry",
        title: "Geometry",
        lessons: [
          { id: "pythagorean-theorem", title: "Pythagorean Theorem: Proof and Practice", duration: "25 mins" },
          { id: "triangle-congruence", title: "Triangle Congruence Postulates (SSS, SAS, ASA)", duration: "30 mins" },
          { id: "trig-ratios", title: "Right Triangle Trig: SOH CAH TOA", duration: "35 mins" }
        ]
      },
      {
        id: "algebra-2",
        title: "Algebra 2",
        lessons: [
          { id: "quadratic-formula", title: "The Quadratic Formula Demystified", duration: "35 mins" },
          { id: "laws-of-exponents", title: "Mastering Laws of Exponents & Radicals", duration: "30 mins" },
          { id: "logarithms-intro", title: "Intro to Logarithms: Undoing Exponents", duration: "35 mins" }
        ]
      },
      {
        id: "pre-calculus",
        title: "Pre-Calculus & Trig",
        lessons: [
          { id: "unit-circle-understanding", title: "Understanding the Unit Circle without Memorizing", duration: "40 mins" },
          { id: "trig-identities", title: "Proving Trigonometric Identities", duration: "45 mins" }
        ]
      }
    ]
  },
  {
    id: "college",
    title: "Early College Math",
    subtitle: "Undergraduate Level",
    description: "Advanced mathematics for STEM majors and college core requirements. Covers Calculus I & II, Linear Algebra, and Statistics.",
    topics: [
      {
        id: "calculus-1",
        title: "Calculus I (Limits & Derivatives)",
        lessons: [
          { id: "limits-definition", title: "Limits: The Conceptual Definition", duration: "40 mins" },
          { id: "derivative-rules", title: "Power, Product, and Quotient Rules", duration: "35 mins" },
          { id: "chain-rule", title: "The Chain Rule Step-by-Step", duration: "40 mins" },
          { id: "optimization-problems", title: "Solving Optimization Problems in Calculus", duration: "45 mins" }
        ]
      },
      {
        id: "calculus-2",
        title: "Calculus II (Integration)",
        lessons: [
          { id: "integration-substitution", title: "Integration by u-Substitution", duration: "40 mins" },
          { id: "integration-by-parts", title: "Integration by Parts: LIATE Rule", duration: "45 mins" }
        ]
      },
      {
        id: "linear-algebra",
        title: "Linear Algebra",
        lessons: [
          { id: "gaussian-elimination", title: "Row Reduction and Gaussian Elimination", duration: "35 mins" },
          { id: "determinants-eigenvalues", title: "Understanding Determinants & Eigenvalues", duration: "45 mins" }
        ]
      },
      {
        id: "statistics",
        title: "Introductory Statistics",
        lessons: [
          { id: "normal-distribution", title: "The Normal Distribution and Z-Scores", duration: "35 mins" },
          { id: "hypothesis-testing", title: "Understanding p-Values and Hypothesis Testing", duration: "45 mins" }
        ]
      }
    ]
  }
];

export const sampleLessons = {
  "linear-equations": {
    id: "linear-equations",
    title: "Solving Multi-Step Linear Equations",
    subtitle: "Algebra 1 Foundations",
    duration: "30 mins",
    level: "High School Math",
    topic: "Algebra 1",
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
