export default function Feature({ icon, title, children }) {
  return <div className="flex items-start gap-3"><div className="rounded-xl bg-[#b70011]/10 p-3 text-[#b70011]"><span className="material-symbols-outlined">{icon}</span></div><div><h3 className="mb-1 text-base font-semibold text-[#121c2a]">{title}</h3><p className="text-xs leading-5 text-[#5c403c]">{children}</p></div></div>;
}
