import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { LoadingSpinner, Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';
import { CalendarMarkedDates, Day, NoteData } from '@jl/models';
import { NoteService } from '@jl/services';
import { useSelector } from '@jl/stores';
import { convertFormat, getFirstAndLastDayOfMonth } from '@jl/utils';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { NoteCard } from '../HomeScreen/components/NoteCard';

export function CalendarScreen() {
  const { userId } = useSelector(state => state.userStore.userData);
  const [calendarMarkedDates, setCalendarMarkedDates] = useState({});
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatNotesDataToCalenderDates = (notes: NoteData[]) => {
    let markedDates = {};
    for (let note of notes) {
      let formattedDate = convertFormat(note.createdAt, 'YYYY-MM-DD');
      markedDates[formattedDate] = {
        marked: true,
        selectedColor: Color.Primary.Jl500,
        selectedDotColor: Color.Primary.Jl700,
      };
    }

    setCalendarMarkedDates(markedDates);
  };

  const fetchNotesForSelectedMonth = async (startTimestamp: number, endTimestamp: number) => {
    setIsLoading(true);
    const data = await NoteService.getAllNotesByMonth(startTimestamp, endTimestamp, userId);
    setNotes(data);
    setIsLoading(false);

    formatNotesDataToCalenderDates(data);
  };

  const fetchNotesForSelectedDay = async (dayTimestamp: number) => {
    setIsLoading(true);

    const targetDate = new Date(dayTimestamp);

    targetDate.setHours(0, 0, 0, 0);
    const startTimestamp = Math.floor(targetDate.getTime() / 1000);

    targetDate.setHours(23, 59, 59, 999);
    const endTimestamp = Math.floor(targetDate.getTime() / 1000);

    const data = await NoteService.getAllNotesByDay(startTimestamp, endTimestamp, userId);
    setNotes(data);
    setIsLoading(false);

    formatNotesDataToCalenderDates(data);
  };

  //Set dates on initial render
  useEffect(() => {
    const date = new Date();
    const monthNumber = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const { startTimestamp, endTimestamp } = getFirstAndLastDayOfMonth(currentYear, monthNumber);
    fetchNotesForSelectedMonth(startTimestamp, endTimestamp);
  }, []);

  const handleDayPress = async (day: Day) => {
    await fetchNotesForSelectedDay(day.timestamp);

    const { dateString } = day;

    const newMarkedDates: CalendarMarkedDates = { ...calendarMarkedDates };

    const isAlreadySelected = newMarkedDates[dateString] && newMarkedDates[dateString].selected;

    Object.keys(newMarkedDates).forEach(date => {
      delete newMarkedDates[date].selected;
    });

    if (!isAlreadySelected) {
      newMarkedDates[dateString] = {
        ...newMarkedDates[dateString],
        selected: true,
        selectedDotColor: Color.Primary.Jl700,
      };
    }

    setCalendarMarkedDates(newMarkedDates);
  };

  const renderItem = ({ item }: { item: NoteData }) => {
    return <NoteCard {...item} showIcon />;
  };

  const renderEmptyList = () => (
    <View>
      <View style={tw`mb-3 `}>
        <Text variant={TextVariant.Heading3SemiBold} textAlign={TextAlignment.Center}>
          Nothing here yet{' '}
        </Text>
      </View>
      <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Center}>
        Looks like you haven't added any notes for this date.
      </Text>
    </View>
  );

  const handleMonthChange = (day: Day) => {
    const { startTimestamp, endTimestamp } = getFirstAndLastDayOfMonth(day.year, day.month);
    fetchNotesForSelectedMonth(startTimestamp, endTimestamp);
  };

  return (
    <BaseScreenLayout wrapWithScrollView={false}>
      <View style={tw`mx-5 flex-1`}>
        <Text variant={TextVariant.Title2} textAlign={TextAlignment.Center}>
          Calender
        </Text>
        <View style={tw`mt-4`}>
          <Calendar
            onMonthChange={handleMonthChange}
            onDayPress={handleDayPress}
            markedDates={calendarMarkedDates}
            theme={{
              todayTextColor: Color.Primary.Jl700,
              selectedDayBackgroundColor: Color.Primary.Jl500,
              monthTextColor: Color.Secondary.JL900,
              arrowStyle: tw`bg-[${Color.Neutral.black}] rounded-full px-3.5`,
              arrowColor: '#fff',
              arrowWidth: 13,
              arrowHeight: 13,
            }}
          />
        </View>
        <View style={tw` mt-3 pt-4  flex-1 p-4 bg-[${Color.Neutral.JL50}] rounded-t-3xl`}>
          {isLoading && <LoadingSpinner color={Color.Primary.Jl500} size="large" />}
          {notes?.length === 0 && !isLoading && renderEmptyList()}
          {!isLoading && <FlatList data={notes} renderItem={renderItem} keyExtractor={item => item.id} />}
        </View>
      </View>
    </BaseScreenLayout>
  );
}
