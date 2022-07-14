import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUserInfoUseCase } from "./GetUserInfoUseCase";

class GetUserInfoController {
    async handle(request: Request, response: Response) {
        const { id } = request.user;
        const getUserInfoUseCase = container.resolve(GetUserInfoUseCase);

        const user = await getUserInfoUseCase.returnUserInfo({ id });

        return response.status(200).json(user);
    }
}

export { GetUserInfoController };
