export interface Day {
  dateString: string;
  day?: number;
  month?: number;
  timestamp?: number;
  year?: number;
}

export interface MarkedDate {
  selected?: boolean;
  selectedDotColor?: string;
}

export interface CalendarMarkedDates {
  [dateString: string]: MarkedDate;
}
