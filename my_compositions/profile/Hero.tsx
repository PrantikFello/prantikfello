'use client'
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import SocialLinks from '@/atomic_components/socialMedia/socialMedia';
import profileData from '@/public/josn/heroSocial.json'


export default function Hero() {


    return (
        <section className='relative px-(--adaptive-padding)  overflow-hidden h-full flex items-center justify-center'>

            <div
                aria-hidden="true"
                className="absolute z-20 top-0 left -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-linear-to-br from-beta to-beta blur-[180px] rounded-full pointer-events-none"
            />

            <section className="relative   overflow-hidden bg-alpha-3 py-24 sm:py-32 text-beta-3">


                <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
                    <div className="flex flex-col items-start gap-y-6">

                        {/* Availability Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                            </span>
                            Available for new projects
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl max-w-3xl">
                            Engineering robust systems & craft-driven interfaces.
                        </h1>

                        {/* Subtitle / Bio */}
                        <p className="text-lg leading-8 text-beta-2 max-w-2xl">
                            Hi, I’m <span className="text-accent-alpha font-semibold">Prantik Roy</span>. I’m a full-stack engineer focused on performance, distributed architectures, and polished user interactions.
                        </p>

                        {/* Call to Actions */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                href="/MyProjects"
                                className="inline-flex items-center gap-2 rounded-lg bg-beta-1 px-5 py-3 text-sm font-semibold text-alpha transition hover:bg-beta-3 focus:outline-none focus:ring-2 focus:ring-beta-5 focus:ring-offset-2 focus:ring-offset-alpha"
                            >
                                View Work
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href=""
                                className="inline-flex items-center gap-2 rounded-lg border border-beta-3 bg-alpha-5 px-5 py-3 text-sm font-semibold text-beta-3 transition hover:border-beta-1 hover:bg-alpha-6 hover:text-beta-1 focus:outline-none focus:ring-2 focus:ring-beta-3 focus:ring-offset-2 focus:ring-offset-alpha"
                            >
                                Get in Touch
                            </Link>
                        </div>

                        {/* Social Proof / Links */}
                        <div className="flex items-start gap-6 pt-6 border-t border-beta-2 w-full text-beta-3 justify-start">
                            <span className="text-xs uppercase tracking-wider text-beta-3 font-mono text-nowrap items-center">Connect : </span>
                            <SocialLinks links={profileData.heroLinks} />
                        </div>

                    </div>
                </div>
            </section>
        </section>
    );
}