export default function SectionTag({ children, orange = false }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
        orange
          ? "bg-orange-100 text-orange-600"
          : "bg-green-100 text-protein-green"
      }`}
    >
      {children}
    </span>
  );
}