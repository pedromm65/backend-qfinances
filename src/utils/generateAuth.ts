import { sign } from "jsonwebtoken";

import auth from "../config/auth";
import { User } from "../modules/account/infra/typeorm/entities/user";

export function generateToken(user: User) {
    const token = sign(
        { is_vip: user.is_vip, is_admin: user.is_admin },
        auth.secret_token,
        {
            subject: user.id_user,
            expiresIn: auth.expires_in_token,
        }
    );

    return token;
}

export function generateRefreshToken(user: User) {
    const refresh_token = sign(
        { email: user.email },
        auth.secrete_refresh_token,
        {
            subject: user.id_user,
            expiresIn: auth.expires_in_refresh_token,
        }
    );

    return refresh_token;
}

export function generateTokenAndRefreshToken(user: User) {
    const token = generateToken(user);
    const refresh_token = generateRefreshToken(user);

    return {
        token,
        refresh_token,
    };
}
