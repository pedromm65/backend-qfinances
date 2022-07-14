import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserSpendingCategories1648078923524
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_spending_categories",
                columns: [
                    {
                        name: "id_user_spending_category",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "fk_spending_category_id_category",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "fk_user_id_user",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "percentage",
                        type: "numeric",
                        isNullable: true
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_spending_category_usp",
                        referencedTableName: "spending_categories",
                        referencedColumnNames: ["id_category"],
                        columnNames: ["fk_spending_category_id_category"],
                        onDelete: "CASCADE",
                    },
                    {
                        name: "fk_user_usp",
                        referencedTableName: "users",
                        referencedColumnNames: ["id_user"],
                        columnNames: ["fk_user_id_user"],
                        onDelete: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_spending_categories");
    }
}
