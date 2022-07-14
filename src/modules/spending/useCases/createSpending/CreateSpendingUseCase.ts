import { inject, injectable } from "tsyringe";

import { ISpendingRepository } from "../../repository/ISpendingRepository";

interface IRequest {
    value: number;
    date: Date;
    fk_user_id_user: string;
    fk_spending_category_id_category: string;
    fk_budget_id_budget: string;
}

@injectable()
class CreateSpendingUseCase {
    constructor(
        @inject("SpendingRepository")
        private spendingRepository: ISpendingRepository
    ) {}
    async execute({
        date,
        fk_budget_id_budget,
        fk_spending_category_id_category,
        fk_user_id_user,
        value,
    }: IRequest) {
        const spending = await this.spendingRepository.create({
            date,
            fk_budget_id_budget,
            fk_spending_category_id_category,
            fk_user_id_user,
            value,
        });

        return spending;
    }
}

export { CreateSpendingUseCase };
