import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSpending1648083152554 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "spending",
                columns: [
                    {
                        name: "id_spending",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "value",
                        type: "numeric",
                    },
                    {
                        name: "date",
                        type: "timestamp",
                    },
                    {
                        name: "fk_user_id_user",
                        type: "uuid",
                    },
                    {
                        name: "fk_spending_category_id_category",
                        type: "uuid",
                    },
                    {
                        name: "fk_budget_id_budget",
                        type: "uuid",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_spending_category_spending",
                        referencedTableName: "spending_categories",
                        referencedColumnNames: ["id_category"],
                        columnNames: ["fk_spending_category_id_category"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "fk_user_spending",
                        referencedTableName: "users",
                        referencedColumnNames: ["id_user"],
                        columnNames: ["fk_user_id_user"],
                        onDelete: "CASCADE",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "fk_budget_spending",
                        referencedTableName: "budget",
                        referencedColumnNames: ["id_budget"],
                        columnNames: ["fk_budget_id_budget"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("spending");
    }
}
