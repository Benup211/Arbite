import { Router } from "express";
import { GlobalMiddleware } from "../middleware/global.middleware";
import { AdminController } from "../controllers/admin.controller";
import { AdminValidator } from "../validators/admin.validator";
class AdminAuthRoute {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get('/getAdmin',GlobalMiddleware.CheckAdminAuth,AdminController.getAdmin);
        this.router.get('/allUsers',GlobalMiddleware.CheckAdminAuth,AdminController.getAllUsers);
    }
    postRoutes() {
        this.router.post(
            "/login",
            AdminValidator.loginAdmin(),
            GlobalMiddleware.CheckValidationResult,
            AdminController.loginAdmin
        );
    }
}
export default new AdminAuthRoute().router;
