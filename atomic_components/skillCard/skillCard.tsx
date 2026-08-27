// import React from "react";
// import { OrbitConfigRoot, OrbitRingData } from "@/atomic_components/iconOrbit/iconOrbit";

// export interface SkillCardProps {
//   head: string;
//   items: string[];
//   className?: string;
// }

// export const SkillCard: React.FC<SkillCardProps> = ({
//   head,
//   items,
//   className = "",
// }) => {
//   const skillList = Array.isArray(items) ? items : [];

//   return (
//     <div
//       className={`flex w-max max-w-full bg-alpha-2 flex-col rounded-lg border border-alpha-6 bg-alpha p-2 md:px-4 shadow-sm transition-all ${className}`}
//     >
//       <h3 className="mb-1.5 text-[11px] md:text-[16px]  border-b border-alpha-5 pb-1 font-bold tracking-tight text-beta truncate">
//         {head}
//       </h3>
//       <ul className="space-y-0.1">
//         {skillList.map((name, index) => (
//           <li
//             key={`${name}-${index}`}
//             className="flex items-center gap-2"
//           >
//             <span
//               className="h-1 w-1 md:h-2 md:w-2 shrink-0 rounded-full bg-accent-beta"
//               aria-hidden="true"
//             />
//             <span className="text-[10px] md:text-[15px]">{name}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// function formatTierHead(tier?: string): string {
//   if (!tier) return "General";
//   return tier
//     .split("_")
//     .map((word) =>
//       word.toLowerCase() === "and"
//         ? "&"
//         : word.charAt(0).toUpperCase() + word.slice(1)
//     )
//     .join(" ");
// }

// interface SkillCardIteratorProps {
//   data?: OrbitConfigRoot | OrbitRingData[];
//   className?: string;
// }

// export const SkillCardIterator: React.FC<SkillCardIteratorProps> = ({
//   data,
//   className = "",
// }) => {
//   const orbits: OrbitRingData[] = Array.isArray(data)
//     ? data
//     : Array.isArray(data?.orbits)
//     ? data.orbits
//     : [];

//   if (orbits.length === 0) {
//     return null;
//   }

//   return (
//     <div
//       className={`flex w-full flex-wrap justify-between gap-y-3 sm:gap-y-4 md:gap-y-6 ${className}`}
//     >
//       {orbits.map((orbit, index) => (
//         <div
//           key={orbit?.tier ?? `orbit-${index}`}
//           className="flex w-1/2 odd:justify-start even:justify-end"
//         >
//           <SkillCard
//             head={formatTierHead(orbit?.tier)}
//             items={
//               Array.isArray(orbit?.items)
//                 ? orbit.items.map((item) =>
//                     typeof item === "string" ? item : item.name
//                   )
//                 : []
//             }
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SkillCardIterator;

import React from "react";
import { OrbitConfigRoot, OrbitRingData } from "@/atomic_components/iconOrbit/iconOrbit";

export interface SkillCardProps {
  head: string;
  items: string[];
  className?: string;
  /** Set to true for continuous spinning, or 'hover' to animate only on hover */
  animated?: boolean | "hover";
}

export const SkillCard: React.FC<SkillCardProps> = ({
  head,
  items,
  className = "",
  animated = true,
}) => {
  const skillList = Array.isArray(items) ? items : [];

  return (
    /* Outer container with padding for glow diffusion */
    <div className={`group relative flex w-max max-w-full p-1 ${className}`}>
      {/* 1. Blurred Ambient Glow Layer */}
      {animated && (
        <div
          className={`pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-75 blur-md ${
            animated === "hover"
              ? "opacity-0 transition-opacity duration-300 group-hover:opacity-75"
              : ""
          }`}
          aria-hidden="true"
        >
          <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-accent-beta,#38bdf8)_50%,transparent_100%)]" />
        </div>
      )}

      {/* 2. Sharp Border Track Wrapper */}
      <div className="relative flex h-full w-full overflow-hidden rounded-xl p-[1.5px]">
        {/* Crisp Conic Gradient Layer */}
        {animated && (
          <span
            className={`absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-accent-beta,#38bdf8)_50%,transparent_100%)] ${
              animated === "hover"
                ? "opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite]"
                : "animate-[spin_4s_linear_infinite]"
            }`}
            aria-hidden="true"
          />
        )}

        {/* 3. Content Card (Inner Mask) */}
        <div className="relative z-10 flex h-full w-full flex-col rounded-[10.5px] bg-alpha p-2 shadow-sm md:px-4">
          <h3 className="mb-1.5 truncate border-b border-alpha-5 pb-1 text-[11px] font-bold tracking-tight text-beta md:text-[16px]">
            {head}
          </h3>
          <ul className="space-y-1">
            {skillList.map((name, index) => (
              <li
                key={`${name}-${index}`}
                className="flex items-center gap-2 text-alpha-12"
              >
                <span
                  className="h-1 w-1 shrink-0 rounded-full bg-accent-beta md:h-2 md:w-2"
                  aria-hidden="true"
                />
                <span className="truncate text-[10px] md:text-[15px]">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

function formatTierHead(tier?: string): string {
  if (!tier) return "General";
  return tier
    .split("_")
    .map((word) =>
      word.toLowerCase() === "and"
        ? "&"
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

interface SkillCardIteratorProps {
  data?: OrbitConfigRoot | OrbitRingData[];
  className?: string;
  cardAnimation?: boolean | "hover";
}

export const SkillCardIterator: React.FC<SkillCardIteratorProps> = ({
  data,
  className = "",
  cardAnimation = true,
}) => {
  const orbits: OrbitRingData[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.orbits)
    ? data.orbits
    : [];

  if (orbits.length === 0) {
    return null;
  }

  return (
    <div
      className={`grid w-full grid-cols-2 gap-x-3 gap-y-3 sm:gap-y-4 md:gap-x-6 md:gap-y-6 ${className}`}
    >
      {orbits.map((orbit, index) => (
        <div
          key={orbit?.tier ?? `orbit-${index}`}
          className="flex odd:justify-start even:justify-end"
        >
          <SkillCard
            head={formatTierHead(orbit?.tier)}
            animated={cardAnimation}
            items={
              Array.isArray(orbit?.items)
                ? orbit.items.map((item) =>
                    typeof item === "string" ? item : item.name
                  )
                : []
            }
          />
        </div>
      ))}
    </div>
  );
};

export default SkillCardIterator;