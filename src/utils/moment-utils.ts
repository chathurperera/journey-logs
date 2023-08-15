import moment from 'moment';

export const getCurrentTimestampInMilliSeconds = () => {
  const timestamp = moment().unix();
  return timestamp;
};

export const getRelativeTimeFromTimestamp = (timestampValue: number) => {
  const relativeTime = moment.unix(timestampValue).fromNow();
  return relativeTime;
};
