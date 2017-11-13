import * as types from './actionTypes';
import base64 from 'base-64';
import httpFetch from '../../lib/httpFetch';
import * as Constants from '../../lib/Constants';

export function appInitialized() {
    return async function(dispatch, getState) {
        // dispatch(changeLoginStatus('application-CustomizeTabsScreen'));
        dispatch(changeLoginStatus('start'));
    };
}

export function changeLoginStatus(root, loginStatus = 'initial', errorMessage = '') {
    return {
        type: types.ROOT_CHANGED,
        root: root,
        loginStatus: loginStatus,
        errorMessage: errorMessage
    };
}
export function dismissErrorDialog() {
    return async function(dispatch, getState) {
        dispatch(changeLoginStatus('demo-login'));
    };
}

export function login(username, password) {
    return async function(dispatch, getState) {
        //console.log('username:'+username+' pass:'+password);
        let loginValue = false;
        if (username && password) {
            loginValue = true;
        }

        if (loginValue) {
            dispatch(loadingChanged(true));
            httpFetch(Constants.SCP_HOST_URL + "/api/auth/csrf-token", {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(function(csrfResponse) {
                    if (csrfResponse.status === 200 && csrfResponse.ok)
                        return csrfResponse.json();
                }).then(function(csrfRes) {
                const hash = base64.encode(`${username}:${password}`);

                httpFetch(Constants.SCP_HOST_URL + "/api/auth/login", {
                    headers: {
                        "Authorization": `Basic ${hash}`,
                        "X-CSRF-TOKEN": csrfRes.csrfToken
                    },
                    method: 'POST'
                })
                    .then(function(loginResponse) {
                        if (loginResponse.ok && loginResponse.status === 200) {
                            //return loginResponse.json();
                            return loginResponse;
                        } else {
                            dispatch(loadingChanged(false));
                            dispatch(changeLoginStatus('demo-login', 'error', 'Login Failed'));
                        }
                    }).then(function(loginRes) {
                    dispatch(loadingChanged(false));
                    dispatch(changeLoginStatus('demo-after-login', 'success'));
                }).catch(function(err) {
                    dispatch(loadingChanged(false));
                    dispatch(changeLoginStatus('demo-login', 'error', err));
                });
            }).catch(function(err) {
                dispatch(loadingChanged(false));
                dispatch(changeLoginStatus('demo-login', 'error', err));
            });
        } else {
            dispatch(changeLoginStatus('demo-login'));
        }
    };
}

export function getLoginUser() {
    return async function(dispatch, getState) {
        dispatch(loadingChanged(true));

        httpFetch(Constants.SCP_USERDETAIL_URL, {
        })
            .then(function(response) {
                if (response.headers.map["content-type"][0] !== "text/html;charset=UTF-8" && response.ok && response.status === 200) {
                    return response.json();
                } else {
                    return {
                        message: "您账户未登陆或登陆会话已过期"
                    };
                }
            //return response.json();
            }).then(function(response) {
            alert(JSON.stringify(response));
            dispatch(loadingChanged(false));
        //dispatch(changeAppRoot('after-login'));
        });
    };
}

export function loadingChanged(bStatus) {
    return {
        type: types.LOADING_CHANGED,
        loading: bStatus
    };
}

export function logout() {
    return async function(dispatch, getState) {
        dispatch(changeLoginStatus('demo-login'));
    };
}

export function requestMessageTemplate() {
    return {
        type: types.REQUEST_TEMPLATE_CONTENT
    };
}

export function addMessageTemplate(sMessage) {
    return {
        type: types.ADD_TEMPLATE_CONTENT,
        content: {
            content: sMessage
        }
    };
}

export function updateSelectedTab(sSelectedTab) {
    return {
        type: types.UPDATE_SELECTED_TAB,
        selectedTab: sSelectedTab
    };
}
