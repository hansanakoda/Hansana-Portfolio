import { Linkedin, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () =>
<footer className="py-8 border-t border-border">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <Link to="/info" className="font-display text-sm tracking-wider gradient-text font-bold hover:opacity-80 transition-opacity cursor-pointer">hansa.</Link>
      <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} Hansana Chamikara Kodagoda. All rights reserved.</p>
      <div className="flex gap-4">
        <a href="https://www.linkedin.com/in/hansana-kodagoda-21a4393b7" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={18} /></a>
        <a href="https://www.instagram.com/aka.hansa/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={18} /></a>
        <a href="mailto:hckodagoda@gmail.com" className="text-muted-foreground hover:text-primary transition-colors"><Mail size={18} /></a>
      </div>
    </div>
  </footer>;


export default Footer;