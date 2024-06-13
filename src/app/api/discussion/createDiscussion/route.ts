import { db } from "@/dbConfig/config";
import { getHashtags } from "@/helper/getHashtags";
import { collection, addDoc, doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { text, imageUrl, hashtag, userId, username} = reqBody;

        // Validate input fields
        if (!text && !imageUrl) {
            return NextResponse.json({ message: "Text and Image URL cannot be empty" }, { status: 400 });
        }

        // Create the discussion document
        const docData = {
            username: username,
            userId: userId,
            text: text,
            imageUrl: imageUrl,
            likes: 0,
            timestamp: serverTimestamp()
        };

        const discussionDocRef = await addDoc(collection(db, "discussion"), docData);
        const postId = discussionDocRef.id;

        const userRef = doc(db, "users", userId)
        const userDoc = await getDoc(userRef)
        const createdDiscussion = await userDoc.get("created_discussion") || []
        const updateCreatedDiscussion = [...createdDiscussion, postId]
        await updateDoc(userRef, {
            createdDiscussion : updateCreatedDiscussion
        })
        // Update hashtags
        const tagArray = getHashtags(hashtag);
        const operations = tagArray.map(async (each: string) => {
            const docRef = doc(db, "hashtags", each);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, { posts: [postId] });
            } else {
                const posts = docSnap.get("posts") || [];
                const updatedPosts = [...posts, postId];
                await updateDoc(docRef, { posts: updatedPosts });
            }
        });

        // Use Promise.allSettled to ensure all operations are handled, even if some fail
        const results = await Promise.allSettled(operations);

        const failedOperations = results.filter(result => result.status === "rejected");
        if (failedOperations.length > 0) {
            return NextResponse.json({ message: "Discussion created, but some hashtags could not be updated", details: failedOperations }, { status: 207 });
        }

        return NextResponse.json({ message: "Discussion created successfully and hashtags updated" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || error }, { status: 500 });
    }
}
