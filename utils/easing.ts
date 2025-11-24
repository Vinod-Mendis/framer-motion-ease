import { Easing } from "framer-motion";

export type EasingType = 
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate";

export const NAMED_EASINGS: Record<EasingType, Easing> = {
  linear: "linear",
  easeIn: "easeIn",
  easeOut: "easeOut",
  easeInOut: "easeInOut",
  circIn: "circIn",
  circOut: "circOut",
  circInOut: "circInOut",
  backIn: "backIn",
  backOut: "backOut",
  backInOut: "backInOut",
  anticipate: "anticipate",
};

export const EASING_DESCRIPTIONS: Record<EasingType, string> = {
  linear: "Constant speed",
  easeIn: "Starts slow, ends fast",
  easeOut: "Starts fast, ends slow",
  easeInOut: "Starts slow, speeds up, ends slow",
  circIn: "Circular curve, starts slow",
  circOut: "Circular curve, ends slow",
  circInOut: "Circular curve, slow start and end",
  backIn: "Pull back before moving forward",
  backOut: "Overshoot and settle",
  backInOut: "Pull back, move forward, overshoot, settle",
  anticipate: "Anticipates the motion",
};

export const NAMED_EASING_BEZIERS: Partial<Record<EasingType, [number, number, number, number]>> = {
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  circIn: [0.55, 0, 1, 0.45], // Approx
  circOut: [0, 0.55, 0.45, 1], // Approx
  circInOut: [0.85, 0, 0.15, 1], // Approx
  // back/anticipate are not cubic beziers
};

// Helper to generate SVG path data by sampling the easing function
export function generateEasingPath(easing: Easing, width: number, height: number, samples: number = 100): string {
  // Resolve easing function
  if (typeof easing === "string") {
    // Better approach: Use the cubic bezier map if available
    if (easing in NAMED_EASING_BEZIERS) {
      const bezier = NAMED_EASING_BEZIERS[easing as EasingType];
      if (bezier) {
        return getCubicBezierPath(bezier[0], bezier[1], bezier[2], bezier[3], width, height);
      }
    }
  } else if (Array.isArray(easing) && easing.length === 4) {
    // Cubic bezier array
    return getCubicBezierPath(easing[0], easing[1], easing[2], easing[3], width, height);
  }

  // Fallback for non-bezier or unknown easings
  // For now, return a linear path or a default curve
  // In a real app, we might sample the function if we had access to the raw math functions
  return getCubicBezierPath(0.42, 0, 0.58, 1, width, height); 
}

export function getCubicBezierPath(x1: number, y1: number, x2: number, y2: number, width: number, height: number): string {
  // Scale points to width/height
  // Y is inverted in SVG (0 is top), so we map 0->height, 1->0
  const sx = (v: number) => v * width;
  const sy = (v: number) => height - (v * height);

  const startX = sx(0);
  const startY = sy(0);
  const endX = sx(1);
  const endY = sy(1);
  
  const cp1X = sx(x1);
  const cp1Y = sy(y1);
  const cp2X = sx(x2);
  const cp2Y = sy(y2);

  return `M ${startX},${startY} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`;
}
