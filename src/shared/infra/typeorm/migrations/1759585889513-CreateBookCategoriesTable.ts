import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBookCategoriesTable1759585889513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "book_categories",
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
                        name: "category_id",
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
                        name: "IDX_BOOK_CATEGORIES_UNIQUE",
                        columnNames: ["book_id", "category_id"],
                        isUnique: true
                    }
                ]
            })
        );

        // Criar foreign key para books
        await queryRunner.createForeignKey("book_categories", new TableForeignKey({
            columnNames: ["book_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "books",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
            name: "FK_BOOK_CATEGORIES_BOOK"
        }));

        // Criar foreign key para categories
        await queryRunner.createForeignKey("book_categories", new TableForeignKey({
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "categories",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
            name: "FK_BOOK_CATEGORIES_CATEGORY"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("book_categories");
    }

}
