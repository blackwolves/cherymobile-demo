import * as types from './actionTypes';

export function formDataInitialized() {
  return async function(dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeFormData([]));
  };
}

export function changeFormData(data) {
  return {type: types.DATA_CHANGED, formData: data};
}

export function applyFormDataChange(data) {
  return async function(dispatch, getState) {
      dispatch(changeFormData(data));
  };
}
