import { motion } from "framer-motion";
import { DATA } from "@/data/portfolio";
import { Mail, Phone, MapPin, Linkedin, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <footer id="contact" className="py-32 border-t border-border bg-card relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
          
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter mb-6 leading-[0.9]"
            >
              Initiate
              <br />
              <span className="text-primary text-outline-primary hover:text-primary transition-colors duration-300">Connection</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-mono text-sm max-w-md mb-16 leading-relaxed border-l-2 border-primary pl-4"
            >
              Ready to deploy engineering expertise to solve complex mechanical challenges. Sydney-based, globally minded.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 font-mono text-sm"
            >
              <a href={`mailto:${DATA.contact.email}`} className="group flex items-center justify-between border border-border p-6 w-full max-w-md bg-background hover:border-primary transition-colors">
                <div className="flex items-center gap-4">
                  <Mail size={16} className="text-primary" />
                  <span className="text-foreground group-hover:text-primary transition-colors">{DATA.contact.email}</span>
                </div>
                <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </a>
              
              <a href={`tel:${DATA.contact.phone}`} className="group flex items-center justify-between border border-border p-6 w-full max-w-md bg-background hover:border-primary transition-colors">
                <div className="flex items-center gap-4">
                  <Phone size={16} className="text-primary" />
                  <span className="text-foreground group-hover:text-primary transition-colors">{DATA.contact.phone}</span>
                </div>
                <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </a>
              
              <div className="flex items-center gap-4 border border-border p-6 w-full max-w-md bg-background text-muted-foreground">
                <MapPin size={16} className="text-primary" />
                <span>{DATA.contact.location}</span>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:items-end font-mono text-xs uppercase tracking-widest text-muted-foreground gap-4"
          >
            <div className="flex gap-6 mb-8">
              <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors group">
                <Linkedin size={16} className="group-hover:text-primary transition-colors" />
                <span className="border-b border-transparent group-hover:border-primary transition-colors pb-1">LinkedIn</span>
              </a>
              {/* Add resume link if available, assuming # for now */}
              <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors group">
                <ExternalLink size={16} className="group-hover:text-primary transition-colors" />
                <span className="border-b border-transparent group-hover:border-primary transition-colors pb-1">Resume</span>
              </a>
            </div>
            
            <div>&copy; {new Date().getFullYear()} Zaki Fathi Fahrizal</div>
            <div className="text-primary/50">Designed for precision.</div>
            
            <div className="mt-8 text-[0.65rem] text-muted-foreground/30 flex flex-col items-end gap-1">
              <span>STATUS: ONLINE</span>
              <span>SYS_VER: 1.0.0</span>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Target Crosshair Decoration */}
      <div className="absolute right-10 top-10 w-64 h-64 opacity-5 pointer-events-none hidden lg:block">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-foreground" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-foreground" />
        <div className="absolute inset-0 border border-foreground rounded-full" />
        <div className="absolute inset-8 border border-foreground rounded-full" />
        <div className="absolute inset-16 border border-foreground rounded-full" />
      </div>
    </footer>
  );
}
