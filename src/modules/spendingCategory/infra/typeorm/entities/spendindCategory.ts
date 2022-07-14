import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("spending_categories")
class SpendindCategory {
    @PrimaryColumn()
    id_category: string;

    @Column()
    name: string;

    @Column()
    icon: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id_category) {
            this.id_category = uuidv4();
        }
    }
}

export { SpendindCategory };
