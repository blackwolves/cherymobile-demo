import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    root: undefined, // 'login' / 'after-login'
    loading: false, //flag for display busy indicator
    loginStatus: 'initial', //'initial'/'success' / 'error'
    errorMessage: ''
});

export default function app(state = initialState, action = {}) {
    switch (action.type) {
        case types.ROOT_CHANGED:
            return state.merge({
                root: action.root,
                loginStatus: action.loginStatus,
                errorMessage: action.errorMessage
            });
        case types.LOADING_CHANGED:
            return state.merge({
                loading: action.loading
            });
        default:
            return state;
    }
}
