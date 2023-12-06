# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.1](https://github.com/RoxaVN/roxavn/compare/v0.1.0...v0.1.1) (2023-12-06)

### Features

- add CONTRACT_ADDRESS attribute ([9218bc7](https://github.com/RoxaVN/roxavn/commit/9218bc7cb6d38f10fb6db356bd80c6661dcb859d))
- change NFT_ID to TOKEN_ID ([1e926a4](https://github.com/RoxaVN/roxavn/commit/1e926a44f272d3229bd14144e1918a1d0224bfa1))
- don't check asset store with from store ([8be6537](https://github.com/RoxaVN/roxavn/commit/8be653794b324b4aa9b91372db350208606fa5c0))
- update with GetAssetsApiService ([b3c623a](https://github.com/RoxaVN/roxavn/commit/b3c623aa7067c8cdfb586c47784d674de99afad9))

### Bug Fixes

- wrong typo ([b23ea31](https://github.com/RoxaVN/roxavn/commit/b23ea312273349691845970e486213209f134d1c))

## 0.1.0 (2023-11-23)

### Features

- add attributes constants ([da7327f](https://github.com/RoxaVN/roxavn/commit/da7327f58f7d788af2d38ad076ca3c1ccc3f5268))
- add columns to store table ([9255880](https://github.com/RoxaVN/roxavn/commit/9255880e08edee4b97e3978e83f6c29114796d43))
- add ConsumeNftTransferEventService ([8fd7873](https://github.com/RoxaVN/roxavn/commit/8fd7873a23bb3a350a5e90a5f97c791785c66439))
- add GetOrCreateStoreWeb3Service ([96c63c6](https://github.com/RoxaVN/roxavn/commit/96c63c6659ff09900a4a95d0408e47f7f6450b77))
- add InstallHook ([5a6e99e](https://github.com/RoxaVN/roxavn/commit/5a6e99efd6f5bae39cdba5615ff651a7459459c5))
- add migration ([e7e3cb6](https://github.com/RoxaVN/roxavn/commit/e7e3cb6cc6568517a7ce3a2e25e13347f08b754b))
- add unique for Store table ([930b9d0](https://github.com/RoxaVN/roxavn/commit/930b9d095471489d5869b650ca8bf40061f39aa4))
- init module ([25aaccc](https://github.com/RoxaVN/roxavn/commit/25aaccc866e81295dad74e592a26dc59c3173d87))
- make ConsumeNftTransferEventService extends ConsumeWeb3EventService ([7748db4](https://github.com/RoxaVN/roxavn/commit/7748db42b3d67e1ee9cdc3c41e6a3f7699a9b1c1))
- remove web3NetworkId column in store table ([d651923](https://github.com/RoxaVN/roxavn/commit/d651923ebb43c4b7a0816b0f9b3e9e2b82ebf395))
- update with CreateAssetService ([5c9b299](https://github.com/RoxaVN/roxavn/commit/5c9b29931f86a40fc066f2d4efca5a12f2e478b2))

### Bug Fixes

- cannot write file because it would overwrite input file ([8283f4c](https://github.com/RoxaVN/roxavn/commit/8283f4cf61b74e9b6a64c2455d92cab70006a17f))
- null value in column "name" of relation "store" violates not-null constraint ([09392a9](https://github.com/RoxaVN/roxavn/commit/09392a901113ba01ef5da04c9d861947cf2a0232))
- return empty store if existing ([d451bdd](https://github.com/RoxaVN/roxavn/commit/d451bddf38a213a81c18a4906440d747d946b131))
- work with typeorm-transactional ([191e702](https://github.com/RoxaVN/roxavn/commit/191e7022847ede05d5e9b9002f237744141f8bff))
