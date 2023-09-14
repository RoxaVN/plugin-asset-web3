import { BaseService, inject } from '@roxavn/core/server';
import {
  CreateUserApiService,
  GetUsersApiService,
  CreateIdentityService,
} from '@roxavn/module-user/server';
import { constants } from '@roxavn/plugin-web3-auth/base';

import { serverModule } from '../server/index.js';

@serverModule.injectable()
export class InstallHook extends BaseService {
  constructor(
    @inject(CreateUserApiService)
    protected createUserApiService: CreateUserApiService,
    @inject(GetUsersApiService)
    protected getUsersApiService: GetUsersApiService,
    @inject(CreateIdentityService)
    protected createIdentityService: CreateIdentityService
  ) {
    super();
  }

  async handle() {
    const { items } = await this.getUsersApiService.handle({
      username: 'zero',
    });
    if (!items.length) {
      const user = await this.createUserApiService.handle({ username: 'zero' });
      await this.createIdentityService.handle({
        subject: '0x0000000000000000000000000000000000000000',
        type: constants.identityTypes.WEB3_ADDRESS,
        userId: user.id,
      });
    }
  }
}
