import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    root: undefined, // 'login' / 'after-login'
    loading: false, //flag for display busy indicator
    loginStatus: 'initial', //'initial'/'success' / 'error'
    errorMessage: '',
    messageTemplate: [{content:'尊敬的王先生，我是奇瑞XX店铺顾问张三，根据您的需求，我店欢迎您前来店里进一步体验咨询'},{content:'尊敬的王先生，我是奇瑞XX店铺顾问张三，根据您的需求，我店欢迎您前来店里进一步体验咨询'}]
});

export default function app(state = initialState, action = {}) {
    switch (action.type) {
        case types.ROOT_CHANGED:
            return state.merge({
                root: action.root,
                loginStatus: action.loginStatus,
                errorMessage: action.errorMessage
            });
            break;
        case types.LOADING_CHANGED:
            return state.merge({
                loading: action.loading
            });
            break;
        case types.REQUEST_TEMPLATE_CONTENT:
            return state;
            break;
        case types.ADD_TEMPLATE_CONTENT:
            const aMessageTemplate = state.messageTemplate.asMutable();
            aMessageTemplate.push(action.content);
            return state.set("messageTemplate",aMessageTemplate);
            break;
        default:
            return state;
    }
}
