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