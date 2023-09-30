import {  verifySignUp } from "../middlewares/verifySignUp"
import { authController } from "../controllers/auth.controller"
import { authJwt } from "../middlewares/authJwt"
export async function AuthRouter(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/v1/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        authController.signup
    );

    app.post("/api/v1/auth/signUpdate/:UserIdUpdate",[authJwt.verifyToken, authJwt.isAdmin], authController.signUpdate);

    app.post("/api/v1/auth/signin",authController.signin);

    app.post("/api/v1/auth/signout", authController.signout);

}



