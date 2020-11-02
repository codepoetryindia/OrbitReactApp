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

function  getCurrentRoute  () {
  const route = _navigator;
  if(route.state.nav.routes.length > 0){
    return route.state.nav.routes[route.state.nav.routes.length - 1].routeName;    
  }else{
    return null;
  }
  // return route.state.nav.routes;
};


// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  resetRoute,
  getCurrentRoute
};