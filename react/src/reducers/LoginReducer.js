import {LOGIN_SUCCESS} from '../types/Login';

const initState = {
    login: {},
};

const LoginReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log('Inside LoginReducer LOGIN_SUCCESS', action.payload);
            return Object.assign({}, action.payload.user);

        default:
            return initState;
    }
};

export default LoginReducer;
