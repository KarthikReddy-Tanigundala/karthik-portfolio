/**
 * Project data: single source of truth for the work grid, the case-study
 * modal, the role lens, the toolkit's "used in" evidence and the chat
 * assistant's knowledge base.
 *
 * Honesty rules: every number below comes from the project's own README or
 * evaluation output. Status labels mean exactly what they say: "live" has a
 * public URL running now, "collecting" is running but has no findings yet,
 * "delivered" was built for an external partner, "production" was paid work
 * in a job, "code" is a public repo you can run, "built" is finished but not
 * publicly hosted, "academic" is graded university work.
 */

import type { RoleId } from "./roles";

export type ProjectStatus =
  | "live"
  | "collecting"
  | "delivered"
  | "production"
  | "code"
  | "built"
  | "academic";

export type Category =
  | "industry"
  | "analytics-engineering"
  | "ml"
  | "genai"
  | "bi";

export const CATEGORY_LABEL: Record<Category, string> = {
  industry: "Industry & partner work",
  "analytics-engineering": "Analytics engineering",
  ml: "Forecasting & ML",
  genai: "GenAI & RAG",
  bi: "BI & Power BI",
};

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Live demo",
  collecting: "Live · collecting data",
  delivered: "Delivered to partner",
  production: "Production",
  code: "Open source",
  built: "Demo on request",
  academic: "Academic",
};

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  /** Context line: employer, partner or project type. */
  org: string;
  period: string;
  status: ProjectStatus;
  categories: Category[];
  /** 0 = not relevant … 3 = strongest evidence for that role. */
  roleFit: Record<RoleId, 0 | 1 | 2 | 3>;
  tagline: string;
  headline: Metric;
  metrics: Metric[];
  problem: string;
  approach: string[];
  results: string[];
  limits: string[];
  /** Tool names must match lib/skills.ts so "used in" evidence links up. */
  stack: string[];
  team?: string;
  /** Shown in place of results that are not final yet. */
  pendingNote?: string;
  links?: {
    live?: string;
    github?: string;
    docs?: string;
    data?: string;
  };
};

const GH = "https://github.com/KarthikReddy-Tanigundala";

export const projects: Project[] = [
  {
    id: "gridcast",
    title: "GridCast",
    org: "NEM electricity forecasting · Victoria",
    period: "Oct 2026",
    status: "live",
    categories: ["ml"],
    roleFit: { analyst: 1, bi: 0, ae: 1, ds: 3, ai: 1 },
    tagline:
      "Day-ahead forecasts of Victoria's electricity demand and spot price, every day at 12:00 AEST, benchmarked head-to-head against AEMO's own PREDISPATCH.",
    headline: { value: "0.48", label: "MASE on day-ahead demand · 972 daily forecasts" },
    metrics: [
      { value: "235 MW", label: "Demand MAE (sMAPE 5.1%)" },
      { value: "0.80 / 0.95", label: "Measured coverage of 80% / 95% intervals" },
      { value: "$29.5", label: "Price MAE vs AEMO PD $85.7 (12 months)" },
      { value: "Daily", label: "GitHub Action publishes tomorrow's forecast" },
    ],
    problem:
      "Can a public, keyless model forecast tomorrow's half-hourly VIC1 demand and price well enough to compete with the market operator, with intervals that are calibrated rather than assumed?",
    approach: [
      "Ingested AEMO NEMweb price/demand, the PREDISPATCH archive (own reader, because nemseer broke after AEMO's 2024 rename) and Open-Meteo day-before weather.",
      "Model ladder: seasonal-naive → AutoETS / MSTL-ARIMAX → LightGBM (direct model, lags ≥ 72) → NHITS deep learning.",
      "Walk-forward backtest over 1 Feb 2024 – 29 Sep 2026. Every design choice was made on a 2023 validation year first.",
      "Rolling split-conformal intervals with adaptive conformal inference, and a separate spike classifier.",
      "Domain details that silently break NEM models are handled and unit-tested: AEST interval-ending timestamps, 5-minute settlement, negative prices.",
    ],
    results: [
      "Demand MASE 0.482 against a seasonal-naive bar (gate < 0.6 passed); price MASE 0.813.",
      "80% / 95% intervals contain the actual value 79.8% / 94.7% of the time.",
      "A 50/50 blend with AEMO beats both on demand (191 MW vs AEMO 203 MW).",
      "GridCast beats AEMO's day-ahead price forecast on MAE ($29.5 vs $85.7), because PD over-predicts spikes.",
    ],
    limits: [
      "AEMO wins on demand (203 vs 245 MW MAE); it sees 30 more minutes of data plus dispatch inputs.",
      "NHITS lost to LightGBM on a laptop-CPU training budget, reported as measured.",
    ],
    stack: [
      "Python",
      "pandas",
      "LightGBM",
      "statsforecast / MLForecast",
      "Time series (ARIMA, ETS, STL)",
      "Conformal prediction",
      "scikit-learn",
      "Parquet",
      "Streamlit",
      "Plotly / Dash",
      "GitHub Actions",
      "pytest",
    ],
    links: {
      live: "https://gridcast-vic.streamlit.app/",
      github: `${GH}/gridcast`,
    },
  },
  {
    id: "bhn-assistbot",
    title: "AssistBot for Better Health Network",
    org: "Better Health Network × RMIT Work-Integrated Learning",
    period: "Semester 2 · 2026",
    status: "delivered",
    categories: ["industry", "genai"],
    roleFit: { analyst: 2, bi: 1, ae: 1, ds: 1, ai: 3 },
    tagline:
      "A grounded, cited Microsoft Teams assistant that tells community-health staff how to record a client contact correctly for each funding stream, down to the exact TrakCare step.",
    headline: { value: "90–95%", label: "Answer accuracy on a 63-case evaluation across 7 funding streams" },
    metrics: [
      { value: "7", label: "Funding streams covered, with cross-stream safety" },
      { value: "166", label: "Knowledge-base entries: 65 rules, 41 FAQs, 60 terms" },
      { value: "63 × 3", label: "Evaluation cases, each run three times" },
      { value: "No code", label: "Staff update answers by editing SharePoint rows" },
    ],
    problem:
      "Funding rules differ across Community Health, CHSP, HACC-PYP, AOD and other streams. A wrong client record can cost funding or trigger an audit, and the guidance is scattered across long manuals.",
    approach: [
      "Distilled BHN's funding guidelines into a structured SharePoint knowledge base: one rule per row with stream, category, TrakCare step, source and status.",
      "Built the agent in Microsoft Copilot Studio as RAG over approved sources only: it detects the program, asks one clarifying question when a rule depends on it, and cites its source.",
      "Answer-first reply format: the yes/no line, the TrakCare step, then the citation, with an honest 'check with your program manager' when unsure.",
      "Designed a 63-case evaluation (45 single-turn cases, 18 conversations) across all streams, including phrasing variants and cross-stream traps, graded on correctness, program detection, citation and format.",
    ],
    results: [
      "Answer accuracy of 90–95% across the evaluation runs, meeting the 90% correctness target set in the project proposal.",
      "Answers across all 7 streams in the approved, cited format.",
      "Cross-stream safety holds: the bot does not apply one program's rule to another.",
      "Rules are maintainable by staff in SharePoint, so answers change without code.",
    ],
    limits: [
      "Depends on Microsoft licensing for the SharePoint list connector.",
      "Generative retrieval is not fully deterministic, which is why every case is run three times and accuracy is reported as a range rather than a single number.",
    ],
    team: "Team of three with Janavi Mahesh and Soham Patel",
    stack: [
      "Microsoft Copilot Studio",
      "Microsoft SharePoint",
      "Microsoft Teams",
      "RAG",
      "Prompt engineering",
      "LLM evaluation design",
      "Excel",
    ],
  },
  {
    id: "littlevitals",
    title: "LittleVitals",
    org: "Victorian health-system analytics platform · paediatric lens",
    period: "Jun 2026",
    status: "code",
    categories: ["analytics-engineering", "bi", "ml"],
    roleFit: { analyst: 2, bi: 2, ae: 3, ds: 2, ai: 0 },
    tagline:
      "A modern-data-stack warehouse over AIHW hospital performance data: medallion layers, a Kimball star schema, enforced dbt contracts and a Streamlit companion app.",
    headline: { value: "155 / 155", label: "dbt nodes passing · 23 models, ~120 data tests" },
    metrics: [
      { value: "3 + 8", label: "Fact and dimension tables in the Gold star schema" },
      { value: "1:1", label: "Reconciliation test ties Gold totals to source" },
      { value: "2 min", label: "Clone-to-built on DuckDB, no cloud account" },
      { value: "Snowflake", label: "Production target configured: same models, one switch" },
    ],
    problem:
      "Hospital performance data is published as annual aggregates with suppressed cells, while patient-level data sits behind ethics approval. The project shows how a hospital Decision Support Unit would model both, defensibly.",
    approach: [
      "BRONZE → SILVER → GOLD medallion with stg_ / int_ / dim_ / fct_ / mart_ naming; DuckDB for local and CI, Snowflake for production.",
      "Australian financial-year date dimension, plus ACEM triage targets, NEAT (4-hour rule) and elective urgency targets encoded as seeds.",
      "Enforced contracts on every Gold model, a unit test for the FY macro, and a source-vs-Gold reconciliation test.",
      "Synthea synthetic paediatric patient layer (clearly labelled) for encounter-grain modelling.",
      "Analytics layer: SARIMA forecasts, STL seasonality, k-means peer groups, Spiegelhalter funnel plots, Kaplan–Meier waitlist survival.",
    ],
    results: [
      "Full pipeline builds and tests offline; dbt build reports 155 nodes passing with 0 errors.",
      "Executive scorecard mart rates hospitals Meets / At Risk / Below Benchmark against national benchmarks.",
      "Snowflake setup script covers RBAC roles, an XS warehouse and a resource monitor for cost control.",
    ],
    limits: [
      "AIHW data is annual and aggregated, so all monthly or seasonal views use synthetic Synthea data and say so.",
      "The synthetic readmission model reaches ROC-AUC ≈ 0.67; it demonstrates method, not clinical value.",
      "Snowflake provisioning and the Power BI pages are the next tier.",
    ],
    stack: [
      "dbt",
      "DuckDB",
      "Snowflake",
      "SQL",
      "Data modelling (Kimball)",
      "Python",
      "pandas",
      "statsmodels",
      "Time series (ARIMA, ETS, STL)",
      "Survival analysis (lifelines)",
      "Clustering (PCA, K-means, GMM)",
      "Streamlit",
      "Plotly / Dash",
      "GitHub Actions",
      "sqlfluff / pre-commit / ruff",
      "pytest",
    ],
    links: {
      github: `${GH}/littlevitals`,
    },
  },
  {
    id: "auspolicyrag",
    title: "AusPolicyRAG",
    org: "Retrieval-augmented answers over Australian energy policy",
    period: "Oct 2026",
    status: "code",
    categories: ["genai"],
    roleFit: { analyst: 0, bi: 0, ae: 1, ds: 2, ai: 3 },
    tagline:
      "Ask about the NEM, the 2026 Integrated System Plan or the Safeguard Mechanism and every claim is cited to a page in 60 public AEMO, AER, DCCEEW and CER documents.",
    headline: { value: "+0.17", label: "MRR gain over dense-only retrieval, 95% CI [+0.03, +0.31]" },
    metrics: [
      { value: "0.98", label: "RAGAS faithfulness (held-out test split)" },
      { value: "29 / 29", label: "In-scope answers with valid citations" },
      { value: "0", label: "LLM calls spent on out-of-scope questions" },
      { value: "2.1 s", label: "End-to-end p50 latency on 2 vCPU" },
    ],
    problem:
      "Energy-policy documents are long, edition-dependent and full of tables. Tutorial RAG demos rarely show whether their design choices actually improve retrieval, or what they cost.",
    approach: [
      "Curated a 60-PDF corpus (13,871 chunks), parsed tables to markdown and kept page labels so citations deep-link to the page.",
      "Hybrid retrieval: BM25 + bge dense embeddings in ChromaDB, fused with Reciprocal Rank Fusion, then a cross-encoder reranker.",
      "Benchmarked three rerankers on quality and on CPU latency. The spec's bge-reranker-v2-m3 took 23 s per query, so MiniLM ships.",
      "Built a 52-question gold set with verbatim quotes checked in CI; tuned on a dev split and scored the test split once, with bootstrap CIs.",
      "Layered guardrails: a calibrated relevance threshold that refuses off-topic questions before any LLM call, an injection screen and a citation validator.",
    ],
    results: [
      "MRR 0.71 and nDCG@10 0.77 for the shipped pipeline, vs 0.54 MRR for dense-only.",
      "Context precision 0.66 vs 0.44 for a naive RAG baseline.",
      "Faithfulness 0.98, answer relevancy 0.89, context recall 0.91 (RAGAS, judged by a different Gemini generation).",
    ],
    limits: [
      "On these 33 test questions a naive dense RAG already answers well; the measured wins are retrieval, context precision and cost.",
      "ID-based context precision of 0.66 missed the 0.70 target. It is reported, not hidden.",
    ],
    stack: [
      "Python",
      "RAG",
      "BM25",
      "Embeddings (sentence-transformers, bge)",
      "ChromaDB",
      "Cross-encoder reranking",
      "LangChain",
      "Gemini API",
      "RAGAS",
      "LLM evaluation design",
      "Bootstrap & hypothesis tests",
      "Streamlit",
      "Hugging Face Hub",
      "GitHub Actions",
    ],
    links: {
      github: `${GH}/auspolicyrag`,
      data: "https://huggingface.co/datasets/Karry001/auspolicyrag-index",
    },
  },
  {
    id: "zelis-payer-reporting",
    title: "Payer Performance Reporting Suite",
    org: "Zelis Healthcare · Data Analyst",
    period: "Jan 2024 – Mar 2025",
    status: "production",
    categories: ["industry", "bi"],
    roleFit: { analyst: 3, bi: 3, ae: 2, ds: 0, ai: 0 },
    tagline:
      "Production Snowflake SQL and Power BI for a US healthcare payments company: weekly executive reporting across 700+ payers, rebuilt to run in a fraction of the time.",
    headline: { value: "~38%", label: "Faster weekly executive reporting (4 h → under 2.5 h)" },
    metrics: [
      { value: "14", label: "Executive reports consolidated" },
      { value: "700+", label: "US healthcare payers covered" },
      { value: "~30%", label: "Less month-end reconciliation effort" },
      { value: "Award", label: "Quarterly Recognition Award" },
    ],
    problem:
      "Executive reporting took about four hours a cycle across 14 reports, with manual Excel steps. US leadership needed faster turnaround without losing analytical depth.",
    approach: [
      "Rebuilt Snowflake stored procedures and removed redundant multi-table joins.",
      "Migrated manual Excel steps into Power BI dataflows with parameterised refresh logic.",
      "Built the Weekly Payer Performance Report and automated the Monthly Network Reconciliation Report.",
      "Implemented role-based access in Snowflake; DAX and Power Query handled slowly changing provider-directory dimensions.",
    ],
    results: [
      "Weekly executive reporting cut from ~4 hours to under 2.5 hours.",
      "Month-end reconciliation effort down ~30%.",
      "Mentored two interns to independent report ownership within eight weeks, across a 10.5-hour US–India time gap.",
    ],
    limits: ["Proprietary work: no public code or screenshots."],
    stack: [
      "Snowflake",
      "SQL",
      "Power BI",
      "DAX",
      "Power Query / M",
      "Row-level security",
      "Data modelling (Kimball)",
      "PostgreSQL",
      "Excel",
      "Git / GitHub",
    ],
  },
  {
    id: "footyforecast",
    title: "FootyForecast",
    org: "Calibrated AFL predictions & player archetypes",
    period: "Oct 2026",
    status: "live",
    categories: ["ml"],
    roleFit: { analyst: 1, bi: 0, ae: 0, ds: 3, ai: 1 },
    tagline:
      "Win probability and margin for every AFL game, scored walk-forward over ten seasons against the betting market and every public model on Squiggle, with a plain-English reason for each tip.",
    headline: { value: "68.1%", label: "Tipping accuracy over 2,063 games (2017–2026)" },
    metrics: [
      { value: "294 bits", label: "Probabilistic score, 5th of 10 incl. the market" },
      { value: "+19.6", label: "Bits over the Phase-1 Elo baseline" },
      { value: "100%", label: "Of 45,249 Squiggle tips reproduced by my scorer" },
      { value: "6", label: "Player archetypes from 7,049 player-seasons" },
    ],
    problem:
      "Most footy models report accuracy on games they were tuned on. FootyForecast asks how a from-scratch model ranks against the bookmakers and Squiggle's public models when every tip is made before the round.",
    approach: [
      "R (fitzRoy) extracts 1990–2026 results and player stats; Python does everything else.",
      "From-scratch Elo with venue- and travel-aware home advantage, re-tuned each pre-season, then a 29-feature logistic model with Platt calibration.",
      "All modelling choices made on 2014–2016 warm-up seasons; ten seasons scored walk-forward with Squiggle's own bits metric.",
      "Exact SHAP values on the shipped logistic model, turned into counterfactual plain-English reasons per tip.",
      "PCA → K-means and a Gaussian mixture over 38 season-normalised style stats for archetypes and a 'plays like' tool.",
    ],
    results: [
      "Shipped model: 68.1% accuracy, 294.3 bits, 26.39 margin MAE, mid-table on Squiggle's 2022–2026 tables.",
      "Most of the gain is calibration: Platt scaling alone adds +14 bits to Elo.",
      "A regularised logistic beats XGBoost here; with ~200 games a season the signal is close to additive.",
    ],
    limits: [
      "The betting market is still clearly better (−48 bits, CI [−71, −25]); no claim of beating the bookies.",
      "The gain over Elo is suggestive, not conclusive: +19.6 bits, CI [−5.0, +43.8].",
    ],
    stack: [
      "R",
      "fitzRoy",
      "Python",
      "pandas",
      "scikit-learn",
      "XGBoost",
      "SHAP",
      "Clustering (PCA, K-means, GMM)",
      "Bootstrap & hypothesis tests",
      "Streamlit",
      "Plotly / Dash",
      "GitHub Actions",
      "pytest",
    ],
    links: {
      live: "https://best-footyforecast-victoria.streamlit.app/",
      github: `${GH}/footyforecast`,
    },
  },
  {
    id: "movemelbourne",
    title: "MoveMelbourne",
    org: "Independent train & tram reliability study",
    period: "Oct 2026 → Nov 2026",
    status: "collecting",
    categories: ["analytics-engineering", "bi"],
    roleFit: { analyst: 3, bi: 2, ae: 3, ds: 1, ai: 0 },
    tagline:
      "Victoria's GTFS-Realtime feeds vanish once served. I collect them every 60 seconds, join them to the timetable in force each day and infer when each train and tram really arrived.",
    headline: { value: "28 days", label: "Live collection study, 22 Oct – 19 Nov 2026" },
    metrics: [
      { value: "150", label: "dbt nodes passing in the star schema" },
      { value: "100%", label: "Trip match rate in the live feed test" },
      { value: "44", label: "pytest tests; full sample build offline" },
      { value: "Every 30 min", label: "GitHub Actions collector run" },
    ],
    problem:
      "There is no public archive of Melbourne's real-time feeds, so nobody outside the operator can check punctuality claims. The project measures it independently, with coverage and sample size on every figure.",
    approach: [
      "Collector polls metro and tram feeds every 60 s, writes 5-minute atomic Parquet checkpoints and publishes to a Hugging Face dataset.",
      "Versioned timetable join: each day uses the GTFS release in force, with past-midnight times and daylight saving handled exactly.",
      "Arrivals inferred from the latest prediction within 2 minutes of the stop, cross-checked with vehicle positions; unobserved stops are never imputed.",
      "dbt-on-DuckDB Kimball star: stop-event, trip and alert facts with incremental loads; marts for OTP, delay segments and tram bunching.",
      "Routes ranked by the lower bound of a trip-clustered bootstrap CI, not by raw averages.",
    ],
    results: [
      "Pipeline, tests, dbt docs site and dashboard are live; the dashboard shows a clearly labelled synthetic sample until real findings exist.",
      "Documented real feed behaviour: vehicle positions carry no stop or speed, metro times are whole minutes.",
    ],
    limits: [
      "No findings until at least 14 days are collected. Results publish after the study ends on 19 Nov 2026.",
      "On-time performance is a labelled proxy using the official windows, not the operator's own measure.",
    ],
    pendingNote:
      "Study in progress: headline findings publish after 19 Nov 2026, covering Melbourne Cup Day.",
    stack: [
      "Python",
      "GTFS / GTFS-Realtime",
      "DuckDB",
      "dbt",
      "SQL",
      "Data modelling (Kimball)",
      "Parquet",
      "Hugging Face Hub",
      "GitHub Actions",
      "Bootstrap & hypothesis tests",
      "Streamlit",
      "uv",
      "pytest",
    ],
    links: {
      github: `${GH}/movemelbourne`,
      docs: "https://karthikreddy-tanigundala.github.io/movemelbourne/",
      data: "https://huggingface.co/datasets/Karry001/movemelbourne-gtfsr",
    },
  },
  {
    id: "mental-health-equity",
    title: "Mental Health Access & Equity",
    org: "Power BI dashboard · AIHW + ABS SEIFA",
    period: "Jul 2026",
    status: "built",
    categories: ["bi"],
    roleFit: { analyst: 3, bi: 3, ae: 1, ds: 0, ai: 0 },
    tagline:
      "Twenty-seven years of AIHW mental-health expenditure overlaid with ABS SEIFA disadvantage, on a star schema, in a four-page Power BI report authored entirely as code.",
    headline: { value: "23", label: "DAX measures, including report-ready national handling" },
    metrics: [
      { value: "4", label: "Report pages: overview, equity, services, governance" },
      { value: "27 yrs", label: "Expenditure time series by state" },
      { value: "PBIR", label: "Pages generated as diffable JSON, no manual clicking" },
      { value: "RLS", label: "Row-level security role in the model" },
    ],
    problem:
      "Where is mental-health spending going, and does it follow socio-economic need? The brief assumed service-contact counts, which AIHW only publishes inside an embedded Tableau view.",
    approach: [
      "Verified the real data grain first and switched to recurrent expenditure, documenting why in a Phase 0 note.",
      "Medallion ETL in Python into a Kimball star schema with an equity overlay from ABS SEIFA 2021 (IRSD).",
      "Semantic model with 23 DAX measures and an RLS role, exported to TMDL inside a PBIP project.",
      "Report pages authored programmatically as PBIR JSON, plus a no-install HTML fallback dashboard.",
    ],
    results: [
      "National overview, regional equity deep-dive with per-capita vs IRSD scatter, service-type breakdown and a data-governance page.",
      "Whole report is reproducible and diffable in Git.",
    ],
    limits: [
      "State-level grain, so the equity analysis is ecological, not individual.",
      "Not yet published to the Power BI Service; walkthrough on request.",
    ],
    stack: [
      "Power BI",
      "DAX",
      "Power Query / M",
      "Row-level security",
      "PBIP / TMDL",
      "Data modelling (Kimball)",
      "Python",
      "pandas",
    ],
  },
  {
    id: "energytech-analytics",
    title: "Energy Consumption & Contract Analytics",
    org: "EnergyTech Global · Software Analyst",
    period: "Feb – Dec 2023",
    status: "production",
    categories: ["industry"],
    roleFit: { analyst: 2, bi: 2, ae: 1, ds: 1, ai: 0 },
    tagline:
      "Consumption dashboards and a contract-tracking system for Australian retailer ReAmped Energy and NZ retailer Electric Kiwi. Promoted from intern after four months.",
    headline: { value: "~15%", label: "Less project downtime via pipeline bottleneck analysis" },
    metrics: [
      { value: "AU + NZ", label: "Energy retailers supported" },
      { value: "4 mo", label: "Intern to Software Analyst" },
      { value: "3", label: "Junior interns mentored" },
    ],
    problem:
      "Retail energy operations needed live usage-pattern monitoring and billing-accuracy support across many tariff structures.",
    approach: [
      "Built Python and PostgreSQL pipelines behind Plotly/Dash consumption dashboards.",
      "Built a customer contract lifecycle tracking system with Flask and REST APIs.",
      "Analysed pipeline bottlenecks to reduce downtime.",
    ],
    results: [
      "Real-time consumption dashboards in production for ReAmped Energy and Electric Kiwi.",
      "~15% reduction in project downtime.",
    ],
    limits: ["Proprietary work: no public code."],
    stack: [
      "Python",
      "pandas",
      "PostgreSQL",
      "SQL",
      "Flask",
      "Plotly / Dash",
      "REST APIs",
      "Git / GitHub",
    ],
  },
  {
    id: "walert-tenancy-rag",
    title: "Tenancy-Rights RAG Chatbot",
    org: "RMIT Work-Integrated Learning · Walert research pipeline",
    period: "Semester 2 · 2025",
    status: "academic",
    categories: ["genai"],
    roleFit: { analyst: 0, bi: 0, ae: 0, ds: 1, ai: 2 },
    tagline:
      "Adapted RMIT's Walert conversational-agent research pipeline to answer international students' questions about Victoria's Residential Tenancies Regulations 2021.",
    headline: { value: "BM25 + dense", label: "Hybrid retrieval fused with RRF" },
    metrics: [
      { value: "331", label: "Page-aware chunks of the Regulations" },
      { value: "6", label: "Person team; I was a pipeline / RAG implementor" },
    ],
    problem:
      "Tenancy law is legalistic and hard for international students to navigate, and there is no structured dataset or ground truth to evaluate answers against.",
    approach: [
      "Reproduced the Walert RAG baseline (RMIT, CHIIR '24) end to end.",
      "Chunked the Regulations with page provenance; BM25 and MiniLM embeddings in FAISS, fused with Reciprocal Rank Fusion.",
      "Researched and drafted evaluation metrics (NDCG, BERTScore, ROUGE) and an accuracy-testing document.",
    ],
    results: [
      "Working hybrid retrieval pipeline over the full Regulations, ready for answer-level evaluation.",
    ],
    limits: ["Course project: evaluation was at research stage, not a released product."],
    team: "Group 75, six students",
    stack: [
      "Python",
      "RAG",
      "BM25",
      "FAISS",
      "Embeddings (sentence-transformers, bge)",
      "Prompt engineering",
    ],
  },
  {
    id: "portfolio-assistant",
    title: "This site's AI assistant",
    org: "Next.js · Gemini · Vercel",
    period: "May 2026, updated Oct 2026",
    status: "live",
    categories: ["genai"],
    roleFit: { analyst: 0, bi: 0, ae: 0, ds: 0, ai: 1 },
    tagline:
      "A first-person chat assistant grounded in this site's own project data, with streaming, rate limiting and graceful fallbacks.",
    headline: { value: "1 source", label: "Cards, toolkit and chat all read the same data file" },
    metrics: [
      { value: "Edge", label: "Streaming responses from a Vercel Edge route" },
      { value: "Rate-limited", label: "Upstash Redis per-IP limiter" },
    ],
    problem:
      "Recruiters have specific questions a static page can't answer, like 'have you used dbt in production?'",
    approach: [
      "The knowledge base is generated from the same project data as the page, so the assistant can't drift from what the site shows.",
      "For a profile this small, prompt-stuffing beats a vector DB: no retrieval latency and no chunking artefacts. AusPolicyRAG is the full-retrieval version.",
    ],
    results: ["Answers in first person, cites projects and declines to guess beyond the profile."],
    limits: ["Free-tier Gemini quota; falls back to an email prompt if exhausted."],
    stack: [
      "Next.js / TypeScript",
      "Tailwind CSS",
      "Vercel AI SDK",
      "Gemini API",
      "Prompt engineering",
      "Vercel",
    ],
    links: { github: `${GH}/karthik-portfolio` },
  },
];

export const PROJECT_BY_ID: Record<string, Project> = Object.fromEntries(
  projects.map((p) => [p.id, p])
);

/** Projects ranked for a role; ties keep the curated order. */
export function rankForRole(list: Project[], role: RoleId | null): Project[] {
  if (!role) return list;
  return list
    .map((p, i) => ({ p, i }))
    .sort((a, b) => b.p.roleFit[role] - a.p.roleFit[role] || a.i - b.i)
    .map(({ p }) => p);
}

export function projectsUsing(tool: string): Project[] {
  return projects.filter((p) => p.stack.includes(tool));
}
