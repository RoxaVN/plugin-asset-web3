import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitPluginAssetWebThree1694566958191
  implements MigrationInterface
{
  name = 'InitPluginAssetWebThree1694566958191';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "store"
      ADD "web3NetworkId" bigint
      `);
    await queryRunner.query(`
      ALTER TABLE "store"
      ADD "web3Address" text
      `);
    await queryRunner.query(`
      ALTER TABLE "store"
      ADD CONSTRAINT "UQ_3f9b2b9f4171bc826462a0ada01" UNIQUE ("web3Address", "web3NetworkId")
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "store" DROP CONSTRAINT "UQ_3f9b2b9f4171bc826462a0ada01"
      `);
    await queryRunner.query(`
      ALTER TABLE "store" DROP COLUMN "web3Address"
      `);
    await queryRunner.query(`
      ALTER TABLE "store" DROP COLUMN "web3NetworkId"
      `);
  }
}
