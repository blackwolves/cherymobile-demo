import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    theme: {
        tabBarBackgroundColor: 'white',
        tabBarButtonColor: '#003a66',
        tabBarSelectedButtonColor: '#ff505c',

        navBarBackgroundColor: '#f7f7f7',
        navBarButtonColor: '#003a66',
        navBarTextColor: '#003a66',

        navigationBarColor: '#003a66',
        //navBarBackgroundColor: '#003a66',
        statusBarColor: '#002b4c',
        tabFontFamily: 'BioRhyme-Bold'
    }
});

export default function setting(state = initialState, action = {}) {
    switch (action.type) {
        case types.THEME_CHANGED:
            return state.merge({
                theme: action.theme
            });
        default:
            return state;
    }
}
