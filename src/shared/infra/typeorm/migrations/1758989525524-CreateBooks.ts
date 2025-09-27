import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBooks1758989525524 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "books",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "isbn",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "publication_year",
                        type: "int"
                    },
                    {
                        name: "pages",
                        type: "int"
                    },
                    {
                        name: "synopsis",
                        type: "text"
                    },
                    {
                        name: "language",
                        type: "varchar"
                    },
                    {
                        name: "publisher_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true,
                    }
                ],
            })
        );

        await queryRunner.createForeignKey("books", new TableForeignKey({
            columnNames: ["publisher_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "publishers",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("books");
    }

}
