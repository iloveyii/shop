import {
    ITEMS_READ,
    ITEMS_READ_SUCCESS,
    ITEMS_READ_FAIL
} from '../types/Items';


export const itemsReadAction = () => {
    console.log('itemsReadAction');
    return {
        type: ITEMS_READ,
        payload: {}
    }
};

export const itemsReadSuccessAction = (resp) => {
    console.log('itemsReadSuccessAction', resp);
    return {
        type: ITEMS_READ_SUCCESS,
        payload: resp
    }
};

export const itemsReadFailAction = (err) => {
    return {
        type: ITEMS_READ_FAIL,
        payload: {err}
    }
};
