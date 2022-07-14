import { Router } from "express";
import multer from "multer";

import { CreateSpendingCategoriesController } from "../../../../modules/spendingCategory/useCases/createSpendingCategory/CreateSpendingCategoriesController";
import { ListSpendingCategoryController } from "../../../../modules/spendingCategory/useCases/listSpendingCategories/ListSpendingCategoryController";
import { UploadSpendingCategoriesController } from "../../../../modules/spendingCategory/useCases/uploadSpendingCategories/UploadSpendingCategoriesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const spendingCategoryRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const listSpendingCategoryController = new ListSpendingCategoryController();
const createSpendingCategoryController =
    new CreateSpendingCategoriesController();
const uploadSpendingCategoriesController =
    new UploadSpendingCategoriesController();

spendingCategoryRoutes.get("/", listSpendingCategoryController.handle);
spendingCategoryRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createSpendingCategoryController.handle
);

spendingCategoryRoutes.post(
    "/upload",
    upload.single("file"),
    ensureAuthenticated,
    ensureAdmin,
    uploadSpendingCategoriesController.handle
);

export { spendingCategoryRoutes };
