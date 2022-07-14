import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadSpendingCategoriesUseCase } from "./UploadSpendingCategoriesUseCase";

class UploadSpendingCategoriesController {
    async handle(request: Request, response: Response) {
        const { file } = request;
        const uploadSpendingCategoriesUseCase = container.resolve(
            UploadSpendingCategoriesUseCase
        );

        await uploadSpendingCategoriesUseCase.execute(file);

        return response.send();
    }
}

export { UploadSpendingCategoriesController };
