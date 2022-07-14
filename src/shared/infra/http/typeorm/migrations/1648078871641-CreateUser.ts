import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1648078871641 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id_user",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "avatar",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "is_admin",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "is_vip",
                        type: "boolean",
                    },
                    {
                        name: "vip_expires_date",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}
