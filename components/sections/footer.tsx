export function Footer() {
  return (
    <footer className="border-t border-hairline px-4 sm:px-6 md:px-10 lg:px-16 py-10">
      <div className="container-page flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[13px]">
        <p className="text-bone-mute">
          © {new Date().getFullYear()} Karthik Reddy Tanigundala · Melbourne,
          Australia · Synthetic data is labelled wherever it appears
        </p>
        <p className="font-mono text-[11px] text-bone-mute uppercase tracking-[0.14em]">
          Next.js · Tailwind · Gemini · built end to end
        </p>
      </div>
    </footer>
  );
}