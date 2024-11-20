import { validationResult } from "express-validator";
import { ResponseService,JwtService } from "../services";
import { Request,Response,NextFunction } from "express";
import { IDecodedAdminToken,IDecodedToken } from "../types";
export class GlobalMiddleware{
    static CheckValidationResult(req: any, res: any, next: any){
        const error=validationResult(req);
        if(!error.isEmpty()){
            next(ResponseService.CreateErrorResponse(error.array()[0].msg,400));
        }
        next();
    }
    static async CheckAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.Token;
            if (!token) {
                next(ResponseService.CreateErrorResponse("Unauthorized", 401));
            }
            const decodedToken = await JwtService.verify(token, process.env.JWT_SECRET as string) as IDecodedToken;
            if (!decodedToken) {
                next(ResponseService.CreateErrorResponse("Invalid token", 401));
            }
            req.body.userID = decodedToken.userID;
            next();
        } catch (error) {
            next(error);
        }
    }
    static async CheckAdminAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.AdminToken;
            if (!token) {
                next(ResponseService.CreateErrorResponse("Unauthorized", 401));
            }
            const decodedToken = await JwtService.verify(token, process.env.JWT_SECRET as string) as IDecodedAdminToken;
            if (!decodedToken) {
                next(ResponseService.CreateErrorResponse("Invalid token", 401));
            }
            req.body.adminID = decodedToken.adminID;
            next();
        } catch (error) {
            next(error);
        }
    }
}