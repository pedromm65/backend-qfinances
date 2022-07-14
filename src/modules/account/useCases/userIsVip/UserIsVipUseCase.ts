import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/App.Error";
import { User } from "../../infra/typeorm/entities/user";
import { IUsersRepository } from "../../repository/IUsersRepository";

interface IRequest {
    id_user: string;
    period: string;
}

@injectable()
class UserIsVipUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ id_user, period }: IRequest): Promise<User> {
        const user = await this.usersRepository.findByIdAndUpdate(
            id_user,
            period
        );

        if (!user) {
            throw new AppError("User not found!");
        }

        await this.usersRepository.create(user);

        return user;
    }
}

export { UserIsVipUseCase };
