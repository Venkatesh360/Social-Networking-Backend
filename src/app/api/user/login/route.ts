import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import  {app, db} from "@/dbConfig/config";
import { doc, getDoc } from "firebase/firestore";


export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {

      const JWT_SECRET = process.env.TOKEN_SECRET;
      if (!JWT_SECRET) {
        throw new Error("JWT secret is not defined");
      }
      const docRef = doc(db, "users", user.uid)
      const data = await getDoc(docRef)
      const userName = data.get("username")
      const token = jwt.sign({ userId: user.uid, email: user.email, username:userName }, JWT_SECRET, { expiresIn: '1h' });

      const response = NextResponse.json({
        message: "Login Successful",
        success: true
      });

      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/'
      });

      return response;
    } else {
      return NextResponse.json({ error: "Login failed" }, { status: 401 });
    }
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password.';
    } else if (error.code === 'auth/user-not-found') {
      errorMessage = 'User not found.';
    }
    console.error("Error logging in:", error.message || error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
