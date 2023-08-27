import { createModel } from '@rematch/core';

import { LoginData, SignupData, UserData } from '@jl/models';
import { AccountService, AuthService } from '@jl/services';

import { RootModel } from './index';

interface UserState {
  isAuthenticated: boolean;
  userId: string;
  name: string;
  email: string;
}

const initialState = {
  isAuthenticated: false,
  userId: '',
  name: '',
  email: '',
};

export const userStore = createModel<RootModel>()({
  state: { ...initialState } as UserState,
  reducers: {
    setUserData(state: UserState, userData: UserData | null) {
      return { ...state, ...userData };
    },
    setAuthState(state: UserState, isAuthenticated: boolean) {
      return { ...state, isAuthenticated: isAuthenticated };
    },
    resetToInitialState() {
      return { ...initialState };
    },
  },
  effects: dispatch => ({
    async login(payload: LoginData) {
      const { uid, email } = await AuthService.signIn(payload);
      const { salt, name, encryptedRecoveryKey, securityPreference } = await AccountService.getMe(
        uid,
      );

      dispatch.userStore.setUserData({
        userId: uid,
        email: email,
        name: name,
      });

      dispatch.userStore.setAuthState(true);
      dispatch.encryptionStore.setSalt(salt);
      dispatch.encryptionStore.setEncryptedRecoveryKey(encryptedRecoveryKey);
      dispatch.encryptionStore.setSecurityPreference(securityPreference);
    },

    async signUp(payload: SignupData) {
      const { uid, email } = await AuthService.signUp(payload);
      AccountService.createNewAccount({ email, name: payload.name, userId: uid });

      dispatch.userStore.setUserData({ userId: uid, email: email, name: payload.name });
      dispatch.userStore.setAuthState(true);
    },

    async logoutUser() {
      await AuthService.logOut();
      dispatch.userStore.resetToInitialState();
      dispatch.encryptionStore.resetToInitialState();
    },
  }),
});
