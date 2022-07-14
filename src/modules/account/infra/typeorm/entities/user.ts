import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
    @PrimaryColumn()
    id_user: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column()
    phone: string;

    @Column()
    is_admin: boolean;

    @Column()
    is_vip: boolean;

    @Column()
    vip_expires_date: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id_user) {
            this.id_user = uuidV4();
            this.is_vip = false;
        }
    }
}

export { User };
