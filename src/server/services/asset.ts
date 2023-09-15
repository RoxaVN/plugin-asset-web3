import { BadRequestException, NotFoundException } from '@roxavn/core';
import { serviceContainer } from '@roxavn/core/server';
import {
  CreateAssetService,
  UpdateAssetService,
  CreateAssetAttributesService,
  GetAssetsApiService,
} from '@roxavn/module-asset/server';
import { utils } from '@roxavn/module-web3/base';
import { ConsumeWeb3EventService } from '@roxavn/module-web3/server';

import { serverModule } from '../module.js';
import { constants } from '../../base/index.js';
import { GetOrCreateStoreWeb3Service } from './store.js';

@serverModule.injectable()
export abstract class ConsumeNftTransferEventService extends ConsumeWeb3EventService {
  abstract getNftAttributes(tokenId: string): Promise<
    Array<{
      name: string;
      value: any;
    }>
  >;

  async handleTransferEvent(request: {
    from: string;
    to: string;
    tokenId: string;
    networkId: string;
  }) {
    const getOrCreateStoreWeb3Service = await serviceContainer.getAsync(
      GetOrCreateStoreWeb3Service
    );
    const createAssetService =
      await serviceContainer.getAsync(CreateAssetService);
    const createAssetAttributesService = await serviceContainer.getAsync(
      CreateAssetAttributesService
    );
    const updateAssetService =
      await serviceContainer.getAsync(UpdateAssetService);
    const getAssetsApiService =
      await serviceContainer.getAsync(GetAssetsApiService);

    const fromStore = await getOrCreateStoreWeb3Service.handle({
      web3Address: request.from,
    });
    const toStore = await getOrCreateStoreWeb3Service.handle({
      web3Address: request.to,
    });

    const nftAttributes = [
      { name: constants.Attributes.NETWORK_ID, value: request.networkId },
      { name: constants.Attributes.NFT_ID, value: request.tokenId },
    ];
    if (utils.isZero(request.from)) {
      const attributes = await this.getNftAttributes(request.tokenId);
      const asset = await createAssetService.handle({ storeId: toStore.id });
      await createAssetAttributesService.handle({
        assetId: asset.id,
        attributes: [...attributes, ...nftAttributes],
      });
    } else {
      const { items } = await getAssetsApiService.handle({
        attributes: nftAttributes,
      });
      if (items.length) {
        const item = items[0];
        if (item.storeId === fromStore.id) {
          await updateAssetService.handle({
            assetId: item.id,
            storeId: toStore.id,
          });
        } else {
          throw new BadRequestException();
        }
      } else {
        throw new NotFoundException();
      }
    }
  }
}
