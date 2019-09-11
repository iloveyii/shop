import {
    ITEM_ADD,
    ITEM_ADD_SUCCESS,
    ITEM_ADD_FAIL, ITEM_READ, ITEM_READ_SUCCESS, ITEM_READ_FAIL, ITEM_DELETE, ITEM_DELETE_SUCCESS, ITEM_DELETE_FAIL,
    ITEM_EDIT, ITEM_EDIT_SUCCESS, ITEM_EDIT_FAIL, ITEM_UPDATE, ITEM_UPDATE_SUCCESS, ITEM_UPDATE_FAIL
} from '../types/Item';

import {itemsReadSuccessAction} from './ItemsAction';

export const itemAddAction = (item) => {
    console.log('Inside itemAddAction', item);

    return {
        type: ITEM_ADD,
        payload: {
            item
        }
    }
};

export const itemAddSuccessAction = (resp) => {
    return {
        type: ITEM_ADD_SUCCESS,
        payload: resp
    }
};

export const itemAddFailAction = (err) => {
    console.log('Inside itemAddFailAction');
    console.log(err);
    return {
        type: ITEM_ADD_FAIL,
        payload: {err}
    }
};

export const itemDeleteAction = (id) => {
    return {
        type: ITEM_DELETE,
        payload: {
            id
        }
    }
};

export const itemDeleteSuccessAction = (data) => {
    return {
        type: ITEM_DELETE_SUCCESS,
        payload: {
            status: data.status,
            id: data.id
        }
    }
};

export const itemDeleteFailAction = (err) => {
    return {
        type: ITEM_DELETE_FAIL,
        payload: {
            err
        }
    }
};

export const itemEditAction = (item) => {
    return {
        type: ITEM_EDIT,
        payload: {
            item
        }
    }
};
export const itemEditSuccessAction = (status) => {
    return {
        type: ITEM_EDIT_SUCCESS,
        payload: {
            status
        }
    }
};
export const itemEditFailAction = (err) => {
    return {
        type: ITEM_EDIT_FAIL,
        payload: {
            err
        }
    }
};


export const itemUpdateAction = (item) => {
    console.log('Inside itemUpdateAction', item);

    return {
        type: ITEM_UPDATE,
        payload: {
            item
        }
    }
};

export const itemUpdateSuccessAction = (status) => {
    console.log('Inside itemUpdateSuccessAction', status);

    return {
        type: ITEM_UPDATE_SUCCESS,
        payload: {
            status
        }
    }
};

export const itemUpdateFailAction = (err) => {
    console.log('Inside itemUpdateFailAction', err);

    return {
        type: ITEM_UPDATE_FAIL,
        payload: {
            err
        }
    }
};
