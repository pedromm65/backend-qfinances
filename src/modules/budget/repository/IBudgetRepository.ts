import { ICreateBudgetDTO } from "../dtos/ICreateBudgetDTO";
import { budget } from "../infra/typeorm/entities/budget";

interface IBudgetRepository {
    create(data: ICreateBudgetDTO): Promise<budget>;
    findAndUpdateTrue(is_active: boolean): Promise<void>;
    findAndUpdateFalse(is_active: boolean): Promise<void>;
    findByUserId(fk_user_id_user: string): Promise<budget[]>;
}

export { IBudgetRepository };
