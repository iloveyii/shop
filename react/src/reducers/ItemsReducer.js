import {ITEM_ADD_SUCCESS, ITEM_DELETE_SUCCESS} from '../types/Item';
import {ITEMS_READ_SUCCESS} from '../types/Items';

const initState = [];

const ItemsReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case ITEMS_READ_SUCCESS:
            console.log('Inside ItemsReducer ITEMS_READ_SUCCESS', action.payload);
            return action.payload.models;

        case ITEM_ADD_SUCCESS:
            console.log('Inside ItemsReducer', action.payload);
            return action.payload.models;

        case ITEM_DELETE_SUCCESS:
            const index = state.findIndex( item => item.id === action.payload.id);
            if(index !== -1) state.splice(index, 1);

            console.log('ITEM_DELETE_SUCCESS in items Reducer', action.payload, index, state);

            return state.slice(0);

        default:
            return state;
    }
};

export default ItemsReducer;
