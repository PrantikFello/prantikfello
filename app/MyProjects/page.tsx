import { ProjectList } from "@/my_compositions/projects/projectList";
import projects from "@/public/josn/projectsData.json";

export default function ProjectsPage() {
    return (
        <div className="w-full max-w-7xl p-(--adaptive-padding) flex justify-center flex-col">
            <header className="mb-6">
                <h1 className="text-xl font-bold text-beta">Projects & Artifacts</h1>
                <p className="text-xs text-beta-5">Showing {projects.length} repositories and releases</p>
            </header>

            <ProjectList projects={projects} />
        </div>
    );
}