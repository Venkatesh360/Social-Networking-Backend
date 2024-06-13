import { db } from "@/dbConfig/config";
import { doc, runTransaction } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    const reqBody = await request.json();
    const { userId, username, currentUserId } = reqBody;

    if (!userId || !username) {
        return NextResponse.json({ error: "userId and username are required" }, { status: 400 });
    }

    try {
        const userRef = doc(db, "users", currentUserId);

        await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists()) {
                throw new Error("User not found");
            }

            const friends = userDoc.data().friends || [];
            const updatedFriends = [...friends, { userId, username }];

            transaction.update(userRef, {
                friends: updatedFriends
            });
        });

        return NextResponse.json({ message: "Friend added successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("Error updating friends list:", error);
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
