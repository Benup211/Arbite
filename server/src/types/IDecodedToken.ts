import { JwtPayload } from "jsonwebtoken";

export interface IDecodedToken extends JwtPayload{
    userID:string;
}

export interface IDecodedAdminToken extends JwtPayload{
    adminID:string;
}