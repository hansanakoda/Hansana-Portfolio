import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Search, Server, BarChart3 } from "lucide-react";
import eyStockCountPhoto from "@/assets/ey-stock-count.jpg";
import itTeamLeadPhoto from "@/assets/it-team-lead-timeline.png";
import accountManagerPhoto from "@/assets/account-manager.png";

const milestones = [
  {
    year: "2025",
    title: "Account Manager",
    company: "Rank Holdings",
    description:
      "Managing financial reporting, client accounts, and business analytics. Bridging technology and finance for operational excellence.",
    icon: BarChart3,
    accent: "from-violet-500/20 to-violet-400/5",
    glowColor: "hsl(270 60% 55%)",
    dotColor: "bg-violet-400",
    image: accountManagerPhoto,
    imageCaption: "At the office – Rank Holdings",
  },
  {
    year: "2023",
    title: "IT Team Lead",
    company: "Synergy Pharmaceuticals",
    description:
      "Led IT infrastructure, networking, and ERP system management. Drove digital transformation and team coordination across departments.",
    icon: Server,
    accent: "from-primary/20 to-neon-cyan/5",
    glowColor: "hsl(210 60% 55%)",
    dotColor: "bg-primary",
    image: itTeamLeadPhoto,
    imageCaption: "Hardware maintenance at Synergy Pharmaceuticals",
  },
  {
    year: "2021",
    title: "Audit Trainee",
    company: "Ernst & Young",
    description:
      "Gained foundational audit and accounting experience at one of the Big Four firms, developing analytical and compliance skills.",
    icon: Search,
    accent: "from-emerald-500/20 to-emerald-400/5",
    glowColor: "hsl(160 60% 45%)",
    dotColor: "bg-emerald-400",
    image: eyStockCountPhoto,
    imageCaption: "Stock count engagement at Taprobane Seafoods",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.2 + 0.1,
      duration: 0.4,
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  }),
};

const CareerTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <section className="py-20 relative" ref={containerRef}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase mb-3 block">
            Recent Experience
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-glow">
            Career Timeline
          </h3>
          <div className="neon-line w-20 mx-auto mt-4" />
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Central animated line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/30">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-primary/60 to-primary/20"
              style={{ height: lineHeight }}
            />
          </div>

          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
              return (
              <div
                key={m.year}
                className="relative flex items-center mb-20 last:mb-0"
              >
                {/* Node */}
                <motion.div
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={nodeVariants}
                  className="absolute left-1/2 -translate-x-1/2 z-20 top-1/2 -translate-y-1/2"
                >
                  <div className="relative group/node">
                    <div
                      className={`w-4 h-4 rounded-full ${m.dotColor} ring-4 ring-background transition-all duration-300`}
                    />
                    <div
                      className="absolute inset-0 rounded-full animate-pulse-glow opacity-40"
                      style={{
                        boxShadow: `0 0 20px ${m.glowColor}, 0 0 40px ${m.glowColor}`,
                      }}
                    />
                  </div>
                </motion.div>

                {/* Left column */}
                <div className="w-[calc(50%-2rem)] pr-4">
                  {isLeft ? (
                    <motion.div
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={cardVariants}
                    >
                      <div className="glass-card rounded-xl p-6 group cursor-default relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${m.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                              <m.icon className="text-primary" size={20} />
                            </div>
                            <span className="font-mono text-primary text-sm font-medium tracking-wider">{m.year}</span>
                          </div>
                          <h4 className="font-display text-lg font-semibold text-foreground mb-1">{m.title}</h4>
                          <p className="text-primary/80 text-sm font-medium mb-3">{m.company}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">{m.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : m.image ? (
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + 0.3, duration: 0.6, ease: "easeOut" }}
                    >
                      <div className="relative overflow-hidden rounded-xl border border-border/30 shadow-lg">
                        <motion.img
                          src={m.image}
                          alt={m.imageCaption || m.title}
                          className="w-full h-auto object-contain"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      </div>
                      {m.imageCaption && (
                        <p className="text-xs text-muted-foreground/70 mt-2 text-center italic">{m.imageCaption}</p>
                      )}
                    </motion.div>
                  ) : null}
                </div>

                {/* Right column */}
                <div className="w-[calc(50%-2rem)] pl-4 ml-auto">
                  {!isLeft ? (
                    <motion.div
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={cardVariants}
                    >
                      <div className="glass-card rounded-xl p-6 group cursor-default relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${m.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                              <m.icon className="text-primary" size={20} />
                            </div>
                            <span className="font-mono text-primary text-sm font-medium tracking-wider">{m.year}</span>
                          </div>
                          <h4 className="font-display text-lg font-semibold text-foreground mb-1">{m.title}</h4>
                          <p className="text-primary/80 text-sm font-medium mb-3">{m.company}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed">{m.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : m.image ? (
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + 0.3, duration: 0.6, ease: "easeOut" }}
                    >
                      <div className="relative overflow-hidden rounded-xl border border-border/30 shadow-lg">
                        <motion.img
                          src={m.image}
                          alt={m.imageCaption || m.title}
                          className="w-full h-auto object-contain"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                      </div>
                      {m.imageCaption && (
                        <p className="text-xs text-muted-foreground/70 mt-2 text-center italic">{m.imageCaption}</p>
                      )}
                    </motion.div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-px bg-border/30">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-primary/60 to-primary/20"
              style={{ height: lineHeight }}
            />
          </div>

          {milestones.map((m, i) => (
            <motion.div
              key={m.year}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="relative mb-10 last:mb-0"
            >
              {/* Node */}
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={nodeVariants}
                className="absolute -left-8 top-6"
              >
                <div className="relative">
                  <div
                    className={`w-3 h-3 rounded-full ${m.dotColor} ring-3 ring-background`}
                  />
                  <div
                    className="absolute inset-0 rounded-full animate-pulse-glow opacity-30"
                    style={{
                      boxShadow: `0 0 12px ${m.glowColor}`,
                    }}
                  />
                </div>
              </motion.div>

              {/* Card */}
              <div className="glass-card rounded-xl p-5 relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${m.accent} opacity-30`}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <m.icon className="text-primary" size={18} />
                    </div>
                    <span className="font-mono text-primary text-xs font-medium tracking-wider">
                      {m.year}
                    </span>
                  </div>
                  <h4 className="font-display text-base font-semibold text-foreground mb-1">
                    {m.title}
                  </h4>
                  <p className="text-primary/80 text-sm font-medium mb-2">
                    {m.company}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {m.description}
                  </p>

                  {m.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="mt-3"
                    >
                      <motion.img
                        src={m.image}
                        alt={m.imageCaption || m.title}
                        className="w-full h-auto object-contain rounded-lg border border-border/30"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      {m.imageCaption && (
                        <p className="text-xs text-muted-foreground/70 mt-2 text-center italic">
                          {m.imageCaption}
                        </p>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
