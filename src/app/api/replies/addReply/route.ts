import { db } from "@/dbConfig/config";
import { getTokenData } from "@/helper/getTokenData";
import { addDoc, collection, getDocs, query, serverTimestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {postId,commentId, replyText, userId, username} = reqBody;

        if (!postId || !commentId) {
            return NextResponse.json({ message: "Post ID and Comment ID are required" }, { status: 400 });
        }

        // Reference to the replies subcollection of a specific comment within a post
        const repliesCollectionRef = collection(db, "discussion", postId, "comments", commentId, "replies");
         await addDoc(repliesCollectionRef, {
            userId:userId,
            username:username,
            replyText:replyText,
            Timestamp:serverTimestamp()
         })

        return NextResponse.json({ message: "reply added successfully" }, {status:200});
    } catch (error: any) {
        return NextResponse.json({ message: error.message || error }, { status: 500 });
    }
}
