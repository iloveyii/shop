import {call, put} from 'redux-saga/effects';
import api from '../api/item';
import {
    itemDeleteSuccessAction,
    itemDeleteFailAction,
    itemAddSuccessAction,
    itemAddFailAction,
    itemUpdateSuccessAction,
    itemUpdateFailAction
} from "../actions/ItemAction";
import {itemsReadAction, itemsReadSuccessAction} from "../actions/ItemsAction";

export function* itemAddSaga(action) {
    try {
        const resp = yield call(api.item.add, action.payload);
        console.log('itemAddSaga', resp);

        if (Array.isArray(Object.keys(resp))) {
            console.log('Inside itemAddSaga', action, resp);
            yield put(itemAddSuccessAction(resp));
        } else {
            yield put(itemAddFailAction(resp));
        }
    } catch (err) {
        yield put(itemAddFailAction(err));
    }
}

export function* itemDeleteSaga(action) {
    try {
        const resp = yield call(api.item.delete, action.payload.id);
        console.log('itemDeleteSaga', action);

        if (Array.isArray(Object.keys(resp))) {
            console.log('Inside itemDeleteSaga', action, resp);
            yield put(itemDeleteSuccessAction({status : resp.status, id : action.payload.id}));
            // yield put(itemsReadSuccessAction(resp));
        } else {
            yield put(itemDeleteFailAction(resp));
        }
    } catch (err) {
        yield put(itemDeleteFailAction(err));
    }
}

export function* itemUpdateSaga(action) {
    try {
        const resp = yield call(api.item.update, action.payload.item);
        console.log('itemUpdateSaga', action);

        if (Array.isArray(Object.keys(resp))) {
            console.log('Inside itemUpdateSaga', action, resp);
            yield put(itemUpdateSuccessAction(resp));
            yield put(itemsReadAction());
        } else {
            yield put(itemUpdateFailAction(resp));
        }
    } catch (err) {
        yield put(itemUpdateFailAction(err));
    }
}
