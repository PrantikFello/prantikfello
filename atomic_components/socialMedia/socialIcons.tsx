// config/socialIcons.tsx
import React from 'react';
import { Mail, Globe } from 'lucide-react';
import LinkedinSolidIcon from '@iconify-react/flowbite/linkedin-solid';
import GithubSolidIcon from '@iconify-react/flowbite/github-solid';
import YoutubeSolidIcon from '@iconify-react/flowbite/youtube-solid';
import WhatsappSolidIcon from '@iconify-react/flowbite/whatsapp-solid';
import DiscordSolidIcon from '@iconify-react/flowbite/discord-solid';
import TwitterSolidIcon from '@iconify-react/flowbite/x-company-solid';
import { SiTelegram } from '@icons-pack/react-simple-icons';


// Use React.ComponentType<any> or React.ElementType to allow Lucide and Iconify components to coexist
export type IconComponent = React.ComponentType<any>;

export interface PlatformConfig {
  name: string;
  icon: IconComponent;
}

export const SOCIAL_ICON_REGISTRY: Record<string, PlatformConfig> = {
  github: {
    name: 'GitHub',
    icon: GithubSolidIcon,
  },
  linkedin: {
    name: 'LinkedIn',
    icon: LinkedinSolidIcon,
  },
  youtube: {
    name: 'YouTube',
    icon: YoutubeSolidIcon,
  },
  telegram: {
    name: 'Telegram',
    icon: SiTelegram,
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: WhatsappSolidIcon,
  },
  discord: {
    name: 'Discord',
    icon: DiscordSolidIcon,
  },
  x: {
    name: 'X (Twitter)',
    icon: TwitterSolidIcon,
  },
  email: {
    name: 'Email',
    icon: Mail,
  },
  website: {
    name: 'Website',
    icon: Globe,
  },
};