import { auth } from "@clerk/nextjs/server";
import prisma from "../db";
import { GradientHeader } from "@/components/ui/gradient-header";
import { Button } from "@/components/ui/button";
import {  PlusIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryDesign } from "../data/category-data";
import { Badge } from "@/components/ui/badge";
import FeedbackList from "@/components/feedback-list";


export default async function FeedbackPage() {
    const {userId} = await auth();
    const posts = await prisma.post.findMany({
        include: {
            author: true, 
            votes: true 
        }, 
        orderBy: {
            createdAt: "desc"
        }
    });
    
    const categories =  await prisma.post.groupBy({
        by: ["category"], 
        _count: true
    });
    return (
        <div>
            <div className="space-y-6">
                <GradientHeader 
                    title="Community Feedback"
                    subtitle="Explore, vote, and contribute to the features that matter most. Your voice shapes our product's future."
                >
                    <div className="flex gap-4 justify-center pt-4">
                        <Button asChild size="lg" className="bg-white text-blue-600 hover:by-grey-100">
                            <Link href="/feedback/new">
                                <PlusIcon className="ml-2 h-4 w-4" />
                                New Feedback 
                            </Link>
                        </Button>

                        <Button asChild size="lg" className="bg-white text-black gover:bg-gray-100">
                            <Link href="/roadmap">
                                View Roadmap 
                            </Link>
                        </Button>
                    </div>
                </GradientHeader>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap6">
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Categoreis</CardTitle>
                                <CardDescription>Browse feedback by category</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    {categories.map((c) => {
                                        const design = getCategoryDesign(c.category);
                                        const Icon = design.icon; 

                                        return (
                                            <div key={c.category} className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"> 

                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${design.light} ${design.border} border`}>

                                                        <Icon className={`h-4 w-4 ${design.text}`}></Icon>
                                                    
                                                    </div>

                                                    <span className="font-medium text-sm">
                                                        {c.category}
                                                    </span>

                                                </div>

                                                <Badge variant="secondary" className={`${design.light} ${design.text}`}>
                                                    {c._count}
                                                </Badge>
                                            
                                            </div>
                                        );
                                    })}
                                </div>

                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-3">
                        <FeedbackList initialPosts={posts} userId={userId} />
                    </div>
                
                
                </div>

            </div>
        </div>
    )
}