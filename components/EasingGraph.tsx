"use client";

import React, { useMemo } from "react";
import { Easing } from "framer-motion";
import { generateEasingPath } from "@/utils/easing";
import { motion } from "framer-motion";

interface EasingGraphProps {
  easing: Easing;
  width?: number;
  height?: number;
  className?: string;
}

export function EasingGraph({ easing, width = 300, height = 300, className }: EasingGraphProps) {
  const pathData = useMemo(() => {
    return generateEasingPath(easing, width, height);
  }, [easing, width, height]);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Grid background */}
      <svg width={width} height={height} className="absolute inset-0 pointer-events-none opacity-20">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Axis */}
        <line x1="0" y1={height} x2={width} y2={height} stroke="currentColor" strokeWidth="2" />
        <line x1="0" y1={0} x2={0} y2={height} stroke="currentColor" strokeWidth="2" />
      </svg>

      {/* Easing Curve */}
      <svg width={width} height={height} className="absolute inset-0 overflow-visible">
        <motion.path
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-primary"
        />
        
        {/* Control Points Visualization (only for cubic bezier arrays) */}
        {Array.isArray(easing) && easing.length === 4 && (
          <>
            {/* Lines to control points */}
            <line 
              x1={0} 
              y1={height} 
              x2={easing[0] * width} 
              y2={height - (easing[1] * height)} 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeDasharray="4 4" 
              className="text-muted-foreground opacity-50"
            />
            <line 
              x1={width} 
              y1={0} 
              x2={easing[2] * width} 
              y2={height - (easing[3] * height)} 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeDasharray="4 4" 
              className="text-muted-foreground opacity-50"
            />
            
            {/* Control Points */}
            <circle cx={easing[0] * width} cy={height - (easing[1] * height)} r="4" className="fill-primary" />
            <circle cx={easing[2] * width} cy={height - (easing[3] * height)} r="4" className="fill-primary" />
          </>
        )}
      </svg>
    </div>
  );
}
