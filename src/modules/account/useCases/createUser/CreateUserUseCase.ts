import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/App.Error";
import { generateTokenAndRefreshToken } from "../../../../utils/generateAuth";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repository/IUsersRepository";
import { IUserTokenRepository } from "../../repository/IUserTokenRepository";

interface IResponse {
    token: string;
    refresh_token: string;
    user: {
        name: string;
        email: string;
        is_vip: boolean;
        is_admin: boolean;
        phone: string;
    };
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UserTokenRepository")
        private userTokenRepository: IUserTokenRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({
        email,
        name,
        password,
        phone
    }: ICreateUserDTO): Promise<IResponse> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new AppError("User already exists!", 401);
        }

        const passwordHash = await hash(password, 8);
        const user = await this.usersRepository.create({
            email,
            name,
            password: passwordHash,
            phone,
        });

        const { token, refresh_token: newRefreshToken } =
            generateTokenAndRefreshToken(user);
        const expires_date = this.dateProvider.addDays(
            auth.expires_refresh_token_days
        );
        await this.userTokenRepository.create({
            expires_date,
            refresh_token: newRefreshToken,
            fk_user_id_user: user.id_user,
        });
        const response = {
            token,
            user,
            refresh_token: newRefreshToken,
        };

        delete user.password;

        return response;
    }
}

export { CreateUserUseCase };
