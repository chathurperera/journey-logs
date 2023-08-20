import moment from 'moment';

import { SECURITY_PREFERENCE } from '@jl/constants';

import { getCurrentTimestampInSeconds } from './moment-utils';

export const isPinSessionExpired = (lastSessionTimestamp: number, maxDurationInMinutes: number = 5) => {
  const timeDifference = moment().diff(moment(lastSessionTimestamp * 1000), 'minute');
  return timeDifference > maxDurationInMinutes;
};

export const validateLockoutPeriod = (lockoutTimestamp: number, securityPreference: string): boolean => {
  const lockoutPeriods = {
    [SECURITY_PREFERENCE.LOW]: 30,
    [SECURITY_PREFERENCE.MEDIUM]: 5,
    [SECURITY_PREFERENCE.HIGH]: 2,
  };

  const timeDifference = moment().diff(moment(lockoutTimestamp * 1000), 'minute');
  const lockoutPeriodInMinutes = lockoutPeriods[securityPreference] || lockoutPeriods[SECURITY_PREFERENCE.HIGH];

  return timeDifference < lockoutPeriodInMinutes;
};

export const getRemainingLockoutTime = (lockoutTimestamp: number) => {
  const currentTimestamp = getCurrentTimestampInSeconds();
  const difference = lockoutTimestamp + 300 - currentTimestamp;
  return difference;
};
