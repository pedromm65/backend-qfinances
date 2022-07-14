import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/account/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../../../../modules/account/useCases/refreshToken/RefreshTokenController";
import { addUserInformation } from "../middlewares/userInformations";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post(
    "/refresh-token",
    addUserInformation,
    refreshTokenController.handle
);

export { authenticateRoutes };
