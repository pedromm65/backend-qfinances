interface ICreateUserDTO {
    id_user?: string;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    phone?: string;
    is_vip?: boolean;
    vip_expires_date?: Date;
}

export { ICreateUserDTO };
