import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

// import { Text } from '@jl/components';
import { tw } from '@jl/config';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';

export function CalendarScreen() {
  const [selected, setSelected] = useState('');
  return (
    <BaseScreenLayout>
      <View style={tw`mx-5 flex-1`}>
        <Calendar
          onDayPress={day => {
            console.log('day', day);
            setSelected(day.dateString);
          }}
          markedDates={{
            //@ts-ignore
            [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
          }}
        />
      </View>
    </BaseScreenLayout>
  );
}
