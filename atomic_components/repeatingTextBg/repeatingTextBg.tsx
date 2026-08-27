'use client';

import React, { useState, useEffect, useMemo } from 'react';

// --- Child Component: Individual Font Tile ---
interface FontTileProps {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string | number;
  width?: number | string;
}

export const FontTile: React.FC<FontTileProps> = ({
  text,
  fontFamily,
  fontSize,
  fontWeight,
  width,
}) => {
  return (
    <div
      className="break-words whitespace-normal leading-tight select-none"
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        fontFamily,
        fontSize: `${fontSize}px`,
        fontWeight,
      }}
    >
      {text}
    </div>
  );
};

// --- Parent Component: Grid Orchestrator with Offset Rows ---
export interface TextBackgroundProps {
  text?: string;
  className?: string;
  fontFamilies?: string[];
  color?: string;
  opacity?: number;
  fontSize?: number;
  fontWeight?: string | number;
  /** Fixed width per grid tile (px). Enables strict wrapping inside the tile */
  fixedWidth?: number;
  /** Gap between grid columns (px) */
  gapX?: number;
  /** Gap between grid rows (px) */
  gapY?: number;
  /** Number of vertical rows */
  rowCount?: number;
  /** Number of columns per row (should exceed screen width to compensate for translation) */
  colCount?: number;
  /** Maximum random translateX offset per line in pixels */
  maxTranslateX?: number;
  customSeed?: number;
}

// Deterministic PRNG to ensure matching layout across iterations
function createPrng(seed: number) {
  let s = Math.abs(Math.floor(seed)) % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const TextBackground: React.FC<TextBackgroundProps> = ({
  text = "55555555555555555555555555555555555555555555555555555555555555555555555",
  className = "",
  fontFamilies = [
    'LeagueScript',
    'MrsSaintDelafield',
    'QwitcherGrypen',
    'Shalimar',
  ],
  color = "text-white",
  opacity = 0.22,
  fontSize = 38,
  fontWeight = 400,
  fixedWidth = 320,
  gapX = 32,
  gapY = 24,
  rowCount = 12,
  colCount = 8,
  maxTranslateX = 260,
  customSeed,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSeed, setActiveSeed] = useState<number>(() => customSeed ?? 1337);

  // Seed on initial client mount/refresh to vary offsets and font picks per visit
  useEffect(() => {
    setIsMounted(true);
    if (customSeed === undefined) {
      setActiveSeed(Date.now());
    }
  }, [customSeed]);

  // Compute the randomized row translation values and font assignments
  const gridRows = useMemo(() => {
    if (!isMounted) return [];

    const prng = createPrng(activeSeed);
    const fonts = fontFamilies.length > 0 ? fontFamilies : ['system-ui', 'sans-serif'];
    const rows = [];

    for (let r = 0; r < rowCount; r++) {
      // Random negative X translation offset per row
      const randomOffsetX = Math.floor(prng() * maxTranslateX);
      const tiles = [];

      for (let c = 0; c < colCount; c++) {
        const fontIndex = Math.floor(prng() * fonts.length);
        tiles.push({
          id: `tile-${r}-${c}`,
          font: fonts[fontIndex],
        });
      }

      rows.push({
        id: `row-${r}`,
        offsetX: randomOffsetX,
        tiles,
      });
    }

    return rows;
  }, [isMounted, activeSeed, fontFamilies, rowCount, colCount, maxTranslateX]);

  if (!isMounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden flex flex-col justify-start z-0 ${color} ${className}`}
      style={{
        opacity,
        rowGap: `${gapY}px`,
      }}
    >
      {gridRows.map((row) => (
        <div
          key={row.id}
          className="grid will-change-transform"
          style={{
            transform: `translate3d(-${row.offsetX}px, 0, 0)`,
            columnGap: `${gapX}px`,
            gridTemplateColumns: `repeat(${colCount}, ${fixedWidth}px)`,
          }}
        >
          {row.tiles.map((tile) => (
            <FontTile
              key={tile.id}
              text={text}
              fontFamily={tile.font}
              fontSize={fontSize}
              fontWeight={fontWeight}
              width={fixedWidth}
            />
          ))}
        </div>
      ))}
    </div>
  );
};