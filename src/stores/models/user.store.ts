import auth from '@react-native-firebase/auth';
import { createModel } from '@rematch/core';

import { LoginData, SignupData, UserData } from '@jl/models';
import { AccountService, AuthService } from '@jl/services';

import { RootModel } from './index';

interface UserState {
  userData: UserData;
  isEmailVerified: boolean;
}

const initialState = {
  userData: null,
  isEmailVerified: false,
};

export const userStore = createModel<RootModel>()({
  state: { ...initialState },
  reducers: {
    setUserData(state: UserState, userData: UserData | null) {
      return { ...state, userData };
    },
    setEmailVerification(state: UserState, isEmailVerified: boolean) {
      return { ...state, isEmailVerified: isEmailVerified };
    },
  },
  effects: dispatch => ({
    async login(payload: LoginData) {
      const { uid, email, emailVerified } = await AuthService.signIn(payload);
      dispatch.userStore.setUserData({ userId: uid, email: email });
      dispatch.userStore.setEmailVerification(emailVerified);
    },

    async signUp(payload: SignupData) {
      const { uid, email, emailVerified } = await AuthService.signUp(payload);
      dispatch.userStore.setUserData({ userId: uid, email: email, name: payload.name });
      dispatch.userStore.setEmailVerification(emailVerified);

      await auth().currentUser.sendEmailVerification();
      await AccountService.createNewAccount({ email, name: payload.name, userId: uid });
    },

    async logoutUser() {
      dispatch.userStore.setUserData(null);
      dispatch.userStore.setEmailVerification(false);
      await AuthService.logOut();
    },
  }),
});
