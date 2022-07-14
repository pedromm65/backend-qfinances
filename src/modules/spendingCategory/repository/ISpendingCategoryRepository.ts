import { ICreateSpendingCategoryDTO } from "../dtos/ICreateSpendingCategoryDTO";
import { SpendindCategory } from "../infra/typeorm/entities/spendindCategory";

interface ISpendingCategoryRepository {
    listByUser(initialDate: Date, endDate: Date): Promise<SpendindCategory[]>;
    create(data: ICreateSpendingCategoryDTO): Promise<SpendindCategory>;
    findByName(name: string): Promise<SpendindCategory>;
}

export { ISpendingCategoryRepository };
