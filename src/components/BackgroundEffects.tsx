import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

const BackgroundEffects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";
  const cursorX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const cursorY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  const { scrollYProgress } = useScroll();
  const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const parallax2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const parallax3 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const parallax4 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    const mobileMq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileMq.matches);
    const mobileHandler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileMq.addEventListener("change", mobileHandler);

    return () => {
      mq.removeEventListener("change", handler);
      mobileMq.removeEventListener("change", mobileHandler);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion || isMobile) return;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [prefersReducedMotion, isMobile, cursorX, cursorY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (!isMobile) return;
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        cursorX.set(window.innerWidth / 2 + e.gamma * 5);
        cursorY.set(window.innerHeight / 2 + e.beta * 3);
      }
    };
    window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isMobile, cursorX, cursorY]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Multi-layer base gradient */}
      <div className="absolute inset-0 bg-gradient-premium" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />

      {/* Slow animated gradient overlay */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 bg-gradient-shift opacity-50" />
      )}

      {/* Blob 1 — large indigo, static with scroll parallax */}
      <motion.div
        style={{ marginTop: parallax1 }}
        className="absolute top-[15%] left-[20%] w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
      >
        <div
          className="w-full h-full rounded-full blur-[140px]"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Blob 2 — primary blue */}
      <motion.div
        style={{ marginTop: parallax2 }}
        className="absolute top-[40%] right-[15%] w-[500px] h-[500px] md:w-[700px] md:h-[700px]"
      >
        <div
          className="w-full h-full rounded-full blur-[130px]"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.09) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Blob 3 — cyan tint */}
      <motion.div
        style={{ marginTop: parallax3 }}
        className="absolute top-[60%] left-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px]"
      >
        <div
          className="w-full h-full rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, hsl(var(--neon-cyan) / 0.08) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Blob 4 — subtle accent */}
      <motion.div
        style={{ marginTop: parallax4 }}
        className="absolute top-[25%] right-[30%] w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
      >
        <div
          className="w-full h-full rounded-full blur-[110px]"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.07) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.02] bg-noise" />

      {/* Top light wash */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-b from-primary/[0.04] to-transparent" />

      {/* Cursor glow — desktop only, ZERO delay, directly bound */}
      {!isMobile && !prefersReducedMotion && (
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full pointer-events-none will-change-transform"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            background: isLight
              ? "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, hsl(var(--primary) / 0.04) 20%, hsl(var(--neon-cyan) / 0.02) 40%, transparent 60%)"
              : "radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, hsl(var(--primary) / 0.12) 20%, hsl(var(--neon-cyan) / 0.06) 40%, transparent 60%)",
          }}
        />
      )}

      {/* Vignette */}
      <div className="absolute inset-0 bg-vignette" />
    </div>
  );
};

export default BackgroundEffects;
