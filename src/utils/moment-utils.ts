import moment from 'moment';

export const getCurrentTimestampInSeconds = () => {
  const timestamp = moment().unix();
  return timestamp;
};

export const getRelativeTimeFromTimestamp = (timestampValue: number) => {
  const relativeTime = moment.unix(timestampValue).fromNow();
  return relativeTime;
};

export const getTimeFromTimestamp = (timestamp: number) => {
  const time = moment(timestamp).format('HH:mm');
  return time;
};

export const getFirstAndLastDayOfMonth = (year, month) => {
  const startDate = moment([year, month - 1, 1]);
  const endDate = moment([year, month - 1, 1]).endOf('month');
  const startTimestamp = startDate.unix(); // UNIX timestamp in seconds
  const endTimestamp = endDate.unix();

  return {
    startTimestamp,
    endTimestamp,
  };
};

export const convertFormat = (timestamp: number, format: string) => {
  const formattedDate = moment.unix(timestamp).format(format);
  return formattedDate;
};
