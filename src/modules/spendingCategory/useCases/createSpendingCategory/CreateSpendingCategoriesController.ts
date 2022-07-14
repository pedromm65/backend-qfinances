import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpendingCategoriesUseCase } from "./CreateSpendingCategoriesUseCase";

class CreateSpendingCategoriesController {
    async handle(request: Request, response: Response) {
        const { description, icon, name } = request.body;

        const createSpendingCategoriesUseCase = container.resolve(
            CreateSpendingCategoriesUseCase
        );

        await createSpendingCategoriesUseCase.execute({
            description,
            icon,
            name,
        });

        return response.status(201).send();
    }
}

export { CreateSpendingCategoriesController };
