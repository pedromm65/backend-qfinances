import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserIsVipUseCase } from "./UserIsVipUseCase";

class UserIsVipController {
    async handle(request: Request, response: Response) {
        const { id } = request.user;
        const { period } = request.body;

        const userIsVipUseCase = container.resolve(UserIsVipUseCase);

        await userIsVipUseCase.execute({
            id_user: id,
            period,
        });

        return response.send();
    }
}

export { UserIsVipController };
