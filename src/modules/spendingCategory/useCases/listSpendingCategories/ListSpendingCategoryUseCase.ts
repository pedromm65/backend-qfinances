import { inject, injectable } from "tsyringe";

import { SpendindCategory } from "../../infra/typeorm/entities/spendindCategory";
import { ISpendingCategoryRepository } from "../../repository/ISpendingCategoryRepository";

interface IRequest {
    initialDate?: Date;
    endDate?: Date;
}

@injectable()
class ListSpendingCategoryUseCase {
    constructor(
        @inject("SpendingCategoryRepository")
        private spendingCategoryRepository: ISpendingCategoryRepository
    ) {}

    async execute({
        initialDate,
        endDate,
    }: IRequest): Promise<SpendindCategory[]> {
        const spendingCategories =
            await this.spendingCategoryRepository.listByUser(
                initialDate,
                endDate
            );

        return spendingCategories;
    }
}

export { ListSpendingCategoryUseCase };
