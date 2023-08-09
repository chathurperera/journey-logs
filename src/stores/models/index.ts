import { Models } from '@rematch/core';

import { userStore } from './user.store';

export interface RootModel extends Models<RootModel> {
  userStore: typeof userStore;
}

export const models: RootModel = { userStore };
