interface ICreateSpendingDTO {
    value: number;
    date: Date;
    fk_user_id_user: string;
    fk_spending_category_id_category: string;
    fk_budget_id_budget: string;
}

export { ICreateSpendingDTO };
