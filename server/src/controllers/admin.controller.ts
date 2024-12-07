import { Request, Response, NextFunction } from "express";
import { AdminRepository } from "../repository";
import { JwtService, UserService,ResponseService } from "../services";
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
            const token=await JwtService.adminSign(
                res,
                { adminID: adminFound?.admin_id },
                process.env.JWT_SECRET as string,
                { expiresIn: "7d" }
            );
            res.status(200).json({
                adminToken: token,
                admin: {
                    id: adminFoundAgain.admin_id,
                    adminname: adminFoundAgain.username,
                },
                message: "Login successful",
            });
        } catch (error) {
            next(error);
        }
    }
    static async getAdmin(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const admin = await AdminRepository.findAdminById(req.body.adminID);
            if(!admin){
                res.clearCookie("AdminToken");
                next(ResponseService.CreateErrorResponse("admin not found",404));
            }
            return res.status(200).json({
                admin: {
                    id: admin?.admin_id,
                    username: admin?.username,
                },
            });
        } catch (error) {
            next(error);
        }
    }
    static async getAllUsers(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const users = await AdminRepository.findAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }
    static async addRestaurant(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const { name, phone_no, location } = req.body;
            const menu_image=req.file?req.file.path:"";
            console.log(name,phone_no,menu_image,location);
            const newRestaurant = await AdminRepository.AddRestaurant(
                name,
                phone_no,
                menu_image,
                location
            );
            return res.status(200).json(newRestaurant);
        } catch (error) {
            next(error);
        }
    }
    static async getAllRestaurants(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const restaurants = await AdminRepository.findAllRestaurants();
            return res.status(200).json(restaurants);
        } catch (error) {
            next(error);
        }
    }
}
