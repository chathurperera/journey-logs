import moment from 'moment';

import { getCurrentTimestampInMilliSeconds } from './moment-utils';

export const isPinSessionExpired = (lastSessionTimestamp: number, maxDurationInMinutes: number = 5) => {
  const timeDifference = moment().diff(moment(lastSessionTimestamp * 1000), 'minute');
  return timeDifference > maxDurationInMinutes;
};

export const validateLockoutPeriod = (lockoutTimestamp: number) => {
  const timeDifference = moment().diff(moment(lockoutTimestamp * 1000), 'minute');
  console.log('timeDifference', timeDifference);
  return timeDifference < 5;
};

export const getRemainingLockoutTime = (lockoutTimestamp: number) => {
  const currentTimestamp = getCurrentTimestampInMilliSeconds();
  const difference = lockoutTimestamp + 300 - currentTimestamp;
  return difference;
};
// // Example
// const lockoutTime = moment().valueOf() - 2 * 60 * 1000; // 2 minutes ago
// console.log(getRemainingLockoutTime(lockoutTime)); // Should return something close to "3:00"
