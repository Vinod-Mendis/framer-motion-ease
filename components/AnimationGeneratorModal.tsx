"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AnimationPreview } from "./AnimationPreview";
import { CodeBlock } from "./CodeBlock";
import { NAMED_EASINGS, EasingType } from "@/utils/easing";
import { Wand2, Play, RotateCcw } from "lucide-react";

export function AnimationGeneratorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGsap, setIsGsap] = useState(false);
  
  // Animation State
  const [x, setX] = useState(100);
  const [y, setY] = useState(0);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [duration, setDuration] = useState(0.5);
  const [delay, setDelay] = useState(0);
  const [easing, setEasing] = useState<EasingType | "custom">("easeInOut");
  const [customBezier, setCustomBezier] = useState<[number, number, number, number]>([0.42, 0, 0.58, 1]);
  const [loop, setLoop] = useState(false);
  const [yoyo, setYoyo] = useState(false);
  const [playTrigger, setPlayTrigger] = useState(0);

  const handleCustomChange = (index: number, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      const newBezier = [...customBezier] as [number, number, number, number];
      newBezier[index] = num;
      setCustomBezier(newBezier);
    }
  };

  const handlePlay = () => {
    setPlayTrigger(prev => prev + 1);
  };

  // Code Generation Logic
  const generateCode = () => {
    if (isGsap) {
      let easeString = "";
      if (easing === "custom") {
        easeString = `CustomEase.create("custom", "M0,0 C${customBezier.join(",")}, 1,1")`;
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
        easeString = `"${map[easing] || "power1.inOut"}"`;
      }

      return `// GSAP Animation
useGSAP(() => {
  gsap.to(targetRef.current, {
    x: ${x},
    y: ${y},
    scale: ${scale},
    opacity: ${opacity},
    rotation: ${rotate},
    duration: ${duration},
    delay: ${delay},
    ease: ${easeString},
    repeat: ${loop ? -1 : 0},
    yoyo: ${yoyo},
  });
});`;
    } else {
      const easeValue = easing === "custom" 
        ? `[${customBezier.join(", ")}]` 
        : `"${easing}"`;

      return `// Framer Motion Animation
<motion.div
  animate={{
    x: ${x},
    y: ${y},
    scale: ${scale},
    opacity: ${opacity},
    rotate: ${rotate},
  }}
  transition={{
    duration: ${duration},
    delay: ${delay},
    ease: ${easeValue},
    repeat: ${loop ? "Infinity" : 0},
    repeatType: ${yoyo ? '"reverse"' : '"loop"'},
  }}
/>`;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Wand2 className="h-4 w-4" />
          Open Animation Generator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] w-full h-[90vh] flex flex-col overflow-hidden p-0 gap-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle>Animation Code Generator</DialogTitle>
          <DialogDescription>
            Tweak parameters and generate code for Framer Motion or GSAP.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Panel: Controls */}
          <div className="w-full lg:w-1/3 p-6 border-r overflow-y-auto space-y-6 bg-muted/10">
            <div className="flex items-center justify-between p-4 bg-card rounded-lg border shadow-sm">
              <Label className="font-medium">Use GSAP</Label>
              <Switch checked={isGsap} onCheckedChange={setIsGsap} />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>X Position</Label>
                  <span className="text-xs font-mono text-muted-foreground">{x}px</span>
                </div>
                <Slider min={-300} max={300} step={10} value={[x]} onValueChange={([v]) => setX(v)} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Y Position</Label>
                  <span className="text-xs font-mono text-muted-foreground">{y}px</span>
                </div>
                <Slider min={-300} max={300} step={10} value={[y]} onValueChange={([v]) => setY(v)} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Scale</Label>
                  <span className="text-xs font-mono text-muted-foreground">{scale}</span>
                </div>
                <Slider min={0} max={2} step={0.1} value={[scale]} onValueChange={([v]) => setScale(v)} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Opacity</Label>
                  <span className="text-xs font-mono text-muted-foreground">{opacity}</span>
                </div>
                <Slider min={0} max={1} step={0.1} value={[opacity]} onValueChange={([v]) => setOpacity(v)} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Rotate</Label>
                  <span className="text-xs font-mono text-muted-foreground">{rotate}deg</span>
                </div>
                <Slider min={-360} max={360} step={15} value={[rotate]} onValueChange={([v]) => setRotate(v)} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Duration</Label>
                  <span className="text-xs font-mono text-muted-foreground">{duration}s</span>
                </div>
                <Slider min={0.1} max={5} step={0.1} value={[duration]} onValueChange={([v]) => setDuration(v)} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Delay</Label>
                  <span className="text-xs font-mono text-muted-foreground">{delay}s</span>
                </div>
                <Slider min={0} max={2} step={0.1} value={[delay]} onValueChange={([v]) => setDelay(v)} />
              </div>

              <div className="space-y-2">
                <Label>Easing</Label>
                <Select value={easing} onValueChange={(val) => setEasing(val as EasingType | "custom")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom Cubic Bezier</SelectItem>
                    {Object.keys(NAMED_EASINGS).map((key) => (
                      <SelectItem key={key} value={key}>{key}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {easing === "custom" && (
                <div className="space-y-2 p-3 bg-muted rounded-md">
                  <Label className="text-xs">Cubic Bezier</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {customBezier.map((val, i) => (
                      <Input
                        key={i}
                        type="number"
                        step="0.1"
                        value={val}
                        onChange={(e) => handleCustomChange(i, e.target.value)}
                        className="h-7 px-1 text-center text-xs"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between space-x-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Switch id="loop" checked={loop} onCheckedChange={setLoop} />
                  <Label htmlFor="loop">Loop</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="yoyo" checked={yoyo} onCheckedChange={setYoyo} />
                  <Label htmlFor="yoyo">Yoyo</Label>
                </div>
              </div>

              <Button onClick={handlePlay} className="w-full mt-4" size="lg">
                <Play className="mr-2 h-4 w-4" />
                Play Animation
              </Button>
            </div>
          </div>

          {/* Right Panel: Preview & Code */}
          <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
            <div className="flex-1 min-h-[300px]">
              <Label className="mb-2 block">Preview</Label>
              <AnimationPreview
                x={x}
                y={y}
                scale={scale}
                opacity={opacity}
                rotate={rotate}
                duration={duration}
                delay={delay}
                easing={easing}
                customBezier={customBezier}
                isGsap={isGsap}
                loop={loop}
                yoyo={yoyo}
                playTrigger={playTrigger}
              />
            </div>
            
            <div className="mt-auto">
              <Label className="mb-2 block">Generated Code</Label>
              <CodeBlock code={generateCode()} language={isGsap ? "javascript" : "jsx"} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
