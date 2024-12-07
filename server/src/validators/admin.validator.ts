import { body } from "express-validator";

export class AdminValidator {
    static loginAdmin() {
        return [
            body("username").isString().isLength({ min: 3, max: 20 }),
            body("password").notEmpty().withMessage("Password is required"),
        ];
    }
    static addRestaurant() {
        return [
            body("name").isString().isLength({ min: 3, max: 50 }),
            body("phone_no").isString().isLength({ min: 10, max: 15 }),
            body("menu_image").isString().withMessage("Menu image must be a valid image file"),
            body("location").isString().isLength({ min: 3, max: 100 }),
        ];
    }
}