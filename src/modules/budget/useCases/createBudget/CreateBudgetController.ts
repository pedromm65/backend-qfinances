import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateBudgetUseCase } from "./CreateBudgetUseCase";

class CreateBudgetController {
    async handle(request: Request, response: Response) {
        const { budget, period } = request.body;
        const { id } = request.user;

        const createBudgetUseCase = container.resolve(CreateBudgetUseCase);

        const budgetResponse = await createBudgetUseCase.execute({
            budget,
            period,
            fk_user_id_user: id,
        });

        return response.status(201).json(budgetResponse);
    }
}

export { CreateBudgetController };
