import { useState, useEffect, createContext, useContext, type ReactNode } from "react";
import { motion } from "framer-motion";

interface FocusContextType {
  hoveredId: string | null;
  hasHover: boolean;
}

const FocusContext = createContext<FocusContextType>({ hoveredId: null, hasHover: false });

/** Wrap a grid of cards. Provides focus context to children. */
export const FocusCardGroup = ({
  children,
  className = "",
}: {
  children: ReactNode | ((setHovered: (id: string | null) => void) => ReactNode);
  className?: string;
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const rendered = typeof children === "function" ? children(setHoveredId) : children;

  return (
    <FocusContext.Provider value={{ hoveredId: isMobile ? null : hoveredId, hasHover: !isMobile && hoveredId !== null }}>
      <div
        className={className}
        onMouseLeave={() => setHoveredId(null)}
      >
        {rendered}
      </div>
    </FocusContext.Provider>
  );
};

/** Individual focus card. Must be inside a FocusCardGroup. */
export const FocusCard = ({
  id,
  children,
  className = "",
  onHover,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  onHover?: (id: string | null) => void;
}) => {
  const { hoveredId, hasHover } = useContext(FocusContext);
  const isActive = hoveredId === id;
  const isDimmed = hasHover && !isActive;

  return (
    <motion.div
      onMouseEnter={() => onHover?.(id)}
      animate={{
        scale: isActive ? 1.03 : isDimmed ? 0.98 : 1,
        opacity: isDimmed ? 0.45 : 1,
        filter: isDimmed ? "blur(1.5px)" : "blur(0px)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${className} ${isActive ? "z-10 relative" : "z-0 relative"}`}
      style={{
        willChange: isActive || isDimmed ? "transform, opacity, filter" : "auto",
      }}
    >
      {isActive && (
        <div
          className="absolute -inset-1 rounded-xl pointer-events-none"
          style={{
            boxShadow: "0 0 30px hsl(var(--primary) / 0.12), 0 8px 40px hsl(225 15% 4% / 0.5)",
          }}
        />
      )}
      {children}
    </motion.div>
  );
};
