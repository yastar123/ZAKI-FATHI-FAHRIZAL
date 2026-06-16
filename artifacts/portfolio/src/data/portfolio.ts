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
      title: "Thermo-Structural Analysis of Refractory Brick Layer in Rotary Kiln",
      role: "Process Engineering Intern",
      company: "PT Semen Baturaja Tbk",
      date: "Dec 2025 – Present",
      what: "FEA + thermal analysis of refractory bricks inside a rotary kiln operating at 1450°C combustion temperature. Bricks expand due to temperature gradients and crack, causing uneven heat transfer.",
      method: "Kiln divided into 4 zones (Inlet, Burning, Cooling, Outlet). Boundary conditions (heat flux, convection, coating thickness) calculated from real infrared sensor measurements. CAD + real material properties inserted.",
      result: "Max temperature in outer brick layer: 800–900°C at meter 36. Max stress: 35–39 MPa (safe — UTS ~400 MPa). Coating thickness estimable from thermal calculations.",
      tools: ["ABAQUS FEA", "SolidWorks CAD", "Infrared sensor data", "Heat flux calculations"]
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
      method: "3D Printing + Laser Cutting. FEA (hydrostatic force up to 5m depth). CFD for drag, buoyancy, centre of mass/buoyancy optimization. Pool testing.",
      result: "Drag coefficient: 0.91–0.97 in air at 1 m/s. Design operates safely (FEA validated). Currently optimizing AUV III shell for better cable management.",
      tools: ["SolidWorks", "ANSYS", "3D Printing", "Laser Cutting", "Pool Testing"]
    },
    {
      id: "05",
      title: "Knee Brace for Osteoarthritis",
      role: "Team member, structural validation lead",
      company: "DESN2000 Course Project",
      date: "Past",
      what: "Design and FEA validation of a knee brace to assist users with osteoarthritis. Main principle: traction system reduces joint stress while enabling movement.",
      method: "Validated structural strength of the gearing system connecting upper and lower knee braces. Dog Clutch mechanism enables easy component swap. Boundary Conditions: Torque 30 Nm, Weight 80 kg, Traction 20% body weight, Hinge fixed.",
      result: "Factor of Safety > 13. Life Cycle > 1 Million cycles (infinite-life region). Max Stress: 6.56 MPa (far below Aluminium 6061 fatigue limit of 95 MPa). No risk of yielding.",
      tools: ["SolidWorks Simulation", "FEA"]
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
