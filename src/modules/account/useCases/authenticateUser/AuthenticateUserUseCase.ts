import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/App.Error";
import { generateTokenAndRefreshToken } from "../../../../utils/generateAuth";
import { IUsersRepository } from "../../repository/IUsersRepository";
import { IUserTokenRepository } from "../../repository/IUserTokenRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
        is_vip: boolean;
        is_admin: boolean;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UserTokenRepository")
        private userTokenRepository: IUserTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        const { expires_refresh_token_days } = auth;
        if (!user) {
            throw new AppError("email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("email or password incorrect!");
        }

        const userToken =
            await this.userTokenRepository.findByUserId(
                user.id_user
            );

        if (userToken) {
            await this.userTokenRepository.deleteById(userToken.id_token);
        }

        const { token, refresh_token: newRefreshToken } =
            generateTokenAndRefreshToken(user);

        const refresh_token_expires_date = this.dateProvider.addDays(
            expires_refresh_token_days
        );

        await this.userTokenRepository.create({
            fk_user_id_user: user.id_user,
            refresh_token: newRefreshToken,
            expires_date: refresh_token_expires_date,
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
                is_vip: user.is_vip,
                is_admin: user.is_admin,
            },
            refresh_token: newRefreshToken,
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
