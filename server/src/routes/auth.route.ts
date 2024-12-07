import { Router } from "express";
import { GlobalMiddleware } from "../middleware/global.middleware";
import { AuthController } from "../controllers/auth.controller";
import { AuthValidator } from "../validators/auth.validator";
class AuthRoute {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get("/logout", AuthController.logoutUser);
        this.router.get('/getUser',GlobalMiddleware.CheckAuth,AuthController.getUser);
        this.router.get('/ongoingOrders',GlobalMiddleware.CheckAuth,AuthController.getAllOngoingOrders);
        this.router.get('/completedOrders',GlobalMiddleware.CheckAuth,AuthController.getAllCompletedOrders);
        this.router.get('/allRestaurant',AuthController.getAllRestaurant);
    }
    postRoutes() {
        this.router.post(
            "/register",
            AuthValidator.registerUser(),
            GlobalMiddleware.CheckValidationResult,
            AuthController.registerUser
        );
        this.router.post(
            "/login",
            AuthValidator.loginUser(),
            GlobalMiddleware.CheckValidationResult,
            AuthController.loginUser
        );
        this.router.post(
            "/lunchOrders",
            GlobalMiddleware.CheckAuth,
            AuthController.getAllLunchOrders
        )
        this.router.post(
            "/completeOrder",
            GlobalMiddleware.CheckAuth,
            AuthController.completeOrder
        )
        this.router.post(
            "/addOrder",
            GlobalMiddleware.CheckAuth,
            AuthController.createLunchOrder
        )
        this.router.post(
            "/createOrder",
            GlobalMiddleware.CheckAuth,
            AuthController.createOrder
        )
    }
}
export default new AuthRoute().router;
