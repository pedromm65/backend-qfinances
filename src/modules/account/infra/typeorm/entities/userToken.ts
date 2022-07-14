import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "./user";

@Entity("users_token")
class UserTokens {
    @PrimaryColumn()
    id_token: string;

    @Column()
    refresh_token: string;

    @Column()
    fk_user_id_user: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "fk_user_id_user" })
    user: User;

    @Column()
    expires_date: Date;

    @Column()
    created_at: Date;

    constructor() {
        if (!this.id_token) {
            this.id_token = uuidv4();
        }
    }
}

export { UserTokens };
