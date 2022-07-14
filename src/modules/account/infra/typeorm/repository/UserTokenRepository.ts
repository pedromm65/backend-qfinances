import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUserTokenRepository } from "../../../repository/IUserTokenRepository";
import { UserTokens } from "../entities/userToken";

class UserTokenRepository implements IUserTokenRepository {
    private repository: Repository<UserTokens>;
    constructor() {
        this.repository = getRepository(UserTokens);
    }

    async create({
        expires_date,
        fk_user_id_user,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            fk_user_id_user,
            refresh_token,
        });

        await this.repository.save(userToken);

        return userToken;
    }

    async findByRefreshToken(
        refresh_token: string
    ): Promise<UserTokens> {
        const usersTokens = await this.repository.findOne({
            refresh_token,
        });

        return usersTokens;
    }

    async findByUserId(
        fk_user_id_user: string
    ): Promise<UserTokens> {
        const usersTokens = await this.repository.findOne({
            fk_user_id_user,
        });

        return usersTokens;
    }

    async deleteById(id_token: string): Promise<void> {
        await this.repository.delete(id_token);
    }
}

export { UserTokenRepository };
