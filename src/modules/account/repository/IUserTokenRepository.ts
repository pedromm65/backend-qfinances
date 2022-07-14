import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/userToken";

interface IUserTokenRepository {
    create(data: ICreateUserTokenDTO): Promise<UserTokens>;
    findByUserId(fk_user_id_user: string): Promise<UserTokens>;
    findByRefreshToken(refresh_token: string): Promise<UserTokens>;
    deleteById(id: string): Promise<void>;
}

export { IUserTokenRepository };
