import jwt from 'jsonwebtoken';
import { Response } from 'express';
export class JwtService {
    static async sign(res: Response, payload: any, secret: string, options: any): Promise<string> {
        const token = jwt.sign(payload, secret, options);
        res.cookie("Token", token, {
            secure: true,
            httpOnly: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return token;
    }
    static async adminSign(res: Response, payload: any, secret: string, options: any): Promise<string> {
        const token = jwt.sign(payload, secret, options);
        res.cookie("AdminToken", token, {
            secure: true,
            httpOnly: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return token;
    }

    static async verify(token: string, secret: string): Promise<any> {
        return jwt.verify(token, secret);
    }
}