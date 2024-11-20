import { body } from "express-validator";

export class AuthValidator {
    static registerUser() {
        return [
            body("username").isString().isLength({ min: 3, max: 20 }).withMessage("Username must be between 3 to 20 characters long"),
            body("phoneno").isString().isLength({ min: 10, max: 10 }).withMessage("Phone number must be 10 characters long"),
            body("password")
                .notEmpty()
                .withMessage("Password is required")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
                )
                .withMessage(
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                ),
            body("confirmPassword")
                .notEmpty()
                .withMessage("Confirm Password is required")
                .custom((value, { req }) => value === req.body.password)
                .withMessage(
                    "Confirm Password must be the same as the Password"
                ),
        ];
    }
    static loginUser() {
        return [
            body("username").isString().isLength({ min: 3, max: 20 }),
            body("password").notEmpty().withMessage("Password is required"),
        ];
    }
}
