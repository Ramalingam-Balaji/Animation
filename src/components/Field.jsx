const fieldStyle = 'mt-1 w-full rounded-lg bg-[#eff4ff] px-4 py-3 text-sm text-[#121c2a] outline-none transition focus:ring-2 focus:ring-[#b70011]';

export default function Field({ label, name, type = 'text', ...props }) {
  return <label className="block text-xs font-semibold text-[#121c2a]">{label}<input className={fieldStyle} name={name} type={type} {...props} /></label>;
}

export { fieldStyle };
