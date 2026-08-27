import React from 'react';
import { ProjectCard } from './projectCard';
import { ProjectData } from './projectTypes';

interface ProjectListProps {
  projects: ProjectData[];
  emptyMessage?: string;
}

export const ProjectList: React.FC<ProjectListProps> = ({ 
  projects, 
  emptyMessage = "No projects found." 
}) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-beta-5 bg-alpha-1 border border-alpha-6 rounded-xl">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};