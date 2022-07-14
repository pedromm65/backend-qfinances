import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpendingByUserUseCase } from "./ListSpendingByUserUseCase";

class ListSpendingByUserController {
    async handle(request: Request, response: Response) {
        const { id } = request.user;

        const listSpendingByUserUseCase = container.resolve(
            ListSpendingByUserUseCase
        );

        const spendings = await listSpendingByUserUseCase.execute(id);

        return response.json(spendings);
    }
}

export { ListSpendingByUserController };
