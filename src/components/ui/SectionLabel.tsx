import React from 'react';

interface SectionLabelProps {
  label: string;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ label, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11131A] border border-white/10 text-xs tracking-wider uppercase text-[#8B8F98] font-mono-tech ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
      <span>{label}</span>
    </div>
  );
};
