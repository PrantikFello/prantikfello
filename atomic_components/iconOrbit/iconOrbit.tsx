"use client";

import React, { useState, useMemo, memo } from "react";
import { Terminal, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OrbitItem {
  id: string;
  name: string;
  iconUrl?: string;
  color?: string;
}

export interface OrbitRingData {
  tier?: string;
  radius?: number;
  speed?: number;
  duration?: number;
  delay?: number;
  reverse?: boolean;
  path?: boolean;
  iconSize?: number;
  items: OrbitItem[];
}

export interface OrbitConfigRoot {
  centerButton?: {
    label?: string;
    tooltip?: string;
    iconUrl?: string;
  };
  orbits: OrbitRingData[];
}

export interface GenericTechOrbitProps {
  data?: OrbitConfigRoot;
  baseRadiusStep?: number;
  className?: string;
  onItemClick?: (item: OrbitItem) => void;
  onCenterClick?: () => void;
}

const ORBIT_STYLES = `
@keyframes orbit-cw {
  0% {
    transform: rotate(var(--angle)) translateY(var(--radius)) rotate(calc(var(--angle) * -1));
  }
  100% {
    transform: rotate(calc(var(--angle) + 360deg)) translateY(var(--radius)) rotate(calc(var(--angle) * -1 - 360deg));
  }
}
@keyframes orbit-ccw {
  0% {
    transform: rotate(var(--angle)) translateY(var(--radius)) rotate(calc(var(--angle) * -1));
  }
  100% {
    transform: rotate(calc(var(--angle) - 360deg)) translateY(var(--radius)) rotate(calc(var(--angle) * -1 + 360deg));
  }
}
`;

const OrbitBadge = memo(function OrbitBadge({
  item,
  size,
  onClick,
}: {
  item: OrbitItem;
  size: number;
  onClick?: (item: OrbitItem) => void;
}) {
  const [hasError, setHasError] = useState(!item.iconUrl);

  return (
    <button
      type="button"
      onClick={() => onClick?.(item)}
      title={item.name}
      aria-label={item.name}
      className="group relative flex size-full items-center justify-center rounded-full border border-neutral-200 bg-white/70 p-2 shadow-md transition-transform duration-200 ease-out hover:scale-125 hover:z-30 active:scale-95"
      style={{ color: item.color }}
    >
      {!hasError && item.iconUrl ? (
        <img
          src={item.iconUrl}
          alt={item.name}
          onError={() => setHasError(true)}
          className="size-full object-contain pointer-events-none select-none"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span
          className="font-bold uppercase tracking-tight text-neutral-800 select-none"
          style={{ fontSize: `${Math.max(Math.round(size * 0.28), 10)}px` }}
        >
          {item.name.slice(0, 2)}
        </span>
      )}

      {/* Floating Hover Tooltip */}
      <span className="pointer-events-none absolute -bottom-8 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-0.5 text-[11px] font-medium text-neutral-100 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 z-40">
        {item.name}
      </span>
    </button>
  );
});

export function GenericTechOrbit({
  data,
  baseRadiusStep = 75,
  className,
  onItemClick,
  onCenterClick,
}: GenericTechOrbitProps) {
  const [isPaused, setIsPaused] = useState(false);

  const resolvedOrbits = useMemo(() => {
    if (!data?.orbits?.length) return [];
    return data.orbits.map((layer, index) => {
      const radius = layer.radius ?? (index + 1) * baseRadiusStep + 40;
      const speed = Math.max(layer.speed ?? 1 / (index + 1), 0.001);
      const duration = (layer.duration ?? 24) / speed;
      const reverse = layer.reverse ?? index % 2 !== 0;

      return {
        ...layer,
        radius,
        duration,
        reverse,
        iconSize: layer.iconSize ?? 36,
        path: layer.path ?? true,
      };
    });
  }, [data, baseRadiusStep]);

  const maxRadius = useMemo(() => {
    return resolvedOrbits.length
      ? Math.max(...resolvedOrbits.map((o) => o.radius), 160)
      : 200;
  }, [resolvedOrbits]);

  if (!data) {
    return (
      <div className="flex min-h-96 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-neutral-300 p-8 text-center dark:border-neutral-800">
        <AlertCircle className="size-8 text-rose-500" />
        <p className="text-sm font-medium text-rose-500">No orbit configuration provided.</p>
      </div>
    );
  }

  const containerDimension = (maxRadius + 60) * 2;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl bg-neutral-950/[0.02] p-8 dark:bg-neutral-900/10",
        isPaused && "[&_.orbit-node]:[animation-play-state:paused]",
        className
      )}
      style={{ minHeight: `${containerDimension}px` }}
    >
      <style>{ORBIT_STYLES}</style>

      {/* Central Interactive Hub */}
      <div className="z-20 flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={onCenterClick}
          title={data.centerButton?.tooltip ?? "Center Core"}
          className="group relative flex size-14 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-xl transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:shadow-primary/20 hover:shadow-2xl active:scale-95"
          aria-label={data.centerButton?.label ?? "Center"}
        >
          <span className="absolute -inset-1.5 -z-10 rounded-full bg-primary/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
          {data.centerButton?.iconUrl ? (
            <img
              src={data.centerButton.iconUrl}
              alt="Center Icon"
              className="size-6 object-contain"
            />
          ) : (
            <Terminal className="size-6 text-neutral-900 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
          )}
        </button>
        {data.centerButton?.label && (
          <span className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground select-none">
            {data.centerButton.label}
          </span>
        )}
      </div>

      {/* Single Consolidated SVG Grid Track */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 size-full"
        aria-hidden="true"
      >
        {resolvedOrbits.map((layer, idx) =>
          layer.path ? (
            <circle
              key={`track-${layer.tier ?? idx}`}
              className="stroke-neutral-300/60 stroke-[1.2] dark:stroke-neutral-800/80 [stroke-dasharray:4_4]"
              cx="50%"
              cy="50%"
              r={layer.radius}
              fill="none"
            />
          ) : null
        )}
      </svg>

      {/* Orbit Rings & Positioned Badges */}
      {resolvedOrbits.map((layer, layerIdx) => (
        <React.Fragment key={layer.tier ?? `ring-${layerIdx}`}>
          {layer.items.map((item, index) => {
            const angleDeg = (360 / Math.max(layer.items.length, 1)) * index;
            const animationName = layer.reverse ? "orbit-ccw" : "orbit-cw";

            return (
              <div
                key={item.id ?? `${layerIdx}-${index}`}
                className="orbit-node absolute flex items-center justify-center rounded-full"
                style={
                  {
                    "--angle": `${angleDeg}deg`,
                    "--radius": `${layer.radius}px`,
                    width: `${layer.iconSize}px`,
                    height: `${layer.iconSize}px`,
                    transformOrigin: "center center",
                    animation: `${animationName} ${layer.duration}s linear ${
                      layer.delay ? `-${layer.delay}s` : "0s"
                    } infinite`,
                  } as React.CSSProperties
                }
              >
                <OrbitBadge
                  item={item}
                  size={layer.iconSize}
                  onClick={onItemClick}
                />
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

export default GenericTechOrbit;