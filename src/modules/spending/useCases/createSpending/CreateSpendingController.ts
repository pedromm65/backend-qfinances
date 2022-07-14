import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpendingUseCase } from "./CreateSpendingUseCase";

class CreateSpendingController {
    async handle(request: Request, response: Response) {
        const { id } = request.user;
        const {
            date,
            fk_budget_id_budget,
            fk_spending_category_id_category,
            value,
        } = request.body;

        const createSpendingUseCase = container.resolve(CreateSpendingUseCase);

        const spending = await createSpendingUseCase.execute({
            date,
            fk_budget_id_budget,
            fk_spending_category_id_category,
            value,
            fk_user_id_user: id,
        });

        return response.json(spending);
    }
}

export { CreateSpendingController };
