/**
 * Project data — single source of truth for the Selected Work section
 * and the project modals. Every claim here is defensible per the KB.
 */

export type ProjectStatus = "live" | "in-development" | "production-archived" | "academic";

export type Project = {
  id: string;
  title: string;
  status: ProjectStatus;
  problem: string;
  stack: string[];
  outcomes: string[];
  longDescription: string;
  highlight: boolean;
  links?: {
    github?: string;
    liveDemo?: string;
    caseStudy?: string;
  };
  callToChat?: string;
};

export const projects: Project[] = [
  {
    id: "rag-doc-qa-bot",
    title: "RAG-Powered Document Q&A Bot",
    status: "in-development",
    problem:
      "Standalone production-grade RAG system over a domain corpus — semantic chunking, vector retrieval, citation grounding, polished chat UI.",
    stack: ["Python", "LangChain", "Vector DB", "LLM API", "Streamlit"],
    outcomes: [
      "Citation-grounded answers (no hallucinated sources)",
      "Semantic chunking pipeline",
      "End-to-end LLM application engineering demo",
    ],
    longDescription:
      "A separate, full-stack RAG implementation in active development — distinct from this portfolio's embedded chat. Demonstrates the retrieval, chunking, and grounding patterns I'd build for a production knowledge-base assistant in a regulated industry (healthcare, finance). The portfolio chat above is the lean prompt-stuffed variant. This project is the full vector-DB version.",
    highlight: true,
    callToChat: "The chat in the hero is a leaner prompt-stuffed variant — same idea, different architecture.",
  },
  {
    id: "healthcare-analytics-dashboard",
    title: "Healthcare Analytics Dashboard",
    status: "in-development",
    problem:
      "Interactive dashboard analysing healthcare claims and public Australian health data — translating Zelis-style analytics to the Australian context.",
    stack: ["Power BI", "Streamlit", "Python", "SQL"],
    outcomes: [
      "Claims trend analysis",
      "Provider network visualisation",
      "Australian health data sources (AIHW, Medicare)",
    ],
    longDescription:
      "Currently building. Brings my 1 yr 3 mo of Zelis US-healthcare BI experience into the Australian setting using public datasets (AIHW, Medicare Benefits Schedule, hospital activity data). Live link and screenshots coming soon.",
    highlight: true,
  },
  {
    id: "zelis-payer-reporting",
    title: "Weekly Payer Performance Reporting Suite",
    status: "production-archived",
    problem:
      "Executive reporting at Zelis took ~4 hours per cycle across 14 reports covering 700+ US healthcare payers. Needed to reduce turnaround without sacrificing depth.",
    stack: ["Snowflake SQL", "Power BI", "DAX", "Power Query"],
    outcomes: [
      "Cut weekly reporting time by ~38% (4 hrs → 2.5 hrs)",
      "14 reports consolidated, 700+ payers covered",
      "Quarterly Recognition Award",
    ],
    longDescription:
      "Production work at Zelis Healthcare India (Jan 2024 – Mar 2025). Rebuilt Snowflake stored procedures, eliminated redundant joins, migrated manual Excel steps into Power BI dataflows, parameterised refresh logic. The suite served US-based product managers and executive leadership — financial reconciliation, network analytics, provider directory metrics in a single self-service dashboard.",
    highlight: true,
  },
  {
    id: "pirvision-fog-detection",
    title: "PIRvision Fog Detection — ML Classification",
    status: "academic",
    problem:
      "Binary classification of fog presence from 7,651 rows of PIR sensor data across 59 features. Compare Decision Tree vs KNN.",
    stack: ["Python", "scikit-learn", "pandas", "Jupyter"],
    outcomes: [
      "End-to-end ML pipeline: cleaning → features → CV → benchmarking",
      "Accuracy, precision, recall, F1 comparison",
      "Trade-off analysis: interpretability vs computational cost",
    ],
    longDescription:
      "RMIT COSC2670 assignment. Full ML workflow on real environmental sensor data: cleaning, feature engineering, cross-validation, hyperparameter consideration, and comparative algorithm benchmarking. Demonstrates production-grade Python data science fundamentals.",
    highlight: false,
  },
  {
    id: "energytech-energy-dashboards",
    title: "Energy Consumption & Contract Analytics",
    status: "production-archived",
    problem:
      "Australian retailer ReAmped Energy and NZ retailer Electric Kiwi needed usage pattern monitoring, anomaly detection, and billing accuracy support.",
    stack: ["Python", "PostgreSQL", "Plotly/Dash", "Flask"],
    outcomes: [
      "Real-time consumption dashboards in production",
      "Customer contract tracking system across multiple tariff structures",
      "~15% reduction in project downtime via pipeline analysis",
    ],
    longDescription:
      "Production work at EnergyTech Global (Feb–Dec 2023), the Hyderabad engineering backbone for ReAmped Energy (AU) and Electric Kiwi (NZ). Built and maintained energy consumption analytics tooling and a contract lifecycle tracking system supporting retail energy operations across multiple ANZ tariff structures.",
    highlight: false,
  },
];

export const highlightedProjects = projects.filter((p) => p.highlight);
export const allProjects = projects;