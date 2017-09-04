import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    data: [],
    loading: false
});

export default function lead(state = initialState, action = {}) {
    switch (action.type) {
        case types.DATA_CHANGED:
            return state.merge({
                data: action.data
            });
        case types.LOADING_CHANGED:
            return state.merge({
                loading: action.loading
            });
        default:
            return state;
    }
}
