import { createModel } from '@rematch/core';

import { LoginData, SignupData, UserData } from '@jl/models';
import { AccountService, AuthService } from '@jl/services';

import { RootModel } from './index';

interface UserState {
  userData: UserData;
  isAuthenticated: boolean;
}

const initialState = {
  userData: null,
  isAuthenticated: false,
};

export const userStore = createModel<RootModel>()({
  state: { ...initialState } as UserState,
  reducers: {
    setUserData(state: UserState, userData: UserData | null) {
      return { ...state, userData };
    },
    setAuthState(state: UserState, isAuthenticated: boolean) {
      return { ...state, isAuthenticated: isAuthenticated };
    },
  },
  effects: dispatch => ({
    async login(payload: LoginData) {
      const { uid, email } = await AuthService.signIn(payload);
      const { salt, recoveryKey, name } = await AccountService.getMe(uid);

      dispatch.userStore.setUserData({
        userId: uid,
        email: email,
        name: name,
      });
      dispatch.userStore.setAuthState(true);

      dispatch.encryptionStore.setSalt(salt);
      dispatch.encryptionStore.setRecoveryKey(recoveryKey);
    },

    async signUp(payload: SignupData) {
      const { uid, email } = await AuthService.signUp(payload);
      AccountService.createNewAccount({ email, name: payload.name, userId: uid });

      dispatch.userStore.setUserData({ userId: uid, email: email, name: payload.name });
      dispatch.userStore.setAuthState(true);
    },

    async logoutUser() {
      await AuthService.logOut();
      dispatch.userStore.setUserData(null);
      dispatch.userStore.setAuthState(false);
      dispatch.encryptionStore.resetToInitialState();
    },
  }),
});
