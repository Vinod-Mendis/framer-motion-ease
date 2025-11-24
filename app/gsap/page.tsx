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
          <p>
            Visualize and compare easing functions with GSAP.
          </p>
        </div>
      </footer>
    </main>
  );
}
