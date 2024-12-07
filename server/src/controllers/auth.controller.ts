import { Request, Response, NextFunction } from "express";
import { AuthRepository } from "../repository";
import { JwtService, ResponseService, UserService } from "../services";
export class AuthController {
    static async registerUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
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
    static async loginUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
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
            const token = await JwtService.sign(
                res,
                { userID: user.user_id },
                process.env.JWT_SECRET as string,
                { expiresIn: "7d" }
            );
            return res.status(200).json({
                token: token,
                user: {
                    id: user.user_id,
                    username: user.username,
                    phoneno: user.phone_no,
                },
                message: "Login successful",
            });
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
    static async getUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const user = await AuthRepository.findUserById(req.body.userID);
            if (!user) {
                res.clearCookie("Token");
                next(
                    ResponseService.CreateErrorResponse("User not found", 404)
                );
            }
            return res.status(200).json({
                user: {
                    id: user?.user_id,
                    username: user?.username,
                    phoneno: user?.phone_no,
                },
            });
        } catch (error) {
            next(error);
        }
    }
    static async getAllOngoingOrders(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const orders = await AuthRepository.getAllOngoingOrders();
            return res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }
    static async getAllCompletedOrders(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const orders = await AuthRepository.getAllCompletedOrders();
            return res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }
    static async getAllLunchOrders(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const { order_id } = req.body;
            const orders = await AuthRepository.getLunchOrders(order_id);
            return res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }
    static async completeOrder(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const { order_id } = req.body;
            const order = await AuthRepository.completeOrder(order_id);
            return res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
    static async createLunchOrder(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const { order_id, lunchOrder, tea } = req.body;
            const order = await AuthRepository.createLunchOrder(
                order_id,
                tea,
                lunchOrder,
                req.body.userID
            );
            return res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
    static async getAllRestaurant(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const restaurants = await AuthRepository.getAllRestaurant();
            return res.status(200).json(restaurants);
        } catch (error) {
            next(error);
        }
    }
    static async createOrder(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> {
        try {
            const { restaurant_id } = req.body;
            const order = await AuthRepository.createOrder(
                req.body.userID,
                restaurant_id
            );
            return res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
}
