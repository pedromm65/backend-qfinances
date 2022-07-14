import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../infra/typeorm/entities/user";

import { request } from "express"

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id_user: string): Promise<User>;
    findByIdAndUpdate(id_user: string, period: string): Promise<User>;
    updateUserInformation(data: IUpdateUserDTO): Promise<User>

}

export { IUsersRepository };
