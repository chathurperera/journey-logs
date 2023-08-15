import moment from 'moment';

export const isPinSessionExpired = (lastSessionTimestamp: number, maxDurationInMinutes: number = 5) => {
  const timeDifference = moment().diff(moment(lastSessionTimestamp * 1000), 'minute');
  console.log('timeDifference', timeDifference);

  return timeDifference > maxDurationInMinutes;
};
