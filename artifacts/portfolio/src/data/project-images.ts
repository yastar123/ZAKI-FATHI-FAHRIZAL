import img_site from "@assets/image_1781613927361.png";
import img_cfd_pressure from "@assets/image_1781613934251.png";
import img_data_table from "@assets/image_1781613956843.png";
import img_cad_drawing from "@assets/image_1781613961323.png";
import img_chart_spiral from "@assets/image_1781613971853.png";
import img_cfd_temp from "@assets/image_1781613976938.png";
import img_cfd_designs from "@assets/image_1781613981007.png";
import img_fluent_setup from "@assets/image_1781613985755.png";
import img_cad_domain from "@assets/image_1781613991052.png";
import img_cfd_results from "@assets/image_1781614070009.png";
import img_analysis from "@assets/image_1781614074086.png";
import img_cost_table from "@assets/image_1781614077926.png";

import img02_kiln_site from "@assets/image_1781614965388.png";
import img02_inspection from "@assets/image_1781615035970.png";
import img02_brick_crack from "@assets/image_1781615039903.png";
import img02_cad_drawing from "@assets/image_1781615086104.png";
import img02_material from "@assets/image_1781615090095.png";
import img02_calculation from "@assets/image_1781615094234.png";
import img02_ansys_model from "@assets/image_1781615099868.png";
import img02_infrared from "@assets/image_1781615103876.png";
import img02_structural_setup from "@assets/image_1781615107682.png";
import img02_stress from "@assets/image_1781615178965.png";
import img02_temp_dist from "@assets/image_1781615184659.png";
import img02_shear from "@assets/image_1781615189795.png";
import img02_temp_chart from "@assets/image_1781615194035.png";
import img02_inspection2 from "@assets/image_1781615262911.png";
import img02_burner from "@assets/image_1781615267195.png";
import img02_tunnel from "@assets/image_1781615271766.png";
import img02_intern from "@assets/image_1781615276158.png";

export interface ProjectImage {
  src: string;
  caption: string;
  type: "site" | "cad" | "cfd" | "data" | "chart" | "software" | "analysis";
}

export const PROJECT_01_IMAGES: ProjectImage[] = [
  { src: img_site, caption: "Suspension Pre-Heater Tower — PT Semen Baturaja, Indonesia", type: "site" },
  { src: img_cad_drawing, caption: "CAD Drawing — Cyclone Flow Deflector Design Variants", type: "cad" },
  { src: img_cfd_pressure, caption: "ANSYS CFD — Pressure Contour and Flow Streamlines", type: "cfd" },
  { src: img_cfd_temp, caption: "ANSYS CFD — Total Temperature Distribution Top View", type: "cfd" },
  { src: img_data_table, caption: "ILC Data Table — Temperature Pressure dp Profile Across Kilnline", type: "data" },
  { src: img_chart_spiral, caption: "Theoretical Chart — Effective Spiral Paths vs Max Velocity", type: "chart" },
  { src: img_cfd_designs, caption: "ANSYS CFD — Design Comparison Grid 5 Modifications", type: "cfd" },
  { src: img_fluent_setup, caption: "ANSYS Fluent Setup — Mesh and Solver Configuration", type: "software" },
  { src: img_cad_domain, caption: "CAD Flow Domain — Nutation Movement Geometry CATIA", type: "cad" },
  { src: img_cfd_results, caption: "CFD Results — 5 Design Variant Pressure Contours", type: "cfd" },
  { src: img_analysis, caption: "Design Analysis — Efficiency Comparison and CAD Models", type: "analysis" },
  { src: img_cost_table, caption: "Cost Loss Table — Cyclone Losses per Hour IDR Each Design", type: "data" },
];

export const PROJECT_02_IMAGES: ProjectImage[] = [
  { src: img02_kiln_site, caption: "Rotary Kiln Facility — PT Semen Baturaja, Indonesia (72m length, 4.556m diameter)", type: "site" },
  { src: img02_temp_dist, caption: "ANSYS Steady-State Thermal — Temperature Distribution along Kiln Shell (Max 842.75°C)", type: "cfd" },
  { src: img02_stress, caption: "ANSYS Static Structural — Equivalent von-Mises Stress Distribution (Max 1.03 GPa at supports)", type: "cfd" },
  { src: img02_shear, caption: "ANSYS Static Structural — Shear Stress XY Component Distribution along Shell", type: "cfd" },
  { src: img02_temp_chart, caption: "Kiln Temperature Distribution — Shell, Outer Brick, Inner Brick across all 20 zones", type: "chart" },
  { src: img02_infrared, caption: "Infrared Scanner Output — Shell Temperature Heatmap with Max Temp 356°C at Zone 10", type: "software" },
  { src: img02_ansys_model, caption: "ANSYS 2025 R2 — 3D FEA Model of Rotary Kiln (4 Material Zones, 72m length)", type: "cfd" },
  { src: img02_structural_setup, caption: "ANSYS Static Structural Setup — Boundary Conditions, Point Masses, Acceleration (9.81 m/s²)", type: "software" },
  { src: img02_cad_drawing, caption: "CAD Drawing Review — Kiln Zone Layout with Brick Types per Section", type: "cad" },
  { src: img02_material, caption: "Material Properties — ASTM A516 Shell Steel (Young's Modulus 200 GPa, Yield 260 MPa)", type: "data" },
  { src: img02_calculation, caption: "Theoretical Heat Flux Calculations — Boundary Conditions for 4 Kiln Zones", type: "analysis" },
  { src: img02_inspection, caption: "Kiln Inspection — Workers examining Refractory Brick Condition inside the Kiln", type: "site" },
  { src: img02_brick_crack, caption: "Refractory Brick Crack — Close-up of Thermal Expansion-Induced Cracking", type: "site" },
  { src: img02_inspection2, caption: "Internal Kiln Inspection — Assessing Refractory Brick and Coating Integrity", type: "site" },
  { src: img02_burner, caption: "Kiln Burner Zone — Interior View of the Burning Zone (Gas Temp: 1450°C)", type: "site" },
  { src: img02_tunnel, caption: "Inside Rotary Kiln Tunnel — Fired Refractory Brick Lining Condition", type: "site" },
  { src: img02_intern, caption: "Field Inspection — Process Engineering Intern inside Rotary Kiln during Shutdown", type: "site" },
];
