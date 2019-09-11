import {call, put} from 'redux-saga/effects';
import api from '../api/items';
import {
    itemsReadSuccessAction,
    itemsReadFailAction,
} from "../actions/ItemsAction";

export function* itemsReadSaga(action) {
    try {
        const resp = yield call(api.items.read, action.payload);
        console.log('itemsReadSaga', resp);

        if (Array.isArray(Object.keys(resp))) {
            console.log('Inside itemsReadSaga', action, resp);
            yield put(itemsReadSuccessAction(resp));
        } else {
            yield put(itemsReadFailAction(resp));
        }
    } catch (err) {
        yield put(itemsReadFailAction(err));
    }
}

