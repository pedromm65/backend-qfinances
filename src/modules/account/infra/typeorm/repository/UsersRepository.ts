import { request } from "express";
import moment from "moment";
import { getRepository, Repository } from "typeorm";

import { AppError } from "../../../../../shared/errors/App.Error";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../../dtos/IUpdateUserDTO";
import { IUsersRepository } from "../../../repository/IUsersRepository";
import { User } from "../entities/user";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        email,
        name,
        password,
        avatar,
        phone,
        id_user,
        is_vip,
        vip_expires_date,
    }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({
            email,
            name,
            password,
            avatar,
            phone,
            id_user,
            is_vip,
            vip_expires_date,
        });

        await this.repository.save(user);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

    async findById(id_user: string): Promise<User> {
        const user = await this.repository.findOne(id_user);

        return user;
    }

    async findByIdAndUpdate(id_user: string, period: string): Promise<User> {
        const user = await this.repository.findOne(id_user);
        user.is_vip = true;

        if (period === "month") {
            const dateNow = moment();
            const dateAfter = dateNow.add(1, "month").toDate();
            user.vip_expires_date = dateAfter;
        } else if (period === "year") {
            const dateNow = moment();
            const dateAfter = dateNow.add(1, "year").toDate();
            user.vip_expires_date = dateAfter;
        } else {
            throw new AppError("Invalid date!");
        }

        return user;
    }

    async updateUserInformation({ id_user, avatar, email, name, password, phone }: IUpdateUserDTO) {
        const user = await this.repository.findOne(id_user)

        if (!user) {
            throw new AppError("User does not exists!")
        }

        user.avatar = avatar ? avatar : user.avatar;
        user.email = email ? email : user.email;
        user.name = name ? name : user.name;
        user.password = password ? password : user.password;
        user.phone = phone ? phone : user.phone;


        return user

    }
}

export { UsersRepository };
