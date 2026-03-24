import { motion, AnimatePresence } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useState } from "react";
import { FocusCardGroup, FocusCard } from "./FocusCard";

import itTeamLeadPhoto from "@/assets/it-team-lead-hover.png";
import eyStockCountPhoto from "@/assets/ey-stock-count.jpg";

const experiences = [
  {
    role: "Account Manager",
    company: "Rank Holdings",
    period: "2025 – Present",
    tasks: [
      "Managing Southwinds Property operations including bookings and customer coordination",
      "Member of Casino Marina Entertainment marketing team",
      "Managing social media platforms including Facebook and Instagram",
      "Financial account management including revenue tracking and expense monitoring",
      "Supporting digital marketing campaigns and brand positioning",
    ],
  },
  {
    role: "IT Team Lead",
    company: "Synergy Pharmaceuticals",
    period: "2023 – 2025",
    image: itTeamLeadPhoto,
    imageAlt: "Hansana working as IT Team Lead",
    tasks: [
      "Installed and configured ZKTeco biometric fingerprint systems",
      "Designed and implemented the company network infrastructure",
      "Managed server systems and user access",
      "Administered SAP, QuickBooks, Odoo and multiple ERP platforms",
      "Provided daily IT support and system troubleshooting",
    ],
  },
  {
    role: "Audit Trainee",
    company: "Ernst & Young",
    period: "2021 – 2022",
    image: eyStockCountPhoto,
    imageAlt: "Stock count engagement at Taprobane Seafoods",
    imageCaption: "Stock count engagement at Taprobane Seafoods during my time at Ernst & Young",
    tasks: [
      "Assisted with external audit engagements",
      "Exposure to financial reporting systems and accounting processes",
      "Performed risk assessment and compliance analysis",
      "Conducted inventory verification and stock counts",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const ExperienceSection = () => {
  const [imageHoveredIndex, setImageHoveredIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 relative">
      {/* Background blur overlay + centered image */}
      <AnimatePresence>
        {imageHoveredIndex !== null && experiences[imageHoveredIndex]?.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 backdrop-blur-md bg-background/60 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="rounded-2xl glass-card p-4 shadow-2xl shadow-primary/20 max-w-md"
            >
              <img
                src={experiences[imageHoveredIndex].image}
                alt={experiences[imageHoveredIndex].imageAlt}
                className="w-full h-auto rounded-xl border border-border object-cover"
              />
              <p className="text-center text-sm text-muted-foreground mt-3 font-medium">
                {experiences[imageHoveredIndex].imageCaption || `${experiences[imageHoveredIndex].role} — ${experiences[imageHoveredIndex].company}`}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-glow">Experience</h2>
          <div className="neon-line w-24 mb-12" />
        </motion.div>

        <FocusCardGroup className="relative pl-8 border-l border-primary/20 space-y-12">
          {(setHovered) =>
            experiences.map((exp, i) => (
              <FocusCard key={exp.role} id={exp.role} onHover={setHovered}>
                <motion.div
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className="relative"
                >
                  <div className="absolute -left-[calc(2rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-primary box-glow" />
                  <div
                    className="glass-card rounded-xl p-6 group"
                    onMouseEnter={() => exp.image ? setImageHoveredIndex(i) : undefined}
                    onMouseLeave={() => exp.image ? setImageHoveredIndex(null) : undefined}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Briefcase className="text-primary" size={18} />
                      <div>
                        <h3 className="font-semibold text-foreground">{exp.role}</h3>
                        <p className="text-muted-foreground text-sm">{exp.company} &bull; {exp.period}</p>
                      </div>
                    </div>
                    <ul className="space-y-2 ml-7">
                      {exp.tasks.map((task, j) => (
                        <li key={j} className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </FocusCard>
            ))
          }
        </FocusCardGroup>
      </div>
    </section>
  );
};

export default ExperienceSection;
