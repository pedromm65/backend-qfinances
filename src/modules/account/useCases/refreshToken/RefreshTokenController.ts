import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { refresh_token } = request.body;

        const { id } = request.user;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const generatedTokenAndRefreshToken = await refreshTokenUseCase.execute(
            {
                refresh_token,
                id_user: id,
            }
        );

        return response.json(generatedTokenAndRefreshToken);
    }
}

export { RefreshTokenController };
