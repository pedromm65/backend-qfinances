import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserToken1649723261184 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_token",
                columns: [
                    {
                        name: "id_token",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "refresh_token",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "fk_user_id_user",
                        type: "uuid",
                    },
                    {
                        name: "expires_date",
                        type: "timestamp",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fk_user_token",
                        referencedTableName: "users",
                        referencedColumnNames: ["id_user"],
                        columnNames: ["fk_user_id_user"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_token");
    }
}
