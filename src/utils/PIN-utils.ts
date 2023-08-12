import moment from 'moment';

import { getCurrentTimestamp } from './moment-utils';

export const isPinSessionExpired = (
  lastSessionTimestamp: number,
  maxDurationInMilliSeconds: number = 300000,
) => {
  const currentTimestamp = getCurrentTimestamp();

  const timeDifference = moment(currentTimestamp).diff(moment(lastSessionTimestamp));
  return timeDifference > maxDurationInMilliSeconds;
};
