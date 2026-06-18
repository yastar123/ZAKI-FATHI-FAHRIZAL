import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import { DATA } from "@/data/portfolio";
import {
  Wind, Wrench, Anchor, Activity,
  Mail, Linkedin, Phone, MapPin,
  ArrowRight, GraduationCap, Award
} from "lucide-react";

const DOMAINS = [
  {
    icon: Wind,
    title: "CFD Analysis",
    desc: "Computational fluid dynamics for cement production systems and biomedical applications.",
    tags: ["ANSYS Fluent", "UDF in C", "CATIA"],
  },
  {
    icon: Wrench,
    title: "FEA / Structural",
    desc: "Finite element analysis for thermo-structural problems with real boundary conditions.",
    tags: ["ANSYS 2025 R2", "ABAQUS", "SolidWorks Sim"],
  },
  {
    icon: Anchor,
    title: "ROV / Mech Design",
    desc: "Underwater vehicle chassis design and manufacturing for competitive robotics.",
    tags: ["SolidWorks CAD", "3D Printing", "Laser Cutting"],
  },
  {
    icon: Activity,
    title: "Biomedical CFD",
    desc: "Blood flow simulation in total artificial heart to minimize hemolysis.",
    tags: ["ANSYS Fluent", "C/UDF", "CAD Modeling"],
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay },
  };
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* About / What I Do */}
      <section id="about" className="py-20 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="mb-12">
            <p className="section-label mb-2">About</p>
            <h2 className="section-title">What I Do</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DOMAINS.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.title}
                  {...fadeUp(i * 0.08)}
                  className="bg-white border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{d.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{d.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <span key={t} className="tag-gray text-[11px]">{t}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Education row */}
          <motion.div {...fadeUp(0.2)} className="mt-8 bg-white border border-border rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap size={22} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">B.Eng. Mechanical Engineering — UNSW Sydney</p>
              <p className="text-sm text-muted-foreground mt-0.5">3rd Year · GPA 3.64/4.00 · WAM 76.67/100</p>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full">
              <Award size={14} />
              Indonesia Maju Scholar
            </div>
          </motion.div>

          {/* Page links */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: "/projects", label: "View All Projects", sub: "5 engineering projects" },
              { href: "/skills", label: "Technical Skills", sub: "CAD, simulation, programming" },
              { href: "/experience", label: "Work Experience", sub: "4 roles across industry & academia" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  {...fadeUp(0.15)}
                  className="flex items-center justify-between border border-border rounded-xl p-4 hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer group bg-white"
                >
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp()} className="mb-10">
            <p className="section-label mb-2">Contact</p>
            <h2 className="section-title">Get In Touch</h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              Open to internships, research collaborations, and engineering opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Mail, label: "Email", value: DATA.contact.email, href: `mailto:${DATA.contact.email}` },
              { icon: Phone, label: "Phone", value: DATA.contact.phone, href: `tel:${DATA.contact.phone}` },
              { icon: Linkedin, label: "LinkedIn", value: DATA.contact.linkedin, href: "https://linkedin.com/in/zaki-fahrizal" },
              { icon: MapPin, label: "Location", value: DATA.contact.location, href: null },
            ].map((c) => {
              const Icon = c.icon;
              const content = (
                <motion.div
                  {...fadeUp(0.05)}
                  className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">{c.label}</p>
                    <p className="text-sm font-medium text-foreground truncate">{c.value}</p>
                  </div>
                </motion.div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target={c.label === "LinkedIn" ? "_blank" : undefined} rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <div key={c.label}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <span>© 2026 Zaki Fathi Fahrizal</span>
          <div className="flex items-center gap-4">
            <Link href="/projects"><span className="hover:text-foreground transition-colors cursor-pointer">Projects</span></Link>
            <Link href="/skills"><span className="hover:text-foreground transition-colors cursor-pointer">Skills</span></Link>
            <Link href="/experience"><span className="hover:text-foreground transition-colors cursor-pointer">Experience</span></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
