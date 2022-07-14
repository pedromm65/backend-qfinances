interface ICreateUserTokenDTO {
    fk_user_id_user: string;
    expires_date: Date;
    refresh_token: string;
}

export { ICreateUserTokenDTO };
