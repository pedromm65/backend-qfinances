import { inject, injectable } from "tsyringe";

import { Spending } from "../../infra/entities/Spending";
import { ISpendingRepository } from "../../repository/ISpendingRepository";

@injectable()
class ListSpendingByUserUseCase {
    constructor(
        @inject("SpendingRepository")
        private spendingRepository: ISpendingRepository
    ) {}
    async execute(id_user: string): Promise<Spending[]> {
        const spendings = await this.spendingRepository.listByUser(id_user);

        return spendings;
    }
}

export { ListSpendingByUserUseCase };
