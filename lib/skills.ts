/**
 * Tools & technologies, confidence-tiered. Names must match the `stack`
 * entries in lib/projects.ts: that is how the toolkit shows "used in"
 * evidence for every tool.
 *
 *   production: used daily in a paid data role
 *   shipped:    built into a public project or partner deliverable
 *   coursework: used in graded RMIT work, not yet in a shipped project
 */

export type SkillLevel = "production" | "shipped" | "coursework";

export type Skill = {
  name: string;
  level: SkillLevel;
  /** Evidence for tools that don't appear in a project stack. */
  note?: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  skills: Skill[];
};

export const LEVEL_LABEL: Record<SkillLevel, string> = {
  production: "Production",
  shipped: "Shipped in projects",
  coursework: "Coursework",
};

export const LEVEL_DESCRIPTION: Record<SkillLevel, string> = {
  production: "Used daily in a paid data role (Zelis Healthcare, EnergyTech Global).",
  shipped: "Built into a public project or partner deliverable you can inspect.",
  coursework: "Used in graded RMIT Master of Data Science work.",
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "sql",
    label: "SQL, warehousing & modelling",
    skills: [
      { name: "SQL", level: "production" },
      { name: "Snowflake", level: "production" },
      { name: "PostgreSQL", level: "production" },
      { name: "Data modelling (Kimball)", level: "production" },
      { name: "dbt", level: "shipped" },
      { name: "DuckDB", level: "shipped" },
      { name: "Parquet", level: "shipped" },
    ],
  },
  {
    id: "bi",
    label: "BI & visualisation",
    skills: [
      { name: "Power BI", level: "production" },
      { name: "DAX", level: "production" },
      { name: "Power Query / M", level: "production" },
      { name: "Row-level security", level: "production" },
      { name: "Excel", level: "production" },
      { name: "Plotly / Dash", level: "production" },
      { name: "PBIP / TMDL", level: "shipped" },
      { name: "Streamlit", level: "shipped" },
      {
        name: "Tableau",
        level: "coursework",
        note: "RMIT Data Visualisation and Communication coursework.",
      },
    ],
  },
  {
    id: "python",
    label: "Programming & data",
    skills: [
      { name: "Python", level: "production" },
      { name: "pandas", level: "production" },
      {
        name: "NumPy",
        level: "production",
        note: "Used throughout every Python project and at EnergyTech.",
      },
      { name: "Flask", level: "production" },
      { name: "R", level: "shipped" },
      { name: "fitzRoy", level: "shipped" },
      { name: "GTFS / GTFS-Realtime", level: "shipped" },
      { name: "pytest", level: "shipped" },
    ],
  },
  {
    id: "ml",
    label: "ML, forecasting & statistics",
    skills: [
      { name: "scikit-learn", level: "shipped" },
      { name: "LightGBM", level: "shipped" },
      { name: "XGBoost", level: "shipped" },
      { name: "statsforecast / MLForecast", level: "shipped" },
      { name: "Time series (ARIMA, ETS, STL)", level: "shipped" },
      { name: "statsmodels", level: "shipped" },
      { name: "Conformal prediction", level: "shipped" },
      { name: "SHAP", level: "shipped" },
      { name: "Clustering (PCA, K-means, GMM)", level: "shipped" },
      { name: "Survival analysis (lifelines)", level: "shipped" },
      { name: "Bootstrap & hypothesis tests", level: "shipped" },
    ],
  },
  {
    id: "genai",
    label: "GenAI & LLM applications",
    skills: [
      { name: "RAG", level: "shipped" },
      { name: "Gemini API", level: "shipped" },
      { name: "LangChain", level: "shipped" },
      { name: "Embeddings (sentence-transformers, bge)", level: "shipped" },
      { name: "BM25", level: "shipped" },
      { name: "ChromaDB", level: "shipped" },
      { name: "FAISS", level: "shipped" },
      { name: "Cross-encoder reranking", level: "shipped" },
      { name: "RAGAS", level: "shipped" },
      { name: "LLM evaluation design", level: "shipped" },
      { name: "Prompt engineering", level: "shipped" },
      { name: "Microsoft Copilot Studio", level: "shipped" },
      { name: "Vercel AI SDK", level: "shipped" },
    ],
  },
  {
    id: "eng",
    label: "Engineering, cloud & platforms",
    skills: [
      { name: "Git / GitHub", level: "production" },
      { name: "REST APIs", level: "production" },
      { name: "GitHub Actions", level: "shipped" },
      { name: "Hugging Face Hub", level: "shipped" },
      { name: "sqlfluff / pre-commit / ruff", level: "shipped" },
      { name: "uv", level: "shipped" },
      { name: "Microsoft SharePoint", level: "shipped" },
      { name: "Microsoft Teams", level: "shipped" },
      { name: "Next.js / TypeScript", level: "shipped" },
      { name: "Tailwind CSS", level: "shipped" },
      { name: "Vercel", level: "shipped" },
      {
        name: "Apache Spark (Scala)",
        level: "coursework",
        note: "Spark Streaming query-log analysis in Scala for RMIT Big Data Processing, verified against an oracle on a live cluster.",
      },
      {
        name: "AWS EMR",
        level: "coursework",
        note: "Ran and verified Spark jobs on an AWS EMR cluster for RMIT Big Data Processing.",
      },
      {
        name: "Hadoop / Pig",
        level: "coursework",
        note: "RMIT Big Data Processing: Pig on Hadoop (assignment scored 25/25).",
      },
    ],
  },
];

export const ALL_SKILLS: Skill[] = SKILL_GROUPS.flatMap((g) => g.skills);

export const SKILL_COUNTS = {
  total: ALL_SKILLS.length,
  production: ALL_SKILLS.filter((s) => s.level === "production").length,
  shipped: ALL_SKILLS.filter((s) => s.level === "shipped").length,
};
