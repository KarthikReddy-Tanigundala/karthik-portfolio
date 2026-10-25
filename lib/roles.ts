/**
 * The "role lens": hiring managers pick the role they are hiring for and the
 * site re-ranks projects and highlights the tools that matter for it.
 * Project fit scores live on each project (lib/projects.ts).
 */

export type RoleId = "analyst" | "bi" | "ae" | "ds" | "ai";

export type Role = {
  id: RoleId;
  label: string;
  short: string;
  /** One-paragraph answer to "why you, for this role?" */
  pitch: string;
  /** Tools emphasised in the toolkit when this role is selected. */
  focusTools: string[];
};

export const ROLES: Role[] = [
  {
    id: "analyst",
    label: "Data Analyst",
    short: "Analyst",
    pitch:
      "I turn operational data into decisions people act on: 14 executive reports for 700+ US payers at Zelis, hospital-performance scorecards on AIHW data, and an independent measure of Melbourne train and tram punctuality. Every figure ships with its sample size and uncertainty.",
    focusTools: [
      "SQL",
      "Snowflake",
      "PostgreSQL",
      "Python",
      "pandas",
      "Excel",
      "Power BI",
      "DAX",
      "Streamlit",
      "Bootstrap & hypothesis tests",
      "DuckDB",
    ],
  },
  {
    id: "bi",
    label: "BI Developer",
    short: "BI",
    pitch:
      "Power BI end to end, in production: DAX, Power Query, dataflows and role-based access for US executives at Zelis, where I cut reporting turnaround ~38%. Since then I have authored a four-page Power BI report as code (PBIP/TMDL) on a Kimball star schema with row-level security.",
    focusTools: [
      "Power BI",
      "DAX",
      "Power Query / M",
      "Row-level security",
      "PBIP / TMDL",
      "Data modelling (Kimball)",
      "Snowflake",
      "SQL",
      "Excel",
      "Plotly / Dash",
      "Tableau",
    ],
  },
  {
    id: "ae",
    label: "Analytics Engineer",
    short: "AE",
    pitch:
      "dbt star schemas with enforced contracts, unit and reconciliation tests, CI on DuckDB and production targets on Snowflake. Two public dbt projects, 300+ dbt nodes passing between them, plus a self-built GTFS-Realtime collector feeding a versioned data lake.",
    focusTools: [
      "dbt",
      "DuckDB",
      "Snowflake",
      "SQL",
      "Data modelling (Kimball)",
      "Parquet",
      "GitHub Actions",
      "sqlfluff / pre-commit / ruff",
      "Python",
      "Hugging Face Hub",
      "Git / GitHub",
    ],
  },
  {
    id: "ds",
    label: "Data Scientist",
    short: "DS",
    pitch:
      "Forecasting and ML that is measured honestly: walk-forward backtests, calibrated prediction intervals, bootstrap confidence intervals, and head-to-head benchmarks against AEMO's own forecast and the AFL betting market. Where my models lose, the write-up says so.",
    focusTools: [
      "Python",
      "scikit-learn",
      "LightGBM",
      "XGBoost",
      "statsforecast / MLForecast",
      "Time series (ARIMA, ETS, STL)",
      "Conformal prediction",
      "SHAP",
      "Clustering (PCA, K-means, GMM)",
      "Survival analysis (lifelines)",
      "Bootstrap & hypothesis tests",
      "R",
    ],
  },
  {
    id: "ai",
    label: "AI / LLM Engineer",
    short: "AI",
    pitch:
      "Grounded, cited LLM systems with measured retrieval: a hybrid RAG with reranking that lifts MRR by +0.17 with a confidence interval, RAGAS evaluation and layered guardrails, plus a Copilot Studio agent built for Better Health Network staff.",
    focusTools: [
      "RAG",
      "Gemini API",
      "LangChain",
      "ChromaDB",
      "FAISS",
      "BM25",
      "Embeddings (sentence-transformers, bge)",
      "Cross-encoder reranking",
      "RAGAS",
      "LLM evaluation design",
      "Microsoft Copilot Studio",
      "Prompt engineering",
    ],
  },
];

export const ROLE_BY_ID: Record<RoleId, Role> = Object.fromEntries(
  ROLES.map((r) => [r.id, r])
) as Record<RoleId, Role>;

export function isRoleId(value: string | null | undefined): value is RoleId {
  return ROLES.some((r) => r.id === value);
}
