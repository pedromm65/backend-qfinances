import { inject, injectable } from "tsyringe";

import { budget } from "../../infra/typeorm/entities/budget";
import { IBudgetRepository } from "../../repository/IBudgetRepository";

@injectable()
class ListBudgetsByUserUseCase {
    constructor(
        @inject("BudgetRepository")
        private budgetRepository: IBudgetRepository
    ) {}

    async execute(id_user: string): Promise<budget[]> {
        const budgets = await this.budgetRepository.findByUserId(id_user);

        return budgets;
    }
}

export { ListBudgetsByUserUseCase };
