
import { inject, injectable } from "tsyringe";
import { getRepository } from "typeorm";
import { AppError } from "../../../../shared/errors/App.Error";
import { User } from "../../infra/typeorm/entities/user";

import { IUsersRepository } from "../../repository/IUsersRepository";

interface IRequest {
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
    phone?: string;
    id_user: string;
}

@injectable()
class UpdateUserInformationUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({ id_user, avatar, email, name, password, phone }: IRequest) {
        const userUpdated = await this.usersRepository.updateUserInformation({
            id_user,
            avatar,
            email,
            name,
            password,
            phone
        })

        if (!userUpdated) {
            throw new AppError("User does not exists!")
        }

        await this.usersRepository.create(userUpdated)

        return userUpdated
    }
}


export { UpdateUserInformationUseCase }