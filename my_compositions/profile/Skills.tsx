import GenericTechOrbit from "@/atomic_components/iconOrbit/iconOrbit";
import SkillCardIterator from "@/atomic_components/skillCard/skillCard";

import techStack from "@/public/josn/techStack.json"

export default function Skills() {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute p-(--adaptive-padding) w-full">
                <h3 className="my-3 text-md md:text-xl font-bold">TECHSTACK -/^V</h3>
                <div className="w-full">
                    <SkillCardIterator data={techStack} />

                </div >

            </div>
            <div className="relative">
                <GenericTechOrbit data={techStack} />
            </div>
        </section>
    );
}

