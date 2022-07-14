import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../../account/infra/typeorm/entities/user";

@Entity("spending")
class Spending {
    @PrimaryColumn()
    id_spending: string;

    @Column()
    value: number;

    @Column()
    date: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "fk_user_id_user" })
    user: User;

    @Column()
    fk_user_id_user: string;

    @Column()
    fk_spending_category_id_category: string;

    @Column()
    fk_budget_id_budget: string;

    constructor() {
        if (!this.id_spending) {
            this.id_spending = uuidv4();
        }
    }
}

export { Spending };
