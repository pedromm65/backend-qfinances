import { Router } from "express";

import { CreateBudgetController } from "../../../../modules/budget/useCases/createBudget/CreateBudgetController";
import { ListBudgetsByUserController } from "../../../../modules/budget/useCases/listBudgetsByUser/ListBudgetsByUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const budgetRoutes = Router();

const createBudgetController = new CreateBudgetController();
const listBudgetsByUserController = new ListBudgetsByUserController();

budgetRoutes.post("/", ensureAuthenticated, createBudgetController.handle);
budgetRoutes.get("/", ensureAuthenticated, listBudgetsByUserController.handle);

export { budgetRoutes };
