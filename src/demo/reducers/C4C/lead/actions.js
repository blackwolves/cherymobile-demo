import * as types from './actionTypes';

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
        //dispatch(loadingChanged(true));

        /*fetch('https://my500047.c4c.saphybriscloud.cn/sap/c4c/odata/v1/c4codata/ContactCollection?$format=json&$skip=0&$top=20', {
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
            alert("Fetch error");
        });*/
        const data = [{
            name: "李红",
            sex: '女士',
            tel: "12345678901",
            model: '瑞虎7 1.5T 手动耀尊版',
            type: '询价',
            date: '2017.03.22',
            status: '未联系'
        }, {
            name: "李佳",
            sex: '先生',
            tel: "18280014326",
            model: '瑞虎5 1.5T CVT尊贵版',
            type: '询价',
            date: '2017.03.19',
            status: '未联系'
        }];
        dispatch(changeData(data));
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
