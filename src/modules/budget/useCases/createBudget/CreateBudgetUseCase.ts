import { inject, injectable } from "tsyringe";

import { IBudgetRepository } from "../../repository/IBudgetRepository";

interface IRequest {
    budget: number;
    period: string;
    fk_user_id_user: string;
}

@injectable()
class CreateBudgetUseCase {
    constructor(
        @inject("BudgetRepository")
        private budgetRepository: IBudgetRepository
    ) {}

    async execute({
        budget,
        period,
        fk_user_id_user,
    }: IRequest): Promise<void> {
        await this.budgetRepository.findAndUpdateFalse(false);
        await this.budgetRepository.create({
            budget,
            period,
            fk_user_id_user,
        });
    }
}

export { CreateBudgetUseCase };
