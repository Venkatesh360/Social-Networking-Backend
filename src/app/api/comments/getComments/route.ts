import { db } from "@/dbConfig/config";
import { getTokenData } from "@/helper/getTokenData";
import { collection, getDocs, query } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get('postId');

        if (!postId) {
            return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
        }


        // Reference to the comments subcollection of a specific post
        const commentsCollectionRef = collection(db, "discussion", postId, "comments");

        // Query to get all documents in the comments subcollection
        const commentsQuery = query(commentsCollectionRef);

        // Execute the query
        const querySnapshot = await getDocs(commentsQuery);

        // Extract comments data from the query results
        const comments = querySnapshot.docs.map(doc => {
            const commentData = doc.data();
            // Compare userId with currentUserId and add a value based on the comparison
            return {
                id: doc.id,
                ...commentData,
            };
        });

        return NextResponse.json({ comments });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || error }, { status: 500 });
    }
}

