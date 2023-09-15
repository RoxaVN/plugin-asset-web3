import { BaseService, inject } from '@roxavn/core/server';
import {
  CreateAttributeService,
  GetAllAttributesService,
} from '@roxavn/module-asset/server';
import {
  CreateUserApiService,
  GetUsersApiService,
  CreateIdentityService,
} from '@roxavn/module-user/server';
import { constants as web3AuthConstants } from '@roxavn/plugin-web3-auth/base';

import { serverModule } from '../server/index.js';
import { constants } from '../base/index.js';

@serverModule.injectable()
export class InstallHook extends BaseService {
  constructor(
    @inject(CreateUserApiService)
    protected createUserApiService: CreateUserApiService,
    @inject(GetUsersApiService)
    protected getUsersApiService: GetUsersApiService,
    @inject(CreateIdentityService)
    protected createIdentityService: CreateIdentityService,
    @inject(CreateAttributeService)
    protected createAttributeService: CreateAttributeService,
    @inject(GetAllAttributesService)
    protected getAttributesService: GetAllAttributesService
  ) {
    super();
  }

  async handle() {
    const usersResult = await this.getUsersApiService.handle({
      username: 'zero',
    });
    if (!usersResult.items.length) {
      const user = await this.createUserApiService.handle({ username: 'zero' });
      await this.createIdentityService.handle({
        subject: '0x0000000000000000000000000000000000000000',
        type: web3AuthConstants.identityTypes.WEB3_ADDRESS,
        userId: user.id,
      });
    }

    const attributesResult = await this.getAttributesService.handle({
      names: [constants.Attributes.NETWORK_ID, constants.Attributes.NFT_ID],
    });
    if (!attributesResult.items.length) {
      await this.createAttributeService.handle({
        name: constants.Attributes.NETWORK_ID,
        type: 'Varchar',
      });
      await this.createAttributeService.handle({
        name: constants.Attributes.NFT_ID,
        type: 'Varchar',
      });
    }
  }
}
