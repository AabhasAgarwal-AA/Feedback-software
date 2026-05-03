"use client";

import { Sparkle, Map, MessageSquare } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function Navbar(){
    return <nav className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-justify justify-between px-4">
            <div className="flex items-center gap-6">
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-linear-to-r from-blue-500 to-purpele-500 flex items-center justify-center">
                            <Sparkle className="h-4 w-4 text-white" />
                        </div>

                        <span className="text-xl font-bold ">Feedback app</span>

                    </div>
                </Link>

                <Link href="/roadmap" className="text-sm hover:text-primary flex items-center gap-1">
                    <Map className="h-4 w-4" /> 
                    Roadmap               
                </Link>

                <Link href="/feedback" className="text-sm hover:text-primary flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    feedback
                </Link>
            </div>
            <div className="flex items-center gap-4 ">
                <ThemeToggle />
            </div>
        </div>
    </nav>
}