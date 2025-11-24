"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EasingType, NAMED_EASINGS } from "@/utils/easing";

interface AnimationPreviewProps {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  rotate: number;
  duration: number;
  delay: number;
  easing: EasingType | "custom";
  customBezier: [number, number, number, number];
  isGsap: boolean;
  loop: boolean;
  yoyo: boolean;
  playTrigger: number;
}

export function AnimationPreview({
  x,
  y,
  scale,
  opacity,
  rotate,
  duration,
  delay,
  easing,
  customBezier,
  isGsap,
  loop,
  yoyo,
  playTrigger,
}: AnimationPreviewProps) {
  const gsapBoxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Animation
  useGSAP(() => {
    if (!isGsap || !gsapBoxRef.current) return;

    // Determine easing string
    let easeString = "power1.inOut";
    if (easing === "custom") {
      easeString = `M0,0 C${customBezier.join(",")} 1,1`; 
    } else {
       const map: Record<string, string> = {
        linear: "none",
        easeIn: "power1.in",
        easeOut: "power1.out",
        easeInOut: "power1.inOut",
        circIn: "circ.in",
        circOut: "circ.out",
        circInOut: "circ.inOut",
        backIn: "back.in",
        backOut: "back.out",
        backInOut: "back.inOut",
        anticipate: "back.in(1.7)",
      };
      easeString = map[easing] || "power1.inOut";
    }

    // Reset and animate
    gsap.killTweensOf(gsapBoxRef.current);
    gsap.set(gsapBoxRef.current, { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0 });
    
    gsap.to(gsapBoxRef.current, {
      x,
      y,
      scale,
      opacity,
      rotation: rotate,
      duration,
      delay,
      ease: easeString,
      repeat: loop ? -1 : 0,
      yoyo: yoyo,
    });

  }, { dependencies: [x, y, scale, opacity, rotate, duration, delay, easing, customBezier, isGsap, loop, yoyo, playTrigger], scope: containerRef });

  // Framer Motion Easing
  const activeEasing = easing === "custom" ? customBezier : easing;

  return (
    <div className="flex items-center justify-center w-full h-full bg-muted/10 rounded-xl border overflow-hidden relative" ref={containerRef}>
      <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-[0.05] pointer-events-none">
        {[...Array(400)].map((_, i) => (
          <div key={i} className="border-[0.5px] border-foreground" />
        ))}
      </div>

      {isGsap ? (
        <div
          ref={gsapBoxRef}
          className="w-24 h-24 bg-primary rounded-xl shadow-lg flex items-center justify-center text-primary-foreground font-bold text-xs"
        >
          GSAP
        </div>
      ) : (
        <motion.div
          key={playTrigger + JSON.stringify({ x, y, scale, opacity, rotate, duration, delay, easing, customBezier, loop, yoyo })} // Force re-render for replay
          initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
          animate={{ x, y, scale, opacity, rotate }}
          transition={{
            duration,
            delay,
            ease: activeEasing,
            repeat: loop ? Infinity : 0,
            repeatType: yoyo ? "reverse" : "loop",
          }}
          className="w-24 h-24 bg-primary rounded-xl shadow-lg flex items-center justify-center text-primary-foreground font-bold text-xs"
        >
          Framer
        </motion.div>
      )}
    </div>
  );
}
