import { motion } from "framer-motion";
import { Monitor, TrendingUp, Megaphone } from "lucide-react";
import { FocusCardGroup, FocusCard } from "./FocusCard";
import CareerTimeline from "./CareerTimeline";

const pillars = [
  { icon: Monitor, title: "Technology", desc: "IT leadership, networking, server management, ERP systems, and troubleshooting." },
  { icon: TrendingUp, title: "Finance", desc: "Accounting knowledge, financial analysis, audit exposure, and reporting awareness." },
  { icon: Megaphone, title: "Marketing", desc: "Social media strategy, digital advertising, brand promotion, and campaign management." },
];


const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const AboutSection = () => (
  <section id="about" className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-glow">About Me</h2>
        <div className="neon-line w-24 mb-8" />
        <p className="text-muted-foreground max-w-3xl leading-relaxed mb-12">
          A multidisciplinary professional combining IT team leadership, enterprise platform expertise, 
          financial systems knowledge, and digital marketing strategy. Experienced with SAP, QuickBooks, 
          Odoo and passionate about leveraging technology to drive business growth.
        </p>
      </motion.div>

      {/* Pillars */}
      <FocusCardGroup className="grid md:grid-cols-3 gap-6 mb-16">
        {(setHovered) =>
          pillars.map((p, i) => (
            <FocusCard key={p.title} id={p.title} onHover={setHovered}>
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="glass-card rounded-xl p-6 group h-full"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <p.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            </FocusCard>
          ))
        }
      </FocusCardGroup>

    </div>
  </section>
);

export default AboutSection;
