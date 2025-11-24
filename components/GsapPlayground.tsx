"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { EasingGraph } from "./EasingGraph";
import { NAMED_EASINGS, EASING_DESCRIPTIONS, EasingType } from "@/utils/easing";
import { Play, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Easing } from "framer-motion";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, CustomEase);

export function GsapPlayground() {
  const [selectedEasing, setSelectedEasing] = useState<EasingType | "custom">("easeInOut");
  const [customBezier, setCustomBezier] = useState<[number, number, number, number]>([0.42, 0, 0.58, 1]);
  const [duration, setDuration] = useState(1);
  const [distance, setDistance] = useState(300); // pixels
  const [loop, setLoop] = useState(false);
  const [yoyo, setYoyo] = useState(false);
  
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Derived easing value for Framer Motion (for the graph)
  const activeEasing: Easing = selectedEasing === "custom" ? customBezier : selectedEasing;

  // GSAP Animation Logic
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handlePlay = contextSafe(() => {
    if (!boxRef.current) return;

    // Kill existing animations
    gsap.killTweensOf(boxRef.current);
    
    // Reset position
    gsap.set(boxRef.current, { x: 0 });

    let easeString = "";
    if (selectedEasing === "custom") {
      // Create custom ease
      const easeName = "customEase";
      CustomEase.create(easeName, `M0,0 C${customBezier[0]},${customBezier[1]} ${customBezier[2]},${customBezier[3]} 1,1`);
      easeString = easeName;
    } else {
      // Map framer motion easing names to GSAP equivalents where possible, or use standard GSAP names
      // For simplicity in this demo, we'll map common ones or fallback to power1.inOut
      // A more robust mapping would be needed for 1:1 parity
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
        anticipate: "back.in(1.7)", // Approx
      };
      easeString = map[selectedEasing] || "power1.inOut";
    }

    gsap.to(boxRef.current, {
      x: distance,
      duration: duration,
      ease: easeString,
      repeat: loop ? -1 : 0,
      yoyo: yoyo,
    });
  });

  const handleCustomChange = (index: number, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      const newBezier = [...customBezier] as [number, number, number, number];
      newBezier[index] = num;
      setCustomBezier(newBezier);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto p-4 lg:p-8" ref={containerRef}>
      {/* Controls Panel */}
      <Card className="w-full lg:w-1/3 h-fit">
        <CardHeader>
          <CardTitle>GSAP Controls</CardTitle>
          <CardDescription>Adjust animation parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Easing Selector */}
          <div className="space-y-2">
            <Label>Easing Function</Label>
            <Select 
              value={selectedEasing} 
              onValueChange={(val) => setSelectedEasing(val as EasingType | "custom")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select easing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom Cubic Bezier</SelectItem>
                {Object.keys(NAMED_EASINGS).map((key) => (
                  <SelectItem key={key} value={key}>{key}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedEasing !== "custom" && (
              <p className="text-xs text-muted-foreground">
                {EASING_DESCRIPTIONS[selectedEasing as EasingType]}
              </p>
            )}
          </div>

          {/* Custom Bezier Inputs */}
          {selectedEasing === "custom" && (
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg border">
              <Label>Cubic Bezier Points</Label>
              <div className="grid grid-cols-4 gap-2">
                {customBezier.map((val, i) => (
                  <div key={i} className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      {i === 0 ? "x1" : i === 1 ? "y1" : i === 2 ? "x2" : "y2"}
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={val}
                      onChange={(e) => handleCustomChange(i, e.target.value)}
                      className="h-8 px-2 text-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Duration Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Duration</Label>
              <span className="text-sm font-mono text-muted-foreground">{duration}s</span>
            </div>
            <Slider
              min={0.1}
              max={5}
              step={0.1}
              value={[duration]}
              onValueChange={(vals) => setDuration(vals[0])}
            />
          </div>

          {/* Distance Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Distance</Label>
              <span className="text-sm font-mono text-muted-foreground">{distance}px</span>
            </div>
            <Slider
              min={100}
              max={600}
              step={10}
              value={[distance]}
              onValueChange={(vals) => setDistance(vals[0])}
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <Switch id="loop" checked={loop} onCheckedChange={setLoop} />
              <Label htmlFor="loop">Loop</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="yoyo" checked={yoyo} onCheckedChange={setYoyo} />
              <Label htmlFor="yoyo">Yoyo</Label>
            </div>
          </div>

          {/* Play Button */}
          <Button onClick={handlePlay} className="w-full" size="lg">
            <Play className="mr-2 h-4 w-4" />
            Play Animation
          </Button>
        </CardContent>
      </Card>

      {/* Preview Panel */}
      <div className="flex-1 space-y-6">
        {/* Animation Box */}
        <Card className="min-h-[300px] relative overflow-hidden">
          <CardHeader>
             <CardTitle className="text-sm font-mono text-muted-foreground">Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center min-h-[200px] pt-0">
            {/* Track */}
            <div className="w-full h-1 bg-muted rounded-full mb-12 relative mt-8">
               <div className="absolute -top-6 left-0 text-xs text-muted-foreground">0%</div>
               <div className="absolute -top-6 right-0 text-xs text-muted-foreground">100%</div>
            </div>

            {/* Moving Object */}
            <div className="relative w-full">
              <div
                ref={boxRef}
                className="w-12 h-12 bg-primary rounded-lg shadow-lg relative z-10 flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-primary-foreground/50 rounded-full" />
              </div>
              
              {/* Ghost/Target position marker */}
              <div 
                className="absolute top-0 w-12 h-12 rounded-lg border-2 border-dashed border-muted-foreground/30 pointer-events-none"
                style={{ left: distance }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Graph Visualization */}
        <Card className="flex flex-col items-center justify-center min-h-[400px]">
          <CardHeader className="self-start w-full">
            <CardTitle className="text-sm font-medium text-muted-foreground">Easing Curve</CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <div className="w-full max-w-[400px] aspect-square bg-muted/5 rounded-lg p-6 border">
              <EasingGraph 
                easing={activeEasing} 
                width={350} 
                height={350} 
                className="w-full h-full text-primary"
              />
            </div>
            <div className="mt-6 w-full space-y-4">
              <div className="p-3 bg-muted rounded-md text-xs font-mono text-muted-foreground break-all">
                {selectedEasing === "custom" 
                  ? `ease: CustomEase.create("custom", "M0,0 C${customBezier.join(",")}, 1,1")`
                  : `ease: "${selectedEasing}"`}
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  const code = selectedEasing === "custom" 
                    ? `ease: CustomEase.create("custom", "M0,0 C${customBezier.join(",")}, 1,1")`
                    : `ease: "${selectedEasing}"`;
                  navigator.clipboard.writeText(code);
                  toast.success("GSAP Code copied to clipboard!");
                }}
              >
                Copy GSAP Snippet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
