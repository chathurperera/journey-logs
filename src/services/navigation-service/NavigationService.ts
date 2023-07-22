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
            screen: Route.Login,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },

      [Route.Signup]: {
        navRoute: Route.AuthStack,
        navParams: {
          screen: Route.Signup,
          params: {
            screen: Route.Signup,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },

      //Main Routes
      [Route.HomeTab]: {
        navRoute: Route.MainBottomTabRoutesStack,
        navParams: {
          screen: Route.HomeTab,
          params: {
            screen: Route.HomeTab,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },

      //Note Routes
      [Route.EditNote]: {
        navRoute: Route.NotesStack,
        navParams: {
          screen: Route.EditNote,
          params: {
            screen: Route.EditNote,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },

      [Route.NotesStack]: {
        navRoute: Route.NotesStack,
        navParams: params,
      },

      [Route.PreviewNote]: {
        navRoute: Route.NotesStack,
        navParams: {
          screen: Route.PreviewNote,
          params: {
            screen: Route.PreviewNote,
            params: {
              screen: route,
              params: params,
            },
          },
        },
      },

      //Bottom Tab Routes
      [Route.NewNoteTab]: {
        navRoute: Route.NotesStack,
        navParams: {
          screen: Route.NewNoteTab,
          params: {
            screen: Route.NewNoteTab,
            params: {
              screen: route,
              params: params,
            },
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
