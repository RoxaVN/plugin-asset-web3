import { Column, Unique } from 'typeorm';
import { decorate } from '@roxavn/core';
import { Store } from '@roxavn/module-asset/server';

declare module '@roxavn/module-asset/server' {
  interface Store {
    web3Address?: string;
  }
}

decorate(
  [Column({ type: 'text', nullable: true })],
  Store.prototype,
  'web3Address'
);

decorate([Unique(['web3Address'])], Store);

export {};
