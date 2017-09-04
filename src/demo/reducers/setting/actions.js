import * as types from './actionTypes';

export function appInitialized() {
  return async function(dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeAppTheme());
  };
}

export function changeAppTheme(oTheme) {
  return {type: types.THEME_CHANGED, theme: oTheme};
}

export function applyTheme(oTheme) {
  return async function(dispatch, getState) {
      // login logic would go here, and when it's done, we switch app roots
      dispatch(changeAppTheme(oTheme));
  };
}
