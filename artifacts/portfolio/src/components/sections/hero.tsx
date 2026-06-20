import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { MapPin, GraduationCap, Award, ArrowRight, Mail } from "lucide-react";
import { DATA } from "@/data/portfolio";
import heroPhoto from "@assets/WhatsApp_Image_2026-06-17_at_06.19.22-removebg-preview_1781705108735.png";

const QUICK_STATS = [
  { label: "GPA", value: "3.64/4.00" },
  { label: "WAM", value: "76.67" },
  { label: "Projects", value: "5+" },
  { label: "Teams", value: "3" },
];

const DOMAINS = [
  "CFD Analysis",
  "FEA / Structural",
  "Thermo-Structural",
  "ROV / Mech Design",
  "Biomedical CFD",
];

export default function Hero() {
  const [profileImage, setProfileImage] = useState<string>(heroPhoto);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_profile_photo");
    if (saved) {
      setProfileImage(saved);
    }

    const handleStorage = () => {
      const updated = localStorage.getItem("portfolio_profile_photo");
      setProfileImage(updated || heroPhoto);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <section className="min-h-screen pt-16 flex items-center bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground font-medium">
                Available for Opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1] mb-4"
            >
              Zaki Fathi
              <br />
              <span className="text-primary">Fahrizal</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-lg text-muted-foreground font-medium mb-2 flex items-center gap-2"
            >
              <GraduationCap size={18} className="text-primary flex-shrink-0" />
              {DATA.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-sm text-muted-foreground mb-6 flex items-center gap-2"
            >
              <MapPin size={14} className="flex-shrink-0" />
              Sydney, Australia · Baturaja, Indonesia
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg"
            >
              {DATA.about.bio}
            </motion.p>

            {/* Domain tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {DOMAINS.map((d) => (
                <span key={d} className="tag">
                  {d}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/projects">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-colors cursor-pointer">
                  View Projects
                  <ArrowRight size={16} />
                </span>
              </Link>
              <a
                href="mailto:zakifathi987@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded-md hover:bg-muted transition-colors"
              >
                <Mail size={16} />
                Get In Touch
              </a>
            </motion.div>
          </div>

          {/* Right — photo + stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center lg:items-end gap-6"
          >
            {/* Photo card */}
            <div className="relative">
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 overflow-hidden flex items-end justify-center">
                <img
                  src={profileImage}
                  alt="Zaki Fathi Fahrizal"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
              {/* Scholarship badge */}
              <div className="absolute -bottom-3 -right-3 bg-white border border-border rounded-xl px-3 py-2 shadow-md flex items-center gap-2">
                <Award size={16} className="text-primary" />
                <div>
                  <div className="text-xs font-semibold text-foreground">
                    Indonesia Maju
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Full Scholarship
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3 w-full max-w-xs sm:max-w-sm">
              {QUICK_STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-card border border-border rounded-lg p-2 text-center"
                >
                  <div className="text-base font-bold text-primary">
                    {s.value}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
