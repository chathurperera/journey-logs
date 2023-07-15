/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Route } from '@jl/constants';

export class NavigationService {
  public static navigationRef: any = React.createRef();

  public static navigate(routeName: Route, params?: any) {
    NavigationService.navigationRef.current?.navigate(routeName, params);
  }

  public static goBack() {
    NavigationService.navigationRef.current?.goBack();
  }
}
