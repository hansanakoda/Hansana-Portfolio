import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { FocusCardGroup, FocusCard } from "./FocusCard";

import maatMemberPhoto from "@/assets/maat-member.jpg";
import bcsGraduationPhoto from "@/assets/bcs-graduation.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const educations = [
  { degree: "BSc (Hons) in Management – Administration", institution: "University of Sri Jayewardenepura", year: "2025" },
  { degree: "Accredited Member – AMBCS", institution: "British Computer Society (BCS), UK", year: "2022", image: bcsGraduationPhoto, imageAlt: "Hansana at BCS Graduation Ceremony 2024" },
  {
    degree: "Member – MAAT",
    institution: "Association of Accounting Technicians",
    year: "2025",
    image: maatMemberPhoto,
    imageAlt: "Hansana receiving the MAAT qualification at the AAT Sri Lanka convocation",
  },
  { degree: "Corporate Level – Chartered Accountancy", institution: "CA Sri Lanka", year: "2025" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const EducationSection = () => {
  const [selectedEducation, setSelectedEducation] = useState<string | null>(null);

  return (
    <section id="education" className="py-24 section-glass relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-glow">Education</h2>
          <div className="neon-line w-24 mb-12" />
        </motion.div>

        <FocusCardGroup className="grid md:grid-cols-2 gap-6">
          {(setHovered) =>
            educations.map((ed, i) => {
              const isClickable = Boolean(ed.image);

              return (
                <FocusCard key={ed.degree} id={ed.degree} onHover={setHovered}>
                  <Dialog
                    open={selectedEducation === ed.degree}
                    onOpenChange={(open) => setSelectedEducation(open ? ed.degree : null)}
                  >
                    <DialogTrigger asChild>
                      <motion.button
                        type="button"
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={cardVariants}
                        className="glass-card rounded-xl p-6 group text-left w-full h-full disabled:cursor-default"
                        disabled={!isClickable}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                            <GraduationCap className="text-primary" size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{ed.degree}</h3>
                            <p className="text-muted-foreground text-sm">{ed.institution}</p>
                            <span className="font-mono text-primary text-xs mt-2 inline-block">{ed.year}</span>
                            {isClickable && (
                              <p className="text-xs text-muted-foreground mt-3">Click to view photo</p>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    </DialogTrigger>

                    {ed.image && (
                      <DialogContent className="max-w-4xl border-border bg-card">
                        <DialogHeader>
                          <DialogTitle className="font-display text-xl">{ed.degree}</DialogTitle>
                        </DialogHeader>
                        <img
                          src={ed.image}
                          alt={ed.imageAlt}
                          className="w-full h-auto rounded-lg border border-border object-cover"
                          loading="lazy"
                        />
                      </DialogContent>
                    )}
                  </Dialog>
                </FocusCard>
              );
            })
          }
        </FocusCardGroup>
      </div>
    </section>
  );
};

export default EducationSection;
