export const DATA = {
  name: "Zaki Fathi Fahrizal",
  role: "Mechanical Engineering @ UNSW Sydney",
  contact: {
    email: "zakifathi987@gmail.com",
    phone: "+61 430 095 891",
    linkedin: "Zaki Fahrizal",
    location: "Sydney, NSW"
  },
  about: {
    gpa: "3.64/4.00",
    wam: "76.67/100",
    scholarship: "Indonesia Maju Scholar — Fully Funded by Indonesian Ministry of Education",
    bio: "Precision-driven engineering mind simulating blood flow in artificial hearts, designing underwater robots, and analyzing cement kilns using CFD/FEA. I think in systems and build in detail."
  },
  stats: [
    { value: 5, suffix: "+", label: "Active Projects" },
    { value: 1450, suffix: "°C", label: "Max Kiln Temperature" },
    { value: 3, suffix: "x", label: "International Teams" },
    { value: 72, suffix: "m", label: "Kiln Length Analyzed" }
  ],
  projects: [
    {
      id: "01",
      title: "Suspension Pre-Heater Flow CFD Analysis",
      role: "Process Engineering Intern",
      company: "PT Semen Baturaja Tbk",
      date: "Dec 2025 – Present",
      what: "CFD analysis on top cyclone separator in cement production. A cyclone separates gases and solids from rotary kiln combustion. 100% efficiency = all solids exit bottom outlet.",
      problem: "Pressure drop requires significant fan power. Flow deflector + vortex finder modifications expected to reduce turbulence and pressure drop.",
      method: "Evaluated 6 designs: original, 1/4-section deflector, 1/3-section deflector (1m), 1m vortex extension, 1/3 curved deflector. Compared on Separation Efficiency, Heat Loss, Pressure Drop. CAD Design + CFD Modelling (ANSYS).",
      result: "Current design has best separation efficiency and heat loss performance. 1/3-section modification reduces pressure drop but at cost of separation efficiency. Estimated energy loss: Rp 922,000/hour, 2.1–2.6% combustion heat loss.",
      tools: ["ANSYS CFD", "SolidWorks CAD", "Theoretical calculations", "Cost analysis"]
    },
    {
      id: "02",
      title: "Thermo-Structural Analysis with Internal Combustion Expansion Effect on Refractory Brick for Rotary Kiln",
      role: "Process Engineering Intern",
      company: "PT Semen Baturaja Tbk, Indonesia",
      date: "Dec 2025 – Present",
      what: "FEA + thermal analysis of refractory bricks inside a 72m rotary kiln operating at 1450°C combustion temperature. Bricks expand due to temperature gradients and crack, causing uneven heat transfer that accelerates shell degradation.",
      background: "The purpose of installing refractory bricks is to retain the heat from combustion inside the kiln, thereby reducing heat loss. Within the kiln structure, refractory bricks experience several forces triggered by significant temperature differences between the outside and inside. The bricks will expand and eventually crack. These cracks will cause uneven heat transfer — the outer shell receives more heat than usual and expands more rapidly, shortening its lifespan.",
      problem: "The shell can experience a shorter lifespan due to thinning bricks caused by thermal expansion cracking, leading to uneven heat distribution and accelerated structural degradation.",
      solution: "The position of the shell's temperature distribution and its expansion effects can be tracked, so that the shell can be further optimized — adding stiffeners or replacing it with a stronger type of steel where hotspots are identified.",
      methodSteps: [
        "CAD Design Review and Drawing of kiln geometry",
        "Brick and Shell Material properties inserted based on real specifications (ASTM A516 shell steel)",
        "Theoretical Calculation of Heat Flux for Boundary Conditions",
        "Kiln Divided into 4 main Zones: Inlet, Burning, Cooling, Outlet",
        "Boundary Conditions (Heat Flux, Convection, Coating Thickness) calculated from real infrared sensor measurements",
        "Final FEA + Thermal Module result extraction and post-processing"
      ],
      method: "Kiln divided into 4 zones (Inlet, Burning, Cooling, Outlet). Boundary conditions (heat flux, convection, coating thickness) calculated from real infrared sensor measurements. ANSYS 2025 R2 used for steady-state thermal + static structural analysis on a 72m kiln model with real material properties.",
      results: [
        {
          number: "01",
          title: "Temperature Distribution",
          text: "The temperature distribution was successfully tracked across all 72m of kiln length. The highest temperature occurred at meter 36 (burning zone), with the outer refractory brick layer reaching 800–900°C — validated against infrared sensor readings.",
          metric: "842°C Max Shell Temp"
        },
        {
          number: "02",
          title: "Structural Integrity",
          text: "Maximum stress identified at 35–39 MPa in the kiln shell. The design was concluded safe: von-Mises stress, bending stress, and shear stress all fall below the compressive strength and ultimate tensile strength of ~400 MPa (ASTM A516).",
          metric: "35-39 MPa Peak Stress"
        },
        {
          number: "03",
          title: "Coating Thickness Estimation",
          text: "The coating thickness from melted clinker can be estimated through conduction and heat transfer calculations. This thickness is critical during inspections — if below the calculated minimum, patching is required to maintain shell temperature stability.",
          metric: "50mm Coating Reference"
        }
      ],
      result: "Max temperature in outer brick layer: 800–900°C at meter 36. Max stress: 35–39 MPa (safe — UTS ~400 MPa). Coating thickness estimable from thermal calculations for targeted maintenance.",
      conclusion: "This calculation serves as a basis for determining a safe coating level in the kiln blasting zone, where bricks are susceptible to cracking due to the high gas temperature (1450°C). The expansion effect can be optimized by selecting the right brick type, preventing spontaneous expansion and ensuring the shell properly supports the kiln structure.",
      benefits: "Shell material selection can be based on the external temperature distribution, allowing for the estimation of cracking points in the shell and subsequent reinforcement with stiffeners. This analysis provides actionable data for predictive maintenance scheduling.",
      learnings: "I learned how the expansion of high-temperature gases can affect the mechanical performance of a rotary kiln. Measuring the refractory brick and shell expansion enables companies to optimize temperature control of the inner workings of rotary kilns, ensuring optimal firing temperatures and extended equipment lifespan.",
      tools: ["ANSYS 2025 R2 FEA", "SolidWorks CAD", "Infrared Sensor Data", "Heat Flux Calculations", "ASTM A516 Steel"]
    },
    {
      id: "03",
      title: "CFD Analysis on UNSW Total Artificial Heart (TAH)",
      role: "Simulation Team",
      company: "UNSW Bionics Heart",
      date: "Feb 2026 – Present",
      what: "Detailed CFD analysis of blood flow dynamics in a Total Artificial Heart using Rotary Undulation Pump with Nutation Movement. Goal: achieve shear stress < 10 Pa to minimize hemolysis (red blood cell damage).",
      method: "UDF (User-Defined Functions) coded in C based on journal references to simulate nutation movement physics. Analyzed maximum shear stress and flow streamlines across TAH housing. Operating at 5 L/min blood flow rate.",
      result: "Current design: 19 Pa max shear stress. Target: < 10 Pa by November 2026. TAH flow domain geometry developed in CAD.",
      tools: ["ANSYS Fluent + UDF", "CAD", "C programming"]
    },
    {
      id: "04",
      title: "sUNSWim ROV Chassis Design (AUV II & III)",
      role: "Mechanical Engineer",
      company: "sUNSWim – UNSW ROV Team",
      date: "Aug 2025 – Present",
      what: "Design, manufacture, and test chassis and peripheral components for underwater remotely operated vehicle for SAUVC 2026 competition (Sanya, China). Components designed: Vacuum pump handles, AUV III chassis, 6-propeller optimization, propeller vortex guards, light/hydrophone mounting, bumper.",
      background: "sUNSWim is UNSW's competitive Remotely Operated Vehicle team, preparing for the Singapore AUV Challenge (SAUVC) 2026 in Sanya, China. The mechanical team is responsible for designing and manufacturing all physical components of the AUV — ensuring structural integrity, hydrodynamic efficiency, and reliable operation in underwater competition conditions.",
      problem: "AUV III required a full chassis redesign to support 6 thrusters, improve cable management, and withstand hydrostatic pressure at 5m depth. Existing designs had poor drag performance and lacked modular mounting for sensors.",
      solution: "Complete mechanical system redesign using SolidWorks, validated by ANSYS CFD and FEA before 3D printing. Iterative pool testing informed design refinements for the competition-ready AUV.",
      components: [
        { name: "AUV III Chassis", desc: "Full 6-thruster frame with integrated buoyancy chambers" },
        { name: "Vacuum Pump Handles", desc: "Ergonomic grips for watertight seal maintenance" },
        { name: "Thruster Guards", desc: "Propeller vortex protection under high-speed operation" },
        { name: "Light & Hydrophone Mount", desc: "Multi-sensor bracket with vibration isolation" },
        { name: "Bumper System", desc: "Impact protection for competition obstacle navigation" },
        { name: "AUV II Shell", desc: "Ongoing: optimizing cable routing and hydrodynamics" },
      ],
      methodSteps: [
        "SolidWorks CAD design of all chassis and peripheral components",
        "CFD Analysis — drag coefficient simulation at 1 m/s in air and water",
        "FEA — hydrostatic pressure validation at maximum 5m depth",
        "Centre of mass/buoyancy optimization for neutral buoyancy",
        "3D Printing + Laser Cutting manufacture of prototypes",
        "Pool testing — propulsion, maneuvering, and waterproofing validation",
        "AUV II shell redesign for improved cable management (ongoing)",
      ],
      results: [
        {
          number: "01",
          title: "Drag Performance",
          text: "CFD analysis confirmed drag coefficients of 0.91–0.97 in air at 1 m/s across all design iterations. Streamlined chassis geometry minimized turbulent wake, improving thruster efficiency in water.",
          metric: "Cd = 0.91–0.97"
        },
        {
          number: "02",
          title: "Structural Integrity",
          text: "FEA hydrostatic pressure analysis validated all components for safe operation at 5m depth. All stress values remained well below the yield strength of the 3D printed PLA/PETG materials.",
          metric: "5m Depth Validated"
        },
        {
          number: "03",
          title: "Competition Readiness",
          text: "Pool testing confirmed stable underwater maneuvering, watertight seals, and reliable thruster performance. Currently enrolling in VIP ENGG4600 to continue development for SAUVC 2026.",
          metric: "SAUVC 2026 Target"
        }
      ],
      result: "Drag coefficient: 0.91–0.97 in air at 1 m/s. Design operates safely (FEA validated). Currently optimizing AUV III shell for better cable management.",
      conclusion: "The AUV III chassis design successfully meets all mechanical requirements for SAUVC 2026 competition. The iterative CFD/FEA-validated design process reduced risk before physical manufacture, saving significant time and material costs.",
      benefits: "Pool-tested design is competition-ready. The modular mounting system enables rapid sensor swaps during competition prep. AUV II shell optimization is ongoing, targeting improved cable management and reduced assembly time.",
      learnings: "I developed strong hands-on skills in the full engineering design cycle — from CAD concept to physical testing. The gap between simulation results and real-world pool testing taught me to include manufacturing tolerances and real fluid interactions in validation models.",
      tools: ["SolidWorks", "ANSYS CFD", "ANSYS FEA", "3D Printing", "Laser Cutting", "Pool Testing"]
    },
    {
      id: "05",
      title: "Knee Brace for Osteoarthritis",
      role: "Team member, structural validation lead",
      company: "DESN2000 Course Project — UNSW",
      date: "2024",
      what: "Design and FEA validation of a knee brace to assist users with osteoarthritis. Main principle: traction system reduces joint stress while enabling natural movement.",
      background: "Osteoarthritis affects millions globally, causing knee joint degeneration through cartilage breakdown. Traditional braces offer support but do not actively reduce joint contact forces. This DESN2000 capstone project aimed to design a mechanically active knee brace that applies traction to reduce intra-joint stress while maintaining full mobility.",
      problem: "Existing knee braces are passive — they support the joint but do not reduce the compressive forces causing cartilage damage. A motorized traction system was needed that is lightweight, safe to wear, and mechanically reliable over millions of cycles.",
      solution: "A gearing and dog-clutch mechanism transfers traction forces from upper to lower brace sections, offloading the knee joint. The dog clutch enables quick module swaps for maintenance. All structural members validated by FEA for infinite fatigue life.",
      methodSteps: [
        "Literature review — osteoarthritis mechanics and existing brace designs",
        "Conceptual design — traction force path and gearing arrangement",
        "SolidWorks CAD — full assembly modelling of upper/lower brace sections",
        "Boundary Condition definition: Torque 30 Nm, weight 80 kg, traction 20% body weight",
        "ANSYS FEA — static structural analysis with hinge fixed constraint",
        "Fatigue life analysis — S-N curve for Aluminium 6061 (T6)",
        "Factor of Safety calculation across all critical load paths",
      ],
      results: [
        {
          number: "01",
          title: "Structural Safety",
          text: "Maximum von-Mises stress of 6.56 MPa was recorded across the gearing system under worst-case loading. This is significantly below the Aluminium 6061-T6 yield strength of 276 MPa and fatigue limit of 95 MPa — no risk of yielding or fatigue failure.",
          metric: "6.56 MPa Max Stress"
        },
        {
          number: "02",
          title: "Fatigue Life",
          text: "Fatigue analysis confirmed infinite life operation at the expected load range. Stress amplitude falls below the endurance limit on the S-N curve, placing the design in the infinite-life region at over 1 million cycles.",
          metric: ">1M Cycles Life"
        },
        {
          number: "03",
          title: "Safety Factor",
          text: "Factor of Safety exceeds 13 across all critical components under the defined boundary conditions. This substantial safety margin accounts for dynamic loading variations during walking, stair climbing, and daily activities.",
          metric: "FoS > 13"
        }
      ],
      result: "Factor of Safety > 13. Life Cycle > 1 Million cycles (infinite-life region). Max Stress: 6.56 MPa (far below Aluminium 6061 fatigue limit of 95 MPa). No risk of yielding.",
      conclusion: "The knee brace design successfully demonstrates that a mechanically active traction system can be structurally safe for long-term use. The dog clutch mechanism adds real-world practicality by enabling fast component swaps without tools.",
      benefits: "The design provides a pathway to clinical prototyping. By reducing joint compressive forces through active traction, it could delay surgical intervention for osteoarthritis patients, improving quality of life and reducing healthcare costs.",
      learnings: "This project taught me to bridge clinical requirements and engineering constraints. Translating body-weight loading into FEA boundary conditions required understanding both biomechanics and structural mechanics — a skill directly applicable to biomedical device design.",
      tools: ["SolidWorks CAD", "SolidWorks Simulation", "ANSYS FEA", "Fatigue Analysis", "Al 6061-T6"]
    }
  ],
  experience: [
    {
      id: "EXP_01",
      title: "Mechanical Engineering Intern (Production Plan)",
      company: "PT Semen Baturaja Tbk",
      date: "Dec 2025 – Mar 2026",
      points: [
        "Determined daily ingredient requirements for cement production based on Kiln Daily Performance (5000 ton/day clinker target)",
        "Daily inspection of Refrigeration Performance, Kiln Temperature, Air Quality (control-room + onsite)",
        "Mapping and analysis of Rotary Kiln Suspension Pre-Heater to minimize carbon production"
      ]
    },
    {
      id: "EXP_02",
      title: "Simulation Team",
      company: "UNSW Bionics Heart",
      date: "Feb 2026 – Present",
      points: [
        "CFD simulations for blood-flow dynamics supporting artificial heart design optimization",
        "Flow-domain geometry in CAD; boundary conditions to reduce hemolysis risk",
        "Main role: simulate TAH using UDF at 5 L/min blood flow rate"
      ]
    },
    {
      id: "EXP_03",
      title: "Mechanical Engineer",
      company: "sUNSWim – UNSW ROV Team",
      date: "Aug 2025 – Present",
      points: [
        "Designed 12 ROV chassis/peripheral components for underwater operation (1m depth prototype)",
        "3D Printing/Laser Cut manufacture testing, CFD and structural FEA",
        "Competing at SAUVC 2026, Sanya, China"
      ]
    },
    {
      id: "EXP_04",
      title: "Director of Media and Communication",
      company: "PPIA (Indonesian Student Association of Australia)",
      date: "Jan 2025 – Present",
      points: [
        "Led media/communications division: branding, copywriting, design, content",
        "Cross-division coordination; consistent messaging for events/campaigns",
        "Managing PPI Australia Instagram with 23,000 followers"
      ]
    }
  ],
  skills: {
    cad: ["SolidWorks (CSWA Certified)", "Fusion 360", "CATIA"],
    simulation: ["CFD", "FEM", "ANSYS", "ABAQUS", "SolidWorks Simulation"],
    programming: ["MATLAB", "Python", "C+", "Arduino"]
  }
};
