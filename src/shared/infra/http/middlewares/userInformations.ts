import { NextFunction, Request, Response } from "express";
import decode from "jwt-decode";

import { AppError } from "../../../errors/App.Error";

type DecodedToken = {
    sub: string;
};

export async function addUserInformation(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing");
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
        throw new AppError("Token missing");
    }

    try {
        const decoded = decode(token as string) as DecodedToken;
        request.user = { id: decoded.sub };

        next();
    } catch (errors) {
        throw new AppError("Invalid token format!");
    }
}
