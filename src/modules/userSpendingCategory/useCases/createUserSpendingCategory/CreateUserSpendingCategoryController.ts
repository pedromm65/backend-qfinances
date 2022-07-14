import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserSpendingCategoryUseCase } from "./CreateUserSpendingCategoryUseCase";

class CreateUserSpendingCategoryController {
    async handle(request: Request, response: Response) {
        const { id } = request.user;
        const { usersCategories } = request.body;

        const createUserSpendingCategoryUseCase = container.resolve(
            CreateUserSpendingCategoryUseCase
        );

        await createUserSpendingCategoryUseCase.execute({
            usersCategories,
            fk_user_id_user: id,
        });

        return response.send();
    }
}

export { CreateUserSpendingCategoryController };
