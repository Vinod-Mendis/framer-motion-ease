import { Playground } from "@/components/Playground";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />


      {/* Main Content */}
      <div className="flex-1 bg-muted/30">
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
