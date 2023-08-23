import { createModel } from '@rematch/core';

import { SECURITY_PREFERENCE, VALIDATION_STRING } from '@jl/constants';
import { CreateNewPINData } from '@jl/models';
import { EncryptionService, NoteEncryption } from '@jl/services';

import { RootModel } from './index';

interface EncryptionState {
  recoveryKey: string;
  salt: string;
  encryptedRecoveryKey: string;
  securityPreference: string;
  failedAttempts: number;
  lockoutTimestamp: number;
  lastAccessedHiddenNotesAt: number;
}

const initialState: EncryptionState = {
  recoveryKey: '',
  encryptedRecoveryKey: '',
  securityPreference: '',
  salt: '',
  failedAttempts: 0,
  lockoutTimestamp: 0,
  lastAccessedHiddenNotesAt: 0,
};

export const encryptionStore = createModel<RootModel>()({
  state: { ...initialState } as EncryptionState,
  reducers: {
    setRecoveryKey(state: EncryptionState, recoveryKey: string) {
      return { ...state, recoveryKey: recoveryKey };
    },
    setEncryptedRecoveryKey(state: EncryptionState, encryptedRecoveryKey: string) {
      return { ...state, encryptedRecoveryKey: encryptedRecoveryKey };
    },
    setSecurityPreference(state: EncryptionState, securityPreference: string) {
      return { ...state, securityPreference: securityPreference };
    },
    setSalt(state: EncryptionState, salt: string) {
      return { ...state, salt: salt };
    },
    setLockoutTimestamp(state: EncryptionState, lockoutTimestamp: number) {
      return { ...state, lockoutTimestamp: lockoutTimestamp };
    },
    resetLockoutTimestamp(state: EncryptionState) {
      return { ...state, lockoutTimestamp: null };
    },
    setLastAccessedHiddenNotesAt(state: EncryptionState, lastAccessedHiddenNotesAt: number) {
      return { ...state, lastAccessedHiddenNotesAt: lastAccessedHiddenNotesAt };
    },
    resetLastAccessedHiddenNotesAt(state: EncryptionState) {
      return { ...state, lastAccessedHiddenNotesAt: null };
    },
    incrementFailedAttempts(state: EncryptionState) {
      return { ...state, failedAttempts: state.failedAttempts + 1 };
    },
    resetFailedAttempts(state: EncryptionState) {
      return { ...state, failedAttempts: 0 };
    },
    resetToInitialState(state: EncryptionState) {
      return {
        ...state,
        recoveryKey: '',
        encryptedRecoveryKey: '',
        securityPreference: '',
        salt: '',
        failedAttempts: 0,
        lockoutTimestamp: null,
        lastAccessedHiddenNotesAt: null,
      };
    },
  },
  effects: dispatch => ({
    async createNewPIN(payload: CreateNewPINData) {
      const salt = EncryptionService.generateRandomBytes(16);
      const randomKey = EncryptionService.generateRandomBytes(16);
      const recoveryKey = VALIDATION_STRING + randomKey;

      const pinDerivedKey = EncryptionService.generatePinDerivedKey(payload.PIN, salt);
      const encryptedRecoveryKey = EncryptionService.generateEncryptedRecoveryKey(recoveryKey, pinDerivedKey);

      await NoteEncryption.savePinAndRecoveryKey(payload.userId, salt, encryptedRecoveryKey);

      dispatch.encryptionStore.setRecoveryKey(recoveryKey);
      dispatch.encryptionStore.setSecurityPreference(SECURITY_PREFERENCE.MEDIUM);
      dispatch.encryptionStore.setEncryptedRecoveryKey(encryptedRecoveryKey);
      dispatch.encryptionStore.setSalt(salt);
    },

    async changePIN(payload, state) {
      const { salt, recoveryKey } = state.encryptionStore;
      const { userId } = state.userStore.userData;

      const newEncryptedRecoveryKey = await EncryptionService.generateNewEncryptedRecoveryKey(
        payload,
        salt,
        recoveryKey,
      );
      await NoteEncryption.savePinAndRecoveryKey(userId, salt, newEncryptedRecoveryKey);
    },
  }),
});
