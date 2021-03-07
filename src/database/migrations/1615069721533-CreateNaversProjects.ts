import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNaversProjects1615069721533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "navers_projects",
        columns: [
          {
            name: "naver_id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "project_id",
            type: "int",
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: "FKNaverProject",
            referencedTableName: "navers",
            referencedColumnNames: ["id"],
            columnNames: ["naver_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKProjectNaver",
            referencedTableName: "projects",
            referencedColumnNames: ["id"],
            columnNames: ["project_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("navers_projects");
  }
}
