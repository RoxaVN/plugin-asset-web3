import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitPluginAssetWebThree1694484952276
  implements MigrationInterface
{
  name = 'InitPluginAssetWebThree1694484952276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "store"
      ADD "web3NetworkId" bigint
      `);
    await queryRunner.query(`
      ALTER TABLE "store"
      ADD "web3Address" text
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "store" DROP COLUMN "web3Address"
      `);
    await queryRunner.query(`
      ALTER TABLE "store" DROP COLUMN "web3NetworkId"
      `);
  }
}
