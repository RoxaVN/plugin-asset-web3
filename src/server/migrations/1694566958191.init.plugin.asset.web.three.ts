import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitPluginAssetWebThree1694566958191
  implements MigrationInterface
{
  name = 'InitPluginAssetWebThree1694566958191';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "store"
      ADD "web3Address" text
      `);
    await queryRunner.query(`
      ALTER TABLE "store"
      ADD CONSTRAINT "UQ_e5111dbb8ae6631e13d09df0edc" UNIQUE ("web3Address")
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "store" DROP CONSTRAINT "UQ_e5111dbb8ae6631e13d09df0edc"
      `);
    await queryRunner.query(`
      ALTER TABLE "store" DROP COLUMN "web3Address"
      `);
  }
}
