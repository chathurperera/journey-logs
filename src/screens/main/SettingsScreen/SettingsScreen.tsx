import React from 'react';
import { View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextAlignment, TextVariant } from '@jl/constants';
import { NavigationService } from '@jl/services';
import { useDispatch, useSelector } from '@jl/stores';
import { isPinSessionExpired } from '@jl/utils';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { SectionLink } from './components/SectionLink';

interface SettingsScreenProps {
  testID: string;
}

export function SettingsScreen({ testID }: SettingsScreenProps) {
  const dispatch = useDispatch();

  //salt is used to decide availability of a PIN code
  //lastAccessedHiddenNotesAt is used to check the validity of the last session
  const { salt, lastAccessedHiddenNotesAt } = useSelector(state => state.encryptionStore);
  const { name, email } = useSelector(state => state.userStore.userData);

  const hiddenNotesAccessNavigation = () => {
    if (lastAccessedHiddenNotesAt) {
      const expiredSession = isPinSessionExpired(lastAccessedHiddenNotesAt);
      if (expiredSession) {
        NavigationService.navigate(Route.PinCode, { pinExists: true });
      } else {
        NavigationService.navigate(Route.HiddenNotes);
      }
    } else {
      NavigationService.navigate(Route.PinCode, { pinExists: salt !== '' });
    }
  };

  console.log('name', name);
  return (
    <BaseScreenLayout testID={testID}>
      <View style={tw`mx-5 flex-1`}>
        <Text variant={TextVariant.Title2} textAlign={TextAlignment.Center}>
          Settings
        </Text>
        <View style={tw`pt-7 items-center`}>
          <View
            style={tw`w-18 h-18  bg-[${Color.Primary.Jl500}] justify-center rounded-full flex-row pt-1 mb-3`}>
            <Text
              variant={TextVariant.Heading1Regular}
              // textAlign={TextAlignment.Center}
              color={Color.Neutral.white}>
              {name?.charAt(0)}
            </Text>
          </View>
          <Text variant={TextVariant.Body1Regular} color={Color.Neutral.JL400}>
            {email}
          </Text>
        </View>
        <View style={tw`mt-10`}>
          <View style={tw`mb-3`}>
            <Text
              variant={TextVariant.Body1Regular}
              textTransform="uppercase"
              color={Color.Neutral.JL300}>
              ACCOUNT
            </Text>
          </View>
          <SectionLink text="Account" onPress={() => console.log('account navigation')} />
          <SectionLink
            text="Change Password"
            onPress={() => console.log('change password screen')}
          />
          <View style={tw`mb-3 mt-3`}>
            <Text
              variant={TextVariant.Body1Regular}
              textTransform="uppercase"
              color={Color.Neutral.JL300}>
              Notes
            </Text>
          </View>
          <SectionLink text="Tags" onPress={() => NavigationService.navigate(Route.Tags)} />
          <SectionLink
            text={salt === '' ? 'Add PIN' : 'Change PIN'}
            onPress={() => NavigationService.navigate(Route.PinCode, { pinExists: salt !== '' })}
          />
          {salt !== '' && (
            <SectionLink text="Hidden Notes" onPress={() => hiddenNotesAccessNavigation()} />
          )}

          <SectionLink text="Logout" onPress={() => dispatch.userStore.logoutUser()} />
        </View>
      </View>
    </BaseScreenLayout>
  );
}
