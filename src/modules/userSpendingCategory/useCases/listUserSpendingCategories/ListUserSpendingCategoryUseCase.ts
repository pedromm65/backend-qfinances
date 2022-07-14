import { inject, injectable } from "tsyringe";

import { UserSpendingCategory } from "../../infra/typeorm/entities/UserSpendingCategory";
import { IUserSpendingCategoryRepository } from "../../repository/IUserSpendingCategoryRepository";

interface IRequest {
    user_id: string;
    initialDate?: Date;
    endDate?: Date;
}

@injectable()
class ListSpendingCategoryUseCase {
    constructor(
        @inject("UserSpendingCategoryRepository")
        private userSpendingCategoryRepository: IUserSpendingCategoryRepository
    ) {}

    async execute({
        initialDate,
        endDate,
        user_id,
    }: IRequest): Promise<UserSpendingCategory[]> {
        const userSpendingCategories =
            await this.userSpendingCategoryRepository.listByDate(
                user_id,
                initialDate,
                endDate
            );

        return userSpendingCategories;
    }
}

export { ListSpendingCategoryUseCase };
