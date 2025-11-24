"use client";

import React, { useState, useEffect } from "react";
import { motion, Easing } from "framer-motion";
import { EasingGraph } from "./EasingGraph";
import { NAMED_EASINGS, EASING_DESCRIPTIONS, EasingType } from "@/utils/easing";
import { Play, RotateCcw, Pause } from "lucide-react";

export function Playground() {
  const [selectedEasing, setSelectedEasing] = useState<EasingType | "custom">("easeInOut");
  const [customBezier, setCustomBezier] = useState<[number, number, number, number]>([0.42, 0, 0.58, 1]);
  const [duration, setDuration] = useState(1);
  const [distance, setDistance] = useState(300); // pixels
  const [loop, setLoop] = useState(false);
  const [yoyo, setYoyo] = useState(false);
  const [key, setKey] = useState(0); // To force re-render for animation replay
  const [isPlaying, setIsPlaying] = useState(false);

  // Derived easing value for Framer Motion
  const activeEasing: Easing = selectedEasing === "custom" ? customBezier : selectedEasing;

  const handlePlay = () => {
    setKey(prev => prev + 1);
    setIsPlaying(true);
  };

  const handleCustomChange = (index: number, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      const newBezier = [...customBezier] as [number, number, number, number];
      newBezier[index] = num;
      setCustomBezier(newBezier);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto p-4 lg:p-8">
      {/* Controls Panel */}
      <div className="w-full lg:w-1/3 space-y-8 bg-card p-6 rounded-xl border shadow-sm h-fit">
        <div>
          <h2 className="text-xl font-semibold mb-4">Controls</h2>
          
          {/* Easing Selector */}
          <div className="space-y-2 mb-6">
            <label className="text-sm font-medium text-muted-foreground">Easing Function</label>
            <select 
              className="w-full p-2 rounded-md border bg-background"
              value={selectedEasing}
              onChange={(e) => setSelectedEasing(e.target.value as EasingType | "custom")}
            >
              <option value="custom">Custom Cubic Bezier</option>
              {Object.keys(NAMED_EASINGS).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            {selectedEasing !== "custom" && (
              <p className="text-xs text-muted-foreground mt-1">
                {EASING_DESCRIPTIONS[selectedEasing as EasingType]}
              </p>
            )}
          </div>

          {/* Custom Bezier Inputs */}
          {selectedEasing === "custom" && (
            <div className="space-y-2 mb-6 p-4 bg-muted/50 rounded-lg">
              <label className="text-sm font-medium text-muted-foreground">Cubic Bezier Points</label>
              <div className="grid grid-cols-4 gap-2">
                {customBezier.map((val, i) => (
                  <div key={i}>
                    <label className="text-xs text-muted-foreground block mb-1">
                      {i === 0 ? "x1" : i === 1 ? "y1" : i === 2 ? "x2" : "y2"}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={val}
                      onChange={(e) => handleCustomChange(i, e.target.value)}
                      className="w-full p-1 text-sm rounded border bg-background text-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Duration Slider */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-muted-foreground">Duration</label>
              <span className="text-sm font-mono">{duration}s</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={duration}
              onChange={(e) => setDuration(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          {/* Distance Slider */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-muted-foreground">Distance</label>
              <span className="text-sm font-mono">{distance}px</span>
            </div>
            <input
              type="range"
              min="100"
              max="600"
              step="10"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          {/* Toggles */}
          <div className="flex gap-4 mb-8">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input 
                type="checkbox" 
                checked={loop} 
                onChange={(e) => setLoop(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              Loop
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input 
                type="checkbox" 
                checked={yoyo} 
                onChange={(e) => setYoyo(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              Yoyo (Reverse)
            </label>
          </div>

          {/* Play Button */}
          <button
            onClick={handlePlay}
            className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-md font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Play size={18} />
            Play Animation
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="flex-1 space-y-8">
        {/* Animation Box */}
        <div className="bg-card rounded-xl border shadow-sm p-8 min-h-[300px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-4 left-4 text-xs font-mono text-muted-foreground">Preview</div>
          
          {/* Track */}
          <div className="w-full h-1 bg-muted rounded-full mb-8 relative">
             {/* Markers */}
             <div className="absolute top-2 left-0 text-[10px] text-muted-foreground">0%</div>
             <div className="absolute top-2 right-0 text-[10px] text-muted-foreground">100%</div>
          </div>

          {/* Moving Object */}
          <div className="relative w-full">
            <motion.div
              key={key} // Force re-render to restart animation
              className="w-12 h-12 bg-primary rounded-full shadow-lg relative z-10"
              initial={{ x: 0 }}
              animate={{ 
                x: distance,
              }}
              transition={{
                duration: duration,
                ease: activeEasing,
                repeat: loop ? Infinity : 0,
                repeatType: yoyo ? "reverse" : "loop",
              }}
            />
            {/* Ghost/Target position marker */}
            <div 
              className="absolute top-0 w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 pointer-events-none"
              style={{ left: distance }}
            />
          </div>
        </div>

        {/* Graph Visualization */}
        <div className="bg-card rounded-xl border shadow-sm p-8 flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="text-sm font-medium text-muted-foreground mb-6 self-start">Easing Curve</h3>
          <div className="w-full max-w-[400px] aspect-square bg-muted/10 rounded-lg p-4">
            <EasingGraph 
              easing={activeEasing} 
              width={360} 
              height={360} 
              className="w-full h-full text-primary"
            />
          </div>
          <div className="mt-4 text-xs font-mono text-muted-foreground">
            {selectedEasing === "custom" 
              ? `cubic-bezier(${customBezier.join(", ")})`
              : selectedEasing}
          </div>
        </div>
      </div>
    </div>
  );
}
