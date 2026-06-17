import { motion } from "framer-motion";

export function BlueprintBg() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blueprintGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/40" />
          </pattern>
          <pattern id="blueprintGridLarge" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#blueprintGrid)" />
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/60" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprintGridLarge)" />
      </svg>
    </div>
  );
}
