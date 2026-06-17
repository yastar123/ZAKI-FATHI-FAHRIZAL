import { motion } from "framer-motion";
import { DATA } from "@/data/portfolio";
import { Mail, Phone, MapPin, Linkedin, ExternalLink, Zap } from "lucide-react";

export default function Contact() {
  return (
    <footer id="contact" className="py-16 sm:py-20 md:py-32 border-t border-border bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="absolute bottom-0 left-0 pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <div className="text-[18vw] font-display font-bold leading-none whitespace-nowrap">
          CONNECT
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start">

          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-primary tracking-widest mb-5 flex items-center gap-3"
            >
              <span className="w-2 h-2 bg-primary animate-blink" />
              05 // CONTACT
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[clamp(3rem,12vw,6rem)] font-display font-bold uppercase tracking-tighter mb-5 leading-[0.9]"
            >
              Initiate
              <br />
              <span className="text-primary text-outline-primary hover:text-primary transition-colors duration-300">
                Connection
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-mono text-xs sm:text-sm max-w-sm mb-8 md:mb-12 leading-relaxed border-l-2 border-primary pl-4"
            >
              Ready to deploy engineering expertise to solve complex mechanical challenges. Sydney-based, globally minded.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-3 font-mono text-sm"
            >
              <a
                href={`mailto:${DATA.contact.email}`}
                className="group flex items-center justify-between border border-border p-4 w-full bg-background hover:border-primary transition-all duration-300 hover:bg-primary/5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Mail size={14} className="text-primary flex-shrink-0" />
                  <span className="text-foreground group-hover:text-primary transition-colors text-xs sm:text-sm truncate">
                    {DATA.contact.email}
                  </span>
                </div>
                <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 ml-3" />
              </a>

              <a
                href={`tel:${DATA.contact.phone}`}
                className="group flex items-center justify-between border border-border p-4 w-full bg-background hover:border-primary transition-all duration-300 hover:bg-primary/5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Phone size={14} className="text-primary flex-shrink-0" />
                  <span className="text-foreground group-hover:text-primary transition-colors text-xs sm:text-sm">
                    {DATA.contact.phone}
                  </span>
                </div>
                <ExternalLink size={12} className="text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all flex-shrink-0 ml-3" />
              </a>

              <div className="flex items-center gap-3 border border-border p-4 w-full bg-background text-muted-foreground text-xs sm:text-sm">
                <MapPin size={14} className="text-primary flex-shrink-0" />
                <span>{DATA.contact.location}</span>
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6 md:gap-8"
          >
            {/* Availability status */}
            <div className="border border-primary/30 bg-primary/5 p-5 sm:p-6 relative">
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary -translate-x-[2px] -translate-y-[2px]" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary translate-x-[2px] translate-y-[2px]" />
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                <span className="font-mono text-[10px] sm:text-xs text-green-400 uppercase tracking-widest">
                  Available for Opportunities
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed">
                Open to internship, graduate roles, and research positions in mechanical engineering, CFD/FEA, or related fields.
              </p>
            </div>

            {/* Quick specs */}
            <div className="border border-border bg-background p-5 sm:p-6">
              <h4 className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mb-4">
                Engineering Profile
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Specialty", value: "CFD + FEA Simulation" },
                  { label: "Software", value: "ANSYS, SolidWorks, CATIA" },
                  { label: "Education", value: "B.Eng. UNSW Sydney" },
                  { label: "GPA", value: "3.64 / 4.00" },
                  { label: "Scholarship", value: "Indonesia Maju (Full)" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center border-b border-border/50 pb-2 last:border-0 gap-3"
                  >
                    <span className="font-mono text-[10px] sm:text-[11px] text-muted-foreground uppercase flex-shrink-0">
                      {item.label}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] text-primary text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links + copyright */}
            <div className="flex flex-col sm:items-end font-mono text-xs uppercase tracking-widest text-muted-foreground gap-3 sm:gap-4">
              <div className="flex gap-4 sm:gap-6">
                <a
                  href="https://linkedin.com/in/zakifahrizal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors group"
                >
                  <Linkedin size={14} className="group-hover:text-primary transition-colors" />
                  <span className="border-b border-transparent group-hover:border-primary transition-colors pb-0.5">
                    LinkedIn
                  </span>
                </a>
                <a
                  href="/RESUME_Zaki_Fahrizal_DK_Engineering_1781612939831.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors group"
                >
                  <ExternalLink size={14} className="group-hover:text-primary transition-colors" />
                  <span className="border-b border-transparent group-hover:border-primary transition-colors pb-0.5">
                    Resume
                  </span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={10} className="text-primary" />
                <span>&copy; {new Date().getFullYear()} Zaki Fathi Fahrizal</span>
              </div>
              <div className="text-primary/40 text-[10px]">Engineered with precision.</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Crosshair decoration — desktop only */}
      <div className="absolute right-8 md:right-16 top-8 md:top-16 w-40 md:w-64 h-40 md:h-64 opacity-[0.04] pointer-events-none hidden lg:block">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-foreground" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-foreground" />
        <div className="absolute inset-0 border border-foreground rounded-full" />
        <div className="absolute inset-8 border border-foreground rounded-full" />
        <div className="absolute inset-16 border border-foreground rounded-full" />
      </div>
    </footer>
  );
}
