import { ICreateSpendingDTO } from "../dtos/ICreateSpendingDTO";
import { Spending } from "../infra/entities/Spending";

interface ISpendingRepository {
    create(data: ICreateSpendingDTO): Promise<Spending>;
    listByUser(id_user: string): Promise<Spending[]>;
}

export { ISpendingRepository };
