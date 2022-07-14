import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/App.Error";
import { generateTokenAndRefreshToken } from "../../../../utils/generateAuth";
import { IUsersRepository } from "../../repository/IUsersRepository";
import { IUserTokenRepository } from "../../repository/IUserTokenRepository";

interface IRequest {
    id_user: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UserTokenRepository")
        private userTokenRepository: IUserTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }
    async execute({ refresh_token, id_user }: IRequest) {
        const user = await this.usersRepository.findById(id_user);

        if (!user) {
            throw new AppError("User does not exists!", 401);
        }

        const userToken =
            await this.userTokenRepository.findByRefreshToken(
                refresh_token,
            );

        if (!userToken) {
            throw new AppError("Refresh Token Error!", 401);
        }

        await this.userTokenRepository.deleteById(userToken.id_token);

        const expires_date = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );

        const { token, refresh_token: newRefreshToken } =
            generateTokenAndRefreshToken(user);

        await this.userTokenRepository.create({
            expires_date,
            refresh_token: newRefreshToken,
            fk_user_id_user: user.id_user,
        });
        return {
            token,
            refresh_token: newRefreshToken,
            is_vip: user.is_vip,
            is_admin: user.is_admin,
        };
    }
}

export { RefreshTokenUseCase };
