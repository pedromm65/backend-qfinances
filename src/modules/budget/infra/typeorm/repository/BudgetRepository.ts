import { getRepository, Repository } from "typeorm";

import { ICreateBudgetDTO } from "../../../dtos/ICreateBudgetDTO";
import { IBudgetRepository } from "../../../repository/IBudgetRepository";
import { Budget } from "../entities/budget";

class BudgetRepository implements IBudgetRepository {
    private repository: Repository<Budget>;

    constructor() {
        this.repository = getRepository(Budget);
    }

    async create({
        budget,
        period,
        fk_user_id_user,
    }: ICreateBudgetDTO): Promise<Budget> {
        const value = this.repository.create({
            budget,
            period,
            fk_user_id_user,
        });

        await this.repository.save(value);

        return value;
    }

    async findAndUpdateTrue(is_active: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ is_active })
            .where("is_active = true")
            .setParameters({ is_active })
            .execute();
    }

    async findAndUpdateFalse(is_active: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ is_active })
            .where("is_active = true")
            .setParameters({ is_active })
            .execute();
    }

    async findByUserId(fk_user_id_user: string): Promise<Budget[]> {
        const budgets = await this.repository.find({
            where: { fk_user_id_user },
            relations: ["user"],
        });

        return budgets;
    }
}

export { BudgetRepository };
