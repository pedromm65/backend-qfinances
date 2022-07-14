import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBudget1648079017205 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "budget",
                columns: [
                    {
                        name: "id_budget",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "budget",
                        type: "numeric",
                    },
                    {
                        name: "period",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true,
                        isNullable: true,
                    },
                    {
                        name: "final_date",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "fk_user_id_user",
                        type: "uuid",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_user_budget",
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
        await queryRunner.dropTable("budget");
    }
}
