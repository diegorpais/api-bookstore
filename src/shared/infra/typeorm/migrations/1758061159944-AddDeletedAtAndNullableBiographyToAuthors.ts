import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDeletedAtAndNullableBiographyToAuthors1758061159944 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Adicionar coluna deleted_at
        await queryRunner.addColumn(
            "authors",
            new TableColumn({
                name: "deleted_at",
                type: "timestamp",
                isNullable: true,
            })
        );

        // 2. Alterar coluna biography para ser nullable
        await queryRunner.changeColumn(
            "authors",
            "biography",
            new TableColumn({
                name: "biography",
                type: "text",
                isNullable: true, // antes era obrigatório
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverter biography para NOT NULL
        await queryRunner.changeColumn(
            "authors",
            "biography",
            new TableColumn({
                name: "biography",
                type: "text",
                isNullable: false,
            })
        );

        // Remover coluna deleted_at
        await queryRunner.dropColumn("authors", "deleted_at");
    }

}
