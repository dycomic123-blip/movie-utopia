import React from 'react';

export const Navigation: React.FC = () => {
  const items = [
    { label: "Vision", href: "#vision" },
    { label: "The Engine", href: "#engine" },
    { label: "Access", href: "#access" }
  ];
  
  return (
    <ul className="flex flex-col items-end gap-2">
      {items.map((item, index) => (
        <li key={index} className="overflow-hidden group">
          <a 
            href={item.href} 
            className="relative block font-['Oswald'] uppercase tracking-[0.2em] text-[10px] md:text-xs text-neutral-500 hover:text-white transition-colors duration-500"
          >
            <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                {item.label}
            </span>
            <span className="absolute top-full left-0 transition-transform duration-500 group-hover:-translate-y-full text-white whitespace-nowrap">
                {item.label}
            </span>
          </a>
        </li>
      ))}
      <li className="mt-4 w-8 h-[1px] bg-white/20"></li>
    </ul>
  );
};