import { Router } from "express";

import { CreateUserSpendingCategoryController } from "../../../../modules/userSpendingCategory/useCases/createUserSpendingCategory/CreateUserSpendingCategoryController";
import { ListUserSpendingCategoryController } from "../../../../modules/userSpendingCategory/useCases/listUserSpendingCategories/ListUserSpendingCategoryController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userSpendingCategoryRoutes = Router();

const createUserSpendingCategoryController =
    new CreateUserSpendingCategoryController();

const listUserSpendingCategoryController =
    new ListUserSpendingCategoryController();

userSpendingCategoryRoutes.post(
    "/",
    ensureAuthenticated,
    createUserSpendingCategoryController.handle
);

userSpendingCategoryRoutes.get(
    "/",
    ensureAuthenticated,
    listUserSpendingCategoryController.handle
);

export { userSpendingCategoryRoutes };
