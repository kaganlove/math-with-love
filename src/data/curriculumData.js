// Comprehensive Grade-by-Grade Common Core Aligned Curriculum & Test Prep Mappings

export const curriculumLevels = [
  {
    id: "k",
    title: "Kindergarten",
    subtitle: "Grade K",
    description: "Counting, cardinality, numbers 1-20, basic addition/subtraction, measurement, shapes.",
    topics: [
      {
        id: "k-cc",
        title: "Counting & Cardinality",
        lessons: [
          { id: "k-cc-1", title: "Count to 100 by Ones and Tens", ccss: "K.CC.A.1", duration: "10 mins" },
          { id: "k-cc-2", title: "Count Forward from a Given Number", ccss: "K.CC.A.2", duration: "10 mins" },
          { id: "k-cc-3", title: "Write Numbers 0 to 20", ccss: "K.CC.A.3", duration: "12 mins" },
          { id: "k-cc-4", title: "Understand Counting Objects", ccss: "K.CC.B.4", duration: "12 mins" },
          { id: "k-cc-5", title: "Count to Answer 'How Many?'", ccss: "K.CC.B.5", duration: "10 mins" },
          { id: "k-cc-6", title: "Identify Groups: Greater, Less, Equal", ccss: "K.CC.C.6", duration: "12 mins" },
          { id: "k-cc-7", title: "Compare Two Written Numbers", ccss: "K.CC.C.7", duration: "10 mins" }
        ]
      },
      {
        id: "k-oa",
        title: "Operations & Algebraic Thinking",
        lessons: [
          { id: "k-oa-1", title: "Visual Addition and Subtraction", ccss: "K.OA.A.1", duration: "15 mins" },
          { id: "k-oa-2", title: "Solve Word Problems within 10", ccss: "K.OA.A.2", duration: "15 mins" },
          { id: "k-oa-3", title: "Decompose Numbers Less than 10", ccss: "K.OA.A.3", duration: "12 mins" },
          { id: "k-oa-4", title: "Find the Number that Makes 10", ccss: "K.OA.A.4", duration: "12 mins" },
          { id: "k-oa-5", title: "Fluently Add/Subtract within 5", ccss: "K.OA.A.5", duration: "10 mins" }
        ]
      },
      {
        id: "k-nbt",
        title: "Number & Operations in Base Ten",
        lessons: [
          { id: "k-nbt-1", title: "Make and Take Apart Numbers 11-19", ccss: "K.NBT.A.1", duration: "15 mins" }
        ]
      },
      {
        id: "k-md",
        title: "Measurement & Data",
        lessons: [
          { id: "k-md-1", title: "Describe Measurable Attributes", ccss: "K.MD.A.1", duration: "10 mins" },
          { id: "k-md-2", title: "Compare Two Measurable Attributes", ccss: "K.MD.A.2", duration: "10 mins" },
          { id: "k-md-3", title: "Classify Objects into Categories", ccss: "K.MD.B.3", duration: "10 mins" }
        ]
      },
      {
        id: "k-g",
        title: "Geometry",
        lessons: [
          { id: "k-g-1", title: "Describe Objects in Space (Above/Below)", ccss: "K.G.A.1", duration: "10 mins" },
          { id: "k-g-2", title: "Identify Shapes Regardless of Size", ccss: "K.G.A.2", duration: "10 mins" },
          { id: "k-g-3", title: "Identify 2D and 3D Shapes", ccss: "K.G.A.3", duration: "10 mins" },
          { id: "k-g-4", title: "Analyze and Compare Shapes", ccss: "K.G.B.4", duration: "12 mins" },
          { id: "k-g-5", title: "Build and Draw Shapes", ccss: "K.G.B.5", duration: "12 mins" },
          { id: "k-g-6", title: "Compose Simple Shapes into Larger Shapes", ccss: "K.G.B.6", duration: "15 mins" }
        ]
      }
    ]
  },
  {
    id: "1",
    title: "1st Grade",
    subtitle: "Grade 1",
    description: "Addition/subtraction within 20, place value concepts, length measurement, partitioning shapes.",
    topics: [
      {
        id: "1-oa",
        title: "Operations & Algebraic Thinking",
        lessons: [
          { id: "1-oa-1", title: "Word Problems: Add and Subtract within 20", ccss: "1.OA.A.1", duration: "15 mins" },
          { id: "1-oa-2", title: "Add Three Whole Numbers Word Problems", ccss: "1.OA.A.2", duration: "15 mins" },
          { id: "1-oa-3", title: "Apply Properties (Commutative/Associative)", ccss: "1.OA.B.3", duration: "15 mins" },
          { id: "1-oa-4", title: "Subtraction as an Unknown-Addend Problem", ccss: "1.OA.B.4", duration: "15 mins" },
          { id: "1-oa-5", title: "Relate Counting to Add & Subtract", ccss: "1.OA.C.5", duration: "10 mins" },
          { id: "1-oa-6", title: "Add and Subtract within 20 (Fluency within 10)", ccss: "1.OA.C.6", duration: "15 mins" },
          { id: "1-oa-7", title: "Understand the Equal Sign Symbol", ccss: "1.OA.D.7", duration: "12 mins" },
          { id: "1-oa-8", title: "Determine the Unknown Whole Number", ccss: "1.OA.D.8", duration: "12 mins" }
        ]
      },
      {
        id: "1-nbt",
        title: "Number & Operations in Base Ten",
        lessons: [
          { id: "1-nbt-1", title: "Count and Write to 120 Starting Anywhere", ccss: "1.NBT.A.1", duration: "12 mins" },
          { id: "1-nbt-2", title: "Understand Place Value (Tens and Ones)", ccss: "1.NBT.B.2", duration: "15 mins" },
          { id: "1-nbt-3", title: "Compare Two-Digit Numbers (<, >, =)", ccss: "1.NBT.B.3", duration: "12 mins" },
          { id: "1-nbt-4", title: "Add Two-Digit and One-Digit Numbers", ccss: "1.NBT.C.4", duration: "15 mins" },
          { id: "1-nbt-5", title: "Mental Math: Find 10 More or 10 Less", ccss: "1.NBT.C.5", duration: "10 mins" },
          { id: "1-nbt-6", title: "Subtract Multiples of 10", ccss: "1.NBT.C.6", duration: "15 mins" }
        ]
      },
      {
        id: "1-md",
        title: "Measurement & Data",
        lessons: [
          { id: "1-md-1", title: "Order and Compare Lengths of Objects", ccss: "1.MD.A.1", duration: "10 mins" },
          { id: "1-md-2", title: "Measure Length with Non-Standard Units", ccss: "1.MD.A.2", duration: "15 mins" },
          { id: "1-md-3", title: "Tell Time to Hours and Half-Hours", ccss: "1.MD.B.3", duration: "15 mins" },
          { id: "1-md-4", title: "Organize and Represent Data (Three Categories)", ccss: "1.MD.C.4", duration: "15 mins" }
        ]
      },
      {
        id: "1-g",
        title: "Geometry",
        lessons: [
          { id: "1-g-1", title: "Distinguish Defining Attributes of Shapes", ccss: "1.G.A.1", duration: "10 mins" },
          { id: "1-g-2", title: "Compose Two-Dimensional Shapes", ccss: "1.G.A.2", duration: "15 mins" },
          { id: "1-g-3", title: "Partition Circles and Rectangles (Halves/Quarters)", ccss: "1.G.A.3", duration: "15 mins" }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "2nd Grade",
    subtitle: "Grade 2",
    description: "Addition/subtraction within 100, place value to 1000, standard measurement units, basic geometry.",
    topics: [
      {
        id: "2-oa",
        title: "Operations & Algebraic Thinking",
        lessons: [
          { id: "2-oa-1", title: "One and Two-Step Word Problems within 100", ccss: "2.OA.A.1", duration: "15 mins" },
          { id: "2-oa-2", title: "Fluently Add and Subtract within 20", ccss: "2.OA.B.2", duration: "12 mins" },
          { id: "2-oa-3", title: "Identify Even and Odd Numbers", ccss: "2.OA.C.3", duration: "12 mins" },
          { id: "2-oa-4", title: "Using Arrays for Repeated Addition", ccss: "2.OA.C.4", duration: "15 mins" }
        ]
      },
      {
        id: "2-nbt",
        title: "Number & Operations in Base Ten",
        lessons: [
          { id: "2-nbt-1", title: "Understand Three-Digit Place Value (Hundreds)", ccss: "2.NBT.A.1", duration: "15 mins" },
          { id: "2-nbt-2", title: "Skip-Count by 5s, 10s, and 100s", ccss: "2.NBT.A.2", duration: "12 mins" },
          { id: "2-nbt-3", title: "Read and Write Numbers to 1000", ccss: "2.NBT.A.3", duration: "12 mins" },
          { id: "2-nbt-4", title: "Compare Three-Digit Numbers (<, >, =)", ccss: "2.NBT.A.4", duration: "12 mins" },
          { id: "2-nbt-5", title: "Fluently Add/Subtract within 100", ccss: "2.NBT.B.5", duration: "15 mins" },
          { id: "2-nbt-6", title: "Add Up to Four Two-Digit Numbers", ccss: "2.NBT.B.6", duration: "15 mins" },
          { id: "2-nbt-7", title: "Add/Subtract within 1000 with Regrouping", ccss: "2.NBT.B.7", duration: "20 mins" },
          { id: "2-nbt-8", title: "Mental Math: Add 10 or 100 to a Number", ccss: "2.NBT.B.8", duration: "10 mins" },
          { id: "2-nbt-9", title: "Explain Why Addition/Subtraction Strategies Work", ccss: "2.NBT.B.9", duration: "15 mins" }
        ]
      },
      {
        id: "2-md",
        title: "Measurement & Data",
        lessons: [
          { id: "2-md-1", title: "Measure Length with Rules and Tapes", ccss: "2.MD.A.1", duration: "15 mins" },
          { id: "2-md-2", title: "Measure Length Using Two Different Units", ccss: "2.MD.A.2", duration: "15 mins" },
          { id: "2-md-3", title: "Estimate Lengths in Inches and Centimeters", ccss: "2.MD.A.3", duration: "12 mins" },
          { id: "2-md-4", title: "Measure to Compare Length Differences", ccss: "2.MD.A.4", duration: "15 mins" },
          { id: "2-md-5", title: "Length Word Problems within 100", ccss: "2.MD.B.5", duration: "15 mins" },
          { id: "2-md-6", title: "Represent Whole Numbers on a Number Line", ccss: "2.MD.B.6", duration: "15 mins" },
          { id: "2-md-7", title: "Tell Time to Nearest 5 Minutes (AM/PM)", ccss: "2.MD.C.7", duration: "15 mins" },
          { id: "2-md-8", title: "Solve Word Problems Involving Money", ccss: "2.MD.C.8", duration: "15 mins" },
          { id: "2-md-9", title: "Generate Measurement Data (Line Plots)", ccss: "2.MD.D.9", duration: "15 mins" },
          { id: "2-md-10", title: "Draw Picture Graphs and Bar Graphs", ccss: "2.MD.D.10", duration: "15 mins" }
        ]
      },
      {
        id: "2-g",
        title: "Geometry",
        lessons: [
          { id: "2-g-1", title: "Recognize and Draw Shapes with Specific Angles", ccss: "2.G.A.1", duration: "12 mins" },
          { id: "2-g-2", title: "Partition Rectangles into Equal Squares", ccss: "2.G.A.2", duration: "15 mins" },
          { id: "2-g-3", title: "Partition Shapes (Halves, Thirds, Fourths)", ccss: "2.G.A.3", duration: "15 mins" }
        ]
      }
    ]
  },
  {
    id: "3",
    title: "3rd Grade",
    subtitle: "Grade 3",
    description: "Intro to multiplication/division, fraction representations, area concepts, classifying shapes.",
    topics: [
      {
        id: "3-oa",
        title: "Operations & Algebraic Thinking",
        lessons: [
          { id: "3-oa-1", title: "Interpret Products of Whole Numbers", ccss: "3.OA.A.1", duration: "15 mins" },
          { id: "3-oa-2", title: "Interpret Whole-Number Quotients", ccss: "3.OA.A.2", duration: "15 mins" },
          { id: "3-oa-3", title: "Multiplication/Division Word Problems", ccss: "3.OA.A.3", duration: "20 mins" },
          { id: "3-oa-4", title: "Determine the Unknown Number in Equation", ccss: "3.OA.A.4", duration: "15 mins" },
          { id: "3-oa-5", title: "Commutative, Associative & Distributive Laws", ccss: "3.OA.B.5", duration: "20 mins" },
          { id: "3-oa-6", title: "Understand Division as an Unknown-Factor", ccss: "3.OA.B.6", duration: "15 mins" },
          { id: "3-oa-7", title: "Fluently Multiply and Divide within 100", ccss: "3.OA.C.7", duration: "15 mins" },
          { id: "3-oa-8", title: "Two-Step Word Problems (Four Operations)", ccss: "3.OA.D.8", duration: "20 mins" },
          { id: "3-oa-9", title: "Identify Arithmetic Patterns", ccss: "3.OA.D.9", duration: "15 mins" }
        ]
      },
      {
        id: "3-nbt",
        title: "Number & Operations in Base Ten",
        lessons: [
          { id: "3-nbt-1", title: "Round Whole Numbers to Nearest 10 or 100", ccss: "3.NBT.A.1", duration: "12 mins" },
          { id: "3-nbt-2", title: "Fluently Add/Subtract within 1000", ccss: "3.NBT.A.2", duration: "15 mins" },
          { id: "3-nbt-3", title: "Multiply One-Digit Numbers by Multiples of 10", ccss: "3.NBT.A.3", duration: "15 mins" }
        ]
      },
      {
        id: "3-nf",
        title: "Number & Operations - Fractions",
        lessons: [
          { id: "3-nf-1", title: "Understand Fractions as Parts of a Whole", ccss: "3.NF.A.1", duration: "18 mins" },
          { id: "3-nf-2", title: "Represent Fractions on a Number Line", ccss: "3.NF.A.2", duration: "18 mins" },
          { id: "3-nf-3", title: "Equivalent Fractions and Comparisons", ccss: "3.NF.A.3", duration: "20 mins" }
        ]
      },
      {
        id: "3-md",
        title: "Measurement & Data",
        lessons: [
          { id: "3-md-1", title: "Tell Time to Nearest Minute & Elapsed Time", ccss: "3.MD.A.1", duration: "15 mins" },
          { id: "3-md-2", title: "Measure Volume and Masses of Objects", ccss: "3.MD.A.2", duration: "15 mins" },
          { id: "3-md-3", title: "Draw Scaled Picture and Bar Graphs", ccss: "3.MD.B.3", duration: "15 mins" },
          { id: "3-md-4", title: "Generate Length Data (Ruler to Quarters)", ccss: "3.MD.B.4", duration: "15 mins" },
          { id: "3-md-5", title: "Recognize Area as an Attribute of Plane Figures", ccss: "3.MD.C.5", duration: "12 mins" },
          { id: "3-md-6", title: "Measure Area by Counting Unit Squares", ccss: "3.MD.C.6", duration: "12 mins" },
          { id: "3-md-7", title: "Relate Area to Multiplication and Addition", ccss: "3.MD.C.7", duration: "18 mins" },
          { id: "3-md-8", title: "Solve Real-World Perimeter Problems", ccss: "3.MD.D.8", duration: "15 mins" }
        ]
      },
      {
        id: "3-g",
        title: "Geometry",
        lessons: [
          { id: "3-g-1", title: "Categorize Shapes by Sides and Angles", ccss: "3.G.A.1", duration: "12 mins" },
          { id: "3-g-2", title: "Partition Shapes into Areas with Equal Parts", ccss: "3.G.A.2", duration: "12 mins" }
        ]
      }
    ]
  },
  {
    id: "4",
    title: "4th Grade",
    subtitle: "Grade 4",
    description: "Multi-digit arithmetic, fractions equivalence and operations, decimal conversions, angles.",
    topics: [
      {
        id: "4-oa",
        title: "Operations & Algebraic Thinking",
        lessons: [
          { id: "4-oa-1", title: "Multiplicative Comparisons", ccss: "4.OA.A.1", duration: "15 mins" },
          { id: "4-oa-2", title: "Multiplicative Comparison Word Problems", ccss: "4.OA.A.2", duration: "15 mins" },
          { id: "4-oa-3", title: "Multi-Step Word Problems with Remainders", ccss: "4.OA.A.3", duration: "20 mins" },
          { id: "4-oa-4", title: "Find Factors and Multiples (Prime & Composite)", ccss: "4.OA.B.4", duration: "15 mins" },
          { id: "4-oa-5", title: "Generate and Analyze Number Patterns", ccss: "4.OA.C.5", duration: "15 mins" }
        ]
      },
      {
        id: "4-nbt",
        title: "Number & Operations in Base Ten",
        lessons: [
          { id: "4-nbt-1", title: "Place Value Relationships (10 Times Value)", ccss: "4.NBT.A.1", duration: "15 mins" },
          { id: "4-nbt-2", title: "Read, Write, and Compare Multi-Digit Numbers", ccss: "4.NBT.A.2", duration: "15 mins" },
          { id: "4-nbt-3", title: "Round Multi-Digit Whole Numbers", ccss: "4.NBT.A.3", duration: "12 mins" },
          { id: "4-nbt-4", title: "Fluently Add/Subtract Multi-Digit Numbers", ccss: "4.NBT.B.4", duration: "15 mins" },
          { id: "4-nbt-5", title: "Multiply Up to 4-Digits by 1-Digit", ccss: "4.NBT.B.5", duration: "20 mins" },
          { id: "4-nbt-6", title: "Divide 4-Digit Numbers by 1-Digit", ccss: "4.NBT.B.6", duration: "20 mins" }
        ]
      },
      {
        id: "4-nf",
        title: "Number & Operations - Fractions",
        lessons: [
          { id: "4-nf-1", title: "Explain Equivalent Fractions (Visual Models)", ccss: "4.NF.A.1", duration: "20 mins" },
          { id: "4-nf-2", title: "Compare Fractions with Different Denominators", ccss: "4.NF.A.2", duration: "20 mins" },
          { id: "4-nf-3", title: "Add/Subtract Fractions with Like Denominators", ccss: "4.NF.B.3", duration: "22 mins" },
          { id: "4-nf-4", title: "Multiply Fractions by Whole Numbers", ccss: "4.NF.B.4", duration: "22 mins" },
          { id: "4-nf-5", title: "Fractions with Denominators of 10 and 100", ccss: "4.NF.C.5", duration: "18 mins" },
          { id: "4-nf-6", title: "Write Fractions as Decimals", ccss: "4.NF.C.6", duration: "18 mins" },
          { id: "4-nf-7", title: "Compare Two Decimals to Hundredths", ccss: "4.NF.C.7", duration: "15 mins" }
        ]
      },
      {
        id: "4-md",
        title: "Measurement & Data",
        lessons: [
          { id: "4-md-1", title: "Convert Measurements (km, m, kg, g, lb, oz)", ccss: "4.MD.A.1", duration: "18 mins" },
          { id: "4-md-2", title: "Measurement Word Problems (Time, Volume, Money)", ccss: "4.MD.A.2", duration: "20 mins" },
          { id: "4-md-3", title: "Area & Perimeter Formulas (Rectangles)", ccss: "4.MD.A.3", duration: "18 mins" },
          { id: "4-md-4", title: "Display Fraction Measurement Data on Line Plot", ccss: "4.MD.B.4", duration: "15 mins" },
          { id: "4-md-5", title: "Angles as Geometric Shapes", ccss: "4.MD.C.5", duration: "12 mins" },
          { id: "4-md-6", title: "Measure Angles with a Protractor", ccss: "4.MD.C.6", duration: "15 mins" },
          { id: "4-md-7", title: "Solve Addition & Subtraction Angle Problems", ccss: "4.MD.C.7", duration: "18 mins" }
        ]
      },
      {
        id: "4-g",
        title: "Geometry",
        lessons: [
          { id: "4-g-1", title: "Draw Points, Lines, Rays, and Angles", ccss: "4.G.A.1", duration: "12 mins" },
          { id: "4-g-2", title: "Classify Triangles by Sides and Angles", ccss: "4.G.A.2", duration: "15 mins" },
          { id: "4-g-3", title: "Recognize Line Symmetry in Figures", ccss: "4.G.A.3", duration: "12 mins" }
        ]
      }
    ]
  },
  {
    id: "5",
    title: "5th Grade",
    subtitle: "Grade 5",
    description: "Parentheses in expressions, decimal operations, fraction operations, volume calculation.",
    topics: [
      {
        id: "5-oa",
        title: "Operations & Algebraic Thinking",
        lessons: [
          { id: "5-oa-1", title: "Use Parentheses, Brackets, and Braces", ccss: "5.OA.A.1", duration: "15 mins" },
          { id: "5-oa-2", title: "Write Simple Numerical Expressions", ccss: "5.OA.A.2", duration: "15 mins" },
          { id: "5-oa-3", title: "Generate and Graph Numerical Patterns", ccss: "5.OA.B.3", duration: "20 mins" }
        ]
      },
      {
        id: "5-nbt",
        title: "Number & Operations in Base Ten",
        lessons: [
          { id: "5-nbt-1", title: "Decimal Place Value Relationships", ccss: "5.NBT.A.1", duration: "15 mins" },
          { id: "5-nbt-2", title: "Powers of 10 and Exponent Patterns", ccss: "5.NBT.A.2", duration: "15 mins" },
          { id: "5-nbt-3", title: "Read, Write, and Compare Decimals", ccss: "5.NBT.A.3", duration: "15 mins" },
          { id: "5-nbt-4", title: "Round Decimals to Any Place", ccss: "5.NBT.A.4", duration: "12 mins" },
          { id: "5-nbt-5", title: "Fluently Multiply Multi-Digit Whole Numbers", ccss: "5.NBT.B.5", duration: "15 mins" },
          { id: "5-nbt-6", title: "Divide 4-Digit Numbers by 2-Digit Numbers", ccss: "5.NBT.B.6", duration: "20 mins" },
          { id: "5-nbt-7", title: "Add, Subtract, Multiply, and Divide Decimals", ccss: "5.NBT.B.7", duration: "22 mins" }
        ]
      },
      {
        id: "5-nf",
        title: "Number & Operations - Fractions",
        lessons: [
          { id: "5-nf-1", title: "Add & Subtract Fractions (Unlike Denominators)", ccss: "5.NF.A.1", duration: "22 mins" },
          { id: "5-nf-2", title: "Word Problems: Add & Subtract Fractions", ccss: "5.NF.A.2", duration: "22 mins" },
          { id: "5-nf-3", title: "Interpret Fractions as Division (a/b = a ÷ b)", ccss: "5.NF.B.3", duration: "18 mins" },
          { id: "5-nf-4", title: "Multiply Fractions by Fractions", ccss: "5.NF.B.4", duration: "22 mins" },
          { id: "5-nf-5", title: "Multiplication as Scaling (Comparing Factors)", ccss: "5.NF.B.5", duration: "18 mins" },
          { id: "5-nf-6", title: "Solve Real-World Fraction Multiplication Problems", ccss: "5.NF.B.6", duration: "22 mins" },
          { id: "5-nf-7", title: "Divide Unit Fractions by Whole Numbers", ccss: "5.NF.B.7", duration: "22 mins" }
        ]
      },
      {
        id: "5-md",
        title: "Measurement & Data",
        lessons: [
          { id: "5-md-1", title: "Convert Multi-Step Unit Measurements", ccss: "5.MD.A.1", duration: "18 mins" },
          { id: "5-md-2", title: "Make Line Plots to Represent Fractions", ccss: "5.MD.B.2", duration: "15 mins" },
          { id: "5-md-3", title: "Volume as a Geometric Attribute", ccss: "5.MD.C.3", duration: "12 mins" },
          { id: "5-md-4", title: "Measure Volume by Counting Unit Cubes", ccss: "5.MD.C.4", duration: "12 mins" },
          { id: "5-md-5", title: "Volume Formulas (V = l × w × h)", ccss: "5.MD.C.5", duration: "20 mins" }
        ]
      },
      {
        id: "5-g",
        title: "Geometry",
        lessons: [
          { id: "5-g-1", title: "Graph Points on the Coordinate Plane", ccss: "5.G.A.1", duration: "15 mins" },
          { id: "5-g-2", title: "Represent Real-World Problems on Coordinate Plane", ccss: "5.G.A.2", duration: "18 mins" },
          { id: "5-g-3", title: "Classify 2D Shapes in a Hierarchy", ccss: "5.G.B.3", duration: "12 mins" },
          { id: "5-g-4", title: "Classify 2D Shapes Based on Properties", ccss: "5.G.B.4", duration: "12 mins" }
        ]
      }
    ]
  },
  {
    id: "6",
    title: "6th Grade",
    subtitle: "Grade 6",
    description: "Ratios and unit rates, dividing fractions, negative numbers, algebraic equations, area and net shapes.",
    topics: [
      {
        id: "6-rp",
        title: "Ratios & Proportional Relationships",
        lessons: [
          { id: "understanding-ratios", title: "Understanding Ratios & Rates", ccss: "6.RP.A.1", duration: "20 mins" },
          { id: "unit-rates", title: "Calculating Unit Rates in Real Life", ccss: "6.RP.A.2", duration: "25 mins" },
          { id: "6-rp-3", title: "Solve Ratio and Rate Problems", ccss: "6.RP.A.3", duration: "25 mins" }
        ]
      },
      {
        id: "6-ns",
        title: "The Number System",
        lessons: [
          { id: "fraction-division", title: "Dividing Fractions: Keep, Change, Flip", ccss: "6.NS.A.1", duration: "25 mins" },
          { id: "6-ns-2", title: "Divide Multi-Digit Numbers (Standard Algorithm)", ccss: "6.NS.B.2", duration: "20 mins" },
          { id: "6-ns-3", title: "Fluently Add, Subtract, Multiply, and Divide Decimals", ccss: "6.NS.B.3", duration: "20 mins" },
          { id: "6-ns-4", title: "Find Greatest Common Factor (GCF) & LCM", ccss: "6.NS.B.4", duration: "20 mins" },
          { id: "6-ns-5", title: "Understand Positive and Negative Numbers", ccss: "6.NS.C.5", duration: "15 mins" },
          { id: "integers-number-line", title: "Integers & Absolute Value on a Number Line", ccss: "6.NS.C.6", duration: "20 mins" },
          { id: "6-ns-7", title: "Compare and Order Rational Numbers", ccss: "6.NS.C.7", duration: "20 mins" },
          { id: "6-ns-8", title: "Solve Distance Problems on Coordinate Plane", ccss: "6.NS.C.8", duration: "22 mins" }
        ]
      },
      {
        id: "6-ee",
        title: "Expressions & Equations",
        lessons: [
          { id: "6-ee-1", title: "Evaluate Numerical Expressions with Exponents", ccss: "6.EE.A.1", duration: "20 mins" },
          { id: "6-ee-2", title: "Write, Read, and Evaluate Variable Expressions", ccss: "6.EE.A.2", duration: "22 mins" },
          { id: "like-terms", title: "Combining Like Terms with Visual Blocks", ccss: "6.EE.A.3", duration: "25 mins" },
          { id: "6-ee-4", title: "Identify Equivalent Algebraic Expressions", ccss: "6.EE.A.4", duration: "20 mins" },
          { id: "6-ee-5", title: "Understand Solving Equations (True/False Statements)", ccss: "6.EE.B.5", duration: "18 mins" },
          { id: "6-ee-6", title: "Use Variables to Represent Numbers", ccss: "6.EE.B.6", duration: "18 mins" },
          { id: "one-step-equations", title: "Solving One-Step Equations", ccss: "6.EE.B.7", duration: "25 mins" },
          { id: "6-ee-8", title: "Write and Graph Inequalities (x > c)", ccss: "6.EE.B.8", duration: "20 mins" },
          { id: "6-ee-9", title: "Dependent vs. Independent Variables", ccss: "6.EE.C.9", duration: "22 mins" }
        ]
      },
      {
        id: "6-g",
        title: "Geometry",
        lessons: [
          { id: "6-g-1", title: "Find Area of Triangles and Polygons", ccss: "6.G.A.1", duration: "20 mins" },
          { id: "6-g-2", title: "Find Volume of Rectangular Prisms (Fractions)", ccss: "6.G.A.2", duration: "20 mins" },
          { id: "6-g-3", title: "Draw Polygons in Coordinate Plane", ccss: "6.G.A.3", duration: "20 mins" },
          { id: "6-g-4", title: "Represent 3D Shapes Using Nets (Surface Area)", ccss: "6.G.A.4", duration: "22 mins" }
        ]
      },
      {
        id: "6-sp",
        title: "Statistics & Probability",
        lessons: [
          { id: "6-sp-1", title: "Recognize Statistical Questions", ccss: "6.SP.A.1", duration: "15 mins" },
          { id: "6-sp-2", title: "Understand Center, Spread, and Shape of Data", ccss: "6.SP.A.2", duration: "18 mins" },
          { id: "6-sp-3", title: "Measure of Center (Mean/Median) vs. Variability", ccss: "6.SP.A.3", duration: "18 mins" },
          { id: "6-sp-4", title: "Display Data in Histograms and Box Plots", ccss: "6.SP.B.4", duration: "20 mins" },
          { id: "6-sp-5", title: "Summarize Numerical Data Sets", ccss: "6.SP.B.5", duration: "20 mins" }
        ]
      }
    ]
  },
  {
    id: "7",
    title: "7th Grade",
    subtitle: "Grade 7",
    description: "Proportional relations & graphs, rational number operations, linear expressions, circles, random sampling.",
    topics: [
      {
        id: "7-rp",
        title: "Ratios & Proportional Relationships",
        lessons: [
          { id: "7-rp-1", title: "Compute Unit Rates with Fractions", ccss: "7.RP.A.1", duration: "22 mins" },
          { id: "proportions-cross-multiply", title: "Solving Proportions: Cross-Multiplying", ccss: "7.RP.A.2", duration: "25 mins" },
          { id: "7-rp-3", title: "Multi-Step Ratio and Percent Problems", ccss: "7.RP.A.3", duration: "25 mins" }
        ]
      },
      {
        id: "7-ns",
        title: "The Number System",
        lessons: [
          { id: "7-ns-1", title: "Add/Subtract Rational Numbers (Visual Models)", ccss: "7.NS.A.1", duration: "20 mins" },
          { id: "7-ns-2", title: "Multiply/Divide Rational Numbers", ccss: "7.NS.A.2", duration: "20 mins" },
          { id: "7-ns-3", title: "Real-World Rational Number Problems", ccss: "7.NS.A.3", duration: "22 mins" }
        ]
      },
      {
        id: "7-ee",
        title: "Expressions & Equations",
        lessons: [
          { id: "7-ee-1", title: "Add, Subtract, Factor, and Expand Linear Expressions", ccss: "7.EE.A.1", duration: "22 mins" },
          { id: "7-ee-2", title: "Rewrite Expressions in Different Forms", ccss: "7.EE.A.2", duration: "18 mins" },
          { id: "7-ee-3", title: "Solve Multi-Step Rational Number Problems", ccss: "7.EE.B.3", duration: "25 mins" },
          { id: "two-step-equations", title: "Solving Two-Step Equations Step-by-Step", ccss: "7.EE.B.4", duration: "30 mins" }
        ]
      },
      {
        id: "7-g",
        title: "Geometry",
        lessons: [
          { id: "7-g-1", title: "Solve Problems with Scale Drawings of Geometric Figures", ccss: "7.G.A.1", duration: "20 mins" },
          { id: "7-g-2", title: "Draw Geometric Shapes with Given Conditions", ccss: "7.G.A.2", duration: "20 mins" },
          { id: "7-g-3", title: "Describe 2D Cross-Sections of 3D Figures", ccss: "7.G.A.3", duration: "18 mins" },
          { id: "7-g-4", title: "Area & Circumference of a Circle Formulas", ccss: "7.G.B.4", duration: "22 mins" },
          { id: "7-g-5", title: "Supplementary, Complementary, Vertical, and Adjacent Angles", ccss: "7.G.B.5", duration: "22 mins" },
          { id: "7-g-6", title: "Real-World Area, Volume & Surface Area Problems", ccss: "7.G.B.6", duration: "25 mins" }
        ]
      },
      {
        id: "7-sp",
        title: "Statistics & Probability",
        lessons: [
          { id: "7-sp-1", title: "Understand Random Sampling to Draw Inferences", ccss: "7.SP.A.1", duration: "18 mins" },
          { id: "7-sp-2", title: "Use Data from Random Samples to Estimate", ccss: "7.SP.A.2", duration: "20 mins" },
          { id: "7-sp-3", title: "Informally Assess Visual Overlap of Data Distributions", ccss: "7.SP.B.3", duration: "20 mins" },
          { id: "7-sp-4", title: "Use Measures of Center & Variability to Compare", ccss: "7.SP.B.4", duration: "22 mins" },
          { id: "7-sp-5", title: "Understand Probability of a Chance Event (0 to 1)", ccss: "7.SP.C.5", duration: "15 mins" },
          { id: "7-sp-6", title: "Approximate Probability by Collecting Data", ccss: "7.SP.C.6", duration: "18 mins" },
          { id: "7-sp-7", title: "Develop and Use a Probability Model", ccss: "7.SP.C.7", duration: "20 mins" },
          { id: "7-sp-8", title: "Find Probabilities of Compound Events (Tree/Grid)", ccss: "7.SP.C.8", duration: "25 mins" }
        ]
      }
    ]
  },
  {
    id: "8",
    title: "8th Grade",
    subtitle: "Grade 8",
    description: "Rational/irrational numbers, exponent laws, graphing linear slopes & systems, functions, Pythagorean theorem.",
    topics: [
      {
        id: "8-ns",
        title: "The Number System",
        lessons: [
          { id: "8-ns-1", title: "Rational vs. Irrational Numbers", ccss: "8.NS.A.1", duration: "20 mins" },
          { id: "8-ns-2", title: "Approximate Irrational Numbers on a Number Line", ccss: "8.NS.A.2", duration: "20 mins" }
        ]
      },
      {
        id: "8-ee",
        title: "Expressions & Equations",
        lessons: [
          { id: "8-ee-1", title: "Evaluate Integer Exponents", ccss: "8.EE.A.1", duration: "22 mins" },
          { id: "8-ee-2", title: "Use Square Root and Cube Root Symbols", ccss: "8.EE.A.2", duration: "20 mins" },
          { id: "8-ee-3", title: "Express Numbers in Scientific Notation", ccss: "8.EE.A.3", duration: "18 mins" },
          { id: "8-ee-4", title: "Perform Operations with Scientific Notation", ccss: "8.EE.A.4", duration: "22 mins" },
          { id: "8-ee-5", title: "Graph Proportional Relationships (Unit Rate as Slope)", ccss: "8.EE.B.5", duration: "22 mins" },
          { id: "8-ee-6", title: "Derive Equations y = mx and y = mx + b", ccss: "8.EE.B.6", duration: "22 mins" },
          { id: "8-ee-7", title: "Solve Linear Equations in One Variable (0, 1, or Infinite Solutions)", ccss: "8.EE.C.7", duration: "25 mins" },
          { id: "8-ee-8", title: "Solve Systems of Linear Equations Graphically and Algebraically", ccss: "8.EE.C.8", duration: "30 mins" }
        ]
      },
      {
        id: "8-f",
        title: "Functions",
        lessons: [
          { id: "8-f-1", title: "Define Functions (Exactly One Output per Input)", ccss: "8.F.A.1", duration: "22 mins" },
          { id: "8-f-2", title: "Compare Properties of Two Functions", ccss: "8.F.A.2", duration: "22 mins" },
          { id: "8-f-3", title: "Define Linear vs. Nonlinear Functions", ccss: "8.F.A.3", duration: "20 mins" },
          { id: "graphing-slope-intercept", title: "Graphing Lines in Slope-Intercept Form (y = mx + b)", ccss: "8.F.B.4", duration: "30 mins" },
          { id: "8-f-5", title: "Analyze and Describe Graphs of Functions", ccss: "8.F.B.5", duration: "22 mins" }
        ]
      },
      {
        id: "8-g",
        title: "Geometry",
        lessons: [
          { id: "8-g-1", title: "Properties of Rotations, Reflections, and Translations", ccss: "8.G.A.1", duration: "20 mins" },
          { id: "8-g-2", title: "Understand Congruence Using Rigid Transformations", ccss: "8.G.A.2", duration: "22 mins" },
          { id: "8-g-3", title: "Describe Effects of Dilations, Translations, Rotations on Grid", ccss: "8.G.A.3", duration: "25 mins" },
          { id: "8-g-4", title: "Understand Similarity Using Dilations and Transformations", ccss: "8.G.A.4", duration: "25 mins" },
          { id: "8-g-5", title: "Angle Sum and Exterior Angle of Triangles (Parallel Lines Cut by Transversal)", ccss: "8.G.A.5", duration: "25 mins" },
          { id: "8-g-6", title: "Explain Proof of Pythagorean Theorem", ccss: "8.G.B.6", duration: "22 mins" },
          { id: "pythagorean-theorem", title: "Pythagorean Theorem: Proof and Practice", ccss: "8.G.B.7", duration: "25 mins" },
          { id: "8-g-8", title: "Find Distance Between Two Points on Grid", ccss: "8.G.B.8", duration: "25 mins" },
          { id: "8-g-9", title: "Volume Formulas for Cones, Cylinders, and Spheres", ccss: "8.G.C.9", duration: "25 mins" }
        ]
      },
      {
        id: "8-sp",
        title: "Statistics & Probability",
        lessons: [
          { id: "8-sp-1", title: "Construct Scatter Plots to Inspect Patterns", ccss: "8.SP.A.1", duration: "18 mins" },
          { id: "8-sp-2", title: "Informally Fit a Straight Line for Scatter Plots", ccss: "8.SP.A.2", duration: "18 mins" },
          { id: "8-sp-3", title: "Use Linear Equation Models to Solve Problems", ccss: "8.SP.A.3", duration: "20 mins" },
          { id: "8-sp-4", title: "Construct and Interpret Two-Way Tables", ccss: "8.SP.A.4", duration: "22 mins" }
        ]
      }
    ]
  },
  {
    id: "hs-alg",
    title: "High School: Algebra",
    subtitle: "Algebra 1 & 2 Foundations",
    description: "Seeing structure in expressions, arithmetic with polynomials, creating equations, and reasoning with equations/inequalities.",
    topics: [
      {
        id: "hsa-sse",
        title: "Seeing Structure in Expressions",
        lessons: [
          {
            id: "hsa-sse-1-parent",
            title: "Interpret expressions that represent a quantity in terms of its context",
            ccss: "HSA-SSE.A.1",
            subLessons: [
              { id: "hsa-sse-1a", title: "Interpret parts of an expression, such as terms, factors, and coefficients", ccss: "HSA-SSE.A.1.a", duration: "25 mins", hasContent: true },
              { id: "hsa-sse-1b", title: "Interpret complicated expressions by viewing one or more of their parts as a single entity", ccss: "HSA-SSE.A.1.b", duration: "25 mins", hasContent: true }
            ]
          },
          { id: "hsa-sse-2", title: "Use structure to rewrite expressions (Difference of Squares, Perfect Squares)", ccss: "HSA-SSE.A.2", duration: "40 mins", hasContent: true },
          {
            id: "hsa-sse-3-parent",
            title: "Choose and produce an equivalent form of an expression to reveal properties",
            ccss: "HSA-SSE.B.3",
            subLessons: [
              { id: "hsa-sse-3a", title: "Factor a quadratic expression to reveal the zeros of the function", ccss: "HSA-SSE.B.3.a", duration: "40 mins", hasContent: true },
              { id: "hsa-sse-3b", title: "Complete the square to reveal maximum or minimum values", ccss: "HSA-SSE.B.3.b", duration: "35 mins", hasContent: true },
              { id: "hsa-sse-3c", title: "Use properties of exponents to transform expressions for exponential functions", ccss: "HSA-SSE.B.3.c", duration: "30 mins", hasContent: true }
            ]
          },
          { id: "hsa-sse-4", title: "Derive the formula for the sum of a finite geometric series", ccss: "HSA-SSE.B.4", duration: "45 mins", hasContent: true }
        ]
      },
      {
        id: "hsa-apr",
        title: "Arithmetic with Polynomials & Rational Expressions",
        lessons: [
          { id: "hsa-apr-1", title: "Operations on Polynomials (Add, Subtract, Multiply)", ccss: "HSA-APR.A.1", duration: "30 mins" },
          { id: "hsa-apr-2", title: "Remainder Theorem & Polynomial Factors", ccss: "HSA-APR.B.2", duration: "35 mins" },
          { id: "hsa-apr-3", title: "Finding Zeros of Polynomial Functions to Graph", ccss: "HSA-APR.B.3", duration: "35 mins" },
          { id: "hsa-apr-4", title: "Prove Polynomial Identities & Algebraic Proofs", ccss: "HSA-APR.C.4", duration: "40 mins" },
          { id: "hsa-apr-6", title: "Rewriting Rational Expressions (Polynomial Long Division)", ccss: "HSA-APR.D.6", duration: "40 mins" }
        ]
      },
      {
        id: "hsa-ced",
        title: "Creating Equations",
        lessons: [
          { id: "hsa-ced-1", title: "Create One-Variable Equations and Inequalities from Word Problems", ccss: "HSA-CED.A.1", duration: "30 mins" },
          { id: "hsa-ced-2", title: "Create Two-Variable Equations & Graphing Coordinate Axes", ccss: "HSA-CED.A.2", duration: "35 mins" },
          { id: "hsa-ced-3", title: "Represent Constraints by Equations, Inequalities, or Systems", ccss: "HSA-CED.A.3", duration: "35 mins" },
          { id: "hsa-ced-4", title: "Rearranging Formulas to Highlight a Variable (Literal Equations)", ccss: "HSA-CED.A.4", duration: "30 mins" }
        ]
      },
      {
        id: "hsa-rei",
        title: "Reasoning with Equations & Inequalities",
        lessons: [
          { id: "hsa-rei-1", title: "Explain Each Step in Solving Equations (Logical Flow)", ccss: "HSA-REI.A.1", duration: "30 mins" },
          { id: "hsa-rei-2", title: "Solve Rational and Radical Equations in One Variable", ccss: "HSA-REI.A.2", duration: "35 mins" },
          { id: "hsa-rei-3", title: "Solve Linear Equations and Inequalities in One Variable", ccss: "HSA-REI.B.3", duration: "30 mins", hasContent: true },
          {
            id: "hsa-rei-4-parent",
            title: "Solve quadratic equations in one variable",
            ccss: "HSA-REI.B.4",
            subLessons: [
              { id: "hsa-rei-4a", title: "Solve quadratics by completing the square", ccss: "HSA-REI.B.4.a", duration: "35 mins" },
              { id: "hsa-rei-4b", title: "Solve quadratics via quadratic formula & factoring", ccss: "HSA-REI.B.4.b", duration: "40 mins" }
            ]
          },
          { id: "hsa-rei-5", title: "System Elimination Proof (Adding Multiples)", ccss: "HSA-REI.C.5", duration: "35 mins" },
          { id: "hsa-rei-6", title: "Systems of Equations: Substitution Method", ccss: "HSA-REI.C.6", duration: "35 mins", hasContent: true },
          { id: "hsa-rei-7", title: "Solve Linear-Quadratic Systems of Equations", ccss: "HSA-REI.C.7", duration: "40 mins" },
          { id: "hsa-rei-8", title: "Representing Systems of Equations as Matrix Equations", ccss: "HSA-REI.C.8", duration: "40 mins" },
          { id: "hsa-rei-9", title: "Using Inverse Matrices to Solve Systems of Equations", ccss: "HSA-REI.C.9", duration: "45 mins" },
          { id: "hsa-rei-10", title: "Understand Graph of Equation as Solution Set", ccss: "HSA-REI.D.10", duration: "35 mins" },
          { id: "hsa-rei-11", title: "Solve Equations by Graph Intersection f(x) = g(x)", ccss: "HSA-REI.D.11", duration: "40 mins" },
          { id: "hsa-rei-12", title: "Graph Systems of Linear Inequalities in Two Variables", ccss: "HSA-REI.D.12", duration: "40 mins" }
        ]
      }
    ]
  },
  {
    id: "hs-geo",
    title: "High School: Geometry",
    subtitle: "Geometric Figures & Proofs",
    description: "Rigid motions, triangle congruence, similarity, right triangle trigonometry, coordinate equations, and measurement.",
    topics: [
      {
        id: "hsg-co",
        title: "Congruence",
        lessons: [
          { id: "hsg-co-1", title: "Know Precise Definitions of Angles, Circles, Lines", ccss: "HSG-CO.A.1", duration: "30 mins" },
          { id: "hsg-co-8", title: "Explain Criteria for Triangle Congruence (ASA, SAS, SSS)", ccss: "HSG-CO.B.8", duration: "30 mins" }
        ]
      },
      {
        id: "hsg-srt",
        title: "Similarity, Right Triangles, & Trigonometry",
        lessons: [
          { id: "hsg-srt-8", title: "Trig Ratios & Pythagorean Theorem in Right Triangles", ccss: "HSG-SRT.C.8", duration: "35 mins" }
        ]
      },
      {
        id: "hsg-c",
        title: "Circles",
        lessons: [
          { id: "hsg-c-2", title: "Identify Relationships of Inscribed Angles, Radii, Chords", ccss: "HSG-C.A.2", duration: "35 mins" }
        ]
      },
      {
        id: "hsg-gpe",
        title: "Expressing Geometric Properties with Equations",
        lessons: [
          { id: "hsg-gpe-5", title: "Prove Slope Criteria for Parallel and Perpendicular Lines", ccss: "HSG-GPE.B.5", duration: "40 mins" }
        ]
      },
      {
        id: "hsg-gmd",
        title: "Geometric Measurement & Dimension",
        lessons: [
          { id: "hsg-gmd-3", title: "Use Volume Formulas for Cylinders, Pyramids, Cones, Spheres", ccss: "HSG-GMD.A.3", duration: "35 mins" }
        ]
      }
    ]
  },
  {
    id: "hs-precalc",
    title: "Pre-Calculus",
    subtitle: "Advanced Functions",
    description: "Unit circle trig functions, vectors, matrices, polar equations, and complex numbers.",
    topics: [
      {
        id: "hsf-tf",
        title: "Trigonometric Functions",
        lessons: [
          { id: "hsf-tf-2", title: "Explain Unit Circle Extensions of Trig Functions", ccss: "HSF-TF.A.2", duration: "40 mins" },
          { id: "hsf-tf-8", title: "Prove and Apply Pythagorean Identities", ccss: "HSF-TF.C.8", duration: "45 mins" }
        ]
      },
      {
        id: "hsn-cn",
        title: "Complex Numbers & Polar Coordinates",
        lessons: [
          { id: "hsn-cn-4", title: "Rectangular and Polar Forms of Complex Numbers", ccss: "HSN-CN.B.4", duration: "40 mins" }
        ]
      },
      {
        id: "hsn-vm",
        title: "Vectors & Matrices",
        lessons: [
          { id: "hsn-vm-1", title: "Recognize Vector Quantities (Magnitude & Direction)", ccss: "HSN-VM.A.1", duration: "35 mins" }
        ]
      }
    ]
  },
  {
    id: "hs-stats",
    title: "Statistics",
    subtitle: "Statistics & Probability",
    description: "Normal distributions, randomized experiments, conditional probability, and using probability to make decisions.",
    topics: [
      {
        id: "hss-id",
        title: "Interpreting Categorical & Quantitative Data",
        lessons: [
          { id: "hss-id-4", title: "Fit Data Sets to Normal Distributions (Mean, Standard Deviation)", ccss: "HSS-ID.A.4", duration: "35 mins" }
        ]
      },
      {
        id: "hss-ic",
        title: "Making Inferences & Justifying Conclusions",
        lessons: [
          { id: "hss-ic-5", title: "Use Data from Randomized Experiments to Compare Treatments", ccss: "HSS-IC.B.5", duration: "40 mins" }
        ]
      },
      {
        id: "hss-cp",
        title: "Conditional Probability & Probability Rules",
        lessons: [
          { id: "hss-cp-6", title: "Find Conditional Probabilities and Evaluate Independence", ccss: "HSS-CP.B.6", duration: "35 mins" }
        ]
      }
    ]
  },
  {
    id: "college-calc",
    title: "Calculus",
    subtitle: "Calculus I & II",
    description: "Limits, derivative rules, optimization, u-substitution, and integration by parts.",
    topics: [
      {
        id: "calc-1",
        title: "Calculus I (Limits & Derivatives)",
        lessons: [
          { id: "calc-limits", title: "Limits: The Conceptual Definition", ccss: "Calc-Limits", duration: "40 mins" },
          { id: "calc-derivative-rules", title: "Derivatives: Power, Product, and Quotient Rules", ccss: "Calc-Deriv", duration: "35 mins" },
          { id: "calc-chain-rule", title: "The Chain Rule Step-by-Step", ccss: "Calc-Chain", duration: "40 mins" },
          { id: "calc-optimization", title: "Solving Optimization Problems", ccss: "Calc-Opt", duration: "45 mins" }
        ]
      },
      {
        id: "calc-2",
        title: "Calculus II (Integration)",
        lessons: [
          { id: "calc-integration-sub", title: "Integration by u-Substitution", ccss: "Calc-IntSub", duration: "40 mins" },
          { id: "calc-integration-parts", title: "Integration by Parts: LIATE Rule", ccss: "Calc-IntParts", duration: "45 mins" }
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
  "hsa-rei-3": {
    id: "hsa-rei-3",
    title: "Solving Multi-Step Linear Equations",
    subtitle: "Algebra 1 Foundations",
    duration: "30 mins",
    level: "High School Math",
    topic: "Algebra 1",
    ccss: "HSA-REI.B.3",
    prerequisites: [
      { id: "like-terms", title: "Combining Like Terms (6.EE.A.3)" },
      { id: "one-step-equations", title: "Solving One-Step Equations (6.EE.B.7)" },
      { id: "two-step-equations", title: "Solving Two-Step Equations (7.EE.B.4)" }
    ],
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
    animationSteps: [
      {
        equation: "3(x + 2) - 5 = 13",
        desc: "Original Equation: Find x. We must perform inverse operations on both sides to keep the scale balanced.",
        left: { type: "expression", action: null, terms: [{ val: "3(x + 2) - 5", color: "slate" }] },
        right: { type: "expression", action: null, terms: [{ val: "13", color: "slate" }] }
      },
      {
        equation: "3(x + 2) - 5 = 13",
        desc: "Teacher Draw - Distribute: Draw distribution arcs to multiply the 3 outside by both terms inside the parenthesis.",
        left: { type: "expression", action: "distribute", terms: [{ val: "3(x + 2) - 5", color: "slate" }] },
        right: { type: "expression", action: null, terms: [{ val: "13", color: "slate" }] }
      },
      {
        equation: "3x + 6 - 5 = 13",
        desc: "Simplify Distribution: Clear the parenthesis by multiplying: 3 * x = 3x and 3 * 2 = 6.",
        left: {
          type: "expression",
          action: null,
          terms: [
            { val: "3x", color: "blue", active: true },
            { val: " + 6", color: "orange", active: true },
            { val: " - 5", color: "slate" }
          ]
        },
        right: { type: "expression", action: null, terms: [{ val: "13", color: "slate" }] }
      },
      {
        equation: "3x + 6 - 5 = 13",
        desc: "Teacher Draw - Combine Constants: Draw a loop under the constant numbers +6 and -5 to group them.",
        left: {
          type: "expression",
          action: "combine",
          terms: [
            { val: "3x", color: "slate" },
            { val: " + 6", color: "orange" },
            { val: " - 5", color: "orange" }
          ]
        },
        right: { type: "expression", action: null, terms: [{ val: "13", color: "slate" }] }
      },
      {
        equation: "3x + 1 = 13",
        desc: "Simplify Constants: Combine +6 and -5 to get +1. The left side is now 3x + 1.",
        left: {
          type: "expression",
          action: null,
          terms: [
            { val: "3x", color: "slate" },
            { val: " + 1", color: "orange", active: true }
          ]
        },
        right: { type: "expression", action: null, terms: [{ val: "13", color: "slate" }] }
      },
      {
        equation: "3x + 1 - 1 = 13 - 1",
        desc: "Balance Operation - Subtract: To isolate the 3x term, undo the +1 constant. Write '- 1' in red on BOTH sides of the scale.",
        left: {
          type: "operation",
          operationType: "subtract",
          action: null,
          terms: [{ val: "3x", color: "slate" }, { val: " + 1", color: "slate" }],
          opVal: "- 1"
        },
        right: {
          type: "operation",
          operationType: "subtract",
          action: null,
          terms: [{ val: "13", color: "slate" }],
          opVal: "- 1"
        }
      },
      {
        equation: "3x + 1 - 1 = 13 - 1",
        desc: "Teacher Draw - Cancel: Draw diagonal red slashes through +1 and -1 to show they subtract to 0.",
        left: {
          type: "operation",
          operationType: "subtract",
          action: "cancel",
          terms: [{ val: "3x", color: "slate" }, { val: " + 1", color: "slate" }],
          opVal: "- 1"
        },
        right: {
          type: "operation",
          operationType: "subtract",
          action: null,
          terms: [{ val: "13", color: "slate" }],
          opVal: "- 1"
        }
      },
      {
        equation: "3x = 12",
        desc: "Simplify Subtraction: Performing the subtraction leaves 3x on the left and 12 (13 - 1) on the right.",
        left: { type: "expression", action: null, terms: [{ val: "3x", color: "blue", active: true }] },
        right: { type: "expression", action: null, terms: [{ val: "12", color: "orange", active: true }] }
      },
      {
        equation: "3x / 3 = 12 / 3",
        desc: "Balance Operation - Divide: To isolate x, undo the multiplication of 3. Write fraction bars and divide BOTH sides by 3.",
        left: {
          type: "operation",
          operationType: "divide",
          action: null,
          terms: [{ val: "3x", color: "blue" }],
          opVal: "3"
        },
        right: {
          type: "operation",
          operationType: "divide",
          action: null,
          terms: [{ val: "12", color: "slate" }],
          opVal: "3"
        }
      },
      {
        equation: "3x / 3 = 12 / 3",
        desc: "Teacher Draw - Cancel Coefficient: Draw slashes through the numerator 3 and denominator 3 to cancel to 1.",
        left: {
          type: "operation",
          operationType: "divide",
          action: "cancel-division",
          terms: [{ val: "3x", color: "blue" }],
          opVal: "3"
        },
        right: {
          type: "operation",
          operationType: "divide",
          action: null,
          terms: [{ val: "12", color: "slate" }],
          opVal: "3"
        }
      },
      {
        equation: "x = 4",
        desc: "Final Answer: The left side becomes x. On the right, 12 / 3 simplifies to 4. The scale is balanced at x = 4!",
        left: { type: "expression", action: null, terms: [{ val: "x", color: "blue", active: true }] },
        right: { type: "expression", action: null, terms: [{ val: "4", color: "green", active: true }] }
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
      },
      {
        question: "Solve for x:  3(x + 4) = 2x + 15",
        options: [
          "x = 3",
          "x = 9",
          "x = -3",
          "x = 2"
        ],
        correctIndex: 0, // x = 3
        explanation: "1) Distribute the 3: 3x + 12 = 2x + 15. \n2) Subtract 2x from both sides: x + 12 = 15. \n3) Subtract 12 from both sides: x = 3."
      },
      {
        question: "Solve for x:  -2x + 8 = 16",
        options: [
          "x = 4",
          "x = -4",
          "x = -12",
          "x = 12"
        ],
        correctIndex: 1, // x = -4
        explanation: "1) Subtract 8 from both sides: -2x = 8. \n2) Divide both sides by -2: x = 8 / -2 = -4."
      }
    ]
  },
  "hsa-sse-1a": {
    id: "hsa-sse-1a",
    title: "Interpret Parts of an Expression",
    subtitle: "Algebra 1 Expressions",
    duration: "25 mins",
    level: "High School Math",
    topic: "Algebra 1",
    ccss: "HSA-SSE.A.1",
    prerequisites: [
      { id: "like-terms", title: "Combining Like Terms (6.EE.A.3)" },
      { id: "order-operations", title: "Order of Operations (5.OA.A.1)" }
    ],
    introduction: "Algebraic expressions contain variables, coefficients, operators, and constants. Interpreting these parts allows us to understand the underlying structure of equations, formulas, and real-world math applications.",
    steps: [
      {
        title: "Terms",
        content: "Terms are parts of an expression separated by addition (+) or subtraction (-) operators.\n\n<u><strong>Example 1</strong></u>:<br />In the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">4x + 7</div>\nthe terms are <strong>4x</strong> and <strong>7</strong>.\n\n<u><strong>Example 2</strong></u>:<br />In the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">3x² - 5x + 12</div>\nthe terms are <strong>3x²</strong>, <strong>-5x</strong>, and <strong>12</strong>.\n\n<u><strong>Example 3</strong></u>:<br />In the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">8(x + 1)</div>\nthe entire expression is a single term until expanded."
      },
      {
        title: "Coefficients",
        content: "A coefficient is the number in front of something being multiplied (most often a variable, but it can also be in front of parentheses). It acts as a scaling factor.\n\n<u><strong>Example 1</strong></u>:<br />In the term:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">7x</div>\nthe coefficient is <strong>7</strong> (in front of the variable x).\n\n<u><strong>Example 2</strong></u>:<br />In the term:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">-x</div>\nthe coefficient is <strong>-1</strong> (the negative sign in front implies a factor of -1).\n\n<u><strong>Example 3</strong></u>:<br />In the term:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">4(y - 2)²</div>\nthe coefficient is <strong>4</strong> (in front of the expression in parentheses)."
      },
      {
        title: "Variables",
        content: "A variable is a symbol (usually a letter) representing an unknown value that can change.\n\n<u><strong>Example 1</strong></u>:<br />In the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">3x + 2</div>\nthe variable is <strong>x</strong>.\n\n<u><strong>Example 2</strong></u>:<br />In the formula:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">A = πr²</div>\nthe variables are <strong>A</strong> and <strong>r</strong> (note: π is a constant, not a variable!).\n\n<u><strong>Example 3</strong></u>:<br />In the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">2a - 5b</div>\nthe variables are <strong>a</strong> and <strong>b</strong>."
      },
      {
        title: "Constants",
        content: "A constant term is a number with a fixed value that does not contain any variables.\n\n<u><strong>Example 1</strong></u>:<br />In the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">2x + 9</div>\nthe constant is <strong>9</strong>.\n\n<u><strong>Example 2</strong></u>:<br />In the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">x² - 15</div>\nthe constant is <strong>-15</strong>.\n\n<u><strong>Example 3</strong></u>:<br />In the formula:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">P(1 + r)ᵗ</div>\nif initial principal P and annual rate r are fixed numbers, they are constants."
      },
      {
        title: "Factors",
        content: "Factors are quantities multiplied together to form a product.\n\n<u><strong>Example 1</strong></u>:<br />In the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">3x</div>\nthe factors are <strong>3</strong> and <strong>x</strong>.\n\n<u><strong>Example 2</strong></u>:<br />In the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">5(x - 3)</div>\nthe factors are <strong>5</strong> and <strong>(x - 3)</strong>.\n\n<u><strong>Example 3</strong></u>:<br />In the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">(x + 2)(x + 4)</div>\nthe factors are <strong>(x + 2)</strong> and <strong>(x + 4)</strong>."
      }
    ],
    mathBox: {
      title: "Parts of an Expression Guide",
      equations: [
        { desc: "General Expression", formula: "ax + b" },
        { desc: "ax term components", formula: "a = Coefficient,  x = Variable" },
        { desc: "b term component", formula: "b = Constant Term" }
      ]
    },
    animationSteps: [
      {
        equation: "3(x + 4) + 7",
        desc: "Original Expression: We will analyze the terms, factors, coefficients, and constants in this algebraic expression.",
        left: { type: "expression", action: null, terms: [{ val: "3(x + 4) + 7", color: "slate" }] },
        right: { type: "expression", action: null, terms: [{ val: "Expression", color: "green" }] }
      },
      {
        equation: "3(x + 4) + 7",
        desc: "Identify Terms: Terms are separated by plus/minus signs. Here, 3(x + 4) and 7 are the two terms.",
        left: { type: "expression", action: null, terms: [{ val: "3(x + 4)", color: "blue", active: true }, { val: " and ", color: "slate" }, { val: "7", color: "blue", active: true }] },
        right: { type: "expression", action: null, terms: [{ val: "2 Terms", color: "green" }] }
      },
      {
        equation: "3(x + 4) + 7",
        desc: "Identify Coefficients and Factors: 3 is the coefficient of the quantity (x + 4), and (x + 4) is a binomial factor.",
        left: { type: "expression", action: null, terms: [{ val: "3", color: "red", active: true }, { val: " is coefficient, ", color: "slate" }, { val: "(x + 4)", color: "purple", active: true }, { val: " is factor", color: "slate" }] },
        right: { type: "expression", action: null, terms: [{ val: "Factors", color: "green" }] }
      },
      {
        equation: "3(x + 4) + 7",
        desc: "Identify Constants: 7 is a constant term because it has a fixed value and does not contain a variable.",
        left: { type: "expression", action: null, terms: [{ val: "7", color: "green", active: true }, { val: " is the Constant", color: "slate" }] },
        right: { type: "expression", action: null, terms: [{ val: "Constant", color: "green" }] }
      }
    ],
    practiceQuestions: [
      {
        question: "In the expression 5x - 3, what is the coefficient?",
        options: ["5", "x", "-3", "5x"],
        correctIndex: 0,
        explanation: "The coefficient is the numerical factor multiplied by the variable. Here, 5 is multiplied by x."
      },
      {
        question: "Which of the following is a constant term in 2(x + 4) + 9?",
        options: ["2", "x", "4", "9"],
        correctIndex: 3,
        explanation: "The constant term is 9 because it is a fixed number and not associated with a variable."
      },
      {
        question: "In the expression P(1 + r)ᵗ, what does (1 + r) represent?",
        options: ["A single constant", "A binomial factor", "A coefficient", "An exponent"],
        correctIndex: 1,
        explanation: "The quantity (1 + r) is a factor consisting of two terms, making it a binomial factor in the expression."
      },
      {
        question: "How many terms are in the expression 3x² - 5x + 12?",
        options: ["1", "2", "3", "4"],
        correctIndex: 2,
        explanation: "There are three terms separated by operators: 3x², -5x, and 12."
      }
    ]
  },
  "hsa-sse-1b": {
    id: "hsa-sse-1b",
    title: "Interpret Complicated Expressions as Single Entities",
    subtitle: "Algebra 1 Expressions",
    duration: "25 mins",
    level: "High School Math",
    topic: "Algebra 1",
    ccss: "HSA-SSE.A.1.b",
    prerequisites: [
      { id: "hsa-sse-1a", title: "Interpret Parts of an Expression (HSA-SSE.A.1.a)" }
    ],
    introduction: "In algebra, we can often simplify our understanding of a complicated expression by viewing one or more of its parts as a single variable or 'entity'. For example, in the expression P(1 + r)ᵗ, we can treat (1 + r) as a single scale factor that determines growth.",
    steps: [
      {
        title: "Step 1: Identify Nested Groupings",
        content: "Locate parentheses containing operations that act as a single term. Groupings can appear once or multiple times in the same expression.\n\n<u><strong>Example 1 (Single Instance)</strong></u>:<br />In the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">5(x + 3)² - 4</div>\nthe nested grouping is <strong>(x + 3)</strong>, which is squared and scaled by 5.\n\n<u><strong>Example 2 (Multiple Instances)</strong></u>:<br />In the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">3(2x - 5)² - 8(2x - 5) + 1</div>\nthe repeated nested grouping is <strong>(2x - 5)</strong>, which appears in two separate terms."
      },
      {
        title: "Step 2: Substitute with a Single Variable",
        content: "Temporarily replace the compound grouping with a single variable (like 'u') to simplify the expression's overall structure.\n\n<u><strong>Example 1 (Single Instance)</strong></u>:<br />Substituting <strong>u = (x + 3)</strong>, the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">5(x + 3)² - 4</div>\nbecomes the much simpler quadratic form:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">5u² - 4</div>\n\n<u><strong>Example 2 (Multiple Instances)</strong></u>:<br />When a compound part appears multiple times, substitute it in every position. If we let <strong>u = (2x - 5)</strong>, the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">3(2x - 5)² - 8(2x - 5) + 1</div>\nreplaces both instances to reveal the standard quadratic trinomial:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">3u² - 8u + 1</div>"
      },
      {
        title: "Step 3: Analyze the Overall Structure",
        content: "Analyze the simplified structure to interpret real-world formulas and growth rates.\n\n<u><strong>Example</strong></u>:<br />In the exponential growth formula:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">P(1 + r)ᵗ</div>\nwe can substitute <strong>u = (1 + r)</strong> to reveal a simple exponential form:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">P · uᵗ</div>\nwhere <strong>u</strong> acts as the single compounding growth factor."
      }
    ],
    mathBox: {
      title: "Group Substitution Guide",
      equations: [
        { desc: "Original Compound Expression", formula: "P(1 + r)ᵗ" },
        { desc: "Let u represent the compound entity", formula: "u = (1 + r)" },
        { desc: "Simplified Exponential Form", formula: "P · uᵗ" }
      ]
    },
    animationSteps: [
      {
        equation: "P(1 + r)ᵗ",
        desc: "Compound Form: This represents compound interest where r is the interest rate, but (1 + r) is a single multiplier.",
        left: { type: "expression", action: null, terms: [{ val: "P", color: "slate" }, { val: "(1 + r)", color: "blue", active: true }, { val: "ᵗ", color: "slate" }] },
        right: { type: "expression", action: null, terms: [{ val: "Compound rate group", color: "blue" }] }
      },
      {
        equation: "Let u = 1 + r",
        desc: "Substitution Step: We define a new variable u to represent the entire term (1 + r).",
        left: { type: "expression", action: null, terms: [{ val: "u", color: "green" }] },
        right: { type: "expression", action: null, terms: [{ val: "1 + r", color: "blue" }] }
      },
      {
        equation: "P · uᵗ",
        desc: "Simplified Form: Replacing the group with u reveals a standard exponential growth function, making it easier to analyze.",
        left: { type: "expression", action: null, terms: [{ val: "P", color: "slate" }, { val: "u", color: "green", active: true }, { val: "ᵗ", color: "slate" }] },
        right: { type: "expression", action: null, terms: [{ val: "Standard Exponential", color: "green" }] }
      }
    ],
    practiceQuestions: [
      {
        question: "In the expression 4(x + y)² - 3(x + y) + 2, if we substitute u = x + y, what is the resulting structure?",
        options: ["4u² - 3u + 2", "4u - 3u + 2", "u² - u + 2", "4u² + 2"],
        correctIndex: 0,
        explanation: "Replacing every occurrence of (x + y) with u gives 4u² - 3u + 2."
      },
      {
        question: "For the formula A = P(1 + r)ⁿ, treating (1 + r) as a single entity helps us see it as:",
        options: ["A linear growth factor", "A constant exponent", "A single compounding base", "A variable coefficient"],
        correctIndex: 2,
        explanation: "Treating (1 + r) as a single base u simplifies it to A = P(u)ⁿ, which is a standard exponential base."
      },
      {
        question: "In the expression 3(2x + 1)³ - 7, what is the best choice of entity to simplify the expression?",
        options: ["3", "2x", "2x + 1", "7"],
        correctIndex: 2,
        explanation: "The quantity inside parentheses, 2x + 1, is the best entity to substitute to get the simple cubic form 3u³ - 7."
      }
    ]
  },
  "hsa-sse-2": {
    id: "hsa-sse-2",
    title: "Use Structure to Rewrite Expressions",
    subtitle: "Algebra 1 Expressions",
    duration: "40 mins",
    level: "High School Math",
    topic: "Algebra 1",
    ccss: "HSA-SSE.A.2",
    prerequisites: [
      { id: "hsa-sse-1a", title: "Interpret Parts of an Expression (HSA-SSE.A.1.a)" }
    ],
    introduction: "Algebraic expressions often contain hidden patterns. By recognizing structural patterns like the difference of squares or perfect squares, we can rewrite expressions into useful factored forms.",
    pages: [
      {
        title: "Factoring Perfect Squares",
        introduction: "A perfect square trinomial is an algebraic expression that is the result of squaring a binomial, matching either:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">a² + 2ab + b² = (a + b)²</div>\nor:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">a² - 2ab + b² = (a - b)²</div>",
        steps: [
          {
            title: "Identify Perfect Square Terms",
            content: "Check if the first term and the last term of the trinomial are perfect squares.\n\n<u><strong>Example</strong></u>:<br />For the trinomial:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">x² + 6x + 9</div>\nthe first term is <span style=\"color: var(--primary); font-weight: bold;\">x² = (x)²</span> and the last term is <span style=\"color: var(--primary); font-weight: bold;\">9 = (3)²</span>, giving us <span style=\"color: var(--primary); font-weight: bold;\">a = x</span> and <span style=\"color: var(--primary); font-weight: bold;\">b = 3</span>."
          },
          {
            title: "Check the Middle Term",
            content: "The middle term must be exactly twice the product of the square roots (<span style=\"color: var(--primary); font-weight: bold;\">2ab</span>).\n\n<u><strong>Example</strong></u>:<br />Verify that:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">2 · (x) · (3) = 6x</div>\nSince it matches, this is a perfect square trinomial."
          },
          {
            title: "Apply the Square Binomial Rule",
            content: "Write the factored form as <span style=\"color: var(--primary); font-weight: bold;\">(a + b)²</span> (or <span style=\"color: var(--primary); font-weight: bold;\">(a - b)²</span> if the middle term is negative).\n\n<u><strong>Example</strong></u>:<br />Substituting <span style=\"color: var(--primary); font-weight: bold;\">a = x</span> and <span style=\"color: var(--primary); font-weight: bold;\">b = 3</span> yields:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">(x + 3)²</div>"
          }
        ],
        practiceQuestions: [
          {
            question: "Factor the perfect square trinomial: x² - 10x + 25",
            options: ["(x - 5)²", "(x + 5)²", "(x - 5)(x + 5)", "(x - 10)²"],
            correctIndex: 0,
            explanation: "Identifying a = x and b = 5. Since the middle coefficient (-10) is negative, we apply the subtraction form (a - b)², resulting in (x - 5)²."
          },
          {
            question: "Factor the perfect square trinomial: x² + 14x + 49",
            options: ["(x + 7)²", "(x - 7)²", "(x + 14)²", "(x + 7)(x - 7)"],
            correctIndex: 0,
            explanation: "The first term is x² = (x)², the last term is 49 = (7)², and the middle term is 2(x)(7) = 14x. Since the middle term is positive, this factors to (x + 7)²."
          },
          {
            question: "Factor the perfect square trinomial: 4x² - 12x + 9",
            options: ["(2x - 3)²", "(2x + 3)²", "(2x - 3)(2x + 3)", "(4x - 3)²"],
            correctIndex: 0,
            explanation: "The first term is 4x² = (2x)², the last term is 9 = (3)², and the middle term is -2(2x)(3) = -12x. Therefore, the factored form is (2x - 3)²."
          }
        ]
      },
      {
        title: "Difference of Squares",
        introduction: "A difference of squares is a binomial of the form:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">a² - b²</div>\nwhich factors cleanly into:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">(a - b)(a + b)</div>",
        steps: [
          {
            title: "Recognize Perfect Square Bases",
            content: "Ensure the two terms are perfect squares and are separated by a subtraction sign.\n\n<u><strong>Example</strong></u>:<br />For the binomial:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">x² - 16</div>\nthe bases are <span style=\"color: var(--primary); font-weight: bold;\">x</span> and <span style=\"color: var(--primary); font-weight: bold;\">4</span>, meaning <span style=\"color: var(--primary); font-weight: bold;\">a = x</span> and <span style=\"color: var(--primary); font-weight: bold;\">b = 4</span>."
          },
          {
            title: "Apply the Factoring Template",
            content: "Plug the bases into <span style=\"color: var(--primary); font-weight: bold;\">(a - b)(a + b)</span>.\n\n<u><strong>Example</strong></u>:<br />Factoring <span style=\"color: var(--primary); font-weight: bold;\">x² - 16</span> gives:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">(x - 4)(x + 4)</div>"
          }
        ],
        practiceQuestions: [
          {
            question: "Factor completely: 4x² - 49",
            options: ["(2x - 7)²", "(2x - 7)(2x + 7)", "(4x - 7)(4x + 7)", "(2x + 7)²"],
            correctIndex: 1,
            explanation: "4x² is (2x)² and 49 is 7². This fits the a² - b² pattern, factoring into (2x - 7)(2x + 7)."
          },
          {
            question: "Factor completely using difference of squares: 25x² - 64",
            options: ["(5x - 8)(5x + 8)", "(5x - 8)²", "(5x + 8)²", "(25x - 8)(x + 8)"],
            correctIndex: 0,
            explanation: "25x² is (5x)² and 64 is 8². This fits the difference of squares template a² - b², resulting in (5x - 8)(5x + 8)."
          },
          {
            question: "Factor completely: x⁴ - 81",
            options: ["(x² - 9)(x² + 9)", "(x - 3)(x + 3)(x² + 9)", "(x - 3)²(x² + 9)", "(x - 9)(x + 9)"],
            correctIndex: 1,
            explanation: "x⁴ - 81 factors to (x² - 9)(x² + 9). The first term (x² - 9) is also a difference of squares and factors further into (x - 3)(x + 3), yielding (x - 3)(x + 3)(x² + 9)."
          }
        ]
      }
    ],
    mathBox: {
      title: "Structural Identities",
      equations: [
        { desc: "Difference of Squares", formula: "a² - b² = (a - b)(a + b)" },
        { desc: "Perfect Square (Sum)", formula: "a² + 2ab + b² = (a + b)²" },
        { desc: "Perfect Square (Diff)", formula: "a² - 2ab + b² = (a - b)²" }
      ]
    }
  },
  "hsa-sse-3a": {
    id: "hsa-sse-3a",
    title: "Factor Quadratics to Reveal Zeros",
    subtitle: "Algebra 1 Quadratics",
    duration: "40 mins",
    level: "High School Math",
    topic: "Algebra 1",
    ccss: "HSA-SSE.B.3.a",
    prerequisites: [
      { id: "distributive-property", title: "Distributive Property (7.EE.A.1)" },
      { id: "greatest-common-factor", title: "Greatest Common Factor (6.NS.B.4)" }
    ],
    introduction: "Factoring is the process of breaking an expression down into a product of simpler expressions. To factor trinomials, we look for two numbers that multiply to c and add to b, or group terms to reveal common binomial factors.",
    pages: [
      {
        title: "Factoring Trinomials (a = 1)",
        introduction: "For trinomials in the form <span style=\"color: var(--primary); font-weight: bold;\">x² + bx + c</span>, we look for two numbers that multiply to <span style=\"color: var(--primary); font-weight: bold;\">c</span> and add to <span style=\"color: var(--primary); font-weight: bold;\">b</span>.",
        steps: [
          {
            title: "List Factor Pairs",
            content: "Identify factor pairs of the constant term <span style=\"color: var(--primary); font-weight: bold;\">c</span> and find the pair that sums to <span style=\"color: var(--primary); font-weight: bold;\">b</span>.\n\n<u><strong>Example</strong></u>:<br />For the trinomial:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">x² + 5x + 6</div>\nwe need numbers that multiply to <span style=\"color: var(--primary); font-weight: bold;\">6</span> and add to <span style=\"color: var(--primary); font-weight: bold;\">5</span>. The pair is <span style=\"color: var(--primary); font-weight: bold;\">2</span> and <span style=\"color: var(--primary); font-weight: bold;\">3</span>."
          },
          {
            title: "Write Binomial Factors",
            content: "Write the factors as <span style=\"color: var(--primary); font-weight: bold;\">(x + p)(x + q)</span> where <span style=\"color: var(--primary); font-weight: bold;\">p</span> and <span style=\"color: var(--primary); font-weight: bold;\">q</span> are the numbers found.\n\n<u><strong>Example</strong></u>:<br />Factoring yields:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">(x + 2)(x + 3)</div>"
          }
        ],
        practiceQuestions: [
          {
            question: "Factor the trinomial: x² - 5x - 14",
            options: ["(x - 7)(x + 2)", "(x - 7)(x - 2)", "(x + 7)(x - 2)", "(x - 14)(x + 1)"],
            correctIndex: 0,
            explanation: "We look for two numbers that multiply to -14 and add to -5. These numbers are -7 and 2. Therefore, the factored form is (x - 7)(x + 2)."
          },
          {
            question: "Factor the trinomial: x² + 3x - 10",
            options: ["(x + 5)(x - 2)", "(x - 5)(x + 2)", "(x + 10)(x - 1)", "(x - 10)(x + 1)"],
            correctIndex: 0,
            explanation: "We need two numbers that multiply to -10 and add to 3. These numbers are 5 and -2, giving (x + 5)(x - 2)."
          },
          {
            question: "Factor the trinomial: x² - 8x + 15",
            options: ["(x - 5)(x - 3)", "(x + 5)(x + 3)", "(x - 5)(x + 3)", "(x - 15)(x - 1)"],
            correctIndex: 0,
            explanation: "We need two numbers that multiply to 15 and add to -8. These numbers are -5 and -3, yielding (x - 5)(x - 3)."
          }
        ]
      },
      {
        title: "Factoring by Grouping (a ≠ 1)",
        introduction: "Factoring by grouping is used when there are four terms. We group them into two pairs, extract the GCF of each pair, then factor out the common binomial.",
        steps: [
          {
            title: "Group Terms and Extract GCF",
            content: "Split the polynomial into two groups and factor out the Greatest Common Factor of each.\n\n<u><strong>Example</strong></u>:<br />For the expression:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">2x² + 4x + 3x + 6</div>\nGroup into pairs and factor: <span style=\"color: var(--primary); font-weight: bold;\">2x(x + 2) + 3(x + 2)</span>."
          },
          {
            title: "Factor Out Common Binomial",
            content: "Recognize that <span style=\"color: var(--primary); font-weight: bold;\">(x + 2)</span> is common to both terms and factor it out.\n\n<u><strong>Example</strong></u>:<br />Combining the remaining GCFs gives:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">(2x + 3)(x + 2)</div>"
          }
        ],
        practiceQuestions: [
          {
            question: "Factor the expression: 3x² + 6x + 4x + 8",
            options: ["(3x + 4)(x + 2)", "(3x + 2)(x + 4)", "(3x + 8)(x + 1)", "(3x + 4)(x - 2)"],
            correctIndex: 0,
            explanation: "Group the first two and last two terms: 3x(x + 2) + 4(x + 2). Factoring out (x + 2) gives (3x + 4)(x + 2)."
          },
          {
            question: "Factor by grouping: x³ - 3x² + 2x - 6",
            options: ["(x² + 2)(x - 3)", "(x² - 2)(x + 3)", "(x² + 3)(x - 2)", "(x² - 3)(x + 2)"],
            correctIndex: 0,
            explanation: "Group terms: x²(x - 3) + 2(x - 3). Factoring out (x - 3) gives (x² + 2)(x - 3)."
          },
          {
            question: "Factor completely: 5x³ + 5x² - 3x - 3",
            options: ["(5x² - 3)(x + 1)", "(5x² + 3)(x - 1)", "(5x² - 1)(x + 3)", "(5x² - 3)(x - 1)"],
            correctIndex: 0,
            explanation: "Group terms: 5x²(x + 1) - 3(x + 1). Factoring out (x + 1) gives (5x² - 3)(x + 1)."
          }
        ]
      },
      {
        title: "Slip 'n Slide Method (a ≠ 1)",
        introduction: "The Slip 'n Slide method is an easy algorithmic shortcut for factoring quadratic trinomials <span style=\"color: var(--primary); font-weight: bold;\">ax² + bx + c</span> when <span style=\"color: var(--primary); font-weight: bold;\">a ≠ 1</span>.",
        steps: [
          {
            title: "Slip the Leading Coefficient",
            content: "Multiply the leading coefficient <span style=\"color: var(--primary); font-weight: bold;\">a</span> by the constant <span style=\"color: var(--primary); font-weight: bold;\">c</span>, and temporarily remove <span style=\"color: var(--primary); font-weight: bold;\">a</span> from the front.\n\n<u><strong>Example</strong></u>:<br />For the trinomial:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">2x² + 5x + 3</div>\n'Slip' 2 to the end to get:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">x² + 5x + 6</div>"
          },
          {
            title: "Factor and Slide Back",
            content: "Factor the new trinomial, then divide the constant numbers by the original coefficient <span style=\"color: var(--primary); font-weight: bold;\">a</span> (2).\n\n<u><strong>Example</strong></u>:<br />Factor <span style=\"color: var(--primary); font-weight: bold;\">x² + 5x + 6</span> into <span style=\"color: var(--primary); font-weight: bold;\">(x + 2)(x + 3)</span>. Then divide constants by 2:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">(x + 2/2)(x + 3/2)</div>"
          },
          {
            title: "Simplify Fractions",
            content: "Simplify any fractions. If a denominator remains, slide it in front of the <span style=\"color: var(--primary); font-weight: bold;\">x</span> variable.\n\n<u><strong>Example</strong></u>:<br /><span style=\"color: var(--primary); font-weight: bold;\">(x + 2/2)</span> becomes <span style=\"color: var(--primary); font-weight: bold;\">(x + 1)</span>. For <span style=\"color: var(--primary); font-weight: bold;\">(x + 3/2)</span>, slide the denominator 2 in front of <span style=\"color: var(--primary); font-weight: bold;\">x</span> to get <span style=\"color: var(--primary); font-weight: bold;\">(2x + 3)</span>. The final factors are:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">(x + 1)(2x + 3)</div>"
          }
        ],
        practiceQuestions: [
          {
            question: "Factor using Slip 'n Slide: 3x² + 7x + 2",
            options: ["(3x + 1)(x + 2)", "(3x + 2)(x + 1)", "(x + 1)(x + 6)", "(3x + 1)(x + 3)"],
            correctIndex: 0,
            explanation: "Slip 3: x² + 7x + 6. Factor: (x + 6)(x + 1). Slide 3 back: (x + 6/3)(x + 1/3) = (x + 2)(3x + 1), which is (3x + 1)(x + 2)."
          },
          {
            question: "Factor using Slip 'n Slide: 2x² + 7x + 5",
            options: ["(2x + 5)(x + 1)", "(2x + 1)(x + 5)", "(2x + 5)(2x + 1)", "(x + 5)(x + 1)"],
            correctIndex: 0,
            explanation: "Slip 2 to the end: x² + 7x + 10. Factor: (x + 5)(x + 2). Slide original coeff 2 back: (x + 5/2)(x + 2/2) = (2x + 5)(x + 1)."
          },
          {
            question: "Factor using Slip 'n Slide: 3x² - 5x - 2",
            options: ["(3x + 1)(x - 2)", "(3x - 1)(x + 2)", "(3x - 2)(x + 1)", "(3x + 2)(x - 1)"],
            correctIndex: 0,
            explanation: "Slip 3 to the end: x² - 5x - 6. Factor: (x - 6)(x + 1). Slide 3 back: (x - 6/3)(x + 1/3) = (x - 2)(3x + 1)."
          }
        ]
      }
    ],
    mathBox: {
      title: "Factoring Quadratics Guide",
      equations: [
        { desc: "General Form", formula: "x² + bx + c = (x + p)(x + q)" },
        { desc: "Slide Formula", formula: "ax² + bx + c → x² + bx + ac" },
        { desc: "Grouping GCF", formula: "xa + ya = a(x + y)" }
      ]
    }
  },
  "hsa-sse-3b": {
    id: "hsa-sse-3b",
    title: "Complete the Square to Find Extremes",
    subtitle: "Algebra 1 Quadratics",
    duration: "35 mins",
    level: "High School Math",
    topic: "Algebra 1",
    ccss: "HSA-SSE.B.3.b",
    prerequisites: [
      { id: "hsa-sse-3a", title: "Factor Quadratics to Reveal Zeros (HSA-SSE.B.3.a)" }
    ],
    introduction: "Completing the square is an algebraic technique used to rewrite a quadratic expression ax² + bx + c in the vertex form a(x - h)² + k. This form immediately reveals the vertex (h, k), which is the maximum or minimum point.",
    pages: [
      {
        title: "Completing the Square (a = 1)",
        introduction: "For quadratics where the leading coefficient is 1, we add and subtract the squared half of the middle linear coefficient to form a perfect square binomial.",
        steps: [
          {
            title: "Calculate (b / 2)²",
            content: "Take the coefficient of the middle linear term (b), divide it by 2, and square the result. For x² + 6x, b = 6, so (6 / 2)² = 9."
          },
          {
            title: "Add and Subtract this Constant",
            content: "Add and subtract this value inside the expression to keep it equivalent: x² + 6x + 9 - 9."
          },
          {
            title: "Write in Vertex Form",
            content: "Factor the perfect square trinomial (x² + bx + (b/2)²) into (x + b/2)² and combine remaining constants: (x + 3)² - 9."
          }
        ],
        practiceQuestions: [
          {
            question: "Complete the square for x² + 8x. What is the value that completes the square?",
            options: ["4", "8", "16", "64"],
            correctIndex: 2,
            explanation: "Take b = 8, divide by 2 to get 4, and square it: 4² = 16."
          },
          {
            question: "Rewrite x² - 10x + 30 in vertex form.",
            options: ["(x - 5)² + 5", "(x - 5)² - 25", "(x + 5)² + 5", "(x - 10)² + 30"],
            correctIndex: 0,
            explanation: "(b/2)² = (-10/2)² = 25. Add/subtract 25: x² - 10x + 25 - 25 + 30 = (x - 5)² + 5."
          },
          {
            question: "For the function f(x) = (x - 4)² + 7, what is the minimum value of f(x)?",
            options: ["4", "-4", "7", "-7"],
            correctIndex: 2,
            explanation: "The vertex form reveals the minimum value is the constant term outside, which is 7."
          }
        ]
      },
      {
        title: "Completing the Square (a ≠ 1)",
        introduction: "Completing the square allows us to rewrite any quadratic expression ax² + bx + c when a ≠ 1 into vertex form a(x - h)² + k.",
        steps: [
          {
            title: "Factor Out the Lead Coefficient",
            content: "Factor the coefficient <span style=\"color: var(--primary); font-weight: bold;\">a</span> out of the variable terms (<span style=\"color: var(--primary); font-weight: bold;\">x²</span> and <span style=\"color: var(--primary); font-weight: bold;\">x</span>) only.\n\n<u><strong>Example</strong></u>:<br />For the quadratic:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">2x² + 8x + 6</div>\nFactor out 2 from variable terms:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">2(x² + 4x) + 6</div>"
          },
          {
            title: "Add and Subtract the Constant",
            content: "Take half of the linear coefficient, square it, and both add and subtract it inside the parentheses.\n\n<u><strong>Example</strong></u>:<br />Half of 4 is 2; <span style=\"color: var(--primary); font-weight: bold;\">2² = 4</span>. Add and subtract 4 inside:\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">2(x² + 4x + 4 - 4) + 6</div>"
          },
          {
            title: "Write in Vertex Form",
            content: "Group the perfect square trinomial and move the subtracted constant out of the parentheses by multiplying it by <span style=\"color: var(--primary); font-weight: bold;\">a</span>.\n\n<u><strong>Example</strong></u>:<br /><span style=\"color: var(--primary); font-weight: bold;\">(x² + 4x + 4)</span> becomes <span style=\"color: var(--primary); font-weight: bold;\">(x + 2)²</span>. Move -4 out by multiplying by 2 (giving -8):\n<div style=\"text-align: center; margin: 0.6rem 0; font-size: 1.25rem; font-weight: bold; color: var(--primary);\">2(x + 2)² - 8 + 6 = 2(x + 2)² - 2</div>"
          }
        ],
        practiceQuestions: [
          {
            question: "Rewrite by completing the square: 3x² + 12x + 9",
            options: ["3(x + 2)² - 3", "3(x + 2)² + 3", "3(x + 4)² - 9", "3(x + 2)² - 9"],
            correctIndex: 0,
            explanation: "Factor out 3: 3(x² + 4x) + 9. Add/subtract 4: 3(x² + 4x + 4 - 4) + 9 = 3(x + 2)² - 12 + 9 = 3(x + 2)² - 3."
          },
          {
            question: "Complete the square to vertex form: 2x² - 8x + 5",
            options: ["2(x - 2)² - 3", "2(x - 2)² + 3", "2(x - 2)² - 1", "2(x - 4)² - 3"],
            correctIndex: 0,
            explanation: "Factor 2 out of variables: 2(x² - 4x) + 5. Add/subtract 4 inside: 2(x² - 4x + 4 - 4) + 5 = 2(x - 2)² - 8 + 5 = 2(x - 2)² - 3."
          },
          {
            question: "Complete the square to vertex form: 4x² + 24x + 30",
            options: ["4(x + 3)² - 6", "4(x + 3)² + 6", "4(x + 3)² - 30", "4(x + 6)² - 6"],
            correctIndex: 0,
            explanation: "Factor out 4: 4(x² + 6x) + 30. Half of 6 is 3, squared is 9. Add/subtract 9 inside: 4(x² + 6x + 9 - 9) + 30 = 4(x + 3)² - 36 + 30 = 4(x + 3)² - 6."
          }
        ]
      }
    ],
    mathBox: {
      title: "Vertex Form formula",
      equations: [
        { desc: "Standard Form", formula: "ax² + bx + c" },
        { desc: "Vertex Form", formula: "a(x - h)² + k" },
        { desc: "Extremum Vertex", formula: "Vertex coordinate: (h, k)" }
      ]
    }
  },
  "hsa-sse-3c": {
    id: "hsa-sse-3c",
    title: "Transform Exponential Expressions",
    subtitle: "Algebra 1 Exponential",
    duration: "30 mins",
    level: "High School Math",
    topic: "Algebra 1",
    ccss: "HSA-SSE.B.3.c",
    prerequisites: [
      { id: "hsa-sse-1a", title: "Interpret Parts of an Expression (HSA-SSE.A.1.a)" }
    ],
    introduction: "Using the laws of exponents, we can rewrite exponential growth functions to change scales, such as converting an annual growth rate to find an equivalent monthly rate.",
    steps: [
      {
        title: "Step 1: Represent the Time Conversion",
        content: "Since there are 12 months in a year, represent annual time t as 12m, where m is the number of months: t = 12m."
      },
      {
        title: "Step 2: Apply Exponent Power of a Power Law",
        content: "Rewrite baseᵗ as (base¹/¹²)¹²ᵗ. This isolates the monthly scaling base."
      },
      {
        title: "Step 3: Calculate the New Base",
        content: "Compute the inner base decimal. For example, 1.15¹/¹² ≈ 1.0117. This reveals a monthly interest rate of approximately 1.17%."
      }
    ],
    mathBox: {
      title: "Exponent Scaling Rule",
      equations: [
        { desc: "Annual Growth Form", formula: "(1 + r)ᵗ" },
        { desc: "Split Exponent", formula: "((1 + r)¹/ᵏ)ᵏᵗ" },
        { desc: "New Growth Base", formula: "Bᵏᵗ where B = (1 + r)¹/ᵏ" }
      ]
    },
    animationSteps: [
      {
        equation: "1.15ᵗ",
        desc: "Annual Growth: 1.15ᵗ represents a 15% annual growth rate. We want to find the monthly rate.",
        left: { type: "expression", action: null, terms: [{ val: "1.15", color: "blue" }, { val: "ᵗ", color: "slate" }] },
        right: { type: "expression", action: null, terms: [{ val: "15% annual rate", color: "slate" }] }
      },
      {
        equation: "(1.15¹/¹²)¹²ᵗ",
        desc: "Exponent Division: Rewrite the exponent t as 12 * (t / 12) to structure it for 12 compounding periods.",
        left: { type: "expression", action: null, terms: [{ val: "(1.15¹/¹²)", color: "blue", active: true }, { val: "¹²ᵗ", color: "slate" }] },
        right: { type: "expression", action: null, terms: [{ val: "Power of power rule", color: "green" }] }
      },
      {
        equation: "(1.0117)¹²ᵗ",
        desc: "Calculate Base: Evaluate 1.15¹/¹² ≈ 1.0117. This is the equivalent compounding monthly base.",
        left: { type: "expression", action: null, terms: [{ val: "1.0117", color: "green", active: true }, { val: "¹²ᵗ", color: "slate" }] },
        right: { type: "expression", action: null, terms: [{ val: "Monthly growth base", color: "green" }] }
      },
      {
        equation: "(1 + 0.0117)¹²ᵗ",
        desc: "Interpret Rate: The decimal 0.0117 reveals an equivalent monthly growth rate of approximately 1.17%.",
        left: { type: "expression", action: null, terms: [{ val: "1 + 0.0117", color: "green" }] },
        right: { type: "expression", action: null, terms: [{ val: "1.17% monthly rate", color: "green" }] }
      }
    ],
    practiceQuestions: [
      {
        question: "Which of the following is equivalent to (3²ᵗ)?",
        options: ["9ᵗ", "6ᵗ", "3ᵗ", "5ᵗ"],
        correctIndex: 0,
        explanation: "By exponent rules, 3²ᵗ = (3²)ᵗ = 9ᵗ."
      },
      {
        question: "If an investment grows by 12% annually (1.12ᵗ), what calculation gives the monthly factor?",
        options: ["1.12 ÷ 12", "1.12 · 12", "1.12¹/¹²", "1.12¹²"],
        correctIndex: 2,
        explanation: "To find the monthly multiplier, we take the 12th root of the annual multiplier, which is 1.12¹/¹²."
      },
      {
        question: "Simplify the expression (2⁴ᵗ) · (2ᵗ) into a single power of 2.",
        options: ["2⁵ᵗ", "4⁵ᵗ", "2⁴ᵗ", "2³ᵗ"],
        correctIndex: 0,
        explanation: "Add exponents when multiplying like bases: 4t + t = 5t, giving 2⁵ᵗ."
      }
    ]
  },
  "hsa-sse-4": {
    id: "hsa-sse-4",
    title: "Sum of a Finite Geometric Series Formula",
    subtitle: "Algebra 1 Series",
    duration: "45 mins",
    level: "High School Math",
    topic: "Algebra 1",
    ccss: "HSA-SSE.B.4",
    prerequisites: [
      { id: "hsa-sse-1a", title: "Interpret Parts of an Expression (HSA-SSE.A.1.a)" }
    ],
    introduction: "A geometric series is the sum of terms that have a constant ratio. The sum of the first n terms of a geometric series Sn = a + ar + ar² + ... + arⁿ⁻¹ can be derived by multiplying the series by the ratio and subtracting it.",
    steps: [
      {
        title: "Step 1: Write the Sum Equation",
        content: "Express the sum of the series: Sn = a + ar + ar² + ... + arⁿ⁻¹."
      },
      {
        title: "Step 2: Multiply by r",
        content: "Multiply every term in the equation by the common ratio r: r · Sn = ar + ar² + ar³ + ... + arⁿ."
      },
      {
        title: "Step 3: Subtract and Factor",
        content: "Subtract the two equations: Sn - r · Sn = a - arⁿ. Factor both sides: Sn(1 - r) = a(1 - rⁿ). Divide by (1 - r) to get Sn = a(1 - rⁿ) ÷ (1 - r)."
      }
    ],
    mathBox: {
      title: "Geometric Series Formula",
      equations: [
        { desc: "Geometric Series Sum", formula: "Sn = a + ar + ar² + ... + arⁿ⁻¹" },
        { desc: "Derived Sum Formula", formula: "Sn = a · (1 - rⁿ) ÷ (1 - r)" }
      ]
    },
    animationSteps: [
      {
        equation: "Sn = a + ar + ar² + ... + arⁿ⁻¹",
        desc: "Original Sum: The sum of the first n terms of a geometric series with first term a and ratio r.",
        left: { type: "expression", action: null, terms: [{ val: "Sn", color: "blue" }] },
        right: { type: "expression", action: null, terms: [{ val: "a + ar + ... + arⁿ⁻¹", color: "slate" }] }
      },
      {
        equation: "r · Sn = ar + ar² + ar³ + ... + arⁿ",
        desc: "Multiply by r: Scale the entire equation by the common ratio r. Every term shifts up one power of r.",
        left: { type: "expression", action: null, terms: [{ val: "r · Sn", color: "blue", active: true }] },
        right: { type: "expression", action: null, terms: [{ val: "ar + ar² + ... + arⁿ", color: "slate" }] }
      },
      {
        equation: "Sn - r · Sn = a - arⁿ",
        desc: "Subtract Equations: Subtracting the second equation from the first cancels out all the intermediate terms (ar, ar², ..., arⁿ⁻¹), leaving only a and -arⁿ.",
        left: { type: "expression", action: null, terms: [{ val: "Sn - r · Sn", color: "blue" }] },
        right: { type: "expression", action: null, terms: [{ val: "a - arⁿ", color: "red", active: true }] }
      },
      {
        equation: "Sn = a(1 - rⁿ) ÷ (1 - r)",
        desc: "Factor and Solve: Factor out Sn on the left and a on the right: Sn(1 - r) = a(1 - rⁿ). Divide by (1 - r) to complete the proof.",
        left: { type: "expression", action: null, terms: [{ val: "Sn", color: "blue" }] },
        right: { type: "expression", action: null, terms: [{ val: "a(1 - rⁿ) ÷ (1 - r)", color: "green", active: true }] }
      }
    ],
    practiceQuestions: [
      {
        question: "Find the sum of the first 4 terms of the series: 3 + 6 + 12 + 24",
        options: ["45", "48", "30", "42"],
        correctIndex: 0,
        explanation: "Here, a = 3, r = 2, n = 4. Sn = 3 · (1 - 2⁴) ÷ (1 - 2) = 3 · (-15) ÷ (-1) = 45."
      },
      {
        question: "What is the common ratio r in the geometric series: 5 - 15 + 45 - 135?",
        options: ["3", "-3", "10", "-10"],
        correctIndex: 1,
        explanation: "Divide the second term by the first: -15 / 5 = -3."
      },
      {
        question: "If Sn = a(1 - rⁿ) ÷ (1 - r), what happens to the sum as n gets very large if |r| < 1?",
        options: ["It approaches infinity", "It approaches zero", "It approaches a ÷ (1 - r)", "It approaches a"],
        correctIndex: 2,
        explanation: "If |r| < 1, then rⁿ approaches 0 as n goes to infinity, simplifying the formula to a ÷ (1 - r)."
      }
    ]
  },
  "hsa-rei-6": {
    id: "hsa-rei-6",
    title: "Systems of Equations: Substitution Method",
    subtitle: "Algebra 1 Systems",
    duration: "35 mins",
    level: "High School Math",
    topic: "Algebra 1",
    ccss: "HSA-REI.C.6",
    prerequisites: [
      { id: "one-step-equations", title: "Solving One-Step Equations (6.EE.B.7)" },
      { id: "two-step-equations", title: "Solving Two-Step Equations (7.EE.B.4)" },
      { id: "linear-equations", title: "Solving Multi-Step Equations (HSA-REI.B.3)" }
    ],
    introduction: "A system of equations is a set of two or more equations. The substitution method solves systems by replacing one variable with an equivalent expression from the other equation, reducing it to a single-variable problem.",
    steps: [
      {
        title: "Step 1: Isolate One Variable",
        content: "Look for an equation where x or y is already isolated (or easy to isolate). For example, in y = 2x and x + y = 9, y is isolated."
      },
      {
        title: "Step 2: Substitute and Solve",
        content: "Substitute that expression into the other equation. Solve the resulting single-variable equation for its value."
      },
      {
        title: "Step 3: Solve for the Other Variable",
        content: "Plug the value found in Step 2 back into the original equation to solve for the second variable, writing the solution as (x, y)."
      }
    ],
    mathBox: {
      title: "Substitution Method Guide",
      equations: [
        { desc: "System equations example", formula: "y = ax + b  and  cy + dx = e" },
        { desc: "Substitution step", formula: "c(ax + b) + dx = e" },
        { desc: "Final solution coordinate", formula: "Coordinate: (x, y)" }
      ]
    },
    animationSteps: [
      {
        equation: "y = 2x  and  x + y = 9",
        desc: "Original System: We have y isolated in the first equation. We will substitute 2x in place of y in the second equation.",
        left: { type: "expression", action: null, terms: [{ val: "y = 2x", color: "blue" }] },
        right: { type: "expression", action: null, terms: [{ val: "x + y = 9", color: "slate" }] }
      },
      {
        equation: "x + (2x) = 9",
        desc: "Substitution: Replace y with (2x) in the second equation to get an equation in terms of x only.",
        left: { type: "expression", action: null, terms: [{ val: "x + (2x)", color: "blue", active: true }] },
        right: { type: "expression", action: null, terms: [{ val: "9", color: "slate" }] }
      },
      {
        equation: "3x = 9",
        desc: "Combine Like Terms: Add the x terms together (1x + 2x = 3x) to simplify the left side.",
        left: { type: "expression", action: null, terms: [{ val: "3x", color: "blue" }] },
        right: { type: "expression", action: null, terms: [{ val: "9", color: "slate" }] }
      },
      {
        equation: "3x / 3 = 9 / 3",
        desc: "Balance Operation - Divide: To isolate x, write fraction bars and divide BOTH sides by 3.",
        left: { type: "operation", operationType: "divide", action: null, terms: [{ val: "3x", color: "blue" }], opVal: "3" },
        right: { type: "operation", operationType: "divide", action: null, terms: [{ val: "9", color: "slate" }], opVal: "3" }
      },
      {
        equation: "x = 3",
        desc: "Solve for x: Simplifying gives x = 3. Now substitute x = 3 back into y = 2x to find y.",
        left: { type: "expression", action: null, terms: [{ val: "x", color: "blue", active: true }] },
        right: { type: "expression", action: null, terms: [{ val: "3", color: "green", active: true }] }
      },
      {
        equation: "y = 2(3)",
        desc: "Solve for y: Substitute 3 for x in the first equation. This simplifies to y = 6.",
        left: { type: "expression", action: null, terms: [{ val: "y", color: "blue" }] },
        right: { type: "expression", action: null, terms: [{ val: "2(3)", color: "green", active: true }] }
      },
      {
        equation: "y = 6",
        desc: "Final Solution: The solution to the system is the coordinate point (3, 6). Both equations are balanced!",
        left: { type: "expression", action: null, terms: [{ val: "x = 3", color: "blue", active: true }] },
        right: { type: "expression", action: null, terms: [{ val: "y = 6", color: "green", active: true }] }
      }
    ],
    practiceQuestions: [
      {
        question: "Solve using substitution: y = 3x and x + y = 12",
        options: ["(3, 9)", "(2, 6)", "(4, 8)", "(1, 3)"],
        correctIndex: 0,
        explanation: "Substitute 3x for y in the second equation: x + 3x = 12 => 4x = 12 => x = 3. Plug x = 3 back in: y = 3(3) = 9. Solution is (3, 9)."
      },
      {
        question: "Solve using substitution: y = x - 2 and 2x + y = 7",
        options: ["(3, 1)", "(4, 2)", "(2, 0)", "(5, 3)"],
        correctIndex: 0,
        explanation: "Substitute (x - 2) for y: 2x + x - 2 = 7 => 3x = 9 => x = 3. Plug in: y = 3 - 2 = 1. Solution is (3, 1)."
      },
      {
        question: "What is the first step when solving a system using substitution?",
        options: ["Graph both equations", "Add both equations together", "Isolate a variable in one equation", "Multiply one equation by -1"],
        correctIndex: 2,
        explanation: "To use substitution, we must first isolate one variable in one equation to substitute it into the other."
      },
      {
        question: "Solve: y = 2x + 1 and x + y = 10",
        options: ["(3, 7)", "(4, 9)", "(2, 5)", "(5, 11)"],
        correctIndex: 0,
        explanation: "Substitute (2x + 1) for y: x + 2x + 1 = 10 => 3x = 9 => x = 3. Plug in: y = 2(3) + 1 = 7. Solution is (3, 7)."
      }
    ]
  }
};

// Dynamic Lesson Generator for K-12 Syllabus
export function generateDynamicLesson(id) {
  // 1. Find lesson metadata in the curriculum levels list
  let meta = null;
  for (const level of curriculumLevels) {
    for (const topic of level.topics) {
      // Check flat lessons
      let lesson = topic.lessons.find(l => l.id === id);
      if (lesson) {
        meta = {
          id: lesson.id,
          title: lesson.title,
          ccss: lesson.ccss || "Math-Standard",
          level: level.title,
          topic: topic.title
        };
        break;
      }
      // Check subLessons
      for (const parentL of topic.lessons) {
        if (parentL.subLessons) {
          const sub = parentL.subLessons.find(sl => sl.id === id);
          if (sub) {
            meta = {
              id: sub.id,
              title: sub.title,
              ccss: sub.ccss || parentL.ccss || "Math-Standard",
              level: level.title,
              topic: `${topic.title} (${parentL.title})`
            };
            break;
          }
        }
      }
      if (meta) break;
    }
    if (meta) break;
  }

  // Fallback metadata if not found in syllabus
  if (!meta) {
    meta = {
      id: id,
      title: id.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      ccss: "CCSS.Math.Practice",
      level: "General Math",
      topic: "Core Skills"
    };
  }

  // 2. Generate dynamic prerequisites (the 3 skills listed prior in the syllabus)
  const allSkills = [];
  curriculumLevels.forEach(lvl => {
    lvl.topics.forEach(topic => {
      topic.lessons.forEach(lesson => {
        if (lesson.subLessons) {
          lesson.subLessons.forEach(sub => {
            allSkills.push({ id: sub.id, title: sub.title });
          });
        } else {
          allSkills.push({ id: lesson.id, title: lesson.title });
        }
      });
    });
  });
  const currentIdx = allSkills.findIndex(sk => sk.id === meta.id);
  const prerequisites = [];
  if (currentIdx > 0) {
    const startIdx = Math.max(0, currentIdx - 3);
    for (let k = startIdx; k < currentIdx; k++) {
      prerequisites.push(allSkills[k]);
    }
  }

  // 3. Generate dynamic scale balancer equation based on grade level
  const isEarly = meta.ccss && (meta.ccss.startsWith("K.") || meta.ccss.startsWith("1.") || meta.ccss.startsWith("2.") || meta.ccss.startsWith("3."));
  const animationSteps = isEarly ? [
    {
      equation: "x + 2 = 6",
      desc: "Original Equation: Find x. We must perform inverse operations on both sides to keep the scale balanced.",
      left: { type: "expression", action: null, terms: [{ val: "x + 2", color: "slate" }] },
      right: { type: "expression", action: null, terms: [{ val: "6", color: "slate" }] }
    },
    {
      equation: "x + 2 - 2 = 6 - 2",
      desc: "Balance Operation - Subtract: To isolate x, we undo the +2 by subtracting 2 from BOTH sides.",
      left: {
        type: "operation",
        operationType: "subtract",
        action: null,
        terms: [{ val: "x", color: "slate" }, { val: " + 2", color: "slate" }],
        opVal: "- 2"
      },
      right: {
        type: "operation",
        operationType: "subtract",
        action: null,
        terms: [{ val: "6", color: "slate" }],
        opVal: "- 2"
      }
    },
    {
      equation: "x + 2 - 2 = 6 - 2",
      desc: "Teacher Draw - Cancel: Draw diagonal red slashes through +2 and -2 to show they subtract to 0.",
      left: {
        type: "operation",
        operationType: "subtract",
        action: "cancel",
        terms: [{ val: "x", color: "slate" }, { val: " + 2", color: "slate" }],
        opVal: "- 2"
      },
      right: {
        type: "operation",
        operationType: "subtract",
        action: null,
        terms: [{ val: "6", color: "slate" }],
        opVal: "- 2"
      }
    },
    {
      equation: "x = 4",
      desc: "Final Answer: The left side simplifies to x. On the right, 6 - 2 simplifies to 4. The scale is balanced at x = 4!",
      left: { type: "expression", action: null, terms: [{ val: "x", color: "blue", active: true }] },
      right: { type: "expression", action: null, terms: [{ val: "4", color: "green", active: true }] }
    }
  ] : [
    {
      equation: "2x = 10",
      desc: "Original Equation: Find x. We must perform inverse operations on both sides to keep the scale balanced.",
      left: { type: "expression", action: null, terms: [{ val: "2x", color: "blue" }] },
      right: { type: "expression", action: null, terms: [{ val: "10", color: "slate" }] }
    },
    {
      equation: "2x / 2 = 10 / 2",
      desc: "Balance Operation - Divide: To isolate x, we undo the multiplication of 2 by dividing BOTH sides by 2.",
      left: {
        type: "operation",
        operationType: "divide",
        action: null,
        terms: [{ val: "2x", color: "blue" }],
        opVal: "2"
      },
      right: {
        type: "operation",
        operationType: "divide",
        action: null,
        terms: [{ val: "10", color: "slate" }],
        opVal: "2"
      }
    },
    {
      equation: "2x / 2 = 10 / 2",
      desc: "Teacher Draw - Cancel: Draw slashes through the numerator 2 and denominator 2 to cancel to 1.",
      left: {
        type: "operation",
        operationType: "divide",
        action: "cancel-division",
        terms: [{ val: "2x", color: "blue" }],
        opVal: "2"
      },
      right: {
        type: "operation",
        operationType: "divide",
        action: null,
        terms: [{ val: "10", color: "slate" }],
        opVal: "2"
      }
    },
    {
      equation: "x = 5",
      desc: "Final Answer: The left side simplifies to x. On the right, 10 / 2 simplifies to 5. The scale is balanced at x = 5!",
      left: { type: "expression", action: null, terms: [{ val: "x", color: "blue", active: true }] },
      right: { type: "expression", action: null, terms: [{ val: "5", color: "green", active: true }] }
    }
  ];

  return {
    id: meta.id,
    title: meta.title,
    subtitle: `${meta.topic} Essentials`,
    duration: "25 mins",
    level: meta.level,
    topic: meta.topic,
    ccss: meta.ccss,
    introduction: `Welcome to the lesson on **${meta.title}**! In this lesson, we will explore key concepts and formulas related to **${meta.title}** under Common Core Standard **${meta.ccss}**. Mastering this standard builds critical reasoning and solving foundations.`,
    steps: [
      {
        title: "Step 1: Identify Key Components",
        content: "Examine the problem. Locate the numbers, variables, operations, or shapes described in the question."
      },
      {
        title: "Step 2: Apply the Rules",
        content: "Use the appropriate mathematical rules (like inverse operations or volume formulas) to solve step-by-step."
      },
      {
        title: "Step 3: Simplify and Verify",
        content: "Perform calculations to find the simplified final value, and double check your answers for accuracy."
      }
    ],
    prerequisites: prerequisites.length > 0 ? prerequisites : null,
    mathBox: {
      title: "Interactive Reference Guide",
      equations: [
        { desc: "Core Standard Aligned", formula: `CCSS Standard: ${meta.ccss}` },
        { desc: "General Balance Rule", formula: "What is done to one side must be done to the other." }
      ]
    },
    animationSteps: animationSteps,
    practiceQuestions: isEarly ? [
      {
        question: `Solve for x:  x + 3 = 7`,
        options: ["x = 3", "x = 4", "x = 10", "x = 5"],
        correctIndex: 1,
        explanation: "To solve for x, undo adding 3 by subtracting 3 from both sides: x = 7 - 3 = 4."
      },
      {
        question: `Solve for x:  x - 2 = 5`,
        options: ["x = 3", "x = 7", "x = 8", "x = 2"],
        correctIndex: 1,
        explanation: "To solve for x, undo subtracting 2 by adding 2 to both sides: x = 5 + 2 = 7."
      },
      {
        question: `If you have 4 apples and buy 3 more, how many do you have?`,
        options: ["5 apples", "6 apples", "7 apples", "8 apples"],
        correctIndex: 2,
        explanation: "This matches the addition problem: 4 + 3 = 7 apples."
      },
      {
        question: `What is the value of 10 - 6?`,
        options: ["3", "4", "5", "16"],
        correctIndex: 1,
        explanation: "Subtracting 6 from 10 leaves exactly 4."
      }
    ] : [
      {
        question: `If x + 5 = 12, what is the value of x?`,
        options: ["x = 5", "x = 7", "x = 17", "x = 6"],
        correctIndex: 1,
        explanation: "To solve for x, perform the inverse of adding 5. Subtract 5 from both sides: x = 12 - 5 = 7."
      },
      {
        question: `Solve the equation: 3x = 18`,
        options: ["x = 6", "x = 15", "x = 21", "x = 5"],
        correctIndex: 0,
        explanation: "To isolate x, undo the multiplication of 3 by dividing both sides of the equation by 3: x = 18 / 3 = 6."
      },
      {
        question: `If 2x - 3 = 7, what is the value of x?`,
        options: ["x = 2", "x = 4", "x = 5", "x = 10"],
        correctIndex: 2,
        explanation: "First, add 3 to both sides: 2x = 10. Then, divide both sides by 2: x = 5."
      },
      {
        question: `What is the inverse operation of multiplication?`,
        options: ["Addition", "Subtraction", "Division", "Exponents"],
        correctIndex: 2,
        explanation: "The inverse of multiplication is division, which cancels out the coefficient to isolate the variable."
      }
    ]
  };
}

export function getLessonById(id) {
  let mappedId = id;
  if (id === "linear-equations") mappedId = "hsa-rei-3";
  if (id === "factoring-quadratics") mappedId = "hsa-sse-3a";
  if (id === "systems-substitution") mappedId = "hsa-rei-6";

  if (sampleLessons[mappedId]) {
    return sampleLessons[mappedId];
  }
  return generateDynamicLesson(mappedId);
}
