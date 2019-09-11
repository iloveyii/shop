import {ITEM_EDIT, ITEM_EDIT_SUCCESS, ITEM_EDIT_FAIL, ITEM_ADD_SUCCESS} from '../types/Item';

const initState = {
    edit: {},
    delete: {},
    add: {}
};

const ItemReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case ITEM_ADD_SUCCESS:
            console.log('Inside ItemReducer ITEM_ADD_SUCCESS', action.payload);
            return Object.assign({}, {
                add: {
                    status: action.payload.status
                }
            });

        case ITEM_EDIT:
            console.log('Inside ItemsReducer ITEM_EDIT', action.payload);

            return Object.assign({}, {
                edit: {
                    item: action.payload.item
                }
            });

        case ITEM_EDIT_SUCCESS:
            console.log('Inside ItemsReducer ITEM_EDIT_SUCCESS', action);
            return state;

        default:
            return initState;
    }
};

export default ItemReducer;
