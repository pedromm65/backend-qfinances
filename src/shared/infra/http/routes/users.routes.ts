import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/account/useCases/createUser/CreateUserController";
import { GetUserInfoController } from "../../../../modules/account/useCases/getUserInfo/GetUserInfoController";
import { UpdateUserAvatarController } from "../../../../modules/account/useCases/updateUserAvatar/UpdateUserAvatarController";
import { UpdateUserInformationController } from "../../../../modules/account/useCases/updateUserInformation/UpdateUserInformationController";
import { UserIsVipController } from "../../../../modules/account/useCases/userIsVip/UserIsVipController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const userIsVipController = new UserIsVipController();
const getUserInfoController = new GetUserInfoController();
const updateUserInformationController = new UpdateUserInformationController()

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

usersRoutes.put("/", ensureAuthenticated, updateUserInformationController.handle )

usersRoutes.patch("/vip", ensureAuthenticated, userIsVipController.handle);

usersRoutes.get("/info", ensureAuthenticated, getUserInfoController.handle);

export { usersRoutes };
