import { container } from "tsyringe";

import "./providers";

import { UsersRepository } from "../../modules/account/infra/typeorm/repository/UsersRepository";
import { UserTokenRepository } from "../../modules/account/infra/typeorm/repository/UserTokenRepository";
import { IUsersRepository } from "../../modules/account/repository/IUsersRepository";
import { IUserTokenRepository } from "../../modules/account/repository/IUserTokenRepository";
import { BudgetRepository } from "../../modules/budget/infra/typeorm/repository/BudgetRepository";
import { IBudgetRepository } from "../../modules/budget/repository/IBudgetRepository";
import { SpendingRepository } from "../../modules/spending/infra/repository/SpendingRepository";
import { ISpendingRepository } from "../../modules/spending/repository/ISpendingRepository";
import { SpendingCategoryRepository } from "../../modules/spendingCategory/infra/typeorm/repository/SpendingCategoryRepository";
import { ISpendingCategoryRepository } from "../../modules/spendingCategory/repository/ISpendingCategoryRepository";
import { UserSpendingCategoryRepository } from "../../modules/userSpendingCategory/infra/typeorm/repository/UserSpendingCategoryRepository";
import { IUserSpendingCategoryRepository } from "../../modules/userSpendingCategory/repository/IUserSpendingCategoryRepository";

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<IBudgetRepository>(
    "BudgetRepository",
    BudgetRepository
);

container.registerSingleton<ISpendingCategoryRepository>(
    "SpendingCategoryRepository",
    SpendingCategoryRepository
);

container.registerSingleton<IUserSpendingCategoryRepository>(
    "UserSpendingCategoryRepository",
    UserSpendingCategoryRepository
);

container.registerSingleton<IUserTokenRepository>(
    "UserTokenRepository",
    UserTokenRepository
);

container.registerSingleton<ISpendingRepository>(
    "SpendingRepository",
    SpendingRepository
);
