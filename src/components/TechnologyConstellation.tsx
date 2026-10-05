import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface ConstellationNode {
  id: string;
  name: string;
  category: string;
  role: string;
  isPrimary: boolean;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  connections: string[];
}

export const CONSTELLATION_NODES: ConstellationNode[] = [
  // Primary Architecture Nodes
  { id: 'react', name: 'React', category: 'Frontend', role: 'Component Architecture & Virtual DOM', isPrimary: true, x: 26, y: 26, connections: ['ts', 'tailwind', 'zustand', 'redux'] },
  { id: 'ts', name: 'TypeScript', category: 'Language', role: 'Static Typing & Compile-time Safety', isPrimary: true, x: 50, y: 16, connections: ['react', 'node', 'express'] },
  { id: 'node', name: 'Node.js', category: 'Backend', role: 'Event-driven Asynchronous Runtime', isPrimary: true, x: 74, y: 26, connections: ['express', 'ts', 'docker'] },
  { id: 'mongo', name: 'MongoDB', category: 'Database', role: 'NoSQL Document Store & Aggregation', isPrimary: true, x: 58, y: 74, connections: ['express', 'node'] },
  { id: 'express', name: 'Express.js', category: 'Backend', role: 'RESTful Middleware & Routing Engine', isPrimary: true, x: 68, y: 48, connections: ['node', 'mongo', 'mysql', 'postman'] },
  { id: 'docker', name: 'Docker', category: 'DevOps', role: 'Multi-stage Containerization', isPrimary: true, x: 50, y: 86, connections: ['git', 'node'] },

  // Secondary Ecosystem Nodes
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', role: 'Utility-first Modern Styling', isPrimary: false, x: 16, y: 38, connections: ['react'] },
  { id: 'redux', name: 'Redux Toolkit', category: 'Frontend', role: 'Predictable Global State Container', isPrimary: false, x: 18, y: 62, connections: ['react'] },
  { id: 'zustand', name: 'Zustand', category: 'Frontend', role: 'Minimalist Reactive Store Optimization', isPrimary: false, x: 34, y: 46, connections: ['react'] },
  { id: 'postman', name: 'Postman', category: 'API Testing', role: 'Endpoint Validation & Contract Testing', isPrimary: false, x: 84, y: 60, connections: ['express'] },
  { id: 'git', name: 'Git', category: 'DevOps', role: 'Distributed Version Control & Workflows', isPrimary: false, x: 36, y: 78, connections: ['docker'] },
  { id: 'mysql', name: 'MySQL', category: 'Database', role: 'Relational Schema & Transactions', isPrimary: false, x: 78, y: 72, connections: ['express'] },
];

export const TechnologyConstellation: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const activeNodeId = selectedNode || hoveredNode;
  const activeNodeData = CONSTELLATION_NODES.find((n) => n.id === activeNodeId);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6; // -3 to 3 deg
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 6; // -3 to 3 deg
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    if (!selectedNode) setHoveredNode(null);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
      }}
      className="w-full relative"
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-[540px] sm:h-[600px] rounded-3xl bg-[#0D0F14] border border-white/[0.08] p-4 sm:p-8 overflow-hidden select-none shadow-2xl"
        onClick={() => setSelectedNode(null)}
      >
        {/* Background Grid & Vignette */}
        <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0D0F14]/50 to-[#08090C] pointer-events-none" />

        {/* SVG Connecting Lines Canvas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="constellationLineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C084FC" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Radial Lines from Center Core to Key Anchors */}
          {['react', 'node', 'ts', 'express', 'mongo', 'docker'].map((nodeId) => {
            const node = CONSTELLATION_NODES.find((n) => n.id === nodeId);
            if (!node) return null;
            const isHighlight =
              activeNodeId === null || activeNodeId === nodeId;
            return (
              <line
                key={`center-${nodeId}`}
                x1="50%"
                y1="50%"
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke={activeNodeId === nodeId ? 'url(#constellationLineGlow)' : 'rgba(255,255,255,0.08)'}
                strokeWidth={activeNodeId === nodeId ? '2' : '1'}
                strokeDasharray={activeNodeId === nodeId ? 'none' : '3 3'}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Node-to-Node Interconnects */}
          {CONSTELLATION_NODES.map((node) =>
            node.connections.map((targetId) => {
              const target = CONSTELLATION_NODES.find((n) => n.id === targetId);
              if (!target) return null;
              const isHighlight =
                activeNodeId === node.id || activeNodeId === targetId;

              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke={isHighlight ? '#8B5CF6' : 'rgba(255, 255, 255, 0.05)'}
                  strokeWidth={isHighlight ? '1.8' : '0.8'}
                  className="transition-all duration-300"
                />
              );
            })
          )}
        </svg>

        {/* Central Constellation Core: MANI FULL STACK */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#08090C] border border-[#8B5CF6]/60 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(139,92,246,0.3)]">
            <span className="font-mono-tech text-[10px] tracking-widest text-[#8B5CF6] uppercase font-bold">
              MANI
            </span>
            <span className="font-display text-xs sm:text-sm font-black text-white tracking-wider uppercase mt-0.5">
              FULL STACK
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shadow-[0_0_8px_#10B981]" />
          </div>
        </div>

        {/* Surrounding Constellation Technology Nodes */}
        {CONSTELLATION_NODES.map((node) => {
          const isSelected = selectedNode === node.id;
          const isHovered = hoveredNode === node.id;
          const isActive = isSelected || isHovered;
          const isConnected =
            activeNodeId !== null &&
            (node.connections.includes(activeNodeId) ||
              CONSTELLATION_NODES.find((n) => n.id === activeNodeId)?.connections.includes(node.id));

          return (
            <div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNode(isSelected ? null : node.id);
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.14 : isConnected ? 1.05 : 1,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`px-3 py-1.5 rounded-xl transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#11131A] border-[#8B5CF6] shadow-[0_0_25px_rgba(139,92,246,0.45)] text-white'
                    : isConnected
                    ? 'bg-[#0D0F14] border-[#8B5CF6]/50 text-white'
                    : node.isPrimary
                    ? 'bg-[#08090C]/95 border-white/[0.12] text-[#F5F5F5] hover:text-white hover:border-[#8B5CF6]/40'
                    : 'bg-[#08090C]/85 border-white/[0.06] text-[#9A9DA6] hover:text-white'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive || isConnected
                      ? 'bg-[#8B5CF6]'
                      : node.isPrimary
                      ? 'bg-[#A855F7]'
                      : 'bg-white/20'
                  }`}
                />
                <span className={`font-mono-tech text-xs whitespace-nowrap ${node.isPrimary ? 'font-bold' : 'font-medium'}`}>
                  {node.name}
                </span>
              </motion.div>
            </div>
          );
        })}

        {/* Active Node Metadata Inspector Tooltip at Bottom */}
        <div className="absolute bottom-5 left-6 right-6 sm:left-8 sm:right-auto z-30 pointer-events-auto">
          <AnimatePresence mode="wait">
            {activeNodeData ? (
              <motion.div
                key={activeNodeData.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="p-4 rounded-xl bg-[#08090C]/95 border border-[#8B5CF6]/40 backdrop-blur-md shadow-2xl flex items-center gap-4 max-w-md"
              >
                <div className="p-2.5 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] font-mono-tech text-xs font-bold shrink-0">
                  &lt;/&gt;
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-base font-bold text-white">
                      {activeNodeData.name}
                    </span>
                    <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-[#11131A] text-[#C084FC] border border-white/5 uppercase">
                      {activeNodeData.isPrimary ? 'Primary Core' : 'Secondary'}
                    </span>
                  </div>
                  <p className="text-xs text-[#9A9DA6] mt-0.5 font-sans">
                    {activeNodeData.role}
                  </p>
                  <div className="font-mono-tech text-[11px] text-[#9A9DA6] mt-1">
                    Category: <span className="text-[#8B5CF6]">{activeNodeData.category}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-xs font-mono-tech text-[#9A9DA6]/70">
                // Hover or click nodes to focus architecture cluster
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TechnologyConstellation;
