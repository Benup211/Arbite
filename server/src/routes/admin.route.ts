import { Router } from "express";
import { GlobalMiddleware } from "../middleware/global.middleware";
import { AdminController } from "../controllers/admin.controller";
import { AdminValidator } from "../validators/admin.validator";
import upload from "../services/multer.services";
class AdminAuthRoute {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get('/getAdmin',GlobalMiddleware.CheckAdminAuth,AdminController.getAdmin);
        this.router.get('/allUsers',GlobalMiddleware.CheckAdminAuth,AdminController.getAllUsers);
        this.router.get('/allRestaurants',AdminController.getAllRestaurants);
    }
    postRoutes() {
        this.router.post(
            "/login",
            AdminValidator.loginAdmin(),
            GlobalMiddleware.CheckValidationResult,
            AdminController.loginAdmin
        );
        this.router.post(
            "/addRestaurant",
            upload.single("menu_image"),
            AdminController.addRestaurant
        )
    }
}
export default new AdminAuthRoute().router;
