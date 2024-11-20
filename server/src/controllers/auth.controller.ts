import { Request, Response, NextFunction } from "express";
import { AuthRepository } from "../repository";
import { JwtService, ResponseService, UserService } from "../services";
export class AuthController {
    static async registerUser(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const { username, phoneno, password, confirmPassword } = req.body;
            const userExist = await AuthRepository.findUserByUsername(username);
            if (userExist) {
                next(
                    ResponseService.CreateErrorResponse(
                        "User already exists",
                        400
                    )
                );
            }
            const hashpassword = await UserService.hashPassword(password);
            const user = await AuthRepository.createUser(
                username,
                hashpassword,
                phoneno
            );
            return res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
    static async loginUser(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const { username, password } = req.body;
            const user = await AuthRepository.findUserByUsername(username);
            if (!user) {
                return next(
                    ResponseService.CreateErrorResponse("User not found", 404)
                );
            }
            const isPasswordMatch = await UserService.comparePassword(
                password,
                user.password
            );
            if (!isPasswordMatch) {
                return next(
                    ResponseService.CreateErrorResponse(
                        "Invalid credentials",
                        401
                    )
                );
            }
            await JwtService.sign(
                res,
                { userID: user.user_id },
                process.env.JWT_SECRET as string,
                { expiresIn: "7d" }
            );
            return res.status(200).json({ message: "Login successful" });
        } catch (error) {
            next(error);
        }
    }
    static async logoutUser(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie("Token");
            res.status(200).json({ message: "Logout successfully" });
        } catch (error) {
            next(error);
        }
    }
}
