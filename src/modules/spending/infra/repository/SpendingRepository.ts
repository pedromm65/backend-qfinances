import { getRepository, Repository } from "typeorm";

import { ICreateSpendingDTO } from "../../dtos/ICreateSpendingDTO";
import { ISpendingRepository } from "../../repository/ISpendingRepository";
import { Spending } from "../entities/Spending";

class SpendingRepository implements ISpendingRepository {
    private repository: Repository<Spending>;
    constructor() {
        this.repository = getRepository(Spending);
    }

    async create({
        date,
        fk_budget_id_budget,
        fk_spending_category_id_category,
        fk_user_id_user,
        value,
    }: ICreateSpendingDTO): Promise<Spending> {
        const spending = this.repository.create({
            date,
            fk_budget_id_budget,
            fk_spending_category_id_category,
            fk_user_id_user,
            value,
        });

        await this.repository.save(spending);

        return spending;
    }

    async listByUser(id_user: string): Promise<Spending[]> {
        const spendings = await this.repository.find({
            where: {
                fk_user_id_user: id_user,
            },
        });

        return spendings;
    }
}

export { SpendingRepository };
