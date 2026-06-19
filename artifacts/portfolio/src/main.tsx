import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@workspace/api-client-react";

// Configure API base URL to use deployed Vercel API server
setBaseUrl("https://zaki-fathi-fahrizal-api-server.vercel.app");

createRoot(document.getElementById("root")!).render(<App />);
