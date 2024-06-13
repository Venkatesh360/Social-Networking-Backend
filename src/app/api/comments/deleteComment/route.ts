import { db } from "@/dbConfig/config";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId, postId, commentId } = reqBody;

        const commentRef = doc(db, "discussion", postId, "comments", commentId);
        const comment = await getDoc(commentRef);
        const userComment = await comment.get("userId")
        if (userComment == userId) {
            await deleteDoc(commentRef);

            return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
        }

        else {
            return NextResponse.json({ message: "not authorized" }, { status: 404 })
        }

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
