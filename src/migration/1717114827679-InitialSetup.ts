import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSetup1717114827679 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the "room" table
    await queryRunner.query(`
      CREATE TABLE "room" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "capacity" integer NOT NULL,
        "userId" integer NOT NULL,
        CONSTRAINT "name" PRIMARY KEY ("id")
      )
    `);

    // Insert data into the "room" table
    await queryRunner.query(`
      INSERT INTO "room" ("name", "capacity", "userId") VALUES
      ('Conference Room A', 10, 1),
      ('Meeting Room B', 8, 2),
      ('Workshop Room C', 20, 1),
      ('Training Room D', 15, 3),
      ('Seminar Room E', 25, 2),
      ('Discussion Room F', 5, 4),
      ('Board Room G', 12, 1),
      ('Conference Room H', 10, 3),
      ('Small Meeting Room I', 4, 2),
      ('Large Conference Room J', 30, 4),
      ('Project Room K', 6, 1),
      ('Collaboration Room L', 10, 3),
      ('Focus Room M', 2, 2),
      ('Presentation Room N', 18, 1),
      ('Lecture Room O', 22, 3),
      ('Briefing Room P', 14, 4),
      ('Strategy Room Q', 10, 1),
      ('Consultation Room R', 5, 3),
      ('Interview Room S', 3, 2),
      ('Brainstorming Room T', 12, 4);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the "room" table
    await queryRunner.query(`DROP TABLE "room"`);
  }
}
