import { motion } from "framer-motion";
import { FocusCardGroup, FocusCard } from "./FocusCard";

interface SkillBar {
  name: string;
  level: number;
}

const categories: { title: string; skills: SkillBar[] }[] = [
  {
    title: "Technical Skills",
    skills: [
      { name: "Networking", level: 90 },
      { name: "ERP Systems", level: 85 },
      { name: "Server Management", level: 85 },
      { name: "Biometric Systems", level: 80 },
      { name: "IT Troubleshooting", level: 90 },
      { name: "Technical Support", level: 88 },
    ],
  },
  {
    title: "Business & Finance",
    skills: [
      { name: "Accounting", level: 82 },
      { name: "Financial Analysis", level: 75 },
      { name: "Financial Reporting", level: 78 },
      { name: "Audit Exposure", level: 72 },
    ],
  },
  {
    title: "Marketing Skills",
    skills: [
      { name: "Social Media Marketing", level: 85 },
      { name: "Digital Advertising", level: 78 },
      { name: "Brand Promotion", level: 80 },
      { name: "Campaign Support", level: 76 },
    ],
  },
];

const columnVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const SkillsSection = () => (
  <section id="skills" className="py-24 section-glass relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-glow">Skills</h2>
        <div className="neon-line w-24 mb-12" />
      </motion.div>

      <FocusCardGroup className="grid md:grid-cols-3 gap-8">
        {(setHovered) =>
          categories.map((cat, ci) => (
            <FocusCard key={cat.title} id={cat.title} onHover={setHovered}>
              <motion.div
                custom={ci}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={columnVariants}
                className="glass-card rounded-xl p-6 h-full"
              >
                <h3 className="font-display text-lg font-semibold mb-6 text-primary">{cat.title}</h3>
                <div className="space-y-5">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm text-foreground">{skill.name}</span>
                        <span className="font-mono text-xs text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full rounded-full"
                          style={{
                            background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--neon-cyan)))",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </FocusCard>
          ))
        }
      </FocusCardGroup>
    </div>
  </section>
);

export default SkillsSection;
