import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  formData: []
});

export default function formElementsScreen(state = initialState, action = {}) {
  switch (action.type) {
    case types.DATA_CHANGED:
      return state.merge({
        formData: action.formData
      });
    default:
      return state;
  }
}
