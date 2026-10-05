import React from 'react';

export const AvailabilityBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-2.5 h-[34px] px-3.5 rounded-full bg-[#08080C]/85 border border-white/10 backdrop-blur-md text-[11px] font-mono-tech tracking-wider text-[#A1A1AA] w-fit shadow-sm select-none">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981] shadow-[0_0_8px_#10B981]" />
      </span>
      <span className="uppercase tracking-[0.14em] text-[#E4E4E7] font-medium text-[10.5px]">
        AVAILABLE FOR SOFTWARE ENGINEERING ROLES
      </span>
    </div>
  );
};

export default AvailabilityBadge;
