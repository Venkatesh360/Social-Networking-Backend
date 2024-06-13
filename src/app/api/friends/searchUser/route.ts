import { db } from "@/dbConfig/config";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ error: "Username parameter is required" }, { status: 400 });
    }

    try {
        // Reference to the document in the "usernames" collection
        const usernameDocRef = doc(db, "usernames", username.toLowerCase().trim());
        const usernameDocSnap = await getDoc(usernameDocRef);

        if (!usernameDocSnap.exists()) {
            return NextResponse.json({ error: "Username not found" }, { status: 404 });
        }

        const userId = usernameDocSnap.get("userId");

        // Reference to the document in the "users" collection
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            return NextResponse.json({ error: "User data not found" }, { status: 404 });
        }

        const user = userDocSnap.data();
        return NextResponse.json({
            data: {
                uid: userId,
                username: user.username,
            }
        }, { status: 200 });

    } catch (error: any) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
