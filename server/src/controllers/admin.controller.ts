import { Request, Response, NextFunction } from "express";
import { AdminRepository } from "../repository";
import { JwtService, UserService } from "../services";
export class AdminController {
    static async loginAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            const adminFound = await AdminRepository.findAdminByUsername(
                username
            );
            if (!adminFound) {
                const usernameFromEnv = process.env.ADMIN_USERNAME as string;
                const passwordFromEnv = process.env.ADMIN_PASSWORD as string;
                const hashedPassword = await UserService.hashPassword(
                    passwordFromEnv
                );
                const newAdmin = await AdminRepository.createAdmin(
                    usernameFromEnv,
                    hashedPassword
                );
            }
            const adminFoundAgain = await AdminRepository.findAdminByUsername(
                username
            );
            if (!adminFoundAgain) {
                return next({
                    message: "Admin not found",
                    status: 404,
                });
            }
            const isPasswordMatch = await UserService.comparePassword(
                password,
                adminFoundAgain.password
            );
            if (!isPasswordMatch) {
                return next({
                    message: "Invalid credentials",
                    status: 401,
                });
            }
            await JwtService.adminSign(
                res,
                { adminID: adminFound?.admin_id },
                process.env.JWT_SECRET as string,
                { expiresIn: "7d" }
            );
            res.status(200).json("Login successful");
        } catch (error) {
            next(error);
        }
    }
}
