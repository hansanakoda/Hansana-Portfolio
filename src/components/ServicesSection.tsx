import { motion } from "framer-motion";
import { Server, Wifi, Database, Share2, BarChart3, Wrench } from "lucide-react";
import { FocusCardGroup, FocusCard } from "./FocusCard";

const services = [
  { icon: Server, title: "IT Consulting", desc: "Professional guidance on IT infrastructure, systems implementation, and operational efficiency." },
  { icon: Wifi, title: "Network Setup", desc: "Designing and implementing secure and efficient network systems for businesses." },
  { icon: Database, title: "ERP Implementation", desc: "Deployment, configuration, and maintenance of SAP, Odoo, and QuickBooks." },
  { icon: Share2, title: "Social Media Marketing", desc: "Managing social media platforms, brand presence, and engagement strategies." },
  { icon: BarChart3, title: "Digital Advertising", desc: "Planning and executing online advertising campaigns for business growth." },
  { icon: Wrench, title: "IT Troubleshooting", desc: "Diagnosing and resolving software, hardware, and system issues." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const ServicesSection = () => (
  <section id="services" className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-glow">Services</h2>
        <div className="neon-line w-24 mb-12" />
      </motion.div>

      <FocusCardGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(setHovered) =>
          services.map((s, i) => (
            <FocusCard key={s.title} id={s.title} onHover={setHovered}>
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="glass-card rounded-xl p-6 group h-full"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display text-base font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            </FocusCard>
          ))
        }
      </FocusCardGroup>
    </div>
  </section>
);

export default ServicesSection;
