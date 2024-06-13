import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value;
        if (!token) {
            throw new Error("Token not found");
        }

        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return {userId:decodedToken.userId,
            username:decodedToken.username
        };
    } catch (error: any) {
        if (error instanceof jwt.JsonWebTokenError) {
            // Handle JWT specific errors
            throw new Error("Invalid token");
        }
        if (error instanceof jwt.TokenExpiredError) {
            // Handle token expiration error
            throw new Error("Token expired");
        }
        // For all other errors, rethrow the original error
        throw new Error(error.message);
    }
};
