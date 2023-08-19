export interface NewAccountParams {
  email: string;
  name: string;
  userId: string;
}

export interface UpdateUserParams {
  email?: string;
  name?: string;
  securityPreference?: string;
}

export interface NewPinParams {
  salt: string;
  encryptedRecoveryKey: string;
}
