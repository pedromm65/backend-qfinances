import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users_spending_categories")
class UserSpendingCategory {
    @PrimaryColumn()
    id_user_spending_category: string;

    @PrimaryColumn()
    fk_spending_category_id_category: string;

    @PrimaryColumn()
    fk_user_id_user: string;

    @Column()
    percentage: number;

    constructor() {
        if (!this.id_user_spending_category) {
            this.id_user_spending_category = uuidv4();
        }
    }
}

export { UserSpendingCategory };
