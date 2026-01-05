import { SignJWT } from "jose";
import { createSecretKey } from "node:crypto"; // saying node:crypto means to import crypto from node
import env from "../../env.ts";
import type { StringDecoder } from "node:string_decoder";

export interface JwtPayload {
    id: string;
    email: string;
    username: string;
}

export const generateToken = (payload: JwtPayload) => {
    const secret = env.JWT_SECRET
    const secretKey = createSecretKey(secret, 'utf-8')
    // secret key is another level of security that actually is optional
    // creates and returns a new object containing a secret key for symmetric encryption or Hmac
    // Hmac is an algorithm that uses a secret key to generate a message authentication code (MAC)

    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' }) // 
        .setIssuedAt()
        .setExpirationTime(env.JWT_EXPIRES_IN || '7d')
        .sign(secretKey)
}

// JWT can be thought of as an object that is converted to a string based off of some algorithm
// so you put some identifying traits on the JwtPayload type to generate the JWT token