import { BaseService, DatabaseService, inject } from '@roxavn/core/server';
import { Store } from '@roxavn/module-asset/server';
import { GetIdentityBytypeService } from '@roxavn/module-user/server';
import { constants } from '@roxavn/plugin-web3-auth/base';

import { serverModule } from '../module.js';

@serverModule.injectable()
export class GetOrCreateStoreWeb3Service extends BaseService {
  constructor(
    @inject(DatabaseService) protected databaseService: DatabaseService,
    @inject(GetIdentityBytypeService)
    private getIdentityBytypeService: GetIdentityBytypeService
  ) {
    super();
  }

  async handle(request: { web3Address: string; web3NetworkId?: string }) {
    const result = await this.databaseService.manager
      .createQueryBuilder()
      .insert()
      .into(Store)
      .values({
        type: Store.TYPE_PUBLIC,
        web3Address: request.web3Address,
        web3NetworkId: request.web3NetworkId,
      })
      .orIgnore()
      .returning('*')
      .execute();

    const item = result.generatedMaps[0];
    if (!item.userId) {
      const identity = await this.getIdentityBytypeService.handle({
        subject: request.web3Address.toLowerCase(),
        type: constants.identityTypes.WEB3_ADDRESS,
      });
      if (identity) {
        await this.databaseService.manager
          .getRepository(Store)
          .update({ id: item.id }, { userId: identity.userId });
      }
    }

    return item;
  }
}
