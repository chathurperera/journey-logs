import { SECURITY_LEVELS } from '@jl/constants';

type SecurityLevel = (typeof SECURITY_LEVELS)[number];

export interface UserData {
  email: string;
  userId: string;
  name?: string;
  recoveryKey?: string;
  encryptedRecoveryKey?: string;
  salt?: string;
  securityPreference?: SecurityLevel;
}

export interface EncryptionData {
  recoveryKey: string;
  salt: string;
  failedAttempts?: number;
  lockoutTimestamp?: string;
}

export type SecurityLevels = 'Low' | 'Medium' | 'High';
