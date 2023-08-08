export interface NewAccountParams {
  email: string;
  name: string;
  userId: string;
}

export interface NewPinParams {
  salt: string;
  encryptedRecoveryKey: string;
}
