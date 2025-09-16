import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDeletedAtAndNullableFieldsToPublishers1758061900593 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "publishers",
            new TableColumn({
                name: "deleted_at",
                type: "timestamp",
                isNullable: true,
            })
        );

        await queryRunner.changeColumn(
            "publishers",
            "address",
            new TableColumn({
                name: "address",
                type: "varchar",
                isNullable: true,
            })
        );

        await queryRunner.changeColumn(
            "publishers",
            "phone",
            new TableColumn({
                name: "phone",
                type: "varchar",
                isNullable: true,
            })
        );

        await queryRunner.changeColumn(
            "publishers",
            "website",
            new TableColumn({
                name: "website",
                type: "varchar",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("publishers", "deleted_at");
        await queryRunner.changeColumn(
            "publishers",
            "address",
            new TableColumn({
                name: "address",
                type: "varchar",
                isNullable: false,
            })
        );

        await queryRunner.changeColumn(
            "publishers",
            "phone",
            new TableColumn({
                name: "phone",
                type: "varchar",
                isNullable: false,
            })
        );

        await queryRunner.changeColumn(
            "publishers",
            "website",
            new TableColumn({
                name: "website",
                type: "varchar",
                isNullable: false,
            })
        );
    }

}
