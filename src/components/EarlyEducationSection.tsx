import { motion } from "framer-motion";
import { GraduationCap, Shield, Crown, Camera } from "lucide-react";
import cadetPhoto from "@/assets/cadet-photo.png";

const highlights = [
  { icon: GraduationCap, label: "Advanced Level Studies", detail: "A in Accounting & Economics, B in ICT" },
  { icon: Shield, label: "Cadeting", detail: "Discipline & leadership development" },
  { icon: Crown, label: "Chess", detail: "Strategic thinking & problem-solving" },
  { icon: Camera, label: "Photography", detail: "Creativity & visual storytelling" },
];

const EarlyEducationSection = () => (
  <section className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase mb-3 block">
          Foundation
        </span>
        <h3 className="text-2xl md:text-3xl font-display font-bold text-glow">
          Early Education & Achievements
        </h3>
        <div className="neon-line w-20 mx-auto mt-4" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative group"
        >
          <div className="absolute -inset-3 rounded-2xl bg-primary/5 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="relative overflow-hidden rounded-xl glass-card p-2">
            <img
              src={cadetPhoto}
              alt="Hansana at Ananda College cadeting"
              className="w-full h-auto rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="glass-card rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="text-primary" size={20} />
              </div>
              <h4 className="font-display text-xl font-bold text-foreground">
                Ananda College, Colombo
              </h4>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-2">
              Completed Advanced Level studies with strong academic performance, achieving{" "}
              <span className="text-primary font-semibold">A grades</span> in Accounting and Economics, and a{" "}
              <span className="text-primary font-semibold">B grade</span> in ICT.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              During this period, actively engaged in extracurricular activities including cadeting, chess, and photography, which helped develop discipline, strategic thinking, and creativity.
            </p>

            {/* Activity icons */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                >
                  <h.icon className="text-primary shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-sm font-medium text-foreground leading-tight">{h.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{h.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default EarlyEducationSection;
