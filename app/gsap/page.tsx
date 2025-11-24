import { GsapPlayground } from "@/components/GsapPlayground";
import { Header } from "@/components/Header";

export default function GsapPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Main Content */}
      <div className="flex-1 py-8 lg:py-12 bg-muted/30">
        <GsapPlayground />
      </div>

      {/* Footer */}
      <footer className="border-t py-6 bg-card mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-3">
            Visualize and compare easing functions with GSAP.
          </p>
          <a 
            href="https://x.com/Vinod_Mendis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="opacity-70"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            @Vinod_Mendis
          </a>
        </div>
      </footer>
    </main>
  );
}
