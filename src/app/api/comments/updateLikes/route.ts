import { db } from '@/dbConfig/config';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
    const reqBody = await request.json();
    const { postId, commentId } = reqBody;

    if (!postId || !commentId) {
        return NextResponse.json(
            { message: 'postId and commentId are required.' },
            { status: 400 }
        );
    }

    try {
        const commentDocRef = doc(db, "discussion", postId, "comments", commentId);
        const commentDocSnap = await getDoc(commentDocRef);

        if (!commentDocSnap.exists()) {
            return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
        }

        await updateDoc(commentDocRef, {
            likes: increment(1)
        });

        return NextResponse.json({ message: 'Likes updated successfully' }, { status: 200 });

    } catch (error: any) {
        console.error("Error updating likes:", error);
        return NextResponse.json(
            { message: `Error updating likes: ${error.message || 'An unknown error occurred'}` },
            { status: 500 }
        );
    }
}
