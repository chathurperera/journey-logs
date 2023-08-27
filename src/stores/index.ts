import { RematchDispatch, RematchRootState, init } from '@rematch/core';
import loadingPlugin from '@rematch/loading';
import createRematchPersist from '@rematch/persist';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux';

import { IS_JEST_RUNTIME } from '@jl/constants';
import { PersistentStorageService } from '@jl/services';

import { RootModel, models } from './models';

export let store: ReturnType<typeof initializeStore>;

export const initializeStore = () => {
  const plugins = [];
  plugins.push(loadingPlugin());

  const persistPlugin = createRematchPersist({
    key: 'root',
    storage: PersistentStorageService.getStorage(),
    whitelist: ['userStore'],
  });

  if (!IS_JEST_RUNTIME) {
    plugins.push(persistPlugin);
  }

  const initializedStore = init({
    models,
    plugins,
  });

  store = initializedStore;

  return initializedStore;
};

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export const useDispatch = () => useReduxDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export * from './models';
