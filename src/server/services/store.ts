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

  async handle(request: { web3Address: string }): Promise<Store> {
    const web3Address = request.web3Address.toLowerCase();
    const item = await this.databaseService.manager
      .getRepository(Store)
      .findOne({
        where: { web3Address },
      });
    if (item) {
      if (!item.userId) {
        const identity = await this.getIdentityBytypeService.handle({
          subject: web3Address,
          type: constants.identityTypes.WEB3_ADDRESS,
        });
        if (identity) {
          item.userId = identity.userId;
          await this.databaseService.manager.getRepository(Store).save(item);
        }
      }
      return item;
    } else {
      // create new store
      const store = new Store();
      store.web3Address = web3Address;
      store.name = web3Address;
      store.type = Store.TYPE_PUBLIC;
      const identity = await this.getIdentityBytypeService.handle({
        subject: web3Address,
        type: constants.identityTypes.WEB3_ADDRESS,
      });
      if (identity) {
        store.userId = identity.userId;
      }
      await this.databaseService.manager.getRepository(Store).insert(store);
      return store;
    }
  }
}
