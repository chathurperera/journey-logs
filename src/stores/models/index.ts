import { Models } from '@rematch/core';

import { encryptionStore } from './encryption.store';
import { userStore } from './user.store';

export interface RootModel extends Models<RootModel> {
  userStore: typeof userStore;
  encryptionStore: typeof encryptionStore;
}

export const models: RootModel = { userStore, encryptionStore };
