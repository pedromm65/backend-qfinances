import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListBudgetsByUserUseCase } from "./ListBudgetsByUserUseCase";

class ListBudgetsByUserController {
    async handle(request: Request, response: Response) {
        const { id } = request.user;

        const listBudgetsByUserUseCase = container.resolve(
            ListBudgetsByUserUseCase
        );

        const budgets = await listBudgetsByUserUseCase.execute(id);

        return response.json(budgets);
    }
}

export { ListBudgetsByUserController };
