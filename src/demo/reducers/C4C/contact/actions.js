import * as types from './actionTypes';
import { Alert, AlertIOS, Platform } from 'react-native';

export function appInitialized() {
    return async function(dispatch, getState) {
        dispatch(changeData([]));
    };
}

export function changeData(data) {
    return {
        type: types.DATA_CHANGED,
        data: data
    };
}

export function fetchData() {
    return async function(dispatch, getState) {
        dispatch(loadingChanged(true));

        fetch('https://my500047.c4c.saphybriscloud.cn/sap/c4c/odata/v1/c4codata/ContactCollection?$format=json&$skip=0&$top=20', {
            method: 'GET'
        }).then(function(response) {
            if (response.ok && response.status === 200) {
                return response.json();
            } else {
                dispatch(loadingChanged(false));
                dispatch(fetchFailure("Fetch Failed"));
            }
        }).then(function(response) {
            dispatch(loadingChanged(false));
            dispatch(changeData(response.d.results));
        }).catch((error) => {
            Platform.OS === 'android' ? Alert.alert("Fetch error") : AlertIOS.alert('Fetch error');
        });
    };
}
export function loadingChanged(bStatus) {
    return {
        type: types.LOADING_CHANGED,
        loading: bStatus
    };
}
export function fetchFailure(oError) {
    return {
        type: types.DATA_CHANGED,
        data: []
    };
}
export function clear() {
    return async function(dispatch, getState) {
        dispatch(changeData([]));
    };
}
