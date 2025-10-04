import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBookAuthorsTable1759068511818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "book_authors",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "book_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "author_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true
                    }
                ],
                indices: [
                    {
                        name: "IDX_BOOK_AUTHORS_UNIQUE",
                        columnNames: ["book_id", "author_id"],
                        isUnique: true
                    }
                ]
            })
        );

        // Criar foreign key para books
        await queryRunner.createForeignKey("book_authors", new TableForeignKey({
            columnNames: ["book_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "books",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
            name: "FK_BOOK_AUTHORS_BOOK"
        }));

        // Criar foreign key para authors
        await queryRunner.createForeignKey("book_authors", new TableForeignKey({
            columnNames: ["author_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "authors",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
            name: "FK_BOOK_AUTHORS_AUTHOR"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("book_authors");
    }

}
