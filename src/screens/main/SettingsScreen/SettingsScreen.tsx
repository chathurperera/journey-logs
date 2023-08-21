import React from 'react';
import { View } from 'react-native';

import { Text } from '@jl/components';
import { tw } from '@jl/config';
import { Color, Route, TextAlignment, TextVariant } from '@jl/constants';
import { NavigationService } from '@jl/services';
import { useDispatch, useSelector } from '@jl/stores';
import { getRemainingLockoutTime, isPinSessionExpired, validateLockoutPeriod } from '@jl/utils';

import { BaseScreenLayout } from '../../components/BaseScreenLayout';
import { Section } from './components/Section';
import { SectionLink } from './components/SectionLink';

interface SettingsScreenProps {
  testID: string;
}

export function SettingsScreen({ testID }: SettingsScreenProps) {
  const dispatch = useDispatch();
  const { securityPreference } = useSelector(state => state.encryptionStore);

  const { salt, lastAccessedHiddenNotesAt, lockoutTimestamp } = useSelector(state => state.encryptionStore);
  const { name, email } = useSelector(state => state.userStore.userData);

  const isInLockedPeriod = validateLockoutPeriod(lockoutTimestamp, securityPreference);

  const hiddenNotesAccessNavigation = () => {
    if (isInLockedPeriod) {
      const remainingSeconds = getRemainingLockoutTime(lockoutTimestamp);
      return NavigationService.navigate(Route.MaxPinCodeAttemptsReached, { remainingSeconds: remainingSeconds });
    }

    if (lastAccessedHiddenNotesAt && isPinSessionExpired(lastAccessedHiddenNotesAt)) {
      return NavigationService.navigate(Route.PinCode, { pinExists: true });
    }

    if (lastAccessedHiddenNotesAt) {
      return NavigationService.navigate(Route.HiddenNotes);
    }

    NavigationService.navigate(Route.PinCode, { pinExists: Boolean(salt) });
  };

  const handleAddPINNavigation = () => {
    if (salt === '') {
      NavigationService.navigate(Route.PinCode, { pinExists: salt !== '' });
    } else {
      NavigationService.navigate(Route.OldPINVerification);
    }
  };

  return (
    <BaseScreenLayout testID={testID}>
      <View style={tw`mx-5 flex-1`}>
        <Text variant={TextVariant.Title2} textAlign={TextAlignment.Center}>
          Settings
        </Text>
        <View style={tw`pt-7 items-center`}>
          <View style={tw`w-18 h-18  bg-[${Color.Primary.Jl500}] justify-center rounded-full flex-row pt-1 mb-3`}>
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
          <Section title="account">
            <SectionLink text="Account" onPress={() => NavigationService.navigate(Route.Account)} />
            <SectionLink text="Change Password" onPress={() => NavigationService.navigate(Route.ChangePassword)} />
          </Section>
          <Section title={'notes'}>
            <SectionLink text="Tags" onPress={() => NavigationService.navigate(Route.Tags)} />
            <SectionLink text={salt === '' ? 'Add PIN' : 'Change PIN'} onPress={handleAddPINNavigation} />
            {salt !== '' && <SectionLink text="Hidden Notes" onPress={() => hiddenNotesAccessNavigation()} />}
          </Section>
          <SectionLink text="Logout" onPress={() => dispatch.userStore.logoutUser()} />
        </View>
      </View>
    </BaseScreenLayout>
  );
}
