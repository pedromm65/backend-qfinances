import { Request, Response } from "express";
import moment from "moment";
import { container } from "tsyringe";

import { ListSpendingCategoryUseCase } from "./ListUserSpendingCategoryUseCase";

class ListUserSpendingCategoryController {
    async handle(request: Request, response: Response) {
        const { id } = request.user;
        const { InitialDate, EndDate } = request.query;
        const listSpendingCategoryUseCase = container.resolve(
            ListSpendingCategoryUseCase
        );
        let initialDate;
        if (InitialDate !== undefined) {
            const start = moment(InitialDate).format("YYYY-MM-DD");
            initialDate = new Date(start);
        }

        let endDate;
        if (EndDate !== undefined) {
            const end = moment(EndDate).format("YYYY-MM-DD");
            endDate = new Date(end);
        }

        const spendingCategories = await listSpendingCategoryUseCase.execute({
            user_id: id,
            initialDate,
            endDate,
        });

        return response.json(spendingCategories);
    }
}

export { ListUserSpendingCategoryController };
