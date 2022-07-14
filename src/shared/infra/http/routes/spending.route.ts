import { Router } from "express";

import { CreateSpendingController } from "../../../../modules/spending/useCases/createSpending/CreateSpendingController";
import { ListSpendingByUserController } from "../../../../modules/spending/useCases/listByUser/ListSpendingByUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const spendingRoutes = Router();

const createSpendingController = new CreateSpendingController();
const listSpendingByUserController = new ListSpendingByUserController();

spendingRoutes.post("/", ensureAuthenticated, createSpendingController.handle);
spendingRoutes.get(
    "/",
    ensureAuthenticated,
    listSpendingByUserController.handle
);

export { spendingRoutes };
