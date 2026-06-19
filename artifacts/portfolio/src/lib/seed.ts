import { supabase } from "./supabase";
import { uploadToCloudinary } from "./cloudinary";
import {
  PROJECT_01_IMAGES,
  PROJECT_02_IMAGES,
  PROJECT_04_IMAGES,
  PROJECT_05_IMAGES,
} from "@/data/project-images";

const SEED_PROJECTS = [
  {
    id: "01",
    title: "Suspension Pre-Heater Flow CFD Analysis",
    role: "Process Engineering Intern",
    company: "PT Semen Baturaja Tbk",
    date: "Dec 2025 – Present",
    badge: "CFD Analysis",
    display_order: 1,
    what: "CFD analysis on top cyclone separator in cement production. A cyclone separates gases and solids from rotary kiln combustion. 100% efficiency = all solids exit bottom outlet.",
    problem: "Pressure drop requires significant fan power. Flow deflector + vortex finder modifications expected to reduce turbulence and pressure drop.",
    method: "Evaluated 6 designs: original, 1/4-section deflector, 1/3-section deflector (1m), 1m vortex extension, 1/3 curved deflector. Compared on Separation Efficiency, Heat Loss, Pressure Drop. CAD Design + CFD Modelling (ANSYS).",
    result: "Current design has best separation efficiency and heat loss performance. 1/3-section modification reduces pressure drop but at cost of separation efficiency. Estimated energy loss: Rp 922,000/hour, 2.1–2.6% combustion heat loss.",
    background: "",
    solution: "",
    conclusion: "",
    benefits: "",
    learnings: "",
    method_steps: [],
    results: [],
    components: [],
    tools: ["ANSYS CFD", "SolidWorks CAD", "Theoretical calculations", "Cost analysis"],
  },
  {
    id: "02",
    title: "Thermo-Structural Analysis with Internal Combustion Expansion Effect on Refractory Brick for Rotary Kiln",
    role: "Process Engineering Intern",
    company: "PT Semen Baturaja Tbk, Indonesia",
    date: "Dec 2025 – Present",
    badge: "FEA / Thermal",
    display_order: 2,
    what: "FEA + thermal analysis of refractory bricks inside a 72m rotary kiln operating at 1450°C combustion temperature.",
    background: "The purpose of installing refractory bricks is to retain the heat from combustion inside the kiln, thereby reducing heat loss.",
    problem: "The shell can experience a shorter lifespan due to thinning bricks caused by thermal expansion cracking.",
    solution: "The position of the shell's temperature distribution and its expansion effects can be tracked, so that the shell can be further optimized.",
    method: "Kiln divided into 4 zones (Inlet, Burning, Cooling, Outlet). Boundary conditions calculated from real infrared sensor measurements. ANSYS 2025 R2 used for steady-state thermal + static structural analysis.",
    result: "Max temperature in outer brick layer: 800–900°C at meter 36. Max stress: 35–39 MPa (safe — UTS ~400 MPa).",
    conclusion: "This calculation serves as a basis for determining a safe coating level in the kiln blasting zone.",
    benefits: "Shell material selection can be based on the external temperature distribution, allowing for the estimation of cracking points in the shell.",
    learnings: "I learned how the expansion of high-temperature gases can affect the mechanical performance of a rotary kiln.",
    method_steps: [
      "CAD Design Review and Drawing of kiln geometry",
      "Brick and Shell Material properties inserted based on real specifications (ASTM A516 shell steel)",
      "Theoretical Calculation of Heat Flux for Boundary Conditions",
      "Kiln Divided into 4 main Zones: Inlet, Burning, Cooling, Outlet",
      "Boundary Conditions (Heat Flux, Convection, Coating Thickness) calculated from real infrared sensor measurements",
      "Final FEA + Thermal Module result extraction and post-processing",
    ],
    results: [
      { number: "01", title: "Temperature Distribution", text: "The temperature distribution was successfully tracked across all 72m of kiln length.", metric: "842°C Max Shell Temp" },
      { number: "02", title: "Structural Integrity", text: "Maximum stress identified at 35–39 MPa in the kiln shell.", metric: "35-39 MPa Peak Stress" },
      { number: "03", title: "Coating Thickness Estimation", text: "The coating thickness from melted clinker can be estimated through conduction and heat transfer calculations.", metric: "50mm Coating Reference" },
    ],
    components: [],
    tools: ["ANSYS 2025 R2 FEA", "SolidWorks CAD", "Infrared Sensor Data", "Heat Flux Calculations", "ASTM A516 Steel"],
  },
  {
    id: "03",
    title: "CFD Analysis on UNSW Total Artificial Heart (TAH)",
    role: "Simulation Team",
    company: "UNSW Bionics Heart",
    date: "Feb 2026 – Present",
    badge: "Biomedical CFD",
    display_order: 3,
    what: "Detailed CFD analysis of blood flow dynamics in a Total Artificial Heart using Rotary Undulation Pump with Nutation Movement. Goal: achieve shear stress < 10 Pa to minimize hemolysis.",
    method: "UDF (User-Defined Functions) coded in C based on journal references to simulate nutation movement physics. Analyzed maximum shear stress and flow streamlines across TAH housing.",
    result: "Current design: 19 Pa max shear stress. Target: < 10 Pa by November 2026.",
    background: "",
    problem: "",
    solution: "",
    conclusion: "",
    benefits: "",
    learnings: "",
    method_steps: [],
    results: [],
    components: [],
    tools: ["ANSYS Fluent + UDF", "CAD", "C programming"],
  },
  {
    id: "04",
    title: "sUNSWim ROV Chassis Design (AUV II & III)",
    role: "Mechanical Engineer",
    company: "sUNSWim – UNSW ROV Team",
    date: "Aug 2025 – Present",
    badge: "ROV Design",
    display_order: 4,
    what: "Design, manufacture, and test chassis and peripheral components for underwater remotely operated vehicle for SAUVC 2026 competition (Sanya, China).",
    background: "sUNSWim is UNSW's competitive Remotely Operated Vehicle team, preparing for the Singapore AUV Challenge (SAUVC) 2026 in Sanya, China.",
    problem: "AUV III required a full chassis redesign to support 6 thrusters, improve cable management, and withstand hydrostatic pressure at 5m depth.",
    solution: "Complete mechanical system redesign using SolidWorks, validated by ANSYS CFD and FEA before 3D printing.",
    method: "SolidWorks CAD design, CFD drag simulation at 1 m/s, FEA hydrostatic pressure validation at 5m depth, 3D Printing manufacture, Pool testing.",
    result: "Drag coefficient: 0.91–0.97 in air at 1 m/s. Design operates safely (FEA validated).",
    conclusion: "The AUV III chassis design successfully meets all mechanical requirements for SAUVC 2026 competition.",
    benefits: "Pool-tested design is competition-ready. The modular mounting system enables rapid sensor swaps.",
    learnings: "I developed strong hands-on skills in the full engineering design cycle — from CAD concept to physical testing.",
    method_steps: [
      "SolidWorks CAD design of all chassis and peripheral components",
      "CFD Analysis — drag coefficient simulation at 1 m/s in air and water",
      "FEA — hydrostatic pressure validation at maximum 5m depth",
      "Centre of mass/buoyancy optimization for neutral buoyancy",
      "3D Printing + Laser Cutting manufacture of prototypes",
      "Pool testing — propulsion, maneuvering, and waterproofing validation",
    ],
    results: [
      { number: "01", title: "Drag Performance", text: "CFD analysis confirmed drag coefficients of 0.91–0.97 in air at 1 m/s.", metric: "Cd = 0.91–0.97" },
      { number: "02", title: "Structural Integrity", text: "FEA hydrostatic pressure analysis validated all components for safe operation at 5m depth.", metric: "5m Depth Validated" },
      { number: "03", title: "Competition Readiness", text: "Pool testing confirmed stable underwater maneuvering, watertight seals, and reliable thruster performance.", metric: "SAUVC 2026 Target" },
    ],
    components: [
      { name: "AUV III Chassis", desc: "Full 6-thruster frame with integrated buoyancy chambers" },
      { name: "Vacuum Pump Handles", desc: "Ergonomic grips for watertight seal maintenance" },
      { name: "Thruster Guards", desc: "Propeller vortex protection under high-speed operation" },
      { name: "Light & Hydrophone Mount", desc: "Multi-sensor bracket with vibration isolation" },
      { name: "Bumper System", desc: "Impact protection for competition obstacle navigation" },
    ],
    tools: ["SolidWorks", "ANSYS CFD", "ANSYS FEA", "3D Printing", "Laser Cutting", "Pool Testing"],
  },
  {
    id: "05",
    title: "Knee Brace for Osteoarthritis",
    role: "Team member, structural validation lead",
    company: "DESN2000 Course Project — UNSW",
    date: "2024",
    badge: "Structural FEA",
    display_order: 5,
    what: "Design and FEA validation of a knee brace to assist users with osteoarthritis. Main principle: traction system reduces joint stress while enabling natural movement.",
    background: "Osteoarthritis affects millions globally, causing knee joint degeneration through cartilage breakdown.",
    problem: "Existing knee braces are passive — they support the joint but do not reduce the compressive forces causing cartilage damage.",
    solution: "A gearing and dog-clutch mechanism transfers traction forces from upper to lower brace sections, offloading the knee joint.",
    method: "Literature review, SolidWorks CAD, ANSYS FEA static structural analysis, Fatigue life analysis using S-N curve for Aluminium 6061.",
    result: "Factor of Safety > 13. Life Cycle > 1 Million cycles. Max Stress: 6.56 MPa (far below Aluminium 6061 fatigue limit of 95 MPa).",
    conclusion: "The knee brace design successfully demonstrates that a mechanically active traction system can be structurally safe for long-term use.",
    benefits: "The design provides a pathway to clinical prototyping. By reducing joint compressive forces through active traction, it could delay surgical intervention.",
    learnings: "This project taught me to bridge clinical requirements and engineering constraints.",
    method_steps: [
      "Literature review — osteoarthritis mechanics and existing brace designs",
      "Conceptual design — traction force path and gearing arrangement",
      "SolidWorks CAD — full assembly modelling of upper/lower brace sections",
      "Boundary Condition definition: Torque 30 Nm, weight 80 kg, traction 20% body weight",
      "ANSYS FEA — static structural analysis with hinge fixed constraint",
      "Fatigue life analysis — S-N curve for Aluminium 6061 (T6)",
    ],
    results: [
      { number: "01", title: "Structural Safety", text: "Maximum von-Mises stress of 6.56 MPa was recorded across the gearing system.", metric: "6.56 MPa Max Stress" },
      { number: "02", title: "Fatigue Life", text: "Fatigue analysis confirmed infinite life operation at the expected load range.", metric: ">1M Cycles Life" },
      { number: "03", title: "Safety Factor", text: "Factor of Safety exceeds 13 across all critical components.", metric: "FoS > 13" },
    ],
    components: [],
    tools: ["SolidWorks CAD", "SolidWorks Simulation", "ANSYS FEA", "Fatigue Analysis", "Al 6061-T6"],
  },
];

const SEED_IMAGES: Record<string, typeof PROJECT_01_IMAGES> = {
  "01": PROJECT_01_IMAGES,
  "02": PROJECT_02_IMAGES,
  "03": [],
  "04": PROJECT_04_IMAGES,
  "05": PROJECT_05_IMAGES,
};

export interface SeedProgress {
  step: string;
  done: number;
  total: number;
}

export async function runSeeder(
  onProgress: (p: SeedProgress) => void
): Promise<void> {
  // Insert projects
  for (let i = 0; i < SEED_PROJECTS.length; i++) {
    const proj = SEED_PROJECTS[i];
    onProgress({ step: `Inserting project: ${proj.title.slice(0, 40)}…`, done: i, total: SEED_PROJECTS.length });

    const { error } = await supabase
      .from("projects")
      .upsert(proj, { onConflict: "id" });
    if (error) throw new Error(`Insert project ${proj.id}: ${error.message}`);
  }

  // Upload images per project
  let imgDone = 0;
  const totalImages = Object.values(SEED_IMAGES).reduce((acc, arr) => acc + arr.length, 0);

  for (const [projectId, images] of Object.entries(SEED_IMAGES)) {
    // Delete existing images for this project before inserting to avoid duplicates on re-run
    await supabase.from("project_images").delete().eq("project_id", projectId);

    for (let j = 0; j < images.length; j++) {
      const img = images[j];
      onProgress({ step: `Uploading image ${j + 1}/${images.length} for project #${projectId}…`, done: imgDone, total: totalImages });

      try {
        const cloudUrl = await uploadToCloudinary(img.src, `portfolio/project-${projectId}`);
        const { error } = await supabase.from("project_images").insert({
          project_id: projectId,
          src: cloudUrl,
          caption: img.caption,
          type: img.type,
          display_order: j,
        });
        if (error) console.warn("Image insert warn:", error.message);
      } catch (e) {
        console.warn("Image upload skipped:", e);
      }

      imgDone++;
    }
  }

  onProgress({ step: "Seeding complete!", done: totalImages, total: totalImages });
}
