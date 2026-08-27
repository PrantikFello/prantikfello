// types.ts
export interface TechItem {
  name: string;
  category?: 'language' | 'framework' | 'tool' | string;
}

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  version: string;
  repoUrl?: string | null;
  isPublic: boolean;
  webpageUrl?: string | null;
  downloadUrl?: string | null;
  updatedAt: string;
  techStack: TechItem[];
}