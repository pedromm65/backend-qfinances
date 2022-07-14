import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../../../account/infra/typeorm/entities/user";

@Entity("budget")
class Budget {
    @PrimaryColumn()
    id_budget: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "fk_user_id_user" })
    user: User;

    @Column()
    fk_user_id_user: string;

    @Column()
    budget: number;

    @Column()
    period: string;

    @Column()
    created_at: Date;

    @Column()
    is_active: boolean;

    @Column()
    final_date: Date;

    constructor() {
        if (!this.id_budget) {
            this.id_budget = uuidv4();
        }
    }
}

export { Budget };
