import { NotFoundException } from '@roxavn/core';
import { serviceContainer } from '@roxavn/core/server';
import {
  CreateAssetService,
  UpdateAssetService,
  GetAssetsApiService,
} from '@roxavn/module-asset/server';
import { utils } from '@roxavn/module-web3/base';
import { ConsumeWeb3EventService } from '@roxavn/module-web3/server';

import { serverModule } from '../module.js';
import { constants } from '../../base/index.js';
import { GetOrCreateStoreWeb3Service } from './store.js';

@serverModule.injectable()
export abstract class ConsumeNftTransferEventService extends ConsumeWeb3EventService {
  abstract getNftAttributes(tokenId: string): Promise<Record<string, any>>;

  async handleTransferEvent(request: {
    from: string;
    to: string;
    tokenId: string;
  }) {
    const crawler = await this.getCrawler();
    const getOrCreateStoreWeb3Service = await serviceContainer.getAsync(
      GetOrCreateStoreWeb3Service
    );
    const toStore = await getOrCreateStoreWeb3Service.handle({
      web3Address: request.to,
    });

    if (utils.isZero(request.from)) {
      const createAssetService =
        await serviceContainer.getAsync(CreateAssetService);
      const attributes = await this.getNftAttributes(request.tokenId);
      await createAssetService.handle({
        storeId: toStore.id,
        attributes: {
          ...attributes,
          [constants.Attributes.TOKEN_ID]: request.tokenId,
          [constants.Attributes.NETWORK_ID]: crawler.contract.networkId,
          [constants.Attributes.CONTRACT_ADDRESS]: crawler.contract.address,
        },
      });
    } else {
      const getAssetsApiService =
        await serviceContainer.getAsync(GetAssetsApiService);
      const updateAssetService =
        await serviceContainer.getAsync(UpdateAssetService);

      const { items } = await getAssetsApiService.handle({
        attributeFilters: [
          {
            name: constants.Attributes.NETWORK_ID,
            value: crawler.contract.networkId,
          },
          {
            name: constants.Attributes.CONTRACT_ADDRESS,
            value: crawler.contract.address,
          },
          { name: constants.Attributes.TOKEN_ID, value: request.tokenId },
        ],
      });
      if (items.length) {
        const item = items[0];

        await updateAssetService.handle({
          assetId: item.id,
          storeId: toStore.id,
        });
      } else {
        throw new NotFoundException();
      }
    }
  }

  async consume(event: Record<string, any>) {
    return this.handleTransferEvent({
      from: event.from,
      to: event.to,
      tokenId: event.tokenId,
    });
  }
}
