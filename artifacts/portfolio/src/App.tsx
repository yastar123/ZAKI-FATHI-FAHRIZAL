import { useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { motion, AnimatePresence, useSpring } from "framer-motion";

const queryClient = new QueryClient();

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springX = useSpring(0, { stiffness: 500, damping: 28 });
  const springY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [springX, springY]);

  return (
    <>
      <div
        className="custom-cursor fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_var(--color-primary)]"
        style={{ left: mousePosition.x, top: mousePosition.y }}
      />
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-11 h-11 border border-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ x: springX, y: springY }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}

function LoadingSequence({ onComplete }: { onComplete: () => void }) {
  const lines = [
    "SYSTEM.BOOT...",
    "LOADING_PROFILE: Zaki Fahrizal",
    "SIMULATION_STATUS: ACTIVE",
    "ACCESS_GRANTED"
  ];

  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines(v => {
        if (v >= lines.length) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return v;
        }
        return v + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [onComplete, lines.length]);

  return (
    <motion.div 
      className="fixed inset-0 bg-background z-[10000] flex flex-col justify-center px-12 font-mono text-sm md:text-base text-primary"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl w-full mx-auto">
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-2"
          >
            {'>'} {line}
          </motion.div>
        ))}
        {visibleLines < lines.length && (
          <span className="inline-block w-2 h-4 bg-primary animate-blink mt-2" />
        )}
      </div>
    </motion.div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence>
          {loading && <LoadingSequence onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        
        <CustomCursor />
        
        <div 
          className="fixed inset-0 pointer-events-none z-[50] opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, #fff 2px, #fff 4px)',
            backgroundSize: '100% 4px',
          }}
        />

        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
