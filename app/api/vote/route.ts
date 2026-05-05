import prisma from "@/app/db";
import { SyncCurrentUser } from "@/lib/sync-user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try{
        const dbUser = await SyncCurrentUser();
        if(!dbUser){
            return NextResponse.json({
                error: "unauthorized"
            }, {
                status: 401 
            });
        }
        const postId = await request.json(); 
        if(!postId){
            return NextResponse.json({
                error: "post id is required"
            }, {
                status: 400 
            });
        }

        const existingVote = await prisma.vote.findUnique({
            where: {
                userId_postId: {
                    userId: dbUser.id, 
                    postId
                }
            }
        });

        if(existingVote){
            await prisma.vote.delete({
                where: {
                    id: existingVote.id 
                }
            });
            return NextResponse.json({
                voted: false 
            }); 
        } else {
            await prisma.vote.create({
                data: {
                    userId: dbUser.id, 
                    postId 
                }
            }); 
            return NextResponse.json({
                voted: true 
            }); 
        }


    } catch (error) {
        console.error("error in voting: ", error);
        return NextResponse.json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}