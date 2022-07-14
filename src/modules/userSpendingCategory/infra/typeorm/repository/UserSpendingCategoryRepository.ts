import { getRepository, Repository } from "typeorm";

import { ICreateUserSpendingCategoryDTO } from "../../../dtos/ICreateUserSpendingCategoryDTO";
import { IUserSpendingCategoryRepository } from "../../../repository/IUserSpendingCategoryRepository";
import { UserSpendingCategory } from "../entities/UserSpendingCategory";

class UserSpendingCategoryRepository
    implements IUserSpendingCategoryRepository
{
    private repository: Repository<UserSpendingCategory>;
    constructor() {
        this.repository = getRepository(UserSpendingCategory);
    }

    async create({
        fk_user_id_user,
        fk_spending_category_id_category,
        percentage
    }: ICreateUserSpendingCategoryDTO): Promise<UserSpendingCategory> {
        const userSpendingCategory = this.repository.create({
            fk_spending_category_id_category,
            fk_user_id_user,
            percentage
        });

        await this.repository.save(userSpendingCategory);

        return userSpendingCategory;
    }

    async findById(
        fk_spending_category_id_category: string
    ): Promise<UserSpendingCategory> {
        const userCategory = await this.repository.findOne({
            fk_spending_category_id_category,
        });

        return userCategory;
    }

    async listByDate(
        user_id: string,
        initialDate?: Date,
        endDate?: Date
    ): Promise<UserSpendingCategory[]> {
        const userSpendingCategoriesQuery = this.repository
            .createQueryBuilder("c")
            .where('"fk_user_id_user" = :id', { id: user_id });

        if (initialDate) {
            userSpendingCategoriesQuery.andWhere(
                '"created_at" > :initialDate',
                {
                    initialDate,
                }
            );
        }
        if (endDate) {
            userSpendingCategoriesQuery.andWhere('"created_at" < :endDate', {
                endDate,
            });
        }

        const userSpendingCategories =
            await userSpendingCategoriesQuery.getMany();

        return userSpendingCategories;
    }

    async findByUserIdAndDelete(user_id: string): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .delete()
            .from(UserSpendingCategory)
            .where('"fk_user_id_user" = :id', {
                id: user_id,
            })
            .execute();
    }
}

export { UserSpendingCategoryRepository };
