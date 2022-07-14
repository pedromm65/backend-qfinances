import { inject, injectable } from "tsyringe";

import { ISpendingCategoryRepository } from "../../repository/ISpendingCategoryRepository";

interface IRequest {
    name: string;
    icon: string;
    description: string;
}

@injectable()
class CreateSpendingCategoriesUseCase {
    constructor(
        @inject("SpendingCategoryRepository")
        private spendingCategoryRepository: ISpendingCategoryRepository
    ) {}

    async execute({ description, icon, name }: IRequest) {
        await this.spendingCategoryRepository.create({
            name,
            icon,
            description,
        });
    }
}

export { CreateSpendingCategoriesUseCase };
