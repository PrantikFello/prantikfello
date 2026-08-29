import { TextBackground } from "@/atomic_components/repeatingTextBg/repeatingTextBg";
import Hero from "@/my_compositions/profile/Hero";
import Skills from "@/my_compositions/profile/Skills";

export default function ProfilePage() {
    return (
        <div className="snap_container">

            {/* 1. Ensure the parent snap section has relative, overflow-hidden, and full height */}
            <div className="snap_div relative overflow-hidden ">

                {/* Repeating Grid Background */}
                <TextBackground
                    text="I am a self-taught developer who approaches software engineering through distributed systems and domain-specific architecture. I design networks of specialized programs where each node performs a meaningful role, enabling computation and processing to happen efficiently throughout the system rather than relying on a single centralized point. My focus is on building software that is modular, efficient, resilient, and purpose-built for the domain it serves."
                    fontFamilies={[
                        // 'LeagueScript',
                        'MrsSaintDelafield',
                        'QwitcherGrypen',
                        'Shalimar',
                    ]}
                    color="text-beta"
                    opacity={0.5}
                    fontSize={20}
                    fixedWidth={300}      // Width of each grid column (forces wrapping)
                    gapX={36}             // Gap between grid columns
                    gapY={24}             // Gap between grid rows
                    rowCount={7}         // Total vertical rows
                    colCount={8}          // Total columns per row (compensates for leftward translation)
                    maxTranslateX={300}   // Max random line offset in px
                    className="z-0 p-(--adaptive-padding)"
                />

                {/* 3. Ensure Hero container has transparent background and sits on top */}
                <div className="relative z-10 w-full h-full">
                    <Hero />
                </div>
            </div>

            <div className="snap_div">
                <Skills />
            </div>

        </div>
    );
}