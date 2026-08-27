import React from 'react';
import { 
  FolderGit2, 
  Lock, 
  ExternalLink, 
  Download, 
  Globe, 
  Calendar, 
  Tag 
} from 'lucide-react';
import { ProjectData } from './projectTypes';

interface ProjectCardProps {
  project: ProjectData;
}

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="h-min group relative flex flex-col justify-between p-5 bg-alpha-3 border border-alpha-6 rounded-xl transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-alpha-7 hover:shadow-lg hover:shadow-beta/5 text-beta-2 overflow-hidden">
      {/* Subtle ambient hover glow */}
      <div 
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(350px circle at 50% 0%, var(--color-accent-alpha) / 0.08, transparent 70%)'
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Header: Title, Repo Link & Visibility/Version */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            {project.isPublic && project.repoUrl ? (
              <FolderGit2 className="w-4 h-4 text-beta-5 shrink-0 group-hover:text-link-text transition-colors" />
            ) : (
              <Lock className="w-4 h-4 text-beta-5 shrink-0" />
            )}

            {project.isPublic && project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link flex items-center gap-1 text-sm font-semibold text-beta hover:text-link-text truncate focus:outline-none focus:ring-2 focus:ring-accent-alpha rounded transition-colors"
              >
                <span className="truncate">{project.name}</span>
                <ExternalLink className="w-3 h-3 opacity-0 -translate-x-1 translate-y-0.5 group-hover/link:opacity-100 group-hover/link:translate-x-0 group-hover/link:translate-y-0 transition-all duration-150 shrink-0" />
              </a>
            ) : (
              <span className="text-sm font-semibold text-beta truncate">
                {project.name}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Version Badge */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-beta-4 bg-alpha-3 border border-alpha-6 rounded-md">
              <Tag className="w-2.5 h-2.5 text-beta-5" />
              {project.version}
            </span>

            {/* Visibility Badge */}
            <span className="px-2 py-0.5 text-[11px] font-medium text-beta-5 bg-alpha-4 border border-alpha-6 rounded-full">
              {project.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-beta-5 line-clamp-3 leading-relaxed mb-4 group-hover:text-beta-3 transition-colors">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech.name}
                className="px-2 py-0.5 text-[11px] font-medium text-link-text bg-alpha-3 hover:bg-alpha-5 border border-alpha-6 rounded-md transition-colors"
              >
                {tech.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Live Site / Download Actions & Timestamp */}
      <div className="relative z-10 pt-3 border-t border-alpha-6 flex flex-wrap items-center justify-between gap-y-2 text-xs text-beta-5">
        <div className="flex items-center gap-2">
          {/* Live Webpage Link */}
          {project.webpageUrl && (
            <a
              href={project.webpageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 py-1 font-medium text-beta-3 hover:text-link-text bg-alpha-3 hover:bg-alpha-5 border border-alpha-6 rounded-md transition-colors"
            >
              <Globe className="w-3 h-3" />
              <span>Live Site</span>
            </a>
          )}

          {/* Download Link */}
          {project.downloadUrl && (
            <a
              href={project.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-1 px-2 py-1 font-medium text-beta hover:text-alpha hover:opacity-90 hover:bg-beta-3 bg-accent-alpha/30  border border-alpha-6 rounded-md transition-all"
            >
              <Download className="w-3 h-3" />
              <span>Download</span>
            </a>
          )}
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1 text-[11px] text-beta-5 ml-auto">
          <Calendar className="w-3 h-3" />
          <span>Updated {formatDate(project.updatedAt)}</span>
        </div>
      </div>
    </article>
  );
};