import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Instagram, Send, Loader2, MousePointerClick } from "lucide-react";
import emailjs from "@emailjs/browser";
import MagneticButton from "./MagneticButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const UNSUPPORTED_MSG = "Not supported on this device. Please use a mobile device.";

// Custom WhatsApp SVG icon component
const WhatsAppIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const contactInfo = [
  { icon: Mail, label: "Email", value: "hckodagoda@gmail.com", ariaLabel: "Send email to Hansana", isExternal: true },
  { icon: Phone, label: "Phone", value: "077 28 56 368", ariaLabel: "Call Hansana", isExternal: false },
  { icon: "whatsapp" as const, label: "WhatsApp", value: "077 28 56 368", ariaLabel: "Chat with Hansana on WhatsApp", isExternal: false },
  { icon: Linkedin, label: "LinkedIn", value: "Hansana Kodagoda", ariaLabel: "View Hansana's LinkedIn profile", isExternal: true },
  { icon: Instagram, label: "Instagram", value: "@aka.hansa", ariaLabel: "View Hansana's Instagram profile", isExternal: true },
  { icon: MapPin, label: "Location", value: "Homagama, Sri Lanka", ariaLabel: "View location on Google Maps", isExternal: true },
];

const cardVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const isMobile = useIsMobile();

  const openExternalInNewTab = useCallback((url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleCardClick = useCallback((label: string) => {
    switch (label) {
      case "Email":
        window.location.href = "mailto:hckodagoda@gmail.com?subject=Regarding%20your%20portfolio";
        break;
      case "Phone":
        if (isMobile) {
          window.location.href = "tel:0772856368";
        } else {
          toast.info(UNSUPPORTED_MSG, { duration: 4000 });
        }
        break;
      case "WhatsApp":
        if (isMobile) {
          window.location.href = "https://wa.me/94772856368";
        } else {
          toast.info(UNSUPPORTED_MSG, { duration: 4000 });
        }
        break;
      case "LinkedIn":
        openExternalInNewTab("https://www.linkedin.com/in/hansana-kodagoda");
        break;
      case "Instagram":
        openExternalInNewTab("https://www.instagram.com/aka.hansa/");
        break;
      case "Location":
        openExternalInNewTab("https://maps.app.goo.gl/EKGbvdi8GxhAQ8fz6");
        break;
    }
  }, [isMobile, openExternalInNewTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.send(
        "service_iyzuj8p",
        "template_udvwwep",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "mIbIOndlUQM8jwed-"
      );
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 section-glass relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-glow">Get In Touch</h2>
          <div className="neon-line w-24 mb-12" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left Column — Send Message Form */}
          <motion.form
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            onSubmit={handleSubmit}
            className="glass-card rounded-xl p-6 md:p-8 space-y-5 flex flex-col"
          >
            <p className="text-lg font-semibold text-foreground">Send a Message</p>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all backdrop-blur-sm"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all backdrop-blur-sm"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none backdrop-blur-sm flex-1"
            />
            <MagneticButton
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-[0_0_25px_hsl(210_60%_55%/0.4)] transition-all duration-300 disabled:opacity-50"
            >
              {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {sending ? "Sending..." : "Send Message"}
            </MagneticButton>
          </motion.form>

          {/* Right Column — 1×6 Vertical Contact Cards */}
          <div className="flex flex-col gap-3">
            {contactInfo.map((c, i) => (
              <motion.button
                key={c.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                whileHover={{ scale: 1.02, boxShadow: "0 0 25px hsl(var(--primary) / 0.2)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCardClick(c.label)}
                aria-label={c.ariaLabel}
                className="flex items-center gap-4 glass-card rounded-xl p-4 group w-full text-left cursor-pointer transition-all duration-300 hover:border-primary/30"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                  {c.icon === "whatsapp" ? (
                    <WhatsAppIcon size={18} className="text-primary" />
                  ) : (
                    <c.icon className="text-primary" size={18} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="text-sm text-foreground truncate">{c.value}</p>
                </div>
                <MousePointerClick
                  size={24}
                  className="text-green-500 group-hover:text-green-400 transition-colors duration-300 shrink-0"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
