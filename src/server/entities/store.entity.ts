import { Column } from 'typeorm';
import { decorate } from '@roxavn/core';
import { Store } from '@roxavn/module-asset/server';

declare module '@roxavn/module-asset/server' {
  interface Store {
    web3Address?: Date;
    web3NetworkId?: string;
  }
}

decorate(
  [Column({ type: 'bigint', nullable: true })],
  Store.prototype,
  'web3NetworkId'
);

decorate(
  [Column({ type: 'text', nullable: true })],
  Store.prototype,
  'web3Address'
);

export {};
