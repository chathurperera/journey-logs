/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Route } from '@jl/constants';

interface NavigationRoute {
  route: Route;
  params?: any;
}

export class NavigationService {
  public static navigationRef: any = React.createRef();

  public static navigate(requestedRouteName: Route, params?: any) {
    const routeName = requestedRouteName;

    const navigation = NavigationService.getNavigation(routeName, params);

    NavigationService.navigationRef.current?.navigate(navigation.route, navigation.params);
  }

  public static goBack() {
    NavigationService.navigationRef.current?.goBack();
  }

  private static getNavigation(route: Route, params?: any) {
    const routeMapping = {
      //Auth Routes
      [Route.Login]: {
        navRoute: Route.AuthStack,
        navParams: {
          screen: Route.Login,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      [Route.Signup]: {
        navRoute: Route.AuthStack,
        navParams: {
          screen: Route.Signup,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      [Route.ForgetPassword]: {
        navRoute: Route.AuthStack,
        navParams: {
          screen: Route.ForgetPassword,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      //Main Routes

      //Note Routes
      [Route.NotesStack]: {
        navRoute: Route.NotesStack,
        navParams: params,
      },

      [Route.Tags]: {
        navRoute: Route.NotesStack,
        navParams: {
          screen: Route.Tags,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      [Route.PreviewNote]: {
        navRoute: Route.NotesStack,
        navParams: {
          screen: Route.PreviewNote,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      [Route.HiddenNotes]: {
        navRoute: Route.NotesStack,
        navParams: {
          screen: Route.HiddenNotes,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      //Settings Routes
      [Route.SettingsStack]: {
        navRoute: Route.SettingsStack,
        navParams: params,
      },

      [Route.PinCode]: {
        navRoute: Route.SettingsStack,
        navParams: {
          screen: Route.PinCode,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      [Route.Account]: {
        navRoute: Route.SettingsStack,
        navParams: {
          screen: Route.Account,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      [Route.ConfirmPinCode]: {
        navRoute: Route.SettingsStack,
        navParams: {
          screen: Route.ConfirmPinCode,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      [Route.ChangePinCode]: {
        navRoute: Route.SettingsStack,
        navParams: {
          screen: Route.ChangePinCode,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      [Route.ChangePassword]: {
        navRoute: Route.SettingsStack,
        navParams: {
          screen: Route.ChangePassword,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      [Route.OldPINVerification]: {
        navRoute: Route.SettingsStack,
        navParams: {
          screen: Route.OldPINVerification,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      [Route.MaxPinCodeAttemptsReached]: {
        navRoute: Route.SettingsStack,
        navParams: {
          screen: Route.MaxPinCodeAttemptsReached,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      //Bottom Tab Routes
      [Route.HomeTab]: {
        navRoute: Route.MainBottomTabRoutesStack,
        navParams: {
          screen: Route.HomeTab,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      [Route.NewNoteTab]: {
        navRoute: Route.NotesStack,
        navParams: {
          screen: Route.NewNoteTab,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      [Route.SettingsTab]: {
        navRoute: Route.MainBottomTabRoutesStack,
        navParams: {
          screen: Route.SettingsTab,
          params: {
            screen: route,
            params: params,
          },
        },
      },

      [Route.FavouritesTab]: {
        navRoute: Route.MainBottomTabRoutesStack,
        navParams: {
          screen: Route.FavouritesTab,
          params: {
            screen: route,
            params: params,
          },
        },
      },
    };

    const getNavigationRoute = (route: Route): NavigationRoute => {
      return {
        route: routeMapping[route].navRoute,
        params: routeMapping[route].navParams,
      };
    };

    return getNavigationRoute(route);
  }
}
