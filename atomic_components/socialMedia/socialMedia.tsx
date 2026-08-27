'use client';

import React from 'react';
import Link from 'next/link';
import { SOCIAL_ICON_REGISTRY } from '@/atomic_components/socialMedia/socialIcons';

export interface SocialLinkEntry {
  platform: string;
  url: string;
  label?: string; // Optional override for the default name
}

interface SocialLinksProps {
  links: SocialLinkEntry[];
  className?: string;
  iconSizeClass?: string;
}

export default function SocialLinks({
  links,
  className = '',
  iconSizeClass = 'h-5 w-5',
}: SocialLinksProps) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className} flex-wrap`}>
      {links.map((item) => {
        const config = SOCIAL_ICON_REGISTRY[item.platform.toLowerCase()];
        if (!config) return null;

        const Icon = config.icon;
        const displayName = item.label || config.name;
        const isExternal = item.url.startsWith('http');

        return (
          <div key={`${item.platform}-${item.url}`} className="group relative flex items-center justify-center">
            <Link
              href={item.url}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="p-1 text-beta-2 transition-all duration-150 hover:text-beta-5 hover:scale-110 focus:outline-none focus:text-white"
              aria-label={displayName}
            >
              <Icon className={iconSizeClass} />
            </Link>

            {/* Pure CSS Hover Tooltip */}
            <span
              role="tooltip"
              className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-95 opacity-0 rounded bg-zinc-800 px-2 py-0.5 text-[11px] font-medium text-zinc-200 shadow-md transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap z-20"
            >
              {displayName}
            </span>
          </div>
        );
      })}
    </div>
  );
}