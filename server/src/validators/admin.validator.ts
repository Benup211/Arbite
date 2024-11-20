import { body } from "express-validator";

export class AdminValidator {
    static loginAdmin() {
        return [
            body("username").isString().isLength({ min: 3, max: 20 }),
            body("password").notEmpty().withMessage("Password is required"),
        ];
    }
}
