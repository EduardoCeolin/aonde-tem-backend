import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateBusiness1588453982718 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "business",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "avatar",
            type: "varchar",
          },
          {
            name: "nome",
            type: "varchar",
          },
          {
            name: "setor",
            type: "varchar",
          },
          {
            name: "cnpj_cpf",
            type: "varchar",
          },
          {
            name: "openHour",
            type: "timestamp",
          },
          {
            name: "closeHour",
            type: "timestamp",
          },
          {
            name: "instagram",
            type: "varchar",
          },
          {
            name: "facebook",
            type: "varchar",
          },
          {
            name: "whatsapp",
            type: "varchar",
          },
          {
            name: "fone_cel",
            type: "varchar",
          },
          {
            name: "user_id",
            type: "uuid",
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
        ],
      })
    );

    await queryRunner.createForeignKey(
      "business",
      new TableForeignKey({
        name: "userForeignKey",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("business", "userForeignKey");
    await queryRunner.dropTable("business");
  }
}
