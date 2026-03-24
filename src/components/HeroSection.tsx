import { motion } from "framer-motion";
import { ArrowDown, Mail, Download } from "lucide-react";
import profilePhoto from "@/assets/hansana-hero.png";
import MagneticButton from "./MagneticButton";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-neon-purple/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="px-4 mx-auto text-center md:text-left md:mx-0 md:px-[50px]">
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-mono text-primary text-sm tracking-widest mb-4 uppercase">
              &lt;Welcome /&gt;
            </motion.p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="block text-foreground">
                Hansana
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="block gradient-text">
                Chamikara
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="block text-foreground">
                Kodagoda.
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="font-mono text-primary/80 text-sm mb-6 tracking-wide">
              IT Team Lead • Digital Marketing Enthusiast
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-muted-foreground leading-relaxed max-w-lg mb-8 text-justify mx-auto md:mx-0">
              An IT professional and marketing enthusiast specializing in enterprise systems,
              networking infrastructure, and digital marketing strategies. Bridging the gap
              between technology, business operations, and marketing innovation.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start">
              <MagneticButton
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-[0_0_25px_hsl(210_60%_55%/0.4)] transition-all duration-300">
                <ArrowDown size={18} />
                View Experience
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 text-primary rounded-lg hover:bg-primary/10 transition-all duration-300">
                <Mail size={18} />
                Contact Me
              </MagneticButton>
              <MagneticButton
                href="https://drive.google.com/uc?export=download&id=1vheS9HM0wHGOI2zbLhX8GIhhG-Nc-bG_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300">
                <Download size={18} />
                My CV
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Circular Photo with Animated SVG Border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center">
            
            <div className="relative group w-auto h-[414px] md:h-[553px] lg:h-[645px] aspect-auto">
              {/* Breathing glow */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 40px 15px hsla(210, 60%, 55%, 0.06), 0 0 80px 30px hsla(210, 60%, 55%, 0.03)",
                    "0 0 70px 25px hsla(210, 60%, 55%, 0.11), 0 0 120px 50px hsla(210, 60%, 55%, 0.06)",
                    "0 0 40px 15px hsla(210, 60%, 55%, 0.06), 0 0 80px 30px hsla(210, 60%, 55%, 0.03)",
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full"
              />

              {/* Circular image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border border-primary/15">
                <img
                  src={profilePhoto}
                  alt="Hansana Chamikara Kodagoda"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-3 right-[-57px] md:top-5 md:right-[-65px] glass-card rounded-xl px-5 py-3 md:px-7 md:py-4 z-10 shadow-[0_6px_24px_hsl(210_60%_55%/0.18)]">
                <span className="font-mono text-foreground text-sm md:text-base font-semibold tracking-wide">3+ Years Exp</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
