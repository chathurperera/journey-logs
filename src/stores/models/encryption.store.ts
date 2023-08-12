import { createModel } from '@rematch/core';

import { CreateNewPINData } from '@jl/models';
import { EncryptionService, NoteEncryption } from '@jl/services';

import { RootModel } from './index';

interface EncryptionState {
  recoveryKey: string;
  salt: string;
  failedAttempts: number;
  lockoutTimestamp: number;
  lastAccessedHiddenNotesAt: number;
}

const initialState: EncryptionState = {
  recoveryKey: '',
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
      const randomKey = EncryptionService.generateRandomBytes(32);

      const pinDerivedKey = EncryptionService.generatePinDerivedKey(payload.PIN, salt);
      const recoveryKey = EncryptionService.generateEncryptedRecoveryKey(randomKey, pinDerivedKey);

      await NoteEncryption.savePinAndRecoveryKey(payload.PIN, payload.userId, salt, recoveryKey);

      dispatch.encryptionStore.setRecoveryKey(recoveryKey);
      dispatch.encryptionStore.setSalt(salt);
    },
  }),
});
