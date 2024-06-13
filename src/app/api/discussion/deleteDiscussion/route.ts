import { db } from "@/dbConfig/config";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId, postId } = reqBody;

        // Reference to the specific post document
        const postRef = doc(db, "discussion", postId);
        
        // Get the post document
        const postSnapshot = await getDoc(postRef);
        
        if (postSnapshot.exists()) {
            const postData = postSnapshot.data();
            const userPost = postData.userId;

            // Check if the user is authorized to delete the post
            if (userPost === userId) {
                await deleteDoc(postRef);

                return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
            } else {
                return NextResponse.json({ message: "Not authorized" }, { status: 403 });
            }
        } else {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
