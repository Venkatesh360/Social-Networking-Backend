import { NextRequest, NextResponse } from "next/server";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db } from "@/dbConfig/config";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, email, password, number } = reqBody;

        // Validate request body
        if (!name || !email || !password || !number) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const auth = getAuth(app);

        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if user was created successfully
        if (user) {
            const data = {
                username: name,
                email: email,
                number: number
            };

            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, data);

            const username = name.toLowerCase().trim();
            const userRef = doc(db, "usernames", username);
            await setDoc(userRef, { userId: user.uid });

            return NextResponse.json({ message: "User created successfully" }, { status: 201 });
        } else {
            return NextResponse.json({ error: "User creation failed" }, { status: 500 });
        }

    } catch (error: any) {
        console.error("Error creating user:", error);

        // Handle specific error codes
        switch (error.code) {
            case 'auth/email-already-in-use':
                return NextResponse.json({ error: 'Email address already exists.' }, { status: 409 });
            case 'auth/weak-password':
                return NextResponse.json({ error: 'Password is too weak.' }, { status: 400 });
            case 'auth/invalid-email':
                return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
            case 'auth/operation-not-allowed':
                return NextResponse.json({ error: 'Operation not allowed. Please contact support.' }, { status: 403 });
            default:
                return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
        }
    }
}
