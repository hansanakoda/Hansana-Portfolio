import { motion } from "framer-motion";
import { GraduationCap, Award, Briefcase } from "lucide-react";
import campusPhoto from "@/assets/usjp-campus.png";

const highlights = [
  { icon: GraduationCap, label: "BSc (Hons)", detail: "Business Administration" },
  { icon: Award, label: "GPA Above 3.3", detail: "Strong academic performance" },
  { icon: Briefcase, label: "Business & Management", detail: "Finance & organizational strategy" },
];

const HigherEducationSection = () => (
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
          Academic Journey
        </span>
        <h3 className="text-2xl md:text-3xl font-display font-bold text-glow">
          Higher Education
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
              src={campusPhoto}
              alt="University of Sri Jayewardenepura - Faculty of Management Studies and Commerce"
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
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="text-primary" size={20} />
              </div>
              <h4 className="font-display text-xl font-bold text-foreground">
                University of Sri Jayewardenepura
              </h4>
            </div>
            <p className="text-primary font-semibold text-sm mb-4 ml-[52px]">
              BSc (Hons) in Business Administration
            </p>

            <p className="text-muted-foreground leading-relaxed mb-2">
              Completed a Bachelor's degree in Business Administration with strong academic performance, achieving a{" "}
              <span className="text-primary font-semibold">GPA of above 3.3</span>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              During university, developed a solid foundation in business management, finance, and organizational strategy, while also enhancing analytical thinking, problem-solving, and professional skills.
            </p>

            {/* Highlight icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

export default HigherEducationSection;
