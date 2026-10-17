export default function Eyebrow({ children, color = 'red' }) {
  const colors = {
    red: 'text-[#b70011]',
    green: 'text-[#006e2d]',
    lime: 'text-[#7ffc97]',
  };

  return <span className={`block text-sm font-bold uppercase tracking-widest ${colors[color]}`}>{children}</span>;
}
