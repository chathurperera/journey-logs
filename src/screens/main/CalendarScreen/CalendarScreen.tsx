import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, TextAlignment, TextVariant } from '@jl/constants';
import { NoteService } from '@jl/services';
import { useSelector } from '@jl/stores';
import { convertFormat, getFirstAndLastDayOfMonth } from '@jl/utils';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

export function CalendarScreen() {
  const { userId } = useSelector(state => state.userStore.userData);
  const [calendarMarkedDates, setCalendarMarkedDates] = useState({});

  const fetchNotes = async (startTimestamp: number, endTimestamp: number) => {
    const data = await NoteService.getAllNotesByMonth(startTimestamp, endTimestamp, userId);
    let markedDates = {};

    for (let note of data) {
      let formattedDate = convertFormat(note.createdAt, 'YYYY-MM-DD');
      markedDates[formattedDate] = {
        marked: true,
        selectedColor: Color.Primary.Jl500,
        selectedDotColor: Color.Primary.Jl700,
      };
    }

    setCalendarMarkedDates(markedDates);
  };

  useEffect(() => {
    const date = new Date();
    const monthNumber = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const { startTimestamp, endTimestamp } = getFirstAndLastDayOfMonth(currentYear, monthNumber);
    fetchNotes(startTimestamp, endTimestamp);
  }, []);

  const handleDayPress = day => {
    const { dateString } = day;

    // Create a shallow copy of the current marked dates.
    const newMarkedDates = { ...calendarMarkedDates };

    // Check if the date is already selected.
    const isAlreadySelected = newMarkedDates[dateString] && newMarkedDates[dateString].selected;

    // Remove the 'selected' property from all dates.
    Object.keys(newMarkedDates).forEach(date => {
      delete newMarkedDates[date].selected;
    });

    // If the date wasn't already selected, mark it as selected.
    if (!isAlreadySelected) {
      newMarkedDates[dateString] = {
        ...newMarkedDates[dateString],
        selected: true,
        selectedDotColor: Color.Primary.Jl700,
      };
    }

    setCalendarMarkedDates(newMarkedDates);
  };

  return (
    <BaseScreenLayout>
      <View style={tw`mx-5 flex-1`}>
        <Calendar
          onMonthChange={date => console.log('date', date)}
          onDayPress={handleDayPress}
          markedDates={calendarMarkedDates}
          theme={{
            todayTextColor: Color.Primary.Jl700,
          }}
        />
        <View style={tw`border-t-[${Color.Neutral.JL300}] border-t mt-3   flex-1`}>
          <View>
            <View style={tw`mb-3 mt-10`}>
              <Text variant={TextVariant.Heading3SemiBold} textAlign={TextAlignment.Center}>
                Nothing here yet{' '}
              </Text>
            </View>
            <Text variant={TextVariant.Body2Regular} textAlign={TextAlignment.Center}>
              Looks like you haven't added any notes for this date.{' '}
            </Text>
          </View>
        </View>
      </View>
    </BaseScreenLayout>
  );
}
