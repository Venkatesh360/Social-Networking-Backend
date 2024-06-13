import { db } from '@/dbConfig/config';
import { doc, getDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const keywords = searchParams.get('keywords');

    if (!keywords) {
        return NextResponse.json(
            { message: 'Keywords are required.' },
            { status: 400 }
        );
    }

    try {
        const getPostsDoc = doc(db, "hashtags", keywords);
        const refDoc = await getDoc(getPostsDoc);
        const posts = refDoc.get("posts") || [];

        if (posts.length < 1) {
            return NextResponse.json({ message: "No related discussions found" }, { status: 201 });
        }

        const data = await Promise.all(posts.map(async (post: string) => {
            const getPostDoc = doc(db, "discussion", post);
            const postRef = await getDoc(getPostDoc);

            const postData = {
                username: postRef.get("username"),
                imageUrl: postRef.get("imageUrl"),
                text: postRef.get("text"),
                timestamp: postRef.get("timestamp")
            };

            return postData;
        }));

        return NextResponse.json({ data: data }, { status: 200 });

    } catch (error: any) {
        // Handle errors from the Firestore request
        const errorMessage = error.message || 'An unknown error occurred';
        return NextResponse.json(
            { message: `Error fetching data: ${errorMessage}` },
            { status: 500 }
        );
    }
}
