// pages/api/comments/update.js

import { db } from "@/dbConfig/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId, postId, commentId, newText } = reqBody;

        // Reference to the specific comment document
        const commentRef = doc(db, "discussion", postId, "comments", commentId);
        
        // Get the comment document
        const commentSnapshot = await getDoc(commentRef);
        
        if (commentSnapshot.exists()) {
            const commentData = commentSnapshot.data();
            const commentUserId = commentData.userId;

            // Check if the user is authorized to update the comment
            if (commentUserId === userId) {
                // Update the text field of the comment
                await updateDoc(commentRef, { text: newText });

                return NextResponse.json({ message: "Comment updated successfully" }, { status: 200 });
            } else {
                return NextResponse.json({ message: "Not authorized" }, { status: 403 });
            }
        } else {
            return NextResponse.json({ message: "Comment not found" }, { status: 404 });
        }

    } catch (error:any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
