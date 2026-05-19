import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Karthik Reddy — Data Analyst, Melbourne";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0A0B0D",
          color: "#F5F5F0",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "20px",
            color: "#8A8A82",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          <div>Karthik Reddy</div>
          <div>Melbourne · AU</div>
        </div>

        {/* Centre content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <div
            style={{
              fontSize: "96px",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              maxWidth: "950px",
            }}
          >
            Data Analyst.{" "}
            <span style={{ color: "#2563EB" }}>Shipping production AI</span>{" "}
            for Australian industry.
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#C8C8C0",
              fontFamily: "sans-serif",
            }}
          >
            Master of Data Science @ RMIT · ex-Zelis Healthcare · ex-EnergyTech
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "22px",
            color: "#8A8A82",
            fontFamily: "monospace",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            <div>
              <div style={{ color: "#F59E0B", fontSize: "18px" }}>CGPA</div>
              <div style={{ color: "#F5F5F0", fontSize: "32px" }}>8.50</div>
            </div>
            <div>
              <div style={{ color: "#F59E0B", fontSize: "18px" }}>EXP</div>
              <div style={{ color: "#F5F5F0", fontSize: "32px" }}>2+ yrs</div>
            </div>
            <div>
              <div style={{ color: "#F59E0B", fontSize: "18px" }}>485 ELIGIBLE</div>
              <div style={{ color: "#F5F5F0", fontSize: "32px" }}>Nov 2026</div>
            </div>
          </div>
          <div>karthik-reddy.vercel.app</div>
        </div>
      </div>
    ),
    { ...size }
  );
}