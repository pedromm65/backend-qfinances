import { inject, injectable } from "tsyringe";

import { IUserSpendingCategoryRepository } from "../../repository/IUserSpendingCategoryRepository";

interface IRequest {
    usersCategories: {
        fk_spending_category_id_category: string;
        percentage?: number
    }[];
    fk_user_id_user: string;
}

@injectable()
class CreateUserSpendingCategoryUseCase {
    constructor(
        @inject("UserSpendingCategoryRepository")
        private userSpendingCategoryRepository: IUserSpendingCategoryRepository
    ) {}

    async execute({ usersCategories, fk_user_id_user }: IRequest) {
        await this.userSpendingCategoryRepository.findByUserIdAndDelete(
            fk_user_id_user
        );

        usersCategories.map(async (userCategory) => {
            const { fk_spending_category_id_category, percentage } = userCategory;

            const existUserCategory =
                await this.userSpendingCategoryRepository.findById(
                    fk_spending_category_id_category
                );

            if (!existUserCategory) {
                await this.userSpendingCategoryRepository.create({
                    fk_spending_category_id_category,
                    percentage,
                    fk_user_id_user,
                });
            }
        });
    }
}
export { CreateUserSpendingCategoryUseCase };
