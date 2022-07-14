import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/App.Error";
import { User } from "../../infra/typeorm/entities/user";
import { IUsersRepository } from "../../repository/IUsersRepository";

@injectable()
class GetUserInfoUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async returnUserInfo({ id }): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError("User is'n exists!", 404);
        }

        delete user.password;

        return user;
    }
}

export { GetUserInfoUseCase };
