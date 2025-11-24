import { Playground } from "@/components/Playground";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary-foreground"
              >
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
              </svg>
            </div>
            <h1 className="font-bold text-xl tracking-tight">Framer Motion Easing Playground</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground hidden sm:block">
              Built with Next.js & Framer Motion
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 py-8 lg:py-12 bg-muted/30">
        <Playground />
      </div>

      {/* Footer */}
      <footer className="border-t py-6 bg-card mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Visualize and compare easing functions for smooth animations.
          </p>
        </div>
      </footer>
    </main>
  );
}
