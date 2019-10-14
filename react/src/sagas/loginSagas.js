import {call, put} from 'redux-saga/effects';
import api from '../api/item';
import {
    loginAction,
    loginSuccessAction,
    loginFailAction,
} from "../actions/LoginAction";

export function* loginSaga(action) {
    try {
        console.log('loginSaga action', action);

        const resp = yield call(api.item.read, action.payload.user);
        console.log('loginSaga', resp);

        if (Array.isArray(Object.keys(resp))) {
            console.log('Inside loginSaga', action, resp);
            yield put(loginSuccessAction(resp));
        } else {
            yield put(loginFailAction(resp));
        }
    } catch (err) {
        yield put(loginFailAction(err));
    }
}
