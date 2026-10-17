export default function StoreButton({ icon, label, name, onClick }) {
  return <button onClick={onClick} className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-left text-[#121c2a] shadow-lg transition hover:bg-[#f8f9ff]"><span className="material-symbols-outlined text-2xl">{icon}</span><span><span className="block text-[11px] text-[#5c403c]">{label}</span><span className="block text-sm font-bold">{name}</span></span></button>;
}
