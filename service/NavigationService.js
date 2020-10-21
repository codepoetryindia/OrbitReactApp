import {StackActions, NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function resetRoute(routeName, params){

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName, params })],
});
_navigator.dispatch(resetAction);
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  resetRoute
};