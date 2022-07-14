interface ICreateUserSpendingCategoryDTO {
    fk_spending_category_id_category: string;
    fk_user_id_user: string;
    percentage?: number;
}

export { ICreateUserSpendingCategoryDTO };
