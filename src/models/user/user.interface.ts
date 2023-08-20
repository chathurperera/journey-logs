export interface UserData {
  email: string;
  userId: string;
  name?: string;
  recoveryKey?: string;
  salt?: string;
}

export interface EncryptionData {
  recoveryKey: string;
  salt: string;
  failedAttempts?: number;
  lockoutTimestamp?: string;
}

export type SecurityLevels = 'Low' | 'Medium' | 'High';
