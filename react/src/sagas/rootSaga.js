import {ITEM_ADD, ITEM_DELETE, ITEM_UPDATE} from "../types/Item";
import {ITEMS_READ} from "../types/Items";

import {takeLatest, takeEvery} from 'redux-saga/effects';

import {itemAddSaga, itemDeleteSaga, itemUpdateSaga} from "./itemSagas";
import {itemsReadSaga} from "./itemsSagas";


export default function* rootSaga() {
    yield takeLatest(ITEM_ADD, itemAddSaga);
    yield takeLatest(ITEM_DELETE, itemDeleteSaga);
    yield takeLatest(ITEM_UPDATE, itemUpdateSaga);

    yield takeLatest(ITEMS_READ, itemsReadSaga);
}
