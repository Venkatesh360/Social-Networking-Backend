import { db } from "@/dbConfig/config";
import { getTokenData } from "@/helper/getTokenData";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {userId,username, postId, commentText } = reqBody;
          // Assuming getTokenData returns a username as well

        // Reference to the comments subcollection of a specific post
        const commentsCollectionRef = collection(db, "discussion", postId, "comments");

        // Add a new comment to the comments subcollection
        await addDoc(commentsCollectionRef, { 
            userId: userId,
            username: username,
            text: commentText,
            likes:0,
            timestamp: new Date()
        });

        return NextResponse.json({ message: "Comment added successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || error }, { status: 500 });
    }
}
