import { db } from "@/dbConfig/config";
import { collection, getDocs, query } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get('postId');
        const commentId = searchParams.get('commentId');

        if (!postId || !commentId) {
            return NextResponse.json({ message: "Post ID and Comment ID are required" }, { status: 400 });
        }

        // Reference to the replies subcollection of a specific comment within a post
        const repliesCollectionRef = collection(db, "posts", postId, "comments", commentId, "replies");

        // Query to get all documents in the replies subcollection
        const repliesQuery = query(repliesCollectionRef);

        // Execute the query
        const querySnapshot = await getDocs(repliesQuery);

        // Extract replies data from the query results
        const replies = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json({ replies });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || error }, { status: 500 });
    }
}
